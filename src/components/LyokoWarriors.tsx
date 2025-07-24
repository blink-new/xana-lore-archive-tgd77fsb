import React, { useState } from 'react';
import { Search, Shield, Zap, Target, Heart, Brain, Eye } from 'lucide-react';

interface Warrior {
  id: string;
  name: string;
  codeName: string;
  age: number;
  physicalDescription: {
    height: string;
    hair: string;
    eyes: string;
    build: string;
    distinguishingFeatures: string[];
  };
  lyokoAppearance: {
    outfit: string;
    colors: string[];
    weapon: string;
    specialAbilities: string[];
  };
  personality: string[];
  stats: {
    combat: number;
    intelligence: number;
    leadership: number;
    agility: number;
    loyalty: number;
  };
  backstory: string;
  relationship: string;
  episodes: number;
  status: 'Active' | 'Compromised' | 'Recovered' | 'Deceased';
}

const warriors: Warrior[] = [
  {
    id: 'jeremie',
    name: 'Jérémie Belpois',
    codeName: 'Einstein',
    age: 13,
    physicalDescription: {
      height: '5\'2" (157 cm)',
      hair: 'Blonde, short and neatly styled',
      eyes: 'Blue behind round wire-frame glasses',
      build: 'Slim, intellectual frame',
      distinguishingFeatures: ['Round wire-frame glasses', 'Light blue hoodie/sweater', 'Beige cargo pants', 'White sneakers', 'Serious analytical expression']
    },
    lyokoAppearance: {
      outfit: 'Rarely enters Lyoko - operates from Earth',
      colors: ['Blue', 'White'],
      weapon: 'Supercomputer interface and tactical analysis',
      specialAbilities: ['Supercomputer operation', 'Program analysis', 'Tower deactivation', 'Return to the past']
    },
    personality: ['Genius-level intellect', 'Socially awkward', 'Loyal friend', 'Perfectionist', 'Anxious under pressure'],
    stats: {
      combat: 2,
      intelligence: 10,
      leadership: 7,
      agility: 3,
      loyalty: 9
    },
    backstory: 'Discovered the supercomputer and Aelita, becoming the technical mastermind behind the Lyoko Warriors. His father works for the same research facility where XANA was created.',
    relationship: 'In love with Aelita, best friends with Odd',
    episodes: 97,
    status: 'Active'
  },
  {
    id: 'aelita',
    name: 'Aelita Schaeffer',
    codeName: 'Princess',
    age: 12,
    physicalDescription: {
      height: '5\'0" (152 cm)',
      hair: 'Bright pink, shoulder-length with distinctive spiky style',
      eyes: 'Green, large and expressive',
      build: 'Petite, graceful',
      distinguishingFeatures: ['Distinctive bright pink hair', 'Purple/lavender long-sleeved top', 'Dark purple pants', 'Yellow/tan shoes', 'Elf-like pointed ears', 'Gentle but determined expression']
    },
    lyokoAppearance: {
      outfit: 'Pink and white dress with geometric patterns',
      colors: ['Pink', 'White', 'Green'],
      weapon: 'Energy fields, creativity (materialization)',
      specialAbilities: ['Tower deactivation', 'Energy field generation', 'Creativity power', 'XANA virus immunity']
    },
    personality: ['Intelligent and curious', 'Kind and compassionate', 'Strong-willed', 'Artistic', 'Protective of friends'],
    stats: {
      combat: 6,
      intelligence: 9,
      leadership: 6,
      agility: 7,
      loyalty: 10
    },
    backstory: 'Originally thought to be an AI, later revealed to be human - daughter of Franz Hopper. Holds the key to stopping XANA permanently.',
    relationship: 'In love with Jérémie, close friends with all warriors',
    episodes: 97,
    status: 'Active'
  },
  {
    id: 'odd',
    name: 'Odd Della Robbia',
    codeName: 'Cat',
    age: 13,
    physicalDescription: {
      height: '5\'4" (163 cm)',
      hair: 'Bright pink/purple, spiky and wild',
      eyes: 'Purple/violet',
      build: 'Athletic, agile',
      distinguishingFeatures: ['Bright pink/purple spiky hair', 'Red/maroon long-sleeved shirt', 'Dark pants', 'Red boots/shoes', 'Cat-like reflexes', 'Mischievous grin', 'Always energetic']
    },
    lyokoAppearance: {
      outfit: 'Purple cat-like suit with yellow trim',
      colors: ['Purple', 'Yellow', 'Black'],
      weapon: 'Laser arrows',
      specialAbilities: ['Future flash (precognition)', 'Enhanced agility', 'Wall running', 'Acrobatic combat']
    },
    personality: ['Humorous and laid-back', 'Brave and impulsive', 'Loyal friend', 'Food-obsessed', 'Natural entertainer'],
    stats: {
      combat: 8,
      intelligence: 6,
      leadership: 5,
      agility: 10,
      loyalty: 8
    },
    backstory: 'The joker of the group with cat-like abilities on Lyoko. Often provides comic relief but proves brave when needed.',
    relationship: 'Best friends with Jérémie, close to all team members',
    episodes: 97,
    status: 'Active'
  },
  {
    id: 'ulrich',
    name: 'Ulrich Stern',
    codeName: 'Samurai',
    age: 13,
    physicalDescription: {
      height: '5\'6" (168 cm)',
      hair: 'Dark brown, short and slightly messy',
      eyes: 'Brown',
      build: 'Athletic, lean and muscular for his age',
      distinguishingFeatures: ['Dark brown hair', 'Tan/beige long-sleeved shirt', 'Green cargo pants', 'White sneakers', 'Serious focused expression', 'Athletic confident posture']
    },
    lyokoAppearance: {
      outfit: 'Yellow and brown samurai-inspired outfit',
      colors: ['Yellow', 'Brown', 'Black'],
      weapon: 'Twin katanas',
      specialAbilities: ['Super sprint', 'Triangulate', 'Swordsmanship mastery', 'Enhanced reflexes']
    },
    personality: ['Serious and focused', 'Natural leader', 'Protective', 'Sometimes jealous', 'Dedicated warrior'],
    stats: {
      combat: 9,
      intelligence: 7,
      leadership: 8,
      agility: 8,
      loyalty: 9
    },
    backstory: 'The most combat-focused warrior with exceptional sword skills. Often takes charge in dangerous situations.',
    relationship: 'Has feelings for Yumi, competitive with William',
    episodes: 97,
    status: 'Active'
  },
  {
    id: 'yumi',
    name: 'Yumi Ishiyama',
    codeName: 'Geisha',
    age: 15,
    physicalDescription: {
      height: '5\'5" (165 cm)',
      hair: 'Black, long and straight with distinctive style',
      eyes: 'Dark brown/black',
      build: 'Tall, elegant, athletic',
      distinguishingFeatures: ['Long straight black hair', 'Black long-sleeved top', 'Black pants', 'Dark boots/shoes', 'Japanese heritage', 'Graceful movements', 'Mature confident appearance', 'Arms often crossed']
    },
    lyokoAppearance: {
      outfit: 'Black and red Japanese-inspired outfit',
      colors: ['Black', 'Red', 'Gray'],
      weapon: 'Metal fans (tessen)',
      specialAbilities: ['Telekinesis', 'Metal fan throwing', 'Enhanced precision', 'Defensive barriers']
    },
    personality: ['Mature and responsible', 'Strong-willed', 'Protective of younger students', 'Independent', 'Strategic thinker'],
    stats: {
      combat: 8,
      intelligence: 8,
      leadership: 9,
      agility: 7,
      loyalty: 10
    },
    backstory: 'The oldest and most mature warrior, often acting as the voice of reason. Lives off-campus with her family.',
    relationship: 'Has feelings for Ulrich, protective of all team members',
    episodes: 97,
    status: 'Active'
  },
  {
    id: 'william',
    name: 'William Dunbar',
    codeName: 'Gladiator',
    age: 15,
    physicalDescription: {
      height: '5\'8" (173 cm)',
      hair: 'Black, messy and slightly long',
      eyes: 'Dark brown',
      build: 'Tall, strong, imposing',
      distinguishingFeatures: ['Messy black hair', 'Dark shirt with red sleeves', 'Blue jeans', 'Brown boots', 'Intimidating presence', 'Muscular build', 'Confident swagger', 'Slightly rebellious appearance']
    },
    lyokoAppearance: {
      outfit: 'Black and red armor-like suit (when possessed: dark corrupted version)',
      colors: ['Black', 'Red', 'Silver'],
      weapon: 'Zweihander (two-handed sword)',
      specialAbilities: ['Super smoke', 'Enhanced strength', 'Sword mastery', 'When possessed: Dark energy attacks']
    },
    personality: ['Confident and bold', 'Sometimes arrogant', 'Brave warrior', 'Loyal when trusted', 'Struggles with being controlled'],
    stats: {
      combat: 10,
      intelligence: 6,
      leadership: 6,
      agility: 6,
      loyalty: 7
    },
    backstory: 'Joined the team later but was captured by XANA and used as a puppet. Eventually freed but carries the trauma of being controlled.',
    relationship: 'Interested in Yumi, rivalry with Ulrich, grateful to team for rescue',
    episodes: 30,
    status: 'Recovered'
  }
];

