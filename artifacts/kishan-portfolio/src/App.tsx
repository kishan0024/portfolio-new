import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Play,
  Sun,
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
const emailAddress = 'kishanmaheta.dev@gmail.com';
const linkedinUrl = 'https://www.linkedin.com/in/mahetakishan24/';
const githubUrl = 'https://github.com/kishanmaheta';

const routes = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/gear', label: 'Gear' },
  { href: '/contact', label: 'Contact' },
  { href: '/playbook', label: 'Playbook' },
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
              data-testid={`link-nav-${route.label.toLowerCase()}`}
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
                data-testid={`link-mobile-${route.label.toLowerCase()}`}
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
      <span data-testid="text-footer-location">© 2025 Kishan Maheta · Ahmedabad, India</span>
      <div className="footer-links">
        <a className="footer-link" href={linkedinUrl} target="_blank" rel="noreferrer" data-testid="link-footer-linkedin">LinkedIn</a>
        <a className="footer-link" href={githubUrl} target="_blank" rel="noreferrer" data-testid="link-footer-github">GitHub</a>
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
  const [playing, setPlaying] = useState(false);
  return (
    <main className="page-frame" data-testid="page-home">
      <Seo
        title="Kishan Maheta — Senior Software Engineer"
        description="The personal site of Kishan Maheta, a senior software engineer at Middleware based in Ahmedabad."
      />
      <section className="page-intro home-intro reveal" aria-labelledby="home-title">
        <p className="page-kicker">Senior software engineer · Ahmedabad, India</p>
        <h1 className="page-title" id="home-title" data-testid="text-home-title">hello, Kishan here</h1>
        <p className="page-subtitle" data-testid="text-home-intro">
          I build dependable software at Middleware, and keep notes on the parts of the work that stay interesting.
        </p>
      </section>

      <section className="media-panel reveal reveal-delay" aria-label="Intro video placeholder" data-testid="panel-intro-media">
        <div className="media-grid" />
        <div className="media-orbit" />
        <span className="media-status">{playing ? 'playing / soon' : 'intro / 00:48'}</span>
        <div className="media-center">
          <button
            className="play-button"
            type="button"
            aria-label={playing ? 'Pause intro placeholder' : 'Play intro placeholder'}
            onClick={() => setPlaying((value) => !value)}
            data-testid="button-intro-play"
          >
            {playing ? <span aria-hidden="true" style={{ fontSize: 13 }}>Ⅱ</span> : <Play size={16} fill="currentColor" strokeWidth={1.4} />}
          </button>
        </div>
        <span className="media-caption">{playing ? 'a future introduction, in progress' : 'a future introduction, currently a quiet placeholder'}</span>
      </section>

      <section aria-labelledby="currently-title" className="reveal reveal-delay-2">
        <div className="currently-heading">
          <h2 className="section-label" id="currently-title">currently</h2>
          <span className="section-note">a small status update</span>
        </div>
        <div className="currently-grid">
          <div className="currently-card" data-testid="card-current-role">
            <span className="card-label">doing</span>
            <span className="card-value">Building observability tools at <a href="https://middleware.io" target="_blank" rel="noreferrer">Middleware</a></span>
          </div>
          <div className="currently-card" data-testid="card-current-reading">
            <span className="card-label">learning</span>
            <span className="card-value">Making distributed systems easier to reason about</span>
          </div>
          <div className="currently-card" data-testid="card-current-place">
            <span className="card-label">based in</span>
            <span className="card-value">Ahmedabad, India</span>
          </div>
          <div className="currently-card" data-testid="card-current-open">
            <span className="card-label">open to</span>
            <span className="card-value">Good questions and thoughtful teams</span>
          </div>
        </div>
      </section>
    </main>
  );
}

