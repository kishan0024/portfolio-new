import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  FolderGit2,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Phone,
  Sun,
  Terminal,
  UserCheck,
  Wrench,
  X,
} from 'lucide-react';
import {
  Link,
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();
const emailAddress = 'mahetakishan01@gmail.com';
const phoneNumber = '+91 9054191791';
const locationText = 'Ahmedabad, Gujarat, India';
const linkedinUrl = 'https://www.linkedin.com/in/mahetakishan24/';
const githubUrl = 'https://github.com/kishan0024';
const leetcodeUrl = 'https://leetcode.com/u/mahetakishan01/';
const awsCertValidation = '2MG79FGDYBF11NW4';

const routes = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About & Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
];

type Theme = 'dark' | 'light';

function Seo({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute('content', description);
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', description);
    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      document.head.appendChild(ogType);
    }
    ogType.setAttribute('content', 'website');
  }, [description, title]);
  return null;
}

function Header({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <header className="site-header" data-testid="navigation-header">
      <Link className="personal-mark" href="/" aria-label="Kishan Maheta home" data-testid="link-home">
        KM
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {routes.map((route) => {
          const active = location === route.href;
          return (
            <Link
              className={`nav-link${active ? ' active' : ''}`}
              href={route.href}
              aria-current={active ? 'page' : undefined}
              data-testid={`link-nav-${route.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              key={route.href}
            >
              {route.label}
            </Link>
          );
        })}
      </nav>
      <button
        className="menu-button"
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
        data-testid="button-menu-toggle"
      >
        {menuOpen ? <X size={15} strokeWidth={1.7} /> : <Menu size={15} strokeWidth={1.7} />}
      </button>
      <button
        className="theme-toggle"
        type="button"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        onClick={onToggleTheme}
        data-testid="button-theme-toggle"
      >
        {theme === 'dark' ? <Sun size={14} strokeWidth={1.6} /> : <Moon size={14} strokeWidth={1.6} />}
      </button>
      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation" data-testid="navigation-mobile">
          {routes.map((route) => {
            const active = location === route.href;
            return (
              <Link
                className={`nav-link${active ? ' active' : ''}`}
                href={route.href}
                aria-current={active ? 'page' : undefined}
                data-testid={`link-mobile-${route.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                key={route.href}
              >
                {route.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer" data-testid="site-footer">
      <span data-testid="text-footer-location">© 2026 Kishan Maheta · {locationText}</span>
      <div className="footer-links">
        <a className="footer-link" href={linkedinUrl} target="_blank" rel="noreferrer" data-testid="link-footer-linkedin">LinkedIn</a>
        <a className="footer-link" href={githubUrl} target="_blank" rel="noreferrer" data-testid="link-footer-github">GitHub</a>
        <a className="footer-link" href={leetcodeUrl} target="_blank" rel="noreferrer" data-testid="link-footer-leetcode">LeetCode</a>
        <a className="footer-link" href={`mailto:${emailAddress}`} data-testid="link-footer-email">Email</a>
      </div>
    </footer>
  );
}

function Shell({ children, theme, onToggleTheme }: { children: ReactNode; theme: Theme; onToggleTheme: () => void }) {
  return (
    <div className="portfolio-shell">
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      {children}
      <Footer />
    </div>
  );
}

function Home() {
  return (
    <main className="page-frame" data-testid="page-home">
      <Seo
        title="Kishan Maheta — Sr. Full Stack Developer (React + Go)"
        description="Personal portfolio of Kishan Maheta, Sr. Full Stack Developer specializing in React, Go, high-performance dashboards, microservices, and distributed systems."
      />
      <section className="page-intro home-intro reveal" aria-labelledby="home-title">
        <p className="page-kicker">Sr. Full Stack Developer (React + Go) · {locationText}</p>
        <h1 className="page-title" id="home-title" data-testid="text-home-title">Kishan Maheta</h1>
        <p className="page-subtitle" data-testid="text-home-intro">
          I build high-performance distributed backends in Go and intuitive, responsive web dashboards in React & TypeScript.
        </p>

        <div className="contact-links" style={{ marginTop: 20 }}>
          <a className="contact-link" href={`mailto:${emailAddress}`} data-testid="link-home-email">
            <Mail size={13} /> {emailAddress}
          </a>
          <a className="contact-link" href={`tel:${phoneNumber.replace(/\s+/g, '')}`} data-testid="link-home-phone">
            <Phone size={13} /> {phoneNumber}
          </a>
          <a className="contact-link" href={githubUrl} target="_blank" rel="noreferrer" data-testid="link-home-github">
            <Github size={13} /> GitHub <ArrowUpRight size={11} />
          </a>
          <a className="contact-link" href={linkedinUrl} target="_blank" rel="noreferrer" data-testid="link-home-linkedin">
            <Linkedin size={13} /> LinkedIn <ArrowUpRight size={11} />
          </a>
          <a className="contact-link" href={leetcodeUrl} target="_blank" rel="noreferrer" data-testid="link-home-leetcode">
            <Code2 size={13} /> LeetCode (198+) <ArrowUpRight size={11} />
          </a>
        </div>
      </section>

      <section aria-labelledby="currently-title" className="reveal reveal-delay" style={{ marginTop: 24 }}>
        <div className="currently-heading">
          <h2 className="section-label" id="currently-title">Overview</h2>
          <span className="section-note">at a glance</span>
        </div>
        <div className="currently-grid">
          <div className="currently-card" data-testid="card-current-role">
            <span className="card-label">Current Role</span>
            <span className="card-value">
              Sr. Full Stack Developer at <a href="https://middleware.io" target="_blank" rel="noreferrer">Middleware.io</a>
            </span>
          </div>
          <div className="currently-card" data-testid="card-current-stack">
            <span className="card-label">Core Tech</span>
            <span className="card-value">Go, Gin, React, TypeScript, Highcharts, Postgres, Redis, Docker</span>
          </div>
          <div className="currently-card" data-testid="card-current-cert">
            <span className="card-label">Certification</span>
            <span className="card-value">AWS Certified Cloud Practitioner ({awsCertValidation})</span>
          </div>
          <div className="currently-card" data-testid="card-current-location">
            <span className="card-label">Based In</span>
            <span className="card-value">{locationText}</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="highlights-title" className="reveal reveal-delay-2" style={{ marginTop: 36 }}>
        <div className="content-heading">
          <h2 id="highlights-title">Featured Highlights</h2>
          <span className="section-note">key achievements</span>
        </div>
        <div className="timeline-list" style={{ paddingTop: 16 }}>
          <article className="timeline-item">
            <div className="timeline-date">Middleware.io · SaaS Infrastructure & Billing</div>
            <h3 className="timeline-role">Go Concurrency & High-Throughput Billing Pipelines</h3>
            <p className="timeline-detail">
              Designed scalable billing cron jobs using Go concurrency primitives (goroutines, semaphores, RWMutex) to process usage metering and automated Stripe & Chargebee subscriptions across all SaaS accounts, drastically reducing execution time.
            </p>
          </article>

          <article className="timeline-item">
            <div className="timeline-date">Middleware.io · Dashboards & ML UI/UX</div>
            <h3 className="timeline-role">Highcharts Observability & ML Outlier Detection</h3>
            <p className="timeline-detail">
              Built dynamic chart visualizations and shareable dashboards with Highcharts & Antd. Created intuitive UI/UX for machine learning anomaly detection and forecasting modules.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

function About() {
  return (
    <main className="page-frame" data-testid="page-about">
      <Seo
        title="About & Experience — Kishan Maheta"
        description="Work experience and background of Kishan Maheta, Sr. Full Stack Developer at Middleware.io."
      />
      <section className="page-intro reveal" aria-labelledby="about-title">
        <p className="page-kicker">experience & background</p>
        <h1 className="page-title" id="about-title" data-testid="text-about-title">About & Experience</h1>
        <p className="page-subtitle" data-testid="text-about-subtitle">My professional journey in software engineering.</p>
      </section>

      <section className="about-content">
        <p className="body-copy" data-testid="text-about-copy">
          I am a <strong>Senior Full Stack Developer</strong> with strong expertise in <strong>Go (Golang)</strong>, <strong>TypeScript</strong>, and <strong>React</strong>. I specialize in developing resilient backend microservices, optimizing complex database queries, building real-time dashboard visualizations, and crafting seamless SaaS product features.
        </p>
      </section>

      <section aria-labelledby="work-experience-title" style={{ marginTop: 32 }}>
        <div className="content-heading">
          <h2 id="work-experience-title">Work Experience</h2>
          <span className="section-note">industry experience</span>
        </div>

        <div className="timeline-list" style={{ paddingTop: 20 }}>
          <article className="timeline-item" data-testid="experience-middleware">
            <div className="timeline-date">June 2024 – Present</div>
            <h3 className="timeline-role">Sr. Full Stack Developer (React + Go)</h3>
            <div className="timeline-company">Middleware.io · Ahmedabad, India</div>
            <ul className="body-copy" style={{ marginTop: 10, paddingLeft: 18, fontSize: '0.92rem', lineHeight: '1.6' }}>
              <li>Maintained and enhanced core infrastructure modules serving as the foundation for frontend components and APIs across product modules.</li>
              <li>Developed frontend components using TypeScript, Ant Design (Antd), and SCSS for scalable UI solutions across complex dashboards.</li>
              <li>Built dynamic chart visualizations with Highcharts, integrating core components and enabling publicly shareable dashboards.</li>
              <li>Designed and developed UI/UX interfaces for machine learning modules (anomalies, forecasting, outlier detection) powering advanced alerting features.</li>
              <li>Refactored legacy React.js codebase to optimize performance for high widget counts; shifted complex business logic to backend Go APIs.</li>
              <li>Owned Billing, Usage, and Settings modules across the SaaS platform; automated subscriptions and usage metering via Stripe & Chargebee webhooks.</li>
              <li>Optimized scalable billing cron jobs using Go concurrency primitives (goroutines, semaphores, RWMutex), significantly increasing throughput.</li>
            </ul>
          </article>

          <article className="timeline-item" data-testid="experience-simform">
            <div className="timeline-date">Jan 2023 – June 2024</div>
            <h3 className="timeline-role">Software Engineer (Backend)</h3>
            <div className="timeline-company">Simform Solutions LLP · Ahmedabad, India</div>
            <ul className="body-copy" style={{ marginTop: 10, paddingLeft: 18, fontSize: '0.92rem', lineHeight: '1.6' }}>
              <li>Developed scalable, high-performance backend microservices using Golang and the Gin framework.</li>
              <li>Designed and implemented RESTful APIs following best practices, including request/response validation and pagination.</li>
              <li>Wrote optimized SQL queries using ORMs (GORM, SQLC) and raw SQL for performance-critical database operations.</li>
              <li>Designed and executed unit test suites with high code coverage to ensure software reliability.</li>
              <li>Generated and maintained Swagger/OpenAPI documentation for clear API specifications.</li>
              <li>Containerized applications using Docker and integrated AWS SDK for Golang (SQS, SES, DynamoDB).</li>
            </ul>
          </article>
        </div>
      </section>

      <section aria-labelledby="education-title" style={{ marginTop: 40 }}>
        <div className="content-heading">
          <h2 id="education-title">Education</h2>
          <span className="section-note">academic background</span>
        </div>
        <div className="timeline-list" style={{ paddingTop: 20 }}>
          <article className="timeline-item" data-testid="education-bvm">
            <div className="timeline-date">2019 – 2023</div>
            <h3 className="timeline-role">B.Tech in Computer Engineering</h3>
            <div className="timeline-company">BVM Engineering College · Vidhyanagar, Anand</div>
            <p className="timeline-detail" style={{ marginTop: 6 }}>
              <strong>CPI: 7.84</strong> · Served as Training & Placement Coordinator throughout final year. Organized major events for the Annual Tech Fest (UDAAN).
            </p>
          </article>
        </div>
      </section>

      <section aria-labelledby="achievements-title" style={{ marginTop: 40 }}>
        <div className="content-heading">
          <h2 id="achievements-title">Certifications & Achievements</h2>
          <span className="section-note">recognition</span>
        </div>
        <div className="currently-grid" style={{ marginTop: 20 }}>
          <div className="currently-card">
            <span className="card-label">AWS Certification</span>
            <span className="card-value">AWS Certified Cloud Practitioner</span>
            <span className="section-note" style={{ display: 'block', marginTop: 4 }}>Validation ID: {awsCertValidation}</span>
          </div>
          <div className="currently-card">
            <span className="card-label">Problem Solving</span>
            <span className="card-value">LeetCode Profile</span>
            <a href={leetcodeUrl} target="_blank" rel="noreferrer" className="section-note" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 4, color: 'var(--blue)' }}>
              198+ DSA Problems Solved <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

const projectList = [
  {
    id: 'medical-hrms',
    title: 'Medical HRMS System',
    subtitle: 'Healthcare Asset & Radiologist Management System',
    description:
      'Developed a comprehensive system enabling parent medical organizations to manage institutions, radiologists, case studies, and billing. Automated case study assignments to doctors to eliminate physical document overhead.',
    features: [
      'Real-time WebSocket communication enabling direct doctor-to-doctor messaging',
      'Priority notification system alerting staff when urgent case studies are registered',
      'Dynamic RBAC (Role-Based Access Control) permission management system',
    ],
    techStack: ['React', 'Golang', 'WebSockets', 'RBAC', 'PostgreSQL'],
  },
  {
    id: 'attendance-facial-recognition',
    title: 'Attendance Management System Using Face Recognition',
    subtitle: 'Facial Recognition & Record Automation',
    description:
      'Developed an automated Attendance Management System leveraging Python Flask integrated with a Haar Cascade Classifier for real-time facial recognition and automated attendance tracking.',
    features: [
      'Real-time facial detection and identification using Haar Cascade Classifier',
      'User-friendly management portal for student and staff records with secure data storage',
      'RESTful API architecture for seamless data retrieval and RBAC permission enforcement',
    ],
    techStack: ['Python', 'Flask', 'Haar Cascade', 'OpenCV', 'REST APIs', 'RBAC'],
  },
];

function Projects() {
  return (
    <main className="page-frame" data-testid="page-projects">
      <Seo title="Projects — Kishan Maheta" description="Featured engineering projects by Kishan Maheta including Golang backends, React applications, and AI system integrations." />
      <section className="page-intro reveal" aria-labelledby="projects-title">
        <p className="page-kicker">featured software</p>
        <h1 className="page-title" id="projects-title" data-testid="text-projects-title">Projects</h1>
        <p className="page-subtitle" data-testid="text-projects-subtitle">Highlighting key systems and applications I have developed.</p>
      </section>

      <section className="projects-layout" style={{ paddingTop: 20 }}>
        <div className="project-list" style={{ gap: 24 }}>
          {projectList.map((project) => (
            <article className="project-card" key={project.id} data-testid={`project-${project.id}`} style={{ padding: 24 }}>
              <div className="project-top" style={{ marginBottom: 8 }}>
                <h3 className="project-title" style={{ fontSize: '1.25rem' }}>{project.title}</h3>
                <FolderGit2 size={16} strokeWidth={1.5} />
              </div>
              <p className="section-note" style={{ marginBottom: 12 }}>{project.subtitle}</p>
              <p className="project-description" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{project.description}</p>
              
              <ul className="body-copy" style={{ marginTop: 12, paddingLeft: 18, fontSize: '0.9rem', lineHeight: '1.6' }}>
                {project.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>

              <div className="tag-row" style={{ marginTop: 16 }}>
                {project.techStack.map((tech) => (
                  <span className="tag tag-blue" key={tech}>{tech}</span>
                ))}
              </div>
            </article>
          ))}

          <a className="project-link" href={githubUrl} target="_blank" rel="noreferrer" data-testid="link-projects-github" style={{ marginTop: 12 }}>
            Explore more repositories on GitHub ({githubUrl}) <ArrowUpRight size={13} />
          </a>
        </div>
      </section>
    </main>
  );
}

const skillCategories = [
  {
    title: 'Languages',
    icon: Code2,
    tags: ['Go (Golang)', 'TypeScript', 'C / C++', 'JSX', 'JavaScript'],
  },
  {
    title: 'Frameworks & Frontend',
    icon: Layers,
    tags: ['ReactJs', 'Gin (Go)', 'Ant Design (Antd)', 'TailWind CSS', 'Highcharts', 'NextJs'],
  },
  {
    title: 'Databases & Caching',
    icon: Database,
    tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'GORM', 'SQLC'],
  },
  {
    title: 'Tools & DevOps',
    icon: Wrench,
    tags: ['Docker', 'Swagger / OpenAPI', 'Postman', 'Git', 'Observability', 'AWS (SQS, SES, DynamoDB)'],
  },
];

function Skills() {
  return (
    <main className="page-frame" data-testid="page-skills">
      <Seo title="Skills & Tech Stack — Kishan Maheta" description="Programming languages, frameworks, databases, and DevOps tools used by Kishan Maheta." />
      <section className="page-intro reveal" aria-labelledby="skills-title">
        <p className="page-kicker">technical stack</p>
        <h1 className="page-title" id="skills-title" data-testid="text-skills-title">Skills & Technologies</h1>
        <p className="page-subtitle" data-testid="text-skills-subtitle">Languages, frameworks, databases, and tooling I use daily.</p>
      </section>

      <section className="gear-groups" aria-label="Skill categories" style={{ marginTop: 24 }}>
        {skillCategories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <article className="gear-group" key={cat.title} data-testid={`skill-group-${index}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <Icon size={18} />
                <h2 style={{ fontSize: '1.1rem', margin: 0 }}>{cat.title}</h2>
              </div>
              <div className="gear-tags" style={{ marginTop: 12 }}>
                {cat.tags.map((tag) => (
                  <span className="gear-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}

function Contact() {
  return (
    <main className="page-frame" data-testid="page-contact">
      <Seo title="Contact — Kishan Maheta" description="Get in touch with Kishan Maheta for full-stack engineering, backend systems, or consultation." />
      <section className="page-intro reveal" aria-labelledby="contact-title">
        <p className="page-kicker">get in touch</p>
        <h1 className="page-title" id="contact-title" data-testid="text-contact-title">Let&apos;s Connect.</h1>
        <p className="page-subtitle" data-testid="text-contact-subtitle">Looking for a senior full-stack developer or have a project in mind?</p>
      </section>

      <section className="contact-card" data-testid="card-contact" style={{ padding: 28 }}>
        <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
          Feel free to reach out directly via email or phone. I&apos;m always open to discussing new engineering opportunities, distributed system challenges, or software architecture.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '20px 0' }}>
          <a className="contact-email" href={`mailto:${emailAddress}`} data-testid="link-contact-email">
            <Mail size={16} /> {emailAddress}
          </a>
          <a className="contact-email" href={`tel:${phoneNumber.replace(/\s+/g, '')}`} data-testid="link-contact-phone" style={{ fontSize: '1.1rem' }}>
            <Phone size={16} /> {phoneNumber}
          </a>
        </div>

        <div className="contact-links" style={{ marginTop: 24 }}>
          <a className="contact-link" href={linkedinUrl} target="_blank" rel="noreferrer" data-testid="link-contact-linkedin">
            <Linkedin size={14} /> LinkedIn <ArrowUpRight size={11} />
          </a>
          <a className="contact-link" href={githubUrl} target="_blank" rel="noreferrer" data-testid="link-contact-github">
            <Github size={14} /> GitHub <ArrowUpRight size={11} />
          </a>
          <a className="contact-link" href={leetcodeUrl} target="_blank" rel="noreferrer" data-testid="link-contact-leetcode">
            <Code2 size={14} /> LeetCode <ArrowUpRight size={11} />
          </a>
        </div>
      </section>

      <p className="body-copy" style={{ marginTop: 28 }} data-testid="text-contact-note">
        Based in <strong>{locationText}</strong>.
      </p>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/projects" component={Projects} />
        <Route path="/skills" component={Skills} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('kishan-theme');
    if (storedTheme === 'light' || storedTheme === 'dark') setTheme(storedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('kishan-theme', theme);
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Shell theme={theme} onToggleTheme={() => setTheme((value) => value === 'dark' ? 'light' : 'dark')}>
            <Router />
          </Shell>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;