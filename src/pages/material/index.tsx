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
  Palette,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

type SeedKey = 'violet' | 'teal' | 'sapphire' | 'crimson';

interface M3Palette {
  name: string;
  swatch: string;
  surface: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  outline: string;
  outlineVariant: string;
  onSurface: string;
  onSurfaceVariant: string;
}

const M3_SEEDS: Record<SeedKey, M3Palette> = {
  violet: {
    name: 'M3 Violet',
    swatch: '#6750A4',
    surface: '#FEF7FF',
    surfaceContainerLow: '#F7F2FA',
    surfaceContainer: '#F3EDF7',
    surfaceContainerHigh: '#ECE6F0',
    primary: '#6750A4',
    onPrimary: '#FFFFFF',
    primaryContainer: '#EADDFF',
    onPrimaryContainer: '#21005D',
    secondaryContainer: '#E8DEF8',
    onSecondaryContainer: '#1D192B',
    outline: '#79747E',
    outlineVariant: '#CAC4D0',
    onSurface: '#1D1B20',
    onSurfaceVariant: '#49454F',
  },
  teal: {
    name: 'Monet Teal',
    swatch: '#006A6A',
    surface: '#F4FBFB',
    surfaceContainerLow: '#EEF5F5',
    surfaceContainer: '#E8EFEF',
    surfaceContainerHigh: '#E2E9E9',
    primary: '#006A6A',
    onPrimary: '#FFFFFF',
    primaryContainer: '#9CF1F0',
    onPrimaryContainer: '#002020',
    secondaryContainer: '#CCE8E7',
    onSecondaryContainer: '#051F1F',
    outline: '#6F7979',
    outlineVariant: '#BEC9C8',
    onSurface: '#161D1D',
    onSurfaceVariant: '#3F4948',
  },
  sapphire: {
    name: 'Pixel Blue',
    swatch: '#0B57D0',
    surface: '#F8F9FF',
    surfaceContainerLow: '#F0F4FA',
    surfaceContainer: '#EAEFF7',
    surfaceContainerHigh: '#E3E9F3',
    primary: '#0B57D0',
    onPrimary: '#FFFFFF',
    primaryContainer: '#D3E3FD',
    onPrimaryContainer: '#041E49',
    secondaryContainer: '#C2E7FF',
    onSecondaryContainer: '#001D35',
    outline: '#747775',
    outlineVariant: '#C4C7C5',
    onSurface: '#1B1C1E',
    onSurfaceVariant: '#444746',
  },
  crimson: {
    name: 'Terracotta',
    swatch: '#9C4146',
    surface: '#FFF8F7',
    surfaceContainerLow: '#FCF1F0',
    surfaceContainer: '#F7EBE9',
    surfaceContainerHigh: '#F1E5E3',
    primary: '#9C4146',
    onPrimary: '#FFFFFF',
    primaryContainer: '#FFDAD9',
    onPrimaryContainer: '#40000A',
    secondaryContainer: '#F4DDDC',
    onSecondaryContainer: '#2C1516',
    outline: '#857373',
    outlineVariant: '#D7C1C1',
    onSurface: '#22191A',
    onSurfaceVariant: '#524343',
  },
};

