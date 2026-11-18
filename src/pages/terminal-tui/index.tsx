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

export const TerminalTUI: React.FC = () => {
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
    triggerToast('curl -O https://cdn.tui/ui-kit.tar.gz');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('[OK] extracted ui-kit.tar.gz (100%)');
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

  // Build crisp ASCII bar string representing sliderValue
  const asciiBarLength = 24;
  const filledBlocks = Math.round((sliderValue / 100) * asciiBarLength);
  const asciiTrack =
    '█'.repeat(Math.max(1, filledBlocks)) + '░'.repeat(Math.max(0, asciiBarLength - filledBlocks));

  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen relative overflow-hidden tui-bg font-mono text-[#D2FBE0]">
      {/* Terminal STDOUT Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 tui-panel-active text-xs text-[#00FF66]">
          <Terminal className="w-4 h-4 shrink-0 text-[#FFB000]" />
          <span>
            <span className="text-[#00E5FF] mr-1.5">$</span>
            {toastMessage}
          </span>
          <span className="inline-block w-2 h-3.5 bg-[#00FF66] tui-cursor" />
        </div>
      )}

      {/* TUI Multiplexer Header Banner */}
      <div className="relative z-10 max-w-[1060px] mx-auto mb-9 tui-panel p-6 pt-7">
        <div className="absolute -top-2.5 left-4 px-2 bg-[#060908] text-[11px] font-bold text-[#00FF66] tracking-wider">
          ┌─[ tmux::01 // tui-showcase ]─
        </div>
        <div className="absolute -top-2.5 right-4 px-2 bg-[#060908] text-[11px] font-bold text-[#00E5FF] hidden sm:block">
          PID:2048 | P39 PHOSPHOR
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#FFB000] mb-2">
              <span>root@design-system:~$</span>
              <span className="text-[#00FF66]">./render --mode=tui</span>
              <span className="inline-block w-2 h-3.5 bg-[#00FF66] tui-cursor" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#00FF66]">
              Terminal / TUI (CLI) Interface
            </h1>
            <p className="text-xs sm:text-sm text-[#86EFAC]/75 mt-1.5 max-w-2xl leading-relaxed">
              Keyboard-driven console UI inspired by btop, htop, and lazygit: box-drawing panes, fixed-width phosphor telemetry, ASCII meters, and zero-blur sharp borders.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 text-[11px] font-bold uppercase">
            <span className="px-2.5 py-1 border border-[#234935] bg-[#07110C] text-[#00FF66]">
              ┌─┐ Box Frames
            </span>
            <span className="px-2.5 py-1 border border-[#234935] bg-[#07110C] text-[#00E5FF]">
              [██░░] ASCII
            </span>
            <span className="px-2.5 py-1 border border-[#234935] bg-[#07110C] text-[#FFB000]">
              TTY Phosphor
            </span>
          </div>
        </div>
      </div>

      {/* Main Showcase Canvas matching exact sample.jpg layout */}
      <div className="relative z-10 max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN (TUI Auth Pane + 4 Command Rows) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-9">
          {/* Login Pane */}
          <div className="relative tui-panel p-7 pb-12 pt-8">
            <div className="absolute -top-2.5 left-4 px-2 bg-[#060908] text-[11px] font-bold text-[#00FF66]">
              ─[ auth::login ]─
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#00FF66] tracking-tight">Login</h2>
              <span className="text-[11px] text-[#00E5FF]">[ssh:22]</span>
            </div>

            {/* Email Field */}
            <div className="mb-5">
              <div className="text-[10px] text-[#86EFAC]/60 mb-1 uppercase">&gt; user.email</div>
              <div className="relative flex items-center border border-[#234935] bg-[#050807] px-3.5 py-2.5 focus-within:border-[#00FF66]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-8 bg-transparent text-xs sm:text-sm text-[#D2FBE0] focus:outline-none"
                  aria-label="Email address"
                />
                <Mail className="w-4 h-4 text-[#00FF66] absolute right-3 pointer-events-none" />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <div className="text-[10px] text-[#86EFAC]/60 mb-1 uppercase">&gt; user.secret</div>
              <div className="relative flex items-center border border-[#234935] bg-[#050807] px-3.5 py-2.5 focus-within:border-[#00FF66]">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-8 bg-transparent text-xs sm:text-sm tracking-wider text-[#00E5FF] focus:outline-none"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                  className="absolute right-2.5 p-1 text-[#FFB000] hover:text-[#00FF66]"
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
                  handleAction('click', () => triggerToast('passwd --reset-token sent'))
                }
                className="text-xs text-[#00E5FF] underline underline-offset-4 hover:text-[#00FF66]"
              >
                Forget Password?
              </button>
            </div>

            {/* Overhanging Command Button: Sign Up */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-5">
              <button
                type="button"
                onClick={() =>
                  handleAction(isSignedUp ? 'click' : 'success', () => {
                    setIsSignedUp(!isSignedUp);
                    triggerToast(
                      isSignedUp ? 'logout: session terminated' : `authenticated as ${email}`
                    );
                  })
                }
                className={`min-w-[196px] px-7 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider border transition-colors ${
                  isSignedUp
                    ? 'bg-[#00E5FF] border-[#00E5FF] text-[#050807]'
                    : 'bg-[#00FF66] border-[#00FF66] text-[#050807] hover:bg-[#5CFF9D]'
                }`}
              >
                {isSignedUp ? '[ Signed Up ✓ ]' : '[ Sign Up ]'}
              </button>
            </div>
          </div>

          {/* 4 Stacked Command Action Rows */}
          <div className="flex flex-col gap-3.5 pt-2">
            {/* 1. Add Friend */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => {
                  setFriendCount((c) => c + 1);
                  triggerToast(`peers --add friend_${friendCount + 1}`);
                })
              }
              className="w-full flex items-center justify-between px-4 py-3 tui-panel hover:border-[#00FF66] transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 border border-[#00FF66] bg-[#07190E] text-[#00FF66] flex items-center justify-center">
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-sm font-bold text-[#D2FBE0]">Add Friend</span>
              </div>
              <span className="text-xs font-bold text-[#FFB000]">[{friendCount}]</span>
            </button>

            {/* 2. Share */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => triggerToast('xclip -sel clip < session.url'))
              }
              className="w-full flex items-center justify-between px-4 py-3 tui-panel hover:border-[#00E5FF] transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 border border-[#00E5FF] bg-[#06181C] text-[#00E5FF] flex items-center justify-center">
                  <Share2 className="w-4 h-4 stroke-[2]" />
                </div>
                <span className="text-sm font-bold text-[#D2FBE0]">Share</span>
              </div>
              <span className="text-[10px] text-[#86EFAC]/50">^S</span>
            </button>

            {/* 3. Select Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                className="w-full flex items-center justify-between px-4 py-3.5 tui-panel hover:border-[#FFB000] transition-colors"
              >
                <span className="text-sm font-bold text-[#FFB000]">{category}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#FFB000] transition-transform ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 tui-panel border-[#00FF66] p-1.5">
                  {categories.map((cat, idx) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        handleAction('click', () => {
                          setCategory(cat);
                          setIsCategoryOpen(false);
                          triggerToast(`set category="${cat}"`);
                        })
                      }
                      className={`w-full text-left px-3 py-2 text-xs font-bold flex items-center justify-between ${
                        category === cat
                          ? 'bg-[#00FF66] text-[#050807]'
                          : 'text-[#D2FBE0] hover:bg-[#13291D]'
                      }`}
                    >
                      <span>
                        {idx + 1}. {cat}
                      </span>
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
              className="relative overflow-hidden w-full flex items-center justify-between px-4 py-3 tui-panel hover:border-[#00FF66] transition-colors"
            >
              {downloadProgress !== null && (
                <div
                  className="absolute inset-y-0 left-0 bg-[#00FF66]/20 transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              )}
              <div className="relative z-10 flex items-center gap-3.5">
                <div className="w-9 h-9 border border-[#00FF66] bg-[#07190E] text-[#00FF66] flex items-center justify-center">
                  <Download className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span className="text-sm font-bold text-[#D2FBE0]">
                  {downloadProgress !== null ? `fetching ${downloadProgress}%` : 'Download'}
                </span>
              </div>
              <span className="relative z-10 text-[10px] text-[#86EFAC]/50">tar.gz</span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (Nav Tabs, Sparkline+Switch, Slider, Charts, Stepper) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ROW 1: 4 TUI Function-Key Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(
              [
                { id: 'home', label: 'Home', keyHint: 'F1', icon: Home },
                { id: 'calender', label: 'Calender', keyHint: 'F2', icon: Calendar },
                { id: 'notification', label: 'Notification', keyHint: 'F3', icon: Bell },
                { id: 'setting', label: 'Setting', keyHint: 'F4', icon: Settings },
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
                      triggerToast(`view::switch --tab=${item.id}`);
                    })
                  }
                  className={`relative aspect-square sm:aspect-[1/0.86] flex flex-col items-center justify-center gap-2 transition-colors ${
                    isActive
                      ? 'tui-panel-active text-[#00FF66]'
                      : 'tui-panel text-[#86EFAC]/75 hover:border-[#00FF66]/60'
                  }`}
                >
                  <span className="absolute top-1.5 right-2 text-[9px] font-bold text-[#00E5FF]">
                    [{item.keyHint}]
                  </span>
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-bold tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* ROW 2: "Last 7 days" +22,12 ASCII/Vector Sparkline + Switch */}
          <div className="flex flex-col sm:flex-row gap-6 items-stretch">
            <div className="relative flex-1 tui-panel px-5 py-4 pt-6 flex items-center justify-between gap-4">
              <div className="absolute -top-2.5 left-4 px-2 bg-[#060908] text-[10px] font-bold text-[#00E5FF]">
                ─[ net::7d ]─
              </div>
              <div>
                <div className="text-xs text-[#86EFAC]/70">Last 7 days</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <ArrowUp className="w-4 h-4 text-[#00FF66] stroke-[2.5]" />
                  <span className="text-xl font-bold text-[#00FF66]">+22,12</span>
                </div>
              </div>

              <div className="w-[210px] sm:w-[250px] h-[64px] border border-[#1E3B2B] bg-[#050807] p-2 shrink-0">
                <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                  <line x1="0" y1="30" x2="240" y2="30" stroke="#183024" strokeDasharray="3 3" />
                  <path
                    d="M8,50 C28,50 32,20 55,22 C76,24 80,44 102,38 C122,32 132,48 154,32 C172,18 182,12 194,16 C210,22 222,48 234,48"
                    fill="none"
                    stroke="#00FF66"
                    strokeWidth="2.5"
                    strokeLinecap="square"
                  />
                  <rect x="188" y="11" width="7" height="7" fill="#FFB000" />
                </svg>
              </div>
            </div>

            {/* CLI Flag Switch */}
            <button
              type="button"
              onClick={() =>
                handleAction('toggle', () => {
                  const next = !isSwitchOn;
                  setIsSwitchOn(next);
                  triggerToast(`daemon --enabled=${next ? 'true' : 'false'}`);
                })
              }
              aria-pressed={isSwitchOn}
              className={`relative w-full sm:w-[144px] min-h-[82px] border p-2.5 flex items-center justify-between transition-colors ${
                isSwitchOn
                  ? 'border-[#00FF66] bg-[#0B1C13]'
                  : 'border-[#234935] bg-[#0B110E]'
              }`}
            >
              <span
                className={`pl-2 text-xs font-bold ${
                  isSwitchOn ? 'text-[#00FF66]' : 'text-[#4B6355]'
                }`}
              >
                ON
              </span>
              <span
                className={`pr-2 text-xs font-bold ${
                  !isSwitchOn ? 'text-[#FFB000]' : 'text-[#4B6355]'
                }`}
              >
                OFF
              </span>
              <div
                className={`absolute top-2 bottom-2 w-[58px] border transition-all duration-200 flex items-center justify-center text-[10px] font-bold ${
                  isSwitchOn
                    ? 'left-[calc(100%-66px)] bg-[#00FF66] border-[#00FF66] text-[#050807]'
                    : 'left-2 bg-[#1A2921] border-[#385E49] text-[#FFB000]'
                }`}
              >
                {isSwitchOn ? '[■]' : '[ ]'}
              </div>
            </button>
          </div>

          {/* ROW 3: ASCII Block Slider (71%) + Terminal Tooltip Box */}
          <div className="relative tui-panel p-6 pt-7 pb-7">
            <div className="absolute -top-2.5 left-4 px-2 bg-[#060908] text-[10px] font-bold text-[#00FF66]">
              ─[ cpu::alloc ]─
            </div>

            <div className="flex items-center gap-4">
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
                className="relative flex-1 h-8 border border-[#234935] bg-[#050807] px-3 flex items-center cursor-pointer overflow-hidden"
              >
                <span className="text-xs sm:text-sm tracking-[0.12em] text-[#00FF66] truncate">
                  [{asciiTrack}]
                </span>
                <div
                  className="absolute top-0.5 bottom-0.5 w-3 -translate-x-1/2 bg-[#FFB000] border border-[#050807]"
                  style={{ left: `${sliderValue}%` }}
                />
              </div>

              <div className="text-lg font-bold text-[#FFB000] min-w-[60px] text-right">
                {sliderValue}%
              </div>
            </div>

            <div className="mt-5 flex justify-center sm:justify-end sm:pr-16">
              <div className="relative max-w-[285px] border border-[#00E5FF] bg-[#061217] px-4 py-2.5">
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1 bg-[#061217] text-[10px] text-[#00E5FF]">
                  ▲
                </span>
                <p className="text-[10px] leading-snug text-[#A5F3FC]">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                </p>
              </div>
            </div>
          </div>

          {/* ROW 4: Two TUI Telemetry Panes ($4891.22 + 2201 Wireframe Peaks) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Card */}
            <div className="relative md:col-span-7 tui-panel p-6 pt-7 flex flex-col justify-between gap-4">
              <div className="absolute -top-2.5 left-4 px-2 bg-[#060908] text-[10px] font-bold text-[#FFB000]">
                ─[ ledger::usd ]─
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#86EFAC]/70 mb-1.5">
                    LOREM IPSUM DOLOR SIT
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#00FF66]">$4891.22</div>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUp className="w-3.5 h-3.5 text-[#00FF66] stroke-[2.5]" />
                    <span className="text-xs font-bold text-[#00E5FF]">75%</span>
                  </div>
                </div>

                {/* Phosphor Ring Gauge */}
                <div className="relative w-[132px] h-[132px] border border-[#1E3B2B] bg-[#050807] shrink-0 flex items-center justify-center p-2">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#14291E"
                      strokeWidth="10"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="33"
                      fill="none"
                      stroke="#FFB000"
                      strokeWidth="4"
                      strokeDasharray="6 6"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#00FF66"
                      strokeWidth="10"
                      strokeDasharray="289"
                      strokeDashoffset={289 * 0.25}
                    />
                  </svg>
                  <div className="absolute text-sm font-bold text-[#D2FBE0]">75%</div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 text-xs text-[#86EFAC]/85">
                <div className="flex items-center gap-2.5">
                  <span className="text-[#00FF66] font-bold">[■]</span>
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#FFB000] font-bold">[■]</span>
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
              </div>
            </div>

            {/* Right Card (2201 + Oscilloscope Peaks) */}
            <div className="relative md:col-span-5 tui-panel p-6 pt-7 flex flex-col justify-between">
              <div className="absolute -top-2.5 left-4 px-2 bg-[#060908] text-[10px] font-bold text-[#00E5FF]">
                ─[ trace::2201 ]─
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-[#00E5FF]">2201</span>
                  <div className="flex-1 h-[1px] bg-[#234935] relative">
                    <span className="w-2.5 h-2.5 bg-[#00FF66] absolute right-0 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <p className="text-[10px] text-[#86EFAC]/65 mt-2 leading-snug">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit...
                </p>
              </div>

              <div className="my-4 h-[132px] border border-[#1E3B2B] bg-[#050807] p-2">
                <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="tuiMountainFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00FF66" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#050807" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8,136 C25,136 30,84 44,84 C58,84 62,118 76,118 C90,118 96,60 110,60 C124,60 132,96 146,96 C160,96 168,68 182,68 C196,68 202,136 212,136 Z"
                    fill="rgba(0,229,255,0.16)"
                    stroke="#00E5FF"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <path
                    d={`M8,136 C22,136 26,72 38,72 C50,72 56,120 68,120 C80,120 86,90 98,90 C112,90 116,66 130,66 C144,66 148,108 160,108 C172,108 176,${peakTipY} 188,${peakTipY} C200,${peakTipY} 204,136 212,136 Z`}
                    fill="url(#tuiMountainFill)"
                    stroke="#00FF66"
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
                className="w-full accent-[#00FF66] cursor-pointer h-1.5 bg-[#183024]"
              />
            </div>
          </div>

          {/* ROW 5: TUI Git/Epoch Timeline Stepper (2019 - 2022) */}
          <div className="relative tui-panel px-6 py-6 pt-7">
            <div className="absolute -top-2.5 left-4 px-2 bg-[#060908] text-[10px] font-bold text-[#00FF66]">
              ─[ epoch::commits ]─
            </div>

            <div className="relative flex items-center justify-between px-4 sm:px-8 mb-4">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[1px] bg-[#234935]" />
              {([2019, 2020, 2021, 2022] as const).map((year) => {
                const isSelected = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setActiveYear(year);
                        triggerToast(`git checkout tags/v${year}`);
                      })
                    }
                    aria-label={`Select year ${year}`}
                    className={`relative z-10 w-6 h-6 border flex items-center justify-center transition-transform ${
                      isSelected
                        ? 'bg-[#00FF66] border-[#00FF66] text-[#050807] scale-125'
                        : 'bg-[#0B110E] border-[#234935] text-[#00E5FF]'
                    }`}
                  >
                    <span className="text-[10px] font-bold">{isSelected ? '●' : '○'}</span>
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
                        triggerToast(`git checkout tags/v${year}`);
                      })
                    }
                    className={`py-2 border text-xs sm:text-sm font-bold transition-colors ${
                      isSelected
                        ? 'bg-[#00FF66] border-[#00FF66] text-[#050807]'
                        : 'bg-[#070D0A] border-[#234935] text-[#86EFAC]/80 hover:border-[#00FF66]'
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

export default TerminalTUI;

