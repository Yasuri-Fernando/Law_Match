import { ArrowRight, Globe, Scale, Shield, Users, Zap } from 'lucide-react';
import React, { useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import { Link } from "react-router-dom";
import "./LandingPage.css";
import Solutions from './Solutions';

const LandingPage = () => {
  const [heroRef, heroInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  const { ref: step1Ref, inView: step1InView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  });
  const { ref: step2Ref, inView: step2InView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  });
  const { ref: step3Ref, inView: step3InView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed');
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page">
      <section className={`hero ${heroInView ? 'visible' : ''}`} ref={heroRef}>
        <div className="hero-content">
          <h1 className="gradient-text">Transforming Legal Practice with AI Innovation</h1>
          <h2>Empowering Legal Professionals with Advanced Technology</h2>
          <p>
            Experience the future of legal practice with our cutting-edge AI solutions.
            Streamline your workflow, enhance decision-making, and deliver superior results.
          </p>
          <div className="hero-buttons">
            <Link to="/demo" className="btn-primary">
              Watch Demo <ArrowRight size={20} />
            </Link>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-card parallax" data-speed="0.1">
            <h3>24/7</h3>
            <p>AI Assistance</p>
          </div>
          <div className="stat-card parallax" data-speed="0.15">
            <h3>100+</h3>
            <p>Legal Templates</p>
          </div>
          <div className="stat-card parallax" data-speed="0.2">
            <h3>15+</h3>
            <p>Practice Areas</p>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <h2>Why Choose Our Platform</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Zap className="feature-icon" />
            <h3>Real-time Analysis</h3>
            <p>Get instant insights and analysis of legal documents with our advanced AI technology.</p>
          </div>
          <div className="feature-card">
            <Shield className="feature-icon" />
            <h3>Enhanced Security</h3>
            <p>Bank-grade encryption and security measures to protect your sensitive legal data.</p>
          </div>
          <div className="feature-card">
            <Scale className="feature-icon" />
            <h3>Compliance Focused</h3>
            <p>Stay compliant with automated checks and updates for regulatory requirements.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className={`step ${step1InView ? 'in-view' : ''}`} ref={step1Ref}>
            <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=300" alt="Upload Documents" />
            <h3>Upload Documents</h3>
            <p>Simply upload your legal documents to our secure platform.</p>
          </div>

          <div className={`step ${step2InView ? 'in-view' : ''}`} ref={step2Ref}>
            <img src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=300" alt="AI Analysis" />
            <h3>AI Analysis</h3>
            <p>Our AI engine analyzes and processes your documents.</p>
          </div>

          <div className={`step ${step3InView ? 'in-view' : ''}`} ref={step3Ref}>
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300" alt="Get Insights" />
            <h3>Get Insights</h3>
            <p>Receive detailed insights and recommendations.</p>
          </div>
        </div>
      </section>

      <Solutions />

      <section className="case-studies">
        <h2>Success Stories</h2>
        <div className="case-studies-grid">
          <div className="case-study-card">
            <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600" alt="Legal Professional" className="case-study-image" />
            <div className="case-study-content">
              <h3>Streamlined Contract Review</h3>
              <p>"The AI-powered contract analysis has reduced our review time by 60%, allowing us to focus on strategic legal work."</p>
              <span>- Sarah Chen, Corporate Counsel</span>
            </div>
          </div>
          <div className="case-study-card">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600" alt="Legal Team" className="case-study-image" />
            <div className="case-study-content">
              <h3>Enhanced Legal Research</h3>
              <p>"The platform's research capabilities have transformed how we approach complex legal cases."</p>
              <span>- Michael Rodriguez, Senior Partner</span>
            </div>
          </div>
        </div>
      </section>

      <section className="innovation-section">
        <div className="innovation-content">
          <h2>Pioneering Legal Innovation</h2>
          <p>Our platform combines cutting-edge AI technology with deep legal expertise to deliver unprecedented efficiency and accuracy in legal practice.</p>
          <div className="innovation-features">
            <div className="innovation-feature">
              <Globe className="innovation-icon" />
              <h3>Global Accessibility</h3>
              <p>Access your legal resources anytime, anywhere with our cloud-based platform.</p>
            </div>
            <div className="innovation-feature">
              <Users className="innovation-icon" />
              <h3>Collaborative Platform</h3>
              <p>Work seamlessly with your team and clients in real-time.</p>
            </div>
          </div>
        </div>
        <div className="innovation-image">
          <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800" alt="Legal Innovation" />
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Legal Practice?</h2>
          <p>Join the legal innovation revolution and experience the power of AI-driven legal solutions.</p>
          <button className="cta-button">Start Free Trial</button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;