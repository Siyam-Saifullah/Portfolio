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
  AudioLines
} from 'lucide-react';
import './App.css';

import profileImg from './assets/profile.jpg';

// ==========================================================================
// 1. Page Intro Loader Component
// ==========================================================================
const Loader = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const duration = 1600; // 1.6 seconds
    const interval = 20; // ms
    const step = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setPercent((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="loader-logo"
        >
          Welcome to <span className="text-[#dfc7a7] font-normal lowercase italic font-serif">siyamsaifullah.com</span>
        </motion.div>
        
        <div className="loader-progress-track">
          <div 
            className="loader-progress-bar" 
            style={{ width: `${percent}%` }}
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
// 2. Counter Component for About Page Stats
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
// 3. Navigation Bar (Navbar) Component
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
        <a href="#" className="logo">
          Siyam Saifullah<span className="dot">.</span>
        </a>

        <div className="nav-links">
          {['About', 'Works', 'Services', 'Process', 'Contact'].map((item) => (
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
              {['About', 'Works', 'Services', 'Process', 'Contact'].map((item) => (
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hero-text-content"
        >
          <span className="badge">
            <Sparkles size={10} className="inline mr-2 text-white/60" />
            VIDEO EDITOR & MOTION DESIGNER
          </span>
          <h1 className="hero-title">
            CRAFTING<br />
            <span className="text-[#dfc7a7] italic font-light font-serif lowercase">Visual Narratives</span><br />
            FOR EVERY SCREEN
          </h1>
          <p className="hero-subtitle">
            I am Siyam Saifullah, a video editor and motion designer. I edit high-impact shorts, viral social reels, and engaging long-form video campaigns using DaVinci Resolve.
          </p>
          
          <div className="hero-actions">
            <a href="#works" className="btn btn-primary btn-large">
              PLAY SHOWREEL <Play size={14} fill="currentColor" />
            </a>
            <a href="#contact" className="btn btn-glass btn-large">
              GET IN TOUCH <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="hero-image-wrapper"
        >
          <div className="image-frame-container">
            <div className="image-frame">
              <img src={profileImg} alt="Siyam Saifullah" className="hero-image" />
            </div>
          </div>
          
          <motion.div 
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
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
        transition={{ delay: 0.8, duration: 0.8 }}
        className="scroll-indicator"
      >
        <div className="line"></div>
        <span className="scroll-text">EXPLORE WORK</span>
      </motion.div>
    </section>
  );
};

const SectionDivider = () => <div className="section-divider" />;

// ==========================================================================
// 5. About Section Component
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
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#dfc7a7] uppercase">THE VISION</span>
            <h2 className="section-title">THE ART OF <span className="text-[#dfc7a7] italic font-light lowercase">The Cut</span></h2>
            <p className="about-text">
              I am Siyam Saifullah, a dedicated video editor and motion designer. I translate raw concepts into high-retention vertical edits and commercial campaigns.
            </p>
            <p className="about-text">
              My editing methodology focuses on structural pacing, precise dialogue timing, immersive sound design (SFX), and polished overlays that keep viewers hooked from the first frame to the last.
            </p>
            
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
            <div className="visual-card glass">
              <div className="visual-icon-row">
                <div className="icon-badge primary-gradient"><Video size={18} /></div>
                <div className="icon-badge glass"><Scissors size={18} /></div>
              </div>
              <h3 className="visual-title">Production Value</h3>
              <p className="visual-desc">I streamline visual timelines, cut out fat, balance audio tracks, and add professional motion graphics assets.</p>
              <div className="software-pills">
                <span className="pill">DaVinci Resolve Studio</span>
                <span className="pill">After Effects CC</span>
                <span className="pill">Fairlight Sound Architecture</span>
                <span className="pill">Premiere Pro</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ==========================================================================
// 6. Portfolio / Works Section (Stacked Categories: Long-Form & Short-Form)
// ==========================================================================
const ProjectCard = ({ title, category, image, videoUrl, aspect }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
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
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
    }
  };

  const cardClass = aspect === 'vertical' ? 'project-card card-vertical' : 'project-card card-landscape';

  return (
    <div
      className={cardClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-image-wrapper">
        <img 
          src={image} 
          alt={title} 
          className="card-image"
        />
        {/* Live Video Preview on Hover with Sound */}
        <video 
          ref={videoRef}
          src={videoUrl}
          loop
          playsInline
          preload="none"
          className="card-video-preview"
        />
      </div>
      <div className="card-overlay">
        <span className="card-category">
          {category}
        </span>
        <h3 className="card-title">
          {title}
        </h3>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const projects = [
    // Landscape Works (16:9 format)
    { 
      title: "Commercial Editorial Assembly", 
      category: "LONG FORM CAMPAIGNS", 
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1000",
      videoUrl: "/video/horaizontal 01.mov",
      aspect: "landscape",
      desc: "A wide cinematic commercial campaign focusing on precise scene assembly, fluid narrative arcs, and dynamic dialogue pacing.",
      client: "Vogue Commerce",
      style: "Corporate / Clean Pacing",
      software: ["DaVinci Resolve Studio", "After Effects CC"]
    },
    // Vertical Works (9:16 format)
    { 
      title: "Virat Kohli Cinematic Edit", 
      category: "CREATIVE SHORTS & REELS", 
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1000",
      videoUrl: "/video/vertical 01.mp4",
      aspect: "vertical",
      desc: "A high-retention portrait-format sports edit. Employs speed ramping, rhythmic sync to audio feeds, and heavy audio soundscapes.",
      client: "Sports Hub",
      style: "Rhythmic / Viral Short",
      software: ["DaVinci Resolve Studio", "After Effects"]
    },
    { 
      title: "Dynamic Product Promo", 
      category: "COMMERCIAL REELS", 
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
      videoUrl: "/video/vertical 02.mp4",
      aspect: "vertical",
      desc: "An e-commerce social hook styled with kinetic typography overlays, motion graphics, and audio stabilization features.",
      client: "Direct to Consumer Brand",
      style: "Dynamic Captioning / Vertical Cut",
      software: ["DaVinci Resolve Studio"]
    },
    { 
      title: "DaVinci Resolve Pacing Showcase", 
      category: "SOCIAL METRIC EDITS", 
      image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=1000",
      videoUrl: "/video/vertical 03.mp4",
      aspect: "vertical",
      desc: "A fast-paced creative sequence designed to maximize retention rates, using jump cuts, micro-animations, and vocal pacing sync.",
      client: "Self Promotion",
      style: "High Retention Pacing",
      software: ["DaVinci Resolve Studio", "Fairlight Audio"]
    }
  ];

  const landscapeProjects = projects.filter(p => p.aspect === 'landscape');
  const verticalProjects = projects.filter(p => p.aspect === 'vertical');

  return (
    <section id="works" className="portfolio-section">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#dfc7a7] uppercase">SELECTED WORKS</span>
            <h2 className="section-title">PORTFOLIO & <span className="text-[#dfc7a7] italic font-light lowercase">Edits</span></h2>
          </div>
          <button className="view-all">
            VIEW REGISTRY <ChevronRight size={14} />
          </button>
        </div>
        
        {/* Stacked Layout Section 1: Long-Form (Landscape 16:9) */}
        <div className="mb-16">
          <div className="column-header mb-6">
            <h3 className="column-title">Long-Form Works</h3>
            <p className="column-subtitle">Cinematic widescreen 16:9 commercial campaigns and assemblies</p>
          </div>
          <div className="landscape-works-grid">
            {landscapeProjects.map((p, i) => (
              <ProjectCard 
                key={i} 
                {...p} 
              />
            ))}
          </div>
        </div>

        {/* Separator Line */}
        <div className="h-[1px] bg-white/5 w-full my-12" />

        {/* Stacked Layout Section 2: Short-Form (Vertical 9:16) */}
        <div>
          <div className="column-header mb-6">
            <h3 className="column-title">Short-Form Works & Reels</h3>
            <p className="column-subtitle">High-retention 9:16 portrait social media layouts</p>
          </div>
          <div className="vertical-works-grid">
            {verticalProjects.map((p, i) => (
              <ProjectCard 
                key={i} 
                {...p} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================================================
// 9. Services Component
// ==========================================================================
const Services = () => {
  const services = [
    { 
      icon: <Video size={24} />, 
      title: "Video Editorial Assembly", 
      desc: "Structuring rough cuts, selecting optimal pacing segments, trimming redundancies, and laying sound markers." 
    },
    { 
      icon: <Layers size={24} />, 
      title: "Motion Graphics Hooks", 
      desc: "Custom title keyframing, motion-tracked dynamic subtitles, graphic overlays, and visual effects tracking." 
    },
    { 
      icon: <Smartphone size={24} />, 
      title: "Short-Form Layouts", 
      desc: "Vertical 9:16 alignment configured for Instagram Reels, YouTube Shorts, and high-retention TikTok layouts." 
    },
    { 
      icon: <Mic2 size={24} />, 
      title: "Audio Engineering Sync", 
      desc: "Syncing multi-track dialogue feeds, cleaning background audio artifacts, volume leveling, and sound effects matching." 
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header-centered">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#dfc7a7] uppercase">CAPABILITIES</span>
          <h2 className="section-title">SERVICES STRUCTURED FOR <span className="text-[#dfc7a7] italic font-light lowercase">Impact</span></h2>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className="service-card">
              <div className="service-icon-wrapper">
                {s.icon}
              </div>
              <h3 className="service-card-title">{s.title}</h3>
              <p className="service-card-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================================================
// 10. Process Section Component
// ==========================================================================
const Process = () => {
  const steps = [
    { number: "01", title: "Project Sync & Sorting", desc: "Assembling raw clips, checking codec setups, cleaning dialogue channels, and setting down key marker structures." },
    { number: "02", title: "Editorial Timeline Cuts", desc: "Drafting the rough cuts layout, locking pacing grids, tracking active visual motion hooks, and aligning sound layers." },
    { number: "03", title: "Refinements & Delivery", desc: "Fine-tuning text overlays, rendering final color space transformations, balancing vocal outputs, and exporting files." }
  ];

  return (
    <section id="process" className="process-section">
      <div className="container">
        <div className="section-header-centered">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#dfc7a7] uppercase">THE ROUTINE</span>
          <h2 className="section-title">THE POST-PRODUCTION <span className="text-[#dfc7a7] italic font-light lowercase">Pipeline</span></h2>
        </div>

        <div className="process-grid">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="process-item"
            >
              <span className="process-number">{step.number}</span>
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
// 11. Testimonials Component
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="testimonial-card glass"
            >
              <p className="testimonial-text">{r.text}</p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar">{r.name[0]}</div>
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
// 12. Contact Form Component
// ==========================================================================
const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container contact-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="contact-card"
        >
          <div className="contact-glow">
            <Sparkles size={20} className="text-black" />
          </div>
          
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#dfc7a7] uppercase mb-4 block">GET IN TOUCH</span>
          <h2 className="contact-title">LET'S BUILD A <span className="text-[#dfc7a7] italic font-light lowercase">Masterpiece</span></h2>
          <p className="contact-desc">
            Ready to upgrade your video content? I am open for commissions, remote editorial roles, and post-production contracts.
          </p>
          
          <div className="contact-actions">
            <a href="mailto:siyamsaifullah@gmail.com" className="btn btn-primary btn-large">
              <Mail size={16} /> INITIATE CONTRACT
            </a>
            <div className="social-links">
              <a 
                href="https://www.instagram.com/siyam_saifullah/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                title="Instagram"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/siyam-saifullah-739825406/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                title="LinkedIn"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://x.com/home" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                title="X (Twitter)"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ==========================================================================
// 13. Footer Component
// ==========================================================================
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="logo logo-small">
          Siyam Saifullah<span className="dot">.</span>
        </div>
        <div className="footer-info text-xs">
          © {new Date().getFullYear()} Siyam Saifullah. All rights reserved. Video Editor & Motion Designer.
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
// 14. Main Application Root (Wiring page state)
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
          
          <SectionDivider />
          <Portfolio />
          
          <SectionDivider />
          <About />
          
          <SectionDivider />
          <Services />
          
          <SectionDivider />
          <Process />
          
          <SectionDivider />
          <Testimonials />
          
          <SectionDivider />
          <Contact />
          
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
