import { useEffect, useRef, useState } from 'react';

const categories = [
  {
    title: 'Frontend',
    index: '01',
    skills: [
      { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
      { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'React.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'React Native', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Material UI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg' },
    ]
  },
  {
    title: 'Backend',
    index: '02',
    skills: [
      { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
      { name: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
      { name: 'Hibernate', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hibernate/hibernate-original.svg' },
      { name: 'REST APIs', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
      { name: 'NestJS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg' },
      { name: 'JWT', logo: 'https://cdn.worldvectorlogo.com/logos/jwt-3.svg' },
      { name: 'OAuth2', logo: 'https://oauth.net/images/oauth-logo-square.png' },
    ]
  },
  {
    title: 'Database',
    index: '03',
    skills: [
      { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
    ]
  },
  {
    title: 'DevOps & Tools',
    index: '04',
    skills: [
      { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
      { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
      { name: 'System Design', logo: '/monitor.png' },
      { name: 'Replit', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/replit/replit-original.svg' },
      { name: 'Lovable', logo: '/Lovable.svg' },
    ]
  },
  {
    title: 'AI & Platforms',
    index: '05',
    skills: [
      { name: 'Claude', logo: 'https://mintlify.s3.us-west-1.amazonaws.com/anthropic/_generated/favicon/apple-touch-icon.png?v=3' },
      { name: 'ChatGPT', logo: '/chatgpt.svg' },
      { name: 'Grok', logo: '/grok.svg', invert: true },
      { name: 'Google AI Studio', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg' },
      { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' },
    ]
  },
];

const SkillPill = ({ skill, visible, delay }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        border: hovered ? '1px solid #ff3333' : '1px solid rgba(255,255,255,0.15)',
        borderRadius: '2px',
        cursor: 'default',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, border-color 0.25s ease, background 0.25s ease`,
        background: hovered ? 'rgba(255,51,51,0.06)' : 'transparent',
        whiteSpace: 'nowrap',
      }}
    >
      <img
        src={skill.logo}
        alt={skill.name}
        style={{
          width: '16px',
          height: '16px',
          objectFit: 'contain',
          filter: skill.invert ? 'invert(1)' : 'none',
          opacity: hovered ? 1 : 0.7,
          transition: 'opacity 0.25s ease',
          flexShrink: 0,
        }}
        onError={e => { e.target.style.display = 'none'; }}
      />
      <span style={{
        fontSize: '11px',
        fontWeight: '400',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: hovered ? '#ffffff' : '#999999',
        transition: 'color 0.25s ease',
        fontFamily: "'Open Sans', sans-serif",
      }}>
        {skill.name}
      </span>
    </div>
  );
};

const CategoryRow = ({ category, visible, rowDelay }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '0',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${rowDelay}ms, transform 0.6s ease ${rowDelay}ms`,
      }}
    >
      {/* Row header */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 0',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: '300',
            color: '#ff3333',
            letterSpacing: '0.15em',
            fontFamily: "'Open Sans', sans-serif",
          }}>
            {category.index}
          </span>
          <h2 style={{
            fontSize: 'clamp(20px, 3vw, 28px)',
            fontWeight: '300',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#ffffff',
            fontFamily: "'Open Sans', sans-serif",
            margin: 0,
          }}>
            {category.title}
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{
            fontSize: '11px',
            color: '#555555',
            letterSpacing: '0.1em',
            fontFamily: "'Open Sans', sans-serif",
          }}>
            {category.skills.length} skills
          </span>
          {/* Plus/minus toggle */}
          <div style={{
            width: '24px',
            height: '24px',
            position: 'relative',
            flexShrink: 0,
          }}>
            <span style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '1px',
              background: '#ffffff',
              transform: 'translateY(-50%)',
              transition: 'opacity 0.3s ease',
            }} />
            <span style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              width: '1px',
              background: '#ffffff',
              transform: 'translateX(-50%)',
              opacity: expanded ? 0 : 1,
              transition: 'opacity 0.3s ease',
            }} />
          </div>
        </div>
      </div>

      {/* Skills panel */}
      <div style={{
        maxHeight: expanded ? '300px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          paddingBottom: '24px',
          paddingLeft: '36px',
        }}>
          {category.skills.map((skill, i) => (
            <SkillPill
              key={skill.name}
              skill={skill}
              visible={expanded}
              delay={i * 40}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Open Sans', sans-serif",
        color: '#ffffff',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; background: #000; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
      `}</style>

      <div style={{
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto',
        padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 40px)',
      }}>

        {/* Back button */}
        <a
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '60px',
            color: '#555555',
            textDecoration: 'none',
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: "'Open Sans', sans-serif",
            fontWeight: '400',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
          onMouseLeave={e => e.currentTarget.style.color = '#555555'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </a>

        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{
            fontSize: '11px',
            letterSpacing: '0.25em',
            color: '#ff3333',
            textTransform: 'uppercase',
            marginBottom: '16px',
            fontWeight: '400',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}>
            Technical Stack
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 7vw, 72px)',
            fontWeight: '300',
            letterSpacing: '-0.01em',
            lineHeight: 1.05,
            margin: 0,
            color: '#ffffff',
            fontFamily: "'Open Sans', sans-serif",
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
          }}>
            What I<br />
            <span style={{ color: '#ff3333' }}>work</span> with
          </h1>

          <div style={{
            marginTop: '24px',
            width: '40px',
            height: '1px',
            background: '#ff3333',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.3s',
          }} />
        </div>

        {/* Category Accordion rows */}
        <div>
          {categories.map((cat, i) => (
            <CategoryRow
              key={cat.index}
              category={cat}
              visible={visible}
              rowDelay={200 + i * 80}
            />
          ))}
          {/* Bottom border */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            opacity: visible ? 1 : 0,
            transition: `opacity 0.6s ease ${200 + categories.length * 80}ms`,
          }} />
        </div>

        {/* Footer note */}
        <p style={{
          marginTop: '48px',
          fontSize: '11px',
          color: '#333333',
          letterSpacing: '0.1em',
          fontFamily: "'Open Sans', sans-serif",
          fontWeight: '300',
          opacity: visible ? 1 : 0,
          transition: `opacity 0.6s ease ${400 + categories.length * 80}ms`,
        }}>
          Click any category to expand skills
        </p>

      </div>
    </div>
  );
};

export default Skills;