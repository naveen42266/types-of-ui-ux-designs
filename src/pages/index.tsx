import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Check,
  ChevronDown,
  Clock,
  Code2,
  Compass,
  Database,
  ExternalLink,
  Github,
  Globe,
  Grid,
  Layers,
  Layout,
  Linkedin,
  Menu,
  MousePointer2,
  Palette,
  PenTool,
  Plus,
  Search,
  Sparkles,
  User,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react';
import { DESIGN_STYLES, type DesignStyle } from '../models/designStyles';
import { playTactileClick } from '../utils/sound';

const USE_CASES_BY_STYLE_ID: Record<string, string[]> = {
  skeuomorphism: ['Audio DAWs & virtual synthesizers', 'Digital note-taking & journal apps', 'Hardware companion remotes'],
  claymorphism: ['EdTech & kids learning platforms', 'Playful Web3 & onboarding flows', 'Consumer fintech savings apps'],
  neumorphism: ['Smart home & IoT thermostat hubs', 'Minimalist music & meditation players', 'Single-purpose hardware control panels'],
  glassmorphism: ['macOS / OS control centers', 'Crypto & SaaS overlay dashboards', 'Media players over rich artwork'],
  minimalism: ['Editorial magazines & portfolios', 'Luxury e-commerce storefronts', 'Distraction-free writing tools'],
  maximalism: ['Music festival & cultural microsites', 'Avant-garde fashion campaigns', 'Interactive storytelling zines'],
  brutalism: ['Experimental architecture studios', 'Underground art & design archives', 'Developer-first raw documentation'],
  'liquid-glass': ['Next-gen spatial OS widgets', 'Flagship mobile control sheets', 'Floating media & camera HUDs'],
  'bento-grid': ['Product launch & feature showcases', 'Personal creator link-in-bio hubs', 'Executive analytics summaries'],
  spatial: ['Mixed-reality headset workspaces', '3D product configurators', 'Eye- & pinch-driven media theaters'],
  flat: ['High-clarity municipal & gov portals', 'Fast-loading B2B utility dashboards', 'Clean vector illustration landing pages'],
  material: ['Cross-platform Android & web apps', 'Enterprise productivity suites', 'Consistent multi-team design systems'],
  'neo-brutalism': ['Indie SaaS & creator marketplaces', 'Design agency & portfolio sites', 'Gen-Z fintech & community apps'],
  'ai-native': ['Conversational coding & research copilots', 'Prompt-to-canvas workflow tools', 'Proactive agentic inbox assistants'],
  'frutiger-aero': ['Nostalgic 2000s web revivals', 'Clean-tech & eco utility branding', 'Playful desktop widget collections'],
  'y2k-cyberpop': ['Electronic music & DJ merch drops', 'Streetwear lookbooks & Y2K promos', 'Interactive digital collectibles'],
  'pixel-retro': ['Indie game devlogs & storefronts', 'Gamified habit & XP trackers', 'Retro arcade & chiptune players'],
  'terminal-tui': ['Cloud infrastructure & DevOps consoles', 'Keyboard-driven developer tools', 'Live server telemetry monitors'],
  'cyberpunk-hud': ['Esports tournament broadcasts', 'Sci-fi game menus & companion apps', 'Futuristic security & threat maps'],
  'fui-hologram': ['Aerospace & robotics telemetry rigs', 'Sci-fi concept prototypes & reels', 'Autonomous vehicle diagnostics'],
  'synthwave-vaporwave': ['Synthwave album & tour promos', 'Retro-futuristic event microsites', 'Creative audio visualizers'],
  'swiss-international': ['Museum & exhibition catalogs', 'Financial & annual editorial reports', 'Typography-led architecture firms'],
  bauhaus: ['Design school & workshop portals', 'Cultural institution identities', 'Geometric poster & print shops'],
  'risograph-papercraft': ['Indie publishing & zine stores', 'Artisan coffee & craft packaging sites', 'Creative studio seasonal lookbooks'],
  'fluent-design': ['Windows desktop & productivity apps', 'Enterprise settings & file explorers', 'Adaptive multi-window suites'],
  'japandi-minimal': ['Wellness, tea & ceramic boutiques', 'Boutique hospitality & retreat booking', 'Calm mindful journaling apps'],
  'aurora-ui': ['Modern AI & cloud SaaS hero pages', 'Ambient wellness & sleep apps', 'Next-gen creative tool landing pages'],
};

const PILL_COLORS = ['#F9D649', '#FF90E8', '#60DFB2', '#93C5FD', '#C4B5FD'];

interface EvolutionEra {
  period: string;
  title: string;
  badge: string;
  color: string;
  summary: string;
  breakthroughs: string[];
  representativeStyles: string[];
}

