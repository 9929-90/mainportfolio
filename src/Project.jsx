import { useState, useEffect } from 'react';
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
    title: 'SQLPilot',
    subtitle: 'AI SQL Query Generator',
    summary: 'AI-powered platform that converts natural language into SQL queries with execution support',
    description: 'Built and deployed a full-stack AI SQL query generation platform using Spring Boot 3.4.5 (Java 21), React 18 (Vite), PostgreSQL (Neon), and Redis. Deployed via Docker → GitHub → Render (backend) + Netlify (frontend).',
    url: 'https://sqlpilott.netlify.app',
    tech: ['Java 21', 'Spring Boot 3.4.5', 'React 18', 'Vite', 'PostgreSQL', 'Redis', 'Gemini AI', 'Docker', 'JWT'],
    highlights: [
      'JWT auth with BCrypt & role-based access (USER / ADMIN)',
      'Project & DB schema management with JSON upload',
      'Visual table preview for uploaded schemas',
      'Natural language → Gemini AI → SQL with explanation',
      'Auto LIMIT 100 & blocks destructive queries',
      'Execute SQL against connected DB with table results',
      'Paginated query history with expandable SQL view',
      'Admin dashboard with area/bar/pie charts & user management'
    ],
    tag: 'AI Full-Stack'
  },
  {
    id: 3,
    number: '03',
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
    id: 4,
    number: '04',
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
    id: 5,
    number: '05',
    status: 'wip',
    title: 'DeepVision AI',
    subtitle: 'AI-Powered Surveillance Platform',
    summary: 'Production-grade real-time computer vision platform for object detection, tracking, and intelligent alerting across multiple camera streams',
    description: 'Built a production-grade real-time computer vision surveillance system using Python, FastAPI, YOLOv8, and PostgreSQL. Supports up to 16 concurrent RTSP/webcam streams with persistent object tracking, configurable alert zones, and a full REST API. Deployable via Docker with optional GPU acceleration (CUDA 12.1).',
    url: null,
    tech: ['Python', 'FastAPI', 'YOLOv8', 'PostgreSQL', 'Redis', 'Docker', 'CUDA', 'Prometheus', 'Grafana', 'SQLAlchemy'],
    highlights: [
      'Up to 16 concurrent RTSP / webcam streams',
      'YOLOv8 object detection — 80 classes',
      'SORT tracking with Kalman filter + Hungarian algorithm',
      'Intrusion zones, people counting & loitering detection',
      'Email (SMTP) + Webhook alerts with retry & cooldown',
      'FastAPI async REST API with OpenAPI docs',
      'Server-Sent Events + MJPEG live debug streams',
      'Redis pub/sub result caching & rate-limiting',
      'Prometheus metrics + Grafana dashboards',
      'Multi-stage Docker build with GPU support',
      'Kubernetes-ready with liveness & readiness probes',
      'Frame skip, batch inference & class filtering for perf tuning'
    ],
    tag: 'AI / CV'
  }
];

