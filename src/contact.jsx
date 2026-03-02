import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Phone, Mail } from 'lucide-react';
import { useInView } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', text: '' });
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.text) {
      alert('Please fill in all fields');
      return;
    }
    const phoneNumber = '917737438464';
    const message = `*New Contact Form Submission*%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Message:* ${encodeURIComponent(formData.text)}`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setFormData({ name: '', email: '', text: '' });
  };

  return (
    <section
      ref={sectionRef}
      className="h-screen min-h-screen w-full bg-black text-white flex items-center justify-center overflow-hidden"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');
        body { background-color: #000000; color: white; margin: 0; padding: 0; overflow: hidden; }
        ::selection { background: rgba(255, 255, 255, 0.2); }

        .contact-input {
          font-family: 'Open Sans', sans-serif;
          font-weight: 300;
          font-size: 0.875rem;
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #374151;
          padding: 10px 4px;
          color: white;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .contact-input::placeholder {
          color: #4b5563;
          font-family: 'Open Sans', sans-serif;
          font-weight: 300;
        }
        .contact-input:focus {
          border-bottom-color: white;
        }
      `}</style>

      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full py-6 lg:py-0"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* LEFT - Form */}
          <motion.div className="space-y-6 lg:space-y-7 order-2 lg:order-1" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <h1
                className="mb-3"
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2
                }}
              >
                Let's Connect
              </h1>
              <p style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 300,
                fontSize: '0.9rem',
                color: '#9ca3af',
                maxWidth: '32rem',
                lineHeight: 1.7
              }}>
                Have a question or project idea? Drop me a message — I'm always open to new conversations.
              </p>
            </motion.div>

            {/* Quick actions */}
            <motion.div className="flex flex-wrap gap-3 sm:gap-4" variants={itemVariants}>
              <motion.button
                onClick={() => window.open('tel:+917737438464')}
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-white/10 border border-white/20 rounded-full hover:bg-white/15 transition-colors"
                style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 300, fontSize: '0.85rem' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone size={15} />
                Call
              </motion.button>

              <motion.button
                onClick={() => window.open('mailto:rohitsuthar410@gmail.com')}
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 border border-white/30 rounded-full hover:bg-white/10 transition-colors"
                style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 300, fontSize: '0.85rem' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Mail size={15} />
                Email
              </motion.button>
            </motion.div>

            {/* Form */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="contact-input"
              />
              <input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="contact-input"
              />
              <textarea
                placeholder="How can I help you?"
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                rows={3}
                className="contact-input"
                style={{ resize: 'none' }}
              />

              <motion.button
                onClick={handleSubmit}
                className="mt-3 w-full sm:w-auto px-8 py-3 bg-white text-black rounded-full"
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em'
                }}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(255,255,255,0.12)" }}
                whileTap={{ scale: 0.96 }}
              >
                Send Message →
              </motion.button>
            </motion.div>
          </motion.div>

          {/* RIGHT - Image */}
          <motion.div
            className="relative order-1 lg:order-2 flex justify-center lg:justify-end h-full items-center"
            variants={itemVariants}
          >
            <motion.div className="relative rounded-2xl overflow-hidden w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[480px]">
              <img
                src="contact.png"
                alt="Let's work together"
                className="w-full h-auto object-cover aspect-[4/5] sm:aspect-[3/4]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5">
                <div
                  className="inline-block px-4 py-1 bg-white/15 backdrop-blur-sm rounded-full"
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: '0.8rem'
                  }}
                >
                  Open for projects
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;