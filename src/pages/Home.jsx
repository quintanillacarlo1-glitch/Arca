import { useState, useRef, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { useProfile } from '../context/ProfileContext'
import WarehouseMapCDN from '../components/WarehouseMapCDN'
import RequestModal from '../components/RequestModal'
import ProfileWidget from '../components/ProfileWidget'
import HeroBackground from '../components/HeroBackground'
import PricingTicker from '../components/PricingTicker'

const filters = ['All', 'Available now', 'Apparel', 'F&B', 'Beauty', 'Supplements', 'Big & bulky']

const warehouseImages = [
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80',
  'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=800&q=80',
  'https://images.unsplash.com/photo-1565891741441-64926e441838?w=800&q=80',
  'https://images.unsplash.com/photo-1494412519320-aa613df615a8?w=800&q=80',
  'https://images.unsplash.com/photo-1571733039163-21257ee8a39b?w=800&q=80',
  'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80',
  'https://images.unsplash.com/photo-1620472843455-3c92e6a25901?w=800&q=80',
  'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
]

const seeded = (id, salt) => {
  const x = Math.sin(id * 9301 + salt * 49297) * 233280
  return x - Math.floor(x)
}

const pricingFor = (w) => {
  const base = w.price
  const ppLow = +(base * 0.78).toFixed(2)
  const ppHigh = +(base * 1.18).toFixed(2)
  const ppAvg = +(base * (0.92 + seeded(w.id, 1) * 0.12)).toFixed(2)
  const stLow = +(0.45 + seeded(w.id, 2) * 0.1).toFixed(2)
  const stHigh = +(stLow * 1.85).toFixed(2)
  const stAvg = +(stLow * (1.2 + seeded(w.id, 3) * 0.35)).toFixed(2)
  const userLow = +(ppAvg * 0.91).toFixed(2)
  const userHigh = +(ppAvg * 1.09).toFixed(2)
  const userTypical = +(ppAvg * (0.97 + seeded(w.id, 4) * 0.06)).toFixed(2)
  const accuracy = Math.floor(4 + seeded(w.id, 5) * 8)
  const responseHr = Math.floor(8 + seeded(w.id, 6) * 28)
  return { ppLow, ppHigh, ppAvg, stLow, stHigh, stAvg, userLow, userHigh, userTypical, accuracy, responseHr }
}

// Animated counter for the "12" in the headline
const useRotatingNumber = (numbers, intervalMs = 2400) => {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % numbers.length), intervalMs)
    return () => clearInterval(t)
  }, [numbers.length, intervalMs])
  return numbers[idx]
}

// 3PL logos — placeholders styled to look like wordmarks
const logoNames = ['ShipBob', 'ShipMonk', 'Saddle Creek', 'Red Stag', 'ShipHero', 'Rakuten SL', 'Falcon', 'Cahoot']

