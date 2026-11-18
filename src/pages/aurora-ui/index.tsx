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
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const AuroraUI: React.FC = () => {
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
    triggerToast('Synthesizing fluid mesh gradients...');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('Aurora Kit synced cleanly (100%)');
          setTimeout(() => setDownloadProgress(null), 1500);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const categories = ['Dashboard Design', 'Mobile Components', 'Tactile UI Kits', 'Design Tokens'];

  const peakScale = 0.72 + (chartTimeline / 100) * 0.42;
  const peakTipY = Math.round(135 - 115 * peakScale);

  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen relative overflow-hidden aurora-canvas text-slate-800">
      {/* Diffused Fluid Aurora Mesh Gradient Orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="aurora-blob-a w-[520px] h-[520px] rounded-full blur-[90px] opacity-60 absolute -top-24 -left-20"
          style={{
            background: 'radial-gradient(circle, #34D399 0%, #38BDF8 55%, transparent 80%)',
          }}
        />
        <div
          className="aurora-blob-b w-[560px] h-[560px] rounded-full blur-[95px] opacity-55 absolute top-[24%] -right-24"
          style={{
            background: 'radial-gradient(circle, #A78BFA 0%, #F472B6 55%, transparent 80%)',
          }}
        />
        <div
          className="aurora-blob-a w-[460px] h-[460px] rounded-full blur-[90px] opacity-50 absolute -bottom-24 left-[28%]"
          style={{
            background: 'radial-gradient(circle, #60A5FA 0%, #34D399 60%, transparent 80%)',
          }}
        />
      </div>

      {/* Luminous Mesh Toast Pill */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-full aurora-card border-violet-300 shadow-2xl">
          <Sparkles className="w-4 h-4 text-violet-600 shrink-0" />
          <span className="text-xs font-bold text-slate-800">{toastMessage}</span>
        </div>
      )}

      {/* Aurora UI Top Banner */}
      <div className="relative z-10 max-w-[1060px] mx-auto mb-9 rounded-[30px] aurora-card p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-400/25 via-sky-400/25 to-violet-400/25 border border-white text-violet-800 text-[11px] font-bold uppercase tracking-wider mb-2.5">
              <span>ATMOSPHERIC MESH // AURORA UI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Aurora{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-sky-500 to-violet-600">
                Mesh Gradient UI
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
              Organic polar-light design driven by slow-drifting diffused mesh gradients, misty pearl-tinted cards, soft prismatic shadows, and luminous ribbon accents.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 text-[11px] font-bold">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-400/20 text-emerald-800 border border-white">
              Mint Glow
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-sky-400/20 text-sky-800 border border-white">
              Arctic Sky
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-violet-400/20 text-violet-800 border border-white">
              Violet Mist
            </span>
          </div>
        </div>
      </div>

      {/* Main Showcase Canvas matching exact sample.jpg layout */}
      <div className="relative z-10 max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN (Mesh Login Card + 4 Aurora Pills) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-9">
          {/* Login Card */}
          <div className="relative rounded-[32px] aurora-card p-7 pb-12">
            <h2 className="text-[28px] font-extrabold tracking-tight text-slate-900 mb-6">
              Login
            </h2>

            {/* Email Input */}
            <div className="mb-5">
              <div className="relative flex items-center rounded-2xl border border-white/90 bg-white/75 px-4 py-3 shadow-inner focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-300/60 transition-all">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-9 bg-transparent text-sm font-semibold text-slate-800 focus:outline-none"
                  aria-label="Email address"
                />
                <Mail className="w-4 h-4 text-sky-500 absolute right-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <div className="relative flex items-center rounded-2xl border border-white/90 bg-white/75 px-4 py-3 shadow-inner focus-within:bg-white focus-within:ring-2 focus-within:ring-violet-300/60 transition-all">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-9 bg-transparent text-sm font-semibold tracking-wider text-slate-800 focus:outline-none"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                  className="absolute right-3 p-1 rounded-full hover:bg-violet-100 text-violet-500 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Forget Password? */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() =>
                  handleAction('click', () => triggerToast('Reset link drifting to your inbox'))
                }
                className="text-xs font-semibold text-violet-600 underline underline-offset-4 hover:text-sky-600 transition-colors"
              >
                Forget Password?
              </button>
            </div>

            {/* Overhanging Prismatic Aurora Pill: Sign Up */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
              <button
                type="button"
                onClick={() =>
                  handleAction(isSignedUp ? 'click' : 'success', () => {
                    setIsSignedUp(!isSignedUp);
                    triggerToast(isSignedUp ? 'Signed out cleanly' : `Aurora profile active: ${email}`);
                  })
                }
                className={`min-w-[188px] px-8 py-3.5 rounded-full text-sm font-bold text-white shadow-[0_14px_28px_-6px_rgba(139,92,246,0.48)] transition-all active:scale-95 ${
                  isSignedUp
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                    : 'bg-gradient-to-r from-emerald-400 via-sky-500 to-violet-500 hover:brightness-105'
                }`}
              >
                {isSignedUp ? 'Signed Up ✓' : 'Sign Up'}
              </button>
            </div>
          </div>

          {/* 4 Stacked Aurora Action Pills */}
          <div className="flex flex-col gap-3.5 pt-2">
            {/* 1. Add Friend */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => {
                  setFriendCount((c) => c + 1);
                  triggerToast(`Connection illuminated (#${friendCount + 1})`);
                })
              }
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-full aurora-pill hover:bg-white transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center shadow-md">
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-[15px] font-bold text-slate-800">Add Friend</span>
              </div>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                {friendCount}
              </span>
            </button>

            {/* 2. Share */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => triggerToast('Aurora share link copied'))
              }
              className="w-full flex items-center gap-4 px-4 py-2.5 rounded-full aurora-pill hover:bg-white transition-all active:scale-[0.98]"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-white flex items-center justify-center shadow-md">
                <Share2 className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[15px] font-bold text-slate-800">Share</span>
            </button>

            {/* 3. Select Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                className="w-full flex items-center justify-between px-6 py-4 rounded-full aurora-pill hover:bg-white transition-all active:scale-[0.98]"
              >
                <span className="text-[15px] font-bold text-slate-800">{category}</span>
                <ChevronDown
                  className={`w-5 h-5 text-violet-500 transition-transform duration-200 ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-3xl aurora-card p-2 shadow-2xl">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        handleAction('click', () => {
                          setCategory(cat);
                          setIsCategoryOpen(false);
                          triggerToast(`Spectrum selected: ${cat}`);
                        })
                      }
                      className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors ${
                        category === cat
                          ? 'bg-gradient-to-r from-sky-500 to-violet-500 text-white'
                          : 'text-slate-700 hover:bg-white/80'
                      }`}
                    >
                      <span>{cat}</span>
                      {category === cat && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Download */}
            <button
              type="button"
              onClick={handleDownload}
              className="relative overflow-hidden w-full flex items-center gap-4 px-4 py-2.5 rounded-full aurora-pill hover:bg-white transition-all active:scale-[0.98]"
            >
              {downloadProgress !== null && (
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-300/40 via-sky-300/40 to-violet-300/40 transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              )}
              <div className="relative z-10 w-11 h-11 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-white flex items-center justify-center shadow-md">
                <Download className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="relative z-10 text-[15px] font-bold text-slate-800">
                {downloadProgress !== null ? `Downloading ${downloadProgress}%` : 'Download'}
              </span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (Quick Nav, Sparkline+Switch, Slider, Charts, Stepper) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ROW 1: 4 Aurora Mesh Navigation Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {(
              [
                { id: 'home', label: 'Home', grad: 'from-emerald-400 to-sky-500', icon: Home },
                { id: 'calender', label: 'Calender', grad: 'from-sky-400 to-indigo-500', icon: Calendar },
                { id: 'notification', label: 'Notification', grad: 'from-violet-400 to-fuchsia-500', icon: Bell },
                { id: 'setting', label: 'Setting', grad: 'from-pink-400 to-rose-500', icon: Settings },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleAction('click', () => {
                      setActiveNav(item.id);
                      triggerToast(`Aurora space -> ${item.label}`);
                    })
                  }
                  className={`aspect-square sm:aspect-[1/0.88] rounded-[28px] aurora-card flex flex-col items-center justify-center gap-2.5 transition-all active:scale-95 ${
                    isActive ? 'bg-white ring-2 ring-sky-400/50' : 'hover:bg-white/85'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                      isActive
                        ? `bg-gradient-to-br ${item.grad} text-white shadow-lg`
                        : 'bg-white/80 text-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* ROW 2: "Last 7 days" +22,12 Aurora Ribbon + Mesh Switch */}
          <div className="flex flex-col sm:flex-row gap-6 items-stretch">
            <div className="flex-1 rounded-[28px] aurora-card px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-slate-500">Last 7 days</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600">
                    <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span className="text-xl font-extrabold text-slate-900">+22,12</span>
                </div>
              </div>

              <div className="w-[210px] sm:w-[250px] h-[64px] rounded-2xl bg-white/75 border border-white p-2 shrink-0">
                <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="auroraLineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#34D399" />
                      <stop offset="50%" stopColor="#38BDF8" />
                      <stop offset="100%" stopColor="#A78BFA" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8,50 C28,50 32,20 55,22 C76,24 80,44 102,38 C122,32 132,48 154,32 C172,18 182,12 194,16 C210,22 222,48 234,48"
                    fill="none"
                    stroke="url(#auroraLineGrad)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <circle cx="192" cy="15" r="6" fill="#A78BFA" stroke="#FFFFFF" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* Mesh Toggle Switch */}
            <button
              type="button"
              onClick={() =>
                handleAction('toggle', () => {
                  const next = !isSwitchOn;
                  setIsSwitchOn(next);
                  triggerToast(`Aurora shimmer: ${next ? 'Active' : 'Muted'}`);
                })
              }
              aria-pressed={isSwitchOn}
              className={`relative w-full sm:w-[144px] min-h-[82px] rounded-full border border-white p-2.5 flex items-center justify-between transition-all ${
                isSwitchOn
                  ? 'bg-gradient-to-r from-emerald-400 via-sky-500 to-violet-500 shadow-[0_12px_26px_-6px_rgba(56,189,248,0.45)]'
                  : 'aurora-pill'
              }`}
            >
              <span
                className={`pl-3 text-xs font-bold ${
                  isSwitchOn ? 'text-white' : 'text-slate-400'
                }`}
              >
                ON
              </span>
              <span
                className={`pr-3 text-xs font-bold ${
                  !isSwitchOn ? 'text-slate-600' : 'text-white/50'
                }`}
              >
                OFF
              </span>
              <div
                className={`absolute top-2 bottom-2 w-[58px] rounded-full bg-white shadow-lg transition-all duration-300 flex items-center justify-center ${
                  isSwitchOn ? 'left-[calc(100%-66px)]' : 'left-2'
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full ${
                    isSwitchOn ? 'bg-sky-500' : 'bg-slate-300'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* ROW 3: Spectral Aurora Slider (71%) + Misty Pearl Tooltip */}
          <div className="rounded-[28px] aurora-card p-6 pb-7">
            <div className="flex items-center gap-5">
              <div
                ref={sliderRef}
                onClick={handleSliderClick}
                role="slider"
                aria-valuemin={5}
                aria-valuemax={95}
                aria-valuenow={sliderValue}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight') {
                    setSliderValue((v) => Math.min(v + 2, 95));
                    playTactileClick('slider');
                  } else if (e.key === 'ArrowLeft') {
                    setSliderValue((v) => Math.max(v - 2, 5));
                    playTactileClick('slider');
                  }
                }}
                className="relative flex-1 h-3.5 rounded-full bg-slate-200/75 cursor-pointer"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-500 to-violet-500 transition-all duration-150"
                  style={{ width: `${sliderValue}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white border-2 border-violet-400 shadow-lg"
                  style={{ left: `${sliderValue}%` }}
                />
              </div>

              <div className="text-lg font-extrabold text-violet-700 min-w-[52px] text-right">
                {sliderValue}%
              </div>
            </div>

            <div className="mt-5 flex justify-center sm:justify-end sm:pr-20">
              <div className="relative max-w-[265px] rounded-2xl aurora-pill px-4 py-2.5">
                <div className="w-3 h-3 bg-white/85 border-l border-t border-white rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2" />
                <p className="text-[10px] leading-snug text-slate-600 font-medium">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                </p>
              </div>
            </div>
          </div>

          {/* ROW 4: Two Luminous Analytics Cards ($4891.22 Spectral Ring + 2201 Polar Peaks) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Card */}
            <div className="md:col-span-7 rounded-[28px] aurora-card p-6 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    LOREM IPSUM DOLOR SIT
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    $4891.22
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-600">
                      <ArrowUp className="w-2.5 h-2.5 stroke-[2.8]" />
                    </span>
                    <span className="text-xs font-bold text-emerald-600">75%</span>
                  </div>
                </div>

                {/* Multi-Stop Polar Spectral Gauge (75%) */}
                <div className="relative w-[134px] h-[134px] shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <defs>
                      <linearGradient id="auroraRingGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#34D399" />
                        <stop offset="50%" stopColor="#38BDF8" />
                        <stop offset="100%" stopColor="#A78BFA" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="rgba(148,163,184,0.2)"
                      strokeWidth="11"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="33"
                      fill="none"
                      stroke="#FB7185"
                      strokeWidth="5"
                      strokeDasharray="207"
                      strokeDashoffset="76"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="url(#auroraRingGrad)"
                      strokeWidth="11"
                      strokeDasharray="289"
                      strokeDashoffset={289 * 0.25}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-sm font-extrabold text-slate-900">75%</div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 shrink-0" />
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#FB7185] shrink-0" />
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
              </div>
            </div>

            {/* Right Card (2201 + Polar Peaks) */}
            <div className="md:col-span-5 rounded-[28px] aurora-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-extrabold text-slate-900">2201</span>
                  <div className="flex-1 h-[1.5px] bg-slate-300/70 relative">
                    <span className="w-2.5 h-2.5 rounded-full bg-violet-500 absolute right-0 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 leading-snug">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit...
                </p>
              </div>

              <div className="my-4 h-[132px] rounded-2xl bg-white/75 border border-white p-2">
                <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="auroraMountainGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
                      <stop offset="55%" stopColor="#A78BFA" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#34D399" stopOpacity="0.15" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8,136 C25,136 30,84 44,84 C58,84 62,118 76,118 C90,118 96,60 110,60 C124,60 132,96 146,96 C160,96 168,68 182,68 C196,68 202,136 212,136 Z"
                    fill="rgba(251, 113, 133, 0.25)"
                  />
                  <path
                    d={`M8,136 C22,136 26,72 38,72 C50,72 56,120 68,120 C80,120 86,90 98,90 C112,90 116,66 130,66 C144,66 148,108 160,108 C172,108 176,${peakTipY} 188,${peakTipY} C200,${peakTipY} 204,136 212,136 Z`}
                    fill="url(#auroraMountainGrad)"
                  />
                </svg>
              </div>

              <input
                type="range"
                min={15}
                max={100}
                value={chartTimeline}
                onChange={(e) => {
                  setChartTimeline(Number(e.target.value));
                  playTactileClick('slider');
                }}
                aria-label="Chart timeline scale"
                className="w-full accent-violet-500 cursor-pointer h-1.5 rounded-full bg-slate-200/80"
              />
            </div>
          </div>

          {/* ROW 5: Aurora Spectrum Stepper (2019 - 2022) */}
          <div className="rounded-[28px] aurora-card px-6 py-6">
            <div className="relative flex items-center justify-between px-4 sm:px-8 mb-4">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-emerald-300 via-sky-300 to-violet-300" />
              {([2019, 2020, 2021, 2022] as const).map((year) => {
                const isSelected = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setActiveYear(year);
                        triggerToast(`Aurora cycle: ${year}`);
                      })
                    }
                    aria-label={`Select year ${year}`}
                    className={`relative z-10 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center transition-transform shadow-sm ${
                      isSelected
                        ? 'bg-gradient-to-r from-sky-500 to-violet-500 scale-125'
                        : 'bg-white'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? 'bg-white' : 'bg-sky-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-4 gap-3 sm:gap-5">
              {([2019, 2020, 2021, 2022] as const).map((year) => {
                const isSelected = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setActiveYear(year);
                        triggerToast(`Aurora cycle: ${year}`);
                      })
                    }
                    className={`py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-400 via-sky-500 to-violet-500 text-white shadow-md'
                        : 'aurora-pill text-slate-700 hover:bg-white'
                    }`}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuroraUI;

