import { useState } from 'react';
import type { GeometryType, ParametricSettings } from './types/maker';
import { Navbar } from './components/Navbar';
import { Viewport3D } from './components/Viewport3D';
import { ControlPanel } from './components/ControlPanel';
import { exportGeometryToOBJ } from './services/objExporter';
import type * as THREE from 'three';
import { Sparkles, Box } from 'lucide-react';

export function App() {
  const [settings, setSettings] = useState<ParametricSettings>({
    geometry: 'torus-knot',
    theme: 'cyberpunk',
    p: 3,
    q: 7,
    tubeRadius: 0.65,
    scale: 1.0,
    resolution: 96,
    wireframe: false,
    autoRotate: true,
    rotationSpeed: 1.0
  });

  const [currentGeometryMesh, setCurrentGeometryMesh] = useState<THREE.BufferGeometry | null>(null);
  const [vertexCount, setVertexCount] = useState(0);
  const [faceCount, setFaceCount] = useState(0);

  const handleExportOBJ = () => {
    if (currentGeometryMesh) {
      exportGeometryToOBJ(currentGeometryMesh, `makercraft_${settings.geometry}_p${settings.p}_q${settings.q}.obj`);
    }
  };

  const handleSelectGeometry = (geom: GeometryType) => {
    setSettings((prev) => ({
      ...prev,
      geometry: geom,
      p: geom === 'torus-knot' ? 3 : geom === 'spherical-harmonic' ? 4 : 2,
      q: geom === 'torus-knot' ? 7 : geom === 'spherical-harmonic' ? 6 : 3
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f6fb] text-[#111d2d] selection:bg-purple-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentGeometry={settings.geometry}
        onSelectGeometry={handleSelectGeometry}
        onExportOBJ={handleExportOBJ}
      />

      {/* Subheader Status */}
      <div className="border-b border-slate-200/80 bg-white/70 backdrop-blur py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-slate-700">
              Bagian dari <strong>SteamCraft Ecosystem</strong> (<a href="https://steamcraft.online" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">steamcraft.online</a>)
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-slate-300">Target Subdomain: <code className="text-purple-700 font-mono bg-purple-50 px-2 py-0.5 rounded border border-purple-200">maker.steamcraft.online</code></span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <Box className="w-3.5 h-3.5 text-purple-400" />
            <span>Lead Developer: <strong className="text-slate-900 font-semibold">Muhammad Naza Firmansyah</strong></span>
          </div>
        </div>
      </div>

      {/* Main 3D Studio Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-185px)] min-h-[640px]">
          
          {/* 3D Viewport (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 relative overflow-hidden shadow-sm flex flex-col">
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono text-purple-900 font-semibold shadow-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Interactive 3D Viewport (Klik &amp; Drag untuk Rotasi, Scroll untuk Zoom)</span>
            </div>

            <div className="flex-1 w-full h-full">
              <Viewport3D
                settings={settings}
                onMeshUpdated={(geom, vCount, fCount) => {
                  setCurrentGeometryMesh(geom);
                  setVertexCount(vCount);
                  setFaceCount(fCount);
                }}
              />
            </div>
          </div>

          {/* Control Panel (4 Cols) */}
          <div className="lg:col-span-4 h-full">
            <ControlPanel
              settings={settings}
              onChange={setSettings}
              vertexCount={vertexCount}
              faceCount={faceCount}
            />
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-5 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>MakerCraft 3D &bull; Created &amp; Developed by <strong>Muhammad Naza Firmansyah</strong> &bull; &copy; 2026</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a href="https://steamcraft.online" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">SteamCraft</a>
            <a href="https://sim.steamcraft.online" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">SteamSim Lab</a>
            <a href="https://scholar.steamcraft.online" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">PaperCraft AI</a>
            <a href="https://portofolionaza.steamcraft.online" target="_blank" rel="noreferrer" className="hover:text-purple-600 transition-colors">Portofolio Naza</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
