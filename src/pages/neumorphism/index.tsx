import React, { useState, useRef } from 'react';
import {
  Mail,
  Eye,
  EyeOff,
  Plus,
  Share2,
  FolderDown,
  Home,
  Calendar,
  Bell,
  Settings,
  Check,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const Neumorphism: React.FC = () => {
  // Login Form States
  const [email, setEmail] = useState('username@mail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  // Quick Navigation Active Tab (Home raised white, others outlined like sample.jpg)
  const [activeNav, setActiveNav] = useState<'home' | 'calender' | 'notification' | 'setting'>('home');

  // Toggle Switch State (ON with grooved thumb on left & blue ON cavity on right)
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  // Main Slider Value (71% default matching sample.jpg)
  const [sliderValue, setSliderValue] = useState(71);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Action Stack States
  const [friendCount, setFriendCount] = useState(0);
  const [category, setCategory] = useState('Select Category');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);

  // Mountain Chart Bottom Slider
  const [chartTimeline, setChartTimeline] = useState(65);

  // Timeline Stepper Year (2019 active matching sample.jpg)
  const [activeYear, setActiveYear] = useState<2019 | 2020 | 2021 | 2022>(2019);

  // Toast message
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
    triggerToast('Downloading assets package...');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('Download complete: UI-Kit-Neumo.zip');
          setTimeout(() => setDownloadProgress(null), 1500);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const categories = ['Dashboard Design', 'Mobile Components', 'Tactile UI Kits', 'Design Tokens'];

  // Scale main peak dynamically with bottom chart slider
  const peakScale = 0.72 + (chartTimeline / 100) * 0.42;
  const peakTipY = Math.round(135 - 118 * peakScale);

  return (
    <div className="w-full neu-sample-canvas text-[#3D4652] py-10 px-4 sm:px-6 lg:px-8 transition-colors select-none min-h-screen">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl neu-sample-pill border border-white/80">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1F24FF] animate-ping" />
          <span className="text-xs font-semibold text-[#2E3744]">{toastMessage}</span>
        </div>
      )}

      {/* Main Canvas Container closely matching sample.jpg composition */}
      <div className="max-w-[1060px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* =========================================
              LEFT COLUMN (Login Card + 4 Action Pills)
             ========================================= */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            {/* LOGIN CARD with overhanging bottom Sign Up pill */}
            <div className="relative neu-sample-card rounded-[38px] p-8 pb-14 border border-white/75">
              <div className="mb-8">
                <h2 className="text-[28px] font-light text-[#4B5563] tracking-tight">Login</h2>
              </div>

              {/* Email Field (clean open underline + right mail icon) */}
              <div className="mb-6">
                <div className="flex items-center justify-between pb-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="username@mail.com"
                    className="w-full bg-transparent text-[15px] text-[#5C6672] placeholder-[#94A3B8] focus:outline-none font-normal"
                    aria-label="Email address"
                  />
                  <Mail className="w-5 h-5 text-[#64707D] stroke-[1.5] shrink-0" />
                </div>
                <div className="h-[1.5px] w-full bg-[#7A8491]/70" />
              </div>

              {/* Password Field */}
              <div className="mb-5">
                <div className="flex items-center justify-between pb-2">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="***********"
                    className="w-full bg-transparent text-[15px] text-[#5C6672] placeholder-[#94A3B8] focus:outline-none tracking-[0.18em]"
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                    className="text-[#64707D] hover:text-[#1F24FF] transition-colors p-0.5"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 stroke-[1.5]" />
                    ) : (
                      <Eye className="w-5 h-5 stroke-[1.5]" />
                    )}
                  </button>
                </div>
                <div className="h-[1.5px] w-full bg-[#7A8491]/70" />
              </div>

              {/* Forget Password? */}
              <div className="mb-3">
                <button
                  type="button"
                  onClick={() =>
                    handleAction('click', () =>
                      triggerToast(`Password reset link sent to ${email}`)
                    )
                  }
                  className="text-sm text-[#5C6672] hover:text-[#1F24FF] underline underline-offset-4 font-normal transition-colors"
                >
                  Forget Password?
                </button>
              </div>

              {/* Overhanging Gradient Pill: Sign Up */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
                <button
                  type="button"
                  onClick={() =>
                    handleAction('success', () => {
                      setIsSignedUp(!isSignedUp);
                      triggerToast(
                        isSignedUp ? 'Session signed out' : `Welcome! Signed up as ${email}`
                      );
                    })
                  }
                  className="w-[186px] h-12 rounded-full neu-sample-blue text-white font-normal text-base tracking-wide flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  {isSignedUp ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Signed Up</span>
                    </>
                  ) : (
                    <span>Sign Up</span>
                  )}
                </button>
              </div>
            </div>

            {/* 4 VERTICAL PILL BUTTONS */}
            <div className="flex flex-col gap-5 pt-2">
              {/* 1. Add Friend */}
              <button
                type="button"
                onClick={() =>
                  handleAction('click', () => {
                    const next = friendCount + 1;
                    setFriendCount(next);
                    triggerToast(`Friend added (${next} in session)`);
                  })
                }
                className="w-full h-[68px] rounded-[34px] neu-sample-pill border border-white/75 flex items-center px-3.5 gap-5 transition-all active:scale-[0.98]"
              >
                <div className="w-11 h-11 rounded-[14px] neu-sample-blue text-white flex items-center justify-center shrink-0">
                  <Plus className="w-5 h-5 stroke-[2.4]" />
                </div>
                <span className="text-[15px] font-normal text-[#64707D]">Add Friend</span>
              </button>

              {/* 2. Share */}
              <button
                type="button"
                onClick={() =>
                  handleAction('click', () => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                    }
                    triggerToast('Link copied to clipboard!');
                  })
                }
                className="w-full h-[68px] rounded-[34px] neu-sample-pill border border-white/75 flex items-center px-6 gap-5 transition-all active:scale-[0.98]"
              >
                <Share2 className="w-6 h-6 text-[#64707D] shrink-0" />
                <span className="text-[15px] font-normal text-[#64707D]">Share</span>
              </button>

              {/* 3. Select Category */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                  className="w-full h-[68px] rounded-[34px] neu-sample-pill border border-white/75 flex items-center justify-between px-7 transition-all active:scale-[0.98]"
                >
                  <span className="text-[15px] font-normal text-[#64707D]">{category}</span>
                  {/* Solid small downward triangle caret matching sample.jpg */}
                  <span
                    className={`w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-[#525B66] transition-transform duration-200 ${
                      isCategoryOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isCategoryOpen && (
                  <div className="absolute top-[calc(100%+10px)] left-0 right-0 z-30 neu-sample-card rounded-3xl p-2 border border-white/80">
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
                        className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-medium flex items-center justify-between transition-colors ${
                          category === cat
                            ? 'neu-sample-blue text-white'
                            : 'text-[#4B5563] hover:bg-white/60'
                        }`}
                      >
                        <span>{cat}</span>
                        {category === cat && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Download (recessed subtle blue halo cavity matching bottom-left pill in sample.jpg) */}
              <button
                type="button"
                onClick={handleDownload}
                className="relative overflow-hidden w-full h-[68px] rounded-[34px] border border-[#BFD5EB] bg-[#E8F1F8]/90 shadow-[inset_4px_4px_10px_rgba(165,186,208,0.65),inset_-4px_-4px_10px_rgba(255,255,255,0.95),0_6px_14px_rgba(173,190,208,0.4)] flex items-center px-4 gap-5 transition-all active:scale-[0.98]"
              >
                {downloadProgress !== null && (
                  <div
                    className="absolute inset-y-0 left-0 bg-[#0A8FFF]/20 transition-all duration-200"
                    style={{ width: `${downloadProgress}%` }}
                  />
                )}
                <div className="relative z-10 w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A8FFF] to-[#1F24FF] text-white flex items-center justify-center shadow-[0_6px_14px_rgba(26,60,255,0.35)] shrink-0">
                  <FolderDown className="w-5 h-5 stroke-[2]" />
                </div>
                <span className="relative z-10 text-[15px] font-normal text-[#64707D]">
                  {downloadProgress !== null ? `Downloading ${downloadProgress}%` : 'Download'}
                </span>
              </button>
            </div>
          </div>

          {/* =========================================
              RIGHT SECTION (Widgets, Charts, Timeline)
             ========================================= */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* ROW 1: Quick Nav Tiles — Active tile raised white, inactive tiles etched hairline border */}
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
                        triggerToast(`Switched tab: ${item.label}`);
                      })
                    }
                    className={`aspect-square sm:aspect-[1/0.92] rounded-[26px] flex flex-col items-center justify-center gap-2 transition-all active:scale-95 ${
                      isActive
                        ? 'neu-sample-pill border border-white/80 text-[#1F24FF]'
                        : 'bg-transparent border-[1.5px] border-[#86909C] text-[#6E7782] hover:border-[#4B5563]'
                    }`}
                  >
                    <Icon className="w-7 h-7 stroke-[2]" />
                    <span
                      className={`text-xs ${
                        isActive ? 'font-medium text-[#525B66]' : 'font-normal text-[#525B66]'
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ROW 2: "Last 7 days" +22,12 Sparkline Card + Signature Grooved Toggle Switch */}
            <div className="flex flex-col sm:flex-row gap-6 items-stretch">
              <div className="flex-1 neu-sample-pill rounded-[30px] border border-white/75 px-7 py-5 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-normal text-[#7B848F] block">Last 7 days</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span
                      className="w-0 h-0 border-l-[4.5px] border-l-transparent border-r-[4.5px] border-r-transparent border-b-[7px] border-b-[#4B5563]"
                      aria-hidden="true"
                    />
                    <span className="text-[17px] font-bold text-[#3D4652] tracking-tight">
                      +22,12
                    </span>
                  </div>
                </div>

                <div className="w-[210px] sm:w-[250px] h-[64px] shrink-0 flex items-center">
                  <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="neuWaveGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#0A8FFF" />
                        <stop offset="65%" stopColor="#1F24FF" />
                        <stop offset="100%" stopColor="#264DFF" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M8,50 C28,50 32,20 55,22 C76,24 80,44 102,38 C122,32 132,48 154,32 C172,18 182,12 194,16 C210,22 222,48 234,48"
                      fill="none"
                      stroke="url(#neuWaveGrad)"
                      strokeWidth="4.2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="192"
                      cy="15"
                      r="5.5"
                      fill="#0A8FFF"
                      stroke="#1F24FF"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
              </div>

              {/* Signature sample.jpg ON/OFF Switch (grooved white thumb + blue cavity) */}
              <div className="w-full sm:w-[144px] min-h-[90px] neu-sample-pill rounded-[32px] border border-white/75 p-2.5 flex items-center justify-center shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    handleAction('toggle', () => {
                      const next = !isSwitchOn;
                      setIsSwitchOn(next);
                      triggerToast(`Switch toggled ${next ? 'ON' : 'OFF'}`);
                    })
                  }
                  aria-pressed={isSwitchOn}
                  className={`relative w-full h-[64px] rounded-[24px] flex items-center justify-between px-3.5 transition-all ${
                    isSwitchOn
                      ? 'neu-sample-blue'
                      : 'neu-sample-track'
                  }`}
                >
                  <span
                    className={`text-xs font-medium tracking-wider transition-opacity ${
                      !isSwitchOn ? 'text-[#525B66]' : 'opacity-0'
                    }`}
                  >
                    OFF
                  </span>
                  <span
                    className={`text-sm font-normal tracking-wide transition-opacity ${
                      isSwitchOn ? 'text-white' : 'opacity-0'
                    }`}
                  >
                    ON
                  </span>

                  {/* Embossed 3-ridge Thumb: Left when ON, Right when OFF */}
                  <div
                    className={`absolute top-1 bottom-1 w-[56px] rounded-[20px] neu-sample-pill border border-white flex items-center justify-center gap-1.5 transition-all duration-300 ${
                      isSwitchOn ? 'left-1' : 'left-[calc(100%-60px)]'
                    }`}
                  >
                    <span className="w-[2px] h-6 rounded-full bg-[#CBD4DF] shadow-[inset_1px_1px_1px_rgba(0,0,0,0.12)]" />
                    <span className="w-[2px] h-6 rounded-full bg-[#CBD4DF] shadow-[inset_1px_1px_1px_rgba(0,0,0,0.12)]" />
                    <span className="w-[2px] h-6 rounded-full bg-[#CBD4DF] shadow-[inset_1px_1px_1px_rgba(0,0,0,0.12)]" />
                  </div>
                </button>
              </div>
            </div>

            {/* ROW 3: Slider Pill (71%) + Pointed Tooltip Callout Bubble Below */}
            <div className="relative">
              <div className="neu-sample-pill rounded-full border border-white/75 px-8 py-6 flex items-center gap-6">
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
                  className="relative flex-1 h-3.5 rounded-full neu-sample-track cursor-pointer"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#1F24FF] to-[#0A8FFF] transition-all duration-150"
                    style={{ width: `${sliderValue}%` }}
                  />
                  {/* Circular White Knob with Cobalt Core Dot */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full neu-sample-pill border border-white flex items-center justify-center"
                    style={{ left: `${sliderValue}%` }}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#0A8FFF] to-[#1F24FF]" />
                  </div>
                </div>

                <div className="text-[22px] font-bold text-[#4B5563] min-w-[58px] text-right">
                  {sliderValue}%
                </div>
              </div>

              {/* Hanging Pointed Callout Card aligned like sample.jpg */}
              <div className="flex justify-center sm:justify-end sm:pr-32 -mt-2 relative z-20">
                <div className="relative max-w-[235px] neu-sample-pill rounded-2xl border border-white/80 px-4 py-2.5">
                  <div className="w-3 h-3 bg-[#F1F4F8] border-l border-t border-white rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2" />
                  <p className="text-[9.5px] leading-snug text-[#64707D] font-normal">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                  </p>
                </div>
              </div>
            </div>

            {/* ROW 4: Two Analytics Cards ($4891.22 Dual-Arc Gauge + 2201 Mountain Wave) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              {/* Left Card */}
              <div className="md:col-span-7 neu-sample-card rounded-[36px] border border-white/75 p-7 flex items-center justify-between gap-4">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="text-[11px] font-normal uppercase tracking-wider text-[#6E7782] mb-1.5">
                      LOREM IPSUM DOLOR SIT
                    </div>
                    <div className="text-[28px] font-bold text-[#2D3748] tracking-tight leading-tight">
                      $4891.22
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span
                        className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-[#4B5563]"
                        aria-hidden="true"
                      />
                      <span className="text-xs font-semibold text-[#4B5563]">75%</span>
                    </div>
                  </div>

                  {/* Two spherical bullets legend matching sample.jpg */}
                  <div className="flex flex-col gap-4 mt-8">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full shrink-0 shadow-[2px_2px_6px_rgba(0,0,0,0.2)]"
                        style={{
                          background: 'radial-gradient(circle at 35% 35%, #CBD2DA, #78828E)',
                        }}
                      />
                      <span className="text-[11px] leading-tight text-[#64707D] max-w-[100px]">
                        Lorem ipsum dolor sit amet
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full shrink-0 shadow-[0_4px_10px_rgba(31,36,255,0.4)]"
                        style={{
                          background: 'radial-gradient(circle at 35% 35%, #4DB0FF, #1F24FF)',
                        }}
                      />
                      <span className="text-[11px] leading-tight text-[#64707D] max-w-[100px]">
                        Lorem ipsum dolor sit amet
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dual Concentric Arcs + Raised Center Disc Gauge */}
                <div className="relative w-[176px] h-[176px] shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
                    <defs>
                      <linearGradient id="neuArcGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#0A8FFF" />
                        <stop offset="100%" stopColor="#1F24FF" />
                      </linearGradient>
                    </defs>
                    {/* Outer 75% Vibrant Blue Arc */}
                    <circle
                      cx="70"
                      cy="70"
                      r="60"
                      fill="none"
                      stroke="url(#neuArcGrad)"
                      strokeWidth="7"
                      strokeDasharray="377"
                      strokeDashoffset={377 * 0.25}
                      strokeLinecap="round"
                    />
                    {/* Inner Gray Secondary Arc (~55%) */}
                    <circle
                      cx="70"
                      cy="70"
                      r="48"
                      fill="none"
                      stroke="#98A2AE"
                      strokeWidth="6.5"
                      strokeDasharray="301"
                      strokeDashoffset={301 * 0.45}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Raised Inner White Disc */}
                  <div className="absolute w-[84px] h-[84px] rounded-full neu-sample-pill border border-white flex items-center justify-center text-[22px] font-normal text-[#4B5563]">
                    75%
                  </div>
                </div>
              </div>

              {/* Right Card (2201 + Layered Rounded Peaks + Slider) */}
              <div className="md:col-span-5 neu-sample-card rounded-[36px] border border-white/75 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-[22px] font-bold text-[#2D3748]">2201</span>
                    <div className="flex-1 h-[1.5px] bg-[#64707D] relative">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#3D4652] absolute right-0 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <p className="text-[10px] text-[#7B848F] mt-1.5 leading-snug">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit...
                  </p>
                </div>

                {/* Mountain Wave Silhouettes */}
                <div className="my-3 h-[132px]">
                  <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                    <defs>
                      <linearGradient id="neuGrayMountain" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#A0AAB6" />
                        <stop offset="100%" stopColor="#CED6DF" />
                      </linearGradient>
                      <linearGradient id="neuBlueMountain" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0A95FF" />
                        <stop offset="100%" stopColor="#1E24FF" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M8,136 C25,136 30,84 44,84 C58,84 62,118 76,118 C90,118 96,42 110,42 C124,42 132,96 146,96 C160,96 168,58 182,58 C196,58 202,136 212,136 Z"
                      fill="url(#neuGrayMountain)"
                    />
                    <path
                      d={`M8,136 C22,136 26,72 38,72 C50,72 56,120 68,120 C80,120 86,90 98,90 C112,90 116,66 130,66 C144,66 148,108 160,108 C172,108 176,${peakTipY} 188,${peakTipY} C200,${peakTipY} 204,136 212,136 Z`}
                      fill="url(#neuBlueMountain)"
                    />
                  </svg>
                </div>

                {/* Custom Slim Track + Blue-Dot White Knob */}
                <div className="relative flex items-center h-6">
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const pct = Math.round(Math.min(Math.max((x / rect.width) * 100, 15), 95));
                      setChartTimeline(pct);
                      playTactileClick('slider');
                    }}
                    className="relative w-full h-2.5 rounded-full neu-sample-track cursor-pointer"
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#0A8FFF] to-[#1F24FF] transition-all duration-150"
                      style={{ width: `${chartTimeline}%` }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full neu-sample-pill border border-white flex items-center justify-center"
                      style={{ left: `${chartTimeline}%` }}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1F24FF]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 5: Timeline Bar with Overhanging Year Badges (2019 - 2022) */}
            <div className="relative pb-6">
              <div className="neu-sample-pill rounded-[30px] border border-white/75 px-8 sm:px-14 pt-8 pb-10">
                {/* Horizontal Gradient Track */}
                <div className="relative h-2 rounded-full bg-gradient-to-r from-[#0A95FF] via-[#1F24FF] to-[#1F24FF] flex items-center justify-between">
                  {([2019, 2020, 2021, 2022] as const).map((year) => {
                    const isSelected = activeYear === year;
                    return (
                      <button
                        key={year}
                        type="button"
                        onClick={() =>
                          handleAction('click', () => {
                            setActiveYear(year);
                            triggerToast(`Selected Year: ${year}`);
                          })
                        }
                        aria-label={`Select year ${year}`}
                        className={`relative z-10 w-7 h-7 rounded-full neu-sample-pill border border-white flex items-center justify-center transition-transform ${
                          isSelected ? 'scale-110' : ''
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#0A8FFF] to-[#1F24FF]" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Overhanging Year Pill Tags Centered Under Each Node */}
              <div className="grid grid-cols-4 px-5 sm:px-10 -mt-5 relative z-20">
                {([2019, 2020, 2021, 2022] as const).map((year) => {
                  const isSelected = activeYear === year;
                  return (
                    <div key={year} className="flex justify-center">
                      <button
                        type="button"
                        onClick={() =>
                          handleAction('click', () => {
                            setActiveYear(year);
                            triggerToast(`Selected Year: ${year}`);
                          })
                        }
                        className={`relative px-5 py-2 rounded-xl text-sm font-normal transition-all active:scale-95 ${
                          isSelected
                            ? 'neu-sample-blue text-white'
                            : 'neu-sample-pill border border-white/80 text-[#525B66]'
                        }`}
                      >
                        {/* Upward Pointer Caret matching sample.jpg */}
                        <span
                          className={`w-2.5 h-2.5 rotate-45 absolute -top-1 left-1/2 -translate-x-1/2 ${
                            isSelected ? 'bg-[#0A8FFF]' : 'bg-[#EFF3F7] border-l border-t border-white'
                          }`}
                        />
                        <span className="relative z-10">{year}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Neumorphism;
