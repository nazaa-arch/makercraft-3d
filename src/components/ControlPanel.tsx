import React from 'react';
import type { ParametricSettings, ColorTheme } from '../types/maker';
import { Sliders, Palette, Cpu, CheckCircle2 } from 'lucide-react';

interface ControlPanelProps {
  settings: ParametricSettings;
  onChange: (updated: ParametricSettings) => void;
  vertexCount: number;
  faceCount: number;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  settings,
  onChange,
  vertexCount,
  faceCount
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between shadow-sm h-full space-y-4 overflow-y-auto">
      
      {/* Header */}
      <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-purple-400" />
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 font-mono">
            Parameter Matematika 3D
          </h4>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30">
          GPU Shading Active
        </span>
      </div>

      {/* Sliders */}
      <div className="space-y-3.5 text-xs">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-slate-600">Parameter Frekuensi (p)</span>
            <span className="font-mono text-purple-400 font-bold">{settings.p}</span>
          </div>
          <input
            type="range"
            min="1"
            max="8"
            step="1"
            value={settings.p}
            onChange={(e) => onChange({ ...settings, p: parseInt(e.target.value) })}
            className="w-full accent-purple-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-slate-600">Parameter Belitan (q)</span>
            <span className="font-mono text-pink-400 font-bold">{settings.q}</span>
          </div>
          <input
            type="range"
            min="1"
            max="9"
            step="1"
            value={settings.q}
            onChange={(e) => onChange({ ...settings, q: parseInt(e.target.value) })}
            className="w-full accent-pink-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-slate-600">Ketebalan Tabung / Radius</span>
            <span className="font-mono text-cyan-400 font-bold">{settings.tubeRadius.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="1.5"
            step="0.05"
            value={settings.tubeRadius}
            onChange={(e) => onChange({ ...settings, tubeRadius: parseFloat(e.target.value) })}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-slate-600">Resolusi Mesh (Grid Steps)</span>
            <span className="font-mono text-emerald-400 font-bold">{settings.resolution}</span>
          </div>
          <input
            type="range"
            min="32"
            max="180"
            step="8"
            value={settings.resolution}
            onChange={(e) => onChange({ ...settings, resolution: parseInt(e.target.value) })}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Theme Palettes */}
      <div className="space-y-2 pt-2 border-t border-slate-200">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-700">
          <Palette className="w-3.5 h-3.5 text-pink-400" />
          <span>Tema Material Shading:</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
          {(['cyberpunk', 'emerald-matrix', 'amber-gold', 'hologram'] as ColorTheme[]).map((theme) => (
            <button
              key={theme}
              onClick={() => onChange({ ...settings, theme })}
              className={`py-1.5 px-2.5 rounded-xl border transition-all capitalize text-[11px] ${
                settings.theme === theme
                  ? 'bg-purple-600 border-purple-600 text-white shadow-xs'
                  : 'bg-slate-950/60 border-slate-200 text-slate-600 hover:text-white'
              }`}
            >
              {theme.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xs">
        <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/60 border border-slate-200 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.wireframe}
            onChange={(e) => onChange({ ...settings, wireframe: e.target.checked })}
            className="accent-purple-500"
          />
          <span className="text-slate-700 text-[11px]">Wireframe</span>
        </label>

        <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/60 border border-slate-200 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.autoRotate}
            onChange={(e) => onChange({ ...settings, autoRotate: e.target.checked })}
            className="accent-purple-500"
          />
          <span className="text-slate-700 text-[11px]">Auto-Orbit</span>
        </label>
      </div>

      {/* Geometric Topology Stats */}
      <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-200 space-y-1.5 text-xs">
        <div className="flex items-center justify-between text-slate-600 text-[11px] font-mono">
          <span className="flex items-center gap-1 text-slate-800">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            Topologi Geometri
          </span>
          <span className="text-emerald-400 font-bold">Siap 3D Print</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1 border-t border-slate-200/60">
          <div>
            <div className="text-slate-500">Vertices:</div>
            <div className="text-slate-800 font-bold">{vertexCount.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-slate-500">Triangles:</div>
            <div className="text-slate-800 font-bold">{faceCount.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Formula Info */}
      <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-[11px] text-purple-800 flex items-center gap-2">
        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
        <span>Persamaan Parametrik $r(\theta, \phi)$ Terinterpolasi Halus</span>
      </div>
    </div>
  );
};
