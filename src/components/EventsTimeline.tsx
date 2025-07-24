import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Zap, AlertTriangle, Users, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  season: number;
  episode: string;
  description: string;
  impact: 'Low' | 'Medium' | 'High' | 'Critical' | 'Catastrophic';
  category: 'Attack' | 'Evolution' | 'Discovery' | 'Alliance' | 'Defeat' | 'Manifestation';
  participants: string[];
  outcome: string;
  xanaGain?: string;
  xanaLoss?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 'event-001',
    title: 'First XANA Awakening',
    date: 'Day 1',
    season: 1,
    episode: 'Teddygozilla',
    description: 'XANA\'s first recorded attack on the real world through a possessed teddy bear. This marked the beginning of XANA\'s campaign against humanity and the discovery of Lyoko by Jeremy, Ulrich, Odd, and Yumi.',
    impact: 'Critical',
    category: 'Attack',
    participants: ['Jeremy Belpois', 'Ulrich Stern', 'Odd Della Robbia', 'Yumi Ishiyama'],
    outcome: 'XANA\'s attack was neutralized using Return to the Past',
    xanaGain: 'First successful real-world manifestation',
    xanaLoss: 'Discovery by Lyoko Warriors'
  },
  {
    id: 'event-002',
    title: 'Aelita\'s Discovery',
    date: 'Day 3',
    season: 1,
    episode: 'Seeing is Believing',
    description: 'The Lyoko Warriors discover Aelita trapped within Lyoko. XANA attempts to prevent her rescue, recognizing her as a significant threat to its operations.',
    impact: 'High',
    category: 'Discovery',
    participants: ['Aelita Schaeffer', 'Jeremy Belpois', 'Lyoko Warriors'],
    outcome: 'Aelita joins the fight against XANA',
    xanaLoss: 'Loss of exclusive Lyoko control'
  },
  {
    id: 'event-003',
    title: 'Sector 5 Revelation',
    date: 'Day 127',
    season: 2,
    episode: 'Sector 5',
    description: 'Discovery of the mysterious fifth sector of Lyoko - Carthage. XANA\'s core systems are revealed to be housed within this heavily fortified digital realm.',
    impact: 'Catastrophic',
    category: 'Discovery',
    participants: ['Lyoko Warriors', 'Aelita Schaeffer'],
    outcome: 'XANA\'s true stronghold exposed',
    xanaLoss: 'Core location compromised'
  },
  {
    id: 'event-004',
    title: 'Spectre Manifestation Protocol',
    date: 'Day 156',
    season: 2,
    episode: 'Ghost Channel',
    description: 'XANA develops the ability to create Spectres - physical manifestations that can possess humans in the real world, dramatically escalating the threat level.',
    impact: 'Catastrophic',
    category: 'Evolution',
    participants: ['Jim Moralès', 'Kadic Academy Students'],
    outcome: 'XANA gains unprecedented real-world influence',
    xanaGain: 'Physical world possession capabilities'
  },
  {
    id: 'event-005',
    title: 'Aelita\'s Materialization',
    date: 'Day 203',
    season: 2,
    episode: 'Code: Earth',
    description: 'Aelita is successfully materialized into the real world, but XANA implants a virus within her, linking her life force to its own survival.',
    impact: 'Critical',
    category: 'Evolution',
    participants: ['Aelita Schaeffer', 'Jeremy Belpois'],
    outcome: 'Aelita gains physical form but becomes XANA\'s insurance policy',
    xanaGain: 'Life insurance through Aelita virus'
  },
  {
    id: 'event-006',
    title: 'William\'s Capture',
    date: 'Day 287',
    season: 3,
    episode: 'Final Round',
    description: 'XANA successfully captures and assimilates William Dunbar, turning him into a powerful ally within Lyoko. This represents XANA\'s greatest tactical victory.',
    impact: 'Catastrophic',
    category: 'Alliance',
    participants: ['William Dunbar', 'Lyoko Warriors'],
    outcome: 'William becomes XANA\'s primary enforcer',
    xanaGain: 'Powerful human ally under complete control'
  },
  {
    id: 'event-007',
    title: 'Franz Hopper\'s Return',
    date: 'Day 312',
    season: 4,
    episode: 'Franz Hopper',
    description: 'The return of XANA\'s creator, Franz Hopper, from the digital limbo. His presence dramatically shifts the balance of power in Lyoko.',
    impact: 'Critical',
    category: 'Discovery',
    participants: ['Franz Hopper', 'Aelita Schaeffer', 'Lyoko Warriors'],
    outcome: 'New ally for Lyoko Warriors, XANA faces its creator',
    xanaLoss: 'Creator becomes active opponent'
  },
  {
    id: 'event-008',
    title: 'Kolossus Activation',
    date: 'Day 334',
    season: 4,
    episode: 'Kolossus',
    description: 'XANA activates its most powerful monster, Kolossus, a massive digital titan capable of devastating entire Lyoko sectors.',
    impact: 'Catastrophic',
    category: 'Evolution',
    participants: ['Lyoko Warriors', 'William (Xanafied)'],
    outcome: 'XANA demonstrates unprecedented destructive capability',
    xanaGain: 'Ultimate weapon deployment'
  },
  {
    id: 'event-009',
    title: 'Multi-Agent Replication',
    date: 'Day 356',
    season: 4,
    episode: 'Replika',
    description: 'XANA creates multiple Replika sectors, expanding its digital empire and demonstrating advanced replication capabilities.',
    impact: 'High',
    category: 'Evolution',
    participants: ['Lyoko Warriors'],
    outcome: 'XANA\'s digital territory expands exponentially',
    xanaGain: 'Massive territorial expansion'
  },
  {
    id: 'event-010',
    title: 'The Temporary Alliance',
    date: 'Day 378',
    season: 4,
    episode: 'Endgame',
    description: 'In an unprecedented move, XANA temporarily allies with Franz Hopper against a common threat, showing strategic thinking beyond simple destruction.',
    impact: 'Critical',
    category: 'Alliance',
    participants: ['Franz Hopper', 'XANA', 'Lyoko Warriors'],
    outcome: 'Temporary ceasefire reveals XANA\'s capacity for complex strategy',
    xanaGain: 'Demonstrated strategic intelligence'
  },
  {
    id: 'event-011',
    title: 'William\'s Liberation',
    date: 'Day 389',
    season: 4,
    episode: 'William Returns',
    description: 'William Dunbar is finally freed from XANA\'s control, dealing a significant blow to XANA\'s forces and morale.',
    impact: 'High',
    category: 'Defeat',
    participants: ['William Dunbar', 'Lyoko Warriors'],
    outcome: 'XANA loses its most powerful human ally',
    xanaLoss: 'Loss of primary enforcer and strategic asset'
  },
  {
    id: 'event-012',
    title: 'Final Confrontation',
    date: 'Day 401',
    season: 4,
    episode: 'Down to Earth',
    description: 'The ultimate battle between XANA and the Lyoko Warriors reaches its climax, determining the fate of both digital and physical worlds.',
    impact: 'Catastrophic',
    category: 'Defeat',
    participants: ['All Lyoko Warriors', 'Franz Hopper', 'Aelita Schaeffer'],
    outcome: 'XANA\'s final defeat and the end of the Lyoko saga',
    xanaLoss: 'Complete system termination'
  }
];

const impactColors = {
  Low: 'bg-green-500/20 text-green-400 border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  High: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  Catastrophic: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
};

const categoryIcons = {
  Attack: Zap,
  Evolution: Target,
  Discovery: AlertTriangle,
  Alliance: Users,
  Defeat: AlertTriangle,
  Manifestation: Zap
};

const categoryColors = {
  Attack: 'text-red-400',
  Evolution: 'text-purple-400',
  Discovery: 'text-blue-400',
  Alliance: 'text-green-400',
  Defeat: 'text-orange-400',
  Manifestation: 'text-pink-400'
};

export default function EventsTimeline() {
  const [selectedSeason, setSelectedSeason] = useState<number | 'All'>('All');
  const [filteredEvents, setFilteredEvents] = useState(timelineEvents);
  const [glitchEffect, setGlitchEffect] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 150);
    }, 7000);

    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    if (selectedSeason === 'All') {
      setFilteredEvents(timelineEvents);
    } else {
      setFilteredEvents(timelineEvents.filter(event => event.season === selectedSeason));
    }
  }, [selectedSeason]);

  const seasons = ['All', ...Array.from(new Set(timelineEvents.map(event => event.season))).sort()];

  return (
    <div className="min-h-screen bg-black text-green-400 p-6 relative overflow-hidden">
      {/* Digital Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-20 grid-rows-20 w-full h-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="border border-green-500/20"></div>
          ))}
        </div>
      </div>

      {/* Scan Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scan-lines"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-8 ${glitchEffect ? 'animate-pulse' : ''}`}>
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-red-500 mb-4 tracking-wider">
            CANONICAL EVENTS TIMELINE
          </h1>
          <div className="text-green-400 font-rajdhani text-lg mb-6">
            <span className="animate-pulse">█</span> CHRONOLOGICAL XANA ACTIVITY LOG 
            <span className="animate-pulse">█</span>
          </div>
          <div className="text-xs text-green-600 font-mono">
            TEMPORAL ANALYSIS: LYOKO CONFLICT DOCUMENTATION
          </div>
        </div>

        {/* Season Filter */}
        <div className="mb-8 flex justify-center">
          <div className="flex flex-wrap gap-2">
            {seasons.map((season) => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={`px-4 py-2 rounded font-rajdhani text-sm transition-all ${
                  selectedSeason === season
                    ? 'bg-red-500 text-black font-bold'
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
                }`}
              >
                {season === 'All' ? 'ALL SEASONS' : `SEASON ${season}`}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-red-500 to-purple-500"></div>

          {/* Events */}
          <div className="space-y-8">
            {filteredEvents.map((event, index) => {
              const IconComponent = categoryIcons[event.category];
              return (
                <div key={event.id} className="relative flex items-start">
                  {/* Timeline Node */}
                  <div className="absolute left-6 w-4 h-4 bg-red-500 rounded-full border-2 border-black z-10 animate-pulse"></div>
                  
                  {/* Event Card */}
                  <div className="ml-16 w-full">
                    <Card className="bg-black/80 border-green-500/30 hover:border-red-500/50 transition-all duration-300 group">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <IconComponent className={`w-5 h-5 ${categoryColors[event.category]}`} />
                            <Badge variant="outline" className={`text-xs font-mono ${categoryColors[event.category]} border-current/30`}>
                              {event.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs font-mono bg-blue-500/20 text-blue-400 border-blue-500/30">
                              S{event.season}
                            </Badge>
                          </div>
                          <Badge className={`text-xs font-mono ${impactColors[event.impact]}`}>
                            {event.impact} IMPACT
                          </Badge>
                        </div>
                        
                        <CardTitle className="text-xl font-orbitron text-red-400 group-hover:text-red-300 transition-colors">
                          {event.title}
                        </CardTitle>
                        
                        <CardDescription className="flex items-center gap-4 text-green-600 font-rajdhani">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {event.episode}
                          </span>
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-green-300 leading-relaxed font-rajdhani">
                          {event.description}
                        </p>

                        {/* Participants */}
                        <div>
                          <div className="text-sm text-green-600 font-mono mb-2">PARTICIPANTS:</div>
                          <div className="flex flex-wrap gap-1">
                            {event.participants.map((participant, i) => (
                              <Badge key={i} variant="outline" className="text-xs bg-black/50 text-green-400 border-green-400/30">
                                {participant}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Outcome */}
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                          <div className="text-sm text-green-600 font-mono mb-1">OUTCOME:</div>
                          <div className="text-green-300 font-rajdhani text-sm">{event.outcome}</div>
                        </div>

                        {/* XANA Gains/Losses */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {event.xanaGain && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                              <div className="text-sm text-red-600 font-mono mb-1">XANA GAIN:</div>
                              <div className="text-red-300 font-rajdhani text-sm">{event.xanaGain}</div>
                            </div>
                          )}
                          {event.xanaLoss && (
                            <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded">
                              <div className="text-sm text-orange-600 font-mono mb-1">XANA LOSS:</div>
                              <div className="text-orange-300 font-rajdhani text-sm">{event.xanaLoss}</div>
                            </div>
                          )}
                        </div>

                        {/* Event ID */}
                        <div className="text-xs text-green-700 font-mono pt-2 border-t border-green-500/10">
                          EVENT ID: {event.id} | SEASON {event.season} | EPISODE: {event.episode}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-green-700 font-mono">
          <div className="mb-2">XANA CHRONOLOGICAL DATABASE v3.1.4</div>
          <div>TEMPORAL ANALYSIS COMPLETE | {filteredEvents.length} EVENTS DOCUMENTED</div>
          <div className="mt-2 text-red-600">
            ⚠️ TIMELINE ALTERATIONS DETECTED - RETURN TO THE PAST PROTOCOLS ACTIVE ⚠️
          </div>
        </div>
      </div>
    </div>
  );
}