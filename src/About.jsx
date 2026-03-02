import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Stars, Float, Preload } from '@react-three/drei';
import * as THREE from 'three';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
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
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={0.4}
      position={[0, -0.2, 0]}
    />
  );
};

const About = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const profileData = {
    summary: `I am a fresher and an entry-level Java Full Stack Developer with a strong interest in building modern applications. I've learned to work with Spring Boot, React, Microservices, and REST APIs through project-based practice and hands-on experimentation.`,
    education: {
      university: 'Mohanlal Sukhadia University',
      degree: 'Bachelor of Science - BS, Computer Science',
      duration: '(August 2022 - May 2025)',
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full bg-[#000000] text-white overflow-hidden flex items-center justify-center py-20 px-6"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');
        body { background-color: #000000; color: white; margin: 0; padding: 0; overflow: hidden; }
        ::selection { background: rgba(255, 255, 255, 0.2); }
      `}</style>

      {/* Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: false
          }}
        >
          <Suspense fallback={null}>
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1.5}
            />
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
              <group position={[window.innerWidth > 1024 ? 1.5 : 0, 0, 0]}>
                <JavaModel />
              </group>
            </Float>
            <OrbitControls enableZoom={false} enablePan={false} />
            <Environment preset="studio" />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      {/* Foreground Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div
          className="pointer-events-auto flex flex-col justify-center space-y-8 bg-black/20 backdrop-blur-sm p-6 rounded-2xl"
          variants={childVariants}
        >
          {/* Summary */}
          <div>
            <h2 style={{
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              color: '#ffffff',
              borderLeft: '4px solid #dc2626',
              paddingLeft: '1rem',
              marginBottom: '1.5rem'
            }}>
              Summary
            </h2>
            <p style={{
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              color: '#e5e7eb',
              lineHeight: 1.8
            }}>
              {profileData.summary}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 style={{
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              color: '#ffffff',
              borderLeft: '4px solid #dc2626',
              paddingLeft: '1rem',
              marginBottom: '1.5rem'
            }}>
              Education
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <p style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 600,
                fontSize: '1.1rem',
                color: '#ffffff'
              }}>
                {profileData.education.university}
              </p>
              <p style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 300,
                fontSize: '1rem',
                color: '#d1d5db'
              }}>
                {profileData.education.degree}
              </p>
              <p style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 400,
                fontSize: '0.75rem',
                color: '#ef4444',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}>
                {profileData.education.duration}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Empty side for model */}
        <div className="hidden lg:block" />
      </motion.div>
    </section>
  );
};

export default About;