function About() {
  return (
    <main className="page-frame" data-testid="page-about">
      <Seo
        title="About Kishan Maheta"
        description="About Kishan Maheta: his engineering work, education, projects, and the interests around it."
      />
      <section className="page-intro reveal" aria-labelledby="about-title">
        <p className="page-kicker">a little context</p>
        <h1 className="page-title" id="about-title" data-testid="text-about-title">About</h1>
        <p className="page-subtitle" data-testid="text-about-subtitle">Who I am, and what I have been making.</p>
      </section>
      <section className="about-content">
        <p className="body-copy" data-testid="text-about-copy">
          I&apos;m Kishan, a senior software engineer at <strong>Middleware</strong>. I enjoy the middle layer of a product: where an ambitious idea becomes a system with clear boundaries, useful feedback, and a good experience for the person using it.
        </p>
        <div className="collage" aria-label="Abstract collage of places and ideas" data-testid="visual-about-collage">
          <div className="collage-card collage-card-one" />
          <div className="collage-card collage-card-two" />
          <div className="collage-card collage-card-three" />
          <div className="collage-card collage-card-four" />
          <span className="collage-caption">field notes / 01—04</span>
        </div>
      </section>

      <section aria-labelledby="timeline-title">
        <div className="content-heading">
          <h2 id="timeline-title">Timeline</h2>
          <span className="section-note">work + education</span>
        </div>
        <div className="timeline-layout" style={{ paddingTop: 22 }}>
          <span className="section-note">the long view</span>
          <div className="timeline-list">
            <article className="timeline-item" data-testid="timeline-middleware-senior">
              <div className="timeline-date">2023 — now</div>
              <h3 className="timeline-role">Senior Software Engineer</h3>
              <div className="timeline-company">Middleware · Ahmedabad</div>
              <p className="timeline-detail">Working on observability products and the platform foundations behind them.</p>
            </article>
            <article className="timeline-item" data-testid="timeline-middleware">
              <div className="timeline-date">2021 — 2023</div>
              <h3 className="timeline-role">Software Engineer</h3>
              <div className="timeline-company">Middleware · Ahmedabad</div>
              <p className="timeline-detail">Built APIs, product surfaces, and dependable connective tissue for a growing team.</p>
            </article>
            <article className="timeline-item" data-testid="timeline-simform">
              <div className="timeline-date">2019 — 2021</div>
              <h3 className="timeline-role">Software Engineer</h3>
              <div className="timeline-company">Simform · Ahmedabad</div>
              <p className="timeline-detail">Shipped web products with different teams, constraints, and definitions of done.</p>
            </article>
            <article className="timeline-item" data-testid="timeline-education">
              <div className="timeline-date">2015 — 2019</div>
              <h3 className="timeline-role">B.Tech in Computer Engineering</h3>
              <div className="timeline-company">Birla Vishvakarma Mahavidyalaya · Vallabh Vidyanagar</div>
              <p className="timeline-detail">The formal foundation, with plenty of informal learning around it.</p>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="projects-title">
        <div className="content-heading">
          <h2 id="projects-title">Projects</h2>
          <span className="section-note">selected experiments</span>
        </div>
        <div className="projects-layout" style={{ paddingTop: 22 }}>
          <span className="section-note">easy to replace</span>
          <div className="project-list">
            <article className="project-card" data-testid="project-observability">
              <div className="project-top"><h3 className="project-title">Observability foundations</h3><ArrowUpRight size={13} strokeWidth={1.5} /></div>
              <p className="project-description">The unglamorous, useful work of helping teams see what their systems are doing.</p>
              <div className="tag-row"><span className="tag tag-blue">TypeScript</span><span className="tag tag-green">platform</span><span className="tag tag-yellow">APIs</span></div>
            </article>
            <article className="project-card" data-testid="project-developer-tools">
              <div className="project-top"><h3 className="project-title">Small developer tools</h3><ArrowUpRight size={13} strokeWidth={1.5} /></div>
              <p className="project-description">Tiny utilities and experiments that make a repeated sharp edge a little softer.</p>
              <div className="tag-row"><span className="tag tag-pink">experiments</span><span className="tag tag-blue">React</span><span className="tag tag-green">DX</span></div>
            </article>
            <a className="project-link" href={githubUrl} target="_blank" rel="noreferrer" data-testid="link-projects-github">More small things live on GitHub <ArrowUpRight size={11} /></a>
          </div>
        </div>
      </section>

      <section aria-labelledby="hobbies-title">
        <div className="content-heading">
          <h2 id="hobbies-title">Hobbies</h2>
          <span className="section-note">away from the editor</span>
        </div>
        <div className="hobbies-layout" style={{ paddingTop: 22 }}>
          <span className="section-note">other tabs open</span>
          <div className="hobby-grid">
            <div className="hobby-card" data-testid="hobby-walks"><h3>Long walks</h3><p>Time to let an idea finish its sentence.</p></div>
            <div className="hobby-card" data-testid="hobby-interfaces"><h3>Good interfaces</h3><p>Collecting the small details that make tools feel human.</p></div>
            <div className="hobby-card" data-testid="hobby-reading"><h3>Reading broadly</h3><p>Engineering, people, cities, and whatever changes the question.</p></div>
            <div className="hobby-card" data-testid="hobby-food"><h3>Finding good food</h3><p>Ahmedabad is a very persuasive place to keep this habit.</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}

const gearGroups = [
  {
    title: 'Frontend',
    description: 'Interfaces that stay legible as they grow.',
    tags: ['TypeScript', 'React', 'Next.js', 'CSS', 'Accessibility'],
  },
  {
    title: 'Backend',
    description: 'Clear contracts, useful failure modes.',
    tags: ['Node.js', 'Go', 'REST APIs', 'PostgreSQL', 'Redis'],
  },
  {
    title: 'Systems',
    description: 'The invisible work behind dependable software.',
    tags: ['Distributed systems', 'Observability', 'Queues', 'Docker', 'Linux'],
  },
  {
    title: 'Ways of working',
    description: 'Tools are secondary to the habits around them.',
    tags: ['Design docs', 'Small PRs', 'Pairing', 'Measurement', 'Curiosity'],
  },
];

function Gear() {
  return (
    <main className="page-frame" data-testid="page-gear">
      <Seo title="Gear — Kishan Maheta" description="The tools, technologies, and working habits Kishan Maheta reaches for." />
      <section className="page-intro reveal" aria-labelledby="gear-title">
        <p className="page-kicker">tools, not trophies</p>
        <h1 className="page-title" id="gear-title" data-testid="text-gear-title">Gear</h1>
        <p className="page-subtitle" data-testid="text-gear-subtitle">A practical list of what I reach for, grouped by the job it does.</p>
      </section>
      <section className="gear-groups" aria-label="Technology groups">
        {gearGroups.map((group, index) => (
          <article className="gear-group" key={group.title} data-testid={`gear-group-${index}`}>
            <div><h2>{group.title}</h2><p>{group.description}</p></div>
            <div className="gear-tags">
              {group.tags.map((tag) => <span className="gear-tag" key={tag}>{tag}</span>)}
            </div>
          </article>
        ))}
      </section>
      <p className="body-copy" style={{ marginTop: 30 }} data-testid="text-gear-note">
        The exact stack changes with the problem. I care more about thoughtful boundaries, observable behavior, and leaving the next person a clear path through the code.
      </p>
    </main>
  );
}

function Contact() {
  return (
    <main className="page-frame" data-testid="page-contact">
      <Seo title="Contact Kishan Maheta" description="Get in touch with Kishan Maheta about software, systems, or a good problem." />
      <section className="page-intro reveal" aria-labelledby="contact-title">
        <p className="page-kicker">open channel</p>
        <h1 className="page-title" id="contact-title" data-testid="text-contact-title">Let&apos;s talk.</h1>
        <p className="page-subtitle" data-testid="text-contact-subtitle">Have a good problem, an interesting question, or a link worth sending?</p>
      </section>
      <section className="contact-card" data-testid="card-contact">
        <p>I&apos;m always happy to hear from people who care about the details. Email is the best place to start; the other links are here if you want to see what I&apos;ve been up to first.</p>
        <a className="contact-email" href={`mailto:${emailAddress}`} data-testid="link-contact-email">{emailAddress}</a>
        <div className="contact-links">
          <a className="contact-link" href={linkedinUrl} target="_blank" rel="noreferrer" data-testid="link-contact-linkedin"><Linkedin size={13} strokeWidth={1.7} /> LinkedIn <ArrowUpRight size={11} /></a>
          <a className="contact-link" href={githubUrl} target="_blank" rel="noreferrer" data-testid="link-contact-github"><Github size={13} strokeWidth={1.7} /> GitHub <ArrowUpRight size={11} /></a>
          <a className="contact-link" href="https://middleware.io" target="_blank" rel="noreferrer" data-testid="link-contact-middleware">Middleware <ArrowUpRight size={11} /></a>
        </div>
      </section>
      <p className="body-copy" style={{ marginTop: 28 }} data-testid="text-contact-note">
        Based in Ahmedabad, working with people anywhere a clear idea could use a careful build.
      </p>
    </main>
  );
}

const playbookItems = [
  ['01', 'Start with the shape of the problem', 'Before choosing a tool, I try to make the problem visible: who is it for, what changes, and what would “better” actually look like?'],
  ['02', 'Prefer a small, observable first step', 'A modest slice with good feedback usually teaches more than a large plan. I like systems that tell us how they are behaving.'],
  ['03', 'Make decisions easy to revisit', 'Good boundaries leave room for new information. A clear note today can save a surprising amount of archaeology next month.'],
  ['04', 'Keep the human in the loop', 'Software is a means, not the whole story. I care about the person reading the output, recovering from a failure, or learning the system.'],
];

function Playbook() {
  return (
    <main className="page-frame" data-testid="page-playbook">
      <Seo title="Playbook — Kishan Maheta" description="A few things Kishan Maheta is thinking about, and how he likes to work." />
      <section className="page-intro reveal" aria-labelledby="playbook-title">
        <p className="page-kicker">working notes</p>
        <h1 className="page-title" id="playbook-title" data-testid="text-playbook-title">Playbook</h1>
        <p className="page-subtitle" data-testid="text-playbook-subtitle">Things I&apos;m thinking about, and a few ways I like to work.</p>
      </section>
      <section className="playbook-list" aria-label="Working principles">
        {playbookItems.map(([number, title, copy]) => (
          <article className="playbook-item" key={number} data-testid={`playbook-item-${number}`}>
            <span className="playbook-number">{number}</span>
            <div><h2>{title}</h2><p>{copy}</p></div>
          </article>
        ))}
      </section>
      <p className="body-copy" style={{ marginTop: 28 }} data-testid="text-playbook-closing">
        This is a living page, not a doctrine. The best part of a playbook is finding where it needs to change.
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
        <Route path="/gear" component={Gear} />
        <Route path="/contact" component={Contact} />
        <Route path="/playbook" component={Playbook} />
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