export type GeometryType = 'torus-knot' | 'mobius' | 'superformula' | 'klein' | 'spherical-harmonic';

export type ColorTheme = 'cyberpunk' | 'emerald-matrix' | 'amber-gold' | 'hologram';

export interface ParametricSettings {
  geometry: GeometryType;
  theme: ColorTheme;
  p: number; // winding number 1
  q: number; // winding number 2
  tubeRadius: number;
  scale: number;
  resolution: number;
  wireframe: boolean;
  autoRotate: boolean;
  rotationSpeed: number;
}
