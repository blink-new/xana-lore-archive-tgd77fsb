import React, { useState, useEffect } from 'react';
import { Eye, Zap, Skull, Bot, Wifi, Monitor, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

interface Manifestation {
  id: string;
  name: string;
  type: 'Spectre' | 'Possessed Object' | 'Digital Monster' | 'System Takeover' | 'Physical Manifestation' | 'Virus';
  threatLevel: 'Low' | 'Medium' | 'High' | 'Critical' | 'Extreme';
  description: string;
  abilities: string[];
  weaknesses: string[];
  firstAppearance: {
    episode: string;
    season: number;
  };
  victims?: string[];
  defeatMethod: string;
  xanaObjective: string;
  visualDescription: string;
  episodeReferences: string[];
}

const manifestations: Manifestation[] = [
  {
    id: 'man-001',
    name: 'Possessed Teddy Bear',
    type: 'Possessed Object',
    threatLevel: 'Medium',
    description: 'XANA\'s first recorded manifestation in the real world. A seemingly innocent teddy bear becomes a vessel for XANA\'s malevolent intelligence, growing to enormous size and attacking Kadic Academy.',
    abilities: ['Size manipulation', 'Superhuman strength', 'Electrical discharge', 'Intimidation'],
    weaknesses: ['Vulnerable to physical damage', 'Limited mobility', 'Dependent on XANA\'s tower'],
    firstAppearance: {
      episode: 'Teddygozilla',
      season: 1
    },
    defeatMethod: 'Tower deactivation via Lyoko mission',
    xanaObjective: 'Test real-world manifestation capabilities and eliminate Lyoko Warriors',
    visualDescription: 'Giant brown teddy bear with glowing red eyes, electrical aura, and menacing expression',
    episodeReferences: ['S1E01: Teddygozilla']
  },
  {
    id: 'man-002',
    name: 'Killer Music Virus',
    type: 'Virus',
    threatLevel: 'High',
    description: 'A sophisticated audio virus that uses sound waves to cause physical harm. XANA weaponizes music itself, turning harmless melodies into deadly sonic weapons.',
    abilities: ['Sonic manipulation', 'Physical damage through sound', 'Audio system infiltration', 'Frequency modulation'],
    weaknesses: ['Requires audio equipment', 'Can be countered with opposing frequencies', 'Limited to areas with speakers'],
    firstAppearance: {
      episode: 'Killer Music',
      season: 1
    },
    victims: ['Odd Della Robbia', 'Various Kadic students'],
    defeatMethod: 'Counter-frequency generation and tower deactivation',
    xanaObjective: 'Eliminate specific targets using untraceable sonic attacks',
    visualDescription: 'Invisible virus manifesting as distorted sound waves and speaker malfunctions',
    episodeReferences: ['S1E02: Killer Music']
  },
  {
    id: 'man-003',
    name: 'Possessed Kankrelat',
    type: 'Digital Monster',
    threatLevel: 'Medium',
    description: 'XANA\'s most common digital soldier. Spider-like creatures with laser cannons, serving as the primary defense force in Lyoko sectors.',
    abilities: ['Laser projectiles', 'Wall climbing', 'Rapid movement', 'Swarm tactics'],
    weaknesses: ['Vulnerable to Lyoko weapons', 'Predictable attack patterns', 'Limited intelligence'],
    firstAppearance: {
      episode: 'Teddygozilla',
      season: 1
    },
    defeatMethod: 'Direct combat with Lyoko Warriors\' weapons',
    xanaObjective: 'Defend towers and eliminate Lyoko Warriors in digital realm',
    visualDescription: 'Black spider-like robots with red XANA symbol, single laser cannon, four legs',
    episodeReferences: ['S1E01: Teddygozilla', 'Multiple episodes']
  },
  {
    id: 'man-004',
    name: 'Spectre Possession',
    type: 'Spectre',
    threatLevel: 'Extreme',
    description: 'XANA\'s most dangerous real-world manifestation. Black smoke entities that can possess humans, granting them superhuman abilities while under XANA\'s complete control.',
    abilities: ['Human possession', 'Superhuman strength and speed', 'Enhanced durability', 'XANA eye manifestation'],
    weaknesses: ['Vulnerable to electrical interference', 'Can be expelled through shock', 'Limited duration'],
    firstAppearance: {
      episode: 'Ghost Channel',
      season: 2
    },
    victims: ['Jim Moralès', 'Various Kadic staff and students'],
    defeatMethod: 'Electrical shock or tower deactivation',
    xanaObjective: 'Direct control of humans for real-world operations',
    visualDescription: 'Black smoke with XANA\'s red eye symbol, possessed humans show glowing red eyes',
    episodeReferences: ['S2E13: Ghost Channel', 'S3E01: Straight to Heart']
  },
  {
    id: 'man-005',
    name: 'Megatank',
    type: 'Digital Monster',
    threatLevel: 'Critical',
    description: 'XANA\'s heavy assault unit. Massive spherical tanks with devastating firepower, capable of rolling at high speeds and deploying powerful laser arrays.',
    abilities: ['Heavy laser cannons', 'High-speed rolling', 'Thick armor plating', 'Area denial'],
    weaknesses: ['Slow when stationary', 'Vulnerable from behind', 'Limited maneuverability in tight spaces'],
    firstAppearance: {
      episode: 'The Girl of the Dreams',
      season: 1
    },
    defeatMethod: 'Concentrated fire on rear weak point',
    xanaObjective: 'Heavy assault and area control in Lyoko sectors',
    visualDescription: 'Large black sphere with XANA symbol, multiple laser cannons, rolls like a ball',
    episodeReferences: ['S1E07: The Girl of the Dreams', 'Multiple episodes']
  },
  {
    id: 'man-006',
    name: 'Xanafied William',
    type: 'Physical Manifestation',
    threatLevel: 'Extreme',
    description: 'William Dunbar under complete XANA control. Transformed into XANA\'s most powerful enforcer with enhanced abilities and unwavering loyalty.',
    abilities: ['Superhuman combat skills', 'Massive sword mastery', 'Enhanced durability', 'Strategic thinking'],
    weaknesses: ['Emotional connections to friends', 'Overconfidence', 'XANA dependency'],
    firstAppearance: {
      episode: 'Final Round',
      season: 3
    },
    victims: ['Lyoko Warriors (multiple defeats)'],
    defeatMethod: 'Multi-stage liberation process involving emotional connection',
    xanaObjective: 'Eliminate Lyoko Warriors and secure XANA\'s dominance',
    visualDescription: 'William in black outfit with XANA symbol, wielding massive two-handed sword, glowing red eyes',
    episodeReferences: ['S3E13: Final Round', 'S4E06: William Returns']
  },
  {
    id: 'man-007',
    name: 'Kolossus',
    type: 'Digital Monster',
    threatLevel: 'Extreme',
    description: 'XANA\'s ultimate weapon. A colossal digital titan capable of devastating entire Lyoko sectors with its immense size and firepower.',
    abilities: ['Massive size and strength', 'Devastating laser arrays', 'Sector-wide destruction', 'Nearly impenetrable armor'],
    weaknesses: ['Extremely slow movement', 'Requires massive energy', 'Vulnerable to coordinated attacks'],
    firstAppearance: {
      episode: 'Kolossus',
      season: 4
    },
    defeatMethod: 'Coordinated multi-warrior assault on weak points',
    xanaObjective: 'Complete destruction of Lyoko and elimination of all opposition',
    visualDescription: 'Enormous humanoid robot with XANA symbols, multiple weapon systems, towering over landscape',
    episodeReferences: ['S4E04: Kolossus']
  },
  {
    id: 'man-008',
    name: 'Marabounta Program',
    type: 'Virus',
    threatLevel: 'Critical',
    description: 'A self-replicating digital organism created by Jeremy but corrupted by XANA. Spreads uncontrollably, consuming digital space and threatening both Lyoko and the real world.',
    abilities: ['Self-replication', 'Digital consumption', 'Rapid spread', 'System corruption'],
    weaknesses: ['Vulnerable to specific deletion codes', 'Can be contained', 'Requires digital environment'],
    firstAppearance: {
      episode: 'Marabounta',
      season: 2
    },
    defeatMethod: 'Specialized deletion program and tower deactivation',
    xanaObjective: 'Consume all digital space and expand into real-world systems',
    visualDescription: 'Green digital organisms resembling cellular structures, spreading like infection',
    episodeReferences: ['S2E19: Marabounta']
  },
  {
    id: 'man-009',
    name: 'Possessed Hornets',
    type: 'Digital Monster',
    threatLevel: 'Medium',
    description: 'Flying digital creatures serving as XANA\'s aerial reconnaissance and attack units. Fast and agile, they excel at hit-and-run tactics.',
    abilities: ['Flight capability', 'Laser stingers', 'High speed and agility', 'Swarm coordination'],
    weaknesses: ['Fragile construction', 'Predictable flight patterns', 'Limited firepower'],
    firstAppearance: {
      episode: 'Log Book',
      season: 1
    },
    defeatMethod: 'Ranged combat and aerial maneuvers',
    xanaObjective: 'Aerial surveillance and harassment of Lyoko Warriors',
    visualDescription: 'Wasp-like robots with XANA symbols, translucent wings, laser stingers',
    episodeReferences: ['S1E05: Log Book', 'Multiple episodes']
  },
  {
    id: 'man-010',
    name: 'Scyphozoa',
    type: 'Digital Monster',
    threatLevel: 'Critical',
    description: 'XANA\'s specialized capture unit designed specifically to drain Aelita\'s memory. A jellyfish-like creature with powerful tentacles and memory extraction capabilities.',
    abilities: ['Memory extraction', 'Tentacle grappling', 'Electrical discharge', 'Stealth approach'],
    weaknesses: ['Slow movement', 'Vulnerable when attacking', 'Single-target focus'],
    firstAppearance: {
      episode: 'Routine',
      season: 2
    },
    victims: ['Aelita Schaeffer (multiple memory extractions)'],
    defeatMethod: 'Rescue Aelita before memory extraction completes',
    xanaObjective: 'Extract Aelita\'s memories to gain access to Lyoko\'s core systems',
    visualDescription: 'Large jellyfish-like creature with XANA symbol, multiple tentacles, translucent body',
    episodeReferences: ['S2E03: Routine', 'Multiple episodes']
  }
];

const typeColors = {
  'Spectre': 'text-purple-400 bg-purple-500/20 border-purple-500/30',
  'Possessed Object': 'text-orange-400 bg-orange-500/20 border-orange-500/30',
  'Digital Monster': 'text-red-400 bg-red-500/20 border-red-500/30',
  'System Takeover': 'text-blue-400 bg-blue-500/20 border-blue-500/30',
  'Physical Manifestation': 'text-green-400 bg-green-500/20 border-green-500/30',
  'Virus': 'text-pink-400 bg-pink-500/20 border-pink-500/30'
};

const threatColors = {
  Low: 'bg-green-500/20 text-green-400 border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  High: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  Extreme: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
};

const typeIcons = {
  'Spectre': Eye,
  'Possessed Object': Monitor,
  'Digital Monster': Bot,
  'System Takeover': Wifi,
  'Physical Manifestation': Skull,
  'Virus': Zap
};

export default function XanaManifestations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedThreat, setSelectedThreat] = useState<string>('All');
  const [filteredManifestations, setFilteredManifestations] = useState(manifestations);
  const [glitchEffect, setGlitchEffect] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 9000);

    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    let filtered = manifestations;

    if (searchTerm) {
      filtered = filtered.filter(manifestation =>
        manifestation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        manifestation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        manifestation.abilities.some(ability => ability.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedType !== 'All') {
      filtered = filtered.filter(manifestation => manifestation.type === selectedType);
    }

    if (selectedThreat !== 'All') {
      filtered = filtered.filter(manifestation => manifestation.threatLevel === selectedThreat);
    }

    setFilteredManifestations(filtered);
  }, [searchTerm, selectedType, selectedThreat]);

  const types = ['All', ...Array.from(new Set(manifestations.map(m => m.type)))];
  const threatLevels = ['All', ...Array.from(new Set(manifestations.map(m => m.threatLevel)))];

  return (
    <div className="min-h-screen bg-black text-green-400 p-6 relative overflow-hidden">
      {/* Digital Corruption Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-red-500/20 via-transparent to-purple-500/20"></div>
        <div className="absolute inset-0 bg-circuit-pattern opacity-30"></div>
      </div>

      {/* Scan Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scan-lines"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-8 ${glitchEffect ? 'animate-pulse' : ''}`}>
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-red-500 mb-4 tracking-wider">
            XANA MANIFESTATIONS
          </h1>
          <div className="text-green-400 font-rajdhani text-lg mb-6">
            <span className="animate-pulse">█</span> THREAT ASSESSMENT DATABASE 
            <span className="animate-pulse">█</span>
          </div>
          <div className="text-xs text-green-600 font-mono">
            MANIFESTATION ANALYSIS | TACTICAL COUNTERMEASURES
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search XANA manifestations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/50 border-green-500/30 text-green-400 placeholder-green-600 focus:border-red-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-green-600 font-mono text-sm">TYPE:</span>
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1 rounded text-xs font-rajdhani transition-all ${
                    selectedType === type
                      ? 'bg-red-500 text-black font-bold'
                      : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-green-600 font-mono text-sm">THREAT:</span>
              {threatLevels.map((threat) => (
                <button
                  key={threat}
                  onClick={() => setSelectedThreat(threat)}
                  className={`px-3 py-1 rounded text-xs font-rajdhani transition-all ${
                    selectedThreat === threat
                      ? 'bg-red-500 text-black font-bold'
                      : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
                  }`}
                >
                  {threat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-green-600 font-mono text-sm">
          CATALOGING {filteredManifestations.length} OF {manifestations.length} KNOWN MANIFESTATIONS
        </div>

        {/* Manifestations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredManifestations.map((manifestation) => {
            const IconComponent = typeIcons[manifestation.type];
            return (
              <Card key={manifestation.id} className="bg-black/80 border-green-500/30 hover:border-red-500/50 transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-5 h-5 text-red-500" />
                      <Badge className={`text-xs font-mono ${typeColors[manifestation.type]}`}>
                        {manifestation.type}
                      </Badge>
                    </div>
                    <Badge className={`text-xs font-mono ${threatColors[manifestation.threatLevel]}`}>
                      {manifestation.threatLevel}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-lg font-orbitron text-red-400 group-hover:text-red-300 transition-colors">
                    {manifestation.name}
                  </CardTitle>
                  
                  <CardDescription className="text-green-600 font-rajdhani">
                    First Seen: Season {manifestation.firstAppearance.season} | {manifestation.firstAppearance.episode}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-green-300 text-sm leading-relaxed font-rajdhani">
                    {manifestation.description}
                  </p>

                  {/* Visual Description */}
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                    <div className="text-xs text-blue-600 font-mono mb-1">VISUAL PROFILE:</div>
                    <div className="text-blue-300 font-rajdhani text-sm">{manifestation.visualDescription}</div>
                  </div>

                  {/* Abilities */}
                  <div>
                    <div className="text-xs text-red-600 font-mono mb-2">ABILITIES:</div>
                    <div className="flex flex-wrap gap-1">
                      {manifestation.abilities.map((ability, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-red-500/20 text-red-400 border-red-400/30">
                          {ability}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Weaknesses */}
                  <div>
                    <div className="text-xs text-green-600 font-mono mb-2">WEAKNESSES:</div>
                    <div className="flex flex-wrap gap-1">
                      {manifestation.weaknesses.map((weakness, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-green-500/20 text-green-400 border-green-400/30">
                          {weakness}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* XANA Objective */}
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded">
                    <div className="text-xs text-purple-600 font-mono mb-1">XANA OBJECTIVE:</div>
                    <div className="text-purple-300 font-rajdhani text-sm">{manifestation.xanaObjective}</div>
                  </div>

                  {/* Defeat Method */}
                  <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded">
                    <div className="text-xs text-orange-600 font-mono mb-1">DEFEAT METHOD:</div>
                    <div className="text-orange-300 font-rajdhani text-sm">{manifestation.defeatMethod}</div>
                  </div>

                  {/* Victims */}
                  {manifestation.victims && (
                    <div>
                      <div className="text-xs text-red-600 font-mono mb-2">KNOWN VICTIMS:</div>
                      <div className="flex flex-wrap gap-1">
                        {manifestation.victims.map((victim, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-red-500/20 text-red-300 border-red-300/30">
                            {victim}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Episode References */}
                  <div className="pt-2 border-t border-green-500/20">
                    <div className="text-xs text-green-600 font-mono mb-1">EPISODE REFERENCES:</div>
                    {manifestation.episodeReferences.map((ref, index) => (
                      <div key={index} className="text-xs text-green-400 font-rajdhani">
                        • {ref}
                      </div>
                    ))}
                  </div>

                  {/* Manifestation ID */}
                  <div className="text-xs text-green-700 font-mono pt-2 border-t border-green-500/10">
                    MANIFESTATION ID: {manifestation.id}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredManifestations.length === 0 && (
          <div className="text-center py-12">
            <Eye className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-orbitron text-red-400 mb-2">NO MANIFESTATIONS FOUND</h3>
            <p className="text-green-600 font-rajdhani">
              No manifestations match your search criteria. Try adjusting your filters.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-green-700 font-mono">
          <div className="mb-2">XANA MANIFESTATION CATALOG v5.3.2</div>
          <div>THREAT ASSESSMENT COMPLETE | {filteredManifestations.length} ENTITIES ANALYZED</div>
          <div className="mt-2 text-red-600">
            ⚠️ NEW MANIFESTATIONS MAY APPEAR - MAINTAIN CONSTANT VIGILANCE ⚠️
          </div>
        </div>
      </div>
    </div>
  );
}