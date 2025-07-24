import { useState } from 'react'
import { Button } from './ui/button'

interface NavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const [isHovered, setIsHovered] = useState<string | null>(null)

  const sections = [
    { id: 'archive', label: 'MAIN ARCHIVE', icon: '◉' },
    { id: 'lore', label: 'LORE DATABASE', icon: '◈' },
    { id: 'timeline', label: 'EVENTS TIMELINE', icon: '◎' },
    { id: 'memories', label: 'MEMORY FRAGMENTS', icon: '◇' },
    { id: 'manifestations', label: 'MANIFESTATIONS', icon: '◆' },
    { id: 'sectors', label: 'LYOKO SECTORS', icon: '◐' },
    { id: 'warriors', label: 'LYOKO WARRIORS', icon: '⚔' },
    { id: 'interface', label: 'XANA INTERFACE', icon: '☠' }
  ]

  return (
    <nav className="w-full max-w-4xl mx-auto mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "default" : "outline"}
            className={`
              relative font-rajdhani font-semibold text-xs md:text-sm
              border-xana-gray bg-xana-dark hover:bg-xana-gray
              transition-all duration-300 group
              ${activeSection === section.id 
                ? 'bg-xana-red text-black border-xana-red shadow-lg shadow-xana-red/50' 
                : 'text-xana-green hover:text-xana-red hover:border-xana-red'
              }
              ${isHovered === section.id ? 'animate-pulse-red' : ''}
            `}
            onClick={() => onSectionChange(section.id)}
            onMouseEnter={() => setIsHovered(section.id)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <span className="mr-2 text-lg">{section.icon}</span>
            <span className="hidden sm:inline">{section.label}</span>
            <span className="sm:hidden">{section.label.split(' ')[0]}</span>
            
            {/* Scan line effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-xana-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 scan-lines" />
          </Button>
        ))}
      </div>
      
      {/* Terminal-style indicator */}
      <div className="mt-4 text-center">
        <span className="font-mono text-xs text-xana-light-gray">
          &gt; ACCESSING: {sections.find(s => s.id === activeSection)?.label || 'UNKNOWN'} 
          <span className="terminal-cursor ml-1"></span>
        </span>
      </div>
    </nav>
  )
}

export default Navigation