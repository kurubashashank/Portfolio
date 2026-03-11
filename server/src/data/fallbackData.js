const profile = {
  name: "Kuruba Shashank",
  role: "Aspiring Software Engineer",
  heading: "Building future-ready products with MERN, data, and AI-assisted workflows.",
  shortBio:
    "Full Stack Developer focused on production-grade web applications, clean APIs, and modern UI systems that convert ideas into reliable business products.",
  email: "kurubashashank5@gmail.com",
  phone: "+91 6301415646",
  location: "Guntakal, Andhra Pradesh, India",
  availability: "Open to Full Stack roles",
  resume: {
    short: "c:\\Users\\kurub\\OneDrive\\Desktop\\Shashank.pdf",
    full: "c:\\Users\\kurub\\OneDrive\\Desktop\\Shashank Resume full.pdf"
  },
  links: {
    linkedin: "https://www.linkedin.com/in/kuruba-shashank-37a160273",
    github: "https://github.com/kurubashashank"
  },
  highlights: [
    "Created real-time voting platform with fairness controls and secure validation.",
    "Developed financial analytics products for tracking KPIs and business insights."
  ],
  skills: [
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "JavaScript",
    "Python",
    "SQL",
    "Java",
    "Socket.IO",
    "AWS S3",
    "REST APIs",
    "Prompt Engineering"
  ],
  stats: [
    { label: "GPA", value: "8.11/10" },
    { label: "Focus", value: "Full Stack & Artificial Intelligence" },
    { label: "Graduation", value: "2026" }
  ]
};

const projects = [
  {
    name: "Real-Time Poll Rooms",
    description:
      "Live polling platform with unique room links, secure voting controls, and real-time updates for audience engagement.",
    stack: ["Node.js", "Express.js", "SQL", "Socket.IO", "JavaScript"],
    github: "https://github.com/kurubashashank/Real-Time-Poll-Rooms-",
    live: "",
    featured: true,
    order: 1
  },
  {
    name: "SME Financial Health Platform",
    description:
      "Financial analytics platform for SME statement ingestion, KPI scoring, risk analysis, and LLM-powered recommendations.",
    stack: ["React.js", "Python", "SQL", "LLM Integration"],
    github: "https://github.com/kurubashashank/SME_Financial_Health",
    live: "",
    featured: true,
    order: 2
  },
  {
    name: "Luxe & Lineage E-Commerce",
    description:
      "MERN commerce system with catalog flow, cart, checkout modules, and cloud media handling via AWS S3.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "AWS S3"],
    github: "https://github.com/kurubashashank/luxelineage-ecommerce",
    live: "",
    featured: true,
    order: 3
  },
  {
    name: "Finlytics Expense Tracker",
    description:
      "Expense and savings tracker with authentication, visual analytics, and responsive dashboard UX.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/kurubashashank",
    live: "",
    featured: false,
    order: 4
  }
];

module.exports = { profile, projects };
