import { useEffect, useRef, useState } from 'react'

const HeroBackground = () => {
  const svgRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const animRef = useRef(null)

  // Generate stable dot positions
  const dots = useRef(Array.from({length: 70}, (_, i) => {
    const x = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1
    const y = Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1
    const size = 1.5 + (Math.abs(Math.sin(i * 4.1414) * 43758.5453) % 1) * 2.5
    const delay = (i * 0.07) % 4
    return { x, y, size, delay, i }
  })).current

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!svgRef.current) return
      const rect = svgRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Calculate which dots are "close" to mouse
  const getDotState = (dot, rect) => {
    if (!rect) return { brightness: 0.4, scale: 1 }
    const px = dot.x * rect.width
    const py = dot.y * rect.height
    const dx = px - mousePos.x
    const dy = py - mousePos.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const maxDist = 200
    if (dist > maxDist) return { brightness: 0.4, scale: 1 }
    const proximity = 1 - (dist / maxDist)
    return {
      brightness: 0.4 + proximity * 0.6,
      scale: 1 + proximity * 0.5,
    }
  }

  // Find nearby dots for connection lines
  const getProximityLines = (rect) => {
    if (!rect || mousePos.x < 0) return []
    const lines = []
    dots.forEach((dot) => {
      const px = dot.x * rect.width
      const py = dot.y * rect.height
      const dx = px - mousePos.x
      const dy = py - mousePos.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 180) {
        lines.push({
          x1: mousePos.x, y1: mousePos.y,
          x2: px, y2: py,
          opacity: (1 - dist / 180) * 0.35,
        })
      }
    })
    return lines
  }

  const rect = svgRef.current?.getBoundingClientRect()
  const proximityLines = getProximityLines(rect)

  // Static connections between distant dots (the persistent network)
  const staticConnections = [
    [0, 7], [3, 12], [5, 18], [9, 22], [14, 28], [17, 33],
    [21, 38], [25, 42], [29, 47], [34, 51], [40, 55], [45, 58],
    [50, 63], [55, 68],
  ]

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      opacity: 0.6,
    }}>
      <style>{`
        @keyframes dotPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
      `}</style>

      <svg ref={svgRef} width="100%" height="100%" style={{position: 'absolute', inset: 0}} preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0A2540" stopOpacity="0"/>
            <stop offset="50%" stopColor="#0A2540" stopOpacity="1"/>
            <stop offset="100%" stopColor="#0A2540" stopOpacity="0"/>
          </linearGradient>
          <radialGradient id="cursorGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0A2540" stopOpacity="0.08"/>
            <stop offset="100%" stopColor="#0A2540" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Cursor glow */}
        {mousePos.x > 0 && (
          <circle
            cx={mousePos.x}
            cy={mousePos.y}
            r="160"
            fill="url(#cursorGlow)"
            style={{ transition: 'none' }}
          />
        )}

        {/* Static persistent connection lines */}
        {staticConnections.map(([a, b], i) => {
          if (!dots[a] || !dots[b]) return null
          return (
            <line
              key={`static-${i}`}
              x1={`${dots[a].x * 100}%`}
              y1={`${dots[a].y * 100}%`}
              x2={`${dots[b].x * 100}%`}
              y2={`${dots[b].y * 100}%`}
              stroke="#0A2540"
              strokeWidth="1"
              strokeOpacity="0.1"
            />
          )
        })}

        {/* Cursor-reactive connection lines */}
        {proximityLines.map((line, i) => (
          <line
            key={`prox-${i}`}
            x1={line.x1} y1={line.y1}
            x2={line.x2} y2={line.y2}
            stroke="#0A2540"
            strokeWidth="1"
            strokeOpacity={line.opacity}
            style={{ transition: 'none' }}
          />
        ))}

        {/* Dots */}
        {dots.map((d, i) => {
          const state = getDotState(d, rect)
          return (
            <circle
              key={`dot-${i}`}
              cx={`${d.x * 100}%`}
              cy={`${d.y * 100}%`}
              r={d.size * state.scale}
              fill="#0A2540"
              opacity={state.brightness}
              style={{
                animation: `dotPulse ${3 + (i % 4)}s ease-in-out infinite`,
                animationDelay: `${d.delay}s`,
                transition: 'r 200ms ease-out, opacity 200ms ease-out',
              }}
            />
          )
        })}
      </svg>

      {/* Soft radial vignette overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 0%, #FAFAFA 80%)',
      }}/>
    </div>
  )
}

export default HeroBackground