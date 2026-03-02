import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    number: '01',
    status: 'live',
    title: 'AapnoKaam',
    subtitle: 'Local Skilled Workers Marketplace',
    summary: 'Full-stack service marketplace connecting consumers with local workers',
    description: 'Built and deployed a full-stack service marketplace connecting consumers with local workers (plumbers, electricians, carpenters) using Java 17, Spring Boot 3, React (Vite), and PostgreSQL.',
    url: 'https://aapnokaam.netlify.app',
    tech: ['Java 17', 'Spring Boot 3', 'React', 'Vite', 'PostgreSQL', 'WebSocket', 'Razorpay', 'JWT'],
    highlights: [
      'JWT + Spring Security & Google OAuth2',
      'Booking lifecycle state machine',
      'Haversine location-based worker search',
      'Real-time chat via WebSocket (STOMP)',
      'Razorpay payment + HMAC verification',
      'Admin dashboard & worker approval flow',
      'Email notifications & file uploads',
      'Reviews, ratings & admin panel'
    ],
    tag: 'Java Full-Stack'
  },
  {
    id: 2,
    number: '02',
    status: 'live',
    title: 'Cynera Security',
    subtitle: 'Enterprise Cybersecurity Website',
    summary: 'Modern corporate website for a cybersecurity service provider',
    description: 'Designed and developed a modern, responsive corporate website for a cybersecurity service provider using React.js, Tailwind CSS, and Framer Motion.',
    url: 'https://cynerasecurity.com',
    tech: ['React.js', 'Tailwind CSS', 'Framer Motion'],
    highlights: [
      'Reusable UI components with animations',
      'IAM, ISO 27001, MDR service pages',
      'Risk Assessment content flow',
      'Performance-focused frontend architecture',
      'Responsive layouts for all devices',
      'Clean design system & scalable structure'
    ],
    tag: 'Frontend'
  },
  {
    id: 3,
    number: '03',
    status: 'live',
    title: "Rohit's Foundation",
    subtitle: 'Blog Publishing Platform',
    summary: 'Blog platform with admin and user roles',
    description: 'A blog posting platform with distinct admin and user roles, built using React, Java Spring Boot, Tailwind CSS, and Framer Motion.',
    url: 'https://rohitsfoundation.netlify.app',
    tech: ['React', 'Spring Boot', 'Tailwind CSS', 'Framer Motion', 'Java'],
    highlights: [
      'Role-based access (Admin & User)',
      'Blog post creation & management',
      'Rich content editor',
      'Framer Motion page transitions',
      'Responsive design',
      'Admin content moderation'
    ],
    tag: 'Full-Stack'
  },
  {
    id: 4,
    number: '04',
    status: 'wip',
    title: 'Employee Management System',
    subtitle: 'HR & Workforce Management Tool',
    summary: 'Full-stack employee management system',
    description: 'A comprehensive employee management system built using the same robust stack — React, Spring Boot, Tailwind CSS, and Java. Currently in development, not yet deployed.',
    url: null,
    tech: ['React', 'Spring Boot', 'Java', 'Tailwind CSS', 'PostgreSQL'],
    highlights: [
      'Employee records & profiles',
      'Department & role management',
      'Attendance & leave tracking',
      'Payroll management',
      'Performance reviews',
      'HR dashboard & reporting'
    ],
    tag: 'Full-Stack'
  },
  {
    id: 5,
    number: '05',
    status: 'wip',
    title: 'VeriData',
    subtitle: 'Ethical AI SaaS Platform',
    summary: 'AI-powered data verification and ethics platform',
    description: 'An ethical AI SaaS platform focused on data integrity and responsible AI practices. Currently in active development — pushing boundaries of what responsible AI can look like.',
    url: null,
    tech: ['React', 'Spring Boot', 'AI/ML', 'SaaS', 'Java'],
    highlights: [
      'Ethical AI data verification',
      'SaaS subscription model',
      'AI transparency & auditability',
      'Data integrity workflows',
      'Enterprise-grade security',
      'Real-time AI monitoring'
    ],
    tag: 'AI SaaS'
  }
];

