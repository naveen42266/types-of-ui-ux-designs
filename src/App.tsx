import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages';
import Skeuomorphism from './pages/skeuomorphism';
import Claymorphism from './pages/claymorphism';
import Neumorphism from './pages/neumorphism';
import Glassmorphism from './pages/glassmorphism';
import Minimalism from './pages/minimalism';
import Maximalism from './pages/maximalism';
import Brutalism from './pages/brutalism';
import LiquidGlass from './pages/liquid-glass';
import BentoGrid from './pages/bento-grid';
import SpatialUI from './pages/spatial';
import FlatDesign from './pages/flat';
import MaterialDesign from './pages/material';
import NeoBrutalism from './pages/neo-brutalism';
import AINative from './pages/ai-native';
import FrutigerAero from './pages/frutiger-aero';
import Y2KCyberPop from './pages/y2k-cyberpop';
import PixelRetro from './pages/pixel-retro';
import TerminalTUI from './pages/terminal-tui';
import CyberpunkHUD from './pages/cyberpunk-hud';
import FUIHologram from './pages/fui-hologram';
import SynthwaveVaporwave from './pages/synthwave-vaporwave';
import SwissInternational from './pages/swiss-international';
import Bauhaus from './pages/bauhaus';
import RisographPaperCraft from './pages/risograph-papercraft';
import FluentDesign from './pages/fluent-design';
import JapandiMinimal from './pages/japandi-minimal';
import AuroraUI from './pages/aurora-ui';
import { StyleShowcasePlaceholder } from './pages/StyleShowcasePlaceholder';

function App() {
  return (
    <BrowserRouter>
      {/* Content View */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skeuomorphism" element={<Skeuomorphism />} />
          <Route path="/claymorphism" element={<Claymorphism />} />
          <Route path="/neumorphism" element={<Neumorphism />} />
          <Route path="/glassmorphism" element={<Glassmorphism />} />
          <Route path="/minimalism" element={<Minimalism />} />
          <Route path="/maximalism" element={<Maximalism />} />
          <Route path="/brutalism" element={<Brutalism />} />
          <Route path="/liquid-glass" element={<LiquidGlass />} />
          <Route path="/bento-grid" element={<BentoGrid />} />
          <Route path="/spatial" element={<SpatialUI />} />
          <Route path="/flat" element={<FlatDesign />} />
          <Route path="/material" element={<MaterialDesign />} />
          <Route path="/neo-brutalism" element={<NeoBrutalism />} />
          <Route path="/ai-native" element={<AINative />} />
          <Route path="/frutiger-aero" element={<FrutigerAero />} />
          <Route path="/y2k-cyberpop" element={<Y2KCyberPop />} />
          <Route path="/pixel-retro" element={<PixelRetro />} />
          <Route path="/terminal-tui" element={<TerminalTUI />} />
          <Route path="/cyberpunk-hud" element={<CyberpunkHUD />} />
          <Route path="/fui-hologram" element={<FUIHologram />} />
          <Route path="/synthwave-vaporwave" element={<SynthwaveVaporwave />} />
          <Route path="/swiss-international" element={<SwissInternational />} />
          <Route path="/bauhaus" element={<Bauhaus />} />
          <Route path="/risograph-papercraft" element={<RisographPaperCraft />} />
          <Route path="/fluent-design" element={<FluentDesign />} />
          <Route path="/japandi-minimal" element={<JapandiMinimal />} />
          <Route path="/aurora-ui" element={<AuroraUI />} />
          <Route path="/:styleId" element={<StyleShowcasePlaceholder />} />
          <Route path="*" element={<Navigate to="/skeuomorphism" replace />} />
        </Routes>
      </main>
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
