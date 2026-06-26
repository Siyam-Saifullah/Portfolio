import { useState, useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import { Play, Video, Layers, Smartphone, Mic2, Mail, Menu, X, ArrowRight, Scissors, CheckCircle2, Zap } from 'lucide-react';
import './App.css';

import profileImg from './assets/profile.webp';
import heroProfileImg from './assets/hero-profile.webp';

const Loader = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [hidden, setHidden] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const duration = 1100;
    const interval = 24;
    const step = 100 / (duration / interval);

    timerRef.current = setInterval(() => {
      setPercent((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timerRef.current);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (percent >= 100) {
      const t = setTimeout(() => {
        setHidden(true);
        setTimeout(onComplete, 260);
      }, 120);
      return () => clearTimeout(t);
    }
  }, [percent, onComplete]);

  return (
    <div className={`loader-container ${hidden ? 'is-hidden' : ''}`}>
      <div className="loader-inner">
        <div className="loader-logo">
          <div className="film-reel">
            <Scissors size={32} />
          </div>
          <span>editing in progress</span>
        </div>
        <div className="loader-progress-track">
          <div className="loader-progress-bar" style={{ width: `${percent}%` }} />
        </div>
        <span className="loader-percentage">{Math.round(percent)}%</span>
      </div>
    </div>
  );
};

const Counter = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isInView.current) {
        isInView.current = true;
        const end = parseInt(value.replace(/[^0-9]/g, '')) || 0;
        if (end === 0) return;
        const intervalTime = Math.max(Math.floor((duration * 1000) / end), 15);
        const timer = setInterval(() => {
          setCount((c) => {
            const next = c + 1;
            if (next >= end) {
              clearInterval(timer);
              return end;
            }
            return next;
          });
        }, intervalTime);
      }
    }, { threshold: 0.2 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  const suffix = value.replace(/[0-9]/g, '');
  return <span ref={ref} className="stat-num">{count}{suffix}</span>;
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      const nav = document.querySelector('.navbar');
      const menu = document.querySelector('.mobile-nav');
      const toggle = document.querySelector('.mobile-toggle');
      if (!nav || !menu || !toggle) return;
      if (menu.contains(e.target) || toggle.contains(e.target)) return;
      setIsOpen(false);
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('pointerdown', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('pointerdown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-progress-line" style={{ transform: `scaleX(${scrollYProgress})` }} />
      <div className="container nav-container">
        <a href="#" className="logo logo-with-avatar">
          <img src={profileImg} alt="Siyam Saifullah - Video Editor" className="nav-avatar" loading="lazy" />
          <span className="logo-text">SIYAM SAIFULLAH</span><span className="dot">.</span>
        </a>
        <div className="nav-links">
          {['Works', 'Services', 'About', 'Process', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-item">
              {item}
            </a>
          ))}
        </div>
        <div className="mobile-toggle">
          <button onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} className="toggle-btn">
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      <div className="mobile-nav" data-open={isOpen ? '1' : '0'} aria-hidden={isOpen}>
        <div className="mobile-nav-content">
          {['Works', 'Services', 'About', 'Process', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="mobile-item">
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg-grid" />
      <div className="hero-layout">
        <div className="hero-text-content">
          <div className="badge premium-badge">
            <Zap size={12} style={{ color: '#a78bfa' }} />
            <span>PREMIUM VIDEO EDITOR</span>
          </div>
          <h1 className="hero-title premium-title">
            <span className="sr-only">Siyam Saifullah - Professional Video Editor & Motion Designer Portfolio</span>
            CUTS THAT
            <span className="accent-text"> CAPTIVATE</span>
            <br />& CONVERT
          </h1>
          <p className="hero-subtitle premium-subtitle">
            Professional video editing that transforms raw footage into scroll-stopping content. Cinematic pacing, premium sound design, and
            pixel-perfect timing.
          </p>
          <div className="hero-actions">
            <a href="#works" className="btn btn-primary btn-large premium-btn">
              <Play size={14} fill="currentColor" /> VIEW PORTFOLIO
            </a>
            <a href="#contact" className="btn btn-glass btn-large premium-btn">
              <Zap size={14} /> START PROJECT
            </a>
          </div>
        </div>
        <div className="hero-image-wrapper premium-image">
          <div className="premium-frame">
            <div className="frame-border" />
            <img src={heroProfileImg} alt="Siyam Saifullah - Professional Cinematic Video Editor" className="hero-image premium-image-img" decoding="async" />
            <div className="frame-accent" />
          </div>
          <div className="experience-badge">
            <div className="badge-content">
              <span className="years">2+</span>
              <span className="label">Years<br />Experience</span>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span className="scroll-text">SCROLL TO DISCOVER</span>
      </div>
    </section>
  );
};

const ProjectCard = ({ title, image, videoUrl, iframeSrc, aspect, isActive, onPlay }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.muted = false;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
      }
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.muted = true;
      try {
        videoRef.current.currentTime = 0;
      } catch {
        // ignore
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
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleCardClick();
      }}
      style={{ cursor: isActive ? 'default' : 'pointer', display: isActive ? 'block' : 'block' }}
    >
      <div className="card-image-wrapper premium-card-wrapper">
        <img src={image} alt={`${title} - Video Editing by Siyam Saifullah`} className="card-image premium-card-image" style={{ opacity: isActive ? 0 : 1, transition: 'opacity .3s ease' }} decoding="async" loading="lazy" onError={(e) => { e.target.style.display = 'none'; }} />

        {!isActive && (
          <div className="premium-play-btn" aria-hidden="true">
            <Play size={24} fill="currentColor" />
          </div>
        )}

        {isActive && !iframeSrc && (
          <video ref={videoRef} src={videoUrl} loop playsInline controls className="card-video-preview" />
        )}
        {isActive && iframeSrc && (
          <iframe
            src={`${iframeSrc}?autoplay=1&loop=1&playlist=${iframeSrc.split('/').pop()}&controls=1&showinfo=0&rel=0&modestbranding=1`}
            className="card-video-preview"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title={title}
          />
        )}
      </div>
      {isActive && (
        <div className="video-label premium-label">
          <h3>{title}</h3>
        </div>
      )}
    </div>
  );
};

const Portfolio = () => {
  const [activeTitle, setActiveTitle] = useState(null);

  const cinematicProjects = [
    { title: 'Duration', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80', iframeSrc: 'https://www.youtube-nocookie.com/embed/nvk7W27hkkg', aspect: 'landscape' },
    { title: 'Editing', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80', iframeSrc: 'https://www.youtube-nocookie.com/embed/gNZN6h7EBTM', aspect: 'landscape' },
    { title: 'Style', image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80', iframeSrc: 'https://www.youtube-nocookie.com/embed/XWvZdVAXV8I', aspect: 'landscape' },
  ];

  const shortProjects = [
    { title: 'Vertical Short Edit 01', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80', iframeSrc: 'https://www.youtube-nocookie.com/embed/a7saLfE73_Y', aspect: 'vertical' },
    { title: 'Vertical Short Edit 02', image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80', iframeSrc: 'https://www.youtube-nocookie.com/embed/ZKJ36Pu3o78', aspect: 'vertical' },
    { title: 'Vertical Short Edit 03', image: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1000&q=80', iframeSrc: 'https://www.youtube-nocookie.com/embed/KxLkb1rH0Qg', aspect: 'vertical' },
    { title: 'Vertical Short Edit 04', image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=1000&q=80', iframeSrc: 'https://www.youtube-nocookie.com/embed/5OrsIIRBWxQ', aspect: 'vertical' },
  ];

  const renderGroup = (label, items) => (
    <>
      <div className="section-header-centered premium-header" style={{ marginBottom: '1.6rem' }}>
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#a78bfa] uppercase">{label}</span>
      </div>
      <div className="portfolio-grid-premium">
        {items.map((p) => (
          <div key={p.title} className={p.aspect === 'landscape' ? 'portfolio-item full-width' : 'portfolio-item'}>
            <ProjectCard {...p} isActive={activeTitle === p.title} onPlay={() => setActiveTitle(p.title)} />
            {activeTitle === p.title && (
              <div className="video-label premium-label">
                <h3>{p.title}</h3>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="section-divider" />
    </>
  );

  return (
    <section id="works" className="portfolio-section premium-portfolio">
      <div className="container">
        {renderGroup('CINEMATIC', cinematicProjects)}
        {renderGroup('SHORTS', shortProjects)}
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { icon: <Video size={24} />, title: 'Full Video Editing', desc: 'Complete editorial assembly, pacing optimization, and professional color grading.', tags: ['DaVinci Resolve', 'Premiere'] },
    { icon: <Layers size={24} />, title: 'Motion Graphics', desc: 'Custom animations, dynamic titles, and visual effects that enhance your story.', tags: ['After Effects', 'Motion'] },
    { icon: <Smartphone size={24} />, title: 'Short-Form Content', desc: 'Instagram Reels, TikTok, and YouTube Shorts optimized for maximum engagement.', tags: ['Vertical Video', 'Social'] },
    { icon: <Mic2 size={24} />, title: 'Audio Engineering', desc: 'Professional sound design, mixing, and audio cleanup for pristine results.', tags: ['Fairlight', 'Mixing'] },
    { icon: <Scissors size={24} />, title: 'Podcast Editing', desc: 'Full podcast production, silence removal, and professional mastering.', tags: ['Podcast', 'Audio'] },
    { icon: <Zap size={24} />, title: 'Ads & VSL', desc: 'High-converting video sales letters and performance-focused ad creatives.', tags: ['Advertising', 'VSL'] },
  ];

  return (
    <section id="services" className="services-section premium-services">
      <div className="container">
        <div className="section-header-centered premium-header">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#a78bfa] uppercase">SERVICES</span>
          <h2 className="section-title premium-title">WHAT I CREATE</h2>
          <p className="section-subtitle-text">Professional editing services tailored to elevate your content.</p>
        </div>
        <div className="services-grid premium-grid">
          {services.map((s, i) => (
            <div key={i} className="service-card premium-service-card">
              <div className="service-icon-wrapper premium-icon">{s.icon}</div>
              <h3 className="service-card-title">{s.title}</h3>
              <p className="service-card-desc">{s.desc}</p>
              <div className="service-tags">
                {s.tags.map((tag, ti) => (
                  <span key={ti} className="service-tag premium-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="about-section premium-about">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#a78bfa] uppercase">ABOUT</span>
            <h2 className="section-title premium-title">THE CRAFTSMAN</h2>
            <p className="about-text">
              I am a professional video editor obsessed with precision, pacing, and storytelling. Every cut, transition, and color grade is intentional.
            </p>
            <p className="about-text">
              With DaVinci Resolve Studio mastery and years of experience, I transform raw footage into premium content that drives results.
            </p>
            <div className="about-checklist">
              {['Expert in DaVinci Resolve Studio', 'Fast turnaround with quality assurance', 'Unlimited revisions included', 'Deliverables optimized for all platforms'].map((item, i) => (
                <div key={i} className="check-item">
                  <CheckCircle2 size={16} className="check-icon" />
                  <span>{item}</span>
                </div>
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
          </div>
          <div className="about-visual">
            <div className="about-profile-card premium-profile">
              <div className="profile-frame">
                <img src={profileImg} alt="Siyam Saifullah - Video Editor & Motion Designer" className="about-profile-img" loading="lazy" />
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
          </div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { number: '01', title: 'Project Setup', desc: 'Organize assets, confirm specifications, and establish editing protocol.' },
    { number: '02', title: 'Creative Editing', desc: 'Build narrative flow, apply effects, refine pacing with precision cuts.' },
    { number: '03', title: 'Final Delivery', desc: 'Color grade, mix audio, export in all required formats.' },
  ];

  return (
    <section id="process" className="process-section premium-process">
      <div className="container">
        <div className="section-header-centered premium-header">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#a78bfa] uppercase">WORKFLOW</span>
          <h2 className="section-title premium-title">HOW I WORK</h2>
        </div>
        <div className="process-grid premium-process-grid">
          {steps.map((step, i) => (
            <div key={i} className="process-item premium-process-item">
              <span className="process-number premium-number">{step.number}</span>
              <h3 className="process-item-title">{step.title}</h3>
              <p className="process-item-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="contact-section premium-contact">
      <div className="container contact-container">
        <div className="contact-card-premium">
          <div className="contact-header-premium">
            <span className="contact-label">READY TO COLLABORATE</span>
            <h2 className="contact-title-premium">
              Let's Create <span className="text-[#a78bfa]">Premium Content</span>
            </h2>
          </div>
          <div className="contact-content-premium">
            <a href="mailto:siyamsaifullah@gmail.com" className="contact-email-link premium-link">
              <Mail size={20} />
              <div className="email-info">
                <span className="email-label">Email</span>
                <span className="email-value">siyamsaifullah@gmail.com</span>
              </div>
              <ArrowRight size={16} />
            </a>
            <div className="contact-divider" />
            <div className="contact-socials-premium">
              <span className="socials-label">Follow & Connect</span>
              <div className="socials-grid-premium">
                <a href="https://www.instagram.com/siyam_saifullah/?hl=en" className="social-link-premium" target="_blank" rel="noopener noreferrer">
                  <span>Instagram</span>
                </a>
                <a href="https://www.linkedin.com/in/siyam-saifullah-739825406/" className="social-link-premium" target="_blank" rel="noopener noreferrer">
                  <span>LinkedIn</span>
                </a>
                <a href="https://x.com/home" className="social-link-premium" target="_blank" rel="noopener noreferrer">
                  <span>X</span>
                </a>
              </div>
            </div>
          </div>
          <div className="contact-footer-premium">
            <p>Premium editing for creators and brands who demand excellence.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer premium-footer">
      <div className="container footer-content">
        <div className="footer-logo-wrap">
          <img src={profileImg} alt="Siyam Saifullah - Video Editor" className="footer-avatar" loading="lazy" />
          <div className="logo logo-small">SIYAM SAIFULLAH<span className="dot">.</span></div>
        </div>
        <div className="footer-info text-xs">&copy; {new Date().getFullYear()} Siyam Saifullah. Professional Video Editor.</div>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/siyam-saifullah-739825406/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href="https://www.instagram.com/siyam_saifullah/?hl=en" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
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
