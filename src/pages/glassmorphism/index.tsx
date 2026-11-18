import React, { useState, useRef } from 'react';
import {
  Mail,
  Eye,
  EyeOff,
  Plus,
  Share2,
  ChevronDown,
  Download,
  Home,
  Calendar,
  Bell,
  Settings,
  ArrowUp,
  Check,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const Glassmorphism: React.FC = () => {
  // Backdrop Theme Mode: 'prism' (vibrant daylight crystal like Aesthetics Wiki) vs 'sapphire' (deep blue glass)
  const [glassMode, setGlassMode] = useState<'prism' | 'sapphire'>('prism');
  const isLight = glassMode === 'prism';

  // Login Form States
  const [email, setEmail] = useState('username@mail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  // Quick Navigation Active Tab
  const [activeNav, setActiveNav] = useState<'home' | 'calender' | 'notification' | 'setting'>('home');

  // Toggle Switch State
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  // Main Slider Value (71% default as in sample.jpg)
  const [sliderValue, setSliderValue] = useState(71);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Buttons State
  const [friendCount, setFriendCount] = useState(14);
  const [category, setCategory] = useState('Select Category');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);

  // Mountain Chart Bottom Slider
  const [chartTimeline, setChartTimeline] = useState(65);

  // Timeline Stepper Year
  const [activeYear, setActiveYear] = useState<2019 | 2020 | 2021 | 2022>(2019);

  // Notification Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const handleAction = (type: 'click' | 'toggle' | 'slider' | 'success', fn?: () => void) => {
    playTactileClick(type);
    if (fn) fn();
  };

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.round(Math.min(Math.max((clickX / rect.width) * 100, 5), 95));
    setSliderValue(percent);
    playTactileClick('slider');
  };

  const handleDownload = () => {
    handleAction('click');
    if (downloadProgress !== null) return;
    setDownloadProgress(10);
    triggerToast('Streaming frosted asset bundle...');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('Download complete: UI-Kit-Glass.zip');
          setTimeout(() => setDownloadProgress(null), 1500);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const categories = ['Dashboard Design', 'Mobile Components', 'Tactile UI Kits', 'Design Tokens'];

  // Theme class shortcuts
  const panelCls = isLight ? 'glass-panel' : 'glass-panel-dark';
  const pillCls = isLight ? 'glass-pill' : 'glass-pill-dark';
  const insetCls = isLight ? 'glass-inset' : 'glass-inset-dark';
  const textMain = isLight ? 'text-[#1e1b4b]' : 'text-white';
  const textSub = isLight ? 'text-[#4338ca]/80' : 'text-white/70';
  const textMuted = isLight ? 'text-[#4f46e5]/70' : 'text-white/55';

  return (
    <div
      className={`w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen relative overflow-hidden transition-colors duration-500 ${textMain}`}
      style={{
        background: isLight
          ? 'linear-gradient(135deg, #60a5fa 0%, #818cf8 34%, #c084fc 68%, #f472b6 100%)'
          : 'radial-gradient(circle at 20% 15%, #1d4ed8 0%, #0f172a 55%, #020617 100%)',
      }}
    >
      {/* Subtle Etched-Glass Micro-Noise Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.85%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")',
        }}
      />

      {/* ========================================================================
          SHARP 3D SPHERES & LUMINOUS DISCS BEHIND THE FROSTED PANELS
          (Positioned so their curved edges visibly refract behind card borders!)
         ======================================================================== */}
      {isLight ? (
        <>
          {/* Top-left bright cyan-to-white 3D sphere */}
          <div
            className="pointer-events-none absolute top-14 left-[8%] w-56 h-56 rounded-full shadow-2xl"
            style={{
              background: 'radial-gradient(circle at 30% 28%, #ffffff 0%, #67e8f9 42%, #2563eb 100%)',
            }}
          />
          {/* Center top luminous white-aqua sphere peeking behind Nav & Mini-Graph */}
          <div
            className="pointer-events-none absolute top-20 left-[44%] w-64 h-64 rounded-full"
            style={{
              background: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #a5f3fc 45%, #6366f1 100%)',
            }}
          />
          {/* Right coral-pink-peach 3D sphere peeking behind Gauge & Mountain cards */}
          <div
            className="pointer-events-none absolute top-[40%] right-[4%] w-72 h-72 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 28%, #fff1f2 0%, #fda4af 45%, #ec4899 100%)',
            }}
          />
          {/* Bottom-left soft lavender-white sphere behind Action pills */}
          <div
            className="pointer-events-none absolute bottom-16 left-[18%] w-60 h-60 rounded-full"
            style={{
              background: 'radial-gradient(circle at 32% 30%, #ffffff 0%, #ddd6fe 50%, #7c3aed 100%)',
            }}
          />
          {/* Bottom-center-right crisp mint-cyan accent orb behind Timeline */}
          <div
            className="pointer-events-none absolute -bottom-10 right-[26%] w-52 h-52 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 25%, #ecfeff 0%, #5eead4 50%, #0284c7 100%)',
            }}
          />
        </>
      ) : (
        <>
          {/* Deep Sapphire 3D floating spheres */}
          <div
            className="pointer-events-none absolute top-16 left-[9%] w-60 h-60 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 28%, #93c5fd 0%, #2563eb 52%, #0f172a 100%)',
            }}
          />
          <div
            className="pointer-events-none absolute top-24 left-[46%] w-64 h-64 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 28%, #67e8f9 0%, #0284c7 55%, #082f49 100%)',
            }}
          />
          <div
            className="pointer-events-none absolute top-[42%] right-[6%] w-72 h-72 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 28%, #f0abfc 0%, #7e22ce 55%, #1e1b4b 100%)',
            }}
          />
          <div
            className="pointer-events-none absolute bottom-16 left-[20%] w-56 h-56 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 28%, #a5b4fc 0%, #4338ca 55%, #0f172a 100%)',
            }}
          />
        </>
      )}

      {/* Frosted Glass Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl ${panelCls} animate-in fade-in slide-in-from-bottom-3 duration-200`}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-ping" />
          <span className={`text-xs font-bold ${textMain}`}>{toastMessage}</span>
        </div>
      )}

      {/* Main Container matching sample.jpg layout */}
      <div className="max-w-[1140px] mx-auto relative z-10">
        
        {/* Style Paradigm Banner + Backdrop Theme Switcher */}
        <div className={`mb-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:px-6 rounded-[28px] ${panelCls}`}>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${
                isLight
                  ? 'bg-white/60 text-indigo-800 border-white/80'
                  : 'bg-white/15 text-cyan-200 border-white/30'
              }`}
            >
              Style: Glassmorphism
            </span>
            <span className={`text-xs font-semibold ${textSub}`}>
              Frosted translucent panels, crisp 3D orbs refracting behind edges & specular light glints.
            </span>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Prism Sky / Deep Sapphire Switcher */}
            <div className={`p-1 rounded-full ${insetCls} flex items-center gap-1`}>
              <button
                type="button"
                onClick={() => handleAction('click', () => setGlassMode('prism'))}
                className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isLight ? 'glass-blue text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Prism Sky</span>
              </button>
              <button
                type="button"
                onClick={() => handleAction('click', () => setGlassMode('sapphire'))}
                className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  !isLight ? 'glass-blue text-white' : 'text-indigo-900/75 hover:text-indigo-950'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Sapphire</span>
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Grid Layout matching sample.jpg */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-start">
          
          {/* =========================================
              LEFT COLUMN (Login Card + 4 Action Pills)
             ========================================= */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* LOGIN FROSTED GLASS CARD */}
            <div className={`${panelCls} rounded-[38px] p-7 sm:p-9 relative overflow-hidden`}>
              {/* Diagonal Specular Light Reflection */}
              <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-gradient-to-br from-white/40 via-white/10 to-transparent rotate-12 rounded-full blur-xl" />

              <div className="mb-7 flex items-center justify-between relative z-10">
                <h2 className={`text-2xl sm:text-[28px] font-extrabold tracking-tight ${textMain}`}>
                  Login
                </h2>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/30 border border-white/50">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  <span className={`text-[10px] font-bold ${textMain}`}>SSL</span>
                </div>
              </div>

              {/* Username Input Field */}
              <div className="mb-5 relative z-10">
                <div className={`${insetCls} rounded-2xl px-4 py-3 flex items-center justify-between gap-2`}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="username@mail.com"
                    className={`w-full bg-transparent text-sm focus:outline-none font-semibold ${
                      isLight ? 'text-[#1e1b4b] placeholder-[#4f46e5]/45' : 'text-white placeholder-white/45'
                    }`}
                  />
                  <div className={`w-7 h-7 rounded-xl ${pillCls} flex items-center justify-center flex-shrink-0`}>
                    <Mail className={`w-3.5 h-3.5 ${isLight ? 'text-indigo-700' : 'text-cyan-200'}`} />
                  </div>
                </div>
              </div>

              {/* Password Input Field */}
              <div className="mb-5 relative z-10">
                <div className={`${insetCls} rounded-2xl px-4 py-3 flex items-center justify-between gap-2`}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className={`w-full bg-transparent text-sm focus:outline-none font-semibold tracking-wider ${
                      isLight ? 'text-[#1e1b4b] placeholder-[#4f46e5]/45' : 'text-white placeholder-white/45'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleAction('click');
                      setShowPassword(!showPassword);
                    }}
                    className={`w-7 h-7 rounded-xl ${pillCls} flex items-center justify-center flex-shrink-0 cursor-pointer transition-transform hover:scale-105`}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className={`w-3.5 h-3.5 ${isLight ? 'text-indigo-700' : 'text-cyan-200'}`} />
                    ) : (
                      <Eye className={`w-3.5 h-3.5 ${isLight ? 'text-indigo-700' : 'text-cyan-200'}`} />
                    )}
                  </button>
                </div>
              </div>

              {/* Forget Password Link */}
              <div className="mb-8 px-1 relative z-10">
                <button
                  type="button"
                  onClick={() => {
                    handleAction('click');
                    triggerToast('Password reset link sent to ' + email);
                  }}
                  className={`text-xs underline underline-offset-4 font-bold transition-colors cursor-pointer ${
                    isLight ? 'text-indigo-900/75 hover:text-blue-700' : 'text-white/75 hover:text-cyan-200'
                  }`}
                >
                  Forget Password?
                </button>
              </div>

              {/* Frosted Glowing "Sign Up" Glass Pill Button */}
              <div className="flex justify-center -mb-2 relative z-10">
                <button
                  type="button"
                  onClick={() => {
                    handleAction('success', () => {
                      setIsSignedUp(true);
                      triggerToast('Welcome! Glass portal unlocked.');
                      setTimeout(() => setIsSignedUp(false), 2500);
                    });
                  }}
                  className="w-48 h-[52px] rounded-full glass-blue text-white font-bold text-base tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer hover:brightness-110 active:scale-95 relative overflow-hidden"
                >
                  {/* Glossy Top Crystal Rim */}
                  <div className="pointer-events-none absolute top-0 left-3 right-3 h-1/2 rounded-t-full bg-gradient-to-b from-white/40 to-transparent" />
                  {isSignedUp ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3] relative z-10" />
                      <span className="relative z-10">Done!</span>
                    </>
                  ) : (
                    <span className="relative z-10">Sign Up</span>
                  )}
                </button>
              </div>
            </div>

            {/* VERTICAL BUTTON STACK (4 Frosted Glass Pill Buttons with Jewel Badges) */}
            <div className="flex flex-col gap-4">
              
              {/* 1. Add Friend Glass Pill */}
              <div
                onClick={() => {
                  handleAction('click', () => {
                    setFriendCount((c) => c + 1);
                    triggerToast(`Friend added! (${friendCount + 1} friends)`);
                  });
                }}
                className={`h-16 rounded-full ${pillCls} flex items-center px-3.5 gap-4 cursor-pointer transition-all group`}
              >
                <div className="w-10 h-10 rounded-full glass-blue text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Plus className="w-5 h-5 stroke-[2.8]" />
                </div>
                <div className="flex items-center justify-between flex-1 pr-2">
                  <span className={`text-sm font-bold ${textMain}`}>Add Friend</span>
                  <span
                    className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${insetCls} ${
                      isLight ? 'text-indigo-800' : 'text-cyan-200'
                    }`}
                  >
                    {friendCount}
                  </span>
                </div>
              </div>

              {/* 2. Share Glass Pill */}
              <div
                onClick={() => {
                  handleAction('click', () => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                    }
                    triggerToast('Link copied to clipboard!');
                  });
                }}
                className={`h-16 rounded-full ${pillCls} flex items-center px-3.5 gap-4 cursor-pointer transition-all group`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400/80 to-rose-500/90 border border-white/60 shadow-[0_6px_16px_rgba(244,63,94,0.35)] flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                  <Share2 className="w-4 h-4 stroke-[2.4]" />
                </div>
                <span className={`text-sm font-bold ${textMain}`}>Share</span>
              </div>

              {/* 3. Select Category Glass Pill (with Floating Frosted Dropdown) */}
              <div className="relative">
                <div
                  onClick={() => {
                    handleAction('click', () => setIsCategoryOpen(!isCategoryOpen));
                  }}
                  className={`h-16 rounded-full ${pillCls} flex items-center justify-between px-5 cursor-pointer transition-all`}
                >
                  <span className={`text-sm font-bold pl-1 ${textMain}`}>{category}</span>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300/85 to-orange-400/90 border border-white/65 shadow-[0_6px_14px_rgba(245,158,11,0.3)] flex items-center justify-center text-white">
                    <ChevronDown
                      className={`w-4 h-4 stroke-[2.8] transition-transform duration-200 ${
                        isCategoryOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                {isCategoryOpen && (
                  <div className={`absolute top-[72px] left-0 right-0 z-30 ${panelCls} rounded-3xl p-2 animate-in fade-in zoom-in-95 duration-150`}>
                    {categories.map((cat) => (
                      <div
                        key={cat}
                        onClick={() => {
                          handleAction('click', () => {
                            setCategory(cat);
                            setIsCategoryOpen(false);
                            triggerToast(`Category: ${cat}`);
                          });
                        }}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-bold cursor-pointer transition-all flex items-center justify-between mb-1 last:mb-0 ${
                          category === cat
                            ? 'glass-blue text-white'
                            : isLight
                            ? 'text-[#1e1b4b] hover:bg-white/45'
                            : 'text-white/90 hover:bg-white/15'
                        }`}
                      >
                        <span>{cat}</span>
                        {category === cat && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Download Glass Pill */}
              <div
                onClick={handleDownload}
                className={`h-16 rounded-full ${pillCls} flex items-center px-3.5 gap-4 cursor-pointer transition-all group relative overflow-hidden`}
              >
                {downloadProgress !== null && (
                  <div
                    className="absolute inset-0 bg-cyan-300/35 transition-all duration-200 pointer-events-none"
                    style={{ width: `${downloadProgress}%` }}
                  />
                )}
                <div className="w-10 h-10 rounded-2xl glass-blue text-white flex items-center justify-center group-hover:scale-105 transition-transform relative z-10">
                  <Download className="w-5 h-5 stroke-[2.4]" />
                </div>
                <div className="flex items-center justify-between flex-1 pr-3 relative z-10">
                  <span className={`text-sm font-bold ${textMain}`}>Download</span>
                  {downloadProgress !== null && (
                    <span className={`text-xs font-extrabold ${isLight ? 'text-blue-700' : 'text-cyan-200'}`}>
                      {downloadProgress}%
                    </span>
                  )}
                </div>
              </div>

            </div>

          </div>


          {/* =========================================
              RIGHT SECTION (Widgets, Charts, Timeline)
             ========================================= */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* TOP ROW: 4 Frosted Glass Squircle Nav Icons with Jewel Inner Badges */}
            <div className="flex items-center justify-start sm:justify-end gap-3 sm:gap-4 overflow-x-auto pb-1 scrollbar-hidden">
              
              {/* Home */}
              <button
                type="button"
                onClick={() => handleAction('click', () => setActiveNav('home'))}
                className={`w-20 h-20 rounded-[26px] flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeNav === 'home' ? 'glass-blue text-white -translate-y-0.5' : `${pillCls} ${textMain}`
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    activeNav === 'home'
                      ? 'bg-white/25 border border-white/40'
                      : 'bg-gradient-to-br from-blue-400/80 to-indigo-500/85 text-white border border-white/60 shadow-sm'
                  }`}
                >
                  <Home className="w-5 h-5 stroke-[2.3]" />
                </div>
                <span className="text-[11px] font-bold tracking-tight">Home</span>
              </button>

              {/* Calender */}
              <button
                type="button"
                onClick={() => handleAction('click', () => setActiveNav('calender'))}
                className={`w-20 h-20 rounded-[26px] flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeNav === 'calender' ? 'glass-blue text-white -translate-y-0.5' : `${pillCls} ${textMain}`
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    activeNav === 'calender'
                      ? 'bg-white/25 border border-white/40'
                      : 'bg-gradient-to-br from-emerald-400/80 to-teal-500/85 text-white border border-white/60 shadow-sm'
                  }`}
                >
                  <Calendar className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-bold tracking-tight">Calender</span>
              </button>

              {/* Notification */}
              <button
                type="button"
                onClick={() => handleAction('click', () => setActiveNav('notification'))}
                className={`w-20 h-20 rounded-[26px] flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeNav === 'notification' ? 'glass-blue text-white -translate-y-0.5' : `${pillCls} ${textMain}`
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center relative ${
                    activeNav === 'notification'
                      ? 'bg-white/25 border border-white/40'
                      : 'bg-gradient-to-br from-rose-400/80 to-pink-500/85 text-white border border-white/60 shadow-sm'
                  }`}
                >
                  <Bell className="w-5 h-5 stroke-[2.2]" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-300 border border-white shadow-[0_0_8px_#fcd34d]" />
                </div>
                <span className="text-[11px] font-bold tracking-tight">Notification</span>
              </button>

              {/* Setting */}
              <button
                type="button"
                onClick={() => handleAction('click', () => setActiveNav('setting'))}
                className={`w-20 h-20 rounded-[26px] flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeNav === 'setting' ? 'glass-blue text-white -translate-y-0.5' : `${pillCls} ${textMain}`
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    activeNav === 'setting'
                      ? 'bg-white/25 border border-white/40'
                      : 'bg-gradient-to-br from-violet-400/80 to-purple-500/85 text-white border border-white/60 shadow-sm'
                  }`}
                >
                  <Settings className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-bold tracking-tight">Setting</span>
              </button>

            </div>

            {/* ROW 2: "Last 7 days" Mini Curve Card + Frosted Glass Toggle Switch */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              
              {/* Mini Curve Chart Frosted Card */}
              <div className={`sm:col-span-9 ${panelCls} rounded-[32px] p-5 flex items-center justify-between gap-4 relative overflow-hidden`}>
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />

                <div className="flex-shrink-0 relative z-10">
                  <span className={`text-[11px] font-bold block ${textMuted}`}>Last 7 days</span>
                  <div className={`flex items-center gap-1.5 mt-1 ${textMain}`}>
                    <span className="w-5 h-5 rounded-full bg-emerald-400/30 border border-emerald-300/60 flex items-center justify-center">
                      <ArrowUp className={`w-3 h-3 stroke-[3] ${isLight ? 'text-emerald-700' : 'text-cyan-300'}`} />
                    </span>
                    <span className="text-base font-extrabold tracking-tight">+22,12</span>
                  </div>
                </div>

                {/* Glowing Wave Line & Peak Node */}
                <div className="flex-1 max-w-[280px] h-12 flex items-center relative z-10">
                  <svg viewBox="0 0 180 50" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="glassWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={isLight ? '#2563eb' : '#60a5fa'} />
                        <stop offset="100%" stopColor={isLight ? '#06b6d4' : '#67e8f9'} />
                      </linearGradient>
                      <filter id="glassNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#0ea5e9" floodOpacity="0.65" />
                      </filter>
                    </defs>
                    <path
                      d="M 5 35 Q 25 15, 50 32 T 95 24 T 140 10 T 175 30"
                      fill="none"
                      stroke="url(#glassWaveGrad)"
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#glassNodeGlow)"
                    />
                    <circle
                      cx="140"
                      cy="10"
                      r="5"
                      fill={isLight ? '#2563eb' : '#67e8f9'}
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      filter="url(#glassNodeGlow)"
                    />
                  </svg>
                </div>
              </div>

              {/* Frosted Glass Toggle Switch Card */}
              <div className={`sm:col-span-3 ${panelCls} rounded-[32px] p-4 flex items-center justify-center`}>
                <div
                  onClick={() => {
                    handleAction('toggle', () => {
                      setIsSwitchOn(!isSwitchOn);
                      triggerToast(`Glass switch ${!isSwitchOn ? 'ON' : 'OFF'}`);
                    });
                  }}
                  className={`w-[104px] h-14 rounded-full ${insetCls} p-1.5 flex items-center cursor-pointer transition-all relative`}
                >
                  {/* Translucent grip lines */}
                  <div className="absolute left-3.5 flex items-center gap-1 opacity-55 pointer-events-none">
                    <span className={`w-0.5 h-5 rounded-full ${isLight ? 'bg-indigo-900/40' : 'bg-white/60'}`} />
                    <span className={`w-0.5 h-5 rounded-full ${isLight ? 'bg-indigo-900/40' : 'bg-white/60'}`} />
                    <span className={`w-0.5 h-5 rounded-full ${isLight ? 'bg-indigo-900/40' : 'bg-white/60'}`} />
                  </div>

                  {/* Glowing Frosted Knob */}
                  <div
                    className={`h-11 w-11 rounded-full flex items-center justify-center text-xs font-extrabold transition-all duration-300 transform ${
                      isSwitchOn
                        ? 'translate-x-12 glass-blue text-white'
                        : `translate-x-0 ${pillCls} ${textMain}`
                    }`}
                  >
                    {isSwitchOn ? 'ON' : 'OFF'}
                  </div>
                </div>
              </div>

            </div>

            {/* ROW 3: Frosted Glass Slider Card with Translucent Speech Bubble */}
            <div className={`${panelCls} rounded-full py-[18px] px-6 sm:px-8 relative`}>
              <div className="flex items-center gap-4 sm:gap-6">
                
                {/* Recessed Glass Track with Micro Ruler Ticks */}
                <div
                  ref={sliderRef}
                  onClick={handleSliderClick}
                  className={`h-3.5 flex-1 rounded-full ${insetCls} relative flex items-center cursor-pointer`}
                >
                  {/* Subtle glass tick marks */}
                  <div className="absolute inset-x-4 flex justify-between pointer-events-none opacity-35">
                    {[0, 1, 2, 3, 4].map((t) => (
                      <span key={t} className={`w-[1px] h-1.5 ${isLight ? 'bg-indigo-900' : 'bg-white'}`} />
                    ))}
                  </div>

                  {/* Glowing Cyan-Blue Fill */}
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.6)] transition-all duration-75 relative z-10"
                    style={{ width: `${sliderValue}%` }}
                  />

                  {/* Frosted Glass Ring Thumb */}
                  <div
                    className={`w-7 h-7 rounded-full ${panelCls} border-2 border-white flex items-center justify-center absolute -top-[7px] -ml-3.5 transition-all duration-75 cursor-grab active:cursor-grabbing hover:scale-110 z-20`}
                    style={{ left: `${sliderValue}%` }}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_6px_#3b82f6]" />
                  </div>

                  {/* Frosted Speech Bubble Tooltip Underneath */}
                  <div
                    className="absolute top-8 -ml-28 hidden sm:block pointer-events-none transition-all duration-75 z-30"
                    style={{ left: `${sliderValue}%` }}
                  >
                    <div className={`relative ${panelCls} rounded-2xl p-2.5 w-56 text-[10px] font-semibold leading-relaxed ${textMain}`}>
                      <div className="absolute -top-1.5 left-28 w-3 h-3 bg-white/45 backdrop-blur-md transform rotate-45 border-l border-t border-white/75" />
                      <span className="relative z-10">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                      </span>
                    </div>
                  </div>
                </div>

                {/* Percentage Readout Pill */}
                <div className={`flex-shrink-0 text-right px-3 py-1 rounded-full ${insetCls}`}>
                  <span className={`text-sm sm:text-base font-extrabold tracking-tight ${textMain}`}>
                    {sliderValue}%
                  </span>
                </div>

              </div>
            </div>

            {/* ROW 4: Radial Donut Metric Card ($4891.22) + Mountain Wave Card (2201) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              
              {/* Circular Gauge Frosted Card (Left 7 cols) */}
              <div className={`md:col-span-7 ${panelCls} rounded-[36px] p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden`}>
                <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/20 blur-2xl" />

                <div className="relative z-10">
                  <span className={`text-[10px] font-extrabold tracking-widest uppercase block ${textMuted}`}>
                    Lorem Ipsum Dolor Sit
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <h3 className={`text-2xl sm:text-[28px] font-extrabold tracking-tight ${textMain}`}>
                      $4891.22
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs font-bold mt-1 px-2.5 py-0.5 rounded-full bg-white/35 border border-white/60">
                    <ArrowUp className={`w-3 h-3 stroke-[3] ${isLight ? 'text-blue-700' : 'text-cyan-300'}`} />
                    <span>75%</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                  
                  {/* Translucent Legend Dots */}
                  <div className={`flex flex-col gap-3 text-xs order-2 sm:order-1 ${textSub}`}>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full bg-white/55 border border-white/80 shadow-sm flex-shrink-0" />
                      <span className="text-[11px] font-bold leading-tight">Lorem ipsum dolor sit amet</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full glass-blue flex-shrink-0" />
                      <span className="text-[11px] font-bold leading-tight">Lorem ipsum dolor sit amet</span>
                    </div>
                  </div>

                  {/* Frosted Radial Progress Ring & Central Glass Disc */}
                  <div className="relative w-36 h-36 flex items-center justify-center order-1 sm:order-2 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 120 120">
                      <defs>
                        <linearGradient id="glassRadialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#2563eb" />
                          <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                        <filter id="glassArcGlow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#2563eb" floodOpacity="0.45" />
                        </filter>
                      </defs>
                      <circle
                        cx="60"
                        cy="60"
                        r="48"
                        stroke={isLight ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.14)'}
                        strokeWidth="8.5"
                        fill="none"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="48"
                        stroke="url(#glassRadialGrad)"
                        strokeWidth="9"
                        strokeDasharray="301.6"
                        strokeDashoffset="75.4"
                        strokeLinecap="round"
                        fill="none"
                        filter="url(#glassArcGlow)"
                      />
                    </svg>

                    {/* Inner Frosted Glass Disc */}
                    <div className={`absolute inset-5 rounded-full ${panelCls} flex flex-col items-center justify-center`}>
                      <span className={`text-lg font-extrabold tracking-tight ${textMain}`}>75%</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Mountain Wave Frosted Card (Right 5 cols) */}
              <div className={`md:col-span-5 ${panelCls} rounded-[36px] p-6 flex flex-col justify-between relative overflow-hidden`}>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-2xl font-extrabold tracking-tight ${textMain}`}>2201</h3>
                    <div className="w-3 h-3 rounded-full glass-blue" />
                  </div>
                  <p className={`text-[11px] font-semibold line-clamp-2 mt-1 leading-snug ${textSub}`}>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  </p>
                </div>

                {/* Translucent Layered Glass Peaks */}
                <div className={`my-3 h-28 w-full flex items-end rounded-2xl ${insetCls} p-2 overflow-hidden relative z-10`}>
                  <svg viewBox="0 0 160 85" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="glassPeakFront" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(37, 99, 235, 0.92)" />
                        <stop offset="100%" stopColor="rgba(56, 189, 248, 0.55)" />
                      </linearGradient>
                      <linearGradient id="glassPeakBack" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.72)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.18)" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 5 80 L 15 55 Q 25 45, 35 60 Q 45 75, 55 50 Q 65 30, 75 55 Q 85 70, 95 40 Q 105 20, 115 55 L 125 80 Z"
                      fill="url(#glassPeakBack)"
                    />
                    <path
                      d="M 8 80 L 15 58 Q 20 52, 28 65 Q 40 78, 55 45 Q 65 25, 75 80 L 80 80 Q 90 25, 105 10 Q 112 5, 120 40 Q 128 70, 135 80 Z"
                      fill="url(#glassPeakFront)"
                      stroke="rgba(255, 255, 255, 0.65)"
                      strokeWidth="1.2"
                    />

                    <circle cx="107" cy="9" r="3.5" fill="#2563eb" stroke="#FFFFFF" strokeWidth="1.8" />
                    <line
                      x1="107"
                      y1="9"
                      x2="155"
                      y2="9"
                      stroke={isLight ? 'rgba(30, 27, 75, 0.45)' : 'rgba(255,255,255,0.55)'}
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                  </svg>
                </div>

                {/* Bottom Frosted Slider */}
                <div className="pt-2 relative z-10">
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const percent = Math.round(Math.min(Math.max((x / rect.width) * 100, 10), 90));
                      setChartTimeline(percent);
                      playTactileClick('slider');
                    }}
                    className={`h-2.5 rounded-full ${insetCls} relative flex items-center cursor-pointer`}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.55)]"
                      style={{ width: `${chartTimeline}%` }}
                    />
                    <div
                      className={`w-5 h-5 rounded-full ${panelCls} border border-white flex items-center justify-center absolute -top-[5px] -ml-2.5 transition-all cursor-grab active:cursor-grabbing hover:scale-110`}
                      style={{ left: `${chartTimeline}%` }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* ROW 5: Bottom Timeline / Stepper Frosted Card (2019, 2020, 2021, 2022) */}
            <div className={`${panelCls} rounded-[34px] sm:rounded-full py-5 px-6 sm:px-10`}>
              <div className="relative flex flex-col gap-3">
                
                {/* Recessed Glass Track */}
                <div className={`h-2.5 rounded-full ${insetCls} relative flex items-center mx-4 sm:mx-8`}>
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.55)] transition-all duration-300"
                    style={{
                      width:
                        activeYear === 2019
                          ? '12%'
                          : activeYear === 2020
                          ? '38%'
                          : activeYear === 2021
                          ? '66%'
                          : '96%',
                    }}
                  />

                  <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                    {[2019, 2020, 2021, 2022].map((year) => {
                      const isReached = year <= activeYear;
                      return (
                        <div
                          key={year}
                          className={`w-3.5 h-3.5 rounded-full border-2 border-white transition-all flex items-center justify-center ${
                            isReached
                              ? 'bg-blue-600 shadow-[0_0_10px_#38bdf8] scale-110'
                              : 'bg-white/40'
                          }`}
                        >
                          {year === activeYear && (
                            <span className="w-1 h-1 rounded-full bg-white" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Year Glass Pills */}
                <div className="flex items-center justify-between px-0 sm:px-4 pt-1">
                  {[2019, 2020, 2021, 2022].map((year) => {
                    const isActive = activeYear === year;
                    return (
                      <div key={year} className="relative flex flex-col items-center">
                        {isActive && (
                          <div className="w-2.5 h-2.5 bg-sky-400 transform rotate-45 -mb-1" />
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            handleAction('click', () => {
                              setActiveYear(year as 2019 | 2020 | 2021 | 2022);
                              triggerToast(`Selected Year: ${year}`);
                            });
                          }}
                          className={`px-4 sm:px-6 py-2 rounded-2xl sm:rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                            isActive
                              ? 'glass-blue text-white scale-105'
                              : `${pillCls} ${textMain}`
                          }`}
                        >
                          {year}
                        </button>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Portfolio Footer Note */}
        <div className={`mt-10 text-center text-xs border-t border-white/25 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 ${textSub}`}>
          <div className="flex items-center gap-1.5 font-semibold">
            <Sparkles className={`w-4 h-4 ${isLight ? 'text-white' : 'text-cyan-300'}`} />
            <span>
              Glassmorphism Paradigm • Matching exact layout & content of{' '}
              <span className={`font-bold ${textMain}`}>src/assets/sample.jpg</span>
            </span>
          </div>
          <div className="font-medium">
            React + TypeScript + Tailwind CSS • Optical Blur, Specular Borders & 3D Refraction Spheres
          </div>
        </div>

      </div>
    </div>
  );
};

export default Glassmorphism;
