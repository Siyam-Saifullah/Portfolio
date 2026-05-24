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
  CheckCircle2
} from 'lucide-react';
import './App.css';

import profileImg from './assets/profile.jpg';

// ==========================================================================
// 1. Page Intro Loader Component
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
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
      }}
    >
      <div className="loader-inner">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="loader-logo"
        >
          <span className="text-[#dfc7a7] font-normal lowercase italic font-serif">loading</span>
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
// 2. Counter Component for Stats
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
// 3. Navigation Bar
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
        className="fixed top-0 left-0 right-0 h-[1px] bg-white origin-left z-[1000]"
        style={{ scaleX: scrollYProgress }}
      />
      
      <div className="container nav-container">
        {/* Logo with profile pic */}
        <a href="#" className="logo logo-with-avatar">
          <img src={profileImg} alt="Siyam Saifullah" className="nav-avatar" />
          Siyam Saifullah<span className="dot">.</span>
        </a>

        <div className="nav-links">
          {['Works', 'Services', 'About', 'Process', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-item">
              {item}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary" style={{ padding: '0.55rem 1.4rem', fontSize: '0.7rem' }}>
            HIRE ME
          </a>
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
// 4. Hero Component
// ==========================================================================
const Hero = () => {
  return (
    <section className="hero">
      <div className="bg-ambient-orb orb-indigo" />
      <div className="bg-ambient-orb orb-purple" />
      
      <div className="container hero-layout">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="hero-text-content"
        >
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="badge"
          >
            <Sparkles size={10} className="inline mr-2 text-white/60" />
            VIDEO EDITOR &amp; MOTION DESIGNER
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hero-title"
          >
            EDITS THAT<br />
            <span className="text-[#dfc7a7] italic font-light font-serif lowercase">Stop the Scroll</span><br />
            &amp; DRIVE RESULTS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-subtitle"
          >
            I am Siyam Saifullah. I craft high-retention short-form reels, viral social content, and cinematic long-form campaigns using DaVinci Resolve. No boring content. No wasted time.
          </motion.p>

          {/* Social proof strip */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="hero-social-proof"
          >
            <div className="proof-avatars">
              <div className="proof-avatar" style={{ background: 'linear-gradient(135deg, #dfc7a7, #a08060)' }}>S</div>
              <div className="proof-avatar" style={{ background: 'linear-gradient(135deg, #6b7a99, #3d4a63)' }}>J</div>
              <div className="proof-avatar" style={{ background: 'linear-gradient(135deg, #8b6f5e, #5a3e30)' }}>M</div>
            </div>
            <div className="proof-text">
              <div className="proof-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#dfc7a7" stroke="none" />)}
              </div>
              <span>Trusted by creators &amp; brands worldwide</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-actions"
          >
            <a href="#works" className="btn btn-primary btn-large">
              VIEW MY WORK <Play size={14} fill="currentColor" />
            </a>
            <a href="#contact" className="btn btn-glass btn-large">
              LET'S CONNECT <ArrowRight size={14} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hero-image-wrapper"
        >
          <div className="image-frame-container">
            <div className="image-frame">
              <img src={profileImg} alt="Siyam Saifullah" className="hero-image" />
            </div>
          </div>
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="experience-tag glass animate-float"
          >
            <span className="years">2+</span>
            <span className="label">Years of<br />Visual Mastery</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="scroll-indicator"
      >
        <div className="line"></div>
        <span className="scroll-text">EXPLORE WORK</span>
      </motion.div>
    </section>
  );
};

// ==========================================================================
// 5. Stats Strip Component (between Hero and Works)
// ==========================================================================
const StatsStrip = () => {
  const stats = [
    { value: "50+", label: "Projects Completed", sub: "Across all formats" },
    { value: "100%", label: "Client Satisfaction", sub: "On every delivery" },
    { value: "2+", label: "Years Experience", sub: "Professional editing" },
    { value: "3X", label: "Avg. Engagement Boost", sub: "For client content" }
  ];

  return (
    <section className="stats-strip">
      <div className="container">
        <div className="stats-strip-grid">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="stats-strip-item"
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.4 }}
              >
                <Counter value={s.value} />
              </motion.div>
              <span className="stats-strip-label">{s.label}</span>
              <span className="stats-strip-sub">{s.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SectionDivider = () => <div className="section-divider" />;

// ==========================================================================
// 6. Portfolio / Works Section
// ==========================================================================
const ProjectCard = ({ title, image, videoUrl, iframeSrc, aspect, isActive, onPlay }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.muted = false;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("Audio autoplay blocked by browser, falling back to muted:", error);
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(e => console.error("Fallback play failed:", e));
          }
        });
      }
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.muted = true;
      try {
        videoRef.current.currentTime = 0;
      } catch (err) {
        // Safe catch
      }
    }
  }, [isActive]);

  const handleCardClick = () => {
    if (isActive) return;
    onPlay();
  };

  const cardClass = aspect === 'vertical' ? 'project-card card-vertical' : 'project-card card-landscape';

  return (
    <div
      className={`${cardClass} ${isActive ? 'active' : ''}`}
      onClick={handleCardClick}
      style={{ cursor: isActive ? 'default' : 'pointer' }}
    >
      <div className="card-image-wrapper">
        <img 
          src={image} 
          alt={title} 
          className="card-image"
          style={{ opacity: isActive ? 0 : 1, transition: 'opacity 0.3s ease' }}
        />
        
        {/* Play Button Overlay */}
        {!isActive && (
          <div className="play-btn-overlay">
            <Play size={20} fill="currentColor" style={{ marginLeft: '3px' }} />
          </div>
        )}

        {/* Local Video */}
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
        {/* Vimeo iframe */}
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
    </div>
  );
};

