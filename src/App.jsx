import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { 
  Play, 
  Video, 
  Layers, 
  Smartphone, 
  Mic2, 
  Mail, 
  ChevronRight, 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight,
  Scissors,
  AudioLines,
  Star,
  CheckCircle2,
  Zap
} from 'lucide-react';
import './App.css';

import profileImg from './assets/profile.jpg';
import heroProfileImg from './assets/hero-profile.png';

// ==========================================================================
// PREMIUM VIDEO EDITING TIMELINE MARKER
// ==========================================================================
const TimelineMarker = ({ time, delay }) => (
  <motion.div
    initial={{ opacity: 0, scaleY: 0 }}
    animate={{ opacity: 1, scaleY: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="timeline-marker"
  >
    <div className="marker-line" />
    <div className="marker-label">{time}</div>
  </motion.div>
);

// ==========================================================================
// 1. PAGE LOADER - FILM REEL STYLE
// ==========================================================================
const Loader = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const interval = 25;
    const step = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setPercent((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="loader-container"
      exit={{ 
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
      }}
    >
      <div className="loader-inner">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="loader-logo"
        >
          <div className="film-reel">
            <Scissors size={32} className="animate-spin" style={{ animationDuration: '2s' }} />
          </div>
          <span className="text-[#dfc7a7] font-normal lowercase italic font-serif text-sm">editing in progress</span>
        </motion.div>
        
        <div className="loader-progress-track">
          <motion.div 
            className="loader-progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ type: 'tween', ease: 'linear' }}
          />
        </div>
        
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="loader-percentage"
        >
          {Math.round(percent)}%
        </motion.span>
      </div>
    </motion.div>
  );
};

// ==========================================================================
// COUNTER COMPONENT
// ==========================================================================
const Counter = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isInView.current) {
        isInView.current = true;
        let start = 0;
        const end = parseInt(value.replace(/[^0-9]/g, '')) || 0;
        if (start === end) return;

        const totalSteps = end;
        const intervalTime = Math.max(Math.floor((duration * 1000) / totalSteps), 15);
        
        const timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start === end) clearInterval(timer);
        }, intervalTime);
      }
    }, { threshold: 0.2 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [value, duration]);

  const suffix = value.replace(/[0-9]/g, '');

  return (
    <span ref={ref} className="stat-num">
      {count}{suffix}
    </span>
  );
};

// ==========================================================================
// NAVIGATION BAR - PREMIUM GLASS DESIGN
// ==========================================================================
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <motion.div 
        className="navbar-progress-line"
        style={{ scaleX: scrollYProgress }}
      />
      
      <div className="container nav-container">
        <a href="#" className="logo logo-with-avatar">
          <img src={profileImg} alt="Siyam Saifullah - Video Editor" className="nav-avatar" />
          <span className="logo-text">SIYAM SAIFULLAH</span><span className="dot">.</span>
        </a>

        <div className="nav-links">
          {['Works', 'Services', 'About', 'Process', 'Contact'].map((item) => (
            <motion.a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="nav-item"
              whileHover={{ color: '#dfc7a7' }}
              transition={{ duration: 0.3 }}
            >
              {item}
            </motion.a>
          ))}
          <motion.a 
            href="#contact" 
            className="btn btn-primary" 
            style={{ padding: '0.55rem 1.4rem', fontSize: '0.7rem' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            HIRE ME
          </motion.a>
        </div>

        <div className="mobile-toggle">
          <button onClick={() => setIsOpen(!isOpen)} className="toggle-btn">
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-nav"
          >
            <div className="mobile-nav-content">
              {['Works', 'Services', 'About', 'Process', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsOpen(false)} 
                  className="mobile-item"
                >
                  {item}
                </a>
              ))}
              <a href="#contact" onClick={() => setIsOpen(false)} className="btn btn-primary w-full">
                HIRE ME
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// ==========================================================================
// HERO SECTION - CINEMATIC WITH VIDEO EDITING ELEMENTS
// ==========================================================================
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg-grid" />
      
      <div className="container hero-layout">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="hero-text-content"
        >
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="badge premium-badge"
          >
            <Zap size={12} className="animate-pulse" style={{ color: '#a78bfa' }} />
            <span>PREMIUM VIDEO EDITOR</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="hero-title premium-title"
          >
            <span className="sr-only">Siyam Saifullah - Professional Video Editor & Motion Designer Portfolio</span>
            CUTS THAT
            <span className="accent-text">
              {' '}CAPTIVATE
            </span>
            <br />& CONVERT
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hero-subtitle premium-subtitle"
          >
            Professional video editing that transforms raw footage into scroll-stopping content. Cinematic pacing, premium sound design, and pixel-perfect timing.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="hero-actions"
          >
            <motion.a 
              href="#works" 
              className="btn btn-primary btn-large premium-btn"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play size={14} fill="currentColor" /> VIEW PORTFOLIO
            </motion.a>
            <motion.a 
              href="#contact" 
              className="btn btn-glass btn-large premium-btn"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap size={14} /> START PROJECT
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hero-image-wrapper premium-image"
        >
          <div className="premium-frame">
            <div className="frame-border" />
            <img src={heroProfileImg} alt="Siyam Saifullah - Professional Cinematic Video Editor" className="hero-image premium-image-img" />
            <div className="frame-accent" />
          </div>
          
          <div className="experience-badge">
            <div className="badge-content">
              <span className="years">2+</span>
              <span className="label">Years<br />Experience</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="scroll-indicator"
      >
        <div className="scroll-line" />
        <span className="scroll-text">SCROLL TO DISCOVER</span>
      </motion.div>
    </section>
  );
};