const statusConfig = {
  live: { label: 'Live', color: '#4ade80', dot: true },
  wip: { label: 'In Progress', color: '#fbbf24', dot: true }
};

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [direction, setDirection] = useState(0);
  const dragRef = useRef(null);

  const go = (dir) => {
    setDirection(dir);
    setExpanded(false);
    setCurrent((p) => (p + dir + projects.length) % projects.length);
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'Escape') setExpanded(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const project = projects[current];
  const status = statusConfig[project.status];

  const variants = {
    enter: (d) => ({ x: d > 0 ? '60%' : '-60%', opacity: 0, filter: 'blur(8px)' }),
    center: { x: 0, opacity: 1, filter: 'blur(0px)' },
    exit: (d) => ({ x: d < 0 ? '60%' : '-60%', opacity: 0, filter: 'blur(8px)' })
  };

  return (
    <section
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Open Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem 1rem'
      }}
    >
      {/* Background grain */}
      <div style={{
        position: 'fixed', inset: 0, opacity: 0.03, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px'
      }} />

      {/* Ambient glow */}
      <motion.div
        key={current}
        style={{
          position: 'fixed', top: '50%', left: '50%',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none', zIndex: 0
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '900px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', padding: '0 0.5rem' }}>
          <div>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: '#555', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '0.3rem' }}>
              Selected Work
            </div>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: '#333', fontFamily: 'monospace' }}>
              {String(current + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {projects.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setExpanded(false); setCurrent(i); }}
                style={{
                  width: i === current ? '2rem' : '0.5rem',
                  height: '2px',
                  background: i === current ? '#fff' : '#333',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all 0.4s ease'
                }}
                animate={{ width: i === current ? 32 : 8 }}
              />
            ))}
          </div>
        </div>

        {/* Card */}
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = offset.x * velocity.x;
              if (Math.abs(swipe) > 3000) go(swipe < 0 ? 1 : -1);
            }}
          >
            <motion.div
              layout
              style={{
                background: 'linear-gradient(135deg, #111 0%, #0d0d0d 100%)',
                border: '1px solid #1e1e1e',
                borderRadius: '1.5rem',
                padding: expanded ? '2.5rem' : '2.5rem',
                cursor: expanded ? 'default' : 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s ease'
              }}
              whileHover={!expanded ? { borderColor: '#2a2a2a' } : {}}
              onClick={() => !expanded && setExpanded(true)}
            >
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{
                    fontFamily: 'monospace', fontSize: '0.65rem',
                    color: '#333', letterSpacing: '0.1em'
                  }}>
                    {project.number}
                  </span>
                  <span style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                    fontFamily: 'monospace', color: status.color
                  }}>
                    <span style={{
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: status.color,
                      boxShadow: `0 0 6px ${status.color}`
                    }} />
                    {status.label}
                  </span>
                  <span style={{
                    fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                    fontFamily: 'monospace', color: '#444',
                    border: '1px solid #222', borderRadius: '3px', padding: '2px 8px'
                  }}>
                    {project.tag}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {project.url && (
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: '0.4rem 1rem',
                        background: 'transparent',
                        border: '1px solid #2a2a2a',
                        borderRadius: '2rem',
                        color: '#888',
                        fontSize: '0.7rem',
                        fontFamily: 'monospace',
                        letterSpacing: '0.1em',
                        textDecoration: 'none',
                        display: 'flex', alignItems: 'center', gap: '0.3rem'
                      }}
                    >
                      ↗ Visit
                    </motion.a>
                  )}
                  {expanded && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
                      style={{
                        width: '2rem', height: '2rem',
                        background: '#1a1a1a', border: '1px solid #2a2a2a',
                        borderRadius: '50%', color: '#666', fontSize: '1rem',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}
                    >
                      ×
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Title */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h2 style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 300,
                  color: '#fff',
                  margin: 0,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  fontFamily: "'Open Sans', sans-serif"
                }}>
                  {project.title}
                </h2>
                <p style={{
                  fontSize: '0.85rem', color: '#555', marginTop: '0.4rem',
                  fontFamily: 'monospace', letterSpacing: '0.05em'
                }}>
                  {project.subtitle}
                </p>
              </div>

              {/* Summary */}
              <p style={{
                fontSize: '1rem', color: '#888', lineHeight: 1.6,
                fontFamily: "'Open Sans', sans-serif", marginBottom: expanded ? '2rem' : 0
              }}>
                {project.summary}
              </p>

              {/* Expanded content */}
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.35 }}
                  >
                    {/* Divider */}
                    <div style={{ height: '1px', background: '#1e1e1e', marginBottom: '2rem' }} />

                    <p style={{
                      fontSize: '0.9rem', color: '#666', lineHeight: 1.7,
                      fontFamily: "'DM Sans', sans-serif", marginBottom: '2rem'
                    }}>
                      {project.description}
                    </p>

                    {/* Tech */}
                    <div style={{ marginBottom: '2rem' }}>
                      <div style={{
                        fontSize: '0.6rem', letterSpacing: '0.3em', color: '#444',
                        textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '0.75rem'
                      }}>
                        Stack
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {project.tech.map((t, i) => (
                          <span key={i} style={{
                            padding: '0.3rem 0.8rem',
                            border: '1px solid #1e1e1e',
                            borderRadius: '0.25rem',
                            fontSize: '0.72rem',
                            fontFamily: 'monospace',
                            color: '#666',
                            letterSpacing: '0.05em'
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <div style={{
                        fontSize: '0.6rem', letterSpacing: '0.3em', color: '#444',
                        textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '0.75rem'
                      }}>
                        Highlights
                      </div>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                        gap: '0.5rem'
                      }}>
                        {project.highlights.map((h, i) => (
                          <div key={i} style={{
                            display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                            fontSize: '0.82rem', color: '#666',
                            fontFamily: "'Open Sans', sans-serif", lineHeight: 1.5
                          }}>
                            <span style={{ color: '#4ade80', marginTop: '2px', flexShrink: 0 }}>→</span>
                            {h}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Click hint */}
              {!expanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    position: 'absolute', bottom: '1.5rem', right: '1.5rem',
                    fontSize: '0.65rem', color: '#333', fontFamily: 'monospace',
                    letterSpacing: '0.1em'
                  }}
                >
                  click to expand →
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: '2rem', padding: '0 0.5rem'
        }}>
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => go(-1)}
            style={{
              background: 'transparent', border: '1px solid #1e1e1e',
              borderRadius: '0.5rem', color: '#555', padding: '0.6rem 1.25rem',
              fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.1em',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}
          >
            ← prev
          </motion.button>

          <span style={{
            fontFamily: 'monospace', fontSize: '0.65rem',
            color: '#333', letterSpacing: '0.1em'
          }}>
            {project.title}
          </span>

          <motion.button
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => go(1)}
            style={{
              background: 'transparent', border: '1px solid #1e1e1e',
              borderRadius: '0.5rem', color: '#555', padding: '0.6rem 1.25rem',
              fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.1em',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}
          >
            next →
          </motion.button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');
      `}</style>
    </section>
  );
}