const Portfolio = () => {
  const [activeTitle, setActiveTitle] = useState(null);

  const projects = [
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
    <section id="works" className="portfolio-section">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#dfc7a7] uppercase">SELECTED WORKS</span>
            <h2 className="section-title">PORTFOLIO</h2>
          </div>
        </div>
        
        {/* Smart Mixed Layout */}
        <div className="portfolio-grid-smart">
          {projects.map((p, i) => (
            <div key={i} className={p.aspect === 'landscape' ? 'portfolio-item full-width' : 'portfolio-item'}>
              <ProjectCard 
                {...p} 
                isActive={activeTitle === p.title}
                onPlay={() => setActiveTitle(p.title)}
              />
              {activeTitle === p.title && (
                <div className="video-label">
                  <h3>{p.title}</h3>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================================================
// 7. Services Component
// ==========================================================================
const Services = () => {
  const services = [
    { 
      icon: <Video size={24} />, 
      title: "Video Editorial Assembly", 
      desc: "Structuring rough cuts, selecting optimal pacing segments, trimming redundancies, and laying sound markers.",
      tags: ["DaVinci Resolve", "Premiere Pro"]
    },
    { 
      icon: <Layers size={24} />, 
      title: "Motion Graphics Hooks", 
      desc: "Custom title keyframing, motion-tracked dynamic subtitles, graphic overlays, and visual effects tracking.",
      tags: ["After Effects", "Motion Tracking"]
    },
    { 
      icon: <Smartphone size={24} />, 
      title: "Short-Form Reels & Shorts", 
      desc: "Vertical 9:16 alignment configured for Instagram Reels, YouTube Shorts, and high-retention TikTok layouts.",
      tags: ["Instagram Reels", "YouTube Shorts"]
    },
    { 
      icon: <Mic2 size={24} />, 
      title: "Audio Engineering & Sync", 
      desc: "Syncing multi-track dialogue feeds, cleaning background audio artifacts, volume leveling, and sound effects matching.",
      tags: ["Fairlight", "Audio Cleanup"]
    },
    { 
      icon: <Scissors size={24} />, 
      title: "Podcast & Long-Form Editing", 
      desc: "Full episode editing, silence removal, segment structuring, chapter markers, and export-ready formatting.",
      tags: ["Podcast", "Long-Form"]
    },
    { 
      icon: <AudioLines size={24} />, 
      title: "Ad Creatives & VSL", 
      desc: "High-converting video sales letters, hook-first ad creatives, and platform-optimized performance cuts.",
      tags: ["VSL", "Ad Creatives"]
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header-centered">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#dfc7a7] uppercase">CAPABILITIES</span>
          <h2 className="section-title">WHAT I <span className="text-[#dfc7a7] italic font-light lowercase">Do</span></h2>
          <p className="section-subtitle-text">Everything you need to make your content perform at the highest level.</p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <motion.div 
              key={i} 
              className="service-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
            >
              <motion.div 
                className="service-icon-wrapper"
                whileHover={{ scale: 1.1, rotate: 5 }}
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
                    className="service-tag"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
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
// 8. About Section
// ==========================================================================
const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="about-content"
          >
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#dfc7a7] uppercase">THE EDITOR</span>
            <h2 className="section-title">THE ART OF <span className="text-[#dfc7a7] italic font-light lowercase">The Cut</span></h2>
            <p className="about-text">
              I am Siyam Saifullah, a dedicated video editor and motion designer based in Bangladesh. I turn raw footage into stories that make people stop scrolling and start watching.
            </p>
            <p className="about-text">
              My approach focuses on structural pacing, precise dialogue timing, immersive sound design, and polished overlays that keep viewers hooked from frame one to the last second.
            </p>

            {/* Why work with me checklist */}
            <div className="about-checklist">
              {[
                "Fast turnaround without cutting corners",
                "Revisions until you are 100% happy",
                "Clear communication at every stage",
                "Platform-optimised exports for every format"
              ].map((item, i) => (
                <div key={i} className="check-item">
                  <CheckCircle2 size={15} className="check-icon" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            
            <div className="about-stats">
              <div className="stat-item">
                <Counter value="50+" />
                <span className="stat-label">COMPLETED PROJECTS</span>
              </div>
              <div className="stat-item">
                <Counter value="100%" />
                <span className="stat-label">CLIENT SATISFACTION</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="about-visual"
          >
            <div className="about-profile-card glass">
              <img src={profileImg} alt="Siyam Saifullah" className="about-profile-img" />
              <div className="about-profile-info">
                <h3>Siyam Saifullah</h3>
                <p>Video Editor &amp; Motion Designer</p>
                <div className="software-pills">
                  <span className="pill">DaVinci Resolve Studio</span>
                  <span className="pill">After Effects CC</span>
                  <span className="pill">Fairlight</span>
                  <span className="pill">Premiere Pro</span>
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
// 9. Process Section
// ==========================================================================
const Process = () => {
  const steps = [
    { number: "01", title: "Project Sync & Sorting", desc: "Assembling raw clips, checking codec setups, cleaning dialogue channels, and setting down key marker structures." },
    { number: "02", title: "Editorial Timeline Cuts", desc: "Drafting the rough cuts layout, locking pacing grids, tracking active visual motion hooks, and aligning sound layers." },
    { number: "03", title: "Refinements & Delivery", desc: "Fine-tuning text overlays, rendering final colour grading, balancing vocal outputs, and exporting in your required format." }
  ];

  return (
    <section id="process" className="process-section">
      <div className="container">
        <div className="section-header-centered">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#dfc7a7] uppercase">THE WORKFLOW</span>
          <h2 className="section-title">HOW I <span className="text-[#dfc7a7] italic font-light lowercase">Work</span></h2>
        </div>

        <div className="process-grid">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="process-item"
            >
              <motion.span 
                className="process-number"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
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
// 10. Testimonials Component
// ==========================================================================
const Testimonials = () => {
  const reviews = [
    { name: "Alex Rivera", role: "Content Director", text: "Siyam's post-production is top-tier. He transformed standard clips into highly engaging visual flow." },
    { name: "Sarah Chen", role: "Brand Lead", text: "Punctual, responsive, and incredibly talented. The motion graphics Siyam added gave our ads a premium look." },
    { name: "James Wilson", role: "Podcast Host", text: "Vocal cleanup was spectacular. Pacing of the short clips doubled our monthly platform metrics." }
  ];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-header-centered">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#dfc7a7] uppercase">FEEDBACK</span>
          <h2 className="section-title">CLIENTS <span className="text-[#dfc7a7] italic font-light lowercase">Say</span></h2>
        </div>
        
        <div className="testimonials-grid">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="testimonial-card glass"
            >
              <div className="testimonial-stars">
                {[...Array(5)].map((_, si) => (
                  <motion.div
                    key={si}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + si * 0.05, duration: 0.4 }}
                  >
                    <Star size={12} fill="#dfc7a7" stroke="none" />
                  </motion.div>
                ))}
              </div>
              <p className="testimonial-text">{r.text}</p>
              <div className="testimonial-footer">
                <motion.div 
                  className="testimonial-avatar"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {r.name[0]}
                </motion.div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">{r.name}</h4>
                  <p className="testimonial-role">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================================================
// 11. Contact Component
// ==========================================================================
const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container contact-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="contact-card-minimal"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="contact-header-minimal"
          >
            <span className="contact-label">LET'S COLLABORATE</span>
            <h2 className="contact-title-minimal">Ready to Create Something<br /><span className="text-[#dfc7a7]">Extraordinary?</span></h2>
          </motion.div>

          <div className="contact-content-minimal">
            <motion.a
              href="mailto:siyamsaifullah@gmail.com"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.03, x: 5 }}
              className="contact-email-link"
            >
              <Mail size={20} />
              <div className="email-info">
                <span className="email-label">Email</span>
                <span className="email-value">siyamsaifullah@gmail.com</span>
              </div>
              <ArrowRight size={16} />
            </motion.a>

            <div className="contact-divider" />

            <div className="contact-socials-minimal">
              <span className="socials-label">Follow & Connect</span>
              <div className="socials-grid-minimal">
                <motion.a
                  href="https://www.instagram.com/siyam_saifullah/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.12, y: -5 }}
                  className="social-link-minimal"
                  title="Instagram"
                >
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/siyam-saifullah-739825406/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  whileHover={{ scale: 1.12, y: -5 }}
                  className="social-link-minimal"
                  title="LinkedIn"
                >
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>LinkedIn</span>
                </motion.a>

                <motion.a
                  href="https://x.com/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.12, y: -5 }}
                  className="social-link-minimal"
                  title="X (Twitter)"
                >
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>X / Twitter</span>
                </motion.a>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="contact-footer-minimal"
          >
            <p>Let's create something that resonates. Whether you need cinematic editing, motion graphics, or a complete visual transformation—I'm ready to collaborate.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ==========================================================================
// 12. Footer
// ==========================================================================
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-logo-wrap">
          <img src={profileImg} alt="Siyam Saifullah" className="footer-avatar" />
          <div className="logo logo-small">
            Siyam Saifullah<span className="dot">.</span>
          </div>
        </div>
        <div className="footer-info text-xs">
          © {new Date().getFullYear()} Siyam Saifullah. All rights reserved. Video Editor &amp; Motion Designer.
        </div>
        <div className="footer-links">
          <a 
            href="https://www.linkedin.com/in/siyam-saifullah-739825406/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            LinkedIn
          </a>
          <a 
            href="https://www.instagram.com/siyam_saifullah/?hl=en" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

// ==========================================================================
// 13. Main App Root
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
          
          <StatsStrip />
          <Portfolio />
          <Services />
          <About />
          <Process />
          <Testimonials />
          <Contact />
          
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
