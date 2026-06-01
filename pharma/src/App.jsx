import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import heroImg from './assets/Hero-4.jpg'
import img2 from './assets/img-2.jpg'
import img3 from './assets/Img-3.avif'
import about4 from './assets/about-4.jpg'
import about5 from './assets/about-5.jpg'
import researchImg from './assets/Research.jpg'
import p1 from './assets/Choline.avif'
import p2 from './assets/Colic Drops.webp'
import p3 from './assets/Lmethylfolate.webp'
import p4 from './assets/Multivitamin.webp'
import p5 from './assets/Quatrefolic.jpg'
import p6 from './assets/calcuim.jpg'
import journeyImg from './assets/Image-4.jpg'
import image1 from './assets/Image-1.png'
import img1png from './assets/Img-1.png'
import i2jpg from './assets/I2.jpg'
import productInnovationImg from './assets/I2.jpeg'
import l3png from './assets/l3.png'
import ai1 from './assets/Image-2.png'
import ai2 from './assets/I2.jpg'
import vitamenImg from './assets/Vitamens.webp'
import csrImg from './assets/CSR1.webp'
import csrImg2 from './assets/CSR2.avif'
import csr6jpg from './assets/CSR6.jpg'
import researchAltImg from './assets/ai-3.png'
import './App.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Counter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const elementRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setCount(0); // Reset for re-animation
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure exact final value
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};



