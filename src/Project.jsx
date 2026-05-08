import { useState } from 'react';
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
    summary: 'Production-grade real-time computer vision platform for object detection, tracking, and intelligent alerting',
    description: 'Built a production-grade real-time computer vision surveillance system using Python, FastAPI, YOLOv8, and PostgreSQL. Supports up to 16 concurrent RTSP/webcam streams with persistent object tracking, configurable alert zones, and a full REST API.',
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
  },
  {
  "id": 6,
  "number": "06",
  "status": "live",
  "title": "Pinora",
  "subtitle": "Secure Credentials Vault App",
  "summary": "Secure credential manager with JWT authentication and vault-based password protection built for safe and fast access to stored secrets",
  "description": "Built a full-stack secure credentials vault application using Spring Boot and React Native (Expo). The system implements JWT-based authentication with a vault PIN layer for protected access to stored passwords. Users can securely store credentials with labels, access them through a vault authentication flow, and instantly reveal and copy passwords when needed.",
  "url": "https://pinorabyrohit.netlify.app/",
  "tech": ["Spring Boot", "React Native", "Expo", "JWT", "REST APIs", "PostgreSQL", "Node-style Async API Design"],
  "highlights": [
    "JWT-based authentication system for secure user sessions",
    "Vault PIN protection layer for sensitive credential access",
    "Store and manage credentials with custom labels",
    "Secure retrieval flow: Enter vault PIN → decrypt and access data",
    "One-click copy functionality for passwords",
    "RESTful backend APIs built with Spring Boot",
    "Cross-platform mobile app built using React Native (Expo)",
    "Clean separation of auth layer and vault data access logic",
    "Optimized UX flow for fast credential retrieval"
  ],
  "tag": "Full Stack / Security"
}
];

const statusConfig = {
  live: { label: 'Live', color: '#4ade80' },
  wip: { label: 'Not Deployed', color: '#fbbf24' }
};

