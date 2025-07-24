import { useState, useEffect } from 'react'

const XanaLogo = () => {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* XANA Symbol */}
      <div className={`relative ${isGlitching ? 'animate-glitch' : ''}`}>
        <img 
          src="https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2F415t4opEBBfz2nhiYtyMlhjPM0L2%2FXANA__abce72cb.webp?alt=media&token=952ca778-b58c-4f1f-bb77-9bdda6cfe3b7"
          alt="XANA Symbol"
          className="w-24 h-24 md:w-32 md:h-32 pulse-red filter brightness-110 contrast-125"
        />
      </div>
      
      {/* XANA Title */}
      <div className="text-center">
        <h1 className={`font-orbitron text-4xl md:text-6xl font-black text-xana-red tracking-wider ${isGlitching ? 'glitch' : ''}`} data-text="X.A.N.A.">
          X.A.N.A.
        </h1>
        <p className="font-rajdhani text-lg md:text-xl text-xana-green mt-2 tracking-wide">
          LORE ARCHIVE
        </p>
        <div className="text-xs md:text-sm text-xana-light-gray mt-1 font-mono">
          &gt; MULTI-AGENT PROGRAM DATABASE
        </div>
      </div>
    </div>
  )
}

export default XanaLogo