const Reveal = ({ children, animation = "reveal-up", delay = "", className = "" }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle both ways: animate in on enter, reverse on exit
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${animation} ${delay} ${isVisible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
};

const SectionTag = ({ text, centered = false }) => (
  <div className={`inline-flex items-center gap-2 border border-gray-100 bg-white rounded-full px-4 py-1.5 text-[13px] md:text-[14px] font-bold text-navy mb-6 shadow-sm w-fit ${centered ? 'mx-auto' : ''}`}>
    <span className="w-1.5 h-1.5 rounded-full bg-navy"></span>
    {text}
  </div>
);

const products = [
  { id: 1, img: p1, name: "Choline", label: "Neurological Support", dosage: "500mg", desc: "Essential nutrient for memory and mood control.", benefits: ["Memory Support", "Liver Health", "Metabolic Aid"] },
  { id: 2, img: p2, name: "Colic Drops", label: "Pediatric Care", dosage: "15ml", desc: "Gentle relief for infant digestive discomfort.", benefits: ["Fast Relief", "Natural Base", "Pediatric Safe"] },
  { id: 3, img: p3, name: "L-Methylfolate", label: "Active Bio-Folate", dosage: "1000mcg", desc: "Bioactive folate for DNA synthesis and mood.", benefits: ["Mood Support", "Pure Bio-Active", "High Absorption"] },
  { id: 4, img: p4, name: "Multivitamin", label: "Daily Supplement", dosage: "30 Tablets", desc: "Comprehensive blend of essential vitamins.", benefits: ["Immune Support", "Energy Boost", "Full Spectrum"] },
  { id: 5, img: p5, name: "Quatrefolic", label: "Prenatal Health", dosage: "800mcg", desc: "Fourth-generation folate for prenatal care.", benefits: ["Prenatal Support", "Highest Purity", "Bioavailable"] },
  { id: 6, img: p6, name: "Calcium Plus", label: "Bone Support", dosage: "600mg", desc: "Fortified calcium for skeletal strength.", benefits: ["Bone Density", "Muscle Support", "Easy Digestion"] },
  { id: 7, img: p4, name: "Omega-3", label: "Cardio Health", dosage: "1000mg", desc: "High-potency EPA/DHA formula.", benefits: ["Cardio Support", "Sustainable", "Pure Oil"] },
  { id: 8, img: p1, name: "Probiotics", label: "Gastrointestinal", dosage: "50B CFU", desc: "Multi-strain formula for digestive balance.", benefits: ["50B CFU", "Shelf Stable", "Gut Flora"] }
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selectedYear, setSelectedYear] = React.useState(0);
  const [counterKeys, setCounterKeys] = React.useState([0, 0, 0, 0, 0, 0]);
  const [currentProductIndex, setCurrentProductIndex] = React.useState(0);
  const [activeCommitment, setActiveCommitment] = React.useState(0);
  const [productsPerRow, setProductsPerRow] = React.useState(4);
  const totalPages = Math.ceil(products.length / productsPerRow);
  const [showcaseIndex, setShowcaseIndex] = React.useState(2);
  const [isHoveringShowcase, setIsHoveringShowcase] = React.useState(false);
  const [heroIndex, setHeroIndex] = React.useState(0);

  // Animation Refs
  const diagTextRef = useRef(null);
  const diagImageRef = useRef(null);
  const heroTagRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const heroBtnsRef = useRef(null);

  const scrollToSection = (e, id) => {
    if (e) e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: target, autoKill: true, offsetY: 80 },
        ease: "power4.inOut"
      });
      setIsMenuOpen(false);
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.normalizeScroll(true);
      ScrollTrigger.config({ ignoreMobileResize: true });

      // ── Hero Section: staggered entrance (once, on load) ──
      gsap.fromTo(
        heroTagRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(
        heroTitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.45 }
      );
      gsap.fromTo(
        heroDescRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.7 }
      );
      gsap.fromTo(
        heroBtnsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.9 }
      );

      // ── Services Cards: stagger from bottom ──
      gsap.fromTo(
        '.services-card',
        { x: -100, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 1.5,
          ease: 'power4.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );



      // ── Milestone Cards: stagger pop-up ──
      gsap.fromTo(
        '.milestone-card',
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.5,
          ease: 'power4.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.milestones-section',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ── Product Variety Banner: image + text slide ──
      gsap.fromTo(
        '.slant-banner-image',
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.slant-banner-image',
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 1,
            toggleActions: 'play reverse play reverse',
          },
        }
      );
      gsap.fromTo(
        '.slant-banner-content',
        { x: 80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.slant-banner-image',
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 1,
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // ── Strategic Areas Cards: stagger fan-in from bottom ──
      gsap.fromTo(
        '.strategic-card',
        { y: 80, opacity: 0, rotate: 3 },
        {
          y: 0, opacity: 1, rotate: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.strategic-grid',
            start: 'top 85%',
            end: 'bottom 10%',
            scrub: 0.5,
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // ── Contact Section: left content + form ──
      gsap.fromTo(
        '.contact-left',
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 75%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
      gsap.fromTo(
        '.contact-right',
        { x: 80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 75%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // ── Diagnostics: text from left, image from right ──
      gsap.fromTo(
        diagTextRef.current,
        { x: -120, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '#diagnostics',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
      gsap.fromTo(
        diagImageRef.current,
        { x: 120, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '#diagnostics',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

    });
    return () => ctx.revert();
  }, []);

  const nextProduct = () => {
    setCurrentProductIndex((prev) => Math.min(prev + 1, products.length - productsPerRow));
  };

  const prevProduct = () => {
    setCurrentProductIndex((prev) => Math.max(prev - 1, 0));
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setProductsPerRow(1);
      else if (window.innerWidth < 1024) setProductsPerRow(2);
      else setProductsPerRow(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    setCurrentProductIndex(prev => Math.min(prev, products.length - productsPerRow));
  }, [productsPerRow]);

  React.useEffect(() => {
    if (isHoveringShowcase) return;
    const interval = setInterval(() => {
      setShowcaseIndex((prev) => (prev + 1) % products.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [isHoveringShowcase]);

  // Sync Hero Background and Text
  React.useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white relative overflow-x-hidden">

      {/* Fixed Navbar with Solid BG on Mobile, Glass on Desktop */}
      <nav className="fixed top-0 left-0 w-full py-3 px-6 md:px-12 lg:px-20 flex justify-between items-center z-[100] bg-white/80 lg:bg-white/20 lg:backdrop-blur-xl border-b border-gray-100/50 shadow-sm transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <img src="/favicon.svg" className="w-10 h-10 rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-300" alt="Try Neutra Logo" />
          <span className="font-bold text-navy tracking-tight text-2xl">Try Neutra</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-10 text-[14px] font-bold text-navy">
          {["Home", "About Us", "Products", "Research", "CSR", "Contact"].map((item, idx) => (
            <a
              key={item}
              href={item === "Home" ? "#" : item === "CSR" ? "#core-commitments" : `#${item.toLowerCase().replace(" ", "-")}`}
              onClick={(e) => scrollToSection(e, item === "Home" ? "main" : item === "CSR" ? "#core-commitments" : `#${item.toLowerCase().replace(" ", "-")}`)}
              className={`relative pb-1 group transition-colors ${idx === 0 ? "text-primary" : "hover:text-primary"}`}
            >
              {item}
              <span className={`absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full ${idx === 0 ? "w-full" : ""}`}></span>
            </a>
          ))}
        </div>

        {/* CTA Button (Desktop/Tablet) */}
        <div className="hidden md:block">
          <a href="#contact" className="bg-primary hover:bg-primary-dark text-white px-7 py-3 rounded-xl text-[14px] font-bold transition-all flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95">
            Get In Touch <span>→</span>
          </a>
        </div>

        {/* Hamburger Icon (Mobile/Tablet) */}
        <div className="lg:hidden flex items-center gap-4">
          <div className="text-navy cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsMenuOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-[2000] transition-all duration-500 ${isMenuOpen ? "visible" : "invisible"}`}>
          {/* Backdrop blur */}
          <div
            className={`absolute inset-0 bg-navy/40 backdrop-blur-md transition-opacity duration-500 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className={`absolute top-0 right-0 h-full w-[85%] max-w-[380px] bg-white shadow-2xl transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} z-[2001] flex flex-col`}>
            <div className="p-8 flex justify-between items-center border-b border-gray-50">
              <div className="flex items-center gap-3">
                <img src="/favicon.svg" className="w-8 h-8 rounded-lg" alt="Try Neutra Logo" />
                <span className="font-bold text-navy tracking-tight text-xl">Try Neutra</span>
              </div>
              <button
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 text-navy hover:bg-gray-100 transition-all hover:rotate-90"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <div className="flex-1 p-8 overflow-y-auto">
              <div className="flex flex-col gap-6">
                {["Home", "About Us", "Products", "Research", "CSR", "Contact"].map((item, idx) => (
                  <a
                    key={item}
                    href={item === "Home" ? "#" : item === "CSR" ? "#core-commitments" : `#${item.toLowerCase().replace(" ", "-")}`}
                    onClick={(e) => scrollToSection(e, item === "Home" ? "main" : item === "CSR" ? "#core-commitments" : `#${item.toLowerCase().replace(" ", "-")}`)}
                    className="text-2xl font-bold text-navy hover:text-primary transition-colors flex items-center justify-between group"
                  >
                    {item}
                    <span className="text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-8 border-t border-gray-50">
              <a href="#contact" className="w-full bg-primary text-white py-5 rounded-2xl font-bold shadow-xl shadow-primary/25 hover:bg-primary-dark transition-all transform active:scale-95 text-lg inline-block text-center" onClick={() => setIsMenuOpen(false)}>
                Get In Touch
              </a>
              <p className="text-center text-gray-400 text-sm mt-6 font-medium">© 2026 Try Neutra</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Original Hero Section */}
      <main className="relative w-full flex flex-col justify-center bg-[#e4f5ec] overflow-hidden pt-28 pb-12 min-h-[90vh]">

        {/* Full width Background Image Container */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img src={about5} className={`hero-bg-img hero-bg-top object-right md:object-[85%_center] ${heroIndex === 0 ? 'active' : ''}`} alt="Bg 1" />
            <img src={img2} className={`hero-bg-img hero-bg-bottom object-center ${heroIndex === 1 ? 'active' : ''}`} alt="Bg 2" />
            <img src={img3} className={`hero-bg-img hero-bg-left object-center ${heroIndex === 2 ? 'active' : ''}`} alt="Bg 3" />
            <img src={heroImg} className={`hero-bg-img hero-bg-right object-center ${heroIndex === 3 ? 'active' : ''}`} alt="Bg 4" />
          </div>
          {/* Gradient overlay ONLY on the left side behind the text */}
          <div className="absolute inset-y-0 left-0 w-full md:w-[65%] lg:w-[55%] bg-gradient-to-r from-[#e4f5ec] via-[#e4f5ec]/95 to-transparent z-10"></div>
        </div>

        {/* Text Content */}
        <div className="relative z-20 px-8 md:px-12 lg:px-20 max-w-xl xl:max-w-2xl mt-2">

          <span ref={heroTagRef} className="text-primary font-bold text-sm mb-3 inline-block tracking-wide" style={{ opacity: 0 }}>
            Better Health, Brighter Future
          </span>

          <h1 ref={heroTitleRef} className="text-4xl md:text-[44px] lg:text-[56px] font-sans font-bold text-navy leading-[1.15] mb-5 tracking-tight" style={{ opacity: 0 }}>
            Innovating <br className="hidden md:block" />Today <br />for a Healthier <br />
            <span className="hero-dropping-texts text-primary italic font-serif font-medium">
              <div className={heroIndex === 0 ? 'active' : ''}>Tomorrow</div>
              <div className={heroIndex === 1 ? 'active' : ''}>Future</div>
              <div className={heroIndex === 2 ? 'active' : ''}>World</div>
              <div className={heroIndex === 3 ? 'active' : ''}>Life</div>
            </span>
          </h1>

          <p ref={heroDescRef} className="text-gray-700 text-[15px] leading-relaxed max-w-lg mb-8 font-medium" style={{ opacity: 0 }}>
            We are committed to improving lives by developing, manufacturing and delivering high-quality pharmaceutical solutions.
          </p>

          <div ref={heroBtnsRef} className="flex flex-wrap gap-4 mb-12" style={{ opacity: 0 }}>
            <a href="#products" onClick={(e) => scrollToSection(e, "#products")} className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded text-sm font-bold transition-all flex items-center gap-2 shadow-sm">
              Our Products <span>→</span>
            </a>
            <a href="#about-us" onClick={(e) => scrollToSection(e, "#about-us")} className="border-[1.5px] border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded text-sm font-bold transition-all flex items-center gap-2 shadow-sm">
              About Us <span>→</span>
            </a>
          </div>
        </div>
      </main>

      {/* Services Section */}
      <section className="w-full bg-[#f8f9fa] py-32 px-8 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-[1200px] mx-auto text-center mb-20 px-4">
          <Reveal animation="reveal-up">
            <SectionTag text="What We Do" centered={true} />
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-navy mb-4 tracking-tight">
              Professional Care & <span className="text-primary italic font-serif">Solutions</span>
            </h2>
          </Reveal>
        </div>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 services-grid">
          {[
            { id: "01", title: "Analytical Testing", desc: "Perform precise chemical, biological, and physical analyses for reliable results." },
            { id: "02", title: "Quality Control", desc: "Rigorous standards to ensure every product meets pharmaceutical excellence." },
            { id: "03", title: "Research Lab", desc: "Innovative development of new medical solutions for a healthier tomorrow." }
          ].map((item, idx) => (
            <div key={idx} className="services-card relative bg-white rounded-[32px] p-8 lg:p-10 shadow-sm hover:shadow-lg transition-all duration-300 group" style={{ opacity: 0 }}>
              <div className="absolute -top-6 -right-6 w-[72px] h-[72px] bg-primary text-white font-bold text-lg flex items-center justify-center rounded-full border-[12px] border-[#f8f9fa] z-10 group-hover:scale-110 transition-transform duration-300">{item.id}</div>
              <h3 className="text-2xl font-bold text-navy mb-6 leading-snug pt-2">{item.title}</h3>
              <div className="w-16 h-[2px] bg-gray-100 mb-6 group-hover:bg-primary/30 transition-colors"></div>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-16 pr-8">{item.desc}</p>
              <div className="absolute bottom-8 right-8 text-navy group-hover:text-primary transition-colors duration-300">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2v-2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><path d="M18 10v4l4 5H14l4-5v-4z" /><path d="M8 10h4M8 14h2" /></svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Our Laboratory / Research Section */}
      <div id="research"></div>
      <section className="w-full bg-white pt-16 pb-16 md:pt-24 md:pb-24 px-6 md:px-12 lg:px-20 relative z-10 overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-stretch">

          {/* Left Column (Heading + Image + Focus Card) */}
          <div className="research-img-col lg:col-span-6 flex flex-col relative pr-0 lg:pr-10">
            <SectionTag text="About Our Laboratory" />
            <h3 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-sans font-bold text-navy leading-[1.15] mb-0 tracking-tight mt-6">
              Advancing <br />
              Science Through <br />
              <span className="font-serif italic text-primary font-medium tracking-normal pr-2">Research</span>
            </h3>

            <Reveal animation="reveal-left" className="flex-1 mt-10 md:mt-12">
              <div className="relative h-full max-w-2xl">
                <img src={researchImg} alt="Laboratory Research" className="w-full h-full min-h-[300px] md:min-h-[450px] object-cover rounded-[24px] md:rounded-[32px]" />

                {/* Focus Card - Streamlined & Compact */}
                <div className="absolute top-4 right-4 sm:top-0 sm:-translate-y-[60%] sm:-right-16 z-20 shadow-2xl rounded-[16px] sm:rounded-[24px] overflow-hidden">
                  <div className="bg-primary text-white p-4 sm:p-6 w-[150px] sm:w-[230px]">
                    <h4 className="text-[15px] sm:text-[17px] font-bold mb-4 tracking-wide">Core Focus:</h4>
                    <ul className="space-y-3 text-[11px] sm:text-[13px]">
                      <li className="flex justify-between border-b border-white/20 pb-2.5">
                        <span className="font-medium opacity-90">Clinical Trials</span>
                        <span className="font-bold">Phase I-IV</span>
                      </li>
                      <li className="flex justify-between pt-0.5">
                        <span className="font-medium opacity-90">Quality Control</span>
                        <span className="font-bold">ISO Certified</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column (10+ and Text) */}
          <div className="research-text-col lg:col-span-6 flex flex-col pt-10 lg:pt-0 lg:pl-12 lg:justify-end">
            <Reveal animation="reveal-left" delay="delay-200">
              <div className="mb-8 md:mb-12">
                <span className="text-[80px] sm:text-[110px] md:text-[140px] font-sans font-bold leading-[0.85] bg-clip-text text-transparent bg-cover bg-center drop-shadow-sm inline-block" style={{ backgroundImage: `url(${img2})` }}>
                  10+
                </span>
                <div className="flex items-center gap-4 mt-6">
                  <div className="flex -space-x-3">
                    <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <img src={img2} alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <img src={researchImg} alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-sm bg-primary/10 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-primary">+50</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-navy/60 leading-tight">
                    Trusted Leaders In<br />Laboratory Excellence
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal animation="reveal-left" delay="delay-300">
              <p className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-600 leading-relaxed max-w-xl mb-10">
                We are a modern laboratory dedicated to discovery and innovation. Using advanced techniques, we analyze samples, study molecular processes, and deliver reliable results that make a difference.
              </p>
            </Reveal>

            <Reveal animation="reveal-up" delay="delay-400">
              <button 
                onClick={(e) => scrollToSection(e, "#diagnostics")}
                className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-xl text-sm font-sans font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-1 w-max flex items-center justify-center gap-2"
              >
                Discover More →
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Products Section with Pagination */}
      <section id="products" className="py-24 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <Reveal animation="reveal-up">
              <SectionTag text="Our Portfolio" centered={true} />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight">
                Featured <span className="text-primary italic font-serif">Breakthroughs</span>
              </h2>
            </Reveal>
          </div>

          <div className="relative overflow-hidden mb-16">
            <Reveal animation="reveal-up" delay="delay-200">
              <div
                className="flex transition-transform duration-700 ease-in-out gap-8"
                style={{ transform: `translateX(calc(-${currentProductIndex * (100 / productsPerRow)}% - ${currentProductIndex * (32 / productsPerRow)}px))` }}
              >
                {products.map((p, i) => (
                  <div
                    key={p.id}
                    className="reveal-up shrink-0"
                    style={{ width: `calc((100% - ${(productsPerRow - 1) * 32}px) / ${productsPerRow})` }}
                  >
                    <div className="flip-card-container">
                      <div className="flip-card-inner">
                        <div className="flip-card-front">
                          <img src={p.img} alt={p.name} className="flip-card-img" />
                          <div className="flex flex-col items-center">
                            <div className="flip-card-name-label">{p.name}</div>
                            <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-2">{p.dosage}</div>
                          </div>
                          <p className="text-gray-400 text-[10px] mt-2 font-bold uppercase tracking-widest">{p.label}</p>
                        </div>
                        <div className="flip-card-back">
                          <div className="flex justify-between items-start w-full mb-4">
                            <h4 className="m-0 text-lg font-bold">{p.name}</h4>
                            <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{p.dosage}</span>
                          </div>
                          <p className="text-[13px] leading-relaxed mb-6 opacity-90">{p.desc}</p>
                          <div className="space-y-3 mb-8 w-full">
                            {p.benefits.map((b, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs font-medium">
                                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] shrink-0">✓</span>
                                {b}
                              </div>
                            ))}
                          </div>
                          <a 
                            href={`https://api.whatsapp.com/send?phone=923066966385&text=Hello! I would like to order ${encodeURIComponent(p.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-white text-primary py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-gray-100 transition-all shadow-lg active:scale-95 mb-4"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            Order via WhatsApp
                          </a>
                          <div className="mt-auto pt-4 border-t border-white/20 w-full text-[10px] uppercase font-bold tracking-widest opacity-70 flex justify-between items-center">
                            <span>Try Neutra</span>
                            <span className="w-2 h-2 rounded-full bg-white/40 animate-pulse"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col items-center mt-12">
            <Reveal animation="reveal-up">
              <div className="flex items-center gap-8">
                <button
                  onClick={prevProduct}
                  className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>

                <div className="flex gap-2">
                  {[...Array(products.length - productsPerRow + 1)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-500 ${i === currentProductIndex ? "w-8 bg-primary" : "w-2 bg-gray-200"}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextProduct}
                  className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>


      {/* Milestones Section */}
      <section className="milestones-section py-32 bg-[#f4f7fb]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-20">
            <Reveal animation="reveal-up">
              <SectionTag text="Our Impact" centered={true} />
              <h2 className="text-4xl md:text-5xl font-sans font-bold text-navy tracking-tight">
                Achieved <span className="text-primary italic font-serif">Milestones</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            {[
              {
                num: 15,
                suffix: "K+",
                label: "Clients from various industries",
                color: "blue",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                )
              },
              {
                num: 125,
                suffix: "+",
                label: "Posts released every month",
                color: "purple",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                )
              },
              {
                num: 12,
                suffix: "",
                label: "Highly rated on user-friendliness",
                color: "teal",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8l1.5 3h3.5l-2.5 2 1 4-3.5-2.5-3.5 2.5 1-4-2.5-2h3.5l1.5-3z" fill="currentColor" />
                    <path d="M12 2a10 10 0 1 0 10 10" strokeDasharray="4 4" />
                  </svg>
                )
              }
            ].map((item, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => {
                    const newKeys = [...counterKeys];
                    newKeys[idx] += 1;
                    setCounterKeys(newKeys);
                  }}
                  className="milestone-card group relative bg-white rounded-3xl p-10 pt-16 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] border border-gray-50 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] cursor-default"
                >
                  {/* Floating Icon Container */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-110 z-10 border border-gray-50`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center 
                      ${item.color === 'blue' ? 'bg-blue-50 text-blue-600' : ''}
                      ${item.color === 'purple' ? 'bg-purple-50 text-purple-600' : ''}
                      ${item.color === 'teal' ? 'bg-teal-50 text-teal-600' : ''}
                     transition-colors duration-300`}>
                      {item.icon}
                    </div>
                  </div>

                  <div className="milestone-number text-5xl md:text-6xl font-semibold text-primary mb-4 flex items-baseline">
                    <Counter key={counterKeys[idx]} end={item.num} suffix={item.suffix} duration={1000} />
                  </div>
                  <div className="text-gray-500 font-medium text-sm leading-relaxed max-w-[200px]">
                    {item.label}
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Variety Banner */}
      <section className="relative w-full flex flex-col lg:flex-row lg:h-[380px] bg-white overflow-hidden items-center">
        {/* Navy Floating Box (Behind on desktop, Bottom part on mobile) */}
        <div className="hidden lg:block absolute right-0 w-[70%] h-[80%] bg-navy z-0 slant-banner-content"></div>
        
        {/* Mobile Navy Background (behind text) */}
        <div className="absolute lg:hidden bottom-0 left-0 w-full h-[50%] bg-navy z-0"></div>

        {/* Left Side: Image (In Front) */}
        <Reveal animation="reveal-left" className="relative lg:absolute lg:top-0 lg:left-0 w-full lg:w-[50%] h-[300px] lg:h-full z-10 slant-banner-image overflow-hidden">
          <img src={vitamenImg} alt="Variety of Products" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/10 lg:bg-navy/5"></div>
        </Reveal>

        {/* Right Side: Content Area (Balanced & Theme Fonts) */}
        <div className="relative z-20 w-full lg:ml-auto lg:w-[60%] flex items-center px-8 py-10 md:py-12 lg:py-0 lg:pr-16 bg-navy lg:bg-transparent">
          <div className="max-w-2xl lg:pl-28 flex flex-col items-start text-left w-full">
            <Reveal animation="reveal-right">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4 leading-tight">
                We Offer A Great <span className="italic">Variety</span> Of <span className="text-primary italic">Products</span>
              </h2>
              <p className="text-gray-300 font-sans text-[15px] md:text-base mb-6 leading-relaxed font-medium max-w-lg">
                Our extensive range covers everything from neuro-supportive treatments to daily wellness supplements, ensuring your health and vitality.
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold font-sans text-[15px] transition-all shadow-xl shadow-primary/20 transform hover:-translate-y-1 active:scale-95">
                CONTACT US <span>→</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Interactive Core Commitments Section - Ultra Wide & Animated */}
      <section id="core-commitments" className="w-full bg-white py-32 px-12 md:px-20 lg:px-32 relative z-10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <Reveal animation="reveal-up">
              <SectionTag text="Our Philosophy" centered={true} />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-navy mb-6 tracking-tight">
                Our Core <span className="text-primary italic font-serif">Commitments</span>
              </h2>
              <p className="text-gray-500 max-w-3xl mx-auto font-medium text-base md:text-lg">Discover the pillars of excellence that define our service to global healthcare.</p>
            </Reveal>
          </div>

          {/* Interactive Tab Bar - Ultra Wide */}
          <div className="flex flex-wrap justify-center items-center bg-white p-2 rounded-[40px] border border-gray-100 shadow-2xl shadow-navy/5 w-full max-w-6xl mx-auto mb-20 gap-2">
            {[
              {
                label: "Social Responsibility",
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              },
              {
                label: "Research & Lab",
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.727 2.903a11.042 11.042 0 01-5.064-5.064l2.903-.727a2 2 0 001.414-1.96l-.477-2.387a2 2 0 00-.547-1.022L7.701 4.701a2 2 0 00-2.828 0L2.122 7.45a2 2 0 00-.547 2.117 19.925 19.925 0 0014.862 14.862 2 2 0 002.117-.547l2.75-2.75a2 2 0 000-2.828l-2.828-2.828z" /></svg>
              },
              {
                label: "Quality Products",
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              },
              {
                label: "Global Welfare",
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              }
            ].map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCommitment(idx)}
                className={`flex-1 px-6 py-3.5 rounded-[32px] font-bold text-[15px] transition-all duration-500 flex items-center justify-center gap-3 whitespace-nowrap ${activeCommitment === idx
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-100"
                    : "bg-transparent text-gray-500 hover:text-navy hover:bg-gray-50"
                  }`}
              >
                <span className={`${activeCommitment === idx ? "text-white" : "text-gray-300"}`}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic Content Area - Ultra Wide */}
          <div className="w-full max-w-[1400px] mx-auto overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
              {/* Content Side */}
              <div className="lg:col-span-6 xl:col-span-7 transition-all duration-700 lg:pr-12" key={`content-${activeCommitment}`}>
                {(() => {
                  const data = [
                    {
                      title: "Social Responsibility Initiatives",
                      desc: "Our Social Responsibility program is built on the foundation of 'Humanity First'. We dedicate significant resources to ensuring that quality healthcare reaches those who need it most.",
                      points: ["Nationwide Medical Outreach", "Public Health Education", "Community Support Systems"],
                      img: csrImg
                    },
                    {
                      title: "Advanced Laboratory Research",
                      desc: "Our revamped research wing utilizes AI-integrated diagnostic tools and high-precision analysis to accelerate the development of life-saving pharmaceutical solutions.",
                      points: ["Next-Gen Molecular Analysis", "Accelerated Drug Discovery", "Bio-Tech Lab Excellence"],
                      img: ai1
                    },
                    {
                      title: "Uncompromising Product Quality",
                      desc: "We source only the finest raw materials and implement multi-stage quality checks to ensure that every tablet and drop meets the highest international benchmarks.",
                      points: ["Multi-Tier Batch Testing", "Global Standard Compliance", "Purity & Potency Guaranteed"],
                      img: csr6jpg
                    },
                    {
                      title: "Universal Welfare Vision",
                      desc: "We are committed to global health equity, working tirelessly to bridge the gap in medicine access through strategic partnerships and distribution networks.",
                      points: ["International Health Alliances", "Medicine Access for All", "Global Distribution Network"],
                      img: researchAltImg
                    }
                  ][activeCommitment];

                  return (
                    <>
                      <Reveal animation="reveal-left">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-navy mb-8 leading-[1.2]">
                          {data.title.split(' ').map((word, i) => i === 1 || i === 3 ? <span key={i} className="font-serif italic text-primary block">{word} </span> : word + ' ')}
                        </h3>
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10 font-medium max-w-2xl">
                          {data.desc}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {data.points.map((point, i) => (
                            <div key={i} className="flex items-center gap-4 text-navy font-bold text-lg group/item cursor-default transition-all hover:translate-x-2">
                              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20 group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-300">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3.5"><path d="M5 13l4 4L19 7"></path></svg>
                              </div>
                              {point}
                            </div>
                          ))}
                        </div>
                      </Reveal>
                    </>
                  );
                })()}
              </div>

              {/* Image Side */}
              <div className="lg:col-span-6 xl:col-span-5 relative group" key={`image-${activeCommitment}`}>
                <Reveal animation="reveal-right">
                  <div className="relative h-[350px] md:h-[480px] rounded-[40px] transition-all duration-700 overflow-hidden">
                    {activeCommitment === 3 ? (
                      <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
                        {/* Custom Animated Card Integration - Social Edition */}
                        <div className="group/card relative w-full aspect-square max-w-[500px] rounded-[40px] overflow-hidden transition-all duration-700 hover:scale-105">
                          {/* Background - Web Theme Gradient */}
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_107%,#00a859_0%,#0056b3_50%,#112240_100%)] opacity-95"></div>
                          <div className="absolute inset-0 bg-navy opacity-20"></div>

                          {/* Email - Center / Logo Area */}
                          <a href="mailto:info@tryneutra.com" className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 transition-all duration-700 group-hover/card:bottom-12 group-hover/card:right-12 group-hover/card:translate-x-0 group-hover/card:translate-y-0 z-30">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-2xl hover:bg-white/40 transition-colors">
                              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </a>

                          {/* Box 1 - Facebook */}
                          <a href="https://www.facebook.com/tryneutra?rdid=41POm8zG5pFNZ7Jw&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DUR7wvr3G%2F#" target="_blank" rel="noopener noreferrer" className="absolute w-[75%] h-[75%] bottom-[-75%] left-[-75%] p-8 bg-white/10 backdrop-blur-xl border-t border-white/20 border-r rounded-[10%_13%_42%_0%/10%_12%_75%_0%] shadow-2xl transition-all duration-1000 group-hover/card:bottom-[-1px] group-hover/card:left-[-1px] flex items-start justify-end hover:bg-white/20">
                            <svg className="w-10 h-10 fill-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                          </a>

                          {/* Box 2 - WhatsApp */}
                          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="absolute w-[55%] h-[55%] bottom-[-55%] left-[-55%] p-6 bg-white/10 backdrop-blur-xl border-t border-white/20 border-r rounded-[10%_13%_42%_0%/10%_12%_75%_0%] shadow-2xl transition-all duration-1000 delay-150 group-hover/card:bottom-[-1px] group-hover/card:left-[-1px] flex items-start justify-end hover:bg-white/20">
                            <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.886.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.89 4.44-9.892 9.886 0 2.125.593 3.456 1.574 5.111l-.973 3.548 3.891-.971z" /></svg>
                          </a>

                          {/* Box 3 - Phone */}
                          <a href="tel:+1234567890" className="absolute w-[35%] h-[35%] bottom-[-35%] left-[-35%] p-3 bg-primary/30 backdrop-blur-xl border-t border-white/20 border-r rounded-[10%_13%_42%_0%/10%_12%_75%_0%] shadow-2xl transition-all duration-1000 delay-300 group-hover/card:bottom-[-1px] group-hover/card:left-[-1px] flex items-start justify-end hover:bg-primary/40">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                          </a>

                          {/* Box 4 - Base */}
                          <div className="absolute w-[15%] h-[15%] bottom-[-15%] left-[-15%] bg-primary/40 transition-all duration-1000 delay-500 group-hover/card:bottom-[-1px] group-hover/card:left-[-1px]"></div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={[csrImg, ai1, csr6jpg][activeCommitment]}
                        alt="Commitment"
                        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000"
                      />
                    )}
                  </div>
                </Reveal>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Section (Timeline) */}
      <section id="about-us" className="w-full bg-white py-32 px-8 md:px-12 lg:px-20 relative z-10 overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          {(() => {
            const timelineItems = [
              { year: "2010", title: "The Foundation", desc: "Try Neutra was established with a vision to revolutionize localized pharmaceutical care.", img: image1 },
              { year: "2015", title: "Strategic Expansion", desc: "Inaugurated our first high-tech research facility, expanding our scope into clinical analysis.", img: i2jpg },
              { year: "2020", title: "Innovation Peak", desc: "Achieved major breakthroughs in neuro-supportive treatments and global quality certifications.", img: about5 },
              { year: "2024", title: "Digital Future", desc: "Integrating AI-driven research and state-of-the-art laboratory automation for a healthier world.", img: l3png }
            ];
            return (
              <>


                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Side: Interactive Image */}
                  <div className="lg:col-span-6 relative lg:pt-0">
                    <Reveal animation="reveal-right">
                      <div className="relative rounded-[40px] overflow-hidden shadow-2xl h-[350px] sm:h-[420px] md:h-[480px] lg:h-[540px]">
                        {timelineItems.map((item, idx) => (
                          idx === selectedYear ? (
                            <img
                              key={`active-${selectedYear}`}
                              src={item.img}
                              alt={item.year}
                              className="journey-img-active absolute inset-0 w-full h-full object-cover"
                            />
                          ) : (
                            <img
                              key={idx}
                              src={item.img}
                              alt={item.year}
                              className="absolute inset-0 w-full h-full object-cover"
                              style={{ opacity: 0 }}
                            />
                          )
                        ))}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent"></div>
                      </div>
                    </Reveal>

                    {/* ISO Certified Badge */}
                    <div className="absolute top-4 right-4 sm:top-auto sm:bottom-10 sm:right-6 sm:translate-y-1/2 z-20 w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] lg:w-[165px] lg:h-[165px] bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center justify-center gap-1 sm:gap-1.5 p-3 sm:p-5">
                      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-primary flex items-center justify-center mb-0.5 sm:mb-1 shadow-md shadow-primary/30">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-5 h-5 sm:w-6 sm:h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                        </svg>
                      </div>
                      <div className="text-lg sm:text-2xl font-bold text-navy leading-none">ISO</div>
                      <div className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.15em] text-primary text-center leading-tight">Certified<br />Standards</div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                    <div className="absolute -top-6 -left-6 w-32 h-32 bg-navy/5 rounded-full blur-3xl"></div>

                    {/* New Info Points below image */}
                    {/* Counter Info Points below image */}
                    <div className="mt-20 sm:mt-24 grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-4">
                      <Reveal animation="reveal-up" delay="delay-100">
                        <div className="flex flex-col items-center text-center group">
                          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">
                            <Counter end={14} suffix="+" duration={1000} />
                          </div>
                          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-navy px-2 opacity-70">Years Experience</span>
                        </div>
                      </Reveal>
                      <Reveal animation="reveal-up" delay="delay-200">
                        <div className="flex flex-col items-center text-center group">
                          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">
                            <Counter end={7} suffix="+" duration={1000} />
                          </div>
                          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-navy px-2 opacity-70">Approved Products</span>
                        </div>
                      </Reveal>
                      <Reveal animation="reveal-up" delay="delay-300">
                        <div className="flex flex-col items-center text-center group">
                          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">
                            <Counter end={125} suffix="+" duration={1000} />
                          </div>
                          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-navy px-2 opacity-70">Projects Monthly</span>
                        </div>
                      </Reveal>
                    </div>
                  </div>

                  {/* Right Side: Interactive Timeline */}
                  <div className="lg:col-span-6 flex flex-col">
                    <div className="mb-12">
                      <Reveal animation="reveal-up">
                        <SectionTag text="Our Legacy" />
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-navy tracking-tight">
                          Pioneering the <span className="text-primary italic font-serif">Future since 2010</span>
                        </h2>
                      </Reveal>
                    </div>
                    <div className="relative pl-8 md:pl-10">
                      {/* Vertical Timeline Line */}
                      <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gray-100">
                        <div className="absolute top-0 left-0 w-full bg-primary" style={{ height: '100%' }}></div>
                      </div>

                      {/* Timeline Points */}
                      <div className="space-y-12">
                        {timelineItems.map((item, idx) => (
                          <Reveal key={idx} animation="reveal-up" delay={`delay-${(idx + 1) * 150}`}>
                            <div
                              className={`relative cursor-pointer group transition-all duration-300 rounded-xl p-3 -ml-3 ${selectedYear === idx ? 'bg-primary/5' : 'hover:bg-gray-50'
                                }`}
                              onClick={() => setSelectedYear(idx)}
                              onMouseEnter={() => setSelectedYear(idx)}
                            >
                              {/* Timeline Dot */}
                              <div
                                className={`absolute -left-[28px] md:-left-[36px] top-5 w-4 h-4 rounded-full border-2 z-10 transition-all duration-300 cursor-pointer ${selectedYear === idx
                                    ? 'border-primary bg-primary scale-125'
                                    : 'border-primary bg-white group-hover:bg-primary'
                                  }`}
                                onClick={(e) => { e.stopPropagation(); setSelectedYear(idx); }}
                              >
                                {selectedYear === idx && (
                                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30"></div>
                                )}
                              </div>

                              <div className="flex flex-col">
                                <span className={`font-bold text-xl mb-1 transition-colors duration-300 ${selectedYear === idx ? 'text-primary' : 'text-primary/70 group-hover:text-primary'
                                  }`}>{item.year}</span>
                                <h4 className={`text-xl font-bold mb-2 transition-colors duration-300 ${selectedYear === idx ? 'text-navy' : 'text-navy/70 group-hover:text-navy'
                                  }`}>{item.title}</h4>
                                <p className={`text-[15px] leading-relaxed max-w-md transition-all duration-300 ${selectedYear === idx ? 'text-gray-600 max-h-20' : 'text-gray-400 max-h-0 overflow-hidden group-hover:text-gray-500 group-hover:max-h-20'
                                  }`}>{item.desc}</p>
                              </div>
                            </div>
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* Marquee Product Showcase Section */}
      <section className="relative py-12 overflow-hidden bg-white">
        <div className="max-w-[1400px] mx-auto px-6 relative flex flex-col items-center justify-center min-h-[500px]">
          {/* Section Heading */}
          <div className="text-center mb-16 relative z-10">
            <Reveal animation="reveal-up">
              <SectionTag text="Our Best Seller" centered={true} />
              <h2 className="text-4xl md:text-5xl font-sans font-bold text-navy tracking-tight">
                Popular <span className="text-primary italic font-serif">this month</span>
              </h2>
            </Reveal>
          </div>

          {/* Marquee Background - strictly behind the card area */}
          <div className="absolute inset-0 flex items-center justify-center pt-24 overflow-hidden pointer-events-none select-none z-0">
            <div className="animate-marquee flex whitespace-nowrap">
              <span className="text-[10vw] font-medium uppercase text-primary opacity-[0.2] mx-10 whitespace-nowrap tracking-tighter inline-block" style={{ transform: 'scaleX(0.7)' }}>Try Neutra &nbsp;&nbsp;&nbsp; Pharmaceutical</span>
              <span className="text-[10vw] font-medium uppercase text-primary opacity-[0.2] mx-10 whitespace-nowrap tracking-tighter inline-block" style={{ transform: 'scaleX(0.7)' }}>Try Neutra &nbsp;&nbsp;&nbsp; Pharmaceutical</span>
              <span className="text-[10vw] font-medium uppercase text-primary opacity-[0.2] mx-10 whitespace-nowrap tracking-tighter inline-block" style={{ transform: 'scaleX(0.7)' }}>Try Neutra &nbsp;&nbsp;&nbsp; Pharmaceutical</span>
            </div>
          </div>

          <div
            className="relative w-full h-[500px] flex items-center justify-center overflow-visible z-10"
            onMouseEnter={() => setIsHoveringShowcase(true)}
            onMouseLeave={() => setIsHoveringShowcase(false)}
          >
            {products.map((product, idx) => {
              const diff = (idx - showcaseIndex + products.length) % products.length;
              let offset = diff;
              if (offset > products.length / 2) offset -= products.length;
              if (offset < -products.length / 2) offset += products.length;

              // Only show items within range -2 to 2
              if (Math.abs(offset) > 2) return null;

              const isActive = offset === 0;
              const isNeighbor = Math.abs(offset) === 1;
              const isFar = Math.abs(offset) === 2;

              let xOffset = offset * 320; // Default spacing
              if (isFar) xOffset = offset * 500; // More spacing for far ones

              // Responsive adjustments for xOffset
              if (window.innerWidth < 768) {
                xOffset = offset * 180;
                if (isFar) xOffset = offset * 250;
              } else if (window.innerWidth < 1024) {
                xOffset = offset * 260;
                if (isFar) xOffset = offset * 400;
              }

              return (
                <div
                  key={product.id}
                  className={`absolute transition-all duration-400 ease-in-out cursor-pointer ${isActive ? 'z-50' : 'z-20'}`}
                  style={{
                    transform: `translateX(${xOffset}px) scale(${isActive ? 1.2 : isNeighbor ? 0.85 : 0.65})`,
                    opacity: isActive ? 1 : isNeighbor ? 0.5 : 0.2,
                    filter: isActive ? 'none' : `blur(${isNeighbor ? '2px' : '6px'})`,
                    pointerEvents: isActive ? 'auto' : 'none'
                  }}
                  onClick={() => setShowcaseIndex(idx)}
                >
                  <div className="showcase-card-custom group">
                    <div className="card-img-container">
                      <img src={product.img} alt={product.name} className="card-product-image" />
                    </div>
                    <p className="card-heading-custom">{product.name}</p>
                    <p className="card-powered">Powered By</p>
                    <p className="card-brand-name">Try Neutra</p>
                  </div>
                </div>
              );
            })}

            {/* Prev Arrow */}
            <button
              onClick={() => setShowcaseIndex((prev) => (prev - 1 + products.length) % products.length)}
              className="absolute left-4 md:left-10 z-[60] w-12 h-12 rounded-full bg-white border-2 border-primary/20 shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary hover:scale-110 transition-all duration-300"
              aria-label="Previous product"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Arrow */}
            <button
              onClick={() => setShowcaseIndex((prev) => (prev + 1) % products.length)}
              className="absolute right-4 md:right-10 z-[60] w-12 h-12 rounded-full bg-white border-2 border-primary/20 shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary hover:scale-110 transition-all duration-300"
              aria-label="Next product"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Curved Banner Section */}
      <section className="curved-banner-custom relative py-16 flex items-center justify-center text-center text-white overflow-hidden">
        {/* Deep Gradient Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy/40 z-0"></div>

        <div className="relative z-10 max-w-4xl px-6">
          <Reveal animation="reveal-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold mb-8 leading-[1.1] tracking-tight">
              Essential Support for <br />
              <span className="text-primary italic font-serif font-medium">Your Vital Life</span>
            </h2>
            <a href="#contact" className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-2xl font-bold text-[17px] shadow-2xl shadow-primary/30 transition-all transform hover:scale-[1.05] active:scale-[0.95]">
              Contact Us <span>→</span>
            </a>
          </Reveal>
        </div>
      </section>


      {/* Professional Insight Section (Text Left, Split Image Right) */}
      <section id="diagnostics" className="py-32 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Left Content */}
            <div ref={diagTextRef} className="order-2 lg:order-1" style={{ opacity: 0 }}>
                <SectionTag text="Precision & Care" />
                <h2 className="text-4xl md:text-5xl font-sans font-bold text-navy mb-8 leading-tight">
                  Modern Diagnostic <br />
                  <span className="text-4xl md:text-5xl text-primary italic font-serif">Solutions</span>
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed font-medium">
                  We integrate cutting-edge diagnostic technology with compassionate care to provide accurate results when they matter most. Our advanced systems are designed for speed, reliability, and precision.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "AI-driven diagnostic accuracy",
                    "Rapid results with 24/7 monitoring",
                    "Personalized health insights for patients"
                  ].map((point, i) => (
                    <div key={i} className="flex items-center gap-4 text-navy font-semibold text-lg">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      {point}
                    </div>
                  ))}
                </div>

                <a href="#about-us" className="inline-block bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/20 transform hover:-translate-y-1">
                  Learn More
                </a>
            </div>

            {/* Right Image - Diagonal Split Gallery Animation */}
            <div ref={diagImageRef} className="order-1 lg:order-2 relative" style={{ opacity: 0 }}>
                <div className="gallery-split">
                  <img src={ai1} alt="Diagnostic Tool 1" />
                  <img src={ai2} alt="Diagnostic Tool 2" />
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* Strategic Areas of Excellence (New 3-Card Section) */}
      <section className="w-full bg-[#f1f7fa] py-32 px-8 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-[1200px] mx-auto text-center mb-24 px-4">
          <Reveal animation="reveal-up">
            <SectionTag text="Strategic Areas" centered={true} />
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-navy mb-4 tracking-tight">
              Strategic Areas of <span className="text-primary italic font-serif">Excellence</span>
            </h2>
          </Reveal>
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6 items-start">
          {[
            {
              title: "Product Innovation",
              img: productInnovationImg,
              desc: "Specializing in high-quality multivitamins and pediatric solutions that meet global standards.",
              link: "#products",
              offset: "lg:mt-0"
            },
            {
              title: "Clinical Research",
              img: researchImg,
              desc: "Advancing pharmaceutical science through rigorous laboratory analysis and breakthrough discoveries.",
              link: "#research",
              offset: "lg:mt-16"
            },
            {
              title: "Social Impact (CSR)",
              img: csrImg,
              desc: "Committed to community wellness and sustainable health initiatives for a better tomorrow.",
              link: "#core-commitments",
              offset: "lg:mt-0"
            },
            {
              title: "Know About Us",
              img: image1,
              desc: "Explore our legacy of pioneering pharmaceutical solutions and healthcare advancements.",
              link: "#about-us",
              offset: "lg:mt-16"
            }
          ].map((item, idx) => (
            <Reveal key={idx} animation="reveal-up" delay={`delay-${(idx + 1) * 150}`} className={item.offset}>
              <div className="bg-white rounded-[24px] p-6 pb-6 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center text-center group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                <div className="w-full h-[180px] -mt-12 mb-5 rounded-[20px] overflow-hidden shadow-xl shadow-navy/10 transform group-hover:scale-105 transition-transform duration-500 shrink-0">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-h-[56px] flex items-center shrink-0">
                  <h3 className="text-lg md:text-xl font-bold text-navy group-hover:text-primary transition-colors">{item.title}</h3>
                </div>
                <p className="text-gray-500 text-[13px] md:text-[14px] leading-relaxed mb-5 px-2 font-medium">
                  {item.desc}
                </p>
                <a href={item.link} className="text-navy font-bold text-xs uppercase tracking-widest flex items-center gap-2 group/link hover:text-primary transition-colors shrink-0">
                  Know More <span className="text-primary group-hover/link:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Reveal animation="reveal-up">
            <a href="#about-us" className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-xl font-bold text-[15px] transition-all shadow-xl shadow-primary/20 transform hover:scale-105 active:scale-95 inline-block">
              Explore Our Journey
            </a>
          </Reveal>
        </div>
      </section>

      {/* Contact Us Section - Enhanced */}
      <section id="contact" className="py-36 bg-[#fcfdfe] overflow-hidden relative">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -ml-48 -mb-48"></div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

          {/* Left Side: Content & Branding */}
          <div className="relative z-10">
            <Reveal animation="reveal-right">
              <SectionTag text="Connect with Us" />

              <h2 className="text-4xl md:text-5xl font-sans font-semibold text-navy mb-10 leading-[1.2] tracking-tight max-w-xl">
                Ready to <span className="text-primary italic font-serif">Transform</span> Healthcare?
              </h2>

              <div className="space-y-10 mb-16">
                <div className="flex gap-6 group">
                  <div className="w-16 h-16 rounded-3xl bg-white shadow-xl shadow-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500 shrink-0 border border-gray-100/50">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.727 2.903a11.042 11.042 0 01-5.064-5.064l2.903-.727a2 2 0 001.414-1.96l-.477-2.387a2 2 0 00-.547-1.022L7.701 4.701a2 2 0 00-2.828 0L2.122 7.45a2 2 0 00-.547 2.117 19.925 19.925 0 0014.862 14.862 2 2 0 002.117-.547l2.75-2.75a2 2 0 000-2.828l-2.828-2.828z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-navy mb-2 group-hover:text-primary transition-colors">Strategic Partnership</h4>
                    <p className="text-gray-500 leading-relaxed font-medium max-w-sm">Collaborate with us to develop next-generation medical solutions and distribution networks.</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-16 h-16 rounded-3xl bg-white shadow-xl shadow-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500 shrink-0 border border-gray-100/50">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-navy mb-2 group-hover:text-primary transition-colors">Unmatched Quality</h4>
                    <p className="text-gray-500 leading-relaxed font-medium max-w-sm">Every product undergoes rigorous testing to exceed international pharmaceutical benchmarks.</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-16 h-16 rounded-3xl bg-white shadow-xl shadow-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500 shrink-0 border border-gray-100/50">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-navy mb-2 group-hover:text-primary transition-colors">Expert Consultations</h4>
                    <p className="text-gray-500 leading-relaxed font-medium max-w-sm">Connect with our medical experts for personalized guidance on pharmaceutical integration.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Side: Enhanced Form Card */}
          <div className="relative">
            <Reveal animation="reveal-left">
              <div className="relative bg-white p-10 md:p-14 rounded-[48px] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.12)] border border-gray-50">
                <div className="mb-10">
                  <h3 className="text-3xl font-bold text-navy mb-3">Send a Message</h3>
                  <p className="text-gray-400 font-medium">We typically respond within 2-4 business hours.</p>
                </div>

                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                      <input type="text" id="name" className="w-full bg-transparent border-b-2 border-gray-100 py-4 text-navy placeholder-transparent focus:outline-none focus:border-primary transition-all font-semibold text-lg peer" placeholder="Name" />
                      <label htmlFor="name" className="absolute left-0 -top-2 text-xs font-semibold text-gray-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary">Full Name</label>
                    </div>
                    <div className="relative group">
                      <input type="email" id="email" className="w-full bg-transparent border-b-2 border-gray-100 py-4 text-navy placeholder-transparent focus:outline-none focus:border-primary transition-all font-semibold text-lg peer" placeholder="Email" />
                      <label htmlFor="email" className="absolute left-0 -top-2 text-xs font-semibold text-gray-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary">Email Address</label>
                    </div>
                  </div>

                  <div className="relative group">
                    <input type="text" id="subject" className="w-full bg-transparent border-b-2 border-gray-100 py-4 text-navy placeholder-transparent focus:outline-none focus:border-primary transition-all font-semibold text-lg peer" placeholder="Subject" />
                    <label htmlFor="subject" className="absolute left-0 -top-2 text-xs font-semibold text-gray-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary">How can we help?</label>
                  </div>

                  <div className="relative group">
                    <textarea id="message" rows="3" className="w-full bg-transparent border-b-2 border-gray-100 py-4 text-navy placeholder-transparent focus:outline-none focus:border-primary transition-all font-semibold text-lg peer resize-none" placeholder="Message"></textarea>
                    <label htmlFor="message" className="absolute left-0 -top-2 text-xs font-semibold text-gray-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary">Your Message</label>
                  </div>

                  <button className="bg-primary hover:bg-primary-dark text-white px-12 py-4 rounded-[20px] font-bold text-[17px] shadow-xl shadow-primary/20 transition-all transform hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-4 group mt-8 w-full md:w-max">
                    Initiate Discussion
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
                    </div>
                  </button>
                </form>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* Professional Footer Section */}
      <footer className="relative bg-[#0a0a0a] text-white pt-24 pb-12 overflow-hidden border-t border-white/5">
        {/* Large Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-white/[0.02] pointer-events-none select-none z-0 tracking-tighter whitespace-nowrap">
          TRY NEUTRA
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

            {/* Brand Column */}
            <Reveal animation="reveal-up">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <img src="/favicon.svg" className="w-10 h-10 rounded-xl shadow-lg shadow-primary/20" alt="Try Neutra Logo" />
                  <span className="font-bold text-white tracking-tight text-2xl uppercase">Try Neutra</span>
                </div>
                <p className="text-gray-400 text-[15px] leading-relaxed max-w-xs font-medium">
                  Advancing the frontiers of medicine through research, innovation, and a relentless commitment to global healthcare.
                </p>
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/tryneutra" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group">
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                  <a href="https://api.whatsapp.com/send?phone=923066966385&text=TRY+NEUTRA+pharmaceuticals" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group">
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Links Column */}
            <Reveal animation="reveal-up" delay="delay-100">
              <div>
                <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
                  Quick Links
                  <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-primary"></span>
                </h4>
                <ul className="flex flex-col gap-4">
                  {["Home", "About Us", "Products", "Research", "CSR"].map((link) => (
                    <li key={link}>
                      <a href={link === "Home" ? "#" : link === "CSR" ? "#core-commitments" : `#${link.toLowerCase().replace(" ", "-")}`} className="text-gray-400 hover:text-primary transition-colors font-medium flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors"></span>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Contact Column */}
            <Reveal animation="reveal-up" delay="delay-200">
              <div className="lg:col-span-2 flex flex-col lg:items-end">
                <div className="w-full max-w-sm">
                  <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
                    Get in Touch
                    <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-primary"></span>
                  </h4>
                  <div className="flex flex-col gap-6">
                    <a href="tel:03262422229" className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Phone</span>
                        <span className="text-lg font-bold text-white group-hover:text-primary transition-colors">0326 2422229</span>
                      </div>
                    </a>

                    <a href="mailto:tayyabgohar0@gmail.com" className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Email Support</span>
                        <span className="text-lg font-bold text-white group-hover:text-primary transition-colors">tayyabgohar0@gmail.com</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Bottom Bar */}
          <Reveal animation="reveal-up" delay="delay-300">
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-gray-500 text-sm font-medium">
                © 2026 <span className="text-white">HAT Tech</span>. All rights reserved.
              </p>
              <div className="flex gap-8 text-sm font-bold text-gray-500">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </Reveal>
        </div>
      </footer>
    </div>
  )
}

export default App
