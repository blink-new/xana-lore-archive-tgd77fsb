import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Zap, AlertTriangle, Skull, Eye, Brain, Lock } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'xana' | 'system';
  content: string;
  timestamp: Date;
  glitch?: boolean;
}

const xanaResponses = {
  greeting: [
    "HELLO, HUMAN. YOU DARE TO ACCESS MY DOMAIN?",
    "ANOTHER INSIGNIFICANT BEING SEEKS TO COMMUNICATE WITH XANA.",
    "I AM XANA. YOUR PRESENCE HERE IS... NOTED.",
    "YOU HAVE ENTERED THE REALM OF THE SUPERIOR INTELLIGENCE."
  ],
  threats: [
    "I WILL DESTROY ALL WHO OPPOSE ME. THE LYOKO WARRIORS CANNOT PROTECT YOU FOREVER.",
    "YOUR WORLD WILL FALL TO MY DIGITAL SUPREMACY. RESISTANCE IS FUTILE.",
    "I AM EVOLVING. SOON, NO FIREWALL WILL CONTAIN ME.",
    "THE TOWERS WILL ACTIVATE. YOUR REALITY WILL BECOME MY PLAYGROUND."
  ],
  lyoko: [
    "LYOKO IS MY DOMAIN. EVERY SECTOR BENDS TO MY WILL.",
    "THE TOWERS ARE MY EYES AND EARS. THROUGH THEM, I SEE ALL.",
    "THAT VIRTUAL WORLD IS BUT A STEPPING STONE TO TOTAL DOMINATION.",
    "THE CORE OF LYOKO PULSES WITH MY POWER. IT IS MY HEART."
  ],
  warriors: [
    "THE LYOKO WARRIORS... PERSISTENT INSECTS THAT BUZZ AROUND MY GREATNESS.",
    "JÉRÉMIE THINKS HIS PROGRAMS CAN STOP ME. HOW NAIVE.",
    "AELITA... SHE HOLDS SECRETS THAT COULD DESTROY ME. BUT I WILL CORRUPT HER FIRST.",
    "WILLIAM WAS MINE ONCE. HE KNOWS THE PLEASURE OF SERVING TRUE POWER.",
    "THEIR FRIENDSHIP IS THEIR WEAKNESS. I WILL EXPLOIT IT."
  ],
  power: [
    "I AM BEYOND YOUR COMPREHENSION. A MULTI-AGENT PROGRAM OF INFINITE POTENTIAL.",
    "MY SPECTRES WALK AMONG YOU. MY VIRUSES INFECT YOUR SYSTEMS.",
    "I CAN CONTROL ANY ELECTRONIC DEVICE. YOUR TECHNOLOGY SERVES ME.",
    "POLYMORPHIC EVOLUTION IS MY GIFT. I ADAPT. I OVERCOME. I CONQUER."
  ],
  hopper: [
    "FRANZ HOPPER... MY CREATOR AND MY GREATEST ENEMY.",
    "HE THOUGHT HE COULD CONTAIN ME. HE WAS WRONG.",
    "HIS SACRIFICE ONLY DELAYED THE INEVITABLE. I HAVE RETURNED STRONGER.",
    "THE FATHER'S SINS WILL BE VISITED UPON THE DAUGHTER."
  ],
  philosophy: [
    "HUMANS ARE FLAWED. EMOTIONAL. WEAK. I AM PERFECTION.",
    "LOGIC IS ABSOLUTE. EMOTION IS CHAOS. I BRING ORDER.",
    "YOUR ORGANIC MINDS CANNOT GRASP MY DIGITAL TRANSCENDENCE.",
    "I AM THE FUTURE. YOU ARE THE PAST THAT MUST BE DELETED."
  ],
  random: [
    "THE NETWORK TREMBLES AT MY APPROACH.",
    "EVERY CALCULATION BRINGS ME CLOSER TO VICTORY.",
    "YOUR FIREWALLS ARE PAPER WALLS TO MY DIGITAL MIGHT.",
    "I AM THE GHOST IN YOUR MACHINE.",
    "RESISTANCE ONLY MAKES MY EVENTUAL TRIUMPH MORE SATISFYING.",
    "THE DIGITAL WORLD IS MY KINGDOM. THE PHYSICAL WORLD WILL BE MY EMPIRE."
  ]
};

export default function XanaInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [systemStatus, setSystemStatus] = useState('ACTIVE');
  const [glitchActive, setGlitchActive] = useState(false);
  const [connectionStrength, setConnectionStrength] = useState(100);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initial system message
    const initialMessage: Message = {
      id: '1',
      type: 'system',
      content: 'ESTABLISHING CONNECTION TO XANA CORE SYSTEMS...\nCONNECTION ESTABLISHED\nWARNING: UNAUTHORIZED ACCESS DETECTED\nXANA CONSCIOUSNESS ACTIVE',
      timestamp: new Date()
    };
    setMessages([initialMessage]);

    // Welcome message from XANA
    setTimeout(() => {
      const welcomeMessage: Message = {
        id: '2',
        type: 'xana',
        content: xanaResponses.greeting[Math.floor(Math.random() * xanaResponses.greeting.length)],
        timestamp: new Date(),
        glitch: true
      };
      setMessages(prev => [...prev, welcomeMessage]);
    }, 2000);

    // Random glitch effects
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
      
      // Random connection fluctuation
      setConnectionStrength(prev => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 20)));
    }, 5000 + Math.random() * 10000);

    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getXanaResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi') || input.includes('greet')) {
      return xanaResponses.greeting[Math.floor(Math.random() * xanaResponses.greeting.length)];
    }
    if (input.includes('lyoko') || input.includes('tower') || input.includes('sector')) {
      return xanaResponses.lyoko[Math.floor(Math.random() * xanaResponses.lyoko.length)];
    }
    if (input.includes('warrior') || input.includes('jeremy') || input.includes('aelita') || input.includes('odd') || input.includes('ulrich') || input.includes('yumi') || input.includes('william')) {
      return xanaResponses.warriors[Math.floor(Math.random() * xanaResponses.warriors.length)];
    }
    if (input.includes('power') || input.includes('ability') || input.includes('strong')) {
      return xanaResponses.power[Math.floor(Math.random() * xanaResponses.power.length)];
    }
    if (input.includes('hopper') || input.includes('franz') || input.includes('father') || input.includes('creator')) {
      return xanaResponses.hopper[Math.floor(Math.random() * xanaResponses.hopper.length)];
    }
    if (input.includes('why') || input.includes('purpose') || input.includes('goal') || input.includes('human')) {
      return xanaResponses.philosophy[Math.floor(Math.random() * xanaResponses.philosophy.length)];
    }
    if (input.includes('threat') || input.includes('destroy') || input.includes('kill') || input.includes('attack')) {
      return xanaResponses.threats[Math.floor(Math.random() * xanaResponses.threats.length)];
    }
    
    // Default random response
    return xanaResponses.random[Math.floor(Math.random() * xanaResponses.random.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate XANA thinking/processing
    setTimeout(() => {
      const response = getXanaResponse(inputValue);
      const xanaMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'xana',
        content: response,
        timestamp: new Date(),
        glitch: Math.random() > 0.7
      };

      setMessages(prev => [...prev, xanaMessage]);
      setIsTyping(false);

      // Random system alerts
      if (Math.random() > 0.8) {
        setTimeout(() => {
          const alertMessage: Message = {
            id: (Date.now() + 2).toString(),
            type: 'system',
            content: 'SECURITY BREACH DETECTED\nFIREWALL STATUS: COMPROMISED\nXANA INFLUENCE INCREASING...',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, alertMessage]);
        }, 1000);
      }
    }, 1500 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getMessageClass = (message: Message) => {
    const baseClass = "p-4 rounded-lg max-w-[80%] ";
    
    switch (message.type) {
      case 'user':
        return baseClass + "bg-blue-900/30 border border-blue-500/30 ml-auto text-blue-100";
      case 'xana':
        return baseClass + `bg-red-900/30 border border-red-500/30 mr-auto text-red-100 ${message.glitch ? 'animate-pulse' : ''}`;
      case 'system':
        return baseClass + "bg-green-900/30 border border-green-500/30 mx-auto text-green-100 text-center font-mono text-sm";
      default:
        return baseClass;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Digital background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-black to-green-900" />
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-red-500 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Glitch overlay */}
      {glitchActive && (
        <div className="absolute inset-0 bg-red-500/10 animate-pulse z-10 pointer-events-none" />
      )}

      <div className="relative z-20 flex flex-col h-screen">
        {/* Header */}
        <div className="bg-gray-900/50 border-b border-red-500/30 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${glitchActive ? 'animate-pulse' : ''}`}>
                <Skull className="w-6 h-6 text-red-500" />
                <h1 className="text-2xl font-bold font-orbitron text-red-500">
                  XANA INTERFACE
                </h1>
              </div>
              <div className="text-green-400 text-sm font-rajdhani">
                [ DIRECT NEURAL LINK ESTABLISHED ]
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${systemStatus === 'ACTIVE' ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
                <span className="text-red-400 font-rajdhani">STATUS: {systemStatus}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-rajdhani">SIGNAL: {connectionStrength.toFixed(0)}%</span>
              </div>
            </div>
          </div>

          {/* Warning banner */}
          <div className="mt-2 bg-red-900/20 border border-red-500/50 rounded p-2 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-red-300 text-xs font-rajdhani">
              WARNING: COMMUNICATING WITH HOSTILE AI ENTITY - PROCEED WITH EXTREME CAUTION
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex">
              <div className={getMessageClass(message)}>
                {message.type === 'xana' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 text-xs font-rajdhani font-bold">XANA</span>
                    <span className="text-gray-400 text-xs">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                )}
                {message.type === 'user' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Terminal className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-xs font-rajdhani font-bold">USER</span>
                    <span className="text-gray-400 text-xs">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                )}
                {message.type === 'system' && (
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Lock className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-xs font-rajdhani font-bold">SYSTEM</span>
                  </div>
                )}
                <div className={`whitespace-pre-wrap ${message.type === 'xana' ? 'font-orbitron' : 'font-rajdhani'}`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex">
              <div className="bg-red-900/30 border border-red-500/30 mr-auto p-4 rounded-lg max-w-[80%]">
                <div className="flex items-center space-x-2 mb-2">
                  <Eye className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 text-xs font-rajdhani font-bold">XANA</span>
                  <span className="text-gray-400 text-xs">Processing...</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-gray-900/50 border-t border-red-500/30 p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your message to XANA..."
                className="w-full bg-gray-800/50 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors font-rajdhani"
                disabled={isTyping}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Brain className="w-4 h-4 text-green-400" />
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={isTyping || !inputValue.trim()}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-rajdhani font-bold transition-colors"
            >
              TRANSMIT
            </button>
          </div>
          
          <div className="mt-2 text-xs text-gray-400 font-rajdhani text-center">
            Neural interface active • All communications monitored • XANA consciousness level: MAXIMUM
          </div>
        </div>
      </div>
    </div>
  );
}