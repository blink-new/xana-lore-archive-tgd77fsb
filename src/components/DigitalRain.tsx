import { useEffect, useState } from 'react'

const DigitalRain = () => {
  const [drops, setDrops] = useState<Array<{ id: number; left: number; duration: number; delay: number; char: string }>>([])

  useEffect(() => {
    const characters = '01XANA█▓▒░'
    const dropCount = 50
    
    const newDrops = Array.from({ length: dropCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
      char: characters[Math.floor(Math.random() * characters.length)]
    }))
    
    setDrops(newDrops)
  }, [])

  return (
    <div className="digital-rain">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="rain-drop"
          style={{
            left: `${drop.left}%`,
            animationDuration: `${drop.duration}s`,
            animationDelay: `${drop.delay}s`
          }}
        >
          {drop.char}
        </div>
      ))}
    </div>
  )
}

export default DigitalRain