// ==========================================================================
// PREMIUM PORTFOLIO SECTION WITH VIDEO EDITING TIMELINE
// ==========================================================================
const ProjectCard = ({ title, image, videoUrl, iframeSrc, aspect, isActive, onPlay }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.muted = false;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(e => {});
          }
        });
      }
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.muted = true;
      try {
        videoRef.current.currentTime = 0;
      } catch (err) {}
    }
  }, [isActive]);

  const handleCardClick = () => {
    if (isActive) return;
    onPlay();
  };

  const cardClass = aspect === 'vertical' ? 'project-card card-vertical' : 'project-card card-landscape';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      className={`${cardClass} ${isActive ? 'active' : ''}`}
      onClick={handleCardClick}
      style={{ cursor: isActive ? 'default' : 'pointer' }}
    >
      <div className="card-image-wrapper premium-card-wrapper">
        <img 
          src={image} 
          alt={`${title} - Video Editing by Siyam Saifullah`}
          className="card-image premium-card-image"
          style={{ opacity: isActive ? 0 : 1, transition: 'opacity 0.3s ease' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />

        {!isActive && (
          <div className="card-title-strip">
            <span>{title}</span>
          </div>
        )}
        
        {/* TIMELINE VISUALIZATION */}
        {!isActive && (
          <div className="timeline-overlay">
            <TimelineMarker time="00:00" delay={0} />
            <TimelineMarker time="01:00" delay={0.1} />
            <TimelineMarker time="02:00" delay={0.2} />
          </div>
        )}
        
        {!isActive && (
          <motion.div 
            className="play-btn-overlay premium-play-btn"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <Play size={24} fill="currentColor" />
          </motion.div>
        )}

        {isActive && !iframeSrc && (
          <video 
            ref={videoRef}
            src={videoUrl}
            loop
            playsInline
            controls
            className="card-video-preview"
          />
        )}
        {isActive && iframeSrc && (
          <iframe 
            src={`${iframeSrc}&autoplay=1`}
            className="card-video-preview"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
            title={title}
          />
        )}
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  const [activeTitle, setActiveTitle] = useState(null);
  const [activeTab, setActiveTab] = useState('talking');

  const projects = [
    { 
      title: "Cinematic Edit 01", 
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1000",
      iframeSrc: "https://player.vimeo.com/video/1204735353?badge=0&autopause=0&player_id=0&app_id=58479",
      aspect: "landscape",
    },
    { 
      title: "Cinematic Edit 02", 
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000",
      iframeSrc: "https://player.vimeo.com/video/1204735897?badge=0&autopause=0&player_id=0&app_id=58479",
      aspect: "landscape",
    },
    { 
      title: "Cinematic Edit 03", 
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1000",
      iframeSrc: "https://player.vimeo.com/video/1204735897?badge=0&autopause=0&player_id=0&app_id=58479",
      aspect: "landscape",
    },
    { 
      title: "Cinematic Brand Edit", 
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1000",
      iframeSrc: "https://player.vimeo.com/video/1194529845?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
      aspect: "landscape",
    },
    { 
      title: "Sports Cinematic Reel", 
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1000",
      iframeSrc: "https://player.vimeo.com/video/1194533318?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
      aspect: "vertical",
    },
    { 
      title: "Commercial Editorial", 
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
      iframeSrc: "https://player.vimeo.com/video/1194533525?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
      aspect: "vertical",
    },
    { 
      title: "Vertical Short Edit 03", 
      image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=1000",
      iframeSrc: "https://player.vimeo.com/video/1194538039?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
      aspect: "vertical",
    },
    { 
      title: "Vertical Short Edit 04", 
      image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&q=80&w=1000",
      iframeSrc: "https://player.vimeo.com/video/1194538346?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
      aspect: "vertical",
    }
  ];

  return (
    <section id="works" className="portfolio-section premium-portfolio">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="section-header premium-header"
        >
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#a78bfa] uppercase">PORTFOLIO SHOWCASE</span>
            <h2 className="section-title premium-title">MY BEST WORK</h2>
          </div>
          <div className="portfolio-tabs premium-tabs">
            <motion.button
              type="button"
              className={`tab-btn ${activeTab === 'talking' ? 'active' : ''}`}
              onClick={() => setActiveTab('talking')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Scissors size={14} /> CINEMATIC
            </motion.button>
            <motion.button
              type="button"
              className={`tab-btn ${activeTab === 'shorts' ? 'active' : ''}`}
              onClick={() => setActiveTab('shorts')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap size={14} /> SHORTS
            </motion.button>
          </div>
        </motion.div>
        
        <div className="portfolio-grid-premium">
          {projects
            .filter((p) => activeTab === 'talking' ? p.aspect === 'landscape' : p.aspect === 'vertical')
            .map((p, i) => (
              <div key={i} className={p.aspect === 'landscape' ? 'portfolio-item full-width' : 'portfolio-item'}>
                <ProjectCard 
                  {...p} 
                  isActive={activeTitle === p.title}
                  onPlay={() => setActiveTitle(p.title)}
                />
                {activeTitle === p.title && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="video-label premium-label"
                  >
                    <h3>{p.title}</h3>
                  </motion.div>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================================================
// SERVICES SECTION - EDITING CAPABILITIES
// ==========================================================================
const Services = () => {
  const services = [
    { 
      icon: <Video size={24} />, 
      title: "Full Video Editing", 
      desc: "Complete editorial assembly, pacing optimization, and professional color grading.",
      tags: ["DaVinci Resolve", "Premiere"]
    },
    { 
      icon: <Layers size={24} />, 
      title: "Motion Graphics", 
      desc: "Custom animations, dynamic titles, and visual effects that enhance your story.",
      tags: ["After Effects", "Motion"]
    },
    { 
      icon: <Smartphone size={24} />, 
      title: "Short-Form Content", 
      desc: "Instagram Reels, TikTok, and YouTube Shorts optimized for maximum engagement.",
      tags: ["Vertical Video", "Social"]
    },
    { 
      icon: <Mic2 size={24} />, 
      title: "Audio Engineering", 
      desc: "Professional sound design, mixing, and audio cleanup for pristine results.",
      tags: ["Fairlight", "Mixing"]
    },
    { 
      icon: <Scissors size={24} />, 
      title: "Podcast Editing", 
      desc: "Full podcast production, silence removal, and professional mastering.",
      tags: ["Podcast", "Audio"]
    },
    { 
      icon: <Zap size={24} />, 
      title: "Ads & VSL", 
      desc: "High-converting video sales letters and performance-focused ad creatives.",
      tags: ["Advertising", "VSL"]
    }
  ];

  return (
    <section id="services" className="services-section premium-services">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="section-header-centered premium-header"
        >
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#a78bfa] uppercase">SERVICES</span>
          <h2 className="section-title premium-title">WHAT I CREATE</h2>
          <p className="section-subtitle-text">Professional editing services tailored to elevate your content.</p>
        </motion.div>

        <div className="services-grid premium-grid">
          {services.map((s, i) => (
            <motion.div 
              key={i} 
              className="service-card premium-service-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -12, boxShadow: '0 20px 50px rgba(167, 139, 250, 0.16)' }}
            >
              <motion.div 
                className="service-icon-wrapper premium-icon"
                whileHover={{ scale: 1.15, rotate: 8 }}
                transition={{ duration: 0.3 }}
              >
                {s.icon}
              </motion.div>
              <h3 className="service-card-title">{s.title}</h3>
              <p className="service-card-desc">{s.desc}</p>
              <div className="service-tags">
                {s.tags.map((tag, ti) => (
                  <motion.span 
                    key={ti} 
                    className="service-tag premium-tag"
                    whileHover={{ scale: 1.08 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================================================
// ABOUT SECTION
// ==========================================================================
const About = () => {
  return (
    <section id="about" className="about-section premium-about">
      <div className="container">
        <div className="about-grid">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="about-content"
          >
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#a78bfa] uppercase">ABOUT</span>
            <h2 className="section-title premium-title">THE CRAFTSMAN</h2>
            <p className="about-text">
              I am a professional video editor obsessed with precision, pacing, and storytelling. Every cut, transition, and color grade is intentional.
            </p>
            <p className="about-text">
              With DaVinci Resolve Studio mastery and years of experience, I transform raw footage into premium content that drives results.
            </p>

            <div className="about-checklist">
              {[
                "Expert in DaVinci Resolve Studio",
                "Fast turnaround with quality assurance",
                "Unlimited revisions included",
                "Deliverables optimized for all platforms"
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  className="check-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <CheckCircle2 size={16} className="check-icon" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="about-stats">
              <div className="stat-item">
                <Counter value="50+" />
                <span className="stat-label">PROJECTS</span>
              </div>
              <div className="stat-item">
                <Counter value="100%" />
                <span className="stat-label">SATISFACTION</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="about-visual"
          >
            <div className="about-profile-card premium-profile">
              <div className="profile-frame">
                <img src={profileImg} alt="Siyam Saifullah - Video Editor & Motion Designer" className="about-profile-img" />
              </div>
              <div className="about-profile-info">
                <h3>Siyam Saifullah</h3>
                <p>Video Editor & Motion Designer</p>
                <div className="software-pills">
                  <span className="pill">DaVinci</span>
                  <span className="pill">After Effects</span>
                  <span className="pill">Premiere</span>
                  <span className="pill">Motion</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ==========================================================================
// PROCESS SECTION
// ==========================================================================
const Process = () => {
  const steps = [
    { number: "01", title: "Project Setup", desc: "Organize assets, confirm specifications, and establish editing protocol." },
    { number: "02", title: "Creative Editing", desc: "Build narrative flow, apply effects, refine pacing with precision cuts." },
    { number: "03", title: "Final Delivery", desc: "Color grade, mix audio, export in all required formats." }
  ];

  return (
    <section id="process" className="process-section premium-process">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="section-header-centered premium-header"
        >
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#a78bfa] uppercase">WORKFLOW</span>
          <h2 className="section-title premium-title">HOW I WORK</h2>
        </motion.div>

        <div className="process-grid premium-process-grid">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              whileHover={{ y: -12 }}
              className="process-item premium-process-item"
            >
              <motion.span 
                className="process-number premium-number"
                whileHover={{ scale: 1.15, rotate: 5 }}
              >
                {step.number}
              </motion.span>
              <h3 className="process-item-title">{step.title}</h3>
              <p className="process-item-desc">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================================================
// CONTACT SECTION
// ==========================================================================
const Contact = () => {
  return (
    <section id="contact" className="contact-section premium-contact">
      <div className="container contact-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="contact-card-premium"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="contact-header-premium"
          >
            <span className="contact-label">READY TO COLLABORATE</span>
            <h2 className="contact-title-premium">Let's Create <span className="text-[#a78bfa]">Premium Content</span></h2>
          </motion.div>

          <div className="contact-content-premium">
            <motion.a
              href="mailto:siyamsaifullah@gmail.com"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, x: 8 }}
              className="contact-email-link premium-link"
            >
              <Mail size={20} />
              <div className="email-info">
                <span className="email-label">Email</span>
                <span className="email-value">siyamsaifullah@gmail.com</span>
              </div>
              <ArrowRight size={16} />
            </motion.a>

            <div className="contact-divider" />

            <div className="contact-socials-premium">
              <span className="socials-label">Follow & Connect</span>
              <div className="socials-grid-premium">
                {[
                  { name: 'Instagram', url: 'https://www.instagram.com/siyam_saifullah/?hl=en', icon: 'instagram' },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/siyam-saifullah-739825406/', icon: 'linkedin' },
                  { name: 'X', url: 'https://x.com/home', icon: 'x' }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                    whileHover={{ scale: 1.15, y: -5 }}
                    className="social-link-premium"
                  >
                    <span>{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="contact-footer-premium"
          >
            <p>Premium editing for creators and brands who demand excellence.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ==========================================================================
// FOOTER
// ==========================================================================
const Footer = () => {
  return (
    <footer className="footer premium-footer">
      <div className="container footer-content">
        <motion.div
          className="footer-logo-wrap"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          <img src={profileImg} alt="Siyam Saifullah - Video Editor" className="footer-avatar" />
          <div className="logo logo-small">
            SIYAM SAIFULLAH<span className="dot">.</span>
          </div>
        </motion.div>
        <motion.div
          className="footer-info text-xs"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          &copy; {new Date().getFullYear()} Siyam Saifullah. Professional Video Editor.
        </motion.div>
        <motion.div
          className="footer-links"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.16 }}
        >
          <a href="https://www.linkedin.com/in/siyam-saifullah-739825406/" target="_blank" rel="noopener noreferrer" className="footer-link">
            LinkedIn
          </a>
          <a href="https://www.instagram.com/siyam_saifullah/?hl=en" target="_blank" rel="noopener noreferrer" className="footer-link">
            Instagram
          </a>
        </motion.div>
      </div>
    </footer>
  );
};

// ==========================================================================
// MAIN APP
// ==========================================================================
function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="app-wrapper">
          <Navbar />
          <Hero />
          <Portfolio />
          <Services />
          <About />
          <Process />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
