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
  Bot,
  Send,
  Wand2,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const AINative: React.FC = () => {
  // Copilot Intent Prompt Bar States
  const [promptInput, setPromptInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [aiReasoning, setAiReasoning] = useState(
    'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...'
  );

  // Login Form States
  const [email, setEmail] = useState('username@mail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  // Quick Navigation Active Tab
  const [activeNav, setActiveNav] = useState<'home' | 'calender' | 'notification' | 'setting'>('home');

  // Toggle Switch State (Copilot Autopilot)
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

  const runCopilotIntent = (intentLabel: string) => {
    handleAction('click');
    setIsStreaming(true);
    setPromptInput(intentLabel);

    if (intentLabel.includes('Boost 88%')) {
      setSliderValue(88);
      setChartTimeline(90);
      setAiReasoning('Agent tuned slider confidence to 88% & projected 2201 peak growth (+17 pts)...');
    } else if (intentLabel.includes('Reset 71%')) {
      setSliderValue(71);
      setChartTimeline(65);
      setAiReasoning('Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...');
    } else if (intentLabel.includes('2022')) {
      setActiveYear(2022);
      setAiReasoning('Model jumped to 2022 checkpoint window with 75% allocation verified.');
    } else {
      setAiReasoning(`Synthesized "${intentLabel}" across telemetry ($4891.22 · +22,12)...`);
    }

    triggerToast(`Copilot executed: ${intentLabel}`);
    setTimeout(() => {
      setIsStreaming(false);
      playTactileClick('success');
    }, 950);
  };

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    runCopilotIntent(promptInput.trim());
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
    triggerToast('Streaming generative bundle...');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('Synthesized UI-Kit-AI-Native.zip');
          setTimeout(() => setDownloadProgress(null), 1500);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const categories = ['Dashboard Design', 'Mobile Components', 'Tactile UI Kits', 'Design Tokens'];
  const intentChips = ['Boost 88% Confidence', 'Inspect 2022 Node', 'Reset 71% Baseline'];

  const peakScale = 0.72 + (chartTimeline / 100) * 0.42;
  const peakTipY = Math.round(135 - 115 * peakScale);

  return (
    <div
      className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen relative overflow-hidden text-slate-100"
      style={{
        backgroundColor: '#090A10',
        backgroundImage: `
          radial-gradient(circle at 18% 12%, rgba(139, 92, 246, 0.22) 0%, transparent 42%),
          radial-gradient(circle at 82% 20%, rgba(6, 182, 212, 0.16) 0%, transparent 40%),
          radial-gradient(circle at 55% 88%, rgba(236, 72, 153, 0.14) 0%, transparent 46%),
          radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 100% 100%, 26px 26px',
      }}
    >
      {/* Copilot Streaming Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl ai-prompt-ring text-slate-100">
          <Sparkles className="w-4 h-4 text-violet-400 animate-pulse shrink-0" />
          <span className="text-xs font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* AI-Native Header + Interactive Intent Command Bar */}
      <div className="max-w-[1060px] mx-auto mb-8 rounded-[28px] ai-prompt-ring p-6 sm:p-7 overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-400/35 text-[11px] font-bold uppercase tracking-widest text-violet-300 mb-2.5">
              <Bot className="w-3.5 h-3.5" />
              Agentic // AI-Native Canvas
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              AI-Native UI System
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
              Intent-driven surfaces combining conversational prompt bars, streaming token shimmers, predictive analytics, and one-click agentic actions.
            </p>
          </div>

          {/* Interactive Prompt Surface + Intent Chips */}
          <div className="flex-1 max-w-md w-full">
            <form
              onSubmit={handlePromptSubmit}
              className="flex items-center gap-2 rounded-2xl bg-[#0B0C14] border border-violet-400/35 px-3.5 py-2 focus-within:border-violet-400 transition-colors"
            >
              <Sparkles
                className={`w-4 h-4 shrink-0 ${
                  isStreaming ? 'text-cyan-400 animate-spin' : 'text-violet-400'
                }`}
              />
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Ask copilot to mutate canvas..."
                className="w-full bg-transparent text-xs font-medium text-white placeholder-slate-500 focus:outline-none py-1"
                aria-label="Copilot intent input"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 text-white flex items-center justify-center hover:brightness-110 transition-all active:scale-95 shrink-0"
                aria-label="Run copilot prompt"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Intent Suggestion Chips */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
              {intentChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => runCopilotIntent(chip)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-violet-500/20 border border-white/10 hover:border-violet-400/40 text-[10px] font-semibold text-slate-300 transition-all"
                >
                  <Wand2 className="w-2.5 h-2.5 text-violet-400" />
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Showcase Canvas matching exact sample.jpg layout */}
      <div className="max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* ================= LEFT COLUMN (Login Card + 4 Intent Action Pills) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-9">
          {/* Login Card */}
          <div className="relative rounded-[28px] ai-surface p-7 pb-12">
            <div className="flex items-center justify-between mb-7">
              <h2 className="text-[28px] font-extrabold tracking-tight text-white">Login</h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-[10px] font-bold text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Agent Pass
              </span>
            </div>

            {/* Email */}
            <div className="mb-5">
              <div className="relative flex items-center rounded-2xl bg-[#0B0C14] border border-white/10 focus-within:border-violet-400/70 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pr-10 bg-transparent text-slate-100 font-medium text-sm focus:outline-none"
                  aria-label="Email address"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <div className="relative flex items-center rounded-2xl bg-[#0B0C14] border border-white/10 focus-within:border-violet-400/70 transition-colors">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-10 bg-transparent text-slate-100 font-medium text-sm tracking-wider focus:outline-none"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                  className="absolute right-3 p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
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
                  handleAction('click', () => triggerToast('Copilot drafted password reset flow'))
                }
                className="text-xs font-semibold text-violet-300 underline underline-offset-4 hover:text-cyan-300 transition-colors"
              >
                Forget Password?
              </button>
            </div>

            {/* Overhanging Neural Gradient Sign Up CTA */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
              <button
                type="button"
                onClick={() =>
                  handleAction(isSignedUp ? 'click' : 'success', () => {
                    setIsSignedUp(!isSignedUp);
                    triggerToast(isSignedUp ? 'Agent session ended' : `Workspace synced: ${email}`);
                  })
                }
                className={`min-w-[186px] px-8 py-3.5 rounded-full font-bold text-sm text-white flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_14px_30px_rgba(139,92,246,0.42)] ${
                  isSignedUp
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500'
                    : 'bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 animate-ai-sweep'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                {isSignedUp ? 'Signed Up ✓' : 'Sign Up'}
              </button>
            </div>
          </div>

          {/* 4 Stacked AI-Native Action Pills */}
          <div className="flex flex-col gap-3.5 pt-2">
            {/* 1. Add Friend */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => {
                  setFriendCount((c) => c + 1);
                  triggerToast(`Invited collaborator (${friendCount + 1})`);
                })
              }
              className="w-full flex items-center justify-between px-4 py-3 rounded-full ai-surface hover:border-violet-400/50 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 text-white flex items-center justify-center">
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-sm font-semibold text-white">Add Friend</span>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-200 border border-violet-400/30">
                {friendCount}
              </span>
            </button>

            {/* 2. Share */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => triggerToast('Copied prompt canvas permalink'))
              }
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-full ai-surface hover:border-violet-400/50 transition-all active:scale-[0.98]"
            >
              <div className="w-10 h-10 rounded-full bg-white/[0.08] text-slate-200 flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-white">Share</span>
            </button>

            {/* 3. Select Category */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                className="w-full flex items-center justify-between px-6 py-4 rounded-full ai-surface hover:border-violet-400/50 transition-all active:scale-[0.98]"
              >
                <span className="text-sm font-semibold text-white">{category}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-2xl ai-prompt-ring p-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        handleAction('click', () => {
                          setCategory(cat);
                          setIsCategoryOpen(false);
                          triggerToast(`Context focused: ${cat}`);
                        })
                      }
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                        category === cat
                          ? 'bg-violet-500/25 text-violet-200 border border-violet-400/35'
                          : 'text-slate-300 hover:bg-white/[0.06]'
                      }`}
                    >
                      <span>{cat}</span>
                      {category === cat && <Check className="w-4 h-4 text-cyan-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Download */}
            <button
              type="button"
              onClick={handleDownload}
              className="relative overflow-hidden w-full flex items-center gap-3.5 px-4 py-3 rounded-full ai-surface hover:border-cyan-400/50 transition-all active:scale-[0.98]"
            >
              {downloadProgress !== null && (
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500/35 to-cyan-400/35 transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              )}
              <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center">
                <Download className="w-4 h-4" />
              </div>
              <span className="relative z-10 text-sm font-semibold text-white">
                {downloadProgress !== null ? `Generating ${downloadProgress}%` : 'Download'}
              </span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (Quick Nav, Predictive Chart, Streaming Slider, Metrics) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ROW 1: 4 Quick Nav HUD Tiles */}
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
                      triggerToast(`Copilot switched view: ${item.label}`);
                    })
                  }
                  className={`aspect-square sm:aspect-[1/0.88] rounded-2xl flex flex-col items-center justify-center gap-2.5 transition-all active:scale-95 ${
                    isActive
                      ? 'ai-prompt-ring text-white'
                      : 'ai-surface text-slate-400 hover:text-white hover:border-violet-400/40'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isActive
                        ? 'bg-gradient-to-tr from-violet-600 to-cyan-500 text-white shadow-[0_0_18px_rgba(139,92,246,0.45)]'
                        : 'bg-white/[0.06] text-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* ROW 2: "Last 7 days" +22,12 Predictive Sparkline + Copilot Switch */}
          <div className="flex flex-col sm:flex-row gap-5 items-stretch">
            <div className="flex-1 rounded-[24px] ai-surface px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  Last 7 days
                  <span className="px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 text-[9px] font-bold uppercase">
                    AI Forecast
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300">
                    <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span className="text-xl font-bold text-white">+22,12</span>
                </div>
              </div>

              <div className="w-[205px] sm:w-[245px] h-[60px] shrink-0">
                <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="aiSparkGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="55%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#22D3EE" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8,50 C28,50 32,20 55,22 C76,24 80,44 102,38 C122,32 132,48 154,32 C172,18 182,12 194,16 C210,22 222,48 234,48"
                    fill="none"
                    stroke="url(#aiSparkGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="192" cy="15" r="6" fill="#22D3EE" stroke="#090A10" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* Agent Autopilot ON/OFF Switch */}
            <button
              type="button"
              onClick={() =>
                handleAction('toggle', () => {
                  const next = !isSwitchOn;
                  setIsSwitchOn(next);
                  triggerToast(`Autopilot ${next ? 'ON' : 'OFF'}`);
                })
              }
              aria-pressed={isSwitchOn}
              className={`relative w-full sm:w-[144px] min-h-[82px] rounded-full border p-2.5 flex items-center justify-between transition-all ${
                isSwitchOn
                  ? 'bg-gradient-to-r from-violet-600/85 to-cyan-500/85 border-violet-300/50 shadow-[0_0_24px_rgba(139,92,246,0.35)]'
                  : 'bg-[#12131E] border-white/15'
              }`}
            >
              <span
                className={`pl-3 text-xs font-extrabold tracking-widest ${
                  isSwitchOn ? 'text-white' : 'text-white/35'
                }`}
              >
                ON
              </span>
              <span
                className={`pr-3 text-xs font-extrabold tracking-widest ${
                  !isSwitchOn ? 'text-white' : 'text-white/35'
                }`}
              >
                OFF
              </span>
              <div
                className={`absolute top-2 bottom-2 w-[60px] rounded-full bg-white shadow-lg transition-all duration-300 flex items-center justify-center ${
                  isSwitchOn ? 'left-[calc(100%-68px)]' : 'left-2'
                }`}
              >
                <Sparkles
                  className={`w-4 h-4 ${isSwitchOn ? 'text-violet-600' : 'text-slate-400'}`}
                />
              </div>
            </button>
          </div>

          {/* ROW 3: Confidence Slider + Streaming Insight Callout */}
          <div className="rounded-[24px] ai-surface p-6 pb-7">
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
                className="relative flex-1 h-4 rounded-full bg-[#0B0C14] border border-white/10 cursor-pointer"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 transition-all duration-150"
                  style={{ width: `${sliderValue}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white border-2 border-violet-400 shadow-[0_0_16px_rgba(167,139,250,0.85)]"
                  style={{ left: `${sliderValue}%` }}
                />
              </div>

              <div className="text-xl font-extrabold bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent min-w-[54px] text-right">
                {sliderValue}%
              </div>
            </div>

            {/* Streaming Copilot Token Bubble */}
            <div className="mt-5 flex justify-center sm:justify-end sm:pr-12">
              <div className="relative max-w-[300px] rounded-2xl ai-prompt-ring px-4 py-3">
                <div className="w-3 h-3 bg-[#151726] border-l border-t border-violet-400/40 rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2" />
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3 h-3 text-violet-400" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-violet-300">
                    {isStreaming ? 'Streaming tokens...' : 'Copilot Reasoning'}
                  </span>
                </div>
                <p className="text-[10px] leading-snug text-slate-300 font-medium">
                  {aiReasoning}
                  <span className="inline-block w-1.5 h-3 ml-1 align-middle bg-cyan-400 animate-pulse" />
                </p>
              </div>
            </div>
          </div>

          {/* ROW 4: Two Generative Analytics Widgets ($4891.22 + 2201 Predictive Peaks) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            {/* Left Card */}
            <div className="md:col-span-7 rounded-[26px] ai-surface p-6 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-violet-300/80 mb-2">
                    LOREM IPSUM DOLOR SIT
                  </div>
                  <div className="text-3xl font-extrabold tracking-tight text-white">
                    $4891.22
                  </div>
                  <div className="inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/25">
                    <ArrowUp className="w-3 h-3 stroke-[3]" />
                    <span className="text-xs font-bold">75%</span>
                  </div>
                </div>

                {/* Neural Multi-Gradient 75% Gauge */}
                <div className="relative w-[138px] h-[138px] shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <defs>
                      <linearGradient id="aiGaugeGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="50%" stopColor="#EC4899" />
                        <stop offset="100%" stopColor="#22D3EE" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="11"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="33"
                      fill="none"
                      stroke="rgba(167,139,250,0.35)"
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
                      stroke="url(#aiGaugeGrad)"
                      strokeWidth="11"
                      strokeDasharray="289"
                      strokeDashoffset={289 * 0.25}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute w-[60px] h-[60px] rounded-full bg-[#0F101B] border border-violet-400/35 flex items-center justify-center text-sm font-extrabold text-white">
                    75%
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-violet-400/45 shrink-0" />
                  <span className="text-xs text-slate-400">Lorem ipsum dolor sit amet</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 shrink-0" />
                  <span className="text-xs text-slate-400">Lorem ipsum dolor sit amet</span>
                </div>
              </div>
            </div>

            {/* Right Card (2201 + Predictive Mountain Curve) */}
            <div className="md:col-span-5 rounded-[26px] ai-surface p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-extrabold tracking-tight text-white">2201</span>
                  <div className="flex-1 h-[2px] bg-white/15 relative">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 absolute right-0 top-1/2 -translate-y-1/2 shadow-[0_0_10px_#22D3EE]" />
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5 leading-snug">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit...
                </p>
              </div>

              <div className="my-4 h-[130px]">
                <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="aiPeakGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.95" />
                      <stop offset="55%" stopColor="#8B5CF6" stopOpacity="0.82" />
                      <stop offset="100%" stopColor="#312E81" stopOpacity="0.35" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8,136 C25,136 30,84 44,84 C58,84 62,118 76,118 C90,118 96,60 110,60 C124,60 132,96 146,96 C160,96 168,68 182,68 C196,68 202,136 212,136 Z"
                    fill="rgba(255,255,255,0.12)"
                  />
                  <path
                    d={`M8,136 C22,136 26,72 38,72 C50,72 56,120 68,120 C80,120 86,90 98,90 C112,90 116,66 130,66 C144,66 148,108 160,108 C172,108 176,${peakTipY} 188,${peakTipY} C200,${peakTipY} 204,136 212,136 Z`}
                    fill="url(#aiPeakGrad)"
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
                className="w-full accent-violet-400 cursor-pointer h-1.5 rounded-full bg-white/15"
              />
            </div>
          </div>

          {/* ROW 5: Timeline / Context Window Stepper (2019 - 2022) */}
          <div className="rounded-[24px] ai-surface px-6 py-5">
            <div className="relative flex items-center justify-between px-4 sm:px-8 mb-4">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 rounded-full bg-gradient-to-r from-violet-500/45 via-fuchsia-500/45 to-cyan-400/45" />
              {([2019, 2020, 2021, 2022] as const).map((year) => {
                const isSelected = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setActiveYear(year);
                        triggerToast(`Checkpoint loaded: ${year}`);
                      })
                    }
                    aria-label={`Select year ${year}`}
                    className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-transform ${
                      isSelected
                        ? 'bg-gradient-to-tr from-violet-500 to-cyan-400 scale-125 shadow-[0_0_16px_rgba(139,92,246,0.75)]'
                        : 'bg-[#1D1F2F] border border-white/25 hover:border-violet-400'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-white" />
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
                        triggerToast(`Checkpoint loaded: ${year}`);
                      })
                    }
                    className={`py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-[0_6px_18px_rgba(139,92,246,0.35)]'
                        : 'bg-white/[0.05] text-slate-400 border border-white/10 hover:text-white hover:border-violet-400/35'
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

export default AINative;

