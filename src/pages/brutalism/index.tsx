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
  Terminal,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const Brutalism: React.FC = () => {
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
    triggerToast('SYS_EXEC: DOWNLOADING UI-KIT-BRUTAL.ZIP');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('DONE [200 OK]: UI-KIT-BRUTAL.ZIP SAVED');
          setTimeout(() => setDownloadProgress(null), 1500);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const categories = ['Dashboard Design', 'Mobile Components', 'Tactile UI Kits', 'Design Tokens'];

  // Scale mountain points cleanly to timeline slider (0-100)
  const peakFactor = 0.72 + (chartTimeline / 100) * 0.42;
  const peakTopY = Math.round(135 - 115 * peakFactor);

  return (
    <div
      className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen relative overflow-hidden text-black"
      style={{
        backgroundColor: '#D6D6D0',
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.13) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.13) 1px, transparent 1px)
        `,
        backgroundSize: '28px 28px',
      }}
    >
      {/* Exposed Structural Margin Index Marks */}
      <div className="hidden xl:block fixed left-3 top-28 font-mono text-[10px] font-bold tracking-widest text-black/50 pointer-events-none [writing-mode:vertical-rl]">
        GRID_SYS // 0PX_RADIUS // RAW_HTML_CONCRETE
      </div>

      {/* Brutalist Raw Terminal Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-black text-[#CCFF00] border-[3px] border-black shadow-[6px_6px_0px_#FF2A00] font-mono">
          <Terminal className="w-4 h-4 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider">{toastMessage}</span>
        </div>
      )}

      {/* Brutalism Manifesto Header Strip */}
      <div className="max-w-[1060px] mx-auto mb-9 bg-white border-[3px] border-black shadow-[8px_8px_0px_#000000]">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-black text-white font-mono text-[11px] uppercase tracking-widest border-b-[3px] border-black">
          <span className="flex items-center gap-2 font-bold">
            <span className="inline-block w-2.5 h-2.5 bg-[#CCFF00]" />
            PARADIGM_07 // WEB BRUTALISM
          </span>
          <span className="text-[#CCFF00] font-bold">BORDER-RADIUS: 0PX | BLUR: NONE</span>
        </div>

        <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <div className="inline-block bg-[#CCFF00] border-2 border-black px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider mb-2">
              RAW_ARCHITECTURAL_HONESTY
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black leading-none">
              Brutalism UI System
            </h1>
            <p className="text-xs sm:text-sm font-mono text-black/80 mt-2 max-w-2xl leading-relaxed">
              Inspired by béton brut concrete and early unstyled web pages: sharp 90-degree geometry, exposed grids, monospace system labels, stark black-and-white contrast, and unpolished industrial accents.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 font-mono text-[11px] font-bold uppercase">
            <span className="px-3 py-1.5 bg-white border-2 border-black shadow-[3px_3px_0px_#000000]">
              0PX CORNERS
            </span>
            <span className="px-3 py-1.5 bg-[#0000FF] text-white border-2 border-black shadow-[3px_3px_0px_#000000]">
              RAW LINKS
            </span>
            <span className="px-3 py-1.5 bg-[#CCFF00] text-black border-2 border-black shadow-[3px_3px_0px_#000000]">
              MONOSPACE
            </span>
          </div>
        </div>
      </div>

      {/* Main Showcase Canvas matching exact sample.jpg spatial hierarchy */}
      <div className="max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN (Login Card + 4 Action Buttons) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* Login Card */}
          <div className="relative bg-white border-[3px] border-black shadow-[8px_8px_0px_#000000] p-7 pb-12">
            {/* Top-right technical coordinate stamp */}
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-6">
              <h2 className="text-[28px] font-black uppercase tracking-tight leading-none">
                Login
              </h2>
              <span className="font-mono text-[11px] font-bold bg-[#CCFF00] border-2 border-black px-2 py-0.5">
                [AUTH_01]
              </span>
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label className="block font-mono text-[10px] font-bold uppercase tracking-widest mb-1.5 text-black/70">
                INPUT // EMAIL_ADDR
              </label>
              <div className="relative flex items-center border-2 border-black bg-[#F3F3EE] focus-within:bg-[#CCFF00] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 pr-10 bg-transparent text-black font-mono text-[13px] font-bold focus:outline-none"
                  aria-label="Email address"
                />
                <Mail className="w-4 h-4 text-black absolute right-3 pointer-events-none stroke-[2.2]" />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-5">
              <label className="block font-mono text-[10px] font-bold uppercase tracking-widest mb-1.5 text-black/70">
                INPUT // PASS_KEY
              </label>
              <div className="relative flex items-center border-2 border-black bg-[#F3F3EE] focus-within:bg-[#CCFF00] transition-colors">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 pr-10 bg-transparent text-black font-mono text-[13px] font-bold tracking-wider focus:outline-none"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                  className="absolute right-0 top-0 bottom-0 px-2.5 border-l-2 border-black bg-white hover:bg-black hover:text-white transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Forget Password Link - authentic raw HTML underline link blue */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() =>
                  handleAction('click', () => triggerToast('NOTICE: PASSWORD_RESET_LINK DISPATCHED'))
                }
                className="font-mono text-[12px] font-bold text-[#0000FF] underline underline-offset-4 hover:bg-[#0000FF] hover:text-white px-1 -ml-1 transition-colors"
              >
                Forget Password?
              </button>
            </div>

            {/* Overhanging Sign Up CTA */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
              <button
                type="button"
                onClick={() =>
                  handleAction(isSignedUp ? 'click' : 'success', () => {
                    setIsSignedUp(!isSignedUp);
                    triggerToast(
                      isSignedUp ? 'SESSION: LOGGED_OUT' : `ACCOUNT REGISTERED [${email}]`
                    );
                  })
                }
                className={`min-w-[184px] px-7 py-3.5 border-[3px] border-black font-mono text-[14px] font-black uppercase tracking-wider transition-transform active:translate-x-[4px] active:translate-y-[4px] active:shadow-none ${
                  isSignedUp
                    ? 'bg-[#CCFF00] text-black shadow-[6px_6px_0px_#000000]'
                    : 'bg-[#0000FF] text-white shadow-[6px_6px_0px_#000000] hover:bg-black hover:text-[#CCFF00]'
                }`}
              >
                {isSignedUp ? '[✓] Signed Up' : 'Sign Up ->'}
              </button>
            </div>
          </div>

          {/* 4 Stacked Action Buttons */}
          <div className="flex flex-col gap-4 pt-3">
            {/* 1. Add Friend */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => {
                  setFriendCount((c) => c + 1);
                  triggerToast(`NET_ADD: FRIENDS_COUNT = ${friendCount + 1}`);
                })
              }
              className="group w-full flex items-center justify-between px-4 py-3 bg-white border-[3px] border-black shadow-[5px_5px_0px_#000000] hover:bg-[#CCFF00] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-black text-[#CCFF00] border-2 border-black flex items-center justify-center">
                  <Plus className="w-5 h-5 stroke-[3]" />
                </div>
                <span className="font-mono text-[14px] font-bold uppercase tracking-wide">
                  Add Friend
                </span>
              </div>
              <span className="font-mono text-xs font-black bg-black text-white px-2 py-0.5">
                #{friendCount}
              </span>
            </button>

            {/* 2. Share */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => triggerToast('CLIPBOARD: RAW URL COPIED'))
              }
              className="w-full flex items-center justify-between px-4 py-3 bg-white border-[3px] border-black shadow-[5px_5px_0px_#000000] hover:bg-black hover:text-white active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#E4E4DF] group-hover:bg-[#CCFF00] text-black border-2 border-black flex items-center justify-center transition-colors">
                  <Share2 className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="font-mono text-[14px] font-bold uppercase tracking-wide">
                  Share
                </span>
              </div>
              <span className="font-mono text-[10px] font-bold opacity-60 group-hover:opacity-100">
                [EXT]
              </span>
            </button>

            {/* 3. Select Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                className="w-full flex items-center justify-between px-5 py-4 bg-white border-[3px] border-black shadow-[5px_5px_0px_#000000] hover:bg-[#F3F3EE] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
              >
                <span className="font-mono text-[14px] font-bold uppercase tracking-wide">
                  {category}
                </span>
                <ChevronDown
                  className={`w-5 h-5 stroke-[2.5] transition-transform duration-150 ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 bg-white border-[3px] border-black shadow-[6px_6px_0px_#000000]">
                  {categories.map((cat, idx) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        handleAction('click', () => {
                          setCategory(cat);
                          setIsCategoryOpen(false);
                          triggerToast(`CAT_SET: "${cat.toUpperCase()}"`);
                        })
                      }
                      className={`w-full text-left px-4 py-2.5 font-mono text-xs font-bold uppercase border-b-2 last:border-b-0 border-black flex items-center justify-between transition-colors ${
                        category === cat
                          ? 'bg-black text-[#CCFF00]'
                          : 'hover:bg-[#CCFF00] text-black'
                      }`}
                    >
                      <span>
                        0{idx + 1}. {cat}
                      </span>
                      {category === cat && <Check className="w-4 h-4 stroke-[3]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Download */}
            <button
              type="button"
              onClick={handleDownload}
              className="relative overflow-hidden w-full flex items-center justify-between px-4 py-3 bg-[#E4E4DF] border-[3px] border-black shadow-[5px_5px_0px_#000000] hover:bg-white active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
            >
              {downloadProgress !== null && (
                <div
                  className="absolute inset-y-0 left-0 bg-[#CCFF00] border-r-2 border-black transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              )}
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 bg-[#0000FF] text-white border-2 border-black flex items-center justify-center">
                  <Download className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="font-mono text-[14px] font-bold uppercase tracking-wide">
                  {downloadProgress !== null ? `GET ${downloadProgress}%` : 'Download'}
                </span>
              </div>
              <span className="relative z-10 font-mono text-[10px] font-black border border-black px-1.5 py-0.5 bg-white">
                .ZIP
              </span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (Quick Nav, Sparkline+Switch, Slider, Charts, Stepper) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-7">
          {/* ROW 1: 4 Quick Navigation Square Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {(
              [
                { id: 'home', label: 'Home', icon: Home },
                { id: 'calender', label: 'Calender', icon: Calendar },
                { id: 'notification', label: 'Notification', icon: Bell },
                { id: 'setting', label: 'Setting', icon: Settings },
              ] as const
            ).map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleAction('click', () => {
                      setActiveNav(item.id);
                      triggerToast(`ROUTE: /${item.label.toUpperCase()}`);
                    })
                  }
                  className={`relative aspect-square sm:aspect-[1/0.92] border-[3px] border-black flex flex-col items-center justify-center gap-2.5 transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none ${
                    isActive
                      ? 'bg-[#CCFF00] text-black shadow-[6px_6px_0px_#000000]'
                      : 'bg-white text-black shadow-[4px_4px_0px_#000000] hover:bg-black hover:text-white'
                  }`}
                >
                  <span className="absolute top-1.5 left-2 font-mono text-[10px] font-bold opacity-70">
                    0{idx + 1}
                  </span>
                  {isActive && (
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-black" />
                  )}
                  <Icon className="w-6 h-6 stroke-[2.4]" />
                  <span className="font-mono text-[12px] font-bold uppercase tracking-tight">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ROW 2: "Last 7 days" +22,12 Sparkline Card + ON/OFF Brutalist Switch */}
          <div className="flex flex-col sm:flex-row gap-6 items-stretch">
            {/* Sparkline Card */}
            <div className="flex-1 bg-white border-[3px] border-black shadow-[6px_6px_0px_#000000] px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-black/65">
                  Last 7 days
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-[#CCFF00] border-2 border-black">
                    <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span className="font-mono text-xl font-black tracking-tight">+22,12</span>
                </div>
              </div>

              {/* Raw Jagged Brutalist Polyline Chart */}
              <div className="w-[210px] sm:w-[250px] h-[64px] bg-[#F3F3EE] border-2 border-black p-1.5 shrink-0">
                <svg viewBox="0 0 240 54" className="w-full h-full overflow-visible">
                  {/* Raw grid lines */}
                  <line x1="0" y1="18" x2="240" y2="18" stroke="#000000" strokeOpacity="0.15" strokeDasharray="3 3" />
                  <line x1="0" y1="36" x2="240" y2="36" stroke="#000000" strokeOpacity="0.15" strokeDasharray="3 3" />
                  {/* Sharp polyline */}
                  <polyline
                    fill="none"
                    stroke="#000000"
                    strokeWidth="3"
                    strokeLinejoin="miter"
                    points="6,46 38,18 72,34 108,24 136,36 184,10 232,42"
                  />
                  {/* Highlight marker square */}
                  <rect
                    x="179"
                    y="5"
                    width="10"
                    height="10"
                    fill="#FF2A00"
                    stroke="#000000"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
            </div>

            {/* Mechanical ON / OFF Switch */}
            <button
              type="button"
              onClick={() =>
                handleAction('toggle', () => {
                  const next = !isSwitchOn;
                  setIsSwitchOn(next);
                  triggerToast(`SYS_POWER: ${next ? 'ON [1]' : 'OFF [0]'}`);
                })
              }
              aria-pressed={isSwitchOn}
              className="w-full sm:w-[144px] min-h-[82px] bg-white border-[3px] border-black shadow-[6px_6px_0px_#000000] p-2 flex items-center justify-between gap-2 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
            >
              <div
                className={`w-1/2 h-full border-2 border-black flex items-center justify-center font-mono text-xs font-black tracking-widest transition-colors ${
                  isSwitchOn
                    ? 'bg-[#0000FF] text-white'
                    : 'bg-[#E4E4DF] text-black/45'
                }`}
              >
                ON
              </div>
              <div
                className={`w-1/2 h-full border-2 border-black flex items-center justify-center font-mono text-xs font-black tracking-widest transition-colors ${
                  !isSwitchOn
                    ? 'bg-[#FF2A00] text-white'
                    : 'bg-[#E4E4DF] text-black/45'
                }`}
              >
                OFF
              </div>
            </button>
          </div>

          {/* ROW 3: Interactive Slider + Callout Tooltip */}
          <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_#000000] p-6 pb-7">
            <div className="flex items-center gap-5">
              {/* Clickable Raw Track */}
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
                className="relative flex-1 h-7 bg-[#E4E4DF] border-2 border-black cursor-pointer"
              >
                <div
                  className="h-full bg-[#0000FF] border-r-2 border-black transition-all duration-100"
                  style={{ width: `${sliderValue}%` }}
                />
                {/* Sharp Block Thumb */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-10 bg-[#CCFF00] border-[3px] border-black shadow-[3px_3px_0px_#000000] flex flex-col items-center justify-center gap-1"
                  style={{ left: `${sliderValue}%` }}
                >
                  <span className="w-2.5 h-0.5 bg-black" />
                  <span className="w-2.5 h-0.5 bg-black" />
                </div>
              </div>

              <div className="font-mono text-xl font-black bg-black text-[#CCFF00] border-2 border-black px-3 py-1 min-w-[74px] text-center">
                {sliderValue}%
              </div>
            </div>

            {/* Bottom Tooltip Callout Box */}
            <div className="mt-5 flex justify-center sm:justify-end sm:pr-20">
              <div className="relative max-w-[260px] bg-[#F3F3EE] border-2 border-black shadow-[4px_4px_0px_#000000] px-3.5 py-2.5">
                <div className="w-3 h-3 bg-[#F3F3EE] border-l-2 border-t-2 border-black rotate-45 absolute -top-[7px] left-1/2 -translate-x-1/2" />
                <p className="font-mono text-[10px] leading-snug text-black font-semibold">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                </p>
              </div>
            </div>
          </div>

          {/* ROW 4: Two Analytics Cards ($4891.22 Radial Gauge + 2201 Mountain Chart) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Analytics Card ($4891.22 + 75% Gauge) */}
            <div className="md:col-span-7 bg-white border-[3px] border-black shadow-[7px_7px_0px_#000000] p-6 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[11px] font-bold uppercase tracking-widest bg-black text-white px-2 py-0.5 inline-block mb-3">
                    LOREM IPSUM DOLOR SIT
                  </div>
                  <div className="text-3xl font-black tracking-tight font-mono text-black">
                    $4891.22
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="inline-flex items-center justify-center w-4 h-4 bg-[#CCFF00] border border-black">
                      <ArrowUp className="w-3 h-3 stroke-[3]" />
                    </span>
                    <span className="font-mono text-xs font-black">75%</span>
                  </div>
                </div>

                {/* Exposed 75% Sharp-Capped Brutalist Gauge */}
                <div className="relative w-[138px] h-[138px] shrink-0 flex items-center justify-center bg-[#F3F3EE] border-2 border-black">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90 p-2">
                    {/* Track */}
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#D6D6D0"
                      strokeWidth="12"
                    />
                    {/* Inner monochrome secondary arc */}
                    <circle
                      cx="60"
                      cy="60"
                      r="32"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="6"
                      strokeDasharray="201"
                      strokeDashoffset="76"
                    />
                    {/* Outer primary 75% arc with flat brutalist butt caps */}
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#0000FF"
                      strokeWidth="12"
                      strokeDasharray="289"
                      strokeDashoffset={289 * 0.25}
                      strokeLinecap="butt"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="font-mono text-lg font-black bg-white border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_#000]">
                      75%
                    </span>
                  </div>
                </div>
              </div>

              {/* Dual Legends matching sample.jpg */}
              <div className="flex flex-col gap-2.5 pt-3 border-t-2 border-black">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 bg-black border border-black shrink-0" />
                  <span className="font-mono text-[11px] font-bold text-black/80">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 bg-[#0000FF] border border-black shrink-0" />
                  <span className="font-mono text-[11px] font-bold text-black/80">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
              </div>
            </div>

            {/* Right Analytics Card (2201 + Mountain Peaks + Slider) */}
            <div className="md:col-span-5 bg-white border-[3px] border-black shadow-[7px_7px_0px_#000000] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl font-black tracking-tight">2201</span>
                  <div className="flex-1 h-0.5 bg-black relative">
                    <span className="w-2.5 h-2.5 bg-[#FF2A00] border-2 border-black absolute right-0 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <p className="font-mono text-[10px] text-black/75 mt-2 leading-snug">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit...
                </p>
              </div>

              {/* Dual Overlapping Sharp Polygonal Mountain Peaks */}
              <div className="my-4 h-[132px] bg-[#F3F3EE] border-2 border-black p-1 relative overflow-hidden">
                <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                  {/* Grid background */}
                  <line x1="0" y1="35" x2="220" y2="35" stroke="#000" strokeOpacity="0.12" />
                  <line x1="0" y1="70" x2="220" y2="70" stroke="#000" strokeOpacity="0.12" />
                  <line x1="0" y1="105" x2="220" y2="105" stroke="#000" strokeOpacity="0.12" />
                  {/* Back Peak Series */}
                  <polygon
                    points={`10,138 35,88 64,116 92,62 122,95 148,54 176,102 210,138`}
                    fill="#A8A8A0"
                    stroke="#000000"
                    strokeWidth="2"
                  />
                  {/* Front Peak Series (responds to timeline slider) */}
                  <polygon
                    points={`10,138 30,74 60,118 86,88 118,68 145,105 182,${peakTopY} 210,138`}
                    fill="#0000FF"
                    fillOpacity="0.88"
                    stroke="#000000"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>

              {/* Mountain Bottom Timeline Slider */}
              <div className="flex items-center gap-3">
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
                  className="w-full accent-black cursor-pointer h-2 bg-[#E4E4DF] border border-black rounded-none"
                />
                <span className="font-mono text-[10px] font-black border border-black px-1.5 py-0.5 bg-[#CCFF00]">
                  {chartTimeline}
                </span>
              </div>
            </div>
          </div>

          {/* ROW 5: Timeline Stepper (2019 - 2022) */}
          <div className="bg-white border-[3px] border-black shadow-[7px_7px_0px_#000000] px-6 py-6">
            <div className="relative flex items-center justify-between px-4 sm:px-8 mb-5">
              {/* Exposed Horizontal Rail */}
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-black" />
              {([2019, 2020, 2021, 2022] as const).map((year) => {
                const isSelected = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setActiveYear(year);
                        triggerToast(`TIMELINE_NODE: YEAR_${year}`);
                      })
                    }
                    aria-label={`Select year ${year}`}
                    className={`relative z-10 w-6 h-6 border-[3px] border-black transition-transform ${
                      isSelected
                        ? 'bg-[#CCFF00] scale-125 shadow-[3px_3px_0px_#000000]'
                        : 'bg-white hover:bg-[#0000FF]'
                    }`}
                  />
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
                        triggerToast(`TIMELINE_NODE: YEAR_${year}`);
                      })
                    }
                    className={`py-2.5 border-2 border-black font-mono text-xs sm:text-sm font-black tracking-wider transition-all active:translate-x-[2px] active:translate-y-[2px] ${
                      isSelected
                        ? 'bg-[#0000FF] text-white shadow-[4px_4px_0px_#000000]'
                        : 'bg-[#F3F3EE] text-black hover:bg-[#CCFF00]'
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

export default Brutalism;