const statusConfig = {
  live: { label: 'Live', color: '#4ade80', dot: true },
  wip: { label: 'Not Deployed', color: '#fbbf24', dot: true }
};

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [direction, setDirection] = useState(0);

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

        {/* Back button */}
        <motion.a
          href="/"
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            marginBottom: '1.75rem',
            padding: '0.5rem 1.1rem',
            background: 'transparent',
            border: '1px solid #2a2a2a',
            borderRadius: '0.5rem',
            color: '#ccc',
            fontSize: '0.85rem',
            fontFamily: 'monospace',
            letterSpacing: '0.08em',
            textDecoration: 'none',
            cursor: 'pointer'
          }}
        >
          ← Back to Home
        </motion.a>

        {/* Notice banner */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            marginBottom: '2rem',
            padding: '0.9rem 1.25rem',
            background: 'rgba(251, 191, 36, 0.06)',
            border: '1px solid rgba(251, 191, 36, 0.25)',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
          }}
        >
          <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>⚠️</span>
          <p style={{
            margin: 0,
            fontSize: '0.88rem',
            color: '#d4a843',
            fontFamily: "'Open Sans', sans-serif",
            lineHeight: 1.6
          }}>
            <strong style={{ color: '#fbbf24' }}>Heads up!</strong> The backend servers for live projects are hosted on Render's free tier, which spins down after inactivity. They may take <strong style={{ color: '#fbbf24' }}>5 - 10 minutes to cold-start</strong> on first load — please be patient. Additionally, <strong style={{ color: '#fbbf24' }}>DeepVision AI</strong> is currently not deployed yet.
          </p>
        </motion.div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', padding: '0 0.5rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', letterSpacing: '0.3em', color: '#aaa', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '0.3rem' }}>
              Selected Work
            </div>
            <div style={{ fontSize: '0.8rem', letterSpacing: '0.15em', color: '#888', fontFamily: 'monospace' }}>
              {String(current + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {projects.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setExpanded(false); setCurrent(i); }}
                style={{
                  height: '2px',
                  background: i === current ? '#fff' : '#444',
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
                border: '1px solid #2a2a2a',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                cursor: expanded ? 'default' : 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s ease'
              }}
              whileHover={!expanded ? { borderColor: '#3a3a3a' } : {}}
              onClick={() => !expanded && setExpanded(true)}
            >
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#888', letterSpacing: '0.1em' }}>
                    {project.number}
                  </span>
                  <span style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                    fontFamily: 'monospace', color: status.color
                  }}>
                    <span style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: status.color, boxShadow: `0 0 6px ${status.color}`
                    }} />
                    {status.label}
                  </span>
                  <span style={{
                    fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                    fontFamily: 'monospace', color: '#aaa',
                    border: '1px solid #444', borderRadius: '3px', padding: '3px 10px'
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
                        padding: '0.45rem 1.1rem',
                        background: 'transparent',
                        border: '1px solid #444',
                        borderRadius: '2rem',
                        color: '#ccc',
                        fontSize: '0.8rem',
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
                        width: '2.2rem', height: '2.2rem',
                        background: '#1a1a1a', border: '1px solid #444',
                        borderRadius: '50%', color: '#ccc', fontSize: '1.1rem',
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
                  fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                  fontWeight: 300,
                  color: '#ffffff',
                  margin: 0,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  fontFamily: "'Open Sans', sans-serif"
                }}>
                  {project.title}
                </h2>
                <p style={{
                  fontSize: '1rem', color: '#aaa', marginTop: '0.5rem',
                  fontFamily: 'monospace', letterSpacing: '0.05em'
                }}>
                  {project.subtitle}
                </p>
              </div>

              {/* Summary */}
              <p style={{
                fontSize: '1.05rem', color: '#ccc', lineHeight: 1.7,
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
                    <div style={{ height: '1px', background: '#2a2a2a', marginBottom: '2rem' }} />

                    <p style={{
                      fontSize: '1rem', color: '#ccc', lineHeight: 1.8,
                      fontFamily: "'Open Sans', sans-serif", marginBottom: '2rem'
                    }}>
                      {project.description}
                    </p>

                    {/* Tech */}
                    <div style={{ marginBottom: '2rem' }}>
                      <div style={{
                        fontSize: '0.7rem', letterSpacing: '0.3em', color: '#999',
                        textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '0.75rem'
                      }}>
                        Stack
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {project.tech.map((t, i) => (
                          <span key={i} style={{
                            padding: '0.35rem 0.9rem',
                            border: '1px solid #333',
                            borderRadius: '0.25rem',
                            fontSize: '0.8rem',
                            fontFamily: 'monospace',
                            color: '#ddd',
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
                        fontSize: '0.7rem', letterSpacing: '0.3em', color: '#999',
                        textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '0.75rem'
                      }}>
                        Highlights
                      </div>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                        gap: '0.6rem'
                      }}>
                        {project.highlights.map((h, i) => (
                          <div key={i} style={{
                            display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                            fontSize: '0.92rem', color: '#ccc',
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
                    fontSize: '0.75rem', color: '#888', fontFamily: 'monospace',
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
              background: 'transparent', border: '1px solid #333',
              borderRadius: '0.5rem', color: '#ccc', padding: '0.65rem 1.4rem',
              fontFamily: 'monospace', fontSize: '0.85rem', letterSpacing: '0.1em',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}
          >
            ← prev
          </motion.button>

          <span style={{
            fontFamily: 'monospace', fontSize: '0.8rem',
            color: '#aaa', letterSpacing: '0.1em'
          }}>
            {project.title}
          </span>

          <motion.button
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => go(1)}
            style={{
              background: 'transparent', border: '1px solid #333',
              borderRadius: '0.5rem', color: '#ccc', padding: '0.65rem 1.4rem',
              fontFamily: 'monospace', fontSize: '0.85rem', letterSpacing: '0.1em',
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