import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Stars, Float, Preload } from '@react-three/drei';
import * as THREE from 'three';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const childVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 22 } },
};

const JavaModel = () => {
  const { scene } = useGLTF('/java.glb');
  const modelRef = useRef();
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) { child.material.envMapIntensity = 1; child.material.needsUpdate = true; }
      }
    });
  }, [scene]);
  useFrame((state) => {
    if (modelRef.current) modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
  });
  return <primitive ref={modelRef} object={scene} scale={0.4} position={[0, -0.2, 0]} />;
};

const Stat = ({ n, label }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', fontFamily: "'Open Sans',sans-serif" }}>{n}</div>
    <div style={{ fontSize: 'clamp(9px, 1vw, 11px)', fontWeight: 600, color: '#888', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Open Sans',sans-serif", marginTop: '3px' }}>{label}</div>
  </div>
);

const Tag = ({ children }) => (
  <span style={{
    display: 'inline-block', padding: '4px 11px',
    border: '1px solid rgba(255,255,255,0.22)', borderRadius: '2px',
    fontSize: 'clamp(10px, 1.1vw, 12px)', fontWeight: 600, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: '#ddd', fontFamily: "'Open Sans',sans-serif",
  }}>{children}</span>
);

const TabBtn = ({ label, active, onClick }) => (
  <button onClick={onClick} style={{
    background: 'none', border: 'none', cursor: 'pointer',
    padding: '6px 0', fontSize: 'clamp(10px, 1.1vw, 12px)', fontWeight: 700,
    letterSpacing: '0.15em', textTransform: 'uppercase',
    color: active ? '#ffffff' : '#666',
    fontFamily: "'Open Sans',sans-serif",
    borderBottom: active ? '1px solid #ff3333' : '1px solid transparent',
    transition: 'color 0.2s, border-color 0.2s',
  }}>{label}</button>
);

const panels = {
  story: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <p style={{ margin: 0, fontSize: 'clamp(12px, 1.3vw, 14px)', fontWeight: 400, color: '#dddddd', lineHeight: 1.85, fontFamily: "'Open Sans',sans-serif" }}>
        Born &amp; raised in <span style={{ color: '#ffffff', fontWeight: 700 }}>Udaipur, Rajasthan</span>. Schooled at The Stanvard Sr. Sec. School
        (Science &amp; Maths, 71% in 12th). Graduated with a <span style={{ color: '#ffffff', fontWeight: 700 }}>B.Sc. CS from MLSU</span> in 2025.
      </p>
      <p style={{ margin: 0, fontSize: 'clamp(12px, 1.3vw, 14px)', fontWeight: 400, color: '#dddddd', lineHeight: 1.85, fontFamily: "'Open Sans',sans-serif" }}>
        Started Full-Stack Dev in <span style={{ color: '#ffffff', fontWeight: 700 }}>2024</span> with Java — built production apps, maintained client sites via GitHub pipelines, configured DNS &amp; domains. Beyond code: <span style={{ color: '#ffffff', fontWeight: 700 }}>guitar, singing</span>, and{' '}
        <span style={{ color: '#ff3333', fontStyle: 'italic', fontWeight: 700 }}>integrity above all.</span>
      </p>
    </div>
  ),
  edu: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ borderLeft: '2px solid #ff3333', paddingLeft: '14px' }}>
        <div style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', fontWeight: 700, color: '#ffffff', fontFamily: "'Open Sans',sans-serif" }}>Mohanlal Sukhadia University</div>
        <div style={{ fontSize: 'clamp(11px, 1.2vw, 13px)', fontWeight: 400, color: '#bbbbbb', fontFamily: "'Open Sans',sans-serif", marginTop: '4px' }}>B.Sc. Computer Science</div>
        <div style={{ fontSize: 'clamp(9px, 1vw, 11px)', color: '#ff3333', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Open Sans',sans-serif", marginTop: '5px', fontWeight: 600 }}>2022 – 2025 · 60%</div>
      </div>
      <div style={{ borderLeft: '2px solid rgba(255,255,255,0.18)', paddingLeft: '14px' }}>
        <div style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', fontWeight: 700, color: '#ffffff', fontFamily: "'Open Sans',sans-serif" }}>The Stanvard Sr. Sec. School</div>
        <div style={{ fontSize: 'clamp(11px, 1.2vw, 13px)', fontWeight: 400, color: '#bbbbbb', fontFamily: "'Open Sans',sans-serif", marginTop: '4px' }}>Science &amp; Mathematics</div>
        <div style={{ fontSize: 'clamp(9px, 1vw, 11px)', color: '#888', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Open Sans',sans-serif", marginTop: '5px', fontWeight: 600 }}>12th · 71%</div>
      </div>
    </div>
  ),
};

const card = {
  background: 'rgba(0,0,0,0.72)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '3px',
  pointerEvents: 'auto',
};

const About = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeTab, setActiveTab] = useState('story');

  return (
    <section ref={ref} style={{
      position: 'relative', width: '100vw', minHeight: '100vh',
      backgroundColor: '#000', color: '#fff', overflow: 'hidden',
      fontFamily: "'Open Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { background: #000; margin: 0; padding: 0; }
        ::selection { background: rgba(255,255,255,0.18); }

        /* Mobile: stack layout */
        @media (max-width: 767px) {
          .about-layout {
            position: relative !important;
            width: 100% !important;
            min-height: 100vh !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            padding: 24px 16px 32px !important;
            gap: 10px !important;
          }
          .about-canvas {
            position: fixed !important;
            top: 0 !important; left: 0 !important;
            width: 100% !important; height: 100% !important;
            opacity: 0.35 !important;
          }
        }

        /* Tablet */
        @media (min-width: 768px) and (max-width: 1023px) {
          .about-layout {
            width: clamp(340px, 55vw, 520px) !important;
            padding: clamp(24px, 3.5vw, 40px) !important;
          }
        }
      `}</style>

      {/* ── 3D Background ── */}
      <div className="about-canvas" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}>
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1.5} />
            <ambientLight intensity={0.9} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
              <group position={[typeof window !== 'undefined' && window.innerWidth > 1024 ? 1.5 : 0, 0, 0]}>
                <JavaModel />
              </group>
            </Float>
            <OrbitControls enableZoom={false} enablePan={false} />
            <Environment preset="studio" />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Left card column ── */}
      <motion.div
        className="about-layout"
        style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(20px, 4vw, 52px)',
          gap: '10px',
          width: 'clamp(300px, 40vw, 460px)',
          pointerEvents: 'none',
        }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >

        {/* Back */}
        <motion.div variants={childVariants} style={{ pointerEvents: 'auto', marginBottom: '2px' }}>
          <a href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            color: '#888', textDecoration: 'none', fontSize: 'clamp(10px, 1.1vw, 12px)',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            fontFamily: "'Open Sans',sans-serif", fontWeight: 600, transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#888'}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </a>
        </motion.div>

        {/* Name card */}
        <motion.div variants={childVariants} style={{ ...card, padding: 'clamp(14px, 1.8vw, 20px) clamp(16px, 2vw, 22px)' }}>
          <div style={{ fontSize: 'clamp(9px, 1vw, 11px)', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#ff3333', fontFamily: "'Open Sans',sans-serif", marginBottom: '7px', fontWeight: 700 }}>About</div>
          <div style={{ fontSize: 'clamp(26px, 3.2vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, fontFamily: "'Open Sans',sans-serif" }}>
            Rohit <span style={{ color: '#ff3333' }}>Suthar</span>
          </div>
        </motion.div>

        {/* Stats card */}
        <motion.div variants={childVariants} style={{ ...card, padding: 'clamp(12px, 1.5vw, 16px) clamp(14px, 1.8vw, 20px)', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px' }}>
          <Stat n="1+" label="Yrs" />
          <Stat n="5+" label="Projects" />
          <Stat n="2025" label="Grad" />
          <Stat n="Java" label="Origin" />
        </motion.div>

        {/* Tabbed card — Story & Education only */}
        <motion.div variants={childVariants} style={{ ...card, padding: 'clamp(14px, 1.8vw, 20px) clamp(16px, 2vw, 22px)' }}>
          <div style={{ display: 'flex', gap: '22px', marginBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.09)', paddingBottom: '10px' }}>
            <TabBtn label="Story"     active={activeTab === 'story'} onClick={() => setActiveTab('story')} />
            <TabBtn label="Education" active={activeTab === 'edu'}   onClick={() => setActiveTab('edu')}   />
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
              {panels[activeTab]}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA row */}
        <motion.div variants={childVariants} style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
          <a href="/projects" style={{
            flex: 1, textAlign: 'center', padding: 'clamp(10px, 1.2vw, 13px) 0',
            background: '#fff', color: '#000', borderRadius: '2px',
            fontSize: 'clamp(10px, 1.1vw, 12px)', fontWeight: 700, letterSpacing: '0.15em',
            textTransform: 'uppercase', textDecoration: 'none',
            fontFamily: "'Open Sans',sans-serif", transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#e0e0e0'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >View Projects</a>
          <a href="/skills" style={{
            flex: 1, textAlign: 'center', padding: 'clamp(10px, 1.2vw, 13px) 0',
            border: '1px solid rgba(255,255,255,0.22)', color: '#cccccc', borderRadius: '2px',
            fontSize: 'clamp(10px, 1.1vw, 12px)', fontWeight: 700, letterSpacing: '0.15em',
            textTransform: 'uppercase', textDecoration: 'none',
            fontFamily: "'Open Sans',sans-serif", transition: 'border-color 0.2s, color 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; e.currentTarget.style.color = '#cccccc'; }}
          >My Skills</a>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default About;