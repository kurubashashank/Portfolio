import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const revealUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay }
  })
};

const contactModes = [
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin },
  { id: "gmail", label: "Gmail", icon: Mail }
];

function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "", preferredChannel: "whatsapp" });

  useEffect(() => {
    const load = async () => {
      const [profileRes, projectsRes] = await Promise.all([fetch("/api/profile"), fetch("/api/projects")]);
      const profileData = await profileRes.json();
      const projectData = await projectsRes.json();
      setProfile(profileData);
      setProjects(projectData);
    };
    load().catch(() => setStatus("Unable to load portfolio data right now."));
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("Opening selected app...");

    const textBody = `Hi Shashank, I am ${form.name} (${form.email}). ${form.message}`;
    const encodedBody = encodeURIComponent(textBody);
    const phoneDigits = (profile.phone || "").replace(/\D/g, "");
    const redirectMap = {
      whatsapp: phoneDigits ? `https://wa.me/${phoneDigits}?text=${encodedBody}` : "",
      linkedin: profile.links?.linkedin || "",
      gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        profile.email
      )}&su=${encodeURIComponent("Portfolio Inquiry")}&body=${encodedBody}`
    };
    const redirectUrl = redirectMap[form.preferredChannel];

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setStatus(data.message || "Message sent.");
      if (res.ok) setForm({ name: "", email: "", message: "", preferredChannel: "whatsapp" });
    } catch (_error) {
      setStatus("Opening selected app...");
    } finally {
      if (redirectUrl) {
        window.location.assign(redirectUrl);
      }
    }
  };

  if (!profile) {
    return <div className="loading">Loading portfolio...</div>;
  }

  return (
    <div className="app-shell">
      <motion.aside className="left-panel" variants={revealUp} initial="hidden" animate="visible" custom={0.6}>
        <div className="about-hero">
          <div className="about-content">
            <p className="about-label">About Me</p>
            <h1>
              HI, I'M <span>{profile.name.toUpperCase()}</span>
            </h1>
            <p className="role">{profile.role}</p>
            <p className="bio">{profile.shortBio}</p>

            <div className="about-actions">
              <a className="btn-main" href="/Shashank-Resume-Full.pdf" download>
                Download CV
              </a>
              <a className="btn-alt" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                Visit LinkedIn
              </a>
            </div>

            <div className="contact-list">
              <a href={`mailto:${profile.email}`}><Mail size={16} /> {profile.email}</a>
              <a href={`tel:${profile.phone}`}><Phone size={16} /> {profile.phone}</a>
              <span><MapPin size={16} /> {profile.location}</span>
            </div>
          </div>

          <div className="about-photo-wrap">
            <div className="profile-frame">
              <img className="avatar-photo" src="/Shashank_Passport_pic.png" alt="Kuruba Shashank" />
            </div>
          </div>
        </div>

        <div className="social-row">
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn</a>
          <a href={profile.links.github} target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
        </div>
      </motion.aside>

      <main className="main-panel">
        <motion.section className="hero card" variants={revealUp} initial="hidden" animate="visible" custom={0.2}>
          <h2>{profile.heading}</h2>
          <p>{profile.availability}</p>
          <div className="stats">
            {profile.stats.map((item) => (
              <article key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section className="card" variants={revealUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}>
          <h3>Projects</h3>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.article
                className="project-card"
                key={project.name}
                variants={revealUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.05 * (index + 1)}
                whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
              >
                <h4>{project.name}</h4>
                <p>{project.description}</p>
                <div className="chips">
                  {project.stack.map((tech) => (
                    <span key={`${project.name}-${tech}`}>{tech}</span>
                  ))}
                </div>
                <a href={project.github} target="_blank" rel="noreferrer">View Code</a>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section className="card" variants={revealUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15}>
          <h3>Skills</h3>
          <div className="skills-cloud">
            {profile.skills.map((skill) => (
              <motion.span
                key={skill}
                whileHover={{ y: -6, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 260, damping: 14 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="card contact-section"
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
        >
          <div className="contact-layout">
            <div className="contact-side">
              <h3>Let’s Connect</h3>
              <p>Pick your preferred mode and I will respond quickly.</p>
              <a href={`mailto:${profile.email}`} className="contact-action">
                <Mail size={16} /> {profile.email}
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="contact-action">
                <Linkedin size={16} /> LinkedIn Profile
              </a>
              <a href={`tel:${profile.phone}`} className="contact-action">
                <Phone size={16} /> {profile.phone}
              </a>
            </div>

            <form className="contact-form card-inset" onSubmit={onSubmit}>
              <div className="mode-picker">
                <p>Preferred reply mode</p>
                <div className="mode-options">
                  {contactModes.map((mode) => {
                    const Icon = mode.icon;
                    const active = form.preferredChannel === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        className={`mode-option ${active ? "active" : ""}`}
                        onClick={() => setForm((prev) => ({ ...prev, preferredChannel: mode.id }))}
                      >
                        <Icon size={16} />
                        {mode.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                required
              />
              <input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                required
              />
              <textarea
                placeholder="Tell me about the role or project"
                rows="4"
                value={form.message}
                onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                required
              />
              <button type="submit">Send via Selected App</button>
              {status ? <p className="status">{status}</p> : null}
            </form>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default App;
