import { useState } from 'react'
import DigitalRain from './components/DigitalRain'
import XanaLogo from './components/XanaLogo'
import Navigation from './components/Navigation'
import MainArchive from './components/MainArchive'
import LoreDatabase from './components/LoreDatabase'
import EventsTimeline from './components/EventsTimeline'
import MemoryFragments from './components/MemoryFragments'
import XanaManifestations from './components/XanaManifestations'
import LyokoSectors from './components/LyokoSectors'

function App() {
  const [activeSection, setActiveSection] = useState('archive')

  const renderSection = () => {
    switch (activeSection) {
      case 'archive':
        return <MainArchive />
      case 'lore':
        return <LoreDatabase />
      case 'timeline':
        return <EventsTimeline />
      case 'memories':
        return <MemoryFragments />
      case 'manifestations':
        return <XanaManifestations />
      case 'sectors':
        return <LyokoSectors />
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
        <main className={activeSection === 'archive' ? "container mx-auto px-4 pb-12" : ""}>
          {activeSection === 'archive' ? (
            <div className="max-w-6xl mx-auto">
              {renderSection()}
            </div>
          ) : (
            renderSection()
          )}
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