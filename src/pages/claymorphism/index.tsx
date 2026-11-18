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

export const Claymorphism: React.FC = () => {
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
    triggerToast('Sculpting download package...');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('Download complete: UI-Kit-Clay.zip');
          setTimeout(() => setDownloadProgress(null), 1500);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const categories = ['Dashboard Design', 'Mobile Components', 'Tactile UI Kits', 'Design Tokens'];

  return (
    <div
      className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen relative overflow-hidden text-[#312e81]"
      style={{
        background: 'linear-gradient(135deg, #fdf2f8 0%, #ede9fe 48%, #e0f2fe 100%)',
      }}
    >
      {/* Floating Pastel Clay Ambient Blobs in Background */}
      <div className="pointer-events-none absolute -top-24 -left-20 w-80 h-80 rounded-full bg-pink-200/50 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-indigo-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-sky-200/60 blur-3xl" />

      {/* Clay Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-[26px] clay-card animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-3 h-3 rounded-full clay-blue animate-bounce" />
          <span className="text-xs font-bold text-[#312e81]">{toastMessage}</span>
        </div>
      )}

      {/* Main Container matching sample.jpg layout */}
      <div className="max-w-[1140px] mx-auto relative z-10">
        
        {/* Style Paradigm Banner */}
        <div className="mb-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:px-6 rounded-[30px] clay-card">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-rose-700 clay-pastel-pink">
              Style: Claymorphism
            </span>
            <span className="text-xs text-[#5b5582] font-medium">
              Inflated 3D pillowy shapes, dual inner gloss & shadow highlights, and playful pastel depth.
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 flex-shrink-0">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>Same layout as sample.jpg</span>
          </div>
        </div>

        {/* Responsive Grid Layout matching sample.jpg */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-start">
          
          {/* =========================================
              LEFT COLUMN (Login Card + 4 Pill Buttons)
             ========================================= */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* LOGIN CLAY CARD */}
            <div className="clay-card rounded-[44px] p-7 sm:p-9 relative transition-transform duration-300">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl sm:text-[28px] font-extrabold text-[#1e1b4b] tracking-tight">
                  Login
                </h2>
                <span className="w-4 h-4 rounded-full clay-pastel-mint inline-block" title="Ready" />
              </div>

              {/* Username Input Field (Sculpted Recessed Clay Pill Well) */}
              <div className="mb-5">
                <div className="clay-inset rounded-[22px] px-4 py-3.5 flex items-center justify-between gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="username@mail.com"
                    className="w-full bg-transparent text-sm text-[#312e81] placeholder-[#8b85b1] focus:outline-none font-semibold"
                  />
                  <div className="w-8 h-8 rounded-2xl clay-pill flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#6366f1]" />
                  </div>
                </div>
              </div>

              {/* Password Input Field (Sculpted Recessed Clay Pill Well) */}
              <div className="mb-5">
                <div className="clay-inset rounded-[22px] px-4 py-3.5 flex items-center justify-between gap-2">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-transparent text-sm text-[#312e81] placeholder-[#8b85b1] focus:outline-none font-semibold tracking-wider"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleAction('click');
                      setShowPassword(!showPassword);
                    }}
                    className="w-8 h-8 rounded-2xl clay-pill flex items-center justify-center text-[#6366f1] hover:text-[#2563eb] transition-colors flex-shrink-0 cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Forget Password Link */}
              <div className="mb-8 px-1">
                <button
                  type="button"
                  onClick={() => {
                    handleAction('click');
                    triggerToast('Password reset link sent to ' + email);
                  }}
                  className="text-xs text-[#6b6599] hover:text-[#2563eb] underline underline-offset-4 font-bold transition-colors cursor-pointer"
                >
                  Forget Password?
                </button>
              </div>

              {/* Puffy 3D Cobalt Clay "Sign Up" Button */}
              <div className="flex justify-center -mb-2">
                <button
                  type="button"
                  onClick={() => {
                    handleAction('success', () => {
                      setIsSignedUp(true);
                      triggerToast('Welcome! Signed up in style.');
                      setTimeout(() => setIsSignedUp(false), 2500);
                    });
                  }}
                  className="w-48 h-14 rounded-full clay-blue text-white font-extrabold text-base tracking-wide flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer hover:-translate-y-0.5"
                >
                  {isSignedUp ? (
                    <>
                      <Check className="w-5 h-5 stroke-[3]" />
                      <span>Done!</span>
                    </>
                  ) : (
                    <span>Sign Up</span>
                  )}
                </button>
              </div>
            </div>

            {/* VERTICAL BUTTON STACK (4 Pillowy Clay Action Pills) */}
            <div className="flex flex-col gap-4">
              
              {/* 1. Add Friend Clay Pill */}
              <div
                onClick={() => {
                  handleAction('click', () => {
                    setFriendCount((c) => c + 1);
                    triggerToast(`Friend added! (${friendCount + 1} friends)`);
                  });
                }}
                className="h-16 rounded-full clay-pill flex items-center px-3.5 gap-4 cursor-pointer transition-all hover:-translate-y-0.5 group"
              >
                <div className="w-11 h-11 rounded-full clay-blue text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Plus className="w-5 h-5 stroke-[3]" />
                </div>
                <div className="flex items-center justify-between flex-1 pr-2">
                  <span className="text-sm font-bold text-[#312e81]">Add Friend</span>
                  <span className="text-xs font-extrabold text-rose-700 clay-pastel-pink px-3 py-1 rounded-full">
                    {friendCount}
                  </span>
                </div>
              </div>

              {/* 2. Share Clay Pill */}
              <div
                onClick={() => {
                  handleAction('click', () => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                    }
                    triggerToast('Link copied to clipboard!');
                  });
                }}
                className="h-16 rounded-full clay-pill flex items-center px-4 gap-4 cursor-pointer transition-all hover:-translate-y-0.5 group"
              >
                <div className="w-10 h-10 rounded-full clay-pastel-mint flex items-center justify-center text-emerald-700 group-hover:scale-105 transition-transform">
                  <Share2 className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-sm font-bold text-[#312e81]">Share</span>
              </div>

              {/* 3. Select Category Clay Pill (with Floating Clay Dropdown) */}
              <div className="relative">
                <div
                  onClick={() => {
                    handleAction('click', () => setIsCategoryOpen(!isCategoryOpen));
                  }}
                  className="h-16 rounded-full clay-pill flex items-center justify-between px-5 cursor-pointer transition-all hover:-translate-y-0.5"
                >
                  <span className="text-sm font-bold text-[#312e81] pl-1">{category}</span>
                  <div className="w-9 h-9 rounded-full clay-pastel-amber flex items-center justify-center text-amber-700">
                    <ChevronDown
                      className={`w-4 h-4 stroke-[2.8] transition-transform duration-200 ${
                        isCategoryOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                {isCategoryOpen && (
                  <div className="absolute top-[72px] left-0 right-0 z-30 clay-card rounded-[28px] p-2.5 animate-in fade-in zoom-in-95 duration-150">
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
                        className={`px-4 py-2.5 rounded-[18px] text-xs font-bold cursor-pointer transition-all flex items-center justify-between mb-1 last:mb-0 ${
                          category === cat
                            ? 'clay-blue text-white'
                            : 'text-[#4338ca] hover:bg-indigo-50/90'
                        }`}
                      >
                        <span>{cat}</span>
                        {category === cat && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Download Clay Pill */}
              <div
                onClick={handleDownload}
                className="h-16 rounded-full clay-pill flex items-center px-3.5 gap-4 cursor-pointer transition-all hover:-translate-y-0.5 group relative overflow-hidden"
              >
                {downloadProgress !== null && (
                  <div
                    className="absolute inset-0 bg-blue-300/35 transition-all duration-200 pointer-events-none rounded-full"
                    style={{ width: `${downloadProgress}%` }}
                  />
                )}
                <div className="w-11 h-11 rounded-[18px] clay-blue text-white flex items-center justify-center group-hover:scale-105 transition-transform relative z-10">
                  <Download className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="flex items-center justify-between flex-1 pr-3 relative z-10">
                  <span className="text-sm font-bold text-[#312e81]">Download</span>
                  {downloadProgress !== null && (
                    <span className="text-xs font-extrabold text-[#2563eb]">{downloadProgress}%</span>
                  )}
                </div>
              </div>

            </div>

          </div>


          {/* =========================================
              RIGHT SECTION (Widgets, Charts, Timeline)
             ========================================= */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* TOP ROW: 4 Puffy Clay Squircle Nav Tiles */}
            <div className="flex items-center justify-start sm:justify-end gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hidden">
              
              {/* Home */}
              <button
                type="button"
                onClick={() => handleAction('click', () => setActiveNav('home'))}
                className={`w-20 h-20 rounded-[28px] flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeNav === 'home'
                    ? 'clay-blue text-white -translate-y-1'
                    : 'clay-pill text-[#6366f1] hover:-translate-y-0.5'
                }`}
              >
                <Home className="w-6 h-6 stroke-[2.5]" />
                <span className="text-[11px] font-bold tracking-tight">Home</span>
              </button>

              {/* Calender */}
              <button
                type="button"
                onClick={() => handleAction('click', () => setActiveNav('calender'))}
                className={`w-20 h-20 rounded-[28px] flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeNav === 'calender'
                    ? 'clay-blue text-white -translate-y-1'
                    : 'clay-pastel-pink text-rose-700 hover:-translate-y-0.5'
                }`}
              >
                <Calendar className="w-6 h-6 stroke-[2.3]" />
                <span className="text-[11px] font-bold tracking-tight">Calender</span>
              </button>

              {/* Notification */}
              <button
                type="button"
                onClick={() => handleAction('click', () => setActiveNav('notification'))}
                className={`w-20 h-20 rounded-[28px] flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
                  activeNav === 'notification'
                    ? 'clay-blue text-white -translate-y-1'
                    : 'clay-pastel-amber text-amber-800 hover:-translate-y-0.5'
                }`}
              >
                <div className="relative">
                  <Bell className="w-6 h-6 stroke-[2.3]" />
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white" />
                </div>
                <span className="text-[11px] font-bold tracking-tight">Notification</span>
              </button>

              {/* Setting */}
              <button
                type="button"
                onClick={() => handleAction('click', () => setActiveNav('setting'))}
                className={`w-20 h-20 rounded-[28px] flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeNav === 'setting'
                    ? 'clay-blue text-white -translate-y-1'
                    : 'clay-pastel-mint text-emerald-800 hover:-translate-y-0.5'
                }`}
              >
                <Settings className="w-6 h-6 stroke-[2.3]" />
                <span className="text-[11px] font-bold tracking-tight">Setting</span>
              </button>

            </div>

            {/* ROW 2: "Last 7 days" Mini Curve Card + Pillowy Toggle Switch */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              
              {/* Mini Curve Chart Clay Card */}
              <div className="sm:col-span-9 clay-card rounded-[34px] p-5 sm:p-6 flex items-center justify-between gap-4">
                <div className="flex-shrink-0">
                  <span className="text-xs font-bold text-[#7c76a8] block">Last 7 days</span>
                  <div className="flex items-center gap-1.5 mt-1 text-[#1e1b4b]">
                    <span className="w-5 h-5 rounded-full clay-pastel-mint flex items-center justify-center">
                      <ArrowUp className="w-3 h-3 text-emerald-600 stroke-[3]" />
                    </span>
                    <span className="text-lg font-extrabold tracking-tight">+22,12</span>
                  </div>
                </div>

                {/* Smooth Chunky Clay Line & 3D Bead Node */}
                <div className="flex-1 max-w-[280px] h-14 flex items-center">
                  <svg viewBox="0 0 180 50" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="clayLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                      <filter id="clayDrop" x="-30%" y="-30%" width="160%" height="160%">
                        <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#3b82f6" floodOpacity="0.35" />
                      </filter>
                    </defs>
                    <path
                      d="M 5 35 Q 25 15, 50 32 T 95 24 T 140 10 T 175 30"
                      fill="none"
                      stroke="url(#clayLineGrad)"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#clayDrop)"
                    />
                    <circle
                      cx="140"
                      cy="10"
                      r="6"
                      fill="#3b82f6"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      filter="url(#clayDrop)"
                    />
                  </svg>
                </div>
              </div>

              {/* Pillowy 3D Toggle Switch Card */}
              <div className="sm:col-span-3 clay-card rounded-[34px] p-4 flex items-center justify-center">
                <div
                  onClick={() => {
                    handleAction('toggle', () => {
                      setIsSwitchOn(!isSwitchOn);
                      triggerToast(`Clay switch ${!isSwitchOn ? 'ON' : 'OFF'}`);
                    });
                  }}
                  className="w-[104px] h-14 rounded-full clay-inset p-1.5 flex items-center cursor-pointer transition-all relative"
                >
                  {/* Sculpted clay grip bumps on left */}
                  <div className="absolute left-3.5 flex items-center gap-1 opacity-55 pointer-events-none">
                    <span className="w-1 h-5 bg-[#a5b4fc] rounded-full shadow-inner" />
                    <span className="w-1 h-5 bg-[#a5b4fc] rounded-full shadow-inner" />
                    <span className="w-1 h-5 bg-[#a5b4fc] rounded-full shadow-inner" />
                  </div>

                  {/* Plump 3D Clay Knob */}
                  <div
                    className={`h-11 w-11 rounded-full flex items-center justify-center text-xs font-extrabold transition-all duration-300 transform ${
                      isSwitchOn
                        ? 'translate-x-12 clay-blue text-white'
                        : 'translate-x-0 clay-pastel-pink text-rose-700'
                    }`}
                  >
                    {isSwitchOn ? 'ON' : 'OFF'}
                  </div>
                </div>
              </div>

            </div>

            {/* ROW 3: Plump Clay Slider Card with Floating 3D Clay Speech Bubble */}
            <div className="clay-card rounded-full py-5 px-6 sm:px-8 relative">
              <div className="flex items-center gap-4 sm:gap-6">
                
                {/* Recessed Clay Groove */}
                <div
                  ref={sliderRef}
                  onClick={handleSliderClick}
                  className="h-[18px] flex-1 rounded-full clay-inset relative flex items-center cursor-pointer p-0.5"
                >
                  {/* Puffy Blue Clay Tube Fill */}
                  <div
                    className="h-full rounded-full clay-blue transition-all duration-75"
                    style={{ width: `${sliderValue}%` }}
                  />

                  {/* Plump 3D Clay Bead Thumb */}
                  <div
                    className="w-8 h-8 rounded-full clay-pill border-2 border-white flex items-center justify-center absolute -top-[7px] -ml-4 transition-all duration-75 cursor-grab active:cursor-grabbing hover:scale-110"
                    style={{ left: `${sliderValue}%` }}
                  >
                    <span className="w-3 h-3 rounded-full clay-blue" />
                  </div>

                  {/* Floating 3D Clay Speech Bubble Tooltip Underneath */}
                  <div
                    className="absolute top-9 -ml-28 hidden sm:block pointer-events-none transition-all duration-75 z-20"
                    style={{ left: `${sliderValue}%` }}
                  >
                    <div className="relative clay-card rounded-[22px] p-3 w-56 text-[10px] text-[#5b5582] font-semibold leading-relaxed">
                      <div className="absolute -top-1.5 left-28 w-3.5 h-3.5 bg-white transform rotate-45 rounded-tl-sm" />
                      <span className="relative z-10">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                      </span>
                    </div>
                  </div>
                </div>

                {/* Percentage Readout Pill */}
                <div className="flex-shrink-0 text-right px-3 py-1 rounded-full clay-pastel-amber">
                  <span className="text-sm sm:text-base font-extrabold text-amber-900 tracking-tight">
                    {sliderValue}%
                  </span>
                </div>

              </div>
            </div>

            {/* ROW 4: Circular Radial Donut Card ($4891.22) + Sculpted Mountain Card (2201) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              
              {/* Circular Gauge Clay Card (Left 7 cols) */}
              <div className="md:col-span-7 clay-card rounded-[40px] p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold tracking-widest text-[#7c76a8] uppercase block">
                    Lorem Ipsum Dolor Sit
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <h3 className="text-2xl sm:text-[30px] font-extrabold text-[#1e1b4b] tracking-tight">
                      $4891.22
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 mt-1 px-2.5 py-0.5 rounded-full clay-pastel-mint">
                    <ArrowUp className="w-3 h-3 stroke-[3]" />
                    <span>75%</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  
                  {/* 3D Clay Bead Legends */}
                  <div className="flex flex-col gap-3.5 text-xs text-[#5b5582] order-2 sm:order-1">
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full clay-inset flex-shrink-0 border border-white" />
                      <span className="text-[11px] font-bold leading-tight">Lorem ipsum dolor sit amet</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full clay-blue flex-shrink-0" />
                      <span className="text-[11px] font-bold leading-tight">Lorem ipsum dolor sit amet</span>
                    </div>
                  </div>

                  {/* Puffy 3D Clay Donut Ring & Center Disc */}
                  <div className="relative w-36 h-36 flex items-center justify-center order-1 sm:order-2 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full clay-inset p-2" />
                    <svg className="w-full h-full transform -rotate-90 overflow-visible relative z-10" viewBox="0 0 120 120">
                      <defs>
                        <linearGradient id="clayRadialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#60a5fa" />
                          <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                        <filter id="clayRingShadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#2563eb" floodOpacity="0.4" />
                        </filter>
                      </defs>
                      <circle cx="60" cy="60" r="46" stroke="#e0e7ff" strokeWidth="11" fill="none" />
                      <circle
                        cx="60"
                        cy="60"
                        r="46"
                        stroke="url(#clayRadialGrad)"
                        strokeWidth="12"
                        strokeDasharray="289"
                        strokeDashoffset="72.25"
                        strokeLinecap="round"
                        fill="none"
                        filter="url(#clayRingShadow)"
                      />
                    </svg>

                    {/* Plump Central 3D Clay Disc */}
                    <div className="absolute inset-7 rounded-full clay-pill flex flex-col items-center justify-center z-20">
                      <span className="text-xl font-extrabold text-[#1e1b4b] tracking-tight">75%</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Mountain Wave Clay Card (Right 5 cols) */}
              <div className="md:col-span-5 clay-card rounded-[40px] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-extrabold text-[#1e1b4b] tracking-tight">2201</h3>
                    <div className="w-3.5 h-3.5 rounded-full clay-blue" />
                  </div>
                  <p className="text-[11px] font-medium text-[#6b6599] line-clamp-2 mt-1 leading-snug">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  </p>
                </div>

                {/* Sculpted Clay Hills Chart */}
                <div className="my-3 h-28 w-full flex items-end rounded-3xl clay-inset p-2.5 overflow-hidden">
                  <svg viewBox="0 0 160 85" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="clayBlueHill" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                      <linearGradient id="clayLavHill" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fbcfe8" />
                        <stop offset="100%" stopColor="#f472b6" />
                      </linearGradient>
                      <filter id="clayHillDrop" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="2.5" floodColor="#1d4ed8" floodOpacity="0.3" />
                      </filter>
                    </defs>

                    <path
                      d="M 5 80 L 15 55 Q 25 45, 35 60 Q 45 75, 55 50 Q 65 30, 75 55 Q 85 70, 95 40 Q 105 20, 115 55 L 125 80 Z"
                      fill="url(#clayLavHill)"
                    />
                    <path
                      d="M 8 80 L 15 58 Q 20 52, 28 65 Q 40 78, 55 45 Q 65 25, 75 80 L 80 80 Q 90 25, 105 10 Q 112 5, 120 40 Q 128 70, 135 80 Z"
                      fill="url(#clayBlueHill)"
                      filter="url(#clayHillDrop)"
                    />

                    <circle cx="107" cy="9" r="4" fill="#fb7185" stroke="#ffffff" strokeWidth="2" />
                    <line x1="107" y1="9" x2="155" y2="9" stroke="#a5b4fc" strokeWidth="1.5" strokeDasharray="3,3" />
                  </svg>
                </div>

                {/* Bottom Clay Slider */}
                <div className="pt-2">
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const percent = Math.round(Math.min(Math.max((x / rect.width) * 100, 10), 90));
                      setChartTimeline(percent);
                      playTactileClick('slider');
                    }}
                    className="h-3.5 rounded-full clay-inset relative flex items-center cursor-pointer p-0.5"
                  >
                    <div
                      className="h-full rounded-full clay-blue"
                      style={{ width: `${chartTimeline}%` }}
                    />
                    <div
                      className="w-6 h-6 rounded-full clay-pill border-2 border-white flex items-center justify-center absolute -top-[5px] -ml-3 transition-all cursor-grab active:cursor-grabbing hover:scale-110"
                      style={{ left: `${chartTimeline}%` }}
                    >
                      <span className="w-2 h-2 rounded-full clay-blue" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* ROW 5: Bottom Timeline / Stepper Clay Bar (2019, 2020, 2021, 2022) */}
            <div className="clay-card rounded-[36px] sm:rounded-full py-5 px-6 sm:px-10">
              <div className="relative flex flex-col gap-3.5">
                
                {/* Recessed Clay Channel */}
                <div className="h-3.5 rounded-full clay-inset relative flex items-center mx-4 sm:mx-8 p-0.5">
                  <div
                    className="h-full rounded-full clay-blue transition-all duration-300"
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

                  {/* 4 Plump Clay Bead Nodes */}
                  <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                    {[2019, 2020, 2021, 2022].map((year) => {
                      const isReached = year <= activeYear;
                      return (
                        <div
                          key={year}
                          className={`w-[18px] h-[18px] rounded-full border-2 border-white transition-all flex items-center justify-center ${
                            isReached ? 'clay-blue scale-110' : 'clay-pill'
                          }`}
                        >
                          {year === activeYear && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Year Clay Pills */}
                <div className="flex items-center justify-between px-0 sm:px-4 pt-1">
                  {[2019, 2020, 2021, 2022].map((year) => {
                    const isActive = activeYear === year;
                    return (
                      <div key={year} className="relative flex flex-col items-center">
                        {isActive && (
                          <div className="w-3 h-3 bg-[#3b82f6] transform rotate-45 -mb-1.5 rounded-tl-sm" />
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            handleAction('click', () => {
                              setActiveYear(year as 2019 | 2020 | 2021 | 2022);
                              triggerToast(`Selected Year: ${year}`);
                            });
                          }}
                          className={`px-4 sm:px-6 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                            isActive
                              ? 'clay-blue text-white scale-105'
                              : 'clay-pill text-[#5b5582] hover:text-[#1e1b4b] hover:-translate-y-0.5'
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
        <div className="mt-10 text-center text-xs text-[#6b6599] border-t border-indigo-200/70 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 font-semibold">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>
              Claymorphism Paradigm • Matching exact layout & content of{' '}
              <span className="font-bold text-[#1e1b4b]">src/assets/sample.jpg</span>
            </span>
          </div>
          <div className="font-medium">
            React + TypeScript + Tailwind CSS • Inflated 3D Inner/Outer Shadow Clay Surfaces
          </div>
        </div>

      </div>
    </div>
  );
};

export default Claymorphism;
