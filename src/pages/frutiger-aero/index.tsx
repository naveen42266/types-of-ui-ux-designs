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
  Sun,
  Sparkles,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

const AERO_BUBBLES = [
  { left: '6%', top: '14%', size: 96, delay: '0s' },
  { left: '84%', top: '12%', size: 118, delay: '-3s' },
  { left: '46%', top: '38%', size: 76, delay: '-6s' },
  { left: '14%', top: '72%', size: 110, delay: '-4s' },
  { left: '78%', top: '68%', size: 92, delay: '-8s' },
] as const;

export const FrutigerAero: React.FC = () => {
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
    triggerToast('Downloading Aqua Vista Kit...');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('Complete! Saved UI-Kit-FrutigerAero.zip');
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
    <div
      className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen relative overflow-hidden text-slate-800"
      style={{
        background:
          'linear-gradient(180deg, #0EA5E9 0%, #7DD3FC 36%, #E0F2FE 68%, #DCFCE7 100%)',
      }}
    >
      {/* Classic 2007 Frutiger Aero Sunlit Sky, Rolling Grassy Hills & Floating Soap Bubbles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Sunburst Glow Top-Left */}
        <div
          className="absolute -top-24 -left-16 w-[460px] h-[460px] rounded-full opacity-75"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(254,240,138,0.55) 28%, transparent 70%)',
          }}
        />

        {/* Crisp Sweeping Aurora / Lens Flare Sky Ribbon */}
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          className="w-full h-full opacity-95"
        >
          <defs>
            <linearGradient id="aeroHillBack" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#84CC16" />
              <stop offset="100%" stopColor="#4D7C0F" />
            </linearGradient>
            <linearGradient id="aeroHillFront" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#A3E635" />
              <stop offset="55%" stopColor="#65A30D" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>
            <linearGradient id="aeroFlare" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="45%" stopColor="rgba(255,255,255,0.65)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
            </linearGradient>
          </defs>

          {/* Soft Lens Flare Wave */}
          <path
            d="M-60,310 C280,140 620,420 1480,120 L1480,260 C640,510 290,260 -60,410 Z"
            fill="url(#aeroFlare)"
          />

          {/* Rolling Grass Hills at Horizon */}
          <path
            d="M0,700 C320,600 680,760 1120,640 C1280,595 1380,620 1440,650 L1440,900 L0,900 Z"
            fill="url(#aeroHillBack)"
            fillOpacity="0.82"
          />
          <path
            d="M0,760 C380,670 760,820 1440,680 L1440,900 L0,900 Z"
            fill="url(#aeroHillFront)"
          />
        </svg>

        {/* Glossy Drifting Soap/Aqua Bubbles */}
        {AERO_BUBBLES.map((b, idx) => (
          <div
            key={idx}
            className="animate-liquid-drift absolute rounded-full aero-bubble"
            style={{
              left: b.left,
              top: b.top,
              width: b.size,
              height: b.size,
              animationDelay: b.delay,
            }}
          />
        ))}
      </div>

      {/* Aero Gloss Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-full aero-window text-sky-950 shadow-xl">
          <span className="w-3.5 h-3.5 rounded-full aero-gel-green shrink-0" />
          <span className="text-xs font-bold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Frutiger Aero Vista Window Overview Banner */}
      <div className="relative z-10 max-w-[1060px] mx-auto mb-8 rounded-[26px] aero-window p-6 sm:p-7 overflow-hidden">
        {/* Diagonal Glass Streak Reflection */}
        <div
          className="pointer-events-none absolute -top-12 -right-12 w-72 h-72 rotate-12 opacity-40"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 75%)',
          }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full aero-gel-green text-white text-[11px] font-bold uppercase tracking-wider mb-2.5 drop-shadow-sm">
              <Sun className="w-3.5 h-3.5" />
              2004–2013 Era // Frutiger Aero
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-sky-950 drop-shadow-[0_1px_0_rgba(255,255,255,0.9)]">
              Frutiger Aero UI System
            </h1>
            <p className="text-xs sm:text-sm text-sky-950/85 font-medium mt-1.5 max-w-2xl leading-relaxed">
              Humanist tech optimism with Windows Vista Aero glass panels, crisp two-tone Aqua gel pill highlights, bright cerulean skies, lush grass gradients, and floating specular bubbles.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 text-[11px] font-bold">
            <span className="px-3.5 py-1.5 rounded-full aero-gel-blue text-white">Aqua Gloss</span>
            <span className="px-3.5 py-1.5 rounded-full aero-gel-green text-white">Eco Lime</span>
            <span className="px-3.5 py-1.5 rounded-full aero-gel-white text-sky-900 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-sky-500" /> Aero Glass
            </span>
          </div>
        </div>
      </div>

      {/* Main Showcase Canvas matching exact sample.jpg layout */}
      <div className="relative z-10 max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN (Aero Login Window + 4 Aqua Gel Pills) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-9">
          {/* Login Card inside Aero Glass Frame */}
          <div className="relative rounded-[28px] aero-window p-3.5 pb-12">
            <div className="rounded-[20px] bg-white/90 border border-white/90 p-5 pb-8 shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_4px_12px_rgba(14,116,144,0.12)]">
              <h2 className="text-[26px] font-bold tracking-tight text-sky-950 mb-6">Login</h2>

              {/* Email */}
              <div className="mb-5">
                <div className="relative flex items-center rounded-xl bg-gradient-to-b from-slate-100 to-white border border-sky-300/80 shadow-[inset_0_2px_4px_rgba(15,23,42,0.08)] focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-300/60 transition-all">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 pr-10 bg-transparent text-slate-800 font-semibold text-sm focus:outline-none"
                    aria-label="Email address"
                  />
                  <Mail className="w-4 h-4 text-sky-600 absolute right-3 pointer-events-none" />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <div className="relative flex items-center rounded-xl bg-gradient-to-b from-slate-100 to-white border border-sky-300/80 shadow-[inset_0_2px_4px_rgba(15,23,42,0.08)] focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-300/60 transition-all">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 pr-10 bg-transparent text-slate-800 font-semibold text-sm tracking-wider focus:outline-none"
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                    className="absolute right-2.5 p-1 rounded-full hover:bg-sky-100 text-sky-700 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Forget Password? */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    handleAction('click', () => triggerToast('Windows Live recovery link sent!'))
                  }
                  className="text-xs font-bold text-[#0284C7] underline underline-offset-4 hover:text-[#0369A1] transition-colors"
                >
                  Forget Password?
                </button>
              </div>
            </div>

            {/* Overhanging Iconic Aqua Gloss Pill: Sign Up */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
              <button
                type="button"
                onClick={() =>
                  handleAction(isSignedUp ? 'click' : 'success', () => {
                    setIsSignedUp(!isSignedUp);
                    triggerToast(isSignedUp ? 'Signed out' : `Welcome back, ${email}!`);
                  })
                }
                className={`min-w-[186px] px-8 py-3.5 rounded-full font-bold text-sm text-white tracking-wide transition-transform active:scale-95 ${
                  isSignedUp ? 'aero-gel-green' : 'aero-gel-blue'
                }`}
              >
                <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
                  {isSignedUp ? 'Signed Up ✓' : 'Sign Up'}
                </span>
              </button>
            </div>
          </div>

          {/* 4 Stacked Aqua Gel Pill Buttons */}
          <div className="flex flex-col gap-4 pt-2">
            {/* 1. Add Friend */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => {
                  setFriendCount((c) => c + 1);
                  triggerToast(`MSN Buddy added (${friendCount + 1})`);
                })
              }
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-full aero-gel-white hover:brightness-105 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full aero-gel-blue text-white flex items-center justify-center">
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-[15px] font-bold text-sky-950">Add Friend</span>
              </div>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-300">
                {friendCount}
              </span>
            </button>

            {/* 2. Share */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => triggerToast('Copied glossy Aero invite link!'))
              }
              className="w-full flex items-center gap-4 px-4 py-2.5 rounded-full aero-gel-white hover:brightness-105 transition-all active:scale-[0.98]"
            >
              <div className="w-11 h-11 rounded-full aero-gel-green text-white flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </div>
              <span className="text-[15px] font-bold text-sky-950">Share</span>
            </button>

            {/* 3. Select Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                className="w-full flex items-center justify-between px-6 py-4 rounded-full aero-gel-white hover:brightness-105 transition-all active:scale-[0.98]"
              >
                <span className="text-[15px] font-bold text-sky-950">{category}</span>
                <ChevronDown
                  className={`w-5 h-5 text-sky-700 transition-transform duration-200 ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-2xl aero-window p-2 shadow-xl">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        handleAction('click', () => {
                          setCategory(cat);
                          setIsCategoryOpen(false);
                          triggerToast(`Category: ${cat}`);
                        })
                      }
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                        category === cat
                          ? 'aero-gel-blue text-white'
                          : 'text-sky-950 hover:bg-white/70'
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
              className="relative overflow-hidden w-full flex items-center gap-4 px-4 py-2.5 rounded-full aero-gel-white hover:brightness-105 transition-all active:scale-[0.98]"
            >
              {downloadProgress !== null && (
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-lime-300/60 to-sky-400/60 transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              )}
              <div className="relative z-10 w-11 h-11 rounded-full aero-gel-blue text-white flex items-center justify-center">
                <Download className="w-4 h-4" />
              </div>
              <span className="relative z-10 text-[15px] font-bold text-sky-950">
                {downloadProgress !== null ? `Downloading ${downloadProgress}%` : 'Download'}
              </span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (Quick Nav, Sparkline+Switch, Slider, Charts, Stepper) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ROW 1: 4 Glossy Quick Nav Aero Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {(
              [
                { id: 'home', label: 'Home', icon: Home },
                { id: 'calender', label: 'Calender', icon: Calendar },
                { id: 'notification', label: 'Notification', icon: Bell },
                { id: 'setting', label: 'Setting', icon: Settings },
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
                      triggerToast(`Opened ${item.label}`);
                    })
                  }
                  className={`aspect-square sm:aspect-[1/0.9] rounded-[24px] flex flex-col items-center justify-center gap-2.5 transition-all active:scale-95 ${
                    isActive ? 'aero-window ring-2 ring-white shadow-lg' : 'aero-gel-white'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${
                      isActive ? 'aero-gel-blue' : 'aero-gel-green opacity-85'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-extrabold tracking-tight text-sky-950">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ROW 2: "Last 7 days" +22,12 Sparkline Window + Aqua Jelly Switch */}
          <div className="flex flex-col sm:flex-row gap-6 items-stretch">
            <div className="flex-1 rounded-[24px] aero-window px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-sky-900/75">Last 7 days</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full aero-gel-green text-white">
                    <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span className="text-xl font-extrabold text-sky-950">+22,12</span>
                </div>
              </div>

              <div className="w-[210px] sm:w-[250px] h-[64px] rounded-2xl bg-white/85 border border-white p-1.5 shadow-inner shrink-0">
                <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="aeroWaveGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#0284C7" />
                      <stop offset="50%" stopColor="#0EA5E9" />
                      <stop offset="100%" stopColor="#65A30D" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8,50 C28,50 32,20 55,22 C76,24 80,44 102,38 C122,32 132,48 154,32 C172,18 182,12 194,16 C210,22 222,48 234,48"
                    fill="none"
                    stroke="url(#aeroWaveGrad)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <circle cx="192" cy="15" r="6.5" fill="#84CC16" stroke="#FFFFFF" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* Aqua Jelly Toggle Switch */}
            <button
              type="button"
              onClick={() =>
                handleAction('toggle', () => {
                  const next = !isSwitchOn;
                  setIsSwitchOn(next);
                  triggerToast(`Aero Glass Effects: ${next ? 'ON' : 'OFF'}`);
                })
              }
              aria-pressed={isSwitchOn}
              className={`relative w-full sm:w-[144px] min-h-[82px] rounded-full p-2.5 flex items-center justify-between transition-all ${
                isSwitchOn ? 'aero-gel-green' : 'aero-gel-white'
              }`}
            >
              <span
                className={`pl-3 text-xs font-extrabold tracking-widest drop-shadow-sm ${
                  isSwitchOn ? 'text-white' : 'text-slate-400'
                }`}
              >
                ON
              </span>
              <span
                className={`pr-3 text-xs font-extrabold tracking-widest ${
                  !isSwitchOn ? 'text-slate-600' : 'text-white/55'
                }`}
              >
                OFF
              </span>
              <div
                className={`absolute top-2 bottom-2 w-[62px] rounded-full aero-gel-white transition-all duration-300 flex items-center justify-center ${
                  isSwitchOn ? 'left-[calc(100%-70px)]' : 'left-2'
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full ${
                    isSwitchOn ? 'bg-lime-500' : 'bg-slate-400'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* ROW 3: Glossy Aqua Progress Slider + Tooltip */}
          <div className="rounded-[26px] aero-window p-6 pb-7">
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
                className="relative flex-1 h-4 rounded-full bg-white/85 border border-sky-300 shadow-inner cursor-pointer"
              >
                <div
                  className="h-full rounded-full aero-gel-blue border-0 transition-all duration-150"
                  style={{ width: `${sliderValue}%` }}
                />
                {/* Glossy Soap-Bubble Orb Knob */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full aero-gel-white flex items-center justify-center"
                  style={{ left: `${sliderValue}%` }}
                >
                  <span className="w-3 h-3 rounded-full bg-sky-500" />
                </div>
              </div>

              <div className="text-xl font-extrabold text-sky-950 drop-shadow-[0_1px_0_rgba(255,255,255,0.85)] min-w-[54px] text-right">
                {sliderValue}%
              </div>
            </div>

            <div className="mt-5 flex justify-center sm:justify-end sm:pr-20">
              <div className="relative max-w-[265px] rounded-2xl bg-white/95 border border-sky-200 shadow-md px-4 py-2.5">
                <div className="w-3 h-3 bg-white/95 border-l border-t border-sky-200 rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2" />
                <p className="text-[10px] leading-snug text-sky-950 font-semibold">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                </p>
              </div>
            </div>
          </div>

          {/* ROW 4: Two Aero Analytics Windows ($4891.22 + 2201 Sky/Grass Mountain Chart) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Window */}
            <div className="md:col-span-7 rounded-[28px] aero-window p-6 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-sky-800 mb-2">
                    LOREM IPSUM DOLOR SIT
                  </div>
                  <div className="text-3xl font-extrabold tracking-tight text-sky-950">
                    $4891.22
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full aero-gel-green text-white">
                      <ArrowUp className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span className="text-xs font-extrabold text-lime-700">75%</span>
                  </div>
                </div>

                {/* Glossy Orb 75% Gauge */}
                <div className="relative w-[138px] h-[138px] rounded-full bg-white/75 border-2 border-white shadow-inner shrink-0 flex items-center justify-center p-1.5">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <defs>
                      <linearGradient id="aeroGaugeGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#38BDF8" />
                        <stop offset="50%" stopColor="#0284C7" />
                        <stop offset="100%" stopColor="#84CC16" />
                      </linearGradient>
                    </defs>
                    <circle cx="60" cy="60" r="46" fill="none" stroke="#E0F2FE" strokeWidth="11" />
                    <circle
                      cx="60"
                      cy="60"
                      r="33"
                      fill="none"
                      stroke="#94A3B8"
                      strokeWidth="5"
                      strokeDasharray="207"
                      strokeDashoffset="78"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="url(#aeroGaugeGrad)"
                      strokeWidth="11"
                      strokeDasharray="289"
                      strokeDashoffset={289 * 0.25}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute w-[60px] h-[60px] rounded-full aero-gel-white flex items-center justify-center text-sm font-extrabold text-sky-950">
                    75%
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-400 border border-white shrink-0" />
                  <span className="text-xs font-bold text-sky-950/80">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full aero-gel-blue shrink-0" />
                  <span className="text-xs font-bold text-sky-950/80">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
              </div>
            </div>

            {/* Right Window (2201 + Glossy Sky/Eco Mountain Peaks) */}
            <div className="md:col-span-5 rounded-[28px] aero-window p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-extrabold tracking-tight text-sky-950">
                    2201
                  </span>
                  <div className="flex-1 h-[2px] bg-white relative rounded-full">
                    <span className="w-3 h-3 rounded-full aero-gel-green absolute right-0 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <p className="text-[10px] text-sky-950/75 font-semibold mt-1.5 leading-snug">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit...
                </p>
              </div>

              <div className="my-4 h-[132px] rounded-2xl bg-white/85 border border-white p-1.5 shadow-inner">
                <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="aeroPeakFront" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="55%" stopColor="#0284C7" />
                      <stop offset="100%" stopColor="#84CC16" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8,136 C25,136 30,84 44,84 C58,84 62,118 76,118 C90,118 96,60 110,60 C124,60 132,96 146,96 C160,96 168,68 182,68 C196,68 202,136 212,136 Z"
                    fill="#CBD5E1"
                  />
                  <path
                    d={`M8,136 C22,136 26,72 38,72 C50,72 56,120 68,120 C80,120 86,90 98,90 C112,90 116,66 130,66 C144,66 148,108 160,108 C172,108 176,${peakTipY} 188,${peakTipY} C200,${peakTipY} 204,136 212,136 Z`}
                    fill="url(#aeroPeakFront)"
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
                className="w-full accent-[#0284C7] cursor-pointer h-2 rounded-full bg-white/80"
              />
            </div>
          </div>

          {/* ROW 5: Aqua Stepper (2019 - 2022) */}
          <div className="rounded-[26px] aero-window px-6 py-6">
            <div className="relative flex items-center justify-between px-4 sm:px-8 mb-4">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-white/85 border border-sky-200" />
              {([2019, 2020, 2021, 2022] as const).map((year) => {
                const isSelected = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setActiveYear(year);
                        triggerToast(`Aero Snapshot: ${year}`);
                      })
                    }
                    aria-label={`Select year ${year}`}
                    className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center transition-transform ${
                      isSelected ? 'aero-gel-blue scale-125' : 'aero-gel-white'
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isSelected ? 'bg-white' : 'bg-sky-500'
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
                        triggerToast(`Aero Snapshot: ${year}`);
                      })
                    }
                    className={`py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all active:scale-95 ${
                      isSelected ? 'aero-gel-blue text-white' : 'aero-gel-white text-sky-950'
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

export default FrutigerAero;
