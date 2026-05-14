import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend',
    index: '01',
    skills: [
      { name: 'HTML5',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'CSS3',          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
      { name: 'JavaScript',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'React.js',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Next.js',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
      { name: 'Angular',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg' },
      { name: 'Tailwind CSS',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Material UI',   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg' },
      { name: 'Framer Motion', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    index: '02',
    skills: [
      { name: 'Java',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
      { name: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
      { name: 'Hibernate',   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hibernate/hibernate-original.svg' },
      { name: 'JDBC',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
      { name: 'Python',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'NestJS',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg' },
      { name: 'FastAPI',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
      { name: 'REST APIs',   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
      { name: 'JWT',         logo: 'https://cdn.worldvectorlogo.com/logos/jwt-3.svg' },
      { name: 'OAuth2',      logo: 'https://oauth.net/images/oauth-logo-square.png' },
      { name: 'Maven',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg' },
      { name: 'Gradle',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gradle/gradle-original.svg' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    index: '03',
    skills: [
      { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
      { name: 'MySQL',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'NeonDB',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
      { name: 'Firebase',   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile App',
    index: '04',
    skills: [
      { name: 'React Native', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Expo',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg' },
      { name: 'Android',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg' },
      { name: 'APK Builds',   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-plain.svg' },
      { name: 'Deep Linking', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Push Notif.',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps',
    index: '05',
    skills: [
      { name: 'Docker',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
      { name: 'AWS',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'Linux',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
      { name: 'Bash / CMD',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg' },
      { name: 'PowerShell',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/powershell/powershell-original.svg' },
      { name: 'Networking',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/networkx/networkx-original.svg' },
      { name: 'Render',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/render/render-original.svg' },
      { name: 'Vercel',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg' },
      { name: 'Netlify',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Tools',
    index: '06',
    skills: [
      { name: 'Claude',         logo: 'https://mintlify.s3.us-west-1.amazonaws.com/anthropic/_generated/favicon/apple-touch-icon.png?v=3' },
      { name: 'ChatGPT',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openai/openai-original.svg' },
      { name: 'Grok',           logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twitter/twitter-original.svg' },
      { name: 'Lovable',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Replit',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/replit/replit-original.svg' },
      { name: 'GitHub Copilot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
      { name: 'Git',            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
      { name: 'GitHub',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
      { name: 'Google Colab',   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg' },
      { name: 'Kaggle',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kaggle/kaggle-original.svg' },
      { name: 'HuggingFace',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'Prompt Eng.',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openai/openai-original.svg' },
      { name: 'Vibe Coding',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Firebase',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' },
    ],
  },
];

// ─── SKILL PILL ───────────────────────────────────────────────────────────────

const SkillPill = ({ name, logo }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        padding: '6px 13px',
        border: `1px solid ${hov ? '#ff3333' : 'rgba(255,255,255,0.18)'}`,
        background: hov ? 'rgba(255,51,51,0.10)' : 'rgba(255,255,255,0.03)',
        cursor: 'default',
        transition: 'border-color 0.2s, background 0.2s',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      <img
        src={logo}
        alt=""
        width={14}
        height={14}
        style={{ objectFit: 'contain', opacity: hov ? 1 : 0.7, transition: 'opacity 0.2s', flexShrink: 0 }}
        onError={e => { e.target.style.display = 'none'; }}
      />
      <span style={{
        fontFamily: "'Open Sans', sans-serif",
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        color: hov ? '#fff' : 'rgba(255,255,255,0.82)',
        transition: 'color 0.2s',
      }}>
        {name}
      </span>
    </div>
  );
};

// ─── DESKTOP MIND MAP ─────────────────────────────────────────────────────────

const NODE_W = 134;
const NODE_H = 42;

const DesktopMindMap = () => {
  const wrapRef = useRef(null);
  const [dim, setDim] = useState({ w: 860, h: 600 });
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const measure = () => {
      if (wrapRef.current) {
        const w = Math.min(wrapRef.current.offsetWidth, 900);
        const h = Math.min(wrapRef.current.offsetHeight, Math.round(w * 0.72));
        setDim({ w, h });
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { w, h } = dim;
  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) * 0.36;
  const startAngle = -Math.PI / 2 + Math.PI / CATEGORIES.length;

  const nodes = CATEGORIES.map((cat, i) => {
    const angle = startAngle + (i * 2 * Math.PI) / CATEGORIES.length;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    return { ...cat, x, y, angle };
  });

  const handleNodeClick = (node) => {
    if (activeId === node.id) { setActiveId(null); return; }
    setActiveId(node.id);
  };

  const activeNode = nodes.find(n => n.id === activeId);
  const activeCat = activeNode ? CATEGORIES.find(c => c.id === activeId) : null;

  const PANEL_W = 300;
  const PANEL_OFFSET = NODE_W / 2 + 16;

  return (
    <div
      ref={wrapRef}
      style={{ width: '100%', height: '100%', position: 'relative', userSelect: 'none' }}
    >
      <svg
        width={w}
        height={h}
        style={{ display: 'block', overflow: 'visible', margin: '0 auto' }}
        onClick={e => { if (e.target === e.currentTarget) setActiveId(null); }}
      >
        {/* Connector lines */}
        {nodes.map(node => (
          <line
            key={`line-${node.id}`}
            x1={cx} y1={cy}
            x2={node.x} y2={node.y}
            stroke={activeId === node.id ? '#ff3333' : 'rgba(255,255,255,0.15)'}
            strokeWidth={activeId === node.id ? 1.4 : 0.8}
            strokeDasharray={activeId === node.id ? 'none' : '3 5'}
            style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
          />
        ))}

        {/* Center root */}
        <g>
          <rect
            x={cx - 58} y={cy - 21}
            width={116} height={42}
            rx={2}
            fill="#000"
            stroke="rgba(255,255,255,0.38)"
            strokeWidth={0.9}
          />
          <text
            x={cx} y={cy + 1}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.3em',
              fill: '#fff',
              textTransform: 'uppercase',
            }}
          >
            SKILLS
          </text>
        </g>

        {/* Category nodes */}
        {nodes.map(node => {
          const isActive = activeId === node.id;
          return (
            <g
              key={node.id}
              onClick={() => handleNodeClick(node)}
              style={{ cursor: 'pointer' }}
            >
              {isActive && (
                <rect
                  x={node.x - NODE_W / 2 - 4}
                  y={node.y - NODE_H / 2 - 4}
                  width={NODE_W + 8}
                  height={NODE_H + 8}
                  rx={3}
                  fill="rgba(255,51,51,0.12)"
                  stroke="rgba(255,51,51,0.30)"
                  strokeWidth={0.6}
                />
              )}
              <rect
                x={node.x - NODE_W / 2}
                y={node.y - NODE_H / 2}
                width={NODE_W}
                height={NODE_H}
                rx={2}
                fill={isActive ? 'rgba(255,51,51,0.14)' : 'rgba(6,6,6,0.95)'}
                stroke={isActive ? '#ff3333' : 'rgba(255,255,255,0.26)'}
                strokeWidth={isActive ? 1.0 : 0.7}
                style={{ transition: 'fill 0.25s, stroke 0.25s' }}
              />
              {/* Index */}
              <text
                x={node.x - NODE_W / 2 + 8}
                y={node.y - 6}
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '8px',
                  fontWeight: 400,
                  letterSpacing: '0.08em',
                  fill: '#ff3333',
                }}
              >
                {node.index}
              </text>
              {/* Label */}
              <text
                x={node.x}
                y={node.y + 6}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '11px',
                  fontWeight: isActive ? 500 : 400,
                  letterSpacing: '0.17em',
                  textTransform: 'uppercase',
                  fill: isActive ? '#fff' : 'rgba(255,255,255,0.82)',
                  transition: 'fill 0.25s',
                }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating skill panel */}
      {activeCat && activeNode && (() => {
        const flip = activeNode.x > cx;
        let left = flip
          ? activeNode.x - NODE_W / 2 - PANEL_OFFSET - PANEL_W
          : activeNode.x + NODE_W / 2 + PANEL_OFFSET;
        left = Math.max(8, Math.min(w - PANEL_W - 8, left));
        const top = Math.max(8, activeNode.y - 52);

        return (
          <div
            style={{
              position: 'absolute',
              top,
              left,
              width: PANEL_W,
              background: 'rgba(6,6,6,0.97)',
              border: '1px solid rgba(255,51,51,0.35)',
              padding: '16px 15px',
              zIndex: 20,
              pointerEvents: 'none',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
            }}
          >
            <div style={{
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#ff3333',
              marginBottom: '12px',
              fontFamily: "'Open Sans', sans-serif",
            }}>
              {activeCat.index} — {activeCat.label}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {activeCat.skills.map(sk => (
                <SkillPill key={sk.name} {...sk} />
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
};

// ─── MOBILE MIND MAP ──────────────────────────────────────────────────────────

const MobileMindMap = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    <div style={{ width: '100%', overflowY: 'auto', maxHeight: 'calc(100vh - 160px)' }}>
      {/* Root node */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          padding: '10px 28px',
          border: '1px solid rgba(255,255,255,0.35)',
          fontFamily: "'Open Sans', sans-serif",
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#fff',
        }}>
          SKILLS
        </div>
        <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.18)' }} />
      </div>

      {/* Category list */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 0 }}>
        {CATEGORIES.map((cat, i) => {
          const isActive = activeId === cat.id;
          const isLast = i === CATEGORIES.length - 1;
          return (
            <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Branch row */}
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <div style={{
                  flex: 1, height: '1px',
                  background: isActive ? 'rgba(255,51,51,0.4)' : 'rgba(255,255,255,0.10)',
                  transition: 'background 0.25s',
                }} />
                <div style={{
                  width: '5px', height: '5px', borderRadius: '50%',
                  background: isActive ? '#ff3333' : 'rgba(255,255,255,0.28)',
                  flexShrink: 0, transition: 'background 0.25s',
                }} />
                <div style={{
                  flex: 1, height: '1px',
                  background: isActive ? 'rgba(255,51,51,0.4)' : 'rgba(255,255,255,0.10)',
                  transition: 'background 0.25s',
                }} />
              </div>

              {/* Category header */}
              <div
                onClick={() => setActiveId(isActive ? null : cat.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '13px 18px',
                  border: `1px solid ${isActive ? '#ff3333' : 'rgba(255,255,255,0.13)'}`,
                  background: isActive ? 'rgba(255,51,51,0.06)' : 'transparent',
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'border-color 0.2s, background 0.2s',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '11px' }}>
                  <span style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '10px',
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    color: '#ff3333',
                  }}>
                    {cat.index}
                  </span>
                  <span style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '13px',
                    fontWeight: 400,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.82)',
                    transition: 'color 0.2s',
                  }}>
                    {cat.label}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                  <span style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.06em',
                  }}>
                    {cat.skills.length}
                  </span>
                  <div style={{ position: 'relative', width: '14px', height: '14px', flexShrink: 0 }}>
                    <span style={{
                      position: 'absolute', top: '50%', left: 0, right: 0,
                      height: '1px', background: isActive ? '#ff3333' : 'rgba(255,255,255,0.6)',
                      transform: 'translateY(-50%)', transition: 'background 0.2s',
                    }} />
                    <span style={{
                      position: 'absolute', top: 0, bottom: 0, left: '50%',
                      width: '1px', background: isActive ? '#ff3333' : 'rgba(255,255,255,0.6)',
                      transform: 'translateX(-50%)',
                      opacity: isActive ? 0 : 1,
                      transition: 'opacity 0.25s, background 0.2s',
                    }} />
                  </div>
                </div>
              </div>

              {/* Skills panel */}
              <div style={{
                width: '100%',
                maxHeight: isActive ? '600px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1)',
              }}>
                <div style={{
                  display: 'flex', flexWrap: 'wrap', gap: '7px',
                  padding: '13px 15px 18px',
                  borderLeft: '1px solid rgba(255,51,51,0.22)',
                  borderRight: '1px solid rgba(255,51,51,0.22)',
                  borderBottom: '1px solid rgba(255,51,51,0.15)',
                  background: 'rgba(255,51,51,0.02)',
                }}>
                  {cat.skills.map(sk => (
                    <SkillPill key={sk.name} {...sk} />
                  ))}
                </div>
              </div>

              {!isLast && (
                <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.12)' }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

const Skills = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    // Trigger visible immediately since the component fills the viewport
    setVisible(true);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: "'Open Sans', sans-serif",
        overflow: 'hidden',           // ← no scroll
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Helmet>
        <title>Skills | Rohit Suthar</title>
        <meta name="description" content="Technical skills and tools Rohit Suthar works with — Java, Spring Boot, React, AI tools and more." />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@200;300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; padding: 0; background: #000; overflow: hidden; }
        ::selection { background: rgba(255,51,51,0.25); }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #1e1e1e; border-radius: 2px; }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Inner container ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: isMobile ? '100%' : '1060px',
        width: '100%',
        margin: '0 auto',
        padding: isMobile ? '18px 16px 24px' : '36px 32px 28px',
        minHeight: 0,
      }}>

        {/* Back link */}
        <a
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: isMobile ? '20px' : '28px',
            color: 'rgba(255,255,255,0.45)',
            textDecoration: 'none',
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 400,
            transition: 'color 0.2s',
            flexShrink: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2.5L4.5 7L9 11.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </a>

        {/* Page header */}
        <div style={{
          marginBottom: isMobile ? '20px' : '28px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          flexShrink: 0,
        }}>
          <h1 style={{
            fontSize: isMobile ? 'clamp(26px, 10vw, 42px)' : 'clamp(32px, 4.5vw, 54px)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            margin: 0,
            color: '#fff',
          }}>
            Tap on the 
            <span style={{ color: '#ff3333' }}> blocks</span> to see skills.
          </h1>
          <div style={{
            marginTop: '14px',
            width: '30px',
            height: '1px',
            background: '#ff3333',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.22s',
          }} />
        </div>

        {/* Mind map — takes all remaining vertical space */}
        <div style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          alignItems: 'center',      // ← vertically center
          justifyContent: 'center',  // ← horizontally center
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s',
        }}>
          {isMobile ? <MobileMindMap /> : <DesktopMindMap />}
        </div>

      </div>
    </div>
  );
};

export default Skills;