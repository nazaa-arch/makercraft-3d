import React from 'react';
import { Box, Download, ExternalLink, ShieldCheck, Microscope, FileText, Orbit } from 'lucide-react';
import type { GeometryType } from '../types/maker';

interface NavbarProps {
  currentGeometry: GeometryType;
  onSelectGeometry: (geom: GeometryType) => void;
  onExportOBJ: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentGeometry,
  onSelectGeometry,
  onExportOBJ
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white font-mono">MakerCraft<span className="text-purple-400">.3D</span></span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
                v1.0.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Generative Mathematical Art &amp; 3D Parametric Studio
            </p>
          </div>
        </div>

        {/* Geometry Selector Pills */}
        <div className="hidden md:flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => onSelectGeometry('torus-knot')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              currentGeometry === 'torus-knot'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Torus Knot
          </button>

          <button
            onClick={() => onSelectGeometry('mobius')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              currentGeometry === 'mobius'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Möbius Strip
          </button>

          <button
            onClick={() => onSelectGeometry('superformula')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              currentGeometry === 'superformula'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Superformula 3D
          </button>

          <button
            onClick={() => onSelectGeometry('klein')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              currentGeometry === 'klein'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Klein Bottle
          </button>

          <button
            onClick={() => onSelectGeometry('spherical-harmonic')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              currentGeometry === 'spherical-harmonic'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Harmonik Bola
          </button>
        </div>

        {/* Ecosystem Badges & 3D Export */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2 text-xs">
            <a
              href="https://sim.steamcraft.online"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all text-[11px]"
              title="SteamSim Lab"
            >
              <Orbit className="w-3 h-3 text-cyan-400" />
              <span>sim</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </a>
            <a
              href="https://scholar.steamcraft.online"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all text-[11px]"
              title="PaperCraft AI"
            >
              <FileText className="w-3 h-3 text-indigo-400" />
              <span>scholar</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </a>
            <a
              href="https://verilab.steamcraft.online"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all text-[11px]"
              title="VeriLab AI"
            >
              <Microscope className="w-3 h-3 text-emerald-400" />
              <span>verilab</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </a>
            <a
              href="https://portofolionaza.steamcraft.online"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all text-[11px]"
              title="Portofolio Naza"
            >
              <ShieldCheck className="w-3 h-3 text-purple-400" />
              <span>portofolionaza</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </a>
          </div>

          <button
            onClick={onExportOBJ}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white font-bold text-xs shadow-md shadow-purple-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor 3D Print (.OBJ)</span>
          </button>
        </div>

      </div>
    </header>
  );
};