export const MaterialDesign: React.FC = () => {
  const [seedKey, setSeedKey] = useState<SeedKey>('violet');
  const t = M3_SEEDS[seedKey];

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

  // M3 Snackbar message
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
    triggerToast('Fetching Material You tokens...');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('Saved: UI-Kit-Material3.zip');
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
      className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen transition-colors duration-300"
      style={{ backgroundColor: t.surface, color: t.onSurface }}
    >
      {/* M3 Inverse Snackbar Toast */}
      {toastMessage && (
        <div
          className="fixed bottom-6 right-6 z-50 flex items-center justify-between gap-4 px-5 py-3.5 rounded-xl m3-elev-3"
          style={{ backgroundColor: t.onSurface, color: t.surface }}
        >
          <span className="text-xs font-medium tracking-wide">{toastMessage}</span>
          <span
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: t.primaryContainer }}
          >
            OK
          </span>
        </div>
      )}

      {/* Material You Top App Bar / Seed Extractor Banner */}
      <div
        className="max-w-[1060px] mx-auto mb-8 rounded-[28px] p-6 sm:p-7 m3-elev-1 transition-colors duration-300"
        style={{ backgroundColor: t.surfaceContainerLow }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2.5"
              style={{ backgroundColor: t.primaryContainer, color: t.onPrimaryContainer }}
            >
              <Palette className="w-3.5 h-3.5" />
              Design System // Material Design 3
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Material You (M3) UI
            </h1>
            <p
              className="text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed"
              style={{ color: t.onSurfaceVariant }}
            >
              Google&apos;s tonal surface hierarchy combining dynamic color extraction (Monet), rational elevation shadows, floating outlined labels, and tactile pill states.
            </p>
          </div>

          {/* Dynamic Color Seed Switcher */}
          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: t.onSurfaceVariant }}
            >
              Dynamic Seed Theme
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {(Object.keys(M3_SEEDS) as SeedKey[]).map((key) => {
                const seed = M3_SEEDS[key];
                const isSelected = seedKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setSeedKey(key);
                        triggerToast(`Extracted palette: ${seed.name}`);
                      })
                    }
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                      isSelected ? 'm3-elev-2' : ''
                    }`}
                    style={{
                      backgroundColor: isSelected ? seed.primaryContainer : t.surface,
                      color: isSelected ? seed.onPrimaryContainer : t.onSurfaceVariant,
                      border: `1px solid ${isSelected ? seed.primary : t.outlineVariant}`,
                    }}
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: seed.swatch }}
                    />
                    {seed.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Showcase Canvas matching exact sample.jpg layout */}
      <div className="max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* ================= LEFT COLUMN (M3 Login Card + 4 Tonal Action Pills) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-9">
          {/* Login Card (Elevated M3 Container) */}
          <div
            className="relative rounded-[28px] p-7 pb-12 m3-elev-2 transition-colors duration-300"
            style={{ backgroundColor: t.surfaceContainerLow }}
          >
            <h2 className="text-[28px] font-bold tracking-tight mb-7">Login</h2>

            {/* M3 Outlined Text Field: Email */}
            <div className="relative mb-6">
              <span
                className="absolute -top-2 left-3.5 px-1.5 text-[11px] font-medium z-10"
                style={{ backgroundColor: t.surfaceContainerLow, color: t.primary }}
              >
                Email
              </span>
              <div
                className="relative flex items-center rounded-xl px-4 py-3 border transition-colors"
                style={{ borderColor: t.outline, backgroundColor: t.surface }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-7 bg-transparent text-sm font-medium focus:outline-none"
                  style={{ color: t.onSurface }}
                  aria-label="Email address"
                />
                <Mail
                  className="w-4 h-4 absolute right-3.5 pointer-events-none"
                  style={{ color: t.onSurfaceVariant }}
                />
              </div>
            </div>

            {/* M3 Outlined Text Field: Password */}
            <div className="relative mb-5">
              <span
                className="absolute -top-2 left-3.5 px-1.5 text-[11px] font-medium z-10"
                style={{ backgroundColor: t.surfaceContainerLow, color: t.onSurfaceVariant }}
              >
                Password
              </span>
              <div
                className="relative flex items-center rounded-xl px-4 py-3 border transition-colors"
                style={{ borderColor: t.outline, backgroundColor: t.surface }}
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-8 bg-transparent text-sm font-medium tracking-wider focus:outline-none"
                  style={{ color: t.onSurface }}
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                  className="absolute right-3 p-1 rounded-full hover:bg-black/5 transition-colors"
                  style={{ color: t.onSurfaceVariant }}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* M3 Text Button: Forget Password? */}
            <div className="mb-3">
              <button
                type="button"
                onClick={() =>
                  handleAction('click', () => triggerToast('Recovery notification sent'))
                }
                className="text-[13px] font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity"
                style={{ color: t.primary }}
              >
                Forget Password?
              </button>
            </div>

            {/* Overhanging Extended FAB / Pill CTA: Sign Up */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
              <button
                type="button"
                onClick={() =>
                  handleAction(isSignedUp ? 'click' : 'success', () => {
                    setIsSignedUp(!isSignedUp);
                    triggerToast(isSignedUp ? 'Signed out' : `Signed up: ${email}`);
                  })
                }
                className="min-w-[186px] px-8 py-3.5 rounded-2xl font-semibold text-[15px] tracking-wide m3-elev-3 transition-all active:scale-95"
                style={{
                  backgroundColor: isSignedUp ? t.primaryContainer : t.primary,
                  color: isSignedUp ? t.onPrimaryContainer : t.onPrimary,
                }}
              >
                {isSignedUp ? 'Signed Up ✓' : 'Sign Up'}
              </button>
            </div>
          </div>

          {/* 4 Stacked M3 Elevated / Tonal Action Pills */}
          <div className="flex flex-col gap-4 pt-2">
            {/* 1. Add Friend */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => {
                  setFriendCount((c) => c + 1);
                  triggerToast(`Added contact (${friendCount + 1})`);
                })
              }
              className="w-full flex items-center justify-between px-4 py-3 rounded-full m3-elev-1 hover:m3-elev-2 transition-all active:scale-[0.98]"
              style={{ backgroundColor: t.surfaceContainerLow }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center m3-elev-1"
                  style={{ backgroundColor: t.primaryContainer, color: t.onPrimaryContainer }}
                >
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-[15px] font-semibold">Add Friend</span>
              </div>
              <span
                className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: t.secondaryContainer, color: t.onSecondaryContainer }}
              >
                {friendCount}
              </span>
            </button>

            {/* 2. Share */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => triggerToast('Copied link to Android Sharesheet'))
              }
              className="w-full flex items-center gap-4 px-4 py-3 rounded-full m3-elev-1 hover:m3-elev-2 transition-all active:scale-[0.98]"
              style={{ backgroundColor: t.surfaceContainerLow }}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: t.surfaceContainerHigh, color: t.onSurfaceVariant }}
              >
                <Share2 className="w-4 h-4" />
              </div>
              <span className="text-[15px] font-semibold">Share</span>
            </button>

            {/* 3. Select Category Exposed Dropdown Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                className="w-full flex items-center justify-between px-6 py-4 rounded-full m3-elev-1 hover:m3-elev-2 transition-all active:scale-[0.98]"
                style={{ backgroundColor: t.surfaceContainerLow }}
              >
                <span className="text-[15px] font-semibold">{category}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                  style={{ color: t.onSurfaceVariant }}
                />
              </button>

              {isCategoryOpen && (
                <div
                  className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-2xl m3-elev-3 p-1.5"
                  style={{ backgroundColor: t.surfaceContainer }}
                >
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
                      className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors hover:bg-black/5"
                      style={
                        category === cat
                          ? { backgroundColor: t.secondaryContainer, color: t.onSecondaryContainer }
                          : { color: t.onSurface }
                      }
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
              className="relative overflow-hidden w-full flex items-center gap-4 px-4 py-3 rounded-full m3-elev-1 hover:m3-elev-2 transition-all active:scale-[0.98]"
              style={{ backgroundColor: t.surfaceContainerLow }}
            >
              {downloadProgress !== null && (
                <div
                  className="absolute inset-y-0 left-0 opacity-30 transition-all duration-200"
                  style={{ width: `${downloadProgress}%`, backgroundColor: t.primary }}
                />
              )}
              <div
                className="relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: t.primary, color: t.onPrimary }}
              >
                <Download className="w-4 h-4" />
              </div>
              <span className="relative z-10 text-[15px] font-semibold">
                {downloadProgress !== null ? `Downloading ${downloadProgress}%` : 'Download'}
              </span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (M3 Navigation Tiles, Charts, Switch, Slider, Stepper) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ROW 1: 4 M3 Quick Navigation Cards with Signature Active Pill Indicator */}
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
                  className={`aspect-square sm:aspect-[1/0.9] rounded-[24px] flex flex-col items-center justify-center gap-2 transition-all active:scale-95 ${
                    isActive ? 'm3-elev-2' : 'm3-elev-1 hover:m3-elev-2'
                  }`}
                  style={{
                    backgroundColor: isActive ? t.surfaceContainerHigh : t.surfaceContainerLow,
                  }}
                >
                  {/* Signature M3 Active Pill behind icon */}
                  <div
                    className="w-16 h-8 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: isActive ? t.secondaryContainer : 'transparent',
                      color: isActive ? t.onSecondaryContainer : t.onSurfaceVariant,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className="text-xs font-bold tracking-tight"
                    style={{ color: isActive ? t.onSurface : t.onSurfaceVariant }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ROW 2: "Last 7 days" +22,12 Card + Authentic M3 Checkmark Switch */}
          <div className="flex flex-col sm:flex-row gap-6 items-stretch">
            <div
              className="flex-1 rounded-[24px] m3-elev-1 px-6 py-4 flex items-center justify-between gap-4"
              style={{ backgroundColor: t.surfaceContainerLow }}
            >
              <div>
                <div className="text-xs font-medium" style={{ color: t.onSurfaceVariant }}>
                  Last 7 days
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full"
                    style={{ backgroundColor: t.primaryContainer, color: t.onPrimaryContainer }}
                  >
                    <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span className="text-xl font-bold">+22,12</span>
                </div>
              </div>

              <div className="w-[210px] sm:w-[250px] h-[64px] shrink-0">
                <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                  <path
                    d="M8,50 C28,50 32,20 55,22 C76,24 80,44 102,38 C122,32 132,48 154,32 C172,18 182,12 194,16 C210,22 222,48 234,48"
                    fill="none"
                    stroke={t.primary}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="192" cy="15" r="6" fill={t.primary} stroke={t.surface} strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* M3 Switch Card */}
            <div
              className="w-full sm:w-[144px] min-h-[82px] rounded-[24px] m3-elev-1 p-4 flex flex-col items-center justify-center gap-1.5"
              style={{ backgroundColor: t.surfaceContainerLow }}
            >
              <button
                type="button"
                onClick={() =>
                  handleAction('toggle', () => {
                    const next = !isSwitchOn;
                    setIsSwitchOn(next);
                    triggerToast(`M3 Switch: ${next ? 'ON' : 'OFF'}`);
                  })
                }
                aria-pressed={isSwitchOn}
                className="relative w-16 h-9 rounded-full transition-colors border-2 flex items-center px-1"
                style={{
                  backgroundColor: isSwitchOn ? t.primary : t.surfaceContainerHigh,
                  borderColor: isSwitchOn ? t.primary : t.outline,
                }}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isSwitchOn ? 'translate-x-7' : 'translate-x-0 scale-75'
                  }`}
                  style={{
                    backgroundColor: isSwitchOn ? t.onPrimary : t.outline,
                    color: t.primary,
                  }}
                >
                  {isSwitchOn && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
              <span
                className="text-[11px] font-bold tracking-widest uppercase"
                style={{ color: isSwitchOn ? t.primary : t.onSurfaceVariant }}
              >
                {isSwitchOn ? 'ON' : 'OFF'}
              </span>
            </div>
          </div>

          {/* ROW 3: M3 Linear Slider + Callout Sheet */}
          <div
            className="rounded-[24px] m3-elev-1 p-6 pb-7"
            style={{ backgroundColor: t.surfaceContainerLow }}
          >
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
                className="relative flex-1 h-4 rounded-full cursor-pointer"
                style={{ backgroundColor: t.surfaceContainerHigh }}
              >
                <div
                  className="h-full rounded-full transition-all duration-150"
                  style={{ width: `${sliderValue}%`, backgroundColor: t.primary }}
                />
                {/* M3 Vertical Pill Handle */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-8 rounded-full ring-4 transition-transform hover:scale-110"
                  style={{
                    left: `${sliderValue}%`,
                    backgroundColor: t.primary,
                    boxShadow: `0 0 0 4px ${t.surfaceContainerLow}`,
                  }}
                />
              </div>

              <div className="text-xl font-bold min-w-[54px] text-right">{sliderValue}%</div>
            </div>

            <div className="mt-5 flex justify-center sm:justify-end sm:pr-20">
              <div
                className="relative max-w-[260px] rounded-2xl m3-elev-2 px-4 py-2.5"
                style={{ backgroundColor: t.surfaceContainerHigh }}
              >
                <div
                  className="w-3 h-3 rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2"
                  style={{ backgroundColor: t.surfaceContainerHigh }}
                />
                <p
                  className="text-[10px] leading-snug font-medium"
                  style={{ color: t.onSurfaceVariant }}
                >
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                </p>
              </div>
            </div>
          </div>

          {/* ROW 4: Two M3 Analytics Cards ($4891.22 + 2201 Mountain Chart) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Card */}
            <div
              className="md:col-span-7 rounded-[28px] m3-elev-2 p-6 flex flex-col justify-between gap-4"
              style={{ backgroundColor: t.surfaceContainerLow }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div
                    className="text-[11px] font-bold uppercase tracking-wider mb-2"
                    style={{ color: t.onSurfaceVariant }}
                  >
                    LOREM IPSUM DOLOR SIT
                  </div>
                  <div className="text-3xl font-bold tracking-tight">$4891.22</div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span
                      className="inline-flex items-center justify-center w-4 h-4 rounded-full"
                      style={{ backgroundColor: t.primaryContainer, color: t.onPrimaryContainer }}
                    >
                      <ArrowUp className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span className="text-xs font-bold" style={{ color: t.primary }}>
                      75%
                    </span>
                  </div>
                </div>

                {/* M3 Progress Ring */}
                <div className="relative w-[138px] h-[138px] shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke={t.surfaceContainerHigh}
                      strokeWidth="11"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="33"
                      fill="none"
                      stroke={t.outlineVariant}
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
                      stroke={t.primary}
                      strokeWidth="11"
                      strokeDasharray="289"
                      strokeDashoffset={289 * 0.25}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div
                    className="absolute w-[60px] h-[60px] rounded-full m3-elev-1 flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: t.surface, color: t.onSurface }}
                  >
                    75%
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <div className="flex items-center gap-3">
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0"
                    style={{ backgroundColor: t.outlineVariant }}
                  />
                  <span className="text-xs font-medium" style={{ color: t.onSurfaceVariant }}>
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0"
                    style={{ backgroundColor: t.primary }}
                  />
                  <span className="text-xs font-medium" style={{ color: t.onSurfaceVariant }}>
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
              </div>
            </div>

            {/* Right Card (2201 + Mountain Peaks) */}
            <div
              className="md:col-span-5 rounded-[28px] m3-elev-2 p-6 flex flex-col justify-between"
              style={{ backgroundColor: t.surfaceContainerLow }}
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold tracking-tight">2201</span>
                  <div
                    className="flex-1 h-[2px] relative"
                    style={{ backgroundColor: t.outlineVariant }}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full absolute right-0 top-1/2 -translate-y-1/2"
                      style={{ backgroundColor: t.primary }}
                    />
                  </div>
                </div>
                <p
                  className="text-[10px] font-medium mt-1.5 leading-snug"
                  style={{ color: t.onSurfaceVariant }}
                >
                  Lorem ipsum dolor sit amet consectetur adipiscing elit...
                </p>
              </div>

              <div className="my-4 h-[132px]">
                <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                  <path
                    d="M8,136 C25,136 30,84 44,84 C58,84 62,118 76,118 C90,118 96,60 110,60 C124,60 132,96 146,96 C160,96 168,68 182,68 C196,68 202,136 212,136 Z"
                    fill={t.outlineVariant}
                  />
                  <path
                    d={`M8,136 C22,136 26,72 38,72 C50,72 56,120 68,120 C80,120 86,90 98,90 C112,90 116,66 130,66 C144,66 148,108 160,108 C172,108 176,${peakTipY} 188,${peakTipY} C200,${peakTipY} 204,136 212,136 Z`}
                    fill={t.primary}
                    fillOpacity="0.88"
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
                className="w-full cursor-pointer h-2 rounded-full"
                style={{ accentColor: t.primary, backgroundColor: t.surfaceContainerHigh }}
              />
            </div>
          </div>

          {/* ROW 5: M3 Timeline Stepper (2019 - 2022) */}
          <div
            className="rounded-[24px] m3-elev-1 px-6 py-6"
            style={{ backgroundColor: t.surfaceContainerLow }}
          >
            <div className="relative flex items-center justify-between px-4 sm:px-8 mb-4">
              <div
                className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 rounded-full"
                style={{ backgroundColor: t.outlineVariant }}
              />
              {([2019, 2020, 2021, 2022] as const).map((year) => {
                const isSelected = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setActiveYear(year);
                        triggerToast(`Release ${year}`);
                      })
                    }
                    aria-label={`Select year ${year}`}
                    className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-transform ${
                      isSelected ? 'scale-125 m3-elev-2' : ''
                    }`}
                    style={{
                      backgroundColor: isSelected ? t.primary : t.surfaceContainerHigh,
                      border: `2px solid ${isSelected ? t.primary : t.outlineVariant}`,
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: isSelected ? t.onPrimary : t.onSurfaceVariant }}
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
                        triggerToast(`Release ${year}`);
                      })
                    }
                    className={`py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
                      isSelected ? 'm3-elev-1' : ''
                    }`}
                    style={{
                      backgroundColor: isSelected ? t.secondaryContainer : t.surface,
                      color: isSelected ? t.onSecondaryContainer : t.onSurfaceVariant,
                      border: `1px solid ${isSelected ? 'transparent' : t.outlineVariant}`,
                    }}
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

export default MaterialDesign;

