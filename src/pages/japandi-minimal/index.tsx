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
  Leaf,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const JapandiMinimal: React.FC = () => {
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
    triggerToast('Gathering linen & stone tokens...');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('Japandi Folio saved quietly');
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
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen relative overflow-hidden japandi-washi-bg text-[#2F2A25]">
      {/* Organic Wabi-Sabi Botanical Enso Circle Backdrop */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-25">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="w-full h-full">
          <circle
            cx="1260"
            cy="210"
            r="165"
            fill="none"
            stroke="#B86B52"
            strokeWidth="12"
            strokeDasharray="860 95"
            strokeLinecap="round"
          />
          <ellipse cx="180" cy="740" rx="220" ry="110" fill="#6B7F5E" opacity="0.22" />
        </svg>
      </div>

      {/* Serene Ceramic Notification Pill */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-full japandi-card bg-[#2F2A25] text-[#FBF9F4] border-[#2F2A25]">
          <Leaf className="w-4 h-4 text-[#A3B899] shrink-0" />
          <span className="text-xs font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Japandi / Warm Minimal Banner */}
      <div className="relative z-10 max-w-[1060px] mx-auto mb-9 rounded-[28px] japandi-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6B7F5E]/15 text-[#4C5C41] text-[11px] font-semibold tracking-wider uppercase mb-2.5">
              <span>和 // WABI-SABI × NORDIC HYGGE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-[#2F2A25]">
              Japandi / Warm Minimal UI
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6257] mt-1.5 max-w-2xl leading-relaxed">
              Calm organic balance uniting raw linen textures, warm limestone cards, hinoki wood charcoal typography, matcha-moss accents, and soft terracotta warmth.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 text-[11px] font-semibold">
            <span className="px-3.5 py-1.5 rounded-full bg-[#EDE6D8] text-[#5C5347] border border-[#DDD4C4]">
              Washi Linen
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#6B7F5E] text-white">
              Matcha Moss
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#B86B52] text-white">
              Terracotta
            </span>
          </div>
        </div>
      </div>

      {/* Main Showcase Canvas matching exact sample.jpg layout */}
      <div className="relative z-10 max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN (Ceramic Login Card + 4 Pebble Action Buttons) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-9">
          {/* Login Card */}
          <div className="relative rounded-[32px] japandi-card p-7 pb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[28px] font-serif font-normal tracking-tight text-[#2F2A25]">
                Login
              </h2>
              {/* Japanese Hanko Stamp Accent */}
              <span className="w-7 h-7 rounded-md border border-[#B86B52]/60 text-[#B86B52] text-xs font-serif flex items-center justify-center">
                和
              </span>
            </div>

            {/* Email Input */}
            <div className="mb-5">
              <div className="relative flex items-center rounded-2xl border border-[#DDD5C7] bg-[#F5F1E8] px-4 py-3 focus-within:border-[#6B7F5E] focus-within:bg-[#FBF9F4] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-9 bg-transparent text-sm font-medium text-[#2F2A25] focus:outline-none"
                  aria-label="Email address"
                />
                <Mail className="w-4 h-4 text-[#8B8174] absolute right-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <div className="relative flex items-center rounded-2xl border border-[#DDD5C7] bg-[#F5F1E8] px-4 py-3 focus-within:border-[#6B7F5E] focus-within:bg-[#FBF9F4] transition-colors">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-9 bg-transparent text-sm font-medium tracking-wider text-[#2F2A25] focus:outline-none"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                  className="absolute right-3 p-1 rounded-full hover:bg-black/5 text-[#8B8174] transition-colors"
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
                  handleAction('click', () => triggerToast('Password note sent calmly'))
                }
                className="text-xs font-medium text-[#B86B52] underline underline-offset-4 hover:text-[#2F2A25] transition-colors"
              >
                Forget Password?
              </button>
            </div>

            {/* Overhanging Warm Stone Pill: Sign Up */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
              <button
                type="button"
                onClick={() =>
                  handleAction(isSignedUp ? 'click' : 'success', () => {
                    setIsSignedUp(!isSignedUp);
                    triggerToast(isSignedUp ? 'Returned to quiet state' : `Welcome, ${email}`);
                  })
                }
                className={`min-w-[188px] px-8 py-3.5 rounded-full text-sm font-semibold text-[#FBF9F4] shadow-[0_12px_24px_-8px_rgba(47,42,37,0.35)] transition-all active:scale-95 ${
                  isSignedUp
                    ? 'bg-[#6B7F5E]'
                    : 'bg-[#2F2A25] hover:bg-[#B86B52]'
                }`}
              >
                {isSignedUp ? 'Signed Up ✓' : 'Sign Up'}
              </button>
            </div>
          </div>

          {/* 4 Stacked Pebble Linen Action Pills */}
          <div className="flex flex-col gap-3.5 pt-2">
            {/* 1. Add Friend */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => {
                  setFriendCount((c) => c + 1);
                  triggerToast(`Guest welcomed (${friendCount + 1})`);
                })
              }
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-full japandi-pebble hover:bg-[#F5F1E8]"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#6B7F5E] text-white flex items-center justify-center">
                  <Plus className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-[15px] font-medium text-[#2F2A25]">Add Friend</span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EDE6D8] text-[#5C5347]">
                {friendCount}
              </span>
            </button>

            {/* 2. Share */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => triggerToast('Journal link gently copied'))
              }
              className="w-full flex items-center gap-4 px-4 py-2.5 rounded-full japandi-pebble hover:bg-[#F5F1E8]"
            >
              <div className="w-11 h-11 rounded-full bg-[#B86B52] text-white flex items-center justify-center">
                <Share2 className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="text-[15px] font-medium text-[#2F2A25]">Share</span>
            </button>

            {/* 3. Select Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                className="w-full flex items-center justify-between px-6 py-4 rounded-full japandi-pebble hover:bg-[#F5F1E8]"
              >
                <span className="text-[15px] font-medium text-[#2F2A25]">{category}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#8B8174] transition-transform duration-200 ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-3xl japandi-card p-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        handleAction('click', () => {
                          setCategory(cat);
                          setIsCategoryOpen(false);
                          triggerToast(`Collection: ${cat}`);
                        })
                      }
                      className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-medium flex items-center justify-between transition-colors ${
                        category === cat
                          ? 'bg-[#6B7F5E] text-white'
                          : 'text-[#2F2A25] hover:bg-[#F2ECE1]'
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
              className="relative overflow-hidden w-full flex items-center gap-4 px-4 py-2.5 rounded-full japandi-pebble hover:bg-[#F5F1E8]"
            >
              {downloadProgress !== null && (
                <div
                  className="absolute inset-y-0 left-0 bg-[#6B7F5E]/25 transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              )}
              <div className="relative z-10 w-11 h-11 rounded-full bg-[#2F2A25] text-[#FBF9F4] flex items-center justify-center">
                <Download className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="relative z-10 text-[15px] font-medium text-[#2F2A25]">
                {downloadProgress !== null ? `Downloading ${downloadProgress}%` : 'Download'}
              </span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (Quick Nav, Sparkline+Switch, Slider, Organic Charts, Stepper) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ROW 1: 4 Quiet Stone Navigation Tiles */}
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
                      triggerToast(`Sanctuary -> ${item.label}`);
                    })
                  }
                  className={`aspect-square sm:aspect-[1/0.88] rounded-[26px] japandi-pebble flex flex-col items-center justify-center gap-2.5 ${
                    isActive ? 'bg-[#EDE6D8] border-[#6B7F5E]' : 'bg-[#FBF9F4]'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center ${
                      isActive
                        ? 'bg-[#6B7F5E] text-white'
                        : 'bg-[#F2ECE1] text-[#6B6257]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-[#2F2A25]">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* ROW 2: "Last 7 days" +22,12 Calm Spline + Ceramic ON/OFF Switch */}
          <div className="flex flex-col sm:flex-row gap-6 items-stretch">
            <div className="flex-1 rounded-[26px] japandi-card px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-medium text-[#7C7265]">Last 7 days</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#6B7F5E]/15 text-[#4C5C41]">
                    <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span className="text-xl font-serif text-[#2F2A25]">+22,12</span>
                </div>
              </div>

              <div className="w-[210px] sm:w-[250px] h-[64px] rounded-2xl bg-[#F2ECE1]/80 p-2 shrink-0">
                <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                  <path
                    d="M8,50 C28,50 32,20 55,22 C76,24 80,44 102,38 C122,32 132,48 154,32 C172,18 182,12 194,16 C210,22 222,48 234,48"
                    fill="none"
                    stroke="#6B7F5E"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="192" cy="15" r="5.5" fill="#B86B52" stroke="#FBF9F4" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* Wooden / Ceramic Switch */}
            <button
              type="button"
              onClick={() =>
                handleAction('toggle', () => {
                  const next = !isSwitchOn;
                  setIsSwitchOn(next);
                  triggerToast(`Ambiance -> ${next ? 'Calm On' : 'Rest Off'}`);
                })
              }
              aria-pressed={isSwitchOn}
              className={`relative w-full sm:w-[144px] min-h-[82px] rounded-full border p-2.5 flex items-center justify-between transition-all ${
                isSwitchOn
                  ? 'bg-[#6B7F5E] border-[#596B4D]'
                  : 'bg-[#E5DEC9] border-[#D4CBB8]'
              }`}
            >
              <span
                className={`pl-3 text-xs font-semibold ${
                  isSwitchOn ? 'text-[#FBF9F4]' : 'text-[#8B8174]'
                }`}
              >
                ON
              </span>
              <span
                className={`pr-3 text-xs font-semibold ${
                  !isSwitchOn ? 'text-[#2F2A25]' : 'text-white/45'
                }`}
              >
                OFF
              </span>
              <div
                className={`absolute top-2 bottom-2 w-[58px] rounded-full bg-[#FBF9F4] border border-[#DFD7C8] shadow-md transition-all duration-300 flex items-center justify-center ${
                  isSwitchOn ? 'left-[calc(100%-66px)]' : 'left-2'
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full ${
                    isSwitchOn ? 'bg-[#B86B52]' : 'bg-[#A69B8B]'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* ROW 3: Warm Bamboo Slider (71%) + Soft Stone Tooltip */}
          <div className="rounded-[28px] japandi-card p-6 pb-7">
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
                className="relative flex-1 h-3 rounded-full bg-[#E6DFD2] cursor-pointer"
              >
                <div
                  className="h-full rounded-full bg-[#B86B52] transition-all duration-150"
                  style={{ width: `${sliderValue}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#FBF9F4] border-2 border-[#B86B52] shadow-md"
                  style={{ left: `${sliderValue}%` }}
                />
              </div>

              <div className="text-lg font-serif text-[#2F2A25] min-w-[52px] text-right">
                {sliderValue}%
              </div>
            </div>

            <div className="mt-5 flex justify-center sm:justify-end sm:pr-20">
              <div className="relative max-w-[265px] rounded-2xl border border-[#DFD7C8] bg-[#F2ECE1] px-4 py-2.5">
                <div className="w-3 h-3 bg-[#F2ECE1] border-l border-t border-[#DFD7C8] rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2" />
                <p className="text-[10px] leading-snug text-[#5C5347] font-medium">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                </p>
              </div>
            </div>
          </div>

          {/* ROW 4: Two Organic Earthen Analytics Cards ($4891.22 + 2201 Zen Hills) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Card */}
            <div className="md:col-span-7 rounded-[28px] japandi-card p-6 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#7C7265] mb-1.5">
                    LOREM IPSUM DOLOR SIT
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif text-[#2F2A25]">$4891.22</div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#6B7F5E]/15 text-[#4C5C41]">
                      <ArrowUp className="w-2.5 h-2.5 stroke-[2.5]" />
                    </span>
                    <span className="text-xs font-semibold text-[#6B7F5E]">75%</span>
                  </div>
                </div>

                {/* Earthy Matcha & Terracotta Ring Gauge */}
                <div className="relative w-[132px] h-[132px] shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#E6DFD2"
                      strokeWidth="10"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="33"
                      fill="none"
                      stroke="#B86B52"
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
                      stroke="#6B7F5E"
                      strokeWidth="10"
                      strokeDasharray="289"
                      strokeDashoffset={289 * 0.25}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-sm font-serif font-semibold text-[#2F2A25]">
                    75%
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 text-xs text-[#5C5347]">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#6B7F5E] shrink-0" />
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#B86B52] shrink-0" />
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
              </div>
            </div>

            {/* Right Card (2201 + Misty Zen Mountains) */}
            <div className="md:col-span-5 rounded-[28px] japandi-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-serif text-[#2F2A25]">2201</span>
                  <div className="flex-1 h-[1px] bg-[#D4CBB8] relative">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B86B52] absolute right-0 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <p className="text-[10px] text-[#7C7265] mt-2 leading-snug">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit...
                </p>
              </div>

              <div className="my-4 h-[132px] rounded-2xl bg-[#F2ECE1]/80 p-2">
                <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                  <path
                    d="M8,136 C25,136 30,84 44,84 C58,84 62,118 76,118 C90,118 96,60 110,60 C124,60 132,96 146,96 C160,96 168,68 182,68 C196,68 202,136 212,136 Z"
                    fill="rgba(184, 107, 82, 0.35)"
                  />
                  <path
                    d={`M8,136 C22,136 26,72 38,72 C50,72 56,120 68,120 C80,120 86,90 98,90 C112,90 116,66 130,66 C144,66 148,108 160,108 C172,108 176,${peakTipY} 188,${peakTipY} C200,${peakTipY} 204,136 212,136 Z`}
                    fill="#6B7F5E"
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
                className="w-full accent-[#6B7F5E] cursor-pointer h-1.5 rounded-full bg-[#DFD7C8]"
              />
            </div>
          </div>

          {/* ROW 5: Pebble Season Stepper (2019 - 2022) */}
          <div className="rounded-[28px] japandi-card px-6 py-6">
            <div className="relative flex items-center justify-between px-4 sm:px-8 mb-4">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#DFD7C8]" />
              {([2019, 2020, 2021, 2022] as const).map((year) => {
                const isSelected = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setActiveYear(year);
                        triggerToast(`Season archive: ${year}`);
                      })
                    }
                    aria-label={`Select year ${year}`}
                    className={`relative z-10 w-6 h-6 rounded-full border flex items-center justify-center transition-transform ${
                      isSelected
                        ? 'bg-[#B86B52] border-[#FBF9F4] scale-125 shadow-sm'
                        : 'bg-[#FBF9F4] border-[#C6B9A6]'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? 'bg-white' : 'bg-[#8B8174]'
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
                        triggerToast(`Season archive: ${year}`);
                      })
                    }
                    className={`py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-[#2F2A25] text-[#FBF9F4] shadow-sm'
                        : 'japandi-pebble text-[#5C5347] hover:bg-[#EDE6D8]'
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

export default JapandiMinimal;

