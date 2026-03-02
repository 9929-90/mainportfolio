import { useEffect, useRef, useState } from 'react';

const Skills = () => {
  const scrollRefs = useRef([]);
  const positions = useRef([0, 0, 0, 0, 0]);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const columnRefs = useRef([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isPaused = useRef([false, false, false, false, false]);
  const speeds = useRef([0.7, 0.77, 0.84, 0.7, 0.77]);

  const categories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
        { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
        { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
        { name: 'React.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
        { name: 'React Native + Expo', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
        { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'Material UI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg' }
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
        { name: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
        { name: 'Hibernate', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hibernate/hibernate-original.svg' },
        { name: 'REST APIs', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
        { name: 'NestJS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg' },
        { name: 'JWT', logo: 'https://cdn.worldvectorlogo.com/logos/jwt-3.svg' },
        { name: 'OAuth2', logo: 'https://oauth.net/images/oauth-logo-square.png' }
      ]
    },
    {
      title: 'Database',
      skills: [
        { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
        { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' }
      ]
    },
    {
      title: 'DevOps & Tools',
      skills: [
        { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
        { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
        { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
        { name: 'System Designing', logo: '/monitor.png' },
        { name: 'Replit', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/replit/replit-original.svg' },
        { name: 'Lovable', logo: '/Lovable.svg' }
      ]
    },
    {
      title: 'AI & Platforms',
      skills: [
        { name: 'Claude', logo: 'https://mintlify.s3.us-west-1.amazonaws.com/anthropic/_generated/favicon/apple-touch-icon.png?v=3' },
        { name: 'ChatGPT', logo: '/chatgpt.svg' },
        { name: 'Grok', logo: '/grok.svg' },
        { name: 'Google AI Studio', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg' },
        { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' }
      ]
    }
  ];

  const doubledSkills = categories.map(cat => [...cat.skills, ...cat.skills]);
  const iconSize = 48;
  const itemHeight = 90;

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            if (titleRef.current) {
              titleRef.current.style.opacity = '1';
              titleRef.current.style.transform = 'translate3d(0, 0, 0)';
            }

            columnRefs.current.forEach((col, i) => {
              if (col) {
                setTimeout(() => {
                  col.style.opacity = '1';
                  col.style.transform = 'translate3d(0, 0, 0)';
                }, i * 100);
              }
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    const animate = () => {
      categories.forEach((_, index) => {
        if (!isPaused.current[index]) {
          positions.current[index] -= speeds.current[index];
          if (Math.abs(positions.current[index]) >= categories[index].skills.length * itemHeight) {
            positions.current[index] = 0;
          }
        }
        if (scrollRefs.current[index]) {
          scrollRefs.current[index].style.transform = `translate3d(0, ${positions.current[index]}px, 0)`;
        }
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, []);

  const handleColumnMouseEnter = (index) => { isPaused.current[index] = true; };
  const handleColumnMouseLeave = (index) => { isPaused.current[index] = false; };

  return (
    <div ref={containerRef} style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      fontFamily: "'Open Sans', sans-serif",
      color: '#ffffff'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');

        body { background-color: #000000; color: white; margin: 0; padding: 0; overflow: hidden; }
        ::selection { background: rgba(255, 255, 255, 0.2); }

        .skill-title {
          opacity: 0;
          transform: translate3d(0, 40px, 0);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity, transform;
        }

        .skill-column {
          opacity: 0;
          transform: translate3d(0, 40px, 0);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity, transform;
        }

        .skill-scroll-container {
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
        }

        .skill-item {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        .skill-item:hover {
          transform: scale(1.12);
        }

        .skill-item img {
          transition: filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .skill-item:hover img {
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
        }

        .skill-item.grok-icon:hover img {
          filter: invert(1) drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
        }

        .skill-item span {
          transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      text-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .skill-item:hover span {
          color: #ffffff;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        .scroll-wrapper {
          will-change: transform;
          backface-visibility: hidden;
        }
      `}</style>

      <h1
        ref={titleRef}
        className="skill-title"
        style={{
          fontSize: '52px',
          fontWeight: '300',
          letterSpacing: '6px',
          marginBottom: '50px',
          color: '#ffffff',
          fontFamily: "'Open Sans', sans-serif",
          textTransform: 'uppercase'
        }}
      >
        Capabilities
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '20px',
        width: '95%',
        maxWidth: '1300px',
        height: '380px',
        padding: '0 20px'
      }}>
        {categories.map((category, index) => (
          <div
            key={index}
            ref={el => columnRefs.current[index] = el}
            className="skill-column"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            onMouseEnter={() => handleColumnMouseEnter(index)}
            onMouseLeave={() => handleColumnMouseLeave(index)}
          >
            <h2 style={{
              fontSize: '13px',
              fontWeight: '600',
              marginBottom: '24px',
              letterSpacing: '3px',
              color: '#ff3333',
              textTransform: 'uppercase',
              fontFamily: "'Open Sans', sans-serif"
            }}>
              {category.title}
            </h2>

            <div
              className="skill-scroll-container"
              style={{
                height: `${itemHeight * 4.2}px`,
                overflow: 'hidden',
                position: 'relative',
                width: '100%'
              }}
            >
              <div
                ref={el => scrollRefs.current[index] = el}
                className="scroll-wrapper"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                {doubledSkills[index].map((skill, i) => (
                  <div
                    key={i}
                    className={`skill-item ${skill.name === 'Grok' ? 'grok-icon' : ''}`}
                    style={{
                      height: `${itemHeight}px`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      style={{
                        width: `${iconSize}px`,
                        height: `${iconSize}px`,
                        objectFit: 'contain',
                        filter: skill.name === 'Grok' ? 'invert(1)' : 'none'
                      }}
                      onError={(e) => { e.target.style.opacity = '0.3'; }}
                    />
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '300',
                      letterSpacing: '0.5px',
                      color: '#bbbbbb',
                      textAlign: 'center',
                      fontFamily: "'Open Sans', sans-serif"
                    }}>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;