export default function LyokoWarriors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWarrior, setSelectedWarrior] = useState<Warrior | null>(null);
  const [glitchActive, setGlitchActive] = useState(false);

  const filteredWarriors = warriors.filter(warrior =>
    warrior.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warrior.codeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-400';
      case 'Compromised': return 'text-red-400';
      case 'Recovered': return 'text-yellow-400';
      case 'Deceased': return 'text-gray-400';
      default: return 'text-white';
    }
  };

  const StatBar = ({ value, max = 10 }: { value: number; max?: number }) => (
    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-red-600 to-green-400 transition-all duration-300"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Circuit board background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 10h20M10 0v20M5 5h10v10h-10z" stroke="#00ff00" strokeWidth="0.5" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>

      {/* Scan lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse" />
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-green-500/20"
            style={{ top: `${i * 5}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-4 font-orbitron ${glitchActive ? 'animate-pulse text-red-500' : 'text-red-500'}`}>
            LYOKO WARRIORS DATABASE
          </h1>
          <div className="text-green-400 font-rajdhani text-lg">
            [ CLASSIFIED PERSONNEL FILES - SECURITY CLEARANCE REQUIRED ]
          </div>
          <div className="mt-2 text-xs text-gray-400">
            XANA THREAT ASSESSMENT: ACTIVE MONITORING
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search warriors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900/50 border border-green-500/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {!selectedWarrior ? (
          /* Warriors Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredWarriors.map((warrior) => (
              <div
                key={warrior.id}
                onClick={() => setSelectedWarrior(warrior)}
                className="bg-gray-900/30 border border-green-500/20 rounded-lg p-6 cursor-pointer hover:border-red-500/50 hover:bg-gray-800/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-red-400 font-orbitron group-hover:text-red-300">
                    {warrior.name}
                  </h3>
                  <div className={`text-sm font-rajdhani ${getStatusColor(warrior.status)}`}>
                    {warrior.status}
                  </div>
                </div>
                
                <div className="text-green-400 text-sm mb-2 font-rajdhani">
                  CODENAME: {warrior.codeName}
                </div>
                
                <div className="text-gray-300 text-sm mb-4">
                  Age: {warrior.age} | Episodes: {warrior.episodes}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">COMBAT</span>
                    <span className="text-red-400">{warrior.stats.combat}/10</span>
                  </div>
                  <StatBar value={warrior.stats.combat} />
                  
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">INTELLIGENCE</span>
                    <span className="text-green-400">{warrior.stats.intelligence}/10</span>
                  </div>
                  <StatBar value={warrior.stats.intelligence} />
                </div>

                <div className="mt-4 text-xs text-gray-400">
                  Click to access full dossier...
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Detailed Warrior View */
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedWarrior(null)}
              className="mb-6 text-green-400 hover:text-red-400 transition-colors font-rajdhani"
            >
              ← RETURN TO WARRIOR LIST
            </button>

            <div className="bg-gray-900/40 border border-red-500/30 rounded-lg p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-red-400 font-orbitron mb-2">
                    {selectedWarrior.name}
                  </h2>
                  <div className="text-green-400 font-rajdhani text-lg">
                    CODENAME: {selectedWarrior.codeName}
                  </div>
                </div>
                <div className={`text-lg font-rajdhani ${getStatusColor(selectedWarrior.status)}`}>
                  STATUS: {selectedWarrior.status}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Physical Description */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-red-400 mb-4 font-orbitron flex items-center">
                      <Eye className="w-5 h-5 mr-2" />
                      PHYSICAL PROFILE
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-green-400">Height:</span> {selectedWarrior.physicalDescription.height}</div>
                      <div><span className="text-green-400">Hair:</span> {selectedWarrior.physicalDescription.hair}</div>
                      <div><span className="text-green-400">Eyes:</span> {selectedWarrior.physicalDescription.eyes}</div>
                      <div><span className="text-green-400">Build:</span> {selectedWarrior.physicalDescription.build}</div>
                      <div>
                        <span className="text-green-400">Features:</span>
                        <ul className="mt-1 ml-4">
                          {selectedWarrior.physicalDescription.distinguishingFeatures.map((feature, i) => (
                            <li key={i} className="text-gray-300">• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Lyoko Appearance */}
                  <div>
                    <h3 className="text-xl font-bold text-red-400 mb-4 font-orbitron flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      LYOKO CONFIGURATION
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-green-400">Outfit:</span> {selectedWarrior.lyokoAppearance.outfit}</div>
                      <div><span className="text-green-400">Colors:</span> {selectedWarrior.lyokoAppearance.colors.join(', ')}</div>
                      <div><span className="text-green-400">Weapon:</span> {selectedWarrior.lyokoAppearance.weapon}</div>
                      <div>
                        <span className="text-green-400">Abilities:</span>
                        <ul className="mt-1 ml-4">
                          {selectedWarrior.lyokoAppearance.specialAbilities.map((ability, i) => (
                            <li key={i} className="text-gray-300">• {ability}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats and Info */}
                <div className="space-y-6">
                  {/* Combat Stats */}
                  <div>
                    <h3 className="text-xl font-bold text-red-400 mb-4 font-orbitron flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      COMBAT ANALYSIS
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(selectedWarrior.stats).map(([stat, value]) => (
                        <div key={stat}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-green-400 capitalize">{stat}</span>
                            <span className="text-red-400">{value}/10</span>
                          </div>
                          <StatBar value={value} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Personality */}
                  <div>
                    <h3 className="text-xl font-bold text-red-400 mb-4 font-orbitron flex items-center">
                      <Brain className="w-5 h-5 mr-2" />
                      PSYCHOLOGICAL PROFILE
                    </h3>
                    <ul className="space-y-1 text-sm">
                      {selectedWarrior.personality.map((trait, i) => (
                        <li key={i} className="text-gray-300">• {trait}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Relationships */}
                  <div>
                    <h3 className="text-xl font-bold text-red-400 mb-4 font-orbitron flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      RELATIONSHIPS
                    </h3>
                    <p className="text-gray-300 text-sm">{selectedWarrior.relationship}</p>
                  </div>
                </div>
              </div>

              {/* Backstory */}
              <div className="mt-8 pt-6 border-t border-green-500/20">
                <h3 className="text-xl font-bold text-red-400 mb-4 font-orbitron">
                  CLASSIFIED BACKGROUND
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{selectedWarrior.backstory}</p>
              </div>

              {/* Mission Stats */}
              <div className="mt-6 pt-6 border-t border-green-500/20 flex justify-between text-sm">
                <div className="text-green-400">
                  EPISODES ACTIVE: <span className="text-white">{selectedWarrior.episodes}</span>
                </div>
                <div className="text-green-400">
                  AGE: <span className="text-white">{selectedWarrior.age}</span>
                </div>
                <div className="text-green-400">
                  THREAT LEVEL: <span className="text-red-400">CLASSIFIED</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}