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
  Shapes,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const Bauhaus: React.FC = () => {
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
    triggerToast('DESSAU FOLIO // PREPARING ARCHIVE');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('BAUHAUS-1919.ZIP COMPLETE (100%)');
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
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen relative overflow-hidden bauhaus-bg text-[#181818]">
      {/* Kandinsky Geometric Constructivist Backdrop Shapes */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-25">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="w-full h-full">
          {/* Blue Circle */}
          <circle cx="140" cy="180" r="110" fill="#004E98" />
          {/* Yellow Triangle */}
          <polygon points="1240,60 1390,290 1090,290" fill="#F5B800" />
          {/* Red Arch / Square */}
          <rect x="60" y="650" width="160" height="160" fill="#D62828" />
          <circle cx="1270" cy="730" r="120" fill="#004E98" />
          <line x1="0" y1="450" x2="1440" y2="210" stroke="#181818" strokeWidth="4" />
        </svg>
      </div>

      {/* Bauhaus Exhibition Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 bg-[#181818] text-[#FFFBF2] border-2 border-[#F5B800] shadow-[5px_5px_0px_#D62828]">
          <Shapes className="w-4 h-4 text-[#F5B800] shrink-0" />
          <span className="text-xs font-black tracking-wider uppercase">{toastMessage}</span>
        </div>
      )}

      {/* Bauhaus Weimar/Dessau Header Banner */}
      <div className="relative z-10 max-w-[1060px] mx-auto mb-9 bauhaus-card overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Geometric Triadic Motif Stripe */}
          <div className="md:col-span-2 bg-[#181818] p-4 flex md:flex-col items-center justify-center gap-3 border-b-[2.5px] md:border-b-0 md:border-r-[2.5px] border-[#181818]">
            <span className="w-8 h-8 rounded-full bg-[#004E98] border-2 border-[#FFFBF2]" />
            <span className="w-8 h-8 bg-[#D62828] border-2 border-[#FFFBF2]" />
            <span
              className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[28px] border-b-[#F5B800]"
              aria-hidden="true"
            />
          </div>

          <div className="md:col-span-10 p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5B800] border-2 border-[#181818] text-[#181818] text-[11px] font-black uppercase tracking-widest mb-2.5">
                <span>1919 WEIMAR // FORM FOLLOWS FUNCTION</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#181818]">
                Bauhaus Geometric UI
              </h1>
              <p className="text-xs sm:text-sm text-[#3F3A32] mt-1.5 max-w-2xl leading-relaxed font-semibold">
                Constructivist harmony built from Kandinsky&apos;s primary triad — Red Square, Blue Circle, and Yellow Triangle — uniting semi-circular arches with bold modular geometry.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 text-[11px] font-black uppercase">
              <span className="px-3 py-1.5 bg-[#D62828] text-white border-2 border-[#181818]">
                ■ Square
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#004E98] text-white border-2 border-[#181818]">
                ● Circle
              </span>
              <span className="px-3 py-1.5 bg-[#F5B800] text-[#181818] border-2 border-[#181818]">
                ▲ Triangle
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Showcase Canvas matching exact sample.jpg layout */}
      <div className="relative z-10 max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN (Geometric Login Block + 4 Primary Action Strips) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-9">
          {/* Login Card */}
          <div className="relative bauhaus-card p-7 pb-12">
            {/* Primary Color Top Band */}
            <div className="flex h-2.5 -mx-7 -mt-7 mb-6 border-b-[2.5px] border-[#181818]">
              <div className="flex-1 bg-[#D62828]" />
              <div className="flex-1 bg-[#F5B800] border-x-[2.5px] border-[#181818]" />
              <div className="flex-1 bg-[#004E98]" />
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[28px] font-black uppercase tracking-tight text-[#181818]">
                Login
              </h2>
              <span className="w-6 h-6 rounded-full bg-[#F5B800] border-2 border-[#181818]" />
            </div>

            {/* Email Input */}
            <div className="mb-5">
              <div className="relative flex items-center border-[2.5px] border-[#181818] bg-white px-4 py-3 focus-within:bg-[#FFF8DC] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-9 bg-transparent text-sm font-bold text-[#181818] focus:outline-none"
                  aria-label="Email address"
                />
                <Mail className="w-4 h-4 text-[#004E98] absolute right-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <div className="relative flex items-center border-[2.5px] border-[#181818] bg-white px-4 py-3 focus-within:bg-[#FFF8DC] transition-colors">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-9 bg-transparent text-sm font-bold tracking-wider text-[#181818] focus:outline-none"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                  className="absolute right-3 p-1 text-[#D62828] hover:text-[#004E98] transition-colors"
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
                  handleAction('click', () => triggerToast('WORKSHOP KEY RESET SENT'))
                }
                className="text-xs font-black text-[#004E98] underline underline-offset-4 hover:text-[#D62828] transition-colors"
              >
                Forget Password?
              </button>
            </div>

            {/* Overhanging Arch Capsule Button: Sign Up */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
              <button
                type="button"
                onClick={() =>
                  handleAction(isSignedUp ? 'click' : 'success', () => {
                    setIsSignedUp(!isSignedUp);
                    triggerToast(
                      isSignedUp ? 'WORKSHOP DEPARTED' : `ENROLLED AT DESSAU: ${email}`
                    );
                  })
                }
                className={`min-w-[192px] px-8 py-3.5 rounded-full bauhaus-block text-sm font-black uppercase tracking-wider transition-colors ${
                  isSignedUp
                    ? 'bg-[#004E98] text-white'
                    : 'bg-[#D62828] text-white hover:bg-[#F5B800] hover:text-[#181818]'
                }`}
              >
                {isSignedUp ? 'Signed Up ✓' : 'Sign Up'}
              </button>
            </div>
          </div>

          {/* 4 Stacked Bauhaus Primary Action Strips */}
          <div className="flex flex-col gap-4 pt-2">
            {/* 1. Add Friend (Blue Circle Badge) */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => {
                  setFriendCount((c) => c + 1);
                  triggerToast(`FELLOW ADDED (#${friendCount + 1})`);
                })
              }
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-full bauhaus-block bg-[#FFFBF2] hover:bg-[#FFF3CC]"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#004E98] border-2 border-[#181818] text-white flex items-center justify-center">
                  <Plus className="w-5 h-5 stroke-[2.8]" />
                </div>
                <span className="text-[15px] font-black uppercase text-[#181818]">Add Friend</span>
              </div>
              <span className="text-xs font-black px-2.5 py-0.5 bg-[#F5B800] border-2 border-[#181818] text-[#181818]">
                {friendCount}
              </span>
            </button>

            {/* 2. Share (Red Square Badge) */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => triggerToast('FOLIO LINK COPIED'))
              }
              className="w-full flex items-center gap-4 px-4 py-2.5 bauhaus-block bg-[#FFFBF2] hover:bg-[#FFF3CC]"
            >
              <div className="w-11 h-11 bg-[#D62828] border-2 border-[#181818] text-white flex items-center justify-center">
                <Share2 className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-[15px] font-black uppercase text-[#181818]">Share</span>
            </button>

            {/* 3. Select Category Dropdown (Yellow Arch) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                className="w-full flex items-center justify-between px-6 py-4 rounded-r-full bauhaus-block bg-[#F5B800] hover:brightness-105"
              >
                <span className="text-[15px] font-black uppercase text-[#181818]">
                  {category}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#181818] transition-transform duration-200 ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 bauhaus-card p-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        handleAction('click', () => {
                          setCategory(cat);
                          setIsCategoryOpen(false);
                          triggerToast(`ATELIER: ${cat.toUpperCase()}`);
                        })
                      }
                      className={`w-full text-left px-4 py-2.5 text-xs font-black uppercase flex items-center justify-between transition-colors ${
                        category === cat
                          ? 'bg-[#181818] text-[#F5B800]'
                          : 'text-[#181818] hover:bg-[#F5B800]/35'
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
              className="relative overflow-hidden w-full flex items-center gap-4 px-4 py-2.5 rounded-l-full bauhaus-block bg-[#FFFBF2] hover:bg-[#FFF3CC]"
            >
              {downloadProgress !== null && (
                <div
                  className="absolute inset-y-0 left-0 bg-[#004E98]/25 transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              )}
              <div className="relative z-10 w-11 h-11 rounded-full bg-[#181818] text-[#F5B800] flex items-center justify-center">
                <Download className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="relative z-10 text-[15px] font-black uppercase text-[#181818]">
                {downloadProgress !== null ? `Downloading ${downloadProgress}%` : 'Download'}
              </span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (Quick Nav, Sparkline+Switch, Slider, Charts, Stepper) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ROW 1: 4 Bauhaus Shape-Contrast Navigation Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {(
              [
                { id: 'home', label: 'Home', corner: 'rounded-tl-[32px]', badgeBg: 'bg-[#D62828] text-white', icon: Home },
                { id: 'calender', label: 'Calender', corner: 'rounded-tr-[32px]', badgeBg: 'bg-[#004E98] text-white', icon: Calendar },
                { id: 'notification', label: 'Notification', corner: 'rounded-br-[32px]', badgeBg: 'bg-[#F5B800] text-[#181818]', icon: Bell },
                { id: 'setting', label: 'Setting', corner: 'rounded-bl-[32px]', badgeBg: 'bg-[#181818] text-white', icon: Settings },
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
                      triggerToast(`STUDIO WING: ${item.label.toUpperCase()}`);
                    })
                  }
                  className={`aspect-square sm:aspect-[1/0.88] bauhaus-block ${item.corner} flex flex-col items-center justify-center gap-2.5 ${
                    isActive ? 'bg-[#F5B800]' : 'bg-[#FFFBF2]'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-full border-2 border-[#181818] flex items-center justify-center ${item.badgeBg}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-tight text-[#181818]">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ROW 2: "Last 7 days" +22,12 Geometric Sparkline + Bauhaus Pill Switch */}
          <div className="flex flex-col sm:flex-row gap-6 items-stretch">
            <div className="flex-1 bauhaus-card px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-black uppercase text-[#5A5246]">Last 7 days</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#004E98] text-white">
                    <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span className="text-2xl font-black text-[#181818]">+22,12</span>
                </div>
              </div>

              <div className="w-[210px] sm:w-[250px] h-[64px] border-2 border-[#181818] bg-[#F2EAD8] p-2 shrink-0">
                <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                  <path
                    d="M8,50 C28,50 32,20 55,22 C76,24 80,44 102,38 C122,32 132,48 154,32 C172,18 182,12 194,16 C210,22 222,48 234,48"
                    fill="none"
                    stroke="#004E98"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <circle cx="192" cy="15" r="6" fill="#D62828" stroke="#181818" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* ON / OFF Toggle */}
            <button
              type="button"
              onClick={() =>
                handleAction('toggle', () => {
                  const next = !isSwitchOn;
                  setIsSwitchOn(next);
                  triggerToast(`KINETIC MOTOR: ${next ? 'ON' : 'OFF'}`);
                })
              }
              aria-pressed={isSwitchOn}
              className={`relative w-full sm:w-[144px] min-h-[82px] rounded-full bauhaus-block p-2.5 flex items-center justify-between transition-colors ${
                isSwitchOn ? 'bg-[#004E98]' : 'bg-[#D6CFC0]'
              }`}
            >
              <span
                className={`pl-2.5 text-xs font-black uppercase ${
                  isSwitchOn ? 'text-[#F5B800]' : 'text-[#736B5E]'
                }`}
              >
                ON
              </span>
              <span
                className={`pr-2.5 text-xs font-black uppercase ${
                  !isSwitchOn ? 'text-[#181818]' : 'text-white/50'
                }`}
              >
                OFF
              </span>
              <div
                className={`absolute top-2 bottom-2 w-[60px] rounded-full bg-[#FFFBF2] border-2 border-[#181818] transition-all duration-300 flex items-center justify-center ${
                  isSwitchOn ? 'left-[calc(100%-68px)]' : 'left-2'
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full border-2 border-[#181818] ${
                    isSwitchOn ? 'bg-[#D62828]' : 'bg-[#8A8273]'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* ROW 3: Triadic Geometric Slider (71%) + Bauhaus Callout */}
          <div className="bauhaus-card p-6 pb-7">
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
                className="relative flex-1 h-4 rounded-full bg-[#E5DEC9] border-2 border-[#181818] cursor-pointer"
              >
                <div
                  className="h-full rounded-full bg-[#D62828] transition-all duration-150"
                  style={{ width: `${sliderValue}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#F5B800] border-[2.5px] border-[#181818] flex items-center justify-center"
                  style={{ left: `${sliderValue}%` }}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#181818]" />
                </div>
              </div>

              <div className="text-xl font-black text-[#181818] min-w-[54px] text-right">
                {sliderValue}%
              </div>
            </div>

            <div className="mt-5 flex justify-center sm:justify-end sm:pr-20">
              <div className="relative max-w-[265px] rounded-tr-3xl rounded-bl-3xl border-2 border-[#181818] bg-[#F5B800] px-4 py-2.5">
                <div className="w-3 h-3 bg-[#F5B800] border-l-2 border-t-2 border-[#181818] rotate-45 absolute -top-2 left-1/2 -translate-x-1/2" />
                <p className="text-[10px] leading-snug text-[#181818] font-bold">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                </p>
              </div>
            </div>
          </div>

          {/* ROW 4: Two Geometric Analytics Cards ($4891.22 Triadic Gauge + 2201 Mountain Geometry) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Card */}
            <div className="md:col-span-7 bauhaus-card p-6 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-[#D62828] mb-1.5">
                    LOREM IPSUM DOLOR SIT
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#181818]">$4891.22</div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#F5B800] border border-[#181818] text-[#181818]">
                      <ArrowUp className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span className="text-xs font-black text-[#004E98]">75%</span>
                  </div>
                </div>

                {/* Primary Triadic Gauge (75%) */}
                <div className="relative w-[134px] h-[134px] shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#E5DEC9"
                      strokeWidth="12"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="32"
                      fill="none"
                      stroke="#F5B800"
                      strokeWidth="6"
                      strokeDasharray="201"
                      strokeDashoffset="72"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#004E98"
                      strokeWidth="12"
                      strokeDasharray="289"
                      strokeDashoffset={289 * 0.25}
                    />
                  </svg>
                  <div className="absolute w-[54px] h-[54px] rounded-full bg-[#D62828] border-2 border-[#181818] flex items-center justify-center text-xs font-black text-white">
                    75%
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 text-xs font-bold text-[#181818]">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#004E98] border border-[#181818] shrink-0" />
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 bg-[#D62828] border border-[#181818] shrink-0" />
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
              </div>
            </div>

            {/* Right Card (2201 + Primary Triangles / Peaks) */}
            <div className="md:col-span-5 bauhaus-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-[#181818]">2201</span>
                  <div className="flex-1 h-[2.5px] bg-[#181818] relative">
                    <span className="w-3 h-3 rounded-full bg-[#D62828] border border-[#181818] absolute right-0 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <p className="text-[10px] text-[#5A5246] font-semibold mt-2 leading-snug">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit...
                </p>
              </div>

              <div className="my-4 h-[132px] border-2 border-[#181818] bg-[#F2EAD8] p-2">
                <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                  <path
                    d="M8,136 C25,136 30,84 44,84 C58,84 62,118 76,118 C90,118 96,60 110,60 C124,60 132,96 146,96 C160,96 168,68 182,68 C196,68 202,136 212,136 Z"
                    fill="#F5B800"
                    stroke="#181818"
                    strokeWidth="2"
                  />
                  <path
                    d={`M8,136 C22,136 26,72 38,72 C50,72 56,120 68,120 C80,120 86,90 98,90 C112,90 116,66 130,66 C144,66 148,108 160,108 C172,108 176,${peakTipY} 188,${peakTipY} C200,${peakTipY} 204,136 212,136 Z`}
                    fill="#004E98"
                    stroke="#181818"
                    strokeWidth="2"
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
                className="w-full accent-[#D62828] cursor-pointer h-2 bg-[#D6CFC0]"
              />
            </div>
          </div>

          {/* ROW 5: Bauhaus Timeline Stepper (2019 - 2022) */}
          <div className="bauhaus-card px-6 py-6">
            <div className="relative flex items-center justify-between px-4 sm:px-8 mb-4">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[3px] bg-[#181818]" />
              {([2019, 2020, 2021, 2022] as const).map((year) => {
                const isSelected = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setActiveYear(year);
                        triggerToast(`ATELIER YEAR: ${year}`);
                      })
                    }
                    aria-label={`Select year ${year}`}
                    className={`relative z-10 w-6 h-6 rounded-full border-2 border-[#181818] flex items-center justify-center transition-transform ${
                      isSelected ? 'bg-[#D62828] scale-125' : 'bg-[#FFFBF2]'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? 'bg-[#F5B800]' : 'bg-[#181818]'
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
                        triggerToast(`ATELIER YEAR: ${year}`);
                      })
                    }
                    className={`py-2.5 rounded-full bauhaus-block text-xs sm:text-sm font-black uppercase ${
                      isSelected
                        ? 'bg-[#004E98] text-white'
                        : 'bg-[#F5B800] text-[#181818]'
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

export default Bauhaus;

