import { useState } from 'react'
import DigitalRain from './components/DigitalRain'
import XanaLogo from './components/XanaLogo'
import Navigation from './components/Navigation'
import MainArchive from './components/MainArchive'

function App() {
  const [activeSection, setActiveSection] = useState('archive')

  const renderSection = () => {
    switch (activeSection) {
      case 'archive':
        return <MainArchive />
      case 'lore':
        return <div className="text-center text-xana-green font-rajdhani text-xl">LORE DATABASE - Coming Soon...</div>
      case 'timeline':
        return <div className="text-center text-xana-green font-rajdhani text-xl">EVENTS TIMELINE - Coming Soon...</div>
      case 'memories':
        return <div className="text-center text-xana-green font-rajdhani text-xl">MEMORY FRAGMENTS - Coming Soon...</div>
      case 'manifestations':
        return <div className="text-center text-xana-green font-rajdhani text-xl">MANIFESTATIONS - Coming Soon...</div>
      case 'sectors':
        return <div className="text-center text-xana-green font-rajdhani text-xl">LYOKO SECTORS - Coming Soon...</div>
      default:
        return <MainArchive />
    }
  }

  return (
    <div className="min-h-screen bg-black text-xana-green relative overflow-x-hidden">
      {/* Digital Rain Background */}
      <DigitalRain />
      
      {/* Circuit Board Background Pattern */}
      <div className="fixed inset-0 circuit-bg opacity-20 pointer-events-none" />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="pt-8 pb-12">
          <div className="container mx-auto px-4">
            <XanaLogo />
          </div>
        </header>

        {/* Navigation */}
        <div className="container mx-auto px-4 mb-8">
          <Navigation 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
        </div>

        {/* Content Area */}
        <main className="container mx-auto px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            {renderSection()}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-xana-gray mt-16 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xana-light-gray font-mono text-sm">
              &gt; XANA LORE ARCHIVE v2.4.7 | CLASSIFIED INTELLIGENCE DATABASE
            </p>
            <p className="text-xana-light-gray font-mono text-xs mt-2">
              WARNING: UNAUTHORIZED ACCESS WILL BE REPORTED TO LYOKO WARRIORS
            </p>
          </div>
        </footer>
      </div>

      {/* Scan Lines Overlay */}
      <div className="fixed inset-0 pointer-events-none z-20 scan-lines opacity-30" />
    </div>
  )
}

export default App