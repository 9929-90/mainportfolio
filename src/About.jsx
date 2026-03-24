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
    <div style={{ fontSize: '22px', fontWeight: 400, color: '#fff', letterSpacing: '-0.02em', fontFamily: "'Open Sans',sans-serif" }}>{n}</div>
    <div style={{ fontSize: '10px', fontWeight: 400, color: '#777', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Open Sans',sans-serif", marginTop: '3px' }}>{label}</div>
  </div>
);

const Tag = ({ children }) => (
  <span style={{
    display: 'inline-block', padding: '4px 11px',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: '2px',
    fontSize: '11px', fontWeight: 400, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: '#aaa', fontFamily: "'Open Sans',sans-serif",
  }}>{children}</span>
);

const TabBtn = ({ label, active, onClick }) => (
  <button onClick={onClick} style={{
    background: 'none', border: 'none', cursor: 'pointer',
    padding: '6px 0', fontSize: '11px', fontWeight: 400,
    letterSpacing: '0.15em', textTransform: 'uppercase',
    color: active ? '#ffffff' : '#555',
    fontFamily: "'Open Sans',sans-serif",
    borderBottom: active ? '1px solid #ff3333' : '1px solid transparent',
    transition: 'color 0.2s, border-color 0.2s',
  }}>{label}</button>
);

const panels = {
  story: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <p style={{ margin: 0, fontSize: '13px', fontWeight: 300, color: '#ccc', lineHeight: 1.8, fontFamily: "'Open Sans',sans-serif" }}>
        Born &amp; raised in <span style={{ color: '#fff', fontWeight: 400 }}>Udaipur, Rajasthan</span>. Schooled at The Stanvard Sr. Sec. School
        (Science &amp; Maths, 71% in 12th). Graduated with a <span style={{ color: '#fff', fontWeight: 400 }}>B.Sc. CS from MLSU</span> in 2025.
      </p>
      <p style={{ margin: 0, fontSize: '13px', fontWeight: 300, color: '#ccc', lineHeight: 1.8, fontFamily: "'Open Sans',sans-serif" }}>
        Started Full-Stack Dev in <span style={{ color: '#fff', fontWeight: 400 }}>2024</span> with Java — built production apps, maintained client sites via GitHub pipelines, configured DNS &amp; domains. Beyond code: <span style={{ color: '#fff', fontWeight: 400 }}>guitar, singing</span>, and{' '}
        <span style={{ color: '#ff3333', fontStyle: 'italic', fontWeight: 400 }}>integrity above all.</span>
      </p>
    </div>
  ),
  stack: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[
        { label: 'Core', tags: ['Java', 'Spring Boot', 'React', 'NestJS', 'Python', 'C++'] },
        { label: 'Infra', tags: ['AWS', 'Docker', 'Git', 'DNS & Domains', 'GitHub CI/CD'] },
        { label: 'Learning', tags: ['System Design', 'DSA', 'AI Integration'] },
      ].map(({ label, tags }) => (
        <div key={label}>
          <div style={{ fontSize: '10px', color: '#666', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Open Sans',sans-serif", marginBottom: '6px' }}>{label}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
        </div>
      ))}
    </div>
  ),
  edu: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ borderLeft: '2px solid #ff3333', paddingLeft: '12px' }}>
        <div style={{ fontSize: '14px', fontWeight: 400, color: '#fff', fontFamily: "'Open Sans',sans-serif" }}>Mohanlal Sukhadia University</div>
        <div style={{ fontSize: '12px', fontWeight: 300, color: '#aaa', fontFamily: "'Open Sans',sans-serif", marginTop: '3px' }}>B.Sc. Computer Science</div>
        <div style={{ fontSize: '10px', color: '#ff3333', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Open Sans',sans-serif", marginTop: '4px' }}>2022 – 2025 · 60%</div>
      </div>
      <div style={{ borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '12px' }}>
        <div style={{ fontSize: '14px', fontWeight: 400, color: '#fff', fontFamily: "'Open Sans',sans-serif" }}>The Stanvard Sr. Sec. School</div>
        <div style={{ fontSize: '12px', fontWeight: 300, color: '#aaa', fontFamily: "'Open Sans',sans-serif", marginTop: '3px' }}>Science &amp; Mathematics</div>
        <div style={{ fontSize: '10px', color: '#666', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Open Sans',sans-serif", marginTop: '4px' }}>12th · 71%</div>
      </div>
    </div>
  ),
};

const card = {
  background: 'rgba(0,0,0,0.65)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: '3px',
  pointerEvents: 'auto',
};

const About = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeTab, setActiveTab] = useState('story');

  return (
    <section ref={ref} style={{
      position: 'relative', width: '100vw', height: '100vh',
      backgroundColor: '#000', color: '#fff', overflow: 'hidden',
      fontFamily: "'Open Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');
        body { background: #000; margin: 0; padding: 0; overflow: hidden; }
        ::selection { background: rgba(255,255,255,0.15); }
      `}</style>

      {/* ── 3D Background ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}>
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1.5} />
            <ambientLight intensity={0.8} />
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
        style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(20px, 4vw, 52px)',
          gap: '10px',
          width: 'clamp(300px, 38vw, 440px)',
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
            color: '#666', textDecoration: 'none', fontSize: '11px',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            fontFamily: "'Open Sans',sans-serif", transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#666'}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </a>
        </motion.div>

        {/* Name card */}
        <motion.div variants={childVariants} style={{ ...card, padding: '16px 20px' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#ff3333', fontFamily: "'Open Sans',sans-serif", marginBottom: '6px' }}>About</div>
          <div style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.1, fontFamily: "'Open Sans',sans-serif" }}>
            Rohit <span style={{ color: '#ff3333' }}>Suthar</span>
          </div>
        </motion.div>

        {/* Stats card */}
        <motion.div variants={childVariants} style={{ ...card, padding: '14px 20px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px' }}>
          <Stat n="1+" label="Yrs" />
          <Stat n="5+" label="Projects" />
          <Stat n="2025" label="Grad" />
          <Stat n="Java" label="Origin" />
        </motion.div>

        {/* Tabbed card */}
        <motion.div variants={childVariants} style={{ ...card, padding: '16px 20px' }}>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '10px' }}>
            <TabBtn label="Story"     active={activeTab === 'story'} onClick={() => setActiveTab('story')} />
            <TabBtn label="Stack"     active={activeTab === 'stack'} onClick={() => setActiveTab('stack')} />
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
            flex: 1, textAlign: 'center', padding: '11px 0',
            background: '#fff', color: '#000', borderRadius: '2px',
            fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em',
            textTransform: 'uppercase', textDecoration: 'none',
            fontFamily: "'Open Sans',sans-serif", transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#e0e0e0'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >View Projects</a>
          <a href="/skills" style={{
            flex: 1, textAlign: 'center', padding: '11px 0',
            border: '1px solid rgba(255,255,255,0.15)', color: '#aaa', borderRadius: '2px',
            fontSize: '10px', fontWeight: 400, letterSpacing: '0.15em',
            textTransform: 'uppercase', textDecoration: 'none',
            fontFamily: "'Open Sans',sans-serif", transition: 'border-color 0.2s, color 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#aaa'; }}
          >My Skills</a>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default About;