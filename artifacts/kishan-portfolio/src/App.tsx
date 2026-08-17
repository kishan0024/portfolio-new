import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = 'Kishan Maheta — Software engineer, careful builder';
    const description =
      'The personal site of Kishan Maheta, a senior software engineer from Ahmedabad who builds dependable systems with a human edge.';
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute('content', description);

    const setProperty = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    setProperty('og:title', 'Kishan Maheta — Software engineer, careful builder');
    setProperty('og:description', description);
    setProperty('og:type', 'website');
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio-shell" data-testid="page-portfolio">
      <header className="site-header" data-testid="navigation-header">
        <a className="wordmark" href="#top" onClick={closeMenu} data-testid="link-home">
          <span className="wordmark-mark">KM</span>
          <span className="wordmark-name">Kishan Maheta <span>/ engineer</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a className="nav-link" href="#work" data-testid="link-nav-work">work</a>
          <a className="nav-link" href="#trajectory" data-testid="link-nav-trajectory">trajectory</a>
          <a className="nav-link" href="#contact" data-testid="link-nav-contact">contact</a>
        </nav>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          data-testid="button-menu-toggle"
        >
          {menuOpen ? <X size={20} strokeWidth={1.7} /> : <Menu size={20} strokeWidth={1.7} />}
        </button>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation" data-testid="navigation-mobile">
            <a className="nav-link" href="#work" onClick={closeMenu} data-testid="link-mobile-work">work</a>
            <a className="nav-link" href="#trajectory" onClick={closeMenu} data-testid="link-mobile-trajectory">trajectory</a>
            <a className="nav-link" href="#contact" onClick={closeMenu} data-testid="link-mobile-contact">contact</a>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div>
            <div className="eyebrow reveal" data-testid="text-availability">Currently building at Middleware</div>
            <h1 className="hero-title reveal reveal-delay" id="hero-title" data-testid="text-hero-title">
              Software<br />
              with <em>signal.</em>
            </h1>
            <p className="hero-copy reveal reveal-delay-2" data-testid="text-hero-intro">
              I&apos;m Kishan — a senior software engineer in Ahmedabad. I like taking complicated
              things apart, finding the quiet centre, and building from there.
            </p>
            <div className="hero-actions reveal reveal-delay-2">
              <a className="button-primary" href="#work" data-testid="link-hero-work">
                See selected work <ArrowDown size={15} strokeWidth={1.6} />
              </a>
              <a className="button-quiet" href="mailto:kishanmaheta.dev@gmail.com" data-testid="link-hero-email">
                Say hello <Mail size={15} strokeWidth={1.6} />
              </a>
            </div>
          </div>
          <aside className="hero-aside" aria-label="A note from Kishan">
            <div className="orbit-card" data-testid="visual-orbit">
              <div className="orbit-grid" />
              <div className="orbit-dot" />
              <span className="orbit-label">systems / people / details</span>
            </div>
            <div className="aside-note">
              <strong>A small note</strong>
              Good engineering is rarely about showing off the machinery. It&apos;s about making the
              right thing feel obvious.
            </div>
          </aside>
          <div className="scroll-cue" aria-hidden="true"><span /> keep scrolling</div>
        </section>

        <section className="section section-dark" aria-labelledby="about-title">
          <div className="section-inner manifesto-grid">
            <div>
              <div className="section-kicker"><span className="number-label">01 /</span> the short version</div>
              <h2 className="section-title" id="about-title">Not just shipping.<br /><em>Shaping.</em></h2>
              <p className="manifesto-lead">
                I work where product thinking meets <em>solid engineering</em> — on teams that
                care how things behave, not only whether they launch.
              </p>
            </div>
            <div className="manifesto-side">
              <strong>Based in Ahmedabad, India</strong>
              My home base is a city of generous chaos and excellent snacks. The same curiosity
              that gets me lost in a new neighbourhood usually finds its way into the codebase.
              <br /><br />
              Outside work: long walks, better questions, and collecting tiny interfaces that
              make everyday life a little nicer.
            </div>
          </div>
        </section>

        <section className="section" id="work" aria-labelledby="work-title">
          <div className="section-inner">
            <div className="work-heading">
              <div>
                <div className="section-kicker"><span className="number-label">02 /</span> selected work</div>
                <h2 className="section-title" id="work-title">A few things<br /><em>made useful.</em></h2>
              </div>
              <p className="work-intro">A mix of platform work, product surfaces, and the invisible connective tissue between them.</p>
            </div>
            <div className="work-list">
              <a className="work-row" href="https://middleware.io" target="_blank" rel="noreferrer" data-testid="link-work-middleware">
                <span className="work-index">01</span>
                <span className="work-name">Middleware</span>
                <span className="work-tags">observability / platforms / scale</span>
                <ArrowUpRight className="work-arrow" size={21} strokeWidth={1.5} />
              </a>
              <a className="work-row" href="https://github.com/kishanmaheta" target="_blank" rel="noreferrer" data-testid="link-work-github">
                <span className="work-index">02</span>
                <span className="work-name">Tools with edges</span>
                <span className="work-tags">experiments / developer experience</span>
                <ArrowUpRight className="work-arrow" size={21} strokeWidth={1.5} />
              </a>
              <a className="work-row" href="https://www.simform.com" target="_blank" rel="noreferrer" data-testid="link-work-simform">
                <span className="work-index">03</span>
                <span className="work-name">Simform</span>
                <span className="work-tags">web products / collaboration / craft</span>
                <ArrowUpRight className="work-arrow" size={21} strokeWidth={1.5} />
              </a>
            </div>
            <p className="work-footnote">Project names and case studies are intentionally easy to swap in as the archive grows.</p>
          </div>
        </section>

        <section className="section" aria-labelledby="approach-title">
          <div className="section-inner split-section">
            <div>
              <div className="section-kicker"><span className="number-label">03 /</span> how I work</div>
              <h2 className="section-title" id="approach-title">The good<br /><em>part.</em></h2>
              <div className="principles-list">
                <div className="principle" data-testid="item-principle-01">
                  <span className="principle-num">a.</span>
                  <div><h3>Make the complex legible.</h3><p>Clarity is a feature. I turn fuzzy problems into a shared picture before reaching for a solution.</p></div>
                </div>
                <div className="principle" data-testid="item-principle-02">
                  <span className="principle-num">b.</span>
                  <div><h3>Leave the code kinder.</h3><p>Readable systems compound. The next person should understand the why without archaeology.</p></div>
                </div>
                <div className="principle" data-testid="item-principle-03">
                  <span className="principle-num">c.</span>
                  <div><h3>Stay close to the person.</h3><p>Metrics matter, but so does watching someone use the thing you made. Both are part of the feedback loop.</p></div>
                </div>
              </div>
            </div>
            <div className="toolbox" data-testid="panel-toolbox">
              <div className="section-kicker">the toolbox</div>
              <h3>Reliable bones.<br />Flexible skin.</h3>
              <p>The stack changes with the problem. The standards do not: thoughtful boundaries, honest interfaces, and room to grow.</p>
              <div className="skill-cloud" aria-label="Technologies and skills">
                <span className="skill-pill">TypeScript</span>
                <span className="skill-pill">React</span>
                <span className="skill-pill">Node.js</span>
                <span className="skill-pill">Go</span>
                <span className="skill-pill">PostgreSQL</span>
                <span className="skill-pill">Distributed systems</span>
                <span className="skill-pill">Observability</span>
                <span className="skill-pill">API design</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-dark" id="trajectory" aria-labelledby="trajectory-title">
          <div className="section-inner trajectory">
            <div className="trajectory-sticky">
              <div className="section-kicker"><span className="number-label">04 /</span> trajectory</div>
              <h2 className="section-title" id="trajectory-title">Still in<br /><em>motion.</em></h2>
              <p className="trajectory-caption">A path through teams, technologies, and increasingly better questions.</p>
            </div>
            <div className="timeline">
              <article className="timeline-item" data-testid="experience-middleware-senior">
                <div className="timeline-date">2023 — now</div>
                <div><h3 className="timeline-role">Senior Software Engineer</h3><div className="timeline-company">Middleware · Ahmedabad</div><p className="timeline-detail">Building dependable observability products and helping turn ambitious platform ideas into tools people trust every day.</p></div>
              </article>
              <article className="timeline-item" data-testid="experience-middleware">
                <div className="timeline-date">2021 — 2023</div>
                <div><h3 className="timeline-role">Software Engineer</h3><div className="timeline-company">Middleware · Ahmedabad</div><p className="timeline-detail">Foundations, APIs, and the many small decisions that make a growing engineering system hold together.</p></div>
              </article>
              <article className="timeline-item" data-testid="experience-simform">
                <div className="timeline-date">2019 — 2021</div>
                <div><h3 className="timeline-role">Software Engineer</h3><div className="timeline-company">Simform · Ahmedabad</div><p className="timeline-detail">Shipped web products for varied teams, learning to balance product intent with technical constraints.</p></div>
              </article>
              <article className="timeline-item" data-testid="experience-trainee">
                <div className="timeline-date">2018 — 2019</div>
                <div><h3 className="timeline-role">Software Engineering Trainee</h3><div className="timeline-company">Early days · Ahmedabad</div><p className="timeline-detail">Where the habit began: ask why, write things down, and make the next commit a little better.</p></div>
              </article>
              <article className="timeline-item" data-testid="experience-education">
                <div className="timeline-date">2015 — 2019</div>
                <div><h3 className="timeline-role">B.Tech, Computer Engineering</h3><div className="timeline-company">Birla Vishvakarma Mahavidyalaya · Vallabh Vidyanagar</div><p className="timeline-detail">The formal chapter, with plenty of informal learning around it.</p></div>
              </article>
            </div>
          </div>
        </section>

        <section className="section contact" id="contact" aria-labelledby="contact-title">
          <div className="section-inner">
            <div className="section-kicker"><span className="number-label">05 /</span> next conversation</div>
            <h2 className="contact-title" id="contact-title">Have a good<br /><em>problem?</em></h2>
            <div className="contact-meta">
              <a className="contact-email" href="mailto:kishanmaheta.dev@gmail.com" data-testid="link-contact-email">kishanmaheta.dev@gmail.com</a>
              <div className="contact-links">
                <a href="https://www.linkedin.com/in/kishan-maheta/" target="_blank" rel="noreferrer" data-testid="link-contact-linkedin"><Linkedin size={15} strokeWidth={1.7} /> LinkedIn <ArrowUpRight size={14} /></a>
                <a href="https://github.com/kishanmaheta" target="_blank" rel="noreferrer" data-testid="link-contact-github"><Github size={15} strokeWidth={1.7} /> GitHub <ArrowUpRight size={14} /></a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer" data-testid="site-footer">
        <span className="footer-mark">KM / 2025</span>
        <span>Built with care from Ahmedabad, India.</span>
        <a href="#top" data-testid="link-back-to-top">back to top <ArrowUp size={13} /></a>
      </footer>
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
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
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