export default function Projects() {
  const [selected, setSelected] = useState(null);

  const project = selected !== null ? projects[selected] : null;
  const status = statusConfig?.[project?.status] ?? {
  label: 'Unknown',
  color: '#888'
};

  return (
    <section
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: "'Open Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem 1.5rem 3rem',
        boxSizing: 'border-box'
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
        style={{
          position: 'fixed', top: '50%', left: '50%',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none', zIndex: 0
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Page content */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1200px' }}>

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
            marginBottom: '2.5rem',
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

        {/* Section header */}
        <div style={{ marginBottom: '2rem', padding: '0 0.25rem' }}>
          <div style={{
            fontSize: '0.8rem', letterSpacing: '0.3em',
            color: '#aaa', textTransform: 'uppercase',
            fontFamily: 'monospace', marginBottom: '0.3rem'
          }}>
            Selected Work
          </div>
          <div style={{ fontSize: '0.8rem', letterSpacing: '0.15em', color: '#888', fontFamily: 'monospace' }}>
            {String(projects.length).padStart(2, '0')} Projects — click any card to expand
          </div>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1rem',
            filter: selected !== null ? 'blur(6px) brightness(0.4)' : 'none',
            transition: 'filter 0.35s ease',
            pointerEvents: selected !== null ? 'none' : 'auto'
          }}
        >
          {projects.map((proj, i) => {
            const st = statusConfig[proj.status] || {
  label: 'Unknown',
  color: '#888'
};
            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ borderColor: '#3a3a3a', y: -3 }}
                onClick={() => setSelected(i)}
                style={{
                  background: 'linear-gradient(135deg, #111 0%, #0d0d0d 100%)',
                  border: '1px solid #2a2a2a',
                  borderRadius: '1.25rem',
                  padding: '1.75rem',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s ease, transform 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  minHeight: '220px'
                }}
              >
                {/* Top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#666', letterSpacing: '0.1em' }}>
                      {proj.number}
                    </span>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '0.35rem',
                      fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                      fontFamily: 'monospace', color: st.color
                    }}>
                      <span style={{
                        width: '5px', height: '5px', borderRadius: '50%',
                        background: st.color, boxShadow: `0 0 5px ${st.color}`
                      }} />
                      {st.label}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                    fontFamily: 'monospace', color: '#aaa',
                    border: '1px solid #3a3a3a', borderRadius: '3px', padding: '2px 8px'
                  }}>
                    {proj.tag}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h2 style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    fontWeight: 300,
                    color: '#ffffff',
                    margin: 0,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    fontFamily: "'Open Sans', sans-serif"
                  }}>
                    {proj.title}
                  </h2>
                  <p style={{
                    fontSize: '0.82rem', color: '#777', marginTop: '0.35rem',
                    fontFamily: 'monospace', letterSpacing: '0.04em'
                  }}>
                    {proj.subtitle}
                  </p>
                </div>

                {/* Summary */}
                <p style={{
                  fontSize: '0.92rem', color: '#aaa', lineHeight: 1.65,
                  fontFamily: "'Open Sans', sans-serif",
                  margin: 0,
                  flexGrow: 1
                }}>
                  {proj.summary}
                </p>

                {/* Tech pills preview */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: 'auto' }}>
                  {proj.tech.slice(0, 4).map((t, idx) => (
                    <span key={idx} style={{
                      padding: '0.2rem 0.65rem',
                      border: '1px solid #2a2a2a',
                      borderRadius: '0.2rem',
                      fontSize: '0.7rem',
                      fontFamily: 'monospace',
                      color: '#888',
                      letterSpacing: '0.04em'
                    }}>
                      {t}
                    </span>
                  ))}
                  {proj.tech.length > 4 && (
                    <span style={{
                      padding: '0.2rem 0.65rem',
                      fontSize: '0.7rem',
                      fontFamily: 'monospace',
                      color: '#555',
                      letterSpacing: '0.04em'
                    }}>
                      +{proj.tech.length - 4} more
                    </span>
                  )}
                </div>

                {/* Expand hint */}
                <div style={{
                  position: 'absolute', bottom: '1.25rem', right: '1.25rem',
                  fontSize: '0.7rem', color: '#555', fontFamily: 'monospace',
                  letterSpacing: '0.1em'
                }}>
                  click to expand →
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Expanded modal overlay */}
      <AnimatePresence>
        {selected !== null && project && (
          <>
            {/* Backdrop click to close */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelected(null)}
              style={{
                position: 'fixed', inset: 0, zIndex: 10,
                cursor: 'pointer'
              }}
            />

            {/* Modal card */}
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}
            >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                pointerEvents: 'auto',
                width: 'min(780px, 92vw)',
                maxHeight: '85vh',
                overflowY: 'auto',
                background: 'linear-gradient(135deg, #131313 0%, #0e0e0e 100%)',
                border: '1px solid #333',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                boxShadow: '0 40px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04)',
                scrollbarWidth: 'thin',
                scrollbarColor: '#2a2a2a transparent'
              }}
            >
              {/* Modal top row */}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start', marginBottom: '1.5rem',
                flexWrap: 'wrap', gap: '0.75rem'
              }}>
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
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setSelected(null)}
                    style={{
                      width: '2.2rem', height: '2.2rem',
                      background: '#1a1a1a', border: '1px solid #444',
                      borderRadius: '50%', color: '#ccc', fontSize: '1.1rem',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                  >
                    ×
                  </motion.button>
                </div>
              </div>

              {/* Title */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h2 style={{
                  fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
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

              {/* Divider */}
              <div style={{ height: '1px', background: '#2a2a2a', marginBottom: '1.75rem' }} />

              {/* Description */}
              <p style={{
                fontSize: '1rem', color: '#ccc', lineHeight: 1.8,
                fontFamily: "'Open Sans', sans-serif", marginBottom: '2rem'
              }}>
                {project.description}
              </p>

              {/* Tech stack */}
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

              {/* Prev / Next nav inside modal */}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginTop: '2.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid #1e1e1e'
              }}>
                <motion.button
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelected((selected - 1 + projects.length) % projects.length)}
                  style={{
                    background: 'transparent', border: '1px solid #333',
                    borderRadius: '0.5rem', color: '#ccc', padding: '0.55rem 1.2rem',
                    fontFamily: 'monospace', fontSize: '0.82rem', letterSpacing: '0.1em',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'
                  }}
                >
                  ← prev
                </motion.button>
                <span style={{
                  fontFamily: 'monospace', fontSize: '0.78rem',
                  color: '#555', letterSpacing: '0.1em'
                }}>
                  {String(selected + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
                <motion.button
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelected((selected + 1) % projects.length)}
                  style={{
                    background: 'transparent', border: '1px solid #333',
                    borderRadius: '0.5rem', color: '#ccc', padding: '0.55rem 1.2rem',
                    fontFamily: 'monospace', fontSize: '0.82rem', letterSpacing: '0.1em',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'
                  }}
                >
                  next →
                </motion.button>
              </div>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');
        * { box-sizing: border-box; }
      `}</style>
    </section>
  );
}