const EVOLUTION_ERAS: EvolutionEra[] = [
  {
    period: '1984 – 2010',
    title: 'Physical Metaphors & Skeuomorphism',
    badge: 'ERA 01 · TEACH THE SCREEN',
    color: '#F9D649',
    summary:
      'Early GUIs borrowed real-world materials—folders, brushed metal, stitched leather, and glossy glass—so first-time users immediately understood what could be clicked, turned, or dragged.',
    breakthroughs: ['Desktop & trash-can metaphors', 'Specular Aqua & Aero gloss', 'Tactile skeuomorphic controls'],
    representativeStyles: ['Skeuomorphism', 'Frutiger Aero', 'Y2K Cyber-Pop'],
  },
  {
    period: '2012 – 2016',
    title: 'Flat, Swiss Grids & Material Systems',
    badge: 'ERA 02 · DIGITAL HONESTY',
    color: '#60DFB2',
    summary:
      'Once touchscreens became second nature, heavy textures gave way to crisp 2D planes, Swiss typographic hierarchy, and tokenized systems like Material Design built for multi-screen responsiveness.',
    breakthroughs: ['Design tokens & elevation scales', 'Mobile-first responsive grids', 'Vector iconography & clean motion'],
    representativeStyles: ['Flat Design', 'Material Design', 'Swiss / International Style'],
  },
  {
    period: '2017 – 2023',
    title: 'Glass, Bento & Neo-Brutalist Pop',
    badge: 'ERA 03 · DEPTH & PERSONALITY',
    color: '#FF90E8',
    summary:
      'To break free from sterile template uniformity, designers reintroduced subtle depth (frosted glass, soft clay, neumorphism) alongside modular Bento grids and unapologetic Neo-Brutalist contrast.',
    breakthroughs: ['Backdrop-filter blur layers', 'Modular Bento storytelling', 'Hard-shadow Neo-Brutalist personality'],
    representativeStyles: ['Glassmorphism', 'Bento Grid', 'Neo-Brutalism', 'Claymorphism'],
  },
  {
    period: '2024 – PRESENT',
    title: 'Spatial, Aurora & AI-Native Interfaces',
    badge: 'ERA 04 · AMBIENT & AGENTIC',
    color: '#93C5FD',
    summary:
      'Interfaces now adapt dynamically to context and intent: ambient Aurora mesh lighting, optical Liquid Glass, spatial 3D windows, and AI-Native canvases that synthesize UI on the fly.',
    breakthroughs: ['Intent-driven generative surfaces', 'Optical refraction & spatial depth', 'Calm adaptive color atmospheres'],
    representativeStyles: ['AI-Native UI', 'Spatial UI', 'Liquid Glass', 'Aurora UI'],
  },
];

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is the difference between UI and UX design?',
    answer:
      'UX (User Experience) focuses on the end-to-end journey—research, information architecture, user flows, and removing friction. UI (User Interface) is the visual and interactive surface—typography, color, layout, states, and micro-interactions—that brings that journey to life.',
  },
  {
    question: 'Why start with wireframes before picking a visual style?',
    answer:
      'Wireframes strip away color, fonts, and shadows so teams can validate hierarchy, content priority, and navigation flows cheaply. Once the blueprint works structurally, you can apply Neo-Brutalism, Material, or Glassmorphism without breaking usability.',
  },
  {
    question: 'When should a product use Neo-Brutalism vs Minimalism?',
    answer:
      'Use Neo-Brutalism when brand memorability, creator energy, and bold visual contrast matter (indie SaaS, portfolios, campaigns). Choose Minimalism or Japandi when long-form reading, calm focus, or high-trust luxury content takes center stage.',
  },
  {
    question: 'Can I explore and interact with every design style listed here?',
    answer:
      'Yes. Every single style in the directory below has a live interactive template page with working toggles, sliders, buttons, and layout demonstrations tailored to that paradigm.',
  },
];

const getStyleCategoryColor = (category: string): string => {
  const index = Math.abs(category.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)) % PILL_COLORS.length;
  return PILL_COLORS[index];
};

