import React from 'react';
import { DropSlot } from './DropSlot';
interface PCCaseProps {
  placedComponents: Record<string, string>;
  onDrop: (slotId: string, componentId: string) => void;
  currentDragging: string | null;
  hoveredSlot: string | null;
  onSlotHover: (slotId: string | null) => void;
}
// Define all 32 slots with their positions in the case
const SLOT_DEFINITIONS = [
  // Core Components
  { id: 'cpu-socket', label: 'CPU Socket', x: 45, y: 25, width: 12, height: 12, category: 'core' },
  { id: 'thermal-paste', label: 'Thermal Paste', x: 45, y: 25, width: 8, height: 8, category: 'core' },
  { id: 'cpu-cooler', label: 'CPU Cooler', x: 42, y: 18, width: 18, height: 20, category: 'cooling' },
  
  // RAM Slots
  { id: 'ram-slot-1', label: 'RAM 1', x: 62, y: 18, width: 4, height: 16, category: 'core' },
  { id: 'ram-slot-2', label: 'RAM 2', x: 67, y: 18, width: 4, height: 16, category: 'core' },
  { id: 'ram-slot-3', label: 'RAM 3', x: 72, y: 18, width: 4, height: 16, category: 'core' },
  { id: 'ram-slot-4', label: 'RAM 4', x: 77, y: 18, width: 4, height: 16, category: 'core' },
  
  // GPU
  { id: 'pcie-x16', label: 'PCIe x16 (GPU)', x: 30, y: 50, width: 35, height: 14, category: 'core' },
  
  // Storage
  { id: 'nvme-slot', label: 'NVMe SSD', x: 30, y: 40, width: 14, height: 4, category: 'storage' },
  { id: 'sata-ssd', label: 'SATA SSD', x: 8, y: 70, width: 12, height: 8, category: 'storage' },
  { id: 'hdd-bay', label: 'HDD Bay', x: 8, y: 80, width: 14, height: 10, category: 'storage' },
  
  // Power
  { id: 'psu-bay', label: 'PSU Bay', x: 5, y: 85, width: 20, height: 12, category: 'power' },
  { id: 'atx-24pin', label: '24-Pin ATX', x: 82, y: 35, width: 6, height: 16, category: 'power' },
  { id: 'eps-8pin', label: '8-Pin EPS', x: 25, y: 10, width: 8, height: 6, category: 'power' },
  { id: '12vhpwr', label: '12VHPWR GPU', x: 65, y: 55, width: 8, height: 6, category: 'power' },
  
  // Cables
  { id: 'sata-cable-1', label: 'SATA Cable 1', x: 22, y: 72, width: 10, height: 5, category: 'power' },
  { id: 'sata-cable-2', label: 'SATA Cable 2', x: 22, y: 82, width: 10, height: 5, category: 'power' },
  
  // Cooling
  { id: 'fan-front-1', label: 'Front Fan 1', x: 2, y: 15, width: 10, height: 10, category: 'cooling' },
  { id: 'fan-front-2', label: 'Front Fan 2', x: 2, y: 30, width: 10, height: 10, category: 'cooling' },
  { id: 'fan-rear', label: 'Rear Fan', x: 88, y: 15, width: 10, height: 10, category: 'cooling' },
  { id: 'fan-top', label: 'Top Fan', x: 45, y: 2, width: 10, height: 10, category: 'cooling' },
  { id: 'aio-pump', label: 'AIO Pump', x: 42, y: 18, width: 12, height: 12, category: 'cooling' },
  { id: 'radiator-360', label: '360mm Radiator', x: 30, y: 2, width: 25, height: 8, category: 'cooling' },
  
  // Extras
  { id: 'cmos-battery', label: 'CMOS Battery', x: 75, y: 65, width: 6, height: 6, category: 'extras' },
  { id: 'io-shield', label: 'I/O Shield', x: 88, y: 30, width: 10, height: 20, category: 'extras' },
  { id: 'front-panel', label: 'Front Panel', x: 85, y: 75, width: 10, height: 8, category: 'extras' },
  { id: 'usb-header', label: 'USB 3.2 Header', x: 75, y: 75, width: 8, height: 8, category: 'extras' },
  { id: 'wifi-slot', label: 'WiFi Card', x: 30, y: 68, width: 12, height: 6, category: 'extras' },
  { id: 'sound-card', label: 'Sound Card', x: 30, y: 76, width: 18, height: 6, category: 'extras' },
  { id: 'rgb-hub', label: 'RGB Hub', x: 8, y: 55, width: 12, height: 8, category: 'extras' },
  { id: 'vrm-heatsink', label: 'VRM Heatsink', x: 30, y: 15, width: 10, height: 5, category: 'extras' },
  { id: 'bios-chip', label: 'BIOS Chip', x: 70, y: 70, width: 4, height: 3, category: 'extras' },
];
export const PCCase: React.FC<PCCaseProps> = ({
  placedComponents,
  onDrop,
  currentDragging,
  hoveredSlot,
  onSlotHover,
}) => {
  return (
    <div className="relative w-full h-full glass-panel p-6">
      {/* Case Title */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <h2 className="font-orbitron text-lg font-bold gradient-text">PC CASE - DROP ZONE</h2>
      </div>
      
      {/* PC Case SVG Container */}
      <div className="relative w-full h-full mt-8">
        {/* Case Outline */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))' }}
        >
          {/* Case Frame */}
          <defs>
            <linearGradient id="caseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
              <stop offset="50%" stopColor="rgba(6, 182, 212, 0.2)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.3)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Main Case Body */}
          <rect
            x="1"
            y="1"
            width="98"
            height="98"
            rx="3"
            fill="rgba(10, 10, 15, 0.8)"
            stroke="url(#caseGradient)"
            strokeWidth="0.5"
            filter="url(#glow)"
          />
          
          {/* Inner Frame */}
          <rect
            x="3"
            y="3"
            width="94"
            height="94"
            rx="2"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="0.3"
            strokeDasharray="2 1"
          />
          
          {/* Motherboard Area */}
          <rect
            x="25"
            y="10"
            width="65"
            height="75"
            rx="1"
            fill="rgba(30, 30, 50, 0.5)"
            stroke="rgba(139, 92, 246, 0.3)"
            strokeWidth="0.3"
          />
          
          {/* Drive Cages */}
          <rect
            x="5"
            y="65"
            width="18"
            height="30"
            rx="1"
            fill="rgba(20, 20, 35, 0.6)"
            stroke="rgba(6, 182, 212, 0.3)"
            strokeWidth="0.2"
          />
          
          {/* PSU Shroud */}
          <rect
            x="3"
            y="83"
            width="25"
            height="14"
            rx="1"
            fill="rgba(15, 15, 25, 0.7)"
            stroke="rgba(245, 158, 11, 0.3)"
            strokeWidth="0.2"
          />
          
          {/* Circuit Pattern on Motherboard */}
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="27"
              y1={12 + i * 3.5}
              x2="88"
              y2={12 + i * 3.5}
              stroke="rgba(139, 92, 246, 0.1)"
              strokeWidth="0.1"
            />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={27 + i * 4}
              y1="12"
              x2={27 + i * 4}
              y2="83"
              stroke="rgba(6, 182, 212, 0.1)"
              strokeWidth="0.1"
            />
          ))}
        </svg>
        
        {/* Drop Slots Overlay */}
        <div className="absolute inset-0 mt-8">
          {SLOT_DEFINITIONS.map((slot) => (
            <DropSlot
              key={slot.id}
              slotId={slot.id}
              label={slot.label}
              x={slot.x}
              y={slot.y}
              width={slot.width}
              height={slot.height}
              category={slot.category}
              isOccupied={!!placedComponents[slot.id]}
              placedComponentId={placedComponents[slot.id]}
              onDrop={onDrop}
              currentDragging={currentDragging}
              isHovered={hoveredSlot === slot.id}
              onHover={onSlotHover}
            />
          ))}
        </div>
      </div>
      
      {/* Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};
