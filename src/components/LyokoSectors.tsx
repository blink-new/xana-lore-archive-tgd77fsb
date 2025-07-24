import React, { useState, useEffect } from 'react';
import { Map, MapPin, Zap, Shield, Eye, Mountain, Trees, Sun, Snowflake, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface Tower {
  id: string;
  name: string;
  status: 'Active' | 'Deactivated' | 'Corrupted' | 'Destroyed';
  xanaControl: boolean;
  location: { x: number; y: number };
  purpose: string;
}

interface Sector {
  id: string;
  name: string;
  number: number;
  environment: string;
  description: string;
  terrain: string;
  climate: string;
  xanaPresence: 'None' | 'Light' | 'Moderate' | 'Heavy' | 'Complete';
  threatLevel: 'Safe' | 'Caution' | 'Dangerous' | 'Extreme' | 'Lethal';
  towers: Tower[];
  monsters: string[];
  strategicValue: string;
  accessPoints: string[];
  visualDescription: string;
  specialFeatures: string[];
  firstDiscovered: string;
  currentStatus: 'Stable' | 'Unstable' | 'Corrupted' | 'Destroyed' | 'Replika';
}

const sectors: Sector[] = [
  {
    id: 'sector-forest',
    name: 'Forest Sector',
    number: 1,
    environment: 'Digital Forest',
    description: 'A vast digital wilderness filled with towering trees and natural pathways. The Forest Sector serves as one of the primary battlegrounds between XANA and the Lyoko Warriors.',
    terrain: 'Varied elevation with tree platforms, bridges, and clearings',
    climate: 'Temperate with filtered digital sunlight',
    xanaPresence: 'Moderate',
    threatLevel: 'Dangerous',
    towers: [
      {
        id: 'forest-tower-1',
        name: 'Central Forest Tower',
        status: 'Active',
        xanaControl: false,
        location: { x: 50, y: 50 },
        purpose: 'Sector stability and materialization protocols'
      },
      {
        id: 'forest-tower-2',
        name: 'Northern Grove Tower',
        status: 'Deactivated',
        xanaControl: false,
        location: { x: 30, y: 20 },
        purpose: 'Environmental control and weather systems'
      },
      {
        id: 'forest-tower-3',
        name: 'Eastern Canopy Tower',
        status: 'Active',
        xanaControl: true,
        location: { x: 80, y: 60 },
        purpose: 'XANA attack coordination and monster deployment'
      }
    ],
    monsters: ['Kankrelats', 'Hornets', 'Blocks'],
    strategicValue: 'Primary access point to other sectors, multiple materialization zones',
    accessPoints: ['Scanner Room Teleporter', 'Inter-sector Bridges', 'Digital Sea Access'],
    visualDescription: 'Massive trees with glowing bark, floating platforms, bridges of light connecting different levels',
    specialFeatures: ['Tree Elevator Systems', 'Camouflaged Pathways', 'Natural Barriers', 'Hidden Alcoves'],
    firstDiscovered: 'Day 1 - First Lyoko Mission',
    currentStatus: 'Stable'
  },
  {
    id: 'sector-mountain',
    name: 'Mountain Sector',
    number: 2,
    environment: 'Rocky Peaks',
    description: 'A treacherous mountainous region with steep cliffs, narrow ledges, and deep chasms. The Mountain Sector tests the agility and courage of all who enter.',
    terrain: 'Steep rocky surfaces, narrow bridges, deep valleys',
    climate: 'Cold and windy with occasional digital storms',
    xanaPresence: 'Heavy',
    threatLevel: 'Extreme',
    towers: [
      {
        id: 'mountain-tower-1',
        name: 'Peak Summit Tower',
        status: 'Corrupted',
        xanaControl: true,
        location: { x: 45, y: 15 },
        purpose: 'High-altitude surveillance and long-range attacks'
      },
      {
        id: 'mountain-tower-2',
        name: 'Valley Floor Tower',
        status: 'Active',
        xanaControl: false,
        location: { x: 60, y: 85 },
        purpose: 'Sector defense and emergency protocols'
      }
    ],
    monsters: ['Megatanks', 'Blocks', 'Kankrelats', 'Hornets'],
    strategicValue: 'High ground advantage, natural fortress positions',
    accessPoints: ['Cliff Face Teleporter', 'Valley Entrance', 'Sky Bridge'],
    visualDescription: 'Towering peaks with crystalline formations, floating stone platforms, energy bridges spanning chasms',
    specialFeatures: ['Gravity Wells', 'Avalanche Zones', 'Crystal Formations', 'Wind Currents'],
    firstDiscovered: 'Day 15 - Mountain Exploration Mission',
    currentStatus: 'Unstable'
  },
  {
    id: 'sector-desert',
    name: 'Desert Sector',
    number: 3,
    environment: 'Digital Wasteland',
    description: 'An endless expanse of digital sand dunes and rocky outcroppings. The Desert Sector is known for its harsh conditions and hidden dangers beneath the surface.',
    terrain: 'Rolling sand dunes, rocky mesas, underground caverns',
    climate: 'Hot and dry with sandstorm phenomena',
    xanaPresence: 'Light',
    threatLevel: 'Caution',
    towers: [
      {
        id: 'desert-tower-1',
        name: 'Oasis Tower',
        status: 'Active',
        xanaControl: false,
        location: { x: 40, y: 40 },
        purpose: 'Water system management and life support'
      },
      {
        id: 'desert-tower-2',
        name: 'Dune Crest Tower',
        status: 'Deactivated',
        xanaControl: false,
        location: { x: 70, y: 25 },
        purpose: 'Weather control and sandstorm generation'
      },
      {
        id: 'desert-tower-3',
        name: 'Underground Tower',
        status: 'Active',
        xanaControl: true,
        location: { x: 25, y: 75 },
        purpose: 'Subterranean operations and stealth attacks'
      }
    ],
    monsters: ['Blocks', 'Kankrelats', 'Creepers'],
    strategicValue: 'Hidden underground networks, natural camouflage',
    accessPoints: ['Surface Teleporter', 'Underground Tunnels', 'Oasis Portal'],
    visualDescription: 'Golden sand dunes with geometric patterns, floating stone platforms, underground crystal caverns',
    specialFeatures: ['Quicksand Traps', 'Mirage Effects', 'Underground Rivers', 'Crystal Caves'],
    firstDiscovered: 'Day 23 - Desert Reconnaissance',
    currentStatus: 'Stable'
  },
  {
    id: 'sector-ice',
    name: 'Ice Sector',
    number: 4,
    environment: 'Frozen Tundra',
    description: 'A frigid landscape of ice and snow, where every step must be carefully calculated. The Ice Sector\'s slippery surfaces and freezing temperatures make it one of the most challenging environments.',
    terrain: 'Frozen lakes, ice cliffs, snow-covered plains',
    climate: 'Sub-zero temperatures with blizzard conditions',
    xanaPresence: 'Moderate',
    threatLevel: 'Dangerous',
    towers: [
      {
        id: 'ice-tower-1',
        name: 'Glacier Tower',
        status: 'Active',
        xanaControl: false,
        location: { x: 35, y: 30 },
        purpose: 'Temperature regulation and ice formation control'
      },
      {
        id: 'ice-tower-2',
        name: 'Frozen Lake Tower',
        status: 'Corrupted',
        xanaControl: true,
        location: { x: 65, y: 70 },
        purpose: 'Aquatic system control and underwater operations'
      }
    ],
    monsters: ['Megatanks', 'Blocks', 'Mantas'],
    strategicValue: 'Natural barriers, defensive positions, water access',
    accessPoints: ['Ice Cave Entrance', 'Frozen Bridge', 'Underwater Passage'],
    visualDescription: 'Crystalline ice formations, frozen waterfalls, aurora-like energy patterns in the sky',
    specialFeatures: ['Ice Slides', 'Frozen Waterfalls', 'Aurora Effects', 'Thermal Vents'],
    firstDiscovered: 'Day 31 - Ice Sector Expedition',
    currentStatus: 'Stable'
  },
  {
    id: 'sector-carthage',
    name: 'Carthage (Sector 5)',
    number: 5,
    environment: 'XANA\'s Core Domain',
    description: 'The mysterious fifth sector and XANA\'s primary stronghold. Carthage houses the Core of Lyoko and represents the heart of XANA\'s digital empire.',
    terrain: 'Geometric structures, energy conduits, digital architecture',
    climate: 'Artificial environment with intense energy fields',
    xanaPresence: 'Complete',
    threatLevel: 'Lethal',
    towers: [
      {
        id: 'carthage-core-tower',
        name: 'Core Interface Tower',
        status: 'Corrupted',
        xanaControl: true,
        location: { x: 50, y: 50 },
        purpose: 'XANA core system control and primary operations'
      },
      {
        id: 'carthage-defense-1',
        name: 'Northern Defense Tower',
        status: 'Corrupted',
        xanaControl: true,
        location: { x: 30, y: 20 },
        purpose: 'Perimeter defense and intruder elimination'
      },
      {
        id: 'carthage-defense-2',
        name: 'Southern Defense Tower',
        status: 'Corrupted',
        xanaControl: true,
        location: { x: 70, y: 80 },
        purpose: 'Secondary defense grid and backup systems'
      }
    ],
    monsters: ['Creepers', 'Mantas', 'Scyphozoa', 'Kolossus'],
    strategicValue: 'XANA\'s primary base, Core of Lyoko access, ultimate objective',
    accessPoints: ['Celestial Dome', 'Core Chamber', 'Defense Grid Passages'],
    visualDescription: 'Massive geometric structures, pulsing energy cores, floating platforms with XANA symbols',
    specialFeatures: ['Core of Lyoko', 'Energy Barriers', 'Teleportation Networks', 'XANA\'s Throne Room'],
    firstDiscovered: 'Day 127 - Sector 5 Discovery',
    currentStatus: 'Corrupted'
  }
];

const presenceColors = {
  None: 'bg-green-500/20 text-green-400 border-green-500/30',
  Light: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Moderate: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Heavy: 'bg-red-500/20 text-red-400 border-red-500/30',
  Complete: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
};

const threatColors = {
  Safe: 'bg-green-500/20 text-green-400 border-green-500/30',
  Caution: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Dangerous: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Extreme: 'bg-red-500/20 text-red-400 border-red-500/30',
  Lethal: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
};

const statusColors = {
  Stable: 'bg-green-500/20 text-green-400',
  Unstable: 'bg-yellow-500/20 text-yellow-400',
  Corrupted: 'bg-red-500/20 text-red-400',
  Destroyed: 'bg-gray-500/20 text-gray-400',
  Replika: 'bg-purple-500/20 text-purple-400'
};

const towerStatusColors = {
  Active: 'bg-green-500',
  Deactivated: 'bg-gray-500',
  Corrupted: 'bg-red-500',
  Destroyed: 'bg-black'
};

const sectorIcons = {
  1: Trees,
  2: Mountain,
  3: Sun,
  4: Snowflake,
  5: Building
};

export default function LyokoSectors() {
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [glitchEffect, setGlitchEffect] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 150);
    }, 10000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 p-6 relative overflow-hidden">
      {/* Lyoko Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-12 w-full h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-green-500/20 relative">
              {Math.random() > 0.95 && (
                <div className="absolute inset-0 bg-red-500/30 animate-pulse"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scan Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scan-lines"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-8 ${glitchEffect ? 'animate-pulse' : ''}`}>
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-red-500 mb-4 tracking-wider">
            LYOKO SECTORS
          </h1>
          <div className="text-green-400 font-rajdhani text-lg mb-6">
            <span className="animate-pulse">█</span> DIGITAL WORLD MAPPING SYSTEM 
            <span className="animate-pulse">█</span>
          </div>
          <div className="text-xs text-green-600 font-mono">
            SECTOR ANALYSIS | TOWER STATUS | THREAT ASSESSMENT
          </div>
        </div>

        {/* Sector Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sectors.map((sector) => {
            const IconComponent = sectorIcons[sector.number];
            const activeTowers = sector.towers.filter(t => t.status === 'Active').length;
            const xanaTowers = sector.towers.filter(t => t.xanaControl).length;
            
            return (
              <Card 
                key={sector.id} 
                className="bg-black/80 border-green-500/30 hover:border-red-500/50 transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedSector(selectedSector?.id === sector.id ? null : sector)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-6 h-6 text-red-500" />
                      <Badge variant="outline" className="text-xs font-mono bg-blue-500/20 text-blue-400 border-blue-500/30">
                        SECTOR {sector.number}
                      </Badge>
                    </div>
                    <Badge className={`text-xs font-mono ${statusColors[sector.currentStatus]}`}>
                      {sector.currentStatus}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl font-orbitron text-red-400 group-hover:text-red-300 transition-colors">
                    {sector.name}
                  </CardTitle>
                  
                  <CardDescription className="text-green-600 font-rajdhani">
                    {sector.environment}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-green-300 text-sm leading-relaxed font-rajdhani line-clamp-3">
                    {sector.description}
                  </p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-mono">TOWERS:</span>
                      <span className="text-green-400">{activeTowers}/{sector.towers.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-600 font-mono">XANA:</span>
                      <span className="text-red-400">{xanaTowers}</span>
                    </div>
                  </div>

                  {/* Threat Level */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-600 font-mono">THREAT LEVEL:</span>
                    <Badge className={`text-xs font-mono ${threatColors[sector.threatLevel]}`}>
                      {sector.threatLevel}
                    </Badge>
                  </div>

                  {/* XANA Presence */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-600 font-mono">XANA PRESENCE:</span>
                    <Badge className={`text-xs font-mono ${presenceColors[sector.xanaPresence]}`}>
                      {sector.xanaPresence}
                    </Badge>
                  </div>

                  <div className="text-xs text-green-700 font-mono pt-2 border-t border-green-500/10">
                    Click to view detailed sector map
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Detailed Sector View */}
        {selectedSector && (
          <Card className="bg-black/90 border-red-500/50 mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-orbitron text-red-400">
                  {selectedSector.name} - Detailed Analysis
                </CardTitle>
                <button
                  onClick={() => setSelectedSector(null)}
                  className="text-green-400 hover:text-red-400 transition-colors"
                >
                  <Eye className="w-6 h-6" />
                </button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Sector Map */}
              <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-6">
                <h3 className="text-lg font-orbitron text-green-400 mb-4">SECTOR MAP</h3>
                <div className="relative w-full h-64 bg-black/50 border border-green-500/30 rounded">
                  {/* Grid */}
                  <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div key={i} className="border border-green-500/10"></div>
                    ))}
                  </div>
                  
                  {/* Towers */}
                  {selectedSector.towers.map((tower) => (
                    <div
                      key={tower.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                      style={{
                        left: `${tower.location.x}%`,
                        top: `${tower.location.y}%`
                      }}
                    >
                      <div className={`w-4 h-4 rounded-full ${towerStatusColors[tower.status]} border-2 border-white animate-pulse`}>
                        {tower.xanaControl && (
                          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
                        )}
                      </div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/90 border border-green-500/50 rounded px-2 py-1 text-xs font-mono text-green-400 whitespace-nowrap">
                          {tower.name}
                          <br />
                          Status: {tower.status}
                          {tower.xanaControl && (
                            <>
                              <br />
                              <span className="text-red-400">XANA CONTROLLED</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Map Legend */}
                <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-400">Active Tower</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-400">Deactivated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-400">XANA Controlled</span>
                  </div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Environment Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-orbitron text-green-400">ENVIRONMENT</h3>
                  
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                    <div className="text-xs text-blue-600 font-mono mb-1">VISUAL DESCRIPTION:</div>
                    <div className="text-blue-300 font-rajdhani text-sm">{selectedSector.visualDescription}</div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <div className="text-xs text-green-600 font-mono mb-1">TERRAIN:</div>
                      <div className="text-green-300 font-rajdhani text-sm">{selectedSector.terrain}</div>
                    </div>
                    <div>
                      <div className="text-xs text-green-600 font-mono mb-1">CLIMATE:</div>
                      <div className="text-green-300 font-rajdhani text-sm">{selectedSector.climate}</div>
                    </div>
                  </div>

                  {/* Special Features */}
                  <div>
                    <div className="text-xs text-purple-600 font-mono mb-2">SPECIAL FEATURES:</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedSector.specialFeatures.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-purple-500/20 text-purple-400 border-purple-400/30">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tactical Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-orbitron text-green-400">TACTICAL DATA</h3>
                  
                  <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded">
                    <div className="text-xs text-orange-600 font-mono mb-1">STRATEGIC VALUE:</div>
                    <div className="text-orange-300 font-rajdhani text-sm">{selectedSector.strategicValue}</div>
                  </div>

                  {/* Monsters */}
                  <div>
                    <div className="text-xs text-red-600 font-mono mb-2">HOSTILE ENTITIES:</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedSector.monsters.map((monster, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-red-500/20 text-red-400 border-red-400/30">
                          {monster}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Access Points */}
                  <div>
                    <div className="text-xs text-green-600 font-mono mb-2">ACCESS POINTS:</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedSector.accessPoints.map((access, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-green-500/20 text-green-400 border-green-400/30">
                          {access}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tower Details */}
              <div>
                <h3 className="text-lg font-orbitron text-green-400 mb-4">TOWER STATUS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedSector.towers.map((tower) => (
                    <div key={tower.id} className="p-3 bg-black/50 border border-green-500/20 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-orbitron text-green-400">{tower.name}</div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${towerStatusColors[tower.status]}`}></div>
                          <Badge className={`text-xs font-mono ${tower.xanaControl ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                            {tower.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-xs text-green-300 font-rajdhani">{tower.purpose}</div>
                      {tower.xanaControl && (
                        <div className="text-xs text-red-400 font-mono mt-1">⚠️ XANA CONTROLLED</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-green-700 font-mono">
          <div className="mb-2">LYOKO MAPPING SYSTEM v6.1.8</div>
          <div>SECTORS MAPPED: {sectors.length} | TOWERS MONITORED: {sectors.reduce((acc, s) => acc + s.towers.length, 0)}</div>
          <div className="mt-2 text-red-600">
            ⚠️ SECTOR CONDITIONS MAY CHANGE - MAINTAIN REAL-TIME MONITORING ⚠️
          </div>
        </div>
      </div>
    </div>
  );
}