import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Stars, Float, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { Helmet } from "react-helmet-async";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 22, delay: d },
  }),
};

const JavaModel = () => {
  const { scene } = useGLTF('/java.glb');
  const modelRef = useRef();
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.envMapIntensity = 1;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);
  useFrame((state) => {
    if (modelRef.current) modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
  });
  return <primitive ref={modelRef} object={scene} scale={0.4} position={[0, -0.2, 0]} />;
};

const Tag = ({ children }) => (
  <span style={{
    display: 'inline-block', padding: '4px 10px',
    border: '1px solid rgba(255,255,255,0.22)', borderRadius: '2px',
    fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: '#ddd',
    fontFamily: "'Open Sans',sans-serif",
  }}>{children}</span>
);

const StatItem = ({ n, label }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff', fontFamily: "'Open Sans',sans-serif", lineHeight: 1 }}>{n}</div>
    <div style={{ fontSize: '9px', fontWeight: 600, color: '#666', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Open Sans',sans-serif", marginTop: '4px' }}>{label}</div>
  </div>
);

const glass = {
  background: 'rgba(0,0,0,0.72)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.11)',
  borderRadius: '3px',
};

const About = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const [activeTab, setActiveTab] = useState('story');

  return (
    <section ref={ref} style={{
      position: 'relative', width: '100vw',
      backgroundColor: '#000', color: '#fff',
      fontFamily: "'Open Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { background: #000; margin: 0; padding: 0; }

        /* ── DESKTOP ── */
        .about-section-inner { height: 100vh; overflow: hidden; position: relative; }
        .about-canvas-wrap { position: absolute; inset: 0; z-index: 0; }

        .corner-tl { position: absolute; top: clamp(20px,3vw,38px); left: clamp(20px,3vw,38px); max-width: 240px; z-index: 10; }
        .corner-tr { position: absolute; top: clamp(20px,3vw,38px); right: clamp(20px,3vw,38px); max-width: 230px; z-index: 10; text-align: right; }
        .corner-bl { position: absolute; bottom: clamp(20px,3vw,38px); left: clamp(20px,3vw,38px); max-width: 290px; z-index: 10; }
        .corner-br { position: absolute; bottom: clamp(20px,3vw,38px); right: clamp(20px,3vw,38px); max-width: 250px; z-index: 10; }

        .mobile-stack { display: none; }

        /* ── MOBILE ── */
        @media (max-width: 767px) {
          .about-section-inner { height: auto !important; min-height: 0 !important; overflow: visible !important; }
          .about-canvas-wrap { display: none !important; }
          .corner-tl, .corner-tr, .corner-bl, .corner-br { display: none !important; }
          .mobile-stack {
            display: flex !important;
            flex-direction: column;
            position: relative;
            z-index: 10;
            padding: 20px 16px 36px;
          }
          .mob-sep { height: 1px; background: rgba(255,255,255,0.08); margin: 0; }
        }
      `}</style>

      <Helmet>
        <title>About | Rohit Suthar</title>
        <meta name="description" content="Learn more about Rohit Suthar – a full-stack developer from Udaipur." />
      </Helmet>

      <div className="about-section-inner">

        {/* 3D Canvas */}
        <div className="about-canvas-wrap">
          <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
            style={{ background: 'transparent' }}>
            <Suspense fallback={null}>
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1.5} />
              <ambientLight intensity={2.5} />
              <directionalLight position={[5, 5, 5]} intensity={3} />
              <directionalLight position={[-5, -5, -5]} intensity={1.5} />
              <pointLight position={[0, 5, 3]} intensity={4} color="#ffffff" />
              <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
                <JavaModel />
              </Float>
              <OrbitControls enableZoom={false} enablePan={false} />
              <Environment preset="dawn" />
              <Preload all />
            </Suspense>
          </Canvas>
        </div>

        {/* ── DESKTOP CORNERS ── */}

        {/* TOP-LEFT: Back + Name */}
        <motion.div className="corner-tl"
          custom={0} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <a href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: '#555', textDecoration: 'none', fontSize: '11px',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            fontFamily: "'Open Sans',sans-serif", fontWeight: 600,
            transition: 'color 0.2s', marginBottom: '10px',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#555'}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </a>
          <div style={{ ...glass, padding: '14px 18px' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#ff3333', marginBottom: '6px', fontWeight: 700, fontFamily: "'Open Sans',sans-serif" }}>About</div>
            <div style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, fontFamily: "'Open Sans',sans-serif" }}>
              Rohit <span style={{ color: '#ff3333' }}>Suthar</span>
            </div>
          </div>
        </motion.div>

        {/* TOP-RIGHT: Stack + location */}
        <motion.div className="corner-tr"
          custom={0.1} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <div style={{ ...glass, padding: '14px 16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '9px' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', fontFamily: "'Open Sans',sans-serif", fontWeight: 600 }}>Stack</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {['Java', 'ReactJs', 'Web/App', 'SQL', 'Git/GitHub'].map(t => <Tag key={t}>{t}</Tag>)}
            </div>
            <div style={{ fontSize: '12px', color: '#999', fontFamily: "'Open Sans',sans-serif", lineHeight: 1.7 }}>
              Udaipur, Rajasthan<br />
              <span style={{ color: '#ff3333', fontWeight: 700 }}>Full-Stack Dev</span>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM-LEFT: Tabs */}
        <motion.div className="corner-bl"
          custom={0.2} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <div style={{ ...glass, padding: '14px 16px' }}>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
              {[['story', 'Story'], ['edu', 'Education']].map(([id, label]) => (
                <button key={id} onClick={() => setActiveTab(id)} style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 4px',
                  fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
                  textTransform: 'uppercase', fontFamily: "'Open Sans',sans-serif",
                  color: activeTab === id ? '#fff' : '#555',
                  borderBottom: activeTab === id ? '1px solid #ff3333' : '1px solid transparent',
                  transition: 'color 0.2s',
                }}>{label}</button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {activeTab === 'story' ? (
                <motion.p key="story" style={{ margin: 0, fontSize: '12px', color: '#ccc', lineHeight: 1.85, fontFamily: "'Open Sans',sans-serif" }}
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }}>
                  B.Sc. CS from <strong style={{ color: '#fff' }}>MLSU 2025</strong>. Full-Stack dev since <strong style={{ color: '#fff' }}>2024</strong>, starting with Java — built production apps, managed DNS &amp; pipelines. Beyond code: <strong style={{ color: '#fff' }}>guitar, singing</strong>, and <em style={{ color: '#ff3333', fontWeight: 700 }}>integrity above all.</em>
                </motion.p>
              ) : (
                <motion.div key="edu"
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ borderLeft: '2px solid #ff3333', paddingLeft: '10px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff', fontFamily: "'Open Sans',sans-serif" }}>Mohanlal Sukhadia Univ.</div>
                    <div style={{ fontSize: '11px', color: '#aaa', fontFamily: "'Open Sans',sans-serif", marginTop: '2px' }}>B.Sc. Computer Science · 60%</div>
                    <div style={{ fontSize: '10px', color: '#ff3333', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Open Sans',sans-serif", marginTop: '3px', fontWeight: 600 }}>2022 – 2025</div>
                  </div>
                  <div style={{ borderLeft: '2px solid rgba(255,255,255,0.15)', paddingLeft: '10px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff', fontFamily: "'Open Sans',sans-serif" }}>The Stanvard Sr. Sec.</div>
                    <div style={{ fontSize: '11px', color: '#aaa', fontFamily: "'Open Sans',sans-serif", marginTop: '2px' }}>Science &amp; Mathematics · 71%</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* BOTTOM-RIGHT: Stats + CTAs */}
        <motion.div className="corner-br"
          custom={0.3} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <div style={{ ...glass, padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px', marginBottom: '8px' }}>
            <StatItem n="1+" label="Yrs" />
            <StatItem n="5+" label="Proj" />
            <StatItem n="2025" label="Grad" />
            <StatItem n="Java" label="Origin" />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a href="/projects" style={{
              flex: 1, textAlign: 'center', padding: '11px 0',
              background: '#fff', color: '#000', borderRadius: '2px',
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', textDecoration: 'none',
              fontFamily: "'Open Sans',sans-serif", transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#e0e0e0'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >Projects</a>
            <a href="/skills" style={{
              flex: 1, textAlign: 'center', padding: '11px 0',
              border: '1px solid rgba(255,255,255,0.2)', color: '#ccc', borderRadius: '2px',
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', textDecoration: 'none',
              fontFamily: "'Open Sans',sans-serif", transition: 'border-color 0.2s, color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#ccc'; }}
            >Skills</a>
          </div>
        </motion.div>

      </div>{/* end .about-section-inner */}

      {/* ════════════════════════════
          MOBILE — single column
          (hidden on desktop via CSS)
      ════════════════════════════ */}
      <motion.div className="mobile-stack"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
        initial="hidden" animate={isInView ? 'visible' : 'hidden'}>

        {/* Back */}
        <motion.div variants={fadeUp} style={{ marginBottom: '14px' }}>
          <a href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: '#555', textDecoration: 'none', fontSize: '11px',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            fontFamily: "'Open Sans',sans-serif", fontWeight: 600,
          }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </a>
        </motion.div>

        {/* Name */}
        <motion.div variants={fadeUp} style={{ paddingBottom: '18px' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#ff3333', marginBottom: '5px', fontWeight: 700, fontFamily: "'Open Sans',sans-serif" }}>About</div>
          <div style={{ fontSize: '34px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, fontFamily: "'Open Sans',sans-serif" }}>
            Rohit <span style={{ color: '#ff3333' }}>Suthar</span>
          </div>
        </motion.div>
        <hr className="mob-sep" />

        {/* Stack */}
        <motion.div variants={fadeUp} style={{ padding: '18px 0' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', fontFamily: "'Open Sans',sans-serif", fontWeight: 600, marginBottom: '10px' }}>Stack</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['Java', 'ReactJs', 'Web/App', 'SQL', 'Git/GitHub'].map(t => <Tag key={t}>{t}</Tag>)}
          </div>
          <div style={{ fontSize: '13px', color: '#888', fontFamily: "'Open Sans',sans-serif", lineHeight: 1.7, marginTop: '10px' }}>
            Udaipur, Rajasthan &nbsp;·&nbsp; <span style={{ color: '#ff3333', fontWeight: 700 }}>Full-Stack Dev</span>
          </div>
        </motion.div>
        <hr className="mob-sep" />

        {/* Story / Education tabs */}
        <motion.div variants={fadeUp} style={{ padding: '18px 0' }}>
          <div style={{ display: 'flex', gap: '24px', marginBottom: '14px' }}>
            {[['story', 'Story'], ['edu', 'Education']].map(([id, label]) => (
              <button key={id} onClick={() => setActiveTab(id)} style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 4px',
                fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', fontFamily: "'Open Sans',sans-serif",
                color: activeTab === id ? '#fff' : '#555',
                borderBottom: activeTab === id ? '1px solid #ff3333' : '1px solid transparent',
                transition: 'color 0.2s',
              }}>{label}</button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {activeTab === 'story' ? (
              <motion.p key="story-m" style={{ margin: 0, fontSize: '13px', color: '#ccc', lineHeight: 1.85, fontFamily: "'Open Sans',sans-serif" }}
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }}>
                AI-integrated <strong style={{ color: '#fff' }}>Java Full-Stack Developer</strong> building scalable web apps, SaaS products, and AI-powered solutions. Skilled in <strong style={{ color: '#fff' }}>Java, Spring Boot, React, Next.js</strong>, APIs, databases, and cloud deployments. From development to production deployment —{' '}
                <em style={{ color: '#ff3333', fontWeight: 700 }}>building complete digital products end-to-end.</em>
              </motion.p>
            ) : (
              <motion.div key="edu-m"
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ borderLeft: '2px solid #ff3333', paddingLeft: '12px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', fontFamily: "'Open Sans',sans-serif" }}>Mohanlal Sukhadia Univ.</div>
                  <div style={{ fontSize: '12px', color: '#aaa', fontFamily: "'Open Sans',sans-serif", marginTop: '3px' }}>B.Sc. Computer Science · 60%</div>
                  <div style={{ fontSize: '10px', color: '#ff3333', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Open Sans',sans-serif", marginTop: '4px', fontWeight: 600 }}>2022 – 2025</div>
                </div>
                <div style={{ borderLeft: '2px solid rgba(255,255,255,0.15)', paddingLeft: '12px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', fontFamily: "'Open Sans',sans-serif" }}>The Stanvard Sr. Sec.</div>
                  <div style={{ fontSize: '12px', color: '#aaa', fontFamily: "'Open Sans',sans-serif", marginTop: '3px' }}>Science &amp; Mathematics · 71%</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <hr className="mob-sep" />

        {/* Stats */}
        <motion.div variants={fadeUp} style={{ padding: '18px 0', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px' }}>
          <StatItem n="1+" label="Yrs" />
          <StatItem n="5+" label="Proj" />
          <StatItem n="2025" label="Grad" />
          <StatItem n="Java" label="Origin" />
        </motion.div>
        <hr className="mob-sep" />

        {/* CTAs */}
        <motion.div variants={fadeUp} style={{ paddingTop: '18px', display: 'flex', gap: '8px' }}>
          <a href="/projects" style={{
            flex: 1, textAlign: 'center', padding: '14px 0',
            background: '#fff', color: '#000', borderRadius: '2px',
            fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase', textDecoration: 'none',
            fontFamily: "'Open Sans',sans-serif",
          }}>Projects</a>
          <a href="/skills" style={{
            flex: 1, textAlign: 'center', padding: '14px 0',
            border: '1px solid rgba(255,255,255,0.2)', color: '#ccc', borderRadius: '2px',
            fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase', textDecoration: 'none',
            fontFamily: "'Open Sans',sans-serif",
          }}>Skills</a>
        </motion.div>

      </motion.div>

    </section>
  );
};

export default About;