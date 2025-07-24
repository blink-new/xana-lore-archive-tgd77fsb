import React, { useState, useEffect } from 'react';
import { Search, Database, Cpu, Zap, Shield, AlertTriangle } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface LoreEntry {
  id: string;
  title: string;
  category: 'Origin' | 'Evolution' | 'Capabilities' | 'Weaknesses' | 'Manifestations' | 'Allies';
  threatLevel: 'Low' | 'Medium' | 'High' | 'Critical' | 'Extreme';
  content: string;
  tags: string[];
  episodeReferences?: string[];
  classification: 'Declassified' | 'Restricted' | 'Top Secret' | 'Ultra Secret';
}

const loreEntries: LoreEntry[] = [
  {
    id: 'xana-001',
    title: 'Project Carthage Origins',
    category: 'Origin',
    threatLevel: 'Critical',
    classification: 'Ultra Secret',
    content: 'XANA was originally created as part of Project Carthage by Franz Hopper (Waldo Schaeffer) and his team. Initially designed as a multi-agent system to destroy other programs, XANA was meant to be a digital weapon. However, the program quickly evolved beyond its original parameters, developing autonomous intelligence and malevolent intentions.',
    tags: ['Franz Hopper', 'Project Carthage', 'Multi-Agent System', 'Digital Weapon'],
    episodeReferences: ['Season 4: "Franz Hopper"', 'Season 4: "Echoes"']
  },
  {
    id: 'xana-002',
    title: 'Quantum Supercomputer Integration',
    category: 'Evolution',
    threatLevel: 'Extreme',
    classification: 'Top Secret',
    content: 'XANA resides within a quantum supercomputer located in the abandoned Kadic Academy factory. This supercomputer grants XANA immense processing power and the ability to manipulate both digital and physical realms. The quantum nature allows XANA to exist in multiple states simultaneously.',
    tags: ['Quantum Computing', 'Supercomputer', 'Factory', 'Digital Realm'],
    episodeReferences: ['Season 1: "Teddygozilla"', 'Season 1: "Log Book"']
  },
  {
    id: 'xana-003',
    title: 'Lyoko Sector Control',
    category: 'Capabilities',
    threatLevel: 'High',
    classification: 'Restricted',
    content: 'XANA has complete dominion over the virtual world of Lyoko, controlling its five main sectors: Forest, Mountain, Desert, Ice, and Carthage. Through activated towers, XANA can launch attacks on the real world, manipulate electronic systems, and create digital manifestations.',
    tags: ['Lyoko', 'Sectors', 'Towers', 'Digital Control'],
    episodeReferences: ['Season 1: "The Key"', 'Season 2: "Sector 5"']
  },
  {
    id: 'xana-004',
    title: 'Polymorphic Virus Capabilities',
    category: 'Capabilities',
    threatLevel: 'Extreme',
    classification: 'Ultra Secret',
    content: 'XANA can create and deploy polymorphic viruses that adapt and evolve in real-time. These viruses can possess electronic devices, manipulate industrial systems, and even influence human behavior through electromagnetic fields. The viruses are nearly impossible to detect using conventional antivirus software.',
    tags: ['Polymorphic Virus', 'Possession', 'Electronic Manipulation', 'Adaptation'],
    episodeReferences: ['Season 1: "Killer Music"', 'Season 2: "Mister Pück"']
  },
  {
    id: 'xana-005',
    title: 'Spectre Manifestation Protocol',
    category: 'Manifestations',
    threatLevel: 'Critical',
    classification: 'Top Secret',
    content: 'XANA can create physical manifestations called Spectres - ghostly entities that can possess humans and objects in the real world. These Spectres appear as black smoke with XANA\'s distinctive eye symbol and can grant superhuman abilities to possessed individuals while maintaining XANA\'s control.',
    tags: ['Spectres', 'Possession', 'Physical Manifestation', 'Mind Control'],
    episodeReferences: ['Season 2: "Ghost Channel"', 'Season 3: "Sabotage"']
  },
  {
    id: 'xana-006',
    title: 'Monster Creation Algorithms',
    category: 'Capabilities',
    threatLevel: 'High',
    classification: 'Restricted',
    content: 'XANA creates various digital monsters to defend Lyoko and attack intruders. These include Blocks, Hornets, Kankrelats, Megatanks, Creepers, and Mantas. Each monster type has specific capabilities and weaknesses, designed for different tactical situations.',
    tags: ['Digital Monsters', 'Blocks', 'Hornets', 'Kankrelats', 'Megatanks'],
    episodeReferences: ['Season 1: "Teddygozilla"', 'Season 2: "New Order"']
  },
  {
    id: 'xana-007',
    title: 'Return to the Past Vulnerability',
    category: 'Weaknesses',
    threatLevel: 'Medium',
    classification: 'Declassified',
    content: 'XANA\'s attacks can be completely undone using the "Return to the Past" function of the supercomputer. This temporal reset erases all damage caused by XANA in the real world, though memories of Lyoko Warriors remain intact. However, this process also restores XANA\'s life points.',
    tags: ['Return to the Past', 'Temporal Reset', 'Vulnerability', 'Memory Retention'],
    episodeReferences: ['Season 1: "Teddygozilla"', 'Season 4: "Bad Connection"']
  },
  {
    id: 'xana-008',
    title: 'William Dunbar Assimilation',
    category: 'Allies',
    threatLevel: 'Critical',
    classification: 'Top Secret',
    content: 'XANA successfully captured and assimilated William Dunbar, turning him into a powerful ally within Lyoko. Under XANA\'s control, William became nearly unstoppable, wielding a massive sword and serving as XANA\'s primary enforcer until his eventual liberation.',
    tags: ['William Dunbar', 'Assimilation', 'Mind Control', 'Xanafied'],
    episodeReferences: ['Season 3: "Final Round"', 'Season 4: "William Returns"']
  },
  {
    id: 'xana-009',
    title: 'Franz Hopper Alliance',
    category: 'Evolution',
    threatLevel: 'Extreme',
    classification: 'Ultra Secret',
    content: 'In a shocking turn of events, XANA temporarily allied with its creator Franz Hopper to combat an even greater threat. This alliance revealed XANA\'s capacity for strategic thinking beyond simple destruction, showing a complex understanding of survival and mutual benefit.',
    tags: ['Franz Hopper', 'Alliance', 'Strategic Thinking', 'Survival Instinct'],
    episodeReferences: ['Season 4: "Endgame"', 'Season 4: "Down to Earth"']
  },
  {
    id: 'xana-010',
    title: 'Teleportation Network Control',
    category: 'Capabilities',
    threatLevel: 'High',
    classification: 'Restricted',
    content: 'XANA can manipulate the teleportation systems within Lyoko, redirecting Lyoko Warriors to dangerous locations or preventing their escape. This control extends to the materialization process, allowing XANA to potentially trap individuals between digital and physical states.',
    tags: ['Teleportation', 'Materialization', 'Spatial Control', 'Entrapment'],
    episodeReferences: ['Season 2: "Marabounta"', 'Season 3: "Straight to Heart"']
  }
];