const Home = () => {
  const { filteredWarehouses, loading } = useAppContext()
  const { profile } = useProfile()
  const [hoveredId, setHoveredId] = useState(null)
  const [compared, setCompared] = useState(new Set())
  const [activeFilter, setActiveFilter] = useState('All')
  const [requestTarget, setRequestTarget] = useState(null)
  const listingsRef = useRef(null)

  const rotatingNum = useRotatingNumber(['12', '8', '15', '10'], 2400)

  const handleProfileSubmit = () => {
    setTimeout(() => {
      listingsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
  }

  const toggleCompare = (id, e) => {
    e.stopPropagation()
    const next = new Set(compared)
    next.has(id) ? next.delete(id) : next.add(id)
    setCompared(next)
  }

  const openRequest = (w, e) => {
    e.stopPropagation()
    setRequestTarget(w)
  }

  if (loading) {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 68px)'}}>
        <div style={{
          width: '40px', height: '40px',
          border: '2.5px solid #E8E8ED',
          borderTopColor: '#0A2540',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}/>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div>
      <style>{`
        .arca-card { transition: all 280ms cubic-bezier(0.4, 0, 0.2, 1); }
        .arca-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(10,37,64,0.12) !important; }
        .arca-card:hover .arca-img { transform: scale(1.06); }
        .arca-img { transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1); }
        .arca-chip { transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1); }
        .arca-chip:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(10,37,64,0.08) !important; }
        .arca-cta:hover { background: #061A30 !important; }
        .arca-cmp:hover { border-color: #1D1D1F !important; }
        .arca-unlock:hover { background: #F5F5F7 !important; }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .arca-hero-fade { animation: heroFadeIn 600ms cubic-bezier(0.16, 1, 0.3, 1); }
        .arca-hero-fade-delay-1 { animation: heroFadeIn 600ms cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
        .arca-hero-fade-delay-2 { animation: heroFadeIn 700ms cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
        .arca-hero-fade-delay-3 { animation: heroFadeIn 800ms cubic-bezier(0.16, 1, 0.3, 1) 0.35s both; }
        .arca-hero-fade-delay-4 { animation: heroFadeIn 800ms cubic-bezier(0.16, 1, 0.3, 1) 0.5s both; }
        @keyframes numberFlip {
          0% { transform: translateY(8px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .rotating-num { display: inline-block; animation: numberFlip 400ms cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes bounceArrow {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(6px); opacity: 0.8; }
        }
      `}</style>

      {/* ===================== HERO ===================== */}
      {!profile && (
        <section style={{
          position: 'relative',
          minHeight: 'calc(100vh - 68px)',
          background: '#FAFAFA',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 24px 80px',
        }}>
          <HeroBackground />

          <div style={{position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '900px', width: '100%'}}>
            <div className="arca-hero-fade" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 14px',
              background: 'rgba(10,37,64,0.05)',
              border: '1px solid rgba(10,37,64,0.08)',
              borderRadius: '999px',
              fontSize: '12px', fontWeight: '600', color: '#0A2540',
              letterSpacing: '-0.01em',
              marginBottom: '28px',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#34C759', boxShadow: '0 0 0 2px rgba(52,199,89,0.2)',
                animation: 'dotPulse 2s ease-in-out infinite',
              }}/>
              100+ verified 3PLs · 2,847 quotes sent this month
            </div>

            <h1 className="arca-hero-fade-delay-1" style={{
              fontSize: 'clamp(40px, 6vw, 68px)',
              fontWeight: '700',
              color: '#0A2540',
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
              margin: '0 0 20px',
            }}>
              Stop calling <span key={rotatingNum} className="rotating-num" style={{color: '#0A2540'}}>{rotatingNum}</span> 3PLs.
              <br/>
              <span style={{color: '#86868B', fontWeight: '600'}}>Real numbers. Real 3PLs.</span>
            </h1>

            <p className="arca-hero-fade-delay-2" style={{
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              color: '#1D1D1F',
              letterSpacing: '-0.01em',
              lineHeight: 1.55,
              maxWidth: '560px',
              margin: '0 auto 32px',
            }}>
              Published pricing from <strong style={{color: '#0A2540'}}>100+ verified 3PLs</strong>. Personalized estimates in 90 seconds. Firm quotes in 24 hours.
            </p>

            {/* LIVE PRICING TICKER */}
            <div className="arca-hero-fade-delay-3" style={{marginBottom: '36px'}}>
              <PricingTicker />
            </div>

            <div className="arca-hero-fade-delay-3">
              <ProfileWidget variant="hero" onSubmit={handleProfileSubmit} />
            </div>

            <div className="arca-hero-fade-delay-4" style={{
              marginTop: '24px',
              fontSize: '12px', color: '#86868B', letterSpacing: '-0.01em',
              display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap',
            }}>
              <span>✓ Free to browse</span>
              <span>✓ No sales calls</span>
              <span>✓ Quotes within 24hr</span>
            </div>
          </div>

          {/* Scroll hint — animated chevron */}
          <div style={{
            position: 'absolute', bottom: '32px',
            animation: 'bounceArrow 2s ease-in-out infinite',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </section>
      )}

      {/* ===================== LOGO WALL (anonymous only) ===================== */}
      {!profile && (
        <section style={{
          background: 'white',
          padding: '48px 32px',
          borderTop: '1px solid #F0F0F2',
          borderBottom: '1px solid #F0F0F2',
        }}>
          <div style={{maxWidth: '1200px', margin: '0 auto', textAlign: 'center'}}>
            <p style={{
              fontSize: '11px', fontWeight: '700',
              color: '#86868B', textTransform: 'uppercase',
              letterSpacing: '0.12em', margin: '0 0 28px',
            }}>
              Trusted by 100+ verified 3PLs
            </p>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '40px', flexWrap: 'wrap',
              filter: 'grayscale(1)',
              opacity: 0.55,
            }}>
              {logoNames.map((name) => (
                <div key={name} style={{
                  fontSize: '20px', fontWeight: '700',
                  color: '#1D1D1F', letterSpacing: '-0.03em',
                  fontFamily: 'Inter, sans-serif',
                  whiteSpace: 'nowrap',
                }}>
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================== MARKETPLACE ===================== */}
      <section ref={listingsRef} style={{
        display: 'flex',
        height: 'calc(100vh - 68px)',
        position: 'relative',
        background: '#FAFAFA',
      }}>
        <div style={{width: '58%', overflowY: 'auto', padding: '32px 32px 120px 32px'}}>

          {profile && (
            <div style={{marginBottom: '20px'}}>
              <ProfileWidget variant="sticky" />
            </div>
          )}

          <div style={{marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
            <div>
              <h2 style={{fontSize: '28px', fontWeight: '700', color: '#1D1D1F', letterSpacing: '-0.03em', margin: 0, lineHeight: 1.1}}>
                {profile ? '3PLs matched to your profile' : 'Browse 100+ verified 3PLs'}
              </h2>
              <p style={{fontSize: '14px', color: '#86868B', fontWeight: '400', margin: '8px 0 0', letterSpacing: '-0.01em'}}>
                {filteredWarehouses.length} providers · {profile
                  ? <>estimates based on <span style={{color: '#1D1D1F', fontWeight: '500'}}>{profile.volume} · {profile.vertical}</span></>
                  : 'published pricing visible'}
              </p>
            </div>
            <div className="arca-chip" style={{
              fontSize: '13px', fontWeight: '500', color: '#1D1D1F',
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 16px', border: '1px solid #E8E8ED',
              borderRadius: '999px', background: '#FFFFFF', cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(10,37,64,0.04)',
            }}>
              Sort: Best match
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>

          <div style={{display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap'}}>
            {filters.map(f => {
              const active = activeFilter === f
              return (
                <div key={f} className="arca-chip" onClick={() => setActiveFilter(f)} style={{
                  padding: '10px 18px', borderRadius: '999px',
                  fontSize: '13px', fontWeight: '600',
                  background: active ? '#1D1D1F' : '#FFFFFF',
                  color: active ? '#FFFFFF' : '#1D1D1F',
                  border: '1px solid', borderColor: active ? '#1D1D1F' : '#E8E8ED',
                  cursor: 'pointer', letterSpacing: '-0.01em',
                  boxShadow: active ? '0 4px 12px rgba(29,29,31,0.2)' : '0 1px 3px rgba(10,37,64,0.04)',
                }}>{f}</div>
              )
            })}
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px'}}>
            {filteredWarehouses.map((w, idx) => {
              const city = w.address.split(',').slice(1, 2).join(',').trim()
              const img = warehouseImages[idx % warehouseImages.length]
              const p = pricingFor(w)
              const isCompared = compared.has(w.id)

              return (
                <div key={w.id} className="arca-card"
                  onMouseEnter={() => setHoveredId(w.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    background: '#FFFFFF', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer',
                    border: isCompared ? '1.5px solid #1D1D1F' : '1px solid #E8E8ED',
                    boxShadow: isCompared ? '0 4px 16px rgba(10,37,64,0.08)' : '0 1px 3px rgba(10,37,64,0.04)',
                  }}>
                  <div style={{aspectRatio: '4 / 3', position: 'relative', overflow: 'hidden', background: '#F5F5F7'}}>
                    <img src={img} alt={city} className="arca-img" style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}/>

                    {w.availability === 'Available Now' && (
                      <div style={{
                        position: 'absolute', top: '12px', left: '12px',
                        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
                        borderRadius: '999px', padding: '5px 11px',
                        fontSize: '11px', fontWeight: '600',
                        color: '#1D1D1F', letterSpacing: '-0.01em',
                        boxShadow: '0 2px 8px rgba(10,37,64,0.12)',
                      }}>Capacity available</div>
                    )}

                    <div className="arca-cmp" onClick={(e) => toggleCompare(w.id, e)} style={{
                      position: 'absolute', top: '12px', right: '12px',
                      display: 'flex', alignItems: 'center', gap: '6px',
                      height: '32px', padding: '0 12px',
                      background: isCompared ? '#1D1D1F' : 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(12px)', borderRadius: '999px', cursor: 'pointer',
                      border: '1px solid', borderColor: isCompared ? '#1D1D1F' : 'rgba(255,255,255,0.95)',
                      boxShadow: '0 2px 8px rgba(10,37,64,0.12)', transition: 'all 200ms',
                    }}>
                      <div style={{
                        width: '14px', height: '14px', borderRadius: '4px',
                        border: '1.5px solid', borderColor: isCompared ? '#FFFFFF' : '#1D1D1F',
                        background: isCompared ? '#FFFFFF' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {isCompared && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </div>
                      <span style={{fontSize: '12px', fontWeight: '600', color: isCompared ? '#FFFFFF' : '#1D1D1F', letterSpacing: '-0.01em'}}>Compare</span>
                    </div>
                  </div>

                  <div style={{padding: '20px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px'}}>
                      <div style={{fontSize: '17px', fontWeight: '600', color: '#1D1D1F', letterSpacing: '-0.02em'}}>{city}, TX</div>
                      <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#1D1D1F">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                        <span style={{fontSize: '13px', color: '#1D1D1F', fontWeight: '500'}}>4.9</span>
                      </div>
                    </div>

                    <div style={{fontSize: '13px', color: '#86868B', margin: '0 0 16px', lineHeight: 1.5, letterSpacing: '-0.01em'}}>
                      {w.size.toLocaleString()} sf · {w.dock_doors} docks · {w.clear_height}' clear
                    </div>

                    <div style={{
                      padding: '12px 14px', background: '#FAFAFA',
                      borderRadius: '10px', marginBottom: '12px', border: '1px solid #F0F0F2',
                    }}>
                      <div style={{fontSize: '10px', fontWeight: '600', color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px'}}>Published pricing</div>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px'}}>
                        <span style={{fontSize: '13px', color: '#1D1D1F'}}>Pick & pack</span>
                        <span style={{fontSize: '13px', color: '#1D1D1F', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em'}}>
                          ${p.ppLow.toFixed(2)}–${p.ppHigh.toFixed(2)}
                          <span style={{color: '#86868B', marginLeft: '6px'}}>· avg ${p.ppAvg.toFixed(2)}</span>
                        </span>
                      </div>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                        <span style={{fontSize: '13px', color: '#1D1D1F'}}>Storage</span>
                        <span style={{fontSize: '13px', color: '#1D1D1F', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em'}}>
                          ${p.stLow.toFixed(2)}–${p.stHigh.toFixed(2)}/cu ft
                          <span style={{color: '#86868B', marginLeft: '6px'}}>· avg ${p.stAvg.toFixed(2)}</span>
                        </span>
                      </div>
                    </div>

                    {profile ? (
                      <>
                        <div style={{
                          padding: '14px', background: 'linear-gradient(135deg, #0A2540 0%, #1E3A5F 100%)',
                          borderRadius: '10px', marginBottom: '8px', color: 'white',
                        }}>
                          <div style={{fontSize: '10px', fontWeight: '600', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px'}}>Your estimate</div>
                          <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                            <span style={{fontSize: '20px', fontWeight: '700', letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums'}}>
                              ${p.userLow.toFixed(2)}–${p.userHigh.toFixed(2)}
                            </span>
                            <span style={{fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontVariantNumeric: 'tabular-nums'}}>
                              ~${p.userTypical.toFixed(2)} typical
                            </span>
                          </div>
                          <div style={{fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '4px', letterSpacing: '-0.01em'}}>
                            per order, at your volume
                          </div>
                        </div>
                        <div style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          fontSize: '11px', color: '#86868B', marginBottom: '14px', letterSpacing: '-0.01em',
                        }}>
                          <span>Quotes within ±{p.accuracy}% of estimate</span>
                          <span>Responds in ~{p.responseHr}hr</span>
                        </div>
                      </>
                    ) : (
                      <div
                        className="arca-unlock"
                        onClick={(e) => { e.stopPropagation(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{
                          padding: '14px',
                          background: 'white',
                          border: '1px dashed #C7C7CC',
                          borderRadius: '10px',
                          marginBottom: '14px',
                          cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          transition: 'background 200ms',
                        }}>
                        <div>
                          <div style={{fontSize: '10px', fontWeight: '600', color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px'}}>Your estimate</div>
                          <div style={{fontSize: '13px', color: '#1D1D1F', fontWeight: '500', letterSpacing: '-0.01em'}}>
                            Personalize to see your cost per order
                          </div>
                        </div>
                        <div style={{
                          width: '28px', height: '28px',
                          background: '#0A2540', borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"/>
                          </svg>
                        </div>
                      </div>
                    )}

                    <button
                      className="arca-cta"
                      onClick={(e) => openRequest(w, e)}
                      disabled={!profile}
                      style={{
                        width: '100%', padding: '12px',
                        background: profile ? '#0A2540' : '#E8E8ED',
                        color: profile ? 'white' : '#86868B',
                        border: 'none',
                        borderRadius: '10px', fontSize: '14px', fontWeight: '600',
                        cursor: profile ? 'pointer' : 'not-allowed', letterSpacing: '-0.01em',
                        fontFamily: 'inherit', transition: 'background 200ms',
                      }}>
                      {profile ? 'Send request' : 'Profile required to send request'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{width: '42%', position: 'sticky', top: 0, height: '100%', padding: '32px 32px 32px 0'}}>
          <div style={{height: '100%', borderRadius: '20px', overflow: 'hidden', border: '1px solid #E8E8ED', boxShadow: '0 12px 32px rgba(10,37,64,0.08)'}}>
            <WarehouseMapCDN warehouses={filteredWarehouses} height="100%" hoveredId={hoveredId} />
          </div>
        </div>

        {compared.size > 0 && (
          <div style={{
            position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
            background: '#1D1D1F', color: 'white',
            padding: '14px 20px', borderRadius: '999px',
            boxShadow: '0 20px 40px rgba(10,37,64,0.25)',
            display: 'flex', alignItems: 'center', gap: '16px', zIndex: 100,
          }}>
            <span style={{fontSize: '14px', fontWeight: '500', letterSpacing: '-0.01em'}}>
              {compared.size} {compared.size === 1 ? '3PL' : '3PLs'} selected
              {compared.size < 2 && <span style={{color: 'rgba(255,255,255,0.5)', marginLeft: '6px'}}>(select 2–4 to compare)</span>}
            </span>
            <button disabled={compared.size < 2 || !profile} style={{
              background: (compared.size >= 2 && profile) ? '#FFFFFF' : 'rgba(255,255,255,0.15)',
              color: (compared.size >= 2 && profile) ? '#1D1D1F' : 'rgba(255,255,255,0.5)',
              border: 'none', padding: '8px 18px', borderRadius: '999px',
              fontSize: '13px', fontWeight: '600',
              cursor: (compared.size >= 2 && profile) ? 'pointer' : 'not-allowed',
              letterSpacing: '-0.01em', fontFamily: 'inherit',
            }}>Send requests to all</button>
            <button onClick={() => setCompared(new Set())} style={{
              background: 'transparent', color: 'rgba(255,255,255,0.6)',
              border: 'none', fontSize: '13px', cursor: 'pointer',
              padding: '4px 8px', fontFamily: 'inherit',
            }}>Clear</button>
          </div>
        )}

        {requestTarget && (
          <RequestModal
            warehouse={requestTarget}
            pricing={pricingFor(requestTarget)}
            onClose={() => setRequestTarget(null)}
          />
        )}
      </section>
    </div>
  )
}

export default Home