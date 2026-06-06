const tickerData = [
  { city: 'Austin, TX', price: '$7.92', vertical: 'Apparel', color: '#34C759' },
  { city: 'Dallas, TX', price: '$8.41', vertical: 'F&B', color: '#0A2540' },
  { city: 'Houston, TX', price: '$6.97', vertical: 'Beauty', color: '#FF9F0A' },
  { city: 'San Antonio, TX', price: '$7.60', vertical: 'Supplements', color: '#34C759' },
  { city: 'El Paso, TX', price: '$5.46', vertical: 'Apparel', color: '#0A2540' },
  { city: 'Fort Worth, TX', price: '$8.88', vertical: 'Electronics', color: '#FF9F0A' },
  { city: 'Plano, TX', price: '$7.32', vertical: 'Beauty', color: '#34C759' },
  { city: 'Lubbock, TX', price: '$6.69', vertical: 'F&B', color: '#0A2540' },
  { city: 'Corpus Christi, TX', price: '$8.06', vertical: 'Apparel', color: '#FF9F0A' },
  { city: 'Arlington, TX', price: '$7.61', vertical: 'Big & bulky', color: '#34C759' },
  { city: 'Galveston, TX', price: '$8.49', vertical: 'F&B', color: '#0A2540' },
  { city: 'Waco, TX', price: '$5.19', vertical: 'Apparel', color: '#34C759' },
]

const TickerItem = ({ item }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: '10px',
    padding: '8px 16px',
    background: 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(10,37,64,0.06)',
    borderRadius: '999px',
    marginRight: '12px',
    fontSize: '13px', letterSpacing: '-0.01em',
    flexShrink: 0,
    boxShadow: '0 1px 3px rgba(10,37,64,0.03)',
  }}>
    <span style={{
      width: '6px', height: '6px', borderRadius: '50%',
      background: item.color,
      boxShadow: `0 0 0 3px ${item.color}20`,
    }}/>
    <span style={{color: '#1D1D1F', fontWeight: '600'}}>{item.city}</span>
    <span style={{color: '#D2D2D7'}}>·</span>
    <span style={{
      color: '#0A2540', fontWeight: '700',
      fontVariantNumeric: 'tabular-nums',
    }}>{item.price}/order</span>
    <span style={{color: '#D2D2D7'}}>·</span>
    <span style={{color: '#86868B'}}>{item.vertical}</span>
  </div>
)

const PricingTicker = () => {
  // Duplicate the data to create seamless loop
  const doubled = [...tickerData, ...tickerData]

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      padding: '8px 0',
      maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
    }}>
      <style>{`
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: tickerScroll 60s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="ticker-track" style={{
        display: 'inline-flex',
        whiteSpace: 'nowrap',
      }}>
        {doubled.map((item, i) => <TickerItem key={i} item={item} />)}
      </div>
    </div>
  )
}

export default PricingTicker