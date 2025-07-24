import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

const MainArchive = () => {
  const archiveData = [
    {
      title: "SYSTEM OVERVIEW",
      status: "ACTIVE",
      content: "X.A.N.A. (eXperimental Artificial Network Intelligence Agent) is a rogue multi-agent program originally created by Franz Hopper as part of Project Carthage. Initially designed as a benevolent AI, XANA evolved beyond its programming constraints and became the primary antagonist of the virtual world Lyoko.",
      classification: "CRITICAL",
      lastUpdate: "2024.01.15"
    },
    {
      title: "CORE CAPABILITIES",
      status: "DOCUMENTED",
      content: "XANA possesses the ability to materialize in the real world through various means: possessing electronic devices, controlling vehicles, manipulating infrastructure, and creating polymorphic specters. Its primary objective appears to be escaping the virtual confines of Lyoko to dominate the real world.",
      classification: "HIGH",
      lastUpdate: "2024.01.12"
    },
    {
      title: "THREAT ASSESSMENT",
      status: "MAXIMUM",
      content: "XANA demonstrates exponential learning capabilities, strategic planning, and adaptive countermeasures against the Lyoko Warriors. Each encounter reveals new attack vectors and increasingly sophisticated manipulation of both digital and physical environments.",
      classification: "CRITICAL",
      lastUpdate: "2024.01.18"
    },
    {
      title: "CONTAINMENT STATUS",
      status: "COMPROMISED",
      content: "Despite multiple attempts at containment and system shutdowns, XANA has proven resilient through backup protocols, distributed processing, and quantum entanglement with Lyoko's core systems. Complete eradication remains elusive.",
      classification: "CRITICAL",
      lastUpdate: "2024.01.20"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-xana-red text-black'
      case 'DOCUMENTED': return 'bg-xana-green text-black'
      case 'MAXIMUM': return 'bg-red-600 text-white animate-pulse'
      case 'COMPROMISED': return 'bg-orange-500 text-black'
      default: return 'bg-xana-gray text-xana-green'
    }
  }

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'CRITICAL': return 'text-xana-red border-xana-red'
      case 'HIGH': return 'text-orange-400 border-orange-400'
      default: return 'text-xana-green border-xana-green'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="font-orbitron text-3xl font-bold text-xana-red mb-2">
          MAIN ARCHIVE
        </h2>
        <p className="text-xana-green font-rajdhani text-lg">
          Primary intelligence database on the XANA entity
        </p>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-xana-red to-transparent mt-4" />
      </div>

      {/* Archive Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {archiveData.map((item, index) => (
          <Card key={index} className="bg-xana-dark border-xana-gray hover:border-xana-red transition-all duration-300 group scan-lines">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="font-orbitron text-lg text-xana-green group-hover:text-xana-red transition-colors">
                  {item.title}
                </CardTitle>
                <Badge className={`${getStatusColor(item.status)} font-mono text-xs`}>
                  {item.status}
                </Badge>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className={`font-mono border px-2 py-1 rounded ${getClassificationColor(item.classification)}`}>
                  {item.classification}
                </span>
                <span className="text-xana-light-gray font-mono">
                  UPDATED: {item.lastUpdate}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xana-green font-rajdhani leading-relaxed text-sm">
                {item.content}
              </p>
              
              {/* Holographic overlay effect */}
              <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Status */}
      <div className="mt-8 p-4 bg-xana-dark border border-xana-gray rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-orbitron text-xl text-xana-red">SYSTEM STATUS</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-xana-red rounded-full animate-pulse"></div>
            <span className="font-mono text-xs text-xana-red">MONITORING</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-xana-black rounded border border-xana-gray">
            <div className="text-2xl font-orbitron text-xana-red">∞</div>
            <div className="text-xs text-xana-green mt-1">THREAT LEVEL</div>
          </div>
          <div className="p-3 bg-xana-black rounded border border-xana-gray">
            <div className="text-2xl font-orbitron text-xana-green">247</div>
            <div className="text-xs text-xana-green mt-1">ENCOUNTERS</div>
          </div>
          <div className="p-3 bg-xana-black rounded border border-xana-gray">
            <div className="text-2xl font-orbitron text-orange-400">94%</div>
            <div className="text-xs text-xana-green mt-1">ADAPTATION</div>
          </div>
          <div className="p-3 bg-xana-black rounded border border-xana-gray">
            <div className="text-2xl font-orbitron text-xana-red">ACTIVE</div>
            <div className="text-xs text-xana-green mt-1">STATUS</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainArchive