import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Video, Smartphone, Zap, BarChart2, Clock, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import YouTubePlayer from './YouTubePlayer';
import './App.css';

import profileImg from './assets/profile.webp';

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
    <motion.div
      className={`loader-container ${hidden ? 'is-hidden' : ''}`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <div className="loader-inner">
        <div className="loader-logo">
          <span>Siyam Saifullah</span>
        </div>
        <div className="loader-progress-track">
          <div className="loader-progress-bar" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#" className="logo">
          <img src={profileImg} alt="Siyam Saifullah" className="nav-avatar" />
          SIYAM SAIFULLAH
        </a>
        <div className="nav-links">
          <a href="#work" className="nav-item">Work</a>
          <a href="#process" className="nav-item">Process</a>
          <a href="#services" className="nav-item">Services</a>
        </div>
        <a href="#contact" className="btn-primary-nav">Hire Me</a>
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          <MenuIcon />
        </button>
      </div>

      {/* Mobile Nav */}
      <div className="mobile-nav" data-open={isOpen ? '1' : '0'}>
        <a href="#work" className="mobile-item" onClick={() => setIsOpen(false)}>Work</a>
        <a href="#process" className="mobile-item" onClick={() => setIsOpen(false)}>Process</a>
        <a href="#services" className="mobile-item" onClick={() => setIsOpen(false)}>Services</a>
        <a href="#contact" className="mobile-item" onClick={() => setIsOpen(false)}>Contact</a>
      </div>
    </nav>
  );
};

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-layout">
        <motion.div
          className="hero-text-content"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="hero-avatar-wrapper"
            style={{ marginBottom: '1.5rem' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={profileImg} alt="Siyam Saifullah" className="hero-avatar-large" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent)' }} />
          </motion.div>
          <h1 className="hero-title">
            Content that <br />
            <span className="accent-text">commands</span> attention.
          </h1>
          <p className="hero-subtitle">
            I am a Video Editor. I help creators and brands increase retention through modern pacing, storytelling, and premium editing across short-form, talking heads, and long-form content.
          </p>
          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">
              <PlayCircle size={20} /> Watch Showreel
            </a>
            <a href="#contact" className="btn btn-secondary">
              Hire Me
            </a>
          </div>
        </motion.div>
        <motion.div
          className="hero-image-wrapper"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <iframe
            src="https://player.vimeo.com/video/1209555182?api=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&loop=1&muted=0"
            className="hero-video-reel scroll-auto-video"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            frameBorder="0"
            title="Timeline 1"
          />
        </motion.div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  return (
    <motion.section
      className="social-proof"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <div className="container">
        <div className="stats-grid">
          <motion.div className="stat-item" variants={staggerItem}>
            <span className="stat-num">10M+</span>
            <span className="stat-label">Views Generated</span>
          </motion.div>
          <motion.div className="stat-item" variants={staggerItem}>
            <span className="stat-num">500+</span>
            <span className="stat-label">Videos Edited</span>
          </motion.div>
          <motion.div className="stat-item" variants={staggerItem}>
            <span className="stat-num">30+</span>
            <span className="stat-label">Happy Clients</span>
          </motion.div>
          <motion.div className="stat-item" variants={staggerItem}>
            <span className="stat-num">48h</span>
            <span className="stat-label">Avg Turnaround</span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const extractVideoId = (url) => {
  const match = url.match(/\/embed\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

const ClientReview = () => {
  return (
    <motion.section
      className="client-review-section"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <div className="container">
        <div className="section-header-centered">
          <h2 className="section-title">Client Review</h2>
          <p className="section-subtitle-text">Hear directly from the creators I work with.</p>
        </div>
        <div className="review-video-wrapper">
          <YouTubePlayer
            videoId="xvLJ-11R-dU"
            className="scroll-auto-video"
            title="Client Testimonial for Siyam Saifullah"
          />
        </div>
      </div>
    </motion.section>
  );
};

const ProjectCard = ({ title, category, image, iframeSrc, isVertical }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      className={`portfolio-item ${isVertical ? 'vertical' : ''}`}
      onClick={() => setIsPlaying(true)}
      variants={staggerItem}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {!isPlaying && (
        <>
          <img src={image} alt={title} className="card-image" loading="lazy" />
          <div className="play-btn-overlay">
            <div className="play-icon-circle">
              <Play size={24} fill="currentColor" />
            </div>
          </div>
          <div className="video-label">
            <span className="video-category">{category}</span>
            <h3>{title}</h3>
          </div>
        </>
      )}

      {isPlaying && (
        <YouTubePlayer
          videoId={extractVideoId(iframeSrc)}
          className="card-video-preview"
          title={title}
          autoplay={true}
        />
      )}
    </motion.div>
  );
};

const FeaturedWork = () => {
  const shortFormProjects = [
    { title: 'Educational Short', category: 'Shorts', image: 'https://img.youtube.com/vi/a7saLfE73_Y/hqdefault.jpg', iframeSrc: 'https://www.youtube-nocookie.com/embed/a7saLfE73_Y', isVertical: true },
    { title: 'Tech Review Reel', category: 'Reels', image: 'https://img.youtube.com/vi/ZKJ36Pu3o78/hqdefault.jpg', iframeSrc: 'https://www.youtube-nocookie.com/embed/ZKJ36Pu3o78', isVertical: true },
    { title: 'Podcast Clip', category: 'Shorts', image: 'https://img.youtube.com/vi/KxLkb1rH0Qg/hqdefault.jpg', iframeSrc: 'https://www.youtube-nocookie.com/embed/KxLkb1rH0Qg', isVertical: true },
    { title: 'Vlog Highlight', category: 'Reels', image: 'https://img.youtube.com/vi/5OrsIIRBWxQ/hqdefault.jpg', iframeSrc: 'https://www.youtube-nocookie.com/embed/5OrsIIRBWxQ', isVertical: true },
  ];

  const longFormProjects = [
    { title: 'Brand Documentary', category: 'Documentary', image: 'https://img.youtube.com/vi/gNZN6h7EBTM/maxresdefault.jpg', iframeSrc: 'https://www.youtube-nocookie.com/embed/gNZN6h7EBTM', isVertical: false },
    { title: 'Talking Head Series', category: 'Talking Heads', image: 'https://img.youtube.com/vi/nvk7W27hkkg/maxresdefault.jpg', iframeSrc: 'https://www.youtube-nocookie.com/embed/nvk7W27hkkg', isVertical: false },
    { title: 'Siyam Saifullah - Professional Video Editing Workflow', category: 'Long Form', image: 'https://img.youtube.com/vi/XWvZdVAXV8I/maxresdefault.jpg', iframeSrc: 'https://www.youtube-nocookie.com/embed/XWvZdVAXV8I', isVertical: false },
  ];

  return (
    <section id="work" className="portfolio-section">
      <div className="container">
        <motion.div
          className="section-header-centered"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h2 className="section-title">Selected Works</h2>
          <p className="section-subtitle-text">The portfolio is the product. See the impact of premium editing.</p>
        </motion.div>

        <div className="category-block">
          <div className="category-header">
            <h3>Short-Form (Reels, Shorts, TikTok)</h3>
          </div>
          <motion.div
            className="grid-vertical"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {shortFormProjects.map((p, i) => (
              <ProjectCard key={i} {...p} />
            ))}
          </motion.div>
        </div>

        <div className="category-block">
          <div className="category-header">
            <h3>Long-Form (Talking Heads, Documentary)</h3>
          </div>
          <motion.div
            className="portfolio-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {longFormProjects.map((p, i) => (
              <ProjectCard key={i} {...p} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Results = () => {
  return (
    <motion.section
      className="results-section"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <div className="container">
        <div className="section-header-centered">
          <h2 className="section-title">Client Outcomes</h2>
          <p className="section-subtitle-text">Beyond just nice cuts, I focus on metrics that matter to your business.</p>
        </div>
        <motion.div
          className="results-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div className="result-card" variants={staggerItem}>
            <BarChart2 size={32} className="accent-text" style={{ marginBottom: '1rem' }} />
            <h3>Better Retention</h3>
            <p>I build narrative arcs and visual hooks specifically engineered to stop the scroll and keep viewers engaged until the very end.</p>
          </motion.div>
          <motion.div className="result-card" variants={staggerItem}>
            <Clock size={32} className="accent-text" style={{ marginBottom: '1rem' }} />
            <h3>Faster Turnaround</h3>
            <p>Reliable delivery timelines without sacrificing premium quality. Get your content ready for publishing exactly when you need it.</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const Process = () => {
  const steps = [
    { num: '01', title: 'Send Footage', desc: 'Upload your raw files and brief to a shared drive. Simple and frictionless.' },
    { num: '02', title: 'Editing', desc: 'I assemble, pace, color grade, and sound design the first cut with precision.' },
    { num: '03', title: 'Revisions', desc: 'Review the draft using frame-accurate feedback tools. We refine until perfect.' },
    { num: '04', title: 'Delivery', desc: 'Receive the final high-res renders, optimized for your target platforms.' }
  ];

  return (
    <motion.section
      id="process"
      className="process-section"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <div className="container">
        <div className="section-header-centered">
          <h2 className="section-title">Streamlined Process</h2>
          <p className="section-subtitle-text">A professional workflow designed to reduce client anxiety.</p>
        </div>
        <motion.div
          className="process-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {steps.map((step, i) => (
            <motion.div key={i} className="process-item" variants={staggerItem}>
              <span className="process-number">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const Services = () => {
  return (
    <motion.section
      id="services"
      className="services-section"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <div className="container">
        <div className="section-header-centered">
          <h2 className="section-title">Specializations</h2>
        </div>
        <motion.div
          className="services-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div className="service-card" variants={staggerItem}>
            <Smartphone size={32} className="service-icon" />
            <h3>Shorts Editing</h3>
            <p>High-energy vertical content that drives organic growth and captures new audiences.</p>
            <ul className="service-features">
              <li>Dynamic Captions</li>
              <li>Motion Graphics</li>
              <li>Sound Design</li>
            </ul>
          </motion.div>
          <motion.div className="service-card" variants={staggerItem}>
            <Video size={32} className="service-icon" />
            <h3>Talking Heads</h3>
            <p>Educational and authority-building content crafted to maximize viewer watch time.</p>
            <ul className="service-features">
              <li>Retention Editing</li>
              <li>Relevant B-Roll</li>
              <li>Pacing & Zooms</li>
            </ul>
          </motion.div>
          <motion.div className="service-card" variants={staggerItem}>
            <Zap size={32} className="service-icon" />
            <h3>AI Visuals</h3>
            <p>Cutting-edge AI integration to tell stories that would otherwise be impossible.</p>
            <ul className="service-features">
              <li>AI Generated Sequences</li>
              <li>Creative Concepts</li>
              <li>Visual Storytelling</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const CTA = () => {
  return (
    <motion.section
      id="contact"
      className="cta-section"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <div className="container">
        <h2 className="cta-title">Need an editor who understands retention and storytelling?</h2>
        <p className="section-subtitle-text">Let's build content people actually watch.</p>
        <div className="cta-actions">
          <a href="mailto:siyamsaifullah@gmail.com" className="btn btn-primary">
            <Zap size={20} /> Book a Call
          </a>
          <a href="mailto:siyamsaifullah@gmail.com" className="btn btn-secondary">
            Send a Message
          </a>
        </div>
      </div>
    </motion.section>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="logo">SIYAM SAIFULLAH</div>
        <div className="footer-copy">&copy; {new Date().getFullYear()} Video Editor. All rights reserved.</div>
        <div className="footer-links">
          <a href="https://instagram.com/siyam_saifullah/" target="_blank" rel="noreferrer" className="footer-link">Instagram</a>
          <a href="https://x.com/home" target="_blank" rel="noreferrer" className="footer-link">X / Twitter</a>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const iframe = entry.target;
        const isVimeo = iframe.src.includes('vimeo');

        if (entry.isIntersecting) {
          if (isVimeo) {
            iframe.contentWindow.postMessage('{"method":"play"}', '*');
          } else {
            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
          }
        } else {
          if (isVimeo) {
            iframe.contentWindow.postMessage('{"method":"pause"}', '*');
          } else {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
          }
        }
      });
    }, observerOptions);

    // Give DOM time to render iframes
    setTimeout(() => {
      const iframes = document.querySelectorAll('.scroll-auto-video');
      iframes.forEach((iframe) => observer.observe(iframe));
    }, 100);

    return () => {
      observer.disconnect();
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <motion.div
          className="app-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <Hero />
          <SocialProof />
          <ClientReview />
          <FeaturedWork />
          <Results />
          <Process />
          <Services />
          <CTA />
          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;