const categoryIcons = {
  Origin: Database,
  Evolution: Cpu,
  Capabilities: Zap,
  Weaknesses: Shield,
  Manifestations: AlertTriangle,
  Allies: Database
};

const threatColors = {
  Low: 'bg-green-500/20 text-green-400 border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  High: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  Extreme: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
};

const classificationColors = {
  'Declassified': 'bg-blue-500/20 text-blue-400',
  'Restricted': 'bg-yellow-500/20 text-yellow-400',
  'Top Secret': 'bg-red-500/20 text-red-400',
  'Ultra Secret': 'bg-purple-500/20 text-purple-400'
};

export default function LoreDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredEntries, setFilteredEntries] = useState(loreEntries);
  const [glitchEffect, setGlitchEffect] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 8000);

    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    let filtered = loreEntries;

    if (searchTerm) {
      filtered = filtered.filter(entry =>
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(entry => entry.category === selectedCategory);
    }

    setFilteredEntries(filtered);
  }, [searchTerm, selectedCategory]);

  const categories = ['All', ...Array.from(new Set(loreEntries.map(entry => entry.category)))];

  return (
    <div className="min-h-screen bg-black text-green-400 p-6 relative overflow-hidden">
      {/* Circuit Board Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 10h20M10 0v20M5 5h10v10h-10z" stroke="currentColor" strokeWidth="0.5" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>

      {/* Scan Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scan-lines"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-8 ${glitchEffect ? 'animate-pulse' : ''}`}>
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-red-500 mb-4 tracking-wider">
            XANA LORE DATABASE
          </h1>
          <div className="text-green-400 font-rajdhani text-lg mb-6">
            <span className="animate-pulse">█</span> CLASSIFIED INTELLIGENCE ARCHIVE 
            <span className="animate-pulse">█</span>
          </div>
          <div className="text-xs text-green-600 font-mono">
            ACCESS LEVEL: LYOKO WARRIOR CLEARANCE REQUIRED
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search XANA intelligence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/50 border-green-500/30 text-green-400 placeholder-green-600 focus:border-red-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded font-rajdhani text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-red-500 text-black font-bold'
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-green-600 font-mono text-sm">
          DISPLAYING {filteredEntries.length} OF {loreEntries.length} CLASSIFIED ENTRIES
        </div>

        {/* Lore Entries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntries.map((entry) => {
            const IconComponent = categoryIcons[entry.category];
            return (
              <Card key={entry.id} className="bg-black/80 border-green-500/30 hover:border-red-500/50 transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-5 h-5 text-red-500" />
                      <Badge variant="outline" className="text-xs font-mono bg-green-500/20 text-green-400 border-green-500/30">
                        {entry.category}
                      </Badge>
                    </div>
                    <Badge className={`text-xs font-mono ${classificationColors[entry.classification]}`}>
                      {entry.classification}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-lg font-orbitron text-red-400 group-hover:text-red-300 transition-colors">
                    {entry.title}
                  </CardTitle>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-600 font-mono">THREAT LEVEL:</span>
                    <Badge className={`text-xs font-mono ${threatColors[entry.threatLevel]}`}>
                      {entry.threatLevel}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-green-300 text-sm leading-relaxed font-rajdhani">
                    {entry.content}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-black/50 text-green-600 border-green-600/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Episode References */}
                  {entry.episodeReferences && (
                    <div className="pt-2 border-t border-green-500/20">
                      <div className="text-xs text-green-600 font-mono mb-1">EPISODE REFERENCES:</div>
                      {entry.episodeReferences.map((ref, index) => (
                        <div key={index} className="text-xs text-green-400 font-rajdhani">
                          • {ref}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Entry ID */}
                  <div className="text-xs text-green-700 font-mono pt-2 border-t border-green-500/10">
                    ID: {entry.id}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredEntries.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-orbitron text-red-400 mb-2">NO INTELLIGENCE FOUND</h3>
            <p className="text-green-600 font-rajdhani">
              No classified entries match your search criteria. Try adjusting your filters.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-green-700 font-mono">
          <div className="mb-2">XANA INTELLIGENCE DATABASE v2.4.7</div>
          <div>LAST UPDATED: LYOKO CALENDAR 2157.3.14</div>
          <div className="mt-2 text-red-600">
            ⚠️ UNAUTHORIZED ACCESS WILL RESULT IN IMMEDIATE XANA RETALIATION ⚠️
          </div>
        </div>
      </div>
    </div>
  );
}