const Home = () => {
  const [selectedEraIndex, setSelectedEraIndex] = useState(0);
  const [wireframeMode, setWireframeMode] = useState<'lofi' | 'hifi'>('lofi');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stylesDropdownOpen, setStylesDropdownOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    if (!soundEnabled) {
      playTactileClick('click');
    }
    setSoundEnabled((prev) => !prev);
  };

  const handleSoundClick = (type: 'click' | 'toggle' | 'slider' | 'success') => {
    if (soundEnabled) {
      playTactileClick(type);
    }
  };

  const categories = useMemo(() => {
    const unique = Array.from(new Set(DESIGN_STYLES.map((style) => style.category)));
    return ['All', ...unique];
  }, []);

  const filteredStyles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return DESIGN_STYLES.filter((style) => {
      const matchesCategory = selectedCategory === 'All' || style.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      const useCases = (USE_CASES_BY_STYLE_ID[style.id] ?? []).join(' ').toLowerCase();
      return (
        style.name.toLowerCase().includes(query) ||
        style.tagline.toLowerCase().includes(query) ||
        style.description.toLowerCase().includes(query) ||
        style.category.toLowerCase().includes(query) ||
        style.keyCharacteristics.some((item) => item.toLowerCase().includes(query)) ||
        useCases.includes(query)
      );
    });
  }, [searchQuery, selectedCategory]);

  const activeEra = EVOLUTION_ERAS[selectedEraIndex];

  const scrollToSection = (id: string) => {
    handleSoundClick('click');
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#18181B] selection:bg-[#F9D649] selection:text-[#18181B]">
      {/* Top Neo-Brutalist Marquee / Ticker Strip */}
      <div className="border-b-2 border-[#18181B] bg-[#F9D649] px-4 py-2 overflow-hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 text-xs font-black uppercase tracking-[0.14em] text-[#18181B]">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#18181B] bg-white px-2.5 py-0.5 text-[11px] font-black">
              <Sparkles className="h-3.5 w-3.5 text-[#18181B]" />
              NEO-BRUTALIST EDITION
            </span>
            <span className="hidden sm:inline">DESIGN · EVOLUTION · UI · UX · WIREFRAMES · {DESIGN_STYLES.length} LIVE TEMPLATES</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleSound}
              className="inline-flex items-center gap-1.5 rounded-md border-2 border-[#18181B] bg-white px-2.5 py-0.5 text-[11px] font-black uppercase shadow-[2px_2px_0_#18181B] transition-transform hover:-translate-y-0.5 hover:bg-[#60DFB2]"
              title="Toggle tactile sound effects"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="h-3.5 w-3.5 text-[#18181B]" />
                  <span>Audio: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-3.5 w-3.5 text-zinc-500" />
                  <span className="text-zinc-600">Audio: OFF</span>
                </>
              )}
            </button>
            <span className="rounded-md border-2 border-[#18181B] bg-[#FF90E8] px-2 py-0.5 text-[11px] font-black uppercase shadow-[2px_2px_0_#18181B]">
              v2.0
            </span>
          </div>
        </div>
      </div>

      {/* Main Neo-Brutalist Sticky Navbar */}
      <header className="sticky top-0 z-40 border-b-2 border-[#18181B] bg-[#F4EFE6]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          {/* Brand Logo & Title */}
          <Link
            to="/"
            onClick={() => handleSoundClick('click')}
            className="group flex shrink-0 items-center gap-2.5 transition-transform hover:-translate-y-0.5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#18181B] bg-[#F9D649] font-black text-lg text-[#18181B] shadow-[2.5px_2.5px_0_#18181B] group-hover:bg-[#FF90E8] transition-colors">
              <Layers className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black uppercase tracking-tight text-[#18181B] leading-none">
                  Designverse
                </span>
                <span className="hidden sm:inline-flex items-center rounded-md border-2 border-[#18181B] bg-[#60DFB2] px-1.5 py-0.5 text-[10px] font-black uppercase shadow-[1.5px_1.5px_0_#18181B] leading-none">
                  {DESIGN_STYLES.length} Styles
                </span>
              </div>
              <p className="text-[11px] font-bold text-[#52525B] leading-tight mt-0.5">
                The Interactive UI &amp; UX Encyclopedia
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-2 shrink-0">
            {[
              { label: 'What is Design', target: 'what-is-design' },
              { label: 'UI · UX · Wireframes', target: 'pillars' },
              { label: 'Evolution', target: 'evolution' },
              { label: 'Directory', target: 'styles-directory' },
              { label: 'About Creator', target: 'creator' },
              { label: 'FAQ', target: 'faq' },
            ].map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => scrollToSection(item.target)}
                className="inline-flex h-9 items-center justify-center rounded-xl border-2 border-[#18181B] bg-white px-2.5 2xl:px-3 text-[11px] font-black uppercase tracking-wide text-[#18181B] shadow-[2px_2px_0_#18181B] transition-all hover:-translate-y-0.5 hover:bg-[#F9D649] hover:shadow-[3px_3px_0_#18181B] active:translate-y-0 active:shadow-none whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}

            {/* Quick Templates Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  handleSoundClick('toggle');
                  setStylesDropdownOpen((prev) => !prev);
                }}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border-2 border-[#18181B] bg-[#93C5FD] px-2.5 2xl:px-3 text-[11px] font-black uppercase tracking-wide text-[#18181B] shadow-[2px_2px_0_#18181B] transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#18181B] whitespace-nowrap"
                aria-expanded={stylesDropdownOpen}
              >
                <span>Jump to Style</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${stylesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {stylesDropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-80 max-h-[70vh] overflow-y-auto rounded-2xl border-2 border-[#18181B] bg-white p-2.5 shadow-[6px_6px_0_#18181B] z-50 divide-y divide-zinc-200"
                  onMouseLeave={() => setStylesDropdownOpen(false)}
                >
                  <div className="p-2 text-[10px] font-black uppercase tracking-widest text-[#71717A]">
                    Select a Template ({DESIGN_STYLES.length} Styles)
                  </div>
                  <div className="py-1">
                    {DESIGN_STYLES.map((st) => (
                      <Link
                        key={st.id}
                        to={st.route}
                        onClick={() => {
                          handleSoundClick('click');
                          setStylesDropdownOpen(false);
                        }}
                        className="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-bold text-[#18181B] hover:bg-[#F4EFE6] transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            style={{ backgroundColor: st.accentColor }}
                            className="h-3 w-3 rounded-full border border-[#18181B] shrink-0"
                          />
                          <span>{st.name}</span>
                        </div>
                        <span className="text-[10px] uppercase font-black text-zinc-500">
                          {st.category}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => scrollToSection('styles-directory')}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border-2 border-[#18181B] bg-[#F9D649] px-3 2xl:px-3.5 text-[11px] font-black uppercase tracking-wider text-[#18181B] shadow-[2px_2px_0_#18181B] transition-all hover:-translate-y-0.5 hover:bg-[#FF90E8] hover:shadow-[3px_3px_0_#18181B] whitespace-nowrap"
            >
              <span>Explore All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </nav>

          {/* Mobile & Tablet Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={() => {
                handleSoundClick('click');
                setMobileMenuOpen((prev) => !prev);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#18181B] bg-white shadow-[2.5px_2.5px_0_#18181B] active:translate-y-0.5"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-t-2 border-[#18181B] bg-white px-4 py-4 xl:hidden animate-in slide-in-from-top-2">
            <div className="space-y-2">
              {[
                { label: 'What is Design', target: 'what-is-design' },
                { label: 'UI · UX · Wireframes', target: 'pillars' },
                { label: 'Evolution of Design', target: 'evolution' },
                { label: 'Design Styles Directory', target: 'styles-directory' },
                { label: 'Creator Profile & Skills', target: 'creator' },
                { label: 'Frequently Asked Questions', target: 'faq' },
              ].map((item) => (
                <button
                  key={item.target}
                  type="button"
                  onClick={() => scrollToSection(item.target)}
                  className="flex w-full items-center justify-between rounded-xl border-2 border-[#18181B] bg-[#F4EFE6] px-4 py-2.5 text-xs font-black uppercase tracking-wide text-left shadow-[2px_2px_0_#18181B]"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#18181B]" />
                </button>
              ))}
            </div>

            <div className="mt-4 border-t-2 border-[#18181B] pt-4">
              <div className="mb-2 text-[11px] font-black uppercase text-[#52525B]">
                Quick Jump to Live Style:
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {DESIGN_STYLES.map((st) => (
                  <Link
                    key={st.id}
                    to={st.route}
                    onClick={() => {
                      handleSoundClick('click');
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 rounded-lg border border-[#18181B] bg-white px-2.5 py-1.5 text-[11px] font-bold text-[#18181B] truncate"
                  >
                    <span
                      style={{ backgroundColor: st.accentColor }}
                      className="h-2.5 w-2.5 rounded-full border border-[#18181B] shrink-0"
                    />
                    <span className="truncate">{st.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Band */}
      <section className="border-b-2 border-[#18181B] bg-[#F4EFE6] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-[#18181B] bg-[#FF90E8] px-3.5 py-1 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0_#18181B]">
              <Compass className="h-3.5 w-3.5" />
              THE COMPLETE UI / UX DESIGN ATLAS
            </div>

            <h1 className="text-4xl font-black uppercase leading-[0.98] tracking-tight text-[#18181B] sm:text-5xl lg:text-6xl">
              DESIGN IS HOW IDEAS BECOME USABLE REALITY.
            </h1>

            <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-[#27272A] sm:text-lg">
              Design is the intentional craft of organizing structure, behavior, and visual form to solve human problems.
              Explore how digital interfaces evolved from skeuomorphic hardware metaphors to AI-native canvases—and
              inspect <strong>{DESIGN_STYLES.length} interactive UI/UX design templates</strong> side by side.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToSection('styles-directory')}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#18181B] bg-[#F9D649] px-6 py-3.5 text-sm font-black uppercase tracking-wide text-[#18181B] shadow-[4px_4px_0_#18181B] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#18181B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                Explore {DESIGN_STYLES.length} Design Styles
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('pillars')}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#18181B] bg-white px-6 py-3.5 text-sm font-black uppercase tracking-wide text-[#18181B] shadow-[4px_4px_0_#18181B] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#60DFB2] hover:shadow-[6px_6px_0_#18181B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                UI vs UX &amp; Wireframes
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-extrabold uppercase tracking-wide">
              <span className="rounded-lg border-2 border-[#18181B] bg-white px-3 py-1.5 shadow-[2px_2px_0_#18181B]">
                {DESIGN_STYLES.length} Live Templates
              </span>
              <span className="rounded-lg border-2 border-[#18181B] bg-[#60DFB2] px-3 py-1.5 shadow-[2px_2px_0_#18181B]">
                Interactive Controls
              </span>
              <span className="rounded-lg border-2 border-[#18181B] bg-[#93C5FD] px-3 py-1.5 shadow-[2px_2px_0_#18181B]">
                4 Design Eras
              </span>
            </div>
          </div>

          {/* Right Sticker / Card Collage inspired by Neo-Brutalist PDF Hero */}
          <div className="relative lg:col-span-5">
            <div className="relative rounded-2xl border-2 border-[#18181B] bg-white p-6 shadow-[8px_8px_0_#18181B]">
              <div className="flex items-center justify-between border-b-2 border-[#18181B] pb-4">
                <span className="rounded-full border-2 border-[#18181B] bg-[#F9D649] px-3 py-1 text-xs font-black uppercase">
                  DESIGN STACK
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-[#18181B] bg-[#FF90E8]" />
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-[#18181B] bg-[#F9D649]" />
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-[#18181B] bg-[#60DFB2]" />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-xl border-2 border-[#18181B] bg-[#F4EFE6] p-3.5 shadow-[3px_3px_0_#18181B]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#18181B] bg-[#FF90E8]">
                      <PenTool className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-black uppercase">01. Wireframe</div>
                      <div className="text-xs font-semibold text-[#52525B]">Structure, flows &amp; layout</div>
                    </div>
                  </div>
                  <span className="rounded-md border-2 border-[#18181B] bg-white px-2 py-0.5 text-[11px] font-black">
                    BLUEPRINT
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border-2 border-[#18181B] bg-[#F4EFE6] p-3.5 shadow-[3px_3px_0_#18181B]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#18181B] bg-[#60DFB2]">
                      <Compass className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-black uppercase">02. UX Architecture</div>
                      <div className="text-xs font-semibold text-[#52525B]">Usability &amp; mental models</div>
                    </div>
                  </div>
                  <span className="rounded-md border-2 border-[#18181B] bg-white px-2 py-0.5 text-[11px] font-black">
                    JOURNEY
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border-2 border-[#18181B] bg-[#F4EFE6] p-3.5 shadow-[3px_3px_0_#18181B]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#18181B] bg-[#F9D649]">
                      <Palette className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-black uppercase">03. UI Surface</div>
                      <div className="text-xs font-semibold text-[#52525B]">Type, color, motion &amp; polish</div>
                    </div>
                  </div>
                  <span className="rounded-md border-2 border-[#18181B] bg-white px-2 py-0.5 text-[11px] font-black">
                    {DESIGN_STYLES.length} STYLES
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl border-2 border-[#18181B] bg-[#18181B] px-4 py-3 text-white">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                  <MousePointer2 className="h-4 w-4 text-[#F9D649]" />
                  Click any style card below to launch its live template
                </div>
                <Zap className="h-4 w-4 text-[#FF90E8]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White Editorial Pull-Quote Band: What is Design? */}
      <section id="what-is-design" className="border-b-2 border-[#18181B] bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <span className="inline-block rounded-full border-2 border-[#18181B] bg-[#93C5FD] px-3 py-1 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_#18181B]">
              WHAT IS DESIGN?
            </span>

            <div className="rounded-2xl border-2 border-[#18181B] bg-[#F4EFE6] p-5 shadow-[4px_4px_0_#18181B]">
              <h3 className="text-base font-black uppercase">Intentional Problem Solving</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#27272A]">
                Design is not just decoration applied at the end. It is the deliberate process of defining a goal,
                understanding constraints, structuring information, and shaping every visual cue so people accomplish
                tasks effortlessly.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-[#18181B] bg-[#F4EFE6] p-5 shadow-[4px_4px_0_#18181B]">
              <h3 className="text-base font-black uppercase">Form + Function in Balance</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#27272A]">
                Art asks questions; design answers them clearly. Whether a product adopts stark Swiss grids or playful
                Claymorphism, great design earns trust through clarity, hierarchy, accessibility, and consistency.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-6">
            <blockquote className="text-3xl font-black uppercase leading-[1.08] tracking-tight text-[#18181B] sm:text-4xl lg:text-5xl">
              “GOOD DESIGN IS OBVIOUS. GREAT DESIGN IS TRANSPARENT—IT GUIDES EVERY CLICK WITHOUT EVER ASKING THE USER TO
              GUESS.”
            </blockquote>
            <p className="mt-5 max-w-2xl text-base font-medium text-[#3F3F46]">
              Before choosing colors or shadows, designers align on three foundational disciplines: <strong>UX</strong>{' '}
              (how it works), <strong>Wireframes</strong> (how it is structured), and <strong>UI</strong> (how it looks
              and responds).
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToSection('evolution')}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#18181B] bg-[#F9D649] px-5 py-2.5 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0_#18181B] transition-transform hover:-translate-y-0.5"
              >
                See How Design Evolved
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                to="/neo-brutalism"
                onClick={() => playTactileClick('click')}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#18181B] bg-white px-5 py-2.5 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0_#18181B] transition-transform hover:-translate-y-0.5 hover:bg-[#FF90E8]"
              >
                Open Neo-Brutalism Template
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cream 3-Card Pillar Section: UI, UX, Wireframes + Interactive Lo-Fi / Hi-Fi Wireframe Switcher */}
      <section id="pillars" className="border-b-2 border-[#18181B] bg-[#F4EFE6] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-block rounded-full border-2 border-[#18181B] bg-[#60DFB2] px-3 py-1 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_#18181B]">
                CORE FOUNDATIONS
              </span>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-4xl">
                UI, UX &amp; WIREFRAMES EXPLAINED
              </h2>
            </div>
            <p className="max-w-md text-sm font-semibold text-[#3F3F46]">
              Every digital product moves from user intent (UX) to structural blueprint (Wireframes) to interactive visual
              craft (UI).
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* UI Design Card */}
            <article className="flex flex-col justify-between rounded-2xl border-2 border-[#18181B] bg-white p-6 shadow-[5px_5px_0_#18181B]">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-[#18181B] bg-[#F9D649] shadow-[2px_2px_0_#18181B]">
                    <Palette className="h-6 w-6" />
                  </div>
                  <span className="rounded-md border-2 border-[#18181B] bg-[#F4EFE6] px-2.5 py-1 text-[11px] font-black uppercase">
                    VISUAL LAYER
                  </span>
                </div>
                <h3 className="text-xl font-black uppercase">UI Design (User Interface)</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#27272A]">
                  The tangible visual surface users touch and see: typography scale, color systems, spacing rhythm,
                  buttons, inputs, icons, elevation, and micro-interaction states.
                </p>
              </div>
              <ul className="mt-5 space-y-2 border-t-2 border-[#18181B] pt-4 text-xs font-bold">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0" /> Color tokens &amp; contrast ratios
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0" /> Component states (hover, focus, disabled)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0" /> Aesthetic style (Glass, Swiss, Brutalist)
                </li>
              </ul>
            </article>

            {/* UX Design Card */}
            <article className="flex flex-col justify-between rounded-2xl border-2 border-[#18181B] bg-white p-6 shadow-[5px_5px_0_#18181B]">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-[#18181B] bg-[#60DFB2] shadow-[2px_2px_0_#18181B]">
                    <Compass className="h-6 w-6" />
                  </div>
                  <span className="rounded-md border-2 border-[#18181B] bg-[#F4EFE6] px-2.5 py-1 text-[11px] font-black uppercase">
                    EXPERIENCE LAYER
                  </span>
                </div>
                <h3 className="text-xl font-black uppercase">UX Design (User Experience)</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#27272A]">
                  The end-to-end human journey: user research, mental models, information architecture, accessibility, and
                  eliminating friction across every step of a task.
                </p>
              </div>
              <ul className="mt-5 space-y-2 border-t-2 border-[#18181B] pt-4 text-xs font-bold">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0" /> User flows &amp; task completion speed
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0" /> Information architecture &amp; navigation
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0" /> Usability testing &amp; error recovery
                </li>
              </ul>
            </article>

            {/* Wireframes Card */}
            <article className="flex flex-col justify-between rounded-2xl border-2 border-[#18181B] bg-white p-6 shadow-[5px_5px_0_#18181B]">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-[#18181B] bg-[#FF90E8] shadow-[2px_2px_0_#18181B]">
                    <Layout className="h-6 w-6" />
                  </div>
                  <span className="rounded-md border-2 border-[#18181B] bg-[#F4EFE6] px-2.5 py-1 text-[11px] font-black uppercase">
                    BLUEPRINT LAYER
                  </span>
                </div>
                <h3 className="text-xl font-black uppercase">Wireframes</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#27272A]">
                  Low- or mid-fidelity skeletal layouts that map screen hierarchy, content blocks, and navigation paths
                  before committing time to final visual styling.
                </p>
              </div>
              <ul className="mt-5 space-y-2 border-t-2 border-[#18181B] pt-4 text-xs font-bold">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0" /> Rapid iteration without color bias
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0" /> Clear content priority &amp; CTA placement
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0" /> Shared alignment for PMs, devs &amp; designers
                </li>
              </ul>
            </article>
          </div>

          {/* Interactive Wireframe vs Styled UI Preview */}
          <div className="mt-8 rounded-2xl border-2 border-[#18181B] bg-white p-6 shadow-[6px_6px_0_#18181B]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#18181B] pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#52525B]">
                  INTERACTIVE COMPARISON
                </span>
                <h3 className="text-lg font-black uppercase">
                  See How a Wireframe Evolves Into Final UI
                </h3>
              </div>
              <div className="inline-flex rounded-xl border-2 border-[#18181B] bg-[#F4EFE6] p-1">
                <button
                  type="button"
                  onClick={() => {
                    playTactileClick('toggle');
                    setWireframeMode('lofi');
                  }}
                  className={`rounded-lg px-4 py-1.5 text-xs font-black uppercase transition-colors ${wireframeMode === 'lofi' ? 'border-2 border-[#18181B] bg-[#F9D649]' : 'text-[#3F3F46]'
                    }`}
                >
                  Lo-Fi Wireframe
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playTactileClick('toggle');
                    setWireframeMode('hifi');
                  }}
                  className={`rounded-lg px-4 py-1.5 text-xs font-black uppercase transition-colors ${wireframeMode === 'hifi' ? 'border-2 border-[#18181B] bg-[#60DFB2]' : 'text-[#3F3F46]'
                    }`}
                >
                  Hi-Fi Neo-Brutalist UI
                </button>
              </div>
            </div>

            {wireframeMode === 'lofi' ? (
              <div className="mt-5 grid gap-4 md:grid-cols-12">
                <div className="rounded-xl border-2 border-dashed border-[#71717A] bg-[#FAFAFA] p-4 md:col-span-4">
                  <div className="h-4 w-24 rounded bg-[#D4D4D8]" />
                  <div className="mt-3 h-24 rounded border-2 border-dashed border-[#A1A1AA] bg-white flex items-center justify-center text-xs font-bold uppercase text-[#71717A]">
                    [ Media / Hero Box ]
                  </div>
                  <div className="mt-3 h-3 w-full rounded bg-[#E4E4E7]" />
                  <div className="mt-2 h-3 w-3/4 rounded bg-[#E4E4E7]" />
                </div>
                <div className="rounded-xl border-2 border-dashed border-[#71717A] bg-[#FAFAFA] p-4 md:col-span-8">
                  <div className="flex items-center justify-between">
                    <div className="h-5 w-40 rounded bg-[#D4D4D8]" />
                    <div className="h-7 w-24 rounded border-2 border-dashed border-[#71717A] bg-white text-center text-[11px] font-bold leading-6 text-[#52525B]">
                      [ CTA ]
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {['[ Card 01 ]', '[ Card 02 ]', '[ Card 03 ]'].map((slot) => (
                      <div
                        key={slot}
                        className="flex h-24 items-center justify-center rounded border-2 border-dashed border-[#A1A1AA] bg-white text-xs font-bold text-[#71717A]"
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-5 grid gap-4 md:grid-cols-12">
                <div className="rounded-xl border-2 border-[#18181B] bg-[#F9D649] p-4 shadow-[4px_4px_0_#18181B] md:col-span-4">
                  <span className="rounded-md border-2 border-[#18181B] bg-white px-2 py-0.5 text-[10px] font-black uppercase">
                    FEATURED MODULE
                  </span>
                  <div className="mt-3 flex h-24 items-center justify-center rounded-lg border-2 border-[#18181B] bg-white font-black uppercase text-sm">
                    Visual Identity Applied
                  </div>
                  <p className="mt-3 text-xs font-bold text-[#18181B]">
                    Color tokens, crisp 2px ink borders &amp; hard drop shadows clarify hierarchy.
                  </p>
                </div>
                <div className="rounded-xl border-2 border-[#18181B] bg-[#F4EFE6] p-4 shadow-[4px_4px_0_#18181B] md:col-span-8">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-black uppercase">Actionable Dashboard Grid</h4>
                    <span className="rounded-lg border-2 border-[#18181B] bg-[#FF90E8] px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0_#18181B]">
                      Primary CTA
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      { label: 'Conversion', val: '+38%', bg: '#60DFB2' },
                      { label: 'Clarity Score', val: '98/100', bg: '#93C5FD' },
                      { label: 'Time to Task', val: '1.4s', bg: '#C4B5FD' },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        style={{ backgroundColor: stat.bg }}
                        className="flex h-24 flex-col justify-between rounded-lg border-2 border-[#18181B] p-3 shadow-[3px_3px_0_#18181B]"
                      >
                        <span className="text-[11px] font-black uppercase">{stat.label}</span>
                        <span className="text-2xl font-black">{stat.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Evolution of Design Section */}
      <section id="evolution" className="border-b-2 border-[#18181B] bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#18181B] bg-[#C4B5FD] px-3 py-1 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_#18181B]">
                <Clock className="h-3.5 w-3.5" />
                EVOLUTION OF DESIGN
              </span>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-4xl">
                40 YEARS OF INTERFACE EVOLUTION
              </h2>
            </div>
            <p className="max-w-md text-sm font-semibold text-[#3F3F46]">
              Select any era to see why visual trends shifted—and which paradigms carried forward into modern apps.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            {/* Era Selector List */}
            <div className="space-y-3 lg:col-span-5">
              {EVOLUTION_ERAS.map((era, index) => {
                const isSelected = index === selectedEraIndex;
                return (
                  <button
                    key={era.period}
                    type="button"
                    onClick={() => {
                      playTactileClick('click');
                      setSelectedEraIndex(index);
                    }}
                    style={isSelected ? { backgroundColor: era.color } : undefined}
                    className={`w-full rounded-xl border-2 border-[#18181B] p-4 text-left transition-all ${isSelected
                      ? 'shadow-[5px_5px_0_#18181B] -translate-y-0.5'
                      : 'bg-[#F4EFE6] hover:bg-white hover:shadow-[3px_3px_0_#18181B]'
                      }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black uppercase tracking-wider">{era.period}</span>
                      <span className="rounded-md border-2 border-[#18181B] bg-white px-2 py-0.5 text-[10px] font-black">
                        {era.badge}
                      </span>
                    </div>
                    <div className="mt-1.5 text-base font-black uppercase">{era.title}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Era Detail Card */}
            <div className="lg:col-span-7">
              <div
                style={{ backgroundColor: activeEra.color }}
                className="h-full rounded-2xl border-2 border-[#18181B] p-6 shadow-[6px_6px_0_#18181B] sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full border-2 border-[#18181B] bg-white px-3 py-1 text-xs font-black uppercase">
                    {activeEra.period}
                  </span>
                  <span className="text-xs font-black uppercase tracking-widest">{activeEra.badge}</span>
                </div>

                <h3 className="mt-4 text-2xl font-black uppercase sm:text-3xl">{activeEra.title}</h3>
                <p className="mt-3 text-base font-semibold leading-relaxed text-[#18181B]">{activeEra.summary}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border-2 border-[#18181B] bg-white p-4 shadow-[3px_3px_0_#18181B]">
                    <div className="text-xs font-black uppercase tracking-wider text-[#52525B]">
                      KEY BREAKTHROUGHS
                    </div>
                    <ul className="mt-2.5 space-y-2 text-sm font-bold">
                      {activeEra.breakthroughs.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border-2 border-[#18181B] bg-white p-4 shadow-[3px_3px_0_#18181B]">
                    <div className="text-xs font-black uppercase tracking-wider text-[#52525B]">
                      REPRESENTATIVE STYLES
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {activeEra.representativeStyles.map((styleName) => (
                        <span
                          key={styleName}
                          className="rounded-lg border-2 border-[#18181B] bg-[#F4EFE6] px-2.5 py-1 text-xs font-black"
                        >
                          {styleName}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Design Styles Directory */}
      <section id="styles-directory" className="border-b-2 border-[#18181B] bg-[#F4EFE6] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#18181B] bg-[#F9D649] px-3 py-1 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_#18181B]">
                <Grid className="h-3.5 w-3.5" />
                STYLE DIRECTORY ({filteredStyles.length} / {DESIGN_STYLES.length})
              </span>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-4xl">
                ALL {DESIGN_STYLES.length} UI / UX DESIGN STYLES
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#18181B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search style, trait, or use case..."
                aria-label="Search design styles"
                className="w-full rounded-xl border-2 border-[#18181B] bg-white py-2.5 pl-10 pr-4 text-sm font-bold text-[#18181B] placeholder:text-[#71717A] shadow-[3px_3px_0_#18181B] focus:bg-[#FFFBEB] focus:outline-none"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    playTactileClick('click');
                    setSelectedCategory(category);
                  }}
                  className={`rounded-full border-2 border-[#18181B] px-3.5 py-1.5 text-xs font-black uppercase tracking-wide transition-all ${active
                    ? 'bg-[#18181B] text-[#F9D649] shadow-[3px_3px_0_#FF90E8]'
                    : 'bg-white text-[#18181B] hover:-translate-y-0.5 hover:bg-[#F9D649] shadow-[2px_2px_0_#18181B]'
                    }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Styles Grid */}
          {filteredStyles.length === 0 ? (
            <div className="mt-8 rounded-2xl border-2 border-[#18181B] bg-white p-10 text-center shadow-[5px_5px_0_#18181B]">
              <p className="text-lg font-black uppercase">No design styles matched "{searchQuery}"</p>
              <button
                type="button"
                onClick={() => {
                  playTactileClick('click');
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 rounded-xl border-2 border-[#18181B] bg-[#F9D649] px-5 py-2 text-xs font-black uppercase shadow-[3px_3px_0_#18181B]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredStyles.map((style: DesignStyle, idx: number) => {
                const categoryColor = getStyleCategoryColor(style.category);
                const useCases = USE_CASES_BY_STYLE_ID[style.id] ?? [
                  'Interactive web applications',
                  'Brand storytelling landing pages',
                  'Custom design system showcases',
                ];
                const indexLabel = String(idx + 1).padStart(2, '0');

                return (
                  <article
                    key={style.id}
                    className="flex flex-col justify-between rounded-2xl border-2 border-[#18181B] bg-white p-6 shadow-[5px_5px_0_#18181B] transition-transform hover:-translate-y-1"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span
                          style={{ backgroundColor: categoryColor }}
                          className="rounded-full border-2 border-[#18181B] px-3 py-0.5 text-[11px] font-black uppercase"
                        >
                          {style.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            style={{ backgroundColor: style.accentColor }}
                            className="h-4 w-4 rounded-full border-2 border-[#18181B]"
                            title={`Accent ${style.accentColor}`}
                          />
                          <span className="font-mono text-xs font-black text-[#52525B]">#{indexLabel}</span>
                        </div>
                      </div>

                      <h3 className="mt-4 text-xl font-black uppercase tracking-tight">{style.name}</h3>
                      <p className="mt-1 text-xs font-bold text-[#52525B]">{style.tagline}</p>

                      {/* Explanation */}
                      <div className="mt-4 rounded-xl border-2 border-[#18181B] bg-[#F4EFE6] p-3.5">
                        <div className="text-[10px] font-black uppercase tracking-wider text-[#52525B]">
                          EXPLANATION
                        </div>
                        <p className="mt-1 text-xs font-medium leading-relaxed text-[#18181B]">{style.description}</p>
                      </div>

                      {/* Core Visual Characteristics */}
                      <div className="mt-4">
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#52525B]">
                          <Layers className="h-3.5 w-3.5" />
                          CORE VISUAL CHARACTERISTICS
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {style.keyCharacteristics.map((trait) => (
                            <span
                              key={trait}
                              className="rounded-md border border-[#18181B] bg-[#FAFAFA] px-2 py-0.5 text-[11px] font-bold text-[#18181B]"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Common Use Cases */}
                      <div className="mt-4">
                        <div className="text-[10px] font-black uppercase tracking-wider text-[#52525B]">
                          COMMON USE CASES
                        </div>
                        <ul className="mt-1.5 space-y-1 text-xs font-semibold text-[#27272A]">
                          {useCases.map((useCase) => (
                            <li key={useCase} className="flex items-start gap-1.5">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#18181B]" />
                              <span>{useCase}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Template Action Button */}
                    <div className="mt-6 border-t-2 border-[#18181B] pt-4">
                      <Link
                        to={style.route}
                        onClick={() => playTactileClick('click')}
                        className="flex w-full items-center justify-between rounded-xl border-2 border-[#18181B] bg-[#F9D649] px-4 py-2.5 text-xs font-black uppercase tracking-wide text-[#18181B] shadow-[3px_3px_0_#18181B] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#FF90E8] hover:shadow-[4px_4px_0_#18181B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                      >
                        <span>View {style.name} Template</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Creator & Skills Neo-Brutalist Showcase Section */}
      <section id="creator" className="border-b-2 border-[#18181B] bg-[#F4EFE6] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Left Bio Card */}
            <div className="lg:col-span-5 rounded-2xl border-2 border-[#18181B] bg-white p-6 sm:p-8 shadow-[6px_6px_0_#18181B]">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#18181B] bg-[#FF90E8] px-3 py-1 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_#18181B]">
                  <User className="h-3.5 w-3.5" />
                  ARCHITECT &amp; AUTHOR
                </span>
                <span className="rounded-md border-2 border-[#18181B] bg-[#60DFB2] px-2.5 py-0.5 text-[11px] font-black uppercase">
                  3+ YRS EXP
                </span>
              </div>

              <div className="mt-5">
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#18181B]">
                  Naveen Vellingiri
                </h3>
                <p className="mt-1 text-sm font-bold text-[#18181B] uppercase tracking-wide flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-[#18181B]" />
                  Frontend Developer with 3+ yrs experiences
                </p>
              </div>

              <div className="mt-4 rounded-xl border-2 border-[#18181B] bg-[#F9D649] p-4 shadow-[3px_3px_0_#18181B]">
                <p className="text-xs font-black uppercase tracking-wider text-[#18181B]">
                  THINKED, DESIGNED AND CREATED BY NAVEEN VELLINGIRI
                </p>
                <p className="mt-1.5 text-xs font-semibold leading-relaxed text-[#18181B]">
                  Crafting resilient digital products that bridge high-impact UI/UX aesthetics with production-grade engineering across 27 interactive design paradigms.
                </p>
              </div>

              {/* Social / Portfolio Links */}
              <div className="mt-6 border-t-2 border-[#18181B] pt-5">
                <div className="text-[11px] font-black uppercase tracking-wider text-[#52525B] mb-3">
                  CONNECT &amp; EXPLORE WORK
                </div>
                <div className="flex flex-col gap-2.5">
                  <a
                    href="https://github.com/naveen42266"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSoundClick('click')}
                    className="flex items-center justify-between rounded-xl border-2 border-[#18181B] bg-white px-4 py-2.5 text-xs font-black uppercase text-[#18181B] shadow-[3px_3px_0_#18181B] transition-transform hover:-translate-y-0.5 hover:bg-[#60DFB2]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Github className="h-4 w-4" />
                      <span>GitHub: @naveen42266</span>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href="https://linkedin.com/in/neevanv"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSoundClick('click')}
                    className="flex items-center justify-between rounded-xl border-2 border-[#18181B] bg-white px-4 py-2.5 text-xs font-black uppercase text-[#18181B] shadow-[3px_3px_0_#18181B] transition-transform hover:-translate-y-0.5 hover:bg-[#93C5FD]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Linkedin className="h-4 w-4" />
                      <span>LinkedIn: Naveen Vellingiri</span>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href="https://vnaveen.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSoundClick('click')}
                    className="flex items-center justify-between rounded-xl border-2 border-[#18181B] bg-white px-4 py-2.5 text-xs font-black uppercase text-[#18181B] shadow-[3px_3px_0_#18181B] transition-transform hover:-translate-y-0.5 hover:bg-[#FF90E8]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className="h-4 w-4" />
                      <span>Portfolio: vnaveen.netlify.app</span>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Technical Skills Stack */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#18181B] bg-[#93C5FD] px-3 py-1 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_#18181B]">
                    <Code2 className="h-3.5 w-3.5" />
                    PROFESSIONAL TOOLKIT
                  </span>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#18181B]">
                    TECHNICAL SKILLS &amp; STACK
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#52525B] uppercase">
                  Full Stack Capable
                </span>
              </div>

              {/* Skill Category 1 */}
              <div className="rounded-2xl border-2 border-[#18181B] bg-white p-5 shadow-[4px_4px_0_#18181B]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#F9D649] border border-[#18181B]" />
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#18181B]">
                      Core Frontend &amp; Frameworks
                    </h4>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded border border-[#18181B] bg-[#F4EFE6]">
                    Primary
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['REACT.JS', 'NEXT.JS', 'TYPESCRIPT'].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-xl border-2 border-[#18181B] bg-[#F9D649] px-3.5 py-1.5 text-xs font-black tracking-wide text-[#18181B] shadow-[2px_2px_0_#18181B]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skill Category 2 */}
              <div className="rounded-2xl border-2 border-[#18181B] bg-white p-5 shadow-[4px_4px_0_#18181B]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#FF90E8] border border-[#18181B]" />
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#18181B]">
                      Design Systems &amp; Styling
                    </h4>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded border border-[#18181B] bg-[#F4EFE6]">
                    UI / Styling
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['TAILWIND CSS', 'MATERIAL UI', 'SCSS', 'HTML5 & CSS3'].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-xl border-2 border-[#18181B] bg-[#FF90E8] px-3 py-1.5 text-xs font-black tracking-wide text-[#18181B] shadow-[2px_2px_0_#18181B]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skill Category 3 */}
              <div className="rounded-2xl border-2 border-[#18181B] bg-white p-5 shadow-[4px_4px_0_#18181B]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#60DFB2] border border-[#18181B]" />
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#18181B]">
                      State Management &amp; Mobile
                    </h4>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded border border-[#18181B] bg-[#F4EFE6]">
                    Architecture
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['REDUX & REDUX TOOLKIT', 'REACT NATIVE', 'JAVASCRIPT ES6+'].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-xl border-2 border-[#18181B] bg-[#60DFB2] px-3 py-1.5 text-xs font-black tracking-wide text-[#18181B] shadow-[2px_2px_0_#18181B]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skill Category 4 */}
              <div className="rounded-2xl border-2 border-[#18181B] bg-white p-5 shadow-[4px_4px_0_#18181B]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#93C5FD] border border-[#18181B]" />
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#18181B] flex items-center gap-1.5">
                      <Database className="h-3.5 w-3.5" />
                      Backend &amp; Databases
                    </h4>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded border border-[#18181B] bg-[#F4EFE6]">
                    Data &amp; APIs
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['NODE.JS', 'EXPRESS', 'JAVA', 'SPRING BOOT', 'MONGO', 'SQL'].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-xl border-2 border-[#18181B] bg-[#93C5FD] px-3 py-1.5 text-xs font-black tracking-wide text-[#18181B] shadow-[2px_2px_0_#18181B]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Band (PDF Style: Sticky Left Title + Right Ruled Rows) */}
      <section id="faq" className="border-b-2 border-[#18181B] bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-8">
              <span className="inline-block rounded-full border-2 border-[#18181B] bg-[#FF90E8] px-3 py-1 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_#18181B]">
                QUESTIONS &amp; CLARITY
              </span>
              <h2 className="mt-4 text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl">
                FREQUENTLY ASKED QUESTIONS
              </h2>
              <p className="mt-3 text-sm font-medium text-[#52525B]">
                Quick answers on how UI, UX, wireframing, and visual design styles fit together in real projects.
              </p>
            </div>
          </div>

          <div className="divide-y-2 divide-[#18181B] border-y-2 border-[#18181B] lg:col-span-7">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={item.question} className="py-5">
                  <button
                    type="button"
                    onClick={() => {
                      playTactileClick('toggle');
                      setOpenFaqIndex(isOpen ? null : index);
                    }}
                    className="flex w-full items-center justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-black uppercase tracking-tight sm:text-lg">{item.question}</span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#18181B] transition-transform ${isOpen ? 'rotate-45 bg-[#F9D649]' : 'bg-[#F4EFE6]'
                        }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-3 pr-10 text-sm font-medium leading-relaxed text-[#3F3F46]">{item.answer}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Warm Cream Neo-Brutalist Footer */}
      <footer className="bg-[#F4EFE6] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 rounded-2xl border-2 border-[#18181B] bg-[#F9D649] p-6 shadow-[6px_6px_0_#18181B] md:flex-row md:items-center md:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md border-2 border-[#18181B] bg-white px-2.5 py-1 text-[11px] font-black uppercase">
                UI / UX DESIGN PLAYGROUND
              </span>
              <span className="rounded-md border-2 border-[#18181B] bg-[#FF90E8] px-2.5 py-1 text-[11px] font-black uppercase">
                BY NAVEEN VELLINGIRI
              </span>
            </div>
            <h2 className="mt-3 text-2xl font-black uppercase tracking-tight sm:text-3xl text-[#18181B]">
              THINKED, DESIGNED AND CREATED BY NAVEEN VELLINGIRI
            </h2>
            <p className="mt-1.5 text-sm font-bold text-[#18181B]">
              Frontend Developer with 3+ yrs experiences · React / Next.js / TypeScript / Full Stack
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-black uppercase">
              <a
                href="https://github.com/naveen42266"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSoundClick('click')}
                className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#18181B] bg-white px-3 py-1 shadow-[2px_2px_0_#18181B] hover:bg-[#60DFB2]"
              >
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/neevanv"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSoundClick('click')}
                className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#18181B] bg-white px-3 py-1 shadow-[2px_2px_0_#18181B] hover:bg-[#93C5FD]"
              >
                <Linkedin className="h-3.5 w-3.5" /> LinkedIn
              </a>
              <a
                href="https://vnaveen.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSoundClick('click')}
                className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#18181B] bg-white px-3 py-1 shadow-[2px_2px_0_#18181B] hover:bg-[#FF90E8]"
              >
                <Globe className="h-3.5 w-3.5" /> Portfolio
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/skeuomorphism"
              onClick={() => handleSoundClick('click')}
              className="rounded-xl border-2 border-[#18181B] bg-white px-4 py-2.5 text-xs font-black uppercase shadow-[3px_3px_0_#18181B] hover:bg-[#60DFB2]"
            >
              Skeuomorphism
            </Link>
            <Link
              to="/neumorphism"
              onClick={() => handleSoundClick('click')}
              className="rounded-xl border-2 border-[#18181B] bg-white px-4 py-2.5 text-xs font-black uppercase shadow-[3px_3px_0_#18181B] hover:bg-[#FF90E8]"
            >
              Neumorphism
            </Link>
            <Link
              to="/aurora-ui"
              onClick={() => handleSoundClick('click')}
              className="rounded-xl border-2 border-[#18181B] bg-white px-4 py-2.5 text-xs font-black uppercase shadow-[3px_3px_0_#18181B] hover:bg-[#93C5FD]"
            >
              Aurora UI
            </Link>
            <button
              type="button"
              onClick={() => {
                handleSoundClick('click');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="rounded-xl border-2 border-[#18181B] bg-[#18181B] px-4 py-2.5 text-xs font-black uppercase text-white shadow-[3px_3px_0_#FFFFFF]"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
