import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useReducedMotion, animate } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

// ===== REUSABLE MOTION CONSTANTS =====
export const softSpring = { type: 'spring', stiffness: 200, damping: 30, mass: 1 };
export const quickSpring = { type: 'spring', stiffness: 400, damping: 25, mass: 0.5 };
export const idleSpring = { type: 'spring', stiffness: 50, damping: 20 };

const baseVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: softSpring
  },
  idle: {
    y: [-2, 2, -2],
    transition: { ...idleSpring, duration: 4, repeat: Infinity, repeatType: 'reverse', delay: 1 }
  }
};

// ===== UTILITY COMPONENTS =====

const TextReveal = ({ text, delay = 0, className = '' }) => {
  const reducedMotion = useReducedMotion();
  const chars = text.split('');
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reducedMotion ? 0 : 0.03, delayChildren: delay }
    }
  };
  const charVariants = {
    hidden: { opacity: 0, y: 15, filter: reducedMotion ? 'blur(0px)' : 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: reducedMotion ? { duration: 0 } : softSpring
    }
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {chars.map((char, i) => (
        <motion.span key={i} variants={charVariants} className="inline-block will-change-transform">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const WordReveal = ({ text, delay = 0 }) => {
  const reducedMotion = useReducedMotion();
  const words = text.split(' ');
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reducedMotion ? 0 : 0.05, delayChildren: delay }
    }
  };
  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reducedMotion ? { duration: 0 } : softSpring
    }
  };

  return (
    <motion.span variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} className="inline-block mr-2 will-change-transform">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

const MagneticButton = ({ children, strength = 0.4 }) => {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, quickSpring);
  const sy = useSpring(y, quickSpring);

  const handleMouseMove = (e) => {
    if (reducedMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const dx = (clientX - left - width / 2) / width;
    const dy = (clientY - top - height / 2) / height;
    x.set(dx * 20 * strength);
    y.set(dy * 20 * strength);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: sx, y: sy }}
      className="inline-block will-change-transform"
    >
      {children}
    </motion.div>
  );
};

const TiltCard = ({ children, maxTilt = 10 }) => {
  const reducedMotion = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, quickSpring);
  const sry = useSpring(ry, quickSpring);

  const handleMouseMove = (e) => {
    if (reducedMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const px = (clientX - left) / width - 0.5;
    const py = (clientY - top) / height - 0.5;
    ry.set(px * maxTilt * 2);
    rx.set(py * maxTilt * -2);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ perspective: 1200, rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
};

const NavLink = ({ children, href }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.a
      href={href}
      style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 300, fontSize: '0.7rem', letterSpacing: '0.2em' }}
      className="relative inline-block cursor-pointer text-white uppercase"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      <motion.span
        className="absolute -bottom-1 left-0 right-0 h-px bg-white"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={quickSpring}
        style={{ transformOrigin: 'left' }}
      />
    </motion.a>
  );
};

