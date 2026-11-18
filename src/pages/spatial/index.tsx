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
  Orbit,
  X,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const SpatialUI: React.FC = () => {
  // Subtle visionOS 3D gaze tilt
  const [gazeTilt, setGazeTilt] = useState({ rx: 0, ry: 0 });
  const [depthLock, setDepthLock] = useState(false);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (depthLock) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setGazeTilt({
      rx: Number((-ny * 3.2).toFixed(2)),
      ry: Number((nx * 3.8).toFixed(2)),
    });
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
    triggerToast('Syncing spatial USDZ volume...');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('Synced: UI-Kit-Spatial.usdz');
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
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setGazeTilt({ rx: 0, ry: 0 })}
      className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen relative overflow-hidden text-white"
      style={{
        background:
          'radial-gradient(ellipse at 50% 0%, #3E4C5E 0%, #242A36 45%, #12151C 100%)',
      }}
    >
      {/* Ambient Living-Space Skylight Glow & Subtle XR Perspective Floor Grid */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(circle at 22% 18%, rgba(56,189,248,0.16) 0%, transparent 45%), radial-gradient(circle at 78% 22%, rgba(251,191,36,0.1) 0%, transparent 42%)',
        }}
      />
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 h-[36vh] opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.16) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          transform: 'perspective(500px) rotateX(62deg) scale(1.8)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
        }}
      />

      {/* Spatial HUD Floating Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-full spatial-window text-white shadow-2xl">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_12px_#38BDF8]" />
          <span className="text-xs font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Spatial Overview Header Platter */}
      <div className="relative z-10 max-w-[1080px] mx-auto mb-7 rounded-[32px] spatial-window px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-sky-300 mb-1.5">
            <Orbit className="w-3.5 h-3.5" />
            Next-Gen XR // Spatial Computing
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Spatial UI Environment
          </h1>
          <p className="text-xs sm:text-sm text-white/75 mt-1 max-w-2xl leading-relaxed">
            Floating smoked-acrylic windows suspended in 3D space with top-edge specular rim illumination, gaze-driven hover blooms, and subtle depth-plane parallax.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            handleAction('click', () => {
              const next = !depthLock;
              setDepthLock(next);
              if (next) setGazeTilt({ rx: 0, ry: 0 });
              triggerToast(next ? 'Spatial Plane Locked' : '3D Gaze Tilt Enabled');
            })
          }
          className="shrink-0 px-4 py-2 rounded-full spatial-platter spatial-gaze text-xs font-semibold text-white/90 flex items-center gap-2 self-start sm:self-center"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              !depthLock ? 'bg-sky-400 shadow-[0_0_8px_#38BDF8]' : 'bg-white/40'
            }`}
          />
          {depthLock ? 'Depth Tilt: Locked' : 'Gaze Parallax: Active'}
        </button>
      </div>

      {/* Main Floating 3D Spatial Window Plane */}
      <div
        className="relative z-10 max-w-[1080px] mx-auto transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1400px) rotateX(${gazeTilt.rx}deg) rotateY(${gazeTilt.ry}deg)`,
        }}
      >
        <div className="rounded-[40px] spatial-window p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
            {/* ================= LEFT COLUMN (Login Plane + 4 Spatial Gaze Pills) ================= */}
            <div className="lg:col-span-4 flex flex-col gap-9">
              {/* Elevated Login Spatial Platter */}
              <div className="relative rounded-[32px] spatial-platter spatial-gaze p-7 pb-12">
                <h2 className="text-[26px] font-semibold tracking-tight text-white mb-6">
                  Login
                </h2>

                {/* Email */}
                <div className="mb-5">
                  <div className="relative flex items-center rounded-2xl bg-black/25 border border-white/15 focus-within:border-white/50 focus-within:bg-black/35 transition-all">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 pr-11 bg-transparent text-white font-medium text-sm placeholder-white/40 focus:outline-none"
                      aria-label="Email address"
                    />
                    <Mail className="w-4 h-4 text-white/55 absolute right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-4">
                  <div className="relative flex items-center rounded-2xl bg-black/25 border border-white/15 focus-within:border-white/50 focus-within:bg-black/35 transition-all">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-11 bg-transparent text-white font-medium text-sm tracking-wider focus:outline-none"
                      aria-label="Password"
                    />
                    <button
                      type="button"
                      onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                      className="absolute right-3 p-1 rounded-full hover:bg-white/15 text-white/65 hover:text-white transition-colors"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() =>
                      handleAction('click', () => triggerToast('Biometric optic recovery ready'))
                    }
                    className="text-xs font-medium text-white/75 underline underline-offset-4 hover:text-white transition-colors"
                  >
                    Forget Password?
                  </button>
                </div>

                {/* Elevated Foreground Sign Up Pill */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
                  <button
                    type="button"
                    onClick={() =>
                      handleAction(isSignedUp ? 'click' : 'success', () => {
                        setIsSignedUp(!isSignedUp);
                        triggerToast(
                          isSignedUp ? 'Signed out of spatial space' : `Spatial ID paired: ${email}`
                        );
                      })
                    }
                    className={`min-w-[182px] px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all active:scale-95 shadow-[0_14px_30px_rgba(0,0,0,0.45)] ${
                      isSignedUp
                        ? 'bg-sky-400 text-slate-950'
                        : 'bg-white text-slate-950 hover:bg-sky-100'
                    }`}
                  >
                    {isSignedUp ? 'Signed Up ✓' : 'Sign Up'}
                  </button>
                </div>
              </div>

              {/* 4 Spatial Action Pills */}
              <div className="flex flex-col gap-3.5 pt-2">
                {/* 1. Add Friend */}
                <button
                  type="button"
                  onClick={() =>
                    handleAction('click', () => {
                      setFriendCount((c) => c + 1);
                      triggerToast(`Invited to SharePlay (${friendCount + 1})`);
                    })
                  }
                  className="w-full flex items-center justify-between px-4 py-3 rounded-full spatial-platter spatial-gaze"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-sky-400 text-slate-950 flex items-center justify-center shadow-[0_0_16px_rgba(56,189,248,0.45)]">
                      <Plus className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <span className="text-sm font-semibold text-white">Add Friend</span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/15 text-white/90">
                    {friendCount}
                  </span>
                </button>

                {/* 2. Share */}
                <button
                  type="button"
                  onClick={() =>
                    handleAction('click', () => triggerToast('AirDrop Spatial Stream ready'))
                  }
                  className="w-full flex items-center gap-3.5 px-4 py-3 rounded-full spatial-platter spatial-gaze"
                >
                  <div className="w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-white">Share</span>
                </button>

                {/* 3. Select Category */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                    className="w-full flex items-center justify-between px-5 py-3.5 rounded-full spatial-platter spatial-gaze"
                  >
                    <span className="text-sm font-semibold text-white">{category}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-white/75 transition-transform duration-200 ${
                        isCategoryOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isCategoryOpen && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-[24px] spatial-window p-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() =>
                            handleAction('click', () => {
                              setCategory(cat);
                              setIsCategoryOpen(false);
                              triggerToast(`Layer: ${cat}`);
                            })
                          }
                          className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center justify-between transition-colors ${
                            category === cat
                              ? 'bg-white text-slate-950'
                              : 'text-white/85 hover:bg-white/15'
                          }`}
                        >
                          <span>{cat}</span>
                          {category === cat && <Check className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Download */}
                <button
                  type="button"
                  onClick={handleDownload}
                  className="relative overflow-hidden w-full flex items-center gap-3.5 px-4 py-3 rounded-full spatial-platter spatial-gaze"
                >
                  {downloadProgress !== null && (
                    <div
                      className="absolute inset-y-0 left-0 bg-sky-400/25 transition-all duration-200"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  )}
                  <div className="relative z-10 w-10 h-10 rounded-full bg-white/90 text-slate-950 flex items-center justify-center">
                    <Download className="w-4 h-4" />
                  </div>
                  <span className="relative z-10 text-sm font-semibold text-white">
                    {downloadProgress !== null ? `Syncing ${downloadProgress}%` : 'Download'}
                  </span>
                </button>
              </div>
            </div>

            {/* ================= RIGHT COLUMN (Elevated XR Widgets) ================= */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* ROW 1: 4 Spatial Gaze Nav Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                          triggerToast(`Focused plane: ${item.label}`);
                        })
                      }
                      className={`aspect-square sm:aspect-[1/0.88] rounded-[26px] flex flex-col items-center justify-center gap-2.5 spatial-gaze ${
                        isActive
                          ? 'bg-white text-slate-950 shadow-[0_18px_38px_rgba(0,0,0,0.45)]'
                          : 'spatial-platter text-white/85'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-semibold tracking-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* ROW 2: "Last 7 days" +22,12 Sparkline Platter + XR Switch */}
              <div className="flex flex-col sm:flex-row gap-5 items-stretch">
                <div className="flex-1 rounded-[26px] spatial-platter spatial-gaze px-6 py-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-medium text-white/65">Last 7 days</div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-sky-400/20 text-sky-300">
                        <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      <span className="text-xl font-bold text-white">+22,12</span>
                    </div>
                  </div>

                  <div className="w-[200px] sm:w-[240px] h-[58px] shrink-0">
                    <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                      <path
                        d="M8,50 C28,50 32,20 55,22 C76,24 80,44 102,38 C122,32 132,48 154,32 C172,18 182,12 194,16 C210,22 222,48 234,48"
                        fill="none"
                        stroke="#38BDF8"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="192"
                        cy="15"
                        r="6"
                        fill="#FFFFFF"
                        stroke="#38BDF8"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                </div>

                {/* Spatial Toggle Pill */}
                <button
                  type="button"
                  onClick={() =>
                    handleAction('toggle', () => {
                      const next = !isSwitchOn;
                      setIsSwitchOn(next);
                      triggerToast(`Passthrough mode: ${next ? 'ON' : 'OFF'}`);
                    })
                  }
                  aria-pressed={isSwitchOn}
                  className="relative w-full sm:w-[138px] min-h-[80px] rounded-full spatial-platter spatial-gaze p-2 flex items-center justify-between"
                >
                  <span
                    className={`pl-3 text-xs font-bold tracking-widest ${
                      isSwitchOn ? 'text-white' : 'text-white/35'
                    }`}
                  >
                    ON
                  </span>
                  <span
                    className={`pr-3 text-xs font-bold tracking-widest ${
                      !isSwitchOn ? 'text-white' : 'text-white/35'
                    }`}
                  >
                    OFF
                  </span>
                  <div
                    className={`absolute top-2 bottom-2 w-[60px] rounded-full bg-white shadow-[0_6px_16px_rgba(0,0,0,0.35)] transition-all duration-300 ${
                      isSwitchOn ? 'left-[calc(100%-68px)]' : 'left-2'
                    }`}
                  />
                </button>
              </div>

              {/* ROW 3: Spatial Depth Slider + Floating Tooltip */}
              <div className="rounded-[28px] spatial-platter spatial-gaze p-6 pb-7">
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
                    className="relative flex-1 h-3.5 rounded-full bg-black/30 border border-white/15 cursor-pointer"
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 to-white transition-all duration-150 shadow-[0_0_12px_rgba(56,189,248,0.55)]"
                      style={{ width: `${sliderValue}%` }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.45)]"
                      style={{ left: `${sliderValue}%` }}
                    />
                  </div>
                  <div className="text-xl font-bold text-white min-w-[54px] text-right">
                    {sliderValue}%
                  </div>
                </div>

                <div className="mt-5 flex justify-center sm:justify-end sm:pr-20">
                  <div className="relative max-w-[260px] rounded-2xl bg-white/90 text-slate-900 px-4 py-2.5 shadow-xl">
                    <div className="w-3 h-3 bg-white/90 rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2" />
                    <p className="text-[10px] leading-snug font-medium">
                      Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                    </p>
                  </div>
                </div>
              </div>

              {/* ROW 4: Two Spatial Analytics Platters ($4891.22 + 2201 Mountain Chart) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                {/* Left Platter */}
                <div className="md:col-span-7 rounded-[28px] spatial-platter spatial-gaze p-6 flex flex-col justify-between gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-white/60 mb-2">
                        LOREM IPSUM DOLOR SIT
                      </div>
                      <div className="text-3xl font-bold tracking-tight text-white">$4891.22</div>
                      <div className="flex items-center gap-1.5 mt-2 text-sky-300">
                        <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span className="text-xs font-bold">75%</span>
                      </div>
                    </div>

                    <div className="relative w-[136px] h-[136px] shrink-0 flex items-center justify-center">
                      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                        <circle
                          cx="60"
                          cy="60"
                          r="46"
                          fill="none"
                          stroke="rgba(255,255,255,0.12)"
                          strokeWidth="11"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="33"
                          fill="none"
                          stroke="rgba(255,255,255,0.38)"
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
                          stroke="#38BDF8"
                          strokeWidth="11"
                          strokeDasharray="289"
                          strokeDashoffset={289 * 0.25}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute w-[60px] h-[60px] rounded-full bg-white text-slate-950 shadow-lg flex items-center justify-center text-sm font-bold">
                        75%
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-white/45 shrink-0" />
                      <span className="text-xs text-white/75">Lorem ipsum dolor sit amet</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-sky-400 shrink-0" />
                      <span className="text-xs text-white/75">Lorem ipsum dolor sit amet</span>
                    </div>
                  </div>
                </div>

                {/* Right Platter (2201 Mountain Chart) */}
                <div className="md:col-span-5 rounded-[28px] spatial-platter spatial-gaze p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold tracking-tight text-white">2201</span>
                      <div className="flex-1 h-[1.5px] bg-white/25 relative">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-400 absolute right-0 top-1/2 -translate-y-1/2 shadow-[0_0_8px_#38BDF8]" />
                      </div>
                    </div>
                    <p className="text-[10px] text-white/60 mt-1.5 leading-snug">
                      Lorem ipsum dolor sit amet consectetur adipiscing elit...
                    </p>
                  </div>

                  <div className="my-4 h-[126px]">
                    <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                      <defs>
                        <linearGradient id="spatialPeakGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#38BDF8" />
                          <stop offset="100%" stopColor="#0284C7" stopOpacity="0.65" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M8,136 C25,136 30,84 44,84 C58,84 62,118 76,118 C90,118 96,60 110,60 C124,60 132,96 146,96 C160,96 168,68 182,68 C196,68 202,136 212,136 Z"
                        fill="rgba(255,255,255,0.22)"
                      />
                      <path
                        d={`M8,136 C22,136 26,72 38,72 C50,72 56,120 68,120 C80,120 86,90 98,90 C112,90 116,66 130,66 C144,66 148,108 160,108 C172,108 176,${peakTipY} 188,${peakTipY} C200,${peakTipY} 204,136 212,136 Z`}
                        fill="url(#spatialPeakGrad)"
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
                    className="w-full accent-sky-400 cursor-pointer h-1.5 rounded-full bg-white/20"
                  />
                </div>
              </div>

              {/* ROW 5: Timeline Stepper (2019 - 2022) */}
              <div className="rounded-[28px] spatial-platter spatial-gaze px-6 py-5">
                <div className="relative flex items-center justify-between px-4 sm:px-8 mb-4">
                  <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 rounded-full bg-white/15" />
                  {([2019, 2020, 2021, 2022] as const).map((year) => {
                    const isSelected = activeYear === year;
                    return (
                      <button
                        key={year}
                        type="button"
                        onClick={() =>
                          handleAction('click', () => {
                            setActiveYear(year);
                            triggerToast(`Spatial anchor: ${year}`);
                          })
                        }
                        aria-label={`Select year ${year}`}
                        className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-transform ${
                          isSelected
                            ? 'bg-white scale-125 shadow-[0_0_16px_rgba(255,255,255,0.65)]'
                            : 'bg-white/25 hover:bg-white/50'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? 'bg-sky-500' : 'bg-white'
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
                            triggerToast(`Spatial anchor: ${year}`);
                          })
                        }
                        className={`py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
                          isSelected
                            ? 'bg-white text-slate-950 shadow-lg'
                            : 'bg-white/10 text-white/80 hover:bg-white/20'
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

        {/* Signature visionOS Floating Close Orb + Grabber Handle Bar below the Window */}
        <div className="mt-5 flex items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={() =>
              handleAction('click', () => {
                setGazeTilt({ rx: 0, ry: 0 });
                triggerToast('Spatial window centered');
              })
            }
            aria-label="Center spatial window"
            className="w-8 h-8 rounded-full spatial-platter spatial-gaze flex items-center justify-center text-white/75 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="w-32 h-2 rounded-full bg-white/55 hover:bg-white/85 transition-colors shadow-[0_4px_14px_rgba(0,0,0,0.45)] cursor-grab" />
        </div>
      </div>
    </div>
  );
};

export default SpatialUI;
