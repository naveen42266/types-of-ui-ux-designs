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
  Sticker,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const NeoBrutalism: React.FC = () => {
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
    triggerToast('Packing Gumroad-style Neo Kit...');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('Done! Saved UI-Kit-NeoBrutal.zip');
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

  const navTiles = [
    { id: 'home', label: 'Home', icon: Home, bg: 'bg-[#FFE600]', badge: 'bg-[#FF90E8]' },
    { id: 'calender', label: 'Calender', icon: Calendar, bg: 'bg-[#7DF9FF]', badge: 'bg-[#FFE600]' },
    { id: 'notification', label: 'Notification', icon: Bell, bg: 'bg-[#FF90E8]', badge: 'bg-[#A7F3D0]' },
    { id: 'setting', label: 'Setting', icon: Settings, bg: 'bg-[#C4B5FD]', badge: 'bg-[#7DF9FF]' },
  ] as const;

  return (
    <div
      className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen text-black"
      style={{
        backgroundColor: '#FFF8E7',
        backgroundImage: 'radial-gradient(rgba(0,0,0,0.12) 1.25px, transparent 1.25px)',
        backgroundSize: '22px 22px',
      }}
    >
      {/* Hard-Shadow Retro-Pop Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#FFE600] text-black border-[2.5px] border-black shadow-[5px_5px_0px_#000000]">
          <Sparkles className="w-4 h-4 shrink-0 fill-black" />
          <span className="text-xs font-extrabold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Neo-Brutalism Header Banner */}
      <div className="max-w-[1060px] mx-auto mb-9 rounded-3xl bg-[#FF90E8] border-[3px] border-black shadow-[7px_7px_0px_#000000] p-6 sm:p-7 relative">
        {/* Retro Tilted Corner Sticker */}
        <div className="hidden sm:flex items-center gap-1.5 absolute -top-4 right-6 px-3.5 py-1 rounded-full bg-[#FFE600] border-[2.5px] border-black shadow-[3px_3px_0px_#000000] rotate-3 text-[11px] font-black uppercase tracking-wider">
          <Sticker className="w-3.5 h-3.5" /> Pop Modernism
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-black text-[11px] font-black uppercase tracking-wider mb-2.5 shadow-[2px_2px_0px_#000000]">
              FIGMA & GUMROAD // NEO-BRUTALISM
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black">
              Neo-Brutalism UI System
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-black/85 mt-1.5 max-w-2xl leading-relaxed">
              Pairs approachable rounded geometry and high-saturation candy-pop colors with thick ink outlines, zero-blur hard black drop shadows, and snappy spring presses.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 text-[11px] font-black">
            <span className="px-3 py-1.5 rounded-xl bg-[#FFE600] border-2 border-black shadow-[3px_3px_0px_#000000]">
              HARD SHADOWS
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#7DF9FF] border-2 border-black shadow-[3px_3px_0px_#000000]">
              3PX BORDERS
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#A7F3D0] border-2 border-black shadow-[3px_3px_0px_#000000]">
              POP PALETTE
            </span>
          </div>
        </div>
      </div>

      {/* Main Showcase Canvas matching exact sample.jpg layout */}
      <div className="max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN (Login Card + 4 Pop Action Pills) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-9">
          {/* Login Card */}
          <div className="relative rounded-3xl bg-white border-[3px] border-black shadow-[7px_7px_0px_#000000] p-7 pb-12">
            {/* Playful top-right sticker tag */}
            <span className="absolute -top-3.5 right-6 px-3 py-0.5 rounded-full bg-[#7DF9FF] border-2 border-black shadow-[2px_2px_0px_#000000] -rotate-2 text-[10px] font-black uppercase">
              Welcome Back!
            </span>

            <h2 className="text-[28px] font-black tracking-tight text-black mb-7">Login</h2>

            {/* Email Input */}
            <div className="mb-5">
              <div className="relative flex items-center rounded-2xl bg-[#FFF8E7] border-[2.5px] border-black focus-within:bg-[#FFE600] focus-within:shadow-[3px_3px_0px_#000000] transition-all">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pr-10 bg-transparent text-black font-bold text-sm focus:outline-none"
                  aria-label="Email address"
                />
                <Mail className="w-4 h-4 text-black absolute right-3.5 pointer-events-none stroke-[2.5]" />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <div className="relative flex items-center rounded-2xl bg-[#FFF8E7] border-[2.5px] border-black focus-within:bg-[#FFE600] focus-within:shadow-[3px_3px_0px_#000000] transition-all">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-10 bg-transparent text-black font-bold text-sm tracking-wider focus:outline-none"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                  className="absolute right-3 p-1 rounded-lg hover:bg-black hover:text-white transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Forget Password Link */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() =>
                  handleAction('click', () => triggerToast('Reset sticker sent to your inbox!'))
                }
                className="text-xs font-extrabold text-black underline decoration-2 underline-offset-4 hover:bg-[#FF90E8] px-1.5 py-0.5 rounded transition-colors -ml-1.5"
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
                    triggerToast(isSignedUp ? 'Signed out!' : `Boom! Signed up as ${email}`);
                  })
                }
                className={`min-w-[186px] px-8 py-3.5 rounded-full border-[3px] border-black font-black text-sm tracking-wide transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none ${
                  isSignedUp
                    ? 'bg-[#A7F3D0] text-black shadow-[5px_5px_0px_#000000]'
                    : 'bg-[#FFE600] hover:bg-[#FF90E8] text-black shadow-[5px_5px_0px_#000000]'
                }`}
              >
                {isSignedUp ? 'Signed Up ✓' : 'Sign Up'}
              </button>
            </div>
          </div>

          {/* 4 Stacked Pop-Modern Action Pills */}
          <div className="flex flex-col gap-4 pt-2">
            {/* 1. Add Friend */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => {
                  setFriendCount((c) => c + 1);
                  triggerToast(`Squad up! (${friendCount + 1} friends)`);
                })
              }
              className="w-full flex items-center justify-between px-4 py-3 rounded-full bg-[#7DF9FF] hover:bg-[#FFE600] border-[2.5px] border-black shadow-[5px_5px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000]">
                  <Plus className="w-5 h-5 stroke-[3]" />
                </div>
                <span className="text-sm font-black text-black">Add Friend</span>
              </div>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-black text-[#FFE600]">
                {friendCount}
              </span>
            </button>

            {/* 2. Share */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => triggerToast('Share link copied! Go viral!'))
              }
              className="w-full flex items-center justify-between px-4 py-3 rounded-full bg-white hover:bg-[#FF90E8] border-[2.5px] border-black shadow-[5px_5px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FF90E8] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000]">
                  <Share2 className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-sm font-black text-black">Share</span>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#FFE600] border border-black">
                POP
              </span>
            </button>

            {/* 3. Select Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                className="w-full flex items-center justify-between px-6 py-4 rounded-full bg-[#C4B5FD] hover:bg-[#DDD6FE] border-[2.5px] border-black shadow-[5px_5px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
              >
                <span className="text-sm font-black text-black">{category}</span>
                <ChevronDown
                  className={`w-5 h-5 stroke-[2.5] transition-transform duration-200 ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-2xl bg-white border-[2.5px] border-black shadow-[6px_6px_0px_#000000] p-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        handleAction('click', () => {
                          setCategory(cat);
                          setIsCategoryOpen(false);
                          triggerToast(`Picked: ${cat}`);
                        })
                      }
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-between transition-colors ${
                        category === cat
                          ? 'bg-[#FFE600] text-black border-2 border-black'
                          : 'text-black hover:bg-[#FFF8E7]'
                      }`}
                    >
                      <span>{cat}</span>
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
              className="relative overflow-hidden w-full flex items-center justify-between px-4 py-3 rounded-full bg-[#A7F3D0] hover:bg-[#6EE7B7] border-[2.5px] border-black shadow-[5px_5px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
            >
              {downloadProgress !== null && (
                <div
                  className="absolute inset-y-0 left-0 bg-[#FFE600] border-r-2 border-black transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              )}
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black text-[#FFE600] border-2 border-black flex items-center justify-center">
                  <Download className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-sm font-black text-black">
                  {downloadProgress !== null ? `Downloading ${downloadProgress}%` : 'Download'}
                </span>
              </div>
              <span className="relative z-10 text-[10px] font-black px-2 py-0.5 rounded-full bg-white border border-black">
                ZIP
              </span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (Quick Nav, Sparkline+Switch, Slider, Charts, Stepper) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ROW 1: 4 Retro-Pop Navigation Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {navTiles.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleAction('click', () => {
                      setActiveNav(item.id);
                      triggerToast(`Opened ${item.label}!`);
                    })
                  }
                  className={`aspect-square sm:aspect-[1/0.9] rounded-2xl border-[2.5px] border-black flex flex-col items-center justify-center gap-2.5 transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none ${
                    isActive
                      ? `${item.bg} shadow-[6px_6px_0px_#000000]`
                      : 'bg-white shadow-[4px_4px_0px_#000000] hover:bg-[#FFF8E7]'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000] ${
                      isActive ? 'bg-white text-black' : `${item.badge} text-black`
                    }`}
                  >
                    <Icon className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <span className="text-xs font-black tracking-tight text-black">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ROW 2: "Last 7 days" +22,12 Sparkline Card + ON/OFF Switch */}
          <div className="flex flex-col sm:flex-row gap-6 items-stretch">
            <div className="flex-1 rounded-3xl bg-[#A7F3D0] border-[3px] border-black shadow-[6px_6px_0px_#000000] px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-black/75">
                  Last 7 days
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-[#FFE600] border-2 border-black">
                    <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span className="text-xl font-black text-black">+22,12</span>
                </div>
              </div>

              <div className="w-[205px] sm:w-[245px] h-[64px] rounded-2xl bg-white border-2 border-black p-1.5 shrink-0 shadow-[3px_3px_0px_#000000]">
                <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                  <path
                    d="M8,50 C28,50 32,20 55,22 C76,24 80,44 102,38 C122,32 132,48 154,32 C172,18 182,12 194,16 C210,22 222,48 234,48"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="192"
                    cy="15"
                    r="7"
                    fill="#FF90E8"
                    stroke="#000000"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
            </div>

            {/* Chunky Pop Toggle Switch */}
            <button
              type="button"
              onClick={() =>
                handleAction('toggle', () => {
                  const next = !isSwitchOn;
                  setIsSwitchOn(next);
                  triggerToast(`Power switched ${next ? 'ON' : 'OFF'}!`);
                })
              }
              aria-pressed={isSwitchOn}
              className={`relative w-full sm:w-[144px] min-h-[82px] rounded-full border-[3px] border-black shadow-[6px_6px_0px_#000000] p-2.5 flex items-center justify-between transition-colors ${
                isSwitchOn ? 'bg-[#FFE600]' : 'bg-[#E5E7EB]'
              }`}
            >
              <span
                className={`pl-3 text-xs font-black tracking-widest ${
                  isSwitchOn ? 'text-black' : 'text-black/35'
                }`}
              >
                ON
              </span>
              <span
                className={`pr-3 text-xs font-black tracking-widest ${
                  !isSwitchOn ? 'text-black' : 'text-black/35'
                }`}
              >
                OFF
              </span>
              <div
                className={`absolute top-2 bottom-2 w-[60px] rounded-full bg-white border-[2.5px] border-black shadow-[2px_2px_0px_#000000] transition-all duration-200 flex items-center justify-center ${
                  isSwitchOn ? 'left-[calc(100%-68px)]' : 'left-2'
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full border border-black ${
                    isSwitchOn ? 'bg-[#7DF9FF]' : 'bg-[#FF90E8]'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* ROW 3: Interactive Slider + Speech Sticker Callout */}
          <div className="rounded-3xl bg-white border-[3px] border-black shadow-[6px_6px_0px_#000000] p-6 pb-7">
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
                className="relative flex-1 h-5 rounded-full bg-[#FFF8E7] border-[2.5px] border-black cursor-pointer"
              >
                <div
                  className="h-full rounded-full bg-[#FF90E8] border-r-[2.5px] border-black transition-all duration-150"
                  style={{ width: `${sliderValue}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FFE600] border-[2.5px] border-black shadow-[3px_3px_0px_#000000] flex items-center justify-center"
                  style={{ left: `${sliderValue}%` }}
                >
                  <span className="w-2 h-2 rounded-full bg-black" />
                </div>
              </div>

              <div className="text-lg font-black px-3 py-1 rounded-xl bg-[#7DF9FF] border-2 border-black shadow-[3px_3px_0px_#000000] min-w-[68px] text-center">
                {sliderValue}%
              </div>
            </div>

            <div className="mt-5 flex justify-center sm:justify-end sm:pr-20">
              <div className="relative max-w-[265px] rounded-2xl bg-[#FFE600] border-[2.5px] border-black shadow-[4px_4px_0px_#000000] px-4 py-2.5">
                <div className="w-3 h-3 bg-[#FFE600] border-l-[2.5px] border-t-[2.5px] border-black rotate-45 absolute -top-[7px] left-1/2 -translate-x-1/2" />
                <p className="text-[10px] leading-snug text-black font-bold">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                </p>
              </div>
            </div>
          </div>

          {/* ROW 4: Two Pop Analytics Cards ($4891.22 + 2201 Mountain Peaks) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Card */}
            <div className="md:col-span-7 rounded-3xl bg-[#7DF9FF] border-[3px] border-black shadow-[7px_7px_0px_#000000] p-6 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-block text-[10px] font-black uppercase tracking-wider bg-black text-[#FFE600] px-2.5 py-0.5 rounded-full mb-2.5">
                    LOREM IPSUM DOLOR SIT
                  </div>
                  <div className="text-3xl font-black tracking-tight text-black">$4891.22</div>
                  <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full bg-white border-2 border-black shadow-[2px_2px_0px_#000000]">
                    <ArrowUp className="w-3 h-3 stroke-[3]" />
                    <span className="text-xs font-black">75%</span>
                  </div>
                </div>

                {/* Bold Ink-Outlined 75% Gauge */}
                <div className="relative w-[138px] h-[138px] rounded-full bg-white border-[2.5px] border-black shadow-[4px_4px_0px_#000000] shrink-0 flex items-center justify-center p-1.5">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="46" fill="none" stroke="#E5E7EB" strokeWidth="11" />
                    <circle
                      cx="60"
                      cy="60"
                      r="33"
                      fill="none"
                      stroke="#FF90E8"
                      strokeWidth="6"
                      strokeDasharray="207"
                      strokeDashoffset="78"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="11"
                      strokeDasharray="289"
                      strokeDashoffset={289 * 0.25}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute w-[54px] h-[54px] rounded-full bg-[#FFE600] border-2 border-black flex items-center justify-center text-sm font-black">
                    75%
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FF90E8] border-2 border-black shrink-0" />
                  <span className="text-xs font-bold text-black">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-black border-2 border-black shrink-0" />
                  <span className="text-xs font-bold text-black">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
              </div>
            </div>

            {/* Right Card (2201 + Mountain Peaks) */}
            <div className="md:col-span-5 rounded-3xl bg-[#FFF8E7] border-[3px] border-black shadow-[7px_7px_0px_#000000] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black tracking-tight text-black">2201</span>
                  <div className="flex-1 h-[2.5px] bg-black relative">
                    <span className="w-3 h-3 rounded-full bg-[#FF6B4A] border-2 border-black absolute right-0 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <p className="text-[10px] text-black/80 font-semibold mt-1.5 leading-snug">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit...
                </p>
              </div>

              <div className="my-4 h-[132px] rounded-2xl bg-white border-2 border-black p-1.5 shadow-[3px_3px_0px_#000000]">
                <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                  <path
                    d="M8,136 C25,136 30,84 44,84 C58,84 62,118 76,118 C90,118 96,60 110,60 C124,60 132,96 146,96 C160,96 168,68 182,68 C196,68 202,136 212,136 Z"
                    fill="#C4B5FD"
                    stroke="#000000"
                    strokeWidth="2"
                  />
                  <path
                    d={`M8,136 C22,136 26,72 38,72 C50,72 56,120 68,120 C80,120 86,90 98,90 C112,90 116,66 130,66 C144,66 148,108 160,108 C172,108 176,${peakTipY} 188,${peakTipY} C200,${peakTipY} 204,136 212,136 Z`}
                    fill="#FF6B4A"
                    fillOpacity="0.92"
                    stroke="#000000"
                    strokeWidth="2.2"
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
                className="w-full accent-black cursor-pointer h-2.5 rounded-full bg-white border-2 border-black"
              />
            </div>
          </div>

          {/* ROW 5: Timeline Stepper (2019 - 2022) */}
          <div className="rounded-3xl bg-white border-[3px] border-black shadow-[7px_7px_0px_#000000] px-6 py-6">
            <div className="relative flex items-center justify-between px-4 sm:px-8 mb-5">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-black" />
              {([2019, 2020, 2021, 2022] as const).map((year) => {
                const isSelected = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setActiveYear(year);
                        triggerToast(`Timeline pop: ${year}!`);
                      })
                    }
                    aria-label={`Select year ${year}`}
                    className={`relative z-10 w-7 h-7 rounded-full border-[2.5px] border-black flex items-center justify-center transition-transform ${
                      isSelected
                        ? 'bg-[#FFE600] scale-125 shadow-[3px_3px_0px_#000000]'
                        : 'bg-white hover:bg-[#FF90E8]'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-black" />
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
                        triggerToast(`Timeline pop: ${year}!`);
                      })
                    }
                    className={`py-2.5 rounded-full border-[2.5px] border-black text-xs sm:text-sm font-black transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none ${
                      isSelected
                        ? 'bg-[#FF90E8] text-black shadow-[4px_4px_0px_#000000]'
                        : 'bg-[#FFF8E7] text-black hover:bg-[#FFE600]'
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

export default NeoBrutalism;

