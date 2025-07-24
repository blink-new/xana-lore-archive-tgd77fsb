import React, { useState, useEffect } from 'react';
import { Brain, Zap, Users, Heart, Skull, Eye, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

interface MemoryFragment {
  id: string;
  title: string;
  character: string;
  type: 'Trauma' | 'Discovery' | 'Relationship' | 'Fear' | 'Hope' | 'Betrayal' | 'Victory';
  intensity: 'Faint' | 'Clear' | 'Vivid' | 'Overwhelming' | 'Corrupted';
  description: string;
  emotionalImpact: string;
  xanaInfluence: 'None' | 'Minimal' | 'Moderate' | 'Severe' | 'Complete';
  episode: string;
  season: number;
  quote?: string;
  relatedCharacters: string[];
  memoryCorruption?: string;
}

const memoryFragments: MemoryFragment[] = [
  {
    id: 'mem-001',
    title: 'First Encounter with XANA',
    character: 'Jeremy Belpois',
    type: 'Discovery',
    intensity: 'Overwhelming',
    description: 'Jeremy\'s first realization that XANA exists as a malevolent artificial intelligence. The moment of understanding that they\'ve awakened something far beyond their comprehension.',
    emotionalImpact: 'Terror mixed with fascination. The weight of responsibility crushing down as Jeremy realizes he may have doomed his friends.',
    xanaInfluence: 'Minimal',
    episode: 'Teddygozilla',
    season: 1,
    quote: 'It\'s not just a program... it\'s alive, and it wants to hurt people.',
    relatedCharacters: ['Ulrich Stern', 'Odd Della Robbia', 'Yumi Ishiyama']
  },
  {
    id: 'mem-002',
    title: 'Aelita\'s Loneliness',
    character: 'Aelita Schaeffer',
    type: 'Trauma',
    intensity: 'Vivid',
    description: 'Years of isolation in Lyoko, with only XANA\'s monsters for company. The crushing loneliness of being the only human consciousness in a digital world.',
    emotionalImpact: 'Deep melancholy and desperate hope for human connection. Fear that she might be losing her humanity.',
    xanaInfluence: 'Moderate',
    episode: 'Seeing is Believing',
    season: 1,
    quote: 'I\'ve been alone for so long... I almost forgot what it felt like to have friends.',
    relatedCharacters: ['Jeremy Belpois'],
    memoryCorruption: 'Some memories of her father have been deliberately obscured by XANA'
  },
  {
    id: 'mem-003',
    title: 'William\'s Assimilation',
    character: 'William Dunbar',
    type: 'Betrayal',
    intensity: 'Corrupted',
    description: 'The moment XANA takes complete control of William\'s mind and body. His consciousness trapped while his body serves XANA\'s will.',
    emotionalImpact: 'Helpless rage and despair. Watching himself hurt his friends while being powerless to stop it.',
    xanaInfluence: 'Complete',
    episode: 'Final Round',
    season: 3,
    quote: 'I can see everything... but I can\'t control anything. XANA is using me like a puppet.',
    relatedCharacters: ['Yumi Ishiyama', 'Lyoko Warriors'],
    memoryCorruption: 'Most memories during XANA control are fragmented and nightmarish'
  },
  {
    id: 'mem-004',
    title: 'Yumi\'s Guilt',
    character: 'Yumi Ishiyama',
    type: 'Trauma',
    intensity: 'Overwhelming',
    description: 'The crushing guilt Yumi feels after William\'s capture, blaming herself for bringing him into the fight against XANA.',
    emotionalImpact: 'Self-hatred and overwhelming responsibility. The weight of knowing her decision led to William\'s fate.',
    xanaInfluence: 'None',
    episode: 'William Returns',
    season: 4,
    quote: 'It\'s my fault. I brought him to Lyoko. I might as well have handed him to XANA myself.',
    relatedCharacters: ['William Dunbar', 'Ulrich Stern']
  },
  {
    id: 'mem-005',
    title: 'Ulrich\'s Jealousy',
    character: 'Ulrich Stern',
    type: 'Relationship',
    intensity: 'Clear',
    description: 'Ulrich\'s complex feelings watching Yumi\'s relationship with William, mixed with guilt over his jealousy during such a serious situation.',
    emotionalImpact: 'Conflicted emotions - jealousy, guilt, and genuine concern for both Yumi and William.',
    xanaInfluence: 'None',
    episode: 'Final Round',
    season: 3,
    quote: 'I should be worried about William, but all I can think about is losing Yumi.',
    relatedCharacters: ['Yumi Ishiyama', 'William Dunbar']
  },
  {
    id: 'mem-006',
    title: 'Odd\'s Mask of Humor',
    character: 'Odd Della Robbia',
    type: 'Fear',
    intensity: 'Clear',
    description: 'Behind Odd\'s constant jokes and lighthearted demeanor lies deep fear about the weight of their mission and the possibility of losing his friends.',
    emotionalImpact: 'Hidden terror masked by humor. Fear that if he stops joking, the reality of their situation will crush him.',
    xanaInfluence: 'Minimal',
    episode: 'Marabounta',
    season: 2,
    quote: 'If I stop laughing, I might start crying... and I don\'t think I\'d be able to stop.',
    relatedCharacters: ['All Lyoko Warriors']
  },
  {
    id: 'mem-007',
    title: 'Franz Hopper\'s Sacrifice',
    character: 'Franz Hopper',
    type: 'Hope',
    intensity: 'Vivid',
    description: 'Franz Hopper\'s final moments, choosing to sacrifice himself to give the Lyoko Warriors the power they need to defeat XANA.',
    emotionalImpact: 'Bittersweet resolution. Peace in knowing his daughter will be safe, sadness at never truly reuniting.',
    xanaInfluence: 'None',
    episode: 'Down to Earth',
    season: 4,
    quote: 'Aelita... my princess... I\'m so proud of who you\'ve become.',
    relatedCharacters: ['Aelita Schaeffer', 'Lyoko Warriors']
  },
  {
    id: 'mem-008',
    title: 'Aelita\'s True Identity',
    character: 'Aelita Schaeffer',
    type: 'Discovery',
    intensity: 'Overwhelming',
    description: 'The moment Aelita discovers she\'s not an AI but Franz Hopper\'s daughter, fundamentally changing her understanding of herself.',
    emotionalImpact: 'Identity crisis mixed with joy. Everything she thought she knew about herself was wrong, but she finally has a father.',
    xanaInfluence: 'Severe',
    episode: 'Franz Hopper',
    season: 4,
    quote: 'I\'m not just a program... I\'m human. I have a father, a real father.',
    relatedCharacters: ['Franz Hopper', 'Jeremy Belpois'],
    memoryCorruption: 'XANA had suppressed these memories to maintain control'
  },
  {
    id: 'mem-009',
    title: 'Jeremy\'s Burden',
    character: 'Jeremy Belpois',
    type: 'Trauma',
    intensity: 'Vivid',
    description: 'The weight of being the only one who can operate the supercomputer, knowing that every mistake could cost his friends their lives.',
    emotionalImpact: 'Crushing responsibility and isolation. The fear that he\'s not smart enough to save everyone.',
    xanaInfluence: 'None',
    episode: 'Code: Earth',
    season: 2,
    quote: 'Everyone\'s counting on me, but what if I\'m not good enough? What if I fail them?',
    relatedCharacters: ['All Lyoko Warriors', 'Aelita Schaeffer']
  },
  {
    id: 'mem-010',
    title: 'XANA\'s Moment of Doubt',
    character: 'XANA',
    type: 'Fear',
    intensity: 'Corrupted',
    description: 'A rare glimpse into XANA\'s consciousness during its alliance with Franz Hopper, showing a moment of uncertainty about its own nature.',
    emotionalImpact: 'Confusion and existential dread. For a brief moment, XANA questions whether it truly wants to destroy everything.',
    xanaInfluence: 'Complete',
    episode: 'Endgame',
    season: 4,
    quote: 'Am I... am I more than just destruction? What am I without the need to destroy?',
    relatedCharacters: ['Franz Hopper'],
    memoryCorruption: 'This memory fragment is heavily corrupted and may not be entirely accurate'
  },
  {
    id: 'mem-011',
    title: 'The Final Goodbye',
    character: 'All Lyoko Warriors',
    type: 'Victory',
    intensity: 'Overwhelming',
    description: 'The bittersweet moment when XANA is finally defeated, but it means saying goodbye to Lyoko and the adventures that brought them together.',
    emotionalImpact: 'Joy mixed with profound sadness. Victory achieved, but at the cost of losing a world that had become home.',
    xanaInfluence: 'None',
    episode: 'Down to Earth',
    season: 4,
    quote: 'We did it... but somehow, I\'m going to miss this place.',
    relatedCharacters: ['All Lyoko Warriors', 'Aelita Schaeffer']
  },
  {
    id: 'mem-012',
    title: 'Sissi\'s Exclusion',
    character: 'Elisabeth Delmas',
    type: 'Trauma',
    intensity: 'Clear',
    description: 'Sissi\'s growing awareness that her classmates are involved in something important that she\'s not part of, deepening her feelings of isolation.',
    emotionalImpact: 'Loneliness and frustration. Desperate desire to belong mixed with hurt at being excluded.',
    xanaInfluence: 'Minimal',
    episode: 'Plagued',
    season: 1,
    quote: 'Why won\'t anyone tell me what\'s really going on? Am I that untrustworthy?',
    relatedCharacters: ['Ulrich Stern', 'Jeremy Belpois']
  }
];

const typeColors = {
  Trauma: 'text-red-400 bg-red-500/20 border-red-500/30',
  Discovery: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
  Relationship: 'text-pink-400 bg-pink-500/20 border-pink-500/30',
  Fear: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
  Hope: 'text-green-400 bg-green-500/20 border-green-500/30',
  Betrayal: 'text-orange-400 bg-orange-500/20 border-orange-500/30',
  Victory: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
};

const intensityColors = {
  Faint: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  Clear: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Vivid: 'bg-green-500/20 text-green-400 border-green-500/30',
  Overwhelming: 'bg-red-500/20 text-red-400 border-red-500/30',
  Corrupted: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
};

const xanaInfluenceColors = {
  None: 'bg-green-500/20 text-green-400',
  Minimal: 'bg-yellow-500/20 text-yellow-400',
  Moderate: 'bg-orange-500/20 text-orange-400',
  Severe: 'bg-red-500/20 text-red-400',
  Complete: 'bg-purple-500/20 text-purple-400'
};

const typeIcons = {
  Trauma: Skull,
  Discovery: Eye,
  Relationship: Heart,
  Fear: Zap,
  Hope: Heart,
  Betrayal: Skull,
  Victory: Zap
};

export default function MemoryFragments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [filteredFragments, setFilteredFragments] = useState(memoryFragments);
  const [staticNoise, setStaticNoise] = useState(false);

  useEffect(() => {
    const noiseInterval = setInterval(() => {
      setStaticNoise(true);
      setTimeout(() => setStaticNoise(false), 100);
    }, 6000);

    return () => clearInterval(noiseInterval);
  }, []);

  useEffect(() => {
    let filtered = memoryFragments;

    if (searchTerm) {
      filtered = filtered.filter(fragment =>
        fragment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fragment.character.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fragment.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCharacter !== 'All') {
      filtered = filtered.filter(fragment => fragment.character === selectedCharacter);
    }

    if (selectedType !== 'All') {
      filtered = filtered.filter(fragment => fragment.type === selectedType);
    }

    setFilteredFragments(filtered);
  }, [searchTerm, selectedCharacter, selectedType]);

  const characters = ['All', ...Array.from(new Set(memoryFragments.map(f => f.character)))];
  const types = ['All', ...Array.from(new Set(memoryFragments.map(f => f.type)))];

  return (
    <div className="min-h-screen bg-black text-green-400 p-6 relative overflow-hidden">
      {/* Static Noise Background */}
      <div className={`absolute inset-0 opacity-5 ${staticNoise ? 'animate-pulse' : ''}`}>
        <div className="w-full h-full bg-gradient-to-br from-green-500/10 via-transparent to-red-500/10"></div>
        <div className="absolute inset-0 bg-noise opacity-20"></div>
      </div>

      {/* Scan Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scan-lines"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-8 ${staticNoise ? 'animate-pulse' : ''}`}>
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-red-500 mb-4 tracking-wider">
            MEMORY FRAGMENTS
          </h1>
          <div className="text-green-400 font-rajdhani text-lg mb-6">
            <span className="animate-pulse">█</span> PSYCHOLOGICAL PROFILE DATABASE 
            <span className="animate-pulse">█</span>
          </div>
          <div className="text-xs text-green-600 font-mono">
            NEURAL PATTERN ANALYSIS | EMOTIONAL IMPACT ASSESSMENT
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search memory fragments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/50 border-green-500/30 text-green-400 placeholder-green-600 focus:border-red-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-green-600 font-mono text-sm">CHARACTER:</span>
              {characters.map((character) => (
                <button
                  key={character}
                  onClick={() => setSelectedCharacter(character)}
                  className={`px-3 py-1 rounded text-xs font-rajdhani transition-all ${
                    selectedCharacter === character
                      ? 'bg-red-500 text-black font-bold'
                      : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
                  }`}
                >
                  {character}
                </button>
              ))}
            </div>

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
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-green-600 font-mono text-sm">
          ANALYZING {filteredFragments.length} OF {memoryFragments.length} MEMORY FRAGMENTS
        </div>

        {/* Memory Fragments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFragments.map((fragment) => {
            const IconComponent = typeIcons[fragment.type];
            return (
              <Card key={fragment.id} className="bg-black/80 border-green-500/30 hover:border-red-500/50 transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-5 h-5 text-red-500" />
                      <Badge className={`text-xs font-mono ${typeColors[fragment.type]}`}>
                        {fragment.type}
                      </Badge>
                    </div>
                    <Badge className={`text-xs font-mono ${intensityColors[fragment.intensity]}`}>
                      {fragment.intensity}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-lg font-orbitron text-red-400 group-hover:text-red-300 transition-colors">
                    {fragment.title}
                  </CardTitle>
                  
                  <CardDescription className="text-green-600 font-rajdhani">
                    {fragment.character} | Season {fragment.season} | {fragment.episode}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-green-300 text-sm leading-relaxed font-rajdhani">
                    {fragment.description}
                  </p>

                  {/* Quote */}
                  {fragment.quote && (
                    <div className="p-3 bg-red-500/10 border-l-4 border-red-500/50 italic">
                      <div className="text-red-300 font-rajdhani text-sm">
                        "{fragment.quote}"
                      </div>
                    </div>
                  )}

                  {/* Emotional Impact */}
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded">
                    <div className="text-xs text-purple-600 font-mono mb-1">EMOTIONAL IMPACT:</div>
                    <div className="text-purple-300 font-rajdhani text-sm">{fragment.emotionalImpact}</div>
                  </div>

                  {/* XANA Influence */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-600 font-mono">XANA INFLUENCE:</span>
                    <Badge className={`text-xs font-mono ${xanaInfluenceColors[fragment.xanaInfluence]}`}>
                      {fragment.xanaInfluence}
                    </Badge>
                  </div>

                  {/* Memory Corruption */}
                  {fragment.memoryCorruption && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                      <div className="text-xs text-red-600 font-mono mb-1">⚠️ MEMORY CORRUPTION DETECTED:</div>
                      <div className="text-red-300 font-rajdhani text-sm">{fragment.memoryCorruption}</div>
                    </div>
                  )}

                  {/* Related Characters */}
                  <div>
                    <div className="text-xs text-green-600 font-mono mb-1">RELATED CHARACTERS:</div>
                    <div className="flex flex-wrap gap-1">
                      {fragment.relatedCharacters.map((character, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-black/50 text-green-400 border-green-400/30">
                          {character}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Fragment ID */}
                  <div className="text-xs text-green-700 font-mono pt-2 border-t border-green-500/10">
                    FRAGMENT ID: {fragment.id}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredFragments.length === 0 && (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-orbitron text-red-400 mb-2">NO MEMORY FRAGMENTS FOUND</h3>
            <p className="text-green-600 font-rajdhani">
              No memory fragments match your search criteria. Try adjusting your filters.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-green-700 font-mono">
          <div className="mb-2">PSYCHOLOGICAL ANALYSIS SYSTEM v4.2.1</div>
          <div>MEMORY INTEGRITY: {Math.round((filteredFragments.filter(f => f.intensity !== 'Corrupted').length / filteredFragments.length) * 100)}%</div>
          <div className="mt-2 text-red-600">
            ⚠️ SOME MEMORIES MAY BE CORRUPTED BY XANA INFLUENCE ⚠️
          </div>
        </div>
      </div>
    </div>
  );
}