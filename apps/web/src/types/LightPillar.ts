export interface Bit {
  x: number;
  y: number;
  value: string;
  speed: number;
  opacity: number;
  size: number;
  trail: { x: number; y: number; opacity: number }[];
}

export interface LightPillarProps {
  topColor?: string;
  bottomColor?: string;
  intensity?: number;
  rotationSpeed?: number;
  interactive?: boolean;
  className?: string;
  glowAmount?: number;
  pillarWidth?: number;
  pillarHeight?: number;
  noiseIntensity?: number;
  mixBlendMode?: any;
  pillarRotation?: number;
  quality?: 'low' | 'medium' | 'high';
}
