import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Video, 
  Layers, 
  Smartphone, 
  Mic2, 
  Mail, 
  MessageSquare,
  Send,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import './App.css';

import profileImg from './assets/profile.jpg';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-container">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="logo"
        >
          SIYAM<span className="dot">.</span>EDIT
        </motion.div>

        <div className="nav-links">
          {['About', 'Works', 'Services', 'Process', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-item">
              {item}
            </a>
          ))}
          <button className="btn btn-primary">
            HIRE ME
          </button>
        </div>

        <div className="mobile-toggle">
          <button onClick={() => setIsOpen(!isOpen)} className="toggle-btn">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-nav"
          >
            <div className="mobile-nav-content">
              {['About', 'Works', 'Services', 'Process', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="mobile-item">
                  {item}
                </a>
              ))}
              <button className="btn btn-primary w-full">
                HIRE ME
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg-accent-1"></div>
      <div className="hero-bg-accent-2"></div>
      
      <div className="container hero-layout">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text-content"
        >
          <span className="badge">
            Video Editor & Motion Designer
          </span>
          <h1 className="hero-title">
            HI, I'M <span className="text-gradient">SIYAM</span><br />
            SAIFULLAH<span className="dot text-primary">.</span>
          </h1>
          <p className="hero-subtitle">
            Transforming raw footage into high-impact visual stories using <b>DaVinci Resolve</b>. Specializing in short-form content, motion graphics, and professional podcast editing.
          </p>
          
          <div className="hero-actions">
            <button className="btn btn-primary btn-large">
              VIEW SHOWREEL <Play size={20} fill="white" />
            </button>
            <button className="btn btn-glass btn-large">
              LET'S CHAT
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-image-wrapper"
        >
          <div className="image-frame">
            <img src={profileImg} alt="Siyam Saifullah" className="hero-image" />
            <div className="frame-glow"></div>
          </div>
          <div className="experience-tag glass animate-float">
            <span className="years">2+</span>
            <span className="label">Years of<br />Experience</span>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="scroll-indicator"
      >
        <div className="line"></div>
        <span className="scroll-text">Scroll to explore</span>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="about-content"
          >
            <h2 className="section-title">THE STORY <span className="text-gradient">BEHIND THE LENS</span></h2>
            <p className="about-text">
              I am <b>Siyam Saifullah</b>, a passionate Video Editor and Motion Graphics Designer with a deep-rooted obsession for cinematic excellence. My journey is defined by a commitment to storytelling that goes beyond the surface.
            </p>
            <p className="about-text">
              With over 2 years of experience, I've mastered the art of visual flow in <b>DaVinci Resolve</b>. Whether it's high-energy short-form content or long-form podcast narratives, I focus on the "soul" of the video—ensuring every cut, transition, and color grade serves a purpose.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-num">50+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">100%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="about-visual"
          >
            <div className="visual-card glass">
              <div className="visual-icon-row">
                <div className="icon-badge primary-gradient"><Video size={24} /></div>
                <div className="icon-badge glass"><Layers size={24} /></div>
              </div>
              <h3 className="visual-title">My Mission</h3>
              <p className="visual-desc">To elevate digital content by blending technical precision with raw creative emotion.</p>
              <div className="software-pills">
                <span className="pill">DaVinci Resolve</span>
                <span className="pill">After Effects</span>
                <span className="pill">Motion Design</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ title, category, image, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="project-card"
    >
      <div className="card-image-wrapper">
        <img src={image} alt={title} className="card-image" />
      </div>
      <div className="card-overlay">
        <span className="card-category">{category}</span>
        <h3 className="card-title">{title}</h3>
        <div className="card-actions">
          <button className="btn-icon">
            <Play size={20} fill="white" />
          </button>
          <button className="btn-icon">
            <ExternalLink size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  const projects = [
    { title: "Neon Nights - Short Film", category: "MOTION GRAPHICS", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000" },
    { title: "Future Tech Podcast", category: "PODCAST EDITING", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=1000" },
    { title: "E-Commerce Ad Campaign", category: "VIDEO EDITING", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1000" },
    { title: "Abstract Visualizer", category: "MOTION GRAPHICS", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000" },
  ];

  return (
    <section id="works" className="portfolio-section">
      <div className="container">
        <div className="section-header">
          <div className="header-text">
            <h2 className="section-title">SELECTED <span className="text-gradient">WORKS</span></h2>
            <p className="section-subtitle">A showcase of recent projects where I combined creativity with technical precision.</p>
          </div>
          <button className="view-all">
            VIEW ALL PROJECTS <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="project-grid">
          {projects.map((p, i) => (
            <ProjectCard key={i} {...p} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { 
      icon: <Video className="icon-p" size={32} />, 
      title: "Video Editing", 
      desc: "Cinematic storytelling, color grading, and seamless pacing for any project." 
    },
    { 
      icon: <Layers className="icon-s" size={32} />, 
      title: "Motion Graphics", 
      desc: "Dynamic typography, VFX, and 2D/3D animations that bring static ideas to life." 
    },
    { 
      icon: <Smartphone className="icon-a" size={32} />, 
      title: "Short-Form Content", 
      desc: "Optimized Reels, TikToks, and Shorts designed for maximum engagement." 
    },
    { 
      icon: <Mic2 className="icon-p" size={32} />, 
      title: "Podcast Production", 
      desc: "High-quality audio cleanup, multi-cam switching, and dynamic captions." 
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header-centered">
          <h2 className="section-title text-gradient">SPECIALTIES</h2>
          <p className="section-subtitle">Expertise built through years of working with top-tier creators and brands.</p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="service-card"
            >
              <div className="service-icon-wrapper">
                {s.icon}
              </div>
              <h3 className="service-card-title">{s.title}</h3>
              <p className="service-card-desc">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Alex Rivera", role: "Content Creator", text: "Siyam's work in DaVinci Resolve is next-level. He transformed our raw footage into a cinematic masterpiece." },
    { name: "Sarah Chen", role: "Marketing Director", text: "Fast, reliable, and incredibly creative. The motion graphics Siyam added to our campaign were stunning." },
    { name: "James Wilson", role: "Podcast Host", text: "The editing was seamless. Our podcast engagement doubled thanks to the clean cuts and dynamic captions." }
  ];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-header-centered">
          <h2 className="section-title">WHAT <span className="text-gradient">CLIENTS SAY</span></h2>
        </div>
        <div className="testimonials-grid">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="testimonial-card glass"
            >
              <p className="testimonial-text">"{r.text}"</p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar primary-gradient">{r.name[0]}</div>
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

const Process = () => {
  const steps = [
    { number: "01", title: "Discovery", desc: "We discuss your vision, target audience, and project goals to set the creative direction." },
    { number: "02", title: "Creation", desc: "I bring the ideas to life through cinematic editing, motion design, and sound engineering." },
    { number: "03", title: "Refinement", desc: "We collaborate on feedback to polish every frame until it's absolutely perfect." }
  ];

  return (
    <section id="process" className="process-section">
      <div className="container">
        <div className="section-header-centered">
          <h2 className="section-title">THE <span className="text-gradient">PROCESS</span></h2>
          <p className="section-subtitle">A streamlined workflow designed to deliver exceptional results with efficiency.</p>
        </div>

        <div className="process-grid">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
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

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container contact-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="contact-card"
        >
          <div className="contact-glow">
            <Sparkles size={40} className="text-white" />
          </div>
          
          <h2 className="contact-title">LET'S START A <span className="text-gradient">PROJECT</span></h2>
          <p className="contact-desc">
            Ready to take your content to the next level? I'm currently available for freelance work and collaborations.
          </p>
          
          <div className="contact-actions">
            <a href="mailto:hello@siyam.edit" className="btn btn-primary btn-large btn-email">
              <Mail size={24} /> EMAIL ME
            </a>
            <div className="social-links">
              <a href="#" className="social-icon">
                <MessageSquare size={28} />
              </a>
              <a href="#" className="social-icon">
                <Send size={28} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="logo logo-small">
          SIYAM<span className="dot">.</span>EDIT
        </div>
        <div className="footer-info">
          © 2026 Siyam Saifullah. All Rights Reserved.
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">Privacy</a>
          <a href="#" className="footer-link">Terms</a>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
