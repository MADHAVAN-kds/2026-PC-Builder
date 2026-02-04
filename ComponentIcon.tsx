import React from 'react';
interface ComponentIconProps {
  componentId: string;
  size?: 'sm' | 'md' | 'lg';
}
const sizeMap = {
  sm: { width: 24, height: 24 },
  md: { width: 48, height: 48 },
  lg: { width: 80, height: 80 },
};
export const ComponentIcon: React.FC<ComponentIconProps> = ({ componentId, size = 'md' }) => {
  const { width, height } = sizeMap[size];
  const renderIcon = () => {
    switch (componentId) {
      case 'cpu':
        return (
          <svg viewBox="0 0 80 80" width={width} height={height}>
            <rect x="10" y="10" width="60" height="60" rx="4" fill="#1a1a2f" stroke="#8b5cf6" strokeWidth="2" />
            <rect x="18" y="18" width="44" height="44" rx="2" fill="#2a2a4f" />
            {/* Pin Grid */}
            {Array.from({ length: 6 }).map((_, row) =>
              Array.from({ length: 6 }).map((_, col) => (
                <rect key={`pin-${row}-${col}`} x={22 + col * 7} y={22 + row * 7} width="3" height="3" fill="#fbbf24" rx="0.5" />
              ))
            )}
            {/* Center Die */}
            <rect x="30" y="30" width="20" height="20" rx="1" fill="#3b3b6f" />
            <text x="40" y="43" textAnchor="middle" fontSize="6" fill="#8b5cf6" fontFamily="monospace">AM5</text>
            {/* Corner Triangle */}
            <polygon points="12,12 20,12 12,20" fill="#fbbf24" />
            {/* Glow Animation */}
            <rect x="30" y="30" width="20" height="20" rx="1" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.5">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
            </rect>
          </svg>
        );
      case 'thermal-paste':
        return (
          <svg viewBox="0 0 60 100" width={width} height={height}>
            <rect x="15" y="5" width="30" height="70" rx="4" fill="linear-gradient(#4a4a7f, #2a2a4f)" />
            <rect x="15" y="5" width="30" height="70" rx="4" fill="#3a3a6f" stroke="#06b6d4" strokeWidth="1.5" />
            <rect x="22" y="75" width="16" height="10" rx="2" fill="#2a2a4f" />
            <rect x="24" y="85" width="12" height="8" rx="1" fill="#8a8a9f" />
            {/* Paste Drop */}
            <ellipse cx="30" cy="95" rx="4" ry="2" fill="#9ca3af">
              <animate attributeName="ry" values="2;3;2" dur="1s" repeatCount="indefinite" />
            </ellipse>
            <text x="30" y="40" textAnchor="middle" fontSize="5" fill="#fff" fontFamily="sans-serif">THERMAL</text>
            <text x="30" y="48" textAnchor="middle" fontSize="5" fill="#fff" fontFamily="sans-serif">PASTE</text>
          </svg>
        );
      case 'cpu-cooler':
        return (
          <svg viewBox="0 0 120 120" width={width} height={height}>
            {/* Heatsink Fins */}
            {Array.from({ length: 12 }).map((_, i) => (
              <rect key={`fin-${i}`} x="20" y={15 + i * 7} width="80" height="5" rx="1" fill="#5a5a7f" stroke="#6a6a9f" strokeWidth="0.5" />
            ))}
            {/* Central Fan */}
            <circle cx="60" cy="60" r="25" fill="#1a1a2f" stroke="#06b6d4" strokeWidth="2" />
            <circle cx="60" cy="60" r="20" fill="#2a2a4f" />
            {/* Fan Blades */}
            <g transform="translate(60, 60)">
              {Array.from({ length: 7 }).map((_, i) => (
                <path
                  key={`blade-${i}`}
                  d="M0,-18 Q5,-10 0,-2 Q-5,-10 0,-18"
                  fill="#4a4a7f"
                  transform={`rotate(${i * 51.4})`}
                >
                  <animateTransform attributeName="transform" type="rotate" from={`${i * 51.4}`} to={`${i * 51.4 + 360}`} dur="2s" repeatCount="indefinite" />
                </path>
              ))}
            </g>
            <circle cx="60" cy="60" r="5" fill="#06b6d4">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="1s" repeatCount="indefinite" />
            </circle>
          </svg>
        );
      case 'ram-1':
      case 'ram-2':
      case 'ram-3':
      case 'ram-4':
        const ramColors = { 'ram-1': '#8b5cf6', 'ram-2': '#06b6d4', 'ram-3': '#10b981', 'ram-4': '#ec4899' };
        const ramColor = ramColors[componentId as keyof typeof ramColors] || '#8b5cf6';
        return (
          <svg viewBox="0 0 30 100" width={width} height={height}>
            <rect x="2" y="5" width="26" height="90" rx="2" fill="#1a1a2f" stroke="#4a4a7f" strokeWidth="1" />
            {/* Heat Spreader Design */}
            <path d="M4,8 L26,8 L26,70 L15,80 L4,70 Z" fill="#2a2a4f" stroke="#5a5a7f" strokeWidth="0.5" />
            {/* RGB Strip */}
            <rect x="4" y="8" width="22" height="4" rx="1" fill={ramColor}>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
            </rect>
            {/* Gold Contacts */}
            {Array.from({ length: 8 }).map((_, i) => (
              <rect key={`contact-${i}`} x={5 + i * 2.5} y="88" width="1.5" height="7" rx="0.25" fill="#fbbf24" />
            ))}
            {/* Notch */}
            <rect x="12" y="85" width="6" height="3" fill="#0a0a0f" />
          </svg>
        );
      case 'gpu':
        return (
          <svg viewBox="0 0 200 100" width={width} height={height}>
            {/* Backplate */}
            <rect x="5" y="5" width="190" height="90" rx="4" fill="#1a1a2f" stroke="#4a4a7f" strokeWidth="2" />
            {/* Main Body */}
            <rect x="10" y="10" width="180" height="80" rx="3" fill="#2a2a4f" />
            {/* Triple Fans */}
            {[35, 100, 165].map((cx, i) => (
              <g key={`fan-${i}`}>
                <circle cx={cx} cy="50" r="28" fill="#1a1a2f" stroke="#3a3a5f" strokeWidth="1" />
                <circle cx={cx} cy="50" r="22" fill="#2a2a4f" />
                {Array.from({ length: 9 }).map((_, j) => (
                  <path
                    key={`blade-${i}-${j}`}
                    d={`M${cx},${50 - 18} Q${cx + 4},${50 - 10} ${cx},${50 - 2} Q${cx - 4},${50 - 10} ${cx},${50 - 18}`}
                    fill="#4a4a7f"
                    transform={`rotate(${j * 40}, ${cx}, 50)`}
                  >
                    <animateTransform attributeName="transform" type="rotate" from={`${j * 40} ${cx} 50`} to={`${j * 40 + 360} ${cx} 50`} dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
                  </path>
                ))}
                <circle cx={cx} cy="50" r="4" fill="#8b5cf6">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
                </circle>
              </g>
            ))}
            {/* RGB Strip */}
            <rect x="15" y="85" width="170" height="3" rx="1" fill="#8b5cf6">
              <animate attributeName="fill" values="#8b5cf6;#06b6d4;#10b981;#ec4899;#8b5cf6" dur="4s" repeatCount="indefinite" />
            </rect>
            {/* RTX Label */}
            <text x="100" y="98" textAnchor="middle" fontSize="8" fill="#fff" fontFamily="sans-serif" fontWeight="bold">RTX 4090</text>
            {/* PCIe Connector */}
            <rect x="150" y="92" width="40" height="6" rx="1" fill="#fbbf24" />
          </svg>
        );
      case 'psu':
        return (
          <svg viewBox="0 0 120 100" width={width} height={height}>
            <rect x="5" y="5" width="110" height="90" rx="4" fill="#1a1a2f" stroke="#f59e0b" strokeWidth="2" />
            {/* Honeycomb Grille */}
            <rect x="10" y="10" width="70" height="70" rx="3" fill="#0a0a0f" />
            {Array.from({ length: 5 }).map((_, row) =>
              Array.from({ length: 5 }).map((_, col) => (
                <circle key={`hex-${row}-${col}`} cx={20 + col * 13 + (row % 2) * 6} cy={20 + row * 13} r="5" fill="none" stroke="#3a3a5f" strokeWidth="1" />
              ))
            )}
            {/* Fan */}
            <circle cx="45" cy="45" r="25" fill="#2a2a4f" />
            {Array.from({ length: 7 }).map((_, i) => (
              <path
                key={`blade-${i}`}
                d="M45,25 Q50,35 45,42 Q40,35 45,25"
                fill="#4a4a7f"
                transform={`rotate(${i * 51.4}, 45, 45)`}
              >
                <animateTransform attributeName="transform" type="rotate" from={`${i * 51.4} 45 45`} to={`${i * 51.4 + 360} 45 45`} dur="3s" repeatCount="indefinite" />
              </path>
            ))}
            {/* Labels */}
            <text x="95" y="35" textAnchor="middle" fontSize="6" fill="#fff" fontFamily="sans-serif">850W</text>
            <text x="95" y="50" textAnchor="middle" fontSize="5" fill="#888" fontFamily="sans-serif">GOLD</text>
            {/* Power Switch */}
            <rect x="88" y="70" width="14" height="8" rx="2" fill="#2a2a4f" stroke="#4a4a7f" strokeWidth="1" />
            <circle cx="95" cy="74" r="2" fill="#10b981">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        );
      case 'nvme-ssd':
        return (
          <svg viewBox="0 0 80 25" width={width} height={height}>
            <rect x="2" y="2" width="76" height="21" rx="2" fill="#1a1a2f" stroke="#06b6d4" strokeWidth="1" />
            {/* Controller Chip */}
            <rect x="8" y="6" width="12" height="12" rx="1" fill="#2a2a4f" stroke="#4a4a7f" strokeWidth="0.5" />
            {/* NAND Chips */}
            {[25, 40, 55].map((x, i) => (
              <rect key={`nand-${i}`} x={x} y="6" width="10" height="12" rx="1" fill="#3a3a5f" stroke="#5a5a7f" strokeWidth="0.5" />
            ))}
            {/* Activity LED */}
            <circle cx="72" cy="12" r="2" fill="#06b6d4">
              <animate attributeName="opacity" values="0;1;0" dur="0.5s" repeatCount="indefinite" />
            </circle>
            {/* M.2 Notch */}
            <rect x="2" y="10" width="3" height="5" fill="#0a0a0f" />
          </svg>
        );
      case 'sata-ssd':
        return (
          <svg viewBox="0 0 80 50" width={width} height={height}>
            <rect x="2" y="2" width="76" height="46" rx="3" fill="#1a1a2f" stroke="#06b6d4" strokeWidth="1.5" />
            {/* Label Area */}
            <rect x="8" y="8" width="64" height="28" rx="2" fill="#2a2a4f" />
            <text x="40" y="22" textAnchor="middle" fontSize="7" fill="#fff" fontFamily="sans-serif" fontWeight="bold">SSD</text>
            <text x="40" y="32" textAnchor="middle" fontSize="5" fill="#06b6d4" fontFamily="sans-serif">1TB</text>
            {/* SATA Connector */}
            <rect x="60" y="40" width="15" height="6" rx="1" fill="#fbbf24" />
            <rect x="45" y="40" width="10" height="6" rx="1" fill="#333" />
          </svg>
        );
      case 'hdd':
        return (
          <svg viewBox="0 0 100 70" width={width} height={height}>
            <rect x="2" y="2" width="96" height="66" rx="3" fill="#1a1a2f" stroke="#6b7280" strokeWidth="1.5" />
            {/* Platter */}
            <circle cx="40" cy="35" r="25" fill="#2a2a4f" stroke="#4a4a7f" strokeWidth="1" />
            <circle cx="40" cy="35" r="18" fill="none" stroke="#5a5a7f" strokeWidth="0.5" />
            <circle cx="40" cy="35" r="10" fill="none" stroke="#5a5a7f" strokeWidth="0.5" />
            <circle cx="40" cy="35" r="4" fill="#3a3a5f" />
            {/* Actuator Arm */}
            <line x1="40" y1="35" x2="75" y2="20" stroke="#8a8a9f" strokeWidth="2" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" values="0 40 35;10 40 35;0 40 35;-10 40 35;0 40 35" dur="2s" repeatCount="indefinite" />
            </line>
            <circle cx="75" cy="20" r="3" fill="#6a6a8f" />
            {/* Connectors */}
            <rect x="80" y="55" width="15" height="8" rx="1" fill="#fbbf24" />
            <rect x="60" y="55" width="15" height="8" rx="1" fill="#333" />
            <text x="85" y="45" fontSize="5" fill="#888">4TB</text>
          </svg>
        );
      case 'atx-24pin':
        return (
          <svg viewBox="0 0 80 120" width={width} height={height}>
            {/* Cable Bundle */}
            <path d="M30,10 Q20,60 30,110" stroke="#fbbf24" strokeWidth="3" fill="none" />
            <path d="M35,10 Q25,60 35,110" stroke="#1a1a2f" strokeWidth="3" fill="none" />
            <path d="M40,10 Q30,60 40,110" stroke="#f97316" strokeWidth="3" fill="none" />
            <path d="M45,10 Q35,60 45,110" stroke="#ef4444" strokeWidth="3" fill="none" />
            <path d="M50,10 Q40,60 50,110" stroke="#1a1a2f" strokeWidth="3" fill="none" />
            {/* Connector */}
            <rect x="20" y="2" width="40" height="16" rx="2" fill="#2a2a4f" stroke="#4a4a7f" strokeWidth="1" />
            {Array.from({ length: 12 }).map((_, i) => (
              <rect key={`pin-${i}`} x={23 + (i % 12) * 3} y={5 + Math.floor(i / 12) * 5} width="2" height="4" rx="0.5" fill="#fbbf24" />
            ))}
            <text x="40" y="25" textAnchor="middle" fontSize="5" fill="#888">24-PIN</text>
          </svg>
        );
      case 'eps-8pin':
        return (
          <svg viewBox="0 0 60 100" width={width} height={height}>
            {/* Cables */}
            <path d="M20,10 Q15,50 20,90" stroke="#fbbf24" strokeWidth="2" fill="none" />
            <path d="M25,10 Q20,50 25,90" stroke="#1a1a2f" strokeWidth="2" fill="none" />
            <path d="M30,10 Q25,50 30,90" stroke="#fbbf24" strokeWidth="2" fill="none" />
            <path d="M35,10 Q30,50 35,90" stroke="#1a1a2f" strokeWidth="2" fill="none" />
            {/* Connector */}
            <rect x="15" y="2" width="25" height="12" rx="2" fill="#2a2a4f" stroke="#4a4a7f" strokeWidth="1" />
            {Array.from({ length: 8 }).map((_, i) => (
              <rect key={`pin-${i}`} x={18 + (i % 4) * 5} y={4 + Math.floor(i / 4) * 4} width="3" height="3" rx="0.5" fill="#fbbf24" />
            ))}
            <text x="27" y="22" textAnchor="middle" fontSize="5" fill="#888">8-PIN EPS</text>
          </svg>
        );
      case '12vhpwr':
        return (
          <svg viewBox="0 0 60 100" width={width} height={height}>
            {/* Cables */}
            {Array.from({ length: 6 }).map((_, i) => (
              <path key={`cable-${i}`} d={`M${18 + i * 5},10 Q${13 + i * 5},50 ${18 + i * 5},90`} stroke={i % 2 === 0 ? '#fbbf24' : '#1a1a2f'} strokeWidth="2" fill="none" />
            ))}
            {/* Connector */}
            <rect x="12" y="2" width="36" height="14" rx="2" fill="#1a1a2f" stroke="#8b5cf6" strokeWidth="1" />
            {Array.from({ length: 16 }).map((_, i) => (
              <rect key={`pin-${i}`} x={15 + (i % 8) * 4} y={4 + Math.floor(i / 8) * 5} width="2" height="3" rx="0.5" fill="#fbbf24" />
            ))}
            <text x="30" y="24" textAnchor="middle" fontSize="4" fill="#8b5cf6">12VHPWR</text>
          </svg>
        );
      case 'sata-cable-1':
      case 'sata-cable-2':
        const cableColor = componentId === 'sata-cable-1' ? '#ef4444' : '#1a1a2f';
        return (
          <svg viewBox="0 0 80 40" width={width} height={height}>
            {/* Flat Cable */}
            <path d="M10,20 Q40,15 70,20" stroke={cableColor} strokeWidth="8" fill="none" strokeLinecap="round" />
            {/* L-Connectors */}
            <rect x="2" y="12" width="12" height="16" rx="2" fill="#2a2a4f" stroke="#4a4a7f" strokeWidth="1" />
            <rect x="66" y="12" width="12" height="16" rx="2" fill="#2a2a4f" stroke="#4a4a7f" strokeWidth="1" />
            <text x="40" y="35" textAnchor="middle" fontSize="5" fill="#888">SATA</text>
          </svg>
        );
      case 'cmos-battery':
        return (
          <svg viewBox="0 0 40 40" width={width} height={height}>
            <circle cx="20" cy="20" r="17" fill="linear-gradient(145deg, #c0c0c0, #808080)" />
            <circle cx="20" cy="20" r="17" fill="#a0a0a0" stroke="#606060" strokeWidth="1" />
            <circle cx="20" cy="20" r="14" fill="#b0b0b0" />
            <text x="20" y="18" textAnchor="middle" fontSize="5" fill="#333" fontWeight="bold">CR2032</text>
            <text x="20" y="25" textAnchor="middle" fontSize="4" fill="#555">3V</text>
            {/* Shine Effect */}
            <ellipse cx="14" cy="14" rx="4" ry="2" fill="rgba(255,255,255,0.4)" transform="rotate(-45, 14, 14)" />
          </svg>
        );
      case 'io-shield':
        return (
          <svg viewBox="0 0 140 40" width={width} height={height}>
            <rect x="2" y="2" width="136" height="36" rx="2" fill="#808080" stroke="#606060" strokeWidth="1" />
            {/* Brushed Metal Effect */}
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`brush-${i}`} x1="5" y1={4 + i * 1.8} x2="135" y2={4 + i * 1.8} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            ))}
            {/* Port Cutouts */}
            <rect x="10" y="10" width="20" height="10" rx="1" fill="#1a1a2f" />
            <rect x="10" y="22" width="20" height="10" rx="1" fill="#1a1a2f" />
            <rect x="35" y="8" width="15" height="24" rx="1" fill="#fbbf24" />
            <circle cx="60" cy="20" r="6" fill="#10b981" />
            <circle cx="75" cy="20" r="6" fill="#06b6d4" />
            {Array.from({ length: 5 }).map((_, i) => (
              <circle key={`audio-${i}`} cx={95 + i * 8} cy="20" r="4" fill={['#10b981', '#06b6d4', '#ec4899', '#f59e0b', '#1a1a2f'][i]} />
            ))}
          </svg>
        );
      case 'front-panel':
        return (
          <svg viewBox="0 0 60 40" width={width} height={height}>
            {/* Pin Headers */}
            {Array.from({ length: 9 }).map((_, i) => (
              <rect key={`pin-${i}`} x={8 + (i % 5) * 10} y={8 + Math.floor(i / 5) * 12} width="6" height="8" rx="1" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />
            ))}
            {/* Wires */}
            <path d="M11,30 Q5,50 15,55" stroke="#ef4444" strokeWidth="1.5" fill="none" />
            <path d="M21,30 Q15,50 25,55" stroke="#10b981" strokeWidth="1.5" fill="none" />
            <path d="M31,30 Q25,50 35,55" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
            <path d="M41,30 Q35,50 45,55" stroke="#fff" strokeWidth="1.5" fill="none" />
            {/* Labels */}
            <text x="10" y="6" fontSize="3" fill="#888">PWR</text>
            <text x="30" y="6" fontSize="3" fill="#888">RST</text>
            <text x="8" y="35" fontSize="3" fill="#888">LED</text>
          </svg>
        );
      case 'usb-header':
        return (
          <svg viewBox="0 0 50 60" width={width} height={height}>
            {/* Connector Housing */}
            <rect x="5" y="5" width="40" height="25" rx="2" fill="#1e40af" stroke="#3b82f6" strokeWidth="1.5" />
            {/* Pin Grid */}
            {Array.from({ length: 19 }).map((_, i) => (
              <rect key={`pin-${i}`} x={9 + (i % 10) * 3.5} y={10 + Math.floor(i / 10) * 8} width="2" height="5" rx="0.5" fill="#fbbf24" />
            ))}
            {/* Cable */}
            <path d="M25,30 Q25,45 20,55" stroke="#1e40af" strokeWidth="6" fill="none" />
            <path d="M25,30 Q25,45 30,55" stroke="#1e40af" strokeWidth="6" fill="none" />
            <text x="25" y="40" textAnchor="middle" fontSize="4" fill="#3b82f6">USB 3.2</text>
          </svg>
        );
      case 'fan-front-1':
      case 'fan-front-2':
      case 'fan-rear':
      case 'fan-top':
        const fanColors = { 
          'fan-front-1': '#8b5cf6', 
          'fan-front-2': '#06b6d4', 
          'fan-rear': '#ef4444', 
          'fan-top': '#10b981' 
        };
        const fanColor = fanColors[componentId as keyof typeof fanColors] || '#8b5cf6';
        return (
          <svg viewBox="0 0 80 80" width={width} height={height}>
            {/* Frame */}
            <rect x="5" y="5" width="70" height="70" rx="4" fill="#1a1a2f" stroke="#4a4a7f" strokeWidth="1.5" />
            {/* RGB Ring */}
            <circle cx="40" cy="40" r="32" fill="none" stroke={fanColor} strokeWidth="3">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Fan Hub */}
            <circle cx="40" cy="40" r="28" fill="#2a2a4f" />
            {/* Blades */}
            <g>
              {Array.from({ length: 7 }).map((_, i) => (
                <path
                  key={`blade-${i}`}
                  d="M40,15 Q48,28 40,38 Q32,28 40,15"
                  fill="#4a4a7f"
                  transform={`rotate(${i * 51.4}, 40, 40)`}
                >
                  <animateTransform attributeName="transform" type="rotate" from={`${i * 51.4} 40 40`} to={`${i * 51.4 + 360} 40 40`} dur="1.5s" repeatCount="indefinite" />
                </path>
              ))}
            </g>
            <circle cx="40" cy="40" r="6" fill={fanColor}>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="1s" repeatCount="indefinite" />
            </circle>
            {/* Mounting Holes */}
            <circle cx="12" cy="12" r="2" fill="#0a0a0f" />
            <circle cx="68" cy="12" r="2" fill="#0a0a0f" />
            <circle cx="12" cy="68" r="2" fill="#0a0a0f" />
            <circle cx="68" cy="68" r="2" fill="#0a0a0f" />
          </svg>
        );
      case 'wifi-card':
        return (
          <svg viewBox="0 0 80 50" width={width} height={height}>
            {/* PCIe Card */}
            <rect x="5" y="15" width="70" height="30" rx="2" fill="#1a1a2f" stroke="#10b981" strokeWidth="1" />
            {/* Components */}
            <rect x="10" y="20" width="12" height="8" rx="1" fill="#2a2a4f" />
            <rect x="25" y="20" width="8" height="8" rx="1" fill="#3a3a5f" />
            {/* Antenna Connectors */}
            <circle cx="55" cy="25" r="4" fill="#fbbf24" />
            <circle cx="68" cy="25" r="4" fill="#fbbf24" />
            {/* WiFi Signal Animation */}
            <path d="M40,8 Q40,2 46,2" stroke="#10b981" strokeWidth="1.5" fill="none" opacity="0.6">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
            </path>
            <path d="M40,8 Q40,-2 50,-2" stroke="#10b981" strokeWidth="1.5" fill="none" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1s" repeatCount="indefinite" begin="0.3s" />
            </path>
            <path d="M40,8 Q40,-6 54,-6" stroke="#10b981" strokeWidth="1.5" fill="none" opacity="0.2">
              <animate attributeName="opacity" values="0.1;0.6;0.1" dur="1s" repeatCount="indefinite" begin="0.6s" />
            </path>
            {/* PCIe Connector */}
            <rect x="15" y="45" width="25" height="4" rx="1" fill="#fbbf24" />
          </svg>
        );
      case 'sound-card':
        return (
          <svg viewBox="0 0 120 60" width={width} height={height}>
            <rect x="5" y="10" width="110" height="45" rx="2" fill="#1a1a2f" stroke="#ec4899" strokeWidth="1" />
            {/* Capacitors */}
            {[20, 35, 50].map((x, i) => (
              <g key={`cap-${i}`}>
                <rect x={x} y="18" width="8" height="15" rx="2" fill="#2a2a4f" stroke="#4a4a7f" strokeWidth="0.5" />
                <rect x={x + 1} y="20" width="6" height="2" fill="#ec4899">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur={`${1 + i * 0.3}s`} repeatCount="indefinite" />
                </rect>
              </g>
            ))}
            {/* DAC Chip */}
            <rect x="65" y="18" width="20" height="20" rx="1" fill="#2a2a4f" stroke="#5a5a7f" strokeWidth="0.5" />
            <text x="75" y="30" textAnchor="middle" fontSize="4" fill="#888">DAC</text>
            {/* Audio Jacks */}
            {['#10b981', '#06b6d4', '#ec4899', '#f59e0b', '#3b82f6'].map((color, i) => (
              <circle key={`jack-${i}`} cx={95 + i * 0} cy={42 - i * 5} r="3" fill={color} />
            ))}
            {/* PCIe */}
            <rect x="20" y="55" width="40" height="4" rx="1" fill="#fbbf24" />
          </svg>
        );
      case 'rgb-hub':
        return (
          <svg viewBox="0 0 80 50" width={width} height={height}>
            <rect x="5" y="5" width="70" height="40" rx="3" fill="#1a1a2f" stroke="#8b5cf6" strokeWidth="1" />
            {/* Ports */}
            {Array.from({ length: 6 }).map((_, i) => (
              <rect key={`port-${i}`} x={10 + i * 10} y="12" width="7" height="10" rx="1" fill="#2a2a4f" stroke="#4a4a7f" strokeWidth="0.5" />
            ))}
            {/* LED Indicators */}
            {Array.from({ length: 6 }).map((_, i) => (
              <circle key={`led-${i}`} cx={13.5 + i * 10} cy="32" r="2" fill={['#8b5cf6', '#06b6d4', '#10b981', '#ec4899', '#f59e0b', '#3b82f6'][i]}>
                <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
              </circle>
            ))}
            <text x="40" y="44" textAnchor="middle" fontSize="4" fill="#888">RGB HUB</text>
          </svg>
        );
      case 'vrm-heatsink':
        return (
          <svg viewBox="0 0 60 30" width={width} height={height}>
            {/* Fins */}
            {Array.from({ length: 10 }).map((_, i) => (
              <rect key={`fin-${i}`} x={5 + i * 5} y="5" width="3" height="20" rx="0.5" fill="#6b7280" stroke="#9ca3af" strokeWidth="0.3" />
            ))}
            {/* Thermal Pad */}
            <rect x="5" y="22" width="50" height="5" rx="1" fill="#4b5563" />
            <text x="30" y="18" textAnchor="middle" fontSize="4" fill="#d1d5db">VRM</text>
          </svg>
        );
      case 'bios-chip':
        return (
          <svg viewBox="0 0 30 20" width={width} height={height}>
            <rect x="5" y="3" width="20" height="14" rx="1" fill="#1a1a2f" stroke="#4a4a7f" strokeWidth="0.5" />
            {/* Pins */}
            {Array.from({ length: 4 }).map((_, i) => (
              <rect key={`pin-l-${i}`} x="2" y={5 + i * 3} width="3" height="1.5" rx="0.25" fill="#c0c0c0" />
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
              <rect key={`pin-r-${i}`} x="25" y={5 + i * 3} width="3" height="1.5" rx="0.25" fill="#c0c0c0" />
            ))}
            {/* Dot Marker */}
            <circle cx="8" cy="6" r="1" fill="#fff" />
            {/* Activity LED */}
            <circle cx="22" cy="14" r="1.5" fill="#10b981">
              <animate attributeName="opacity" values="0;1;0" dur="0.3s" repeatCount="indefinite" />
            </circle>
            <text x="15" y="11" textAnchor="middle" fontSize="3" fill="#888">BIOS</text>
          </svg>
        );
      case 'aio-pump':
        return (
          <svg viewBox="0 0 80 80" width={width} height={height}>
            {/* Pump Body */}
            <circle cx="40" cy="40" r="35" fill="#1a1a2f" stroke="#8b5cf6" strokeWidth="2" />
            <circle cx="40" cy="40" r="30" fill="#0a0a0f" />
            {/* LCD Display */}
            <circle cx="40" cy="40" r="22" fill="#1e1e3f">
              <animate attributeName="fill" values="#1e1e3f;#2e2e5f;#1e1e3f" dur="3s" repeatCount="indefinite" />
            </circle>
            {/* Infinity Mirror Effect */}
            {[18, 14, 10, 6].map((r, i) => (
              <circle key={`ring-${i}`} cx="40" cy="40" r={r} fill="none" stroke="#8b5cf6" strokeWidth="1" opacity={0.8 - i * 0.15}>
                <animate attributeName="r" values={`${r};${r + 2};${r}`} dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
              </circle>
            ))}
            {/* Display Content */}
            <text x="40" y="38" textAnchor="middle" fontSize="8" fill="#06b6d4" fontFamily="monospace">42°C</text>
            <text x="40" y="48" textAnchor="middle" fontSize="5" fill="#8b5cf6">2100 RPM</text>
            {/* Tube Connectors */}
            <rect x="5" y="35" width="8" height="10" rx="2" fill="#2a2a4f" stroke="#4a4a7f" strokeWidth="0.5" />
            <rect x="67" y="35" width="8" height="10" rx="2" fill="#2a2a4f" stroke="#4a4a7f" strokeWidth="0.5" />
          </svg>
        );
      case 'radiator-360':
        return (
          <svg viewBox="0 0 160 60" width={width} height={height}>
            {/* Main Body */}
            <rect x="5" y="15" width="150" height="35" rx="2" fill="#1a1a2f" stroke="#4a4a7f" strokeWidth="1" />
            {/* Fin Array */}
            {Array.from({ length: 50 }).map((_, i) => (
              <line key={`fin-${i}`} x1={10 + i * 3} y1="18" x2={10 + i * 3} y2="47" stroke="#3a3a5f" strokeWidth="1" />
            ))}
            {/* Fan Mount Areas */}
            {[30, 80, 130].map((cx, i) => (
              <g key={`mount-${i}`}>
                <circle cx={cx} cy="32" r="18" fill="none" stroke="#5a5a7f" strokeWidth="1" strokeDasharray="3 2" />
                <circle cx={cx - 15} cy={32 - 15} r="2" fill="#0a0a0f" />
                <circle cx={cx + 15} cy={32 - 15} r="2" fill="#0a0a0f" />
                <circle cx={cx - 15} cy={32 + 15} r="2" fill="#0a0a0f" />
                <circle cx={cx + 15} cy={32 + 15} r="2" fill="#0a0a0f" />
              </g>
            ))}
            {/* Tube Inlets */}
            <rect x="5" y="25" width="8" height="15" rx="2" fill="#2a2a4f" stroke="#4a4a7f" strokeWidth="0.5" />
            <text x="80" y="10" textAnchor="middle" fontSize="5" fill="#888">360mm RADIATOR</text>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 40 40" width={width} height={height}>
            <rect x="5" y="5" width="30" height="30" rx="4" fill="#2a2a4f" stroke="#4a4a7f" strokeWidth="1" />
            <text x="20" y="24" textAnchor="middle" fontSize="6" fill="#888">?</text>
          </svg>
        );
    }
  };
  return <div className="flex items-center justify-center">{renderIcon()}</div>;
};