// ===== MAIN HERO COMPONENT =====
const Hero = ({ profileImage = '/profile.png' }) => {
  const reducedMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const imageRef = useRef(null);
  const isImageInView = useInView(imageRef, { once: true, amount: 0.3 });
  const bgX = useMotionValue(0);

  useEffect(() => {
    if (reducedMotion) return;
    const controls = animate(bgX, [0, 100, 0], { duration: 20, repeat: Infinity, ease: 'linear' });
    return controls.stop;
  }, [reducedMotion, bgX]);

  const menuItems = [
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Skills', href: '/skills' },
  ];

  return (
    <div
      className="h-screen w-screen bg-black text-white overflow-hidden relative flex flex-col"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');
        body { background-color: #000000; color: white; margin: 0; padding: 0; overflow: hidden; }
        ::selection { background: rgba(255, 255, 255, 0.2); }
      `}</style>

      {/* Navigation */}
      <motion.nav
        className="w-full z-50 px-6 lg:px-10 py-4 lg:py-6 flex items-center justify-between flex-shrink-0"
        variants={baseVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {menuItems.map((item) => <NavLink key={item.label} href={item.href}>{item.label}</NavLink>)}
        </div>

        <motion.button
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <motion.span className="w-5 h-0.5 bg-white" animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }} />
          <motion.span className="w-5 h-0.5 bg-white" animate={{ opacity: isMenuOpen ? 0 : 1 }} />
          <motion.span className="w-5 h-0.5 bg-white" animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }} />
        </motion.button>

        <MagneticButton>
          <motion.a
            href="/contact"
            className="hidden md:block px-6 py-2 bg-white text-black rounded-full text-xs uppercase tracking-widest transition-colors hover:bg-gray-200"
            style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 400, letterSpacing: '0.18em' }}
          >
            Let's talk
          </motion.a>
        </MagneticButton>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-40 md:hidden flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {menuItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-3xl"
                style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 300, letterSpacing: '0.15em' }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl w-full">

          {/* Left Content */}
          <motion.div
            className="space-y-6 lg:space-y-8"
            variants={baseVariants}
            initial="hidden"
            animate={['visible', 'idle']}
          >
            <motion.h1
              className="leading-tight"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                letterSpacing: '-0.01em'
              }}
              variants={baseVariants}
            >
              <TextReveal text="Java Fullstack " className="block" />
              <TextReveal text="Developer with AI " delay={0.4} className="block mt-1" />
              <TextReveal text="Integration" delay={0.4} className="block mt-1" />
            </motion.h1>

            <div className="space-y-4 max-w-xl">
              <motion.p
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                  color: '#d1d5db',
                  lineHeight: 1.8
                }}
                variants={baseVariants}
              >
                <WordReveal text="Hands-on experience in building scalable, end-to-end applications using Java, Spring Boot, modern frontend frameworks, and AI integrations." />
              </motion.p>
              <motion.p
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
                  color: '#9ca3af',
                  lineHeight: 1.8
                }}
                variants={baseVariants}
              >
                <WordReveal text="Strong foundation in backend development, RESTful APIs, and cloud-ready architectures. Enhancing expertise in System Design to build high-performance systems." delay={0.3} />
              </motion.p>
            </div>

            <motion.div className="flex gap-4 pt-4" variants={baseVariants}>
              <MagneticButton>
                <motion.a
                  href="/projects"
                  className="px-6 lg:px-8 py-2 bg-white text-black rounded-full uppercase"
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: '0.7rem',
                    letterSpacing: '0.18em'
                  }}
                >
                  View Projects
                </motion.a>
              </MagneticButton>
              <MagneticButton>
                <motion.a
                  href="/about"
                  className="px-6 lg:px-8 py-2 border border-white text-white rounded-full uppercase"
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: '0.7rem',
                    letterSpacing: '0.18em'
                  }}
                >
                  About Me
                </motion.a>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            ref={imageRef}
            className="relative flex justify-center lg:justify-end"
            variants={baseVariants}
            initial="hidden"
            animate={isImageInView ? ['visible', 'idle'] : 'hidden'}
          >
            <TiltCard>
              <motion.div className="relative bg-black rounded-2xl overflow-hidden w-full max-w-xs lg:max-w-sm">
                <div className="aspect-[4/5] relative">
                  <img
                    src={profileImage}
                    alt="Rohit Suthar"
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 lg:bottom-8 left-0 right-0 text-center">
                    <span
                      className="inline-block px-3 py-1 bg-white text-black text-xs uppercase mb-2"
                      style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 400, letterSpacing: '0.15em' }}
                    >
                      AI & Full Stack Learner
                    </span>
                    <h2
                      className="uppercase"
                      style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontWeight: 300,
                        fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                        letterSpacing: '0.2em'
                      }}
                    >
                      Rohit Suthar
                    </h2>
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;