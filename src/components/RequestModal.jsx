import { useState } from 'react'

const RequestModal = ({ warehouse, pricing, onClose }) => {
  const [step, setStep] = useState(1) // 1 = brief, 2 = sent confirmation
  const [sent, setSent] = useState(false)

  // Editable brief fields, pre-filled from assumed profile
  const [volume, setVolume] = useState('2,000')
  const [units, setUnits] = useState('1.4')
  const [sku, setSku] = useState('85')
  const [channels, setChannels] = useState(['Shopify / DTC', 'Amazon FBA prep'])
  const [vertical, setVertical] = useState('Apparel')
  const [startDate, setStartDate] = useState('Within 30 days')
  const [notes, setNotes] = useState('')

  const city = warehouse.address.split(',').slice(1, 2).join(',').trim()
  const channelOptions = ['Shopify / DTC', 'Amazon FBA prep', 'Amazon SFP', 'Walmart', 'TikTok Shop', 'Wholesale']
  const verticalOptions = ['Apparel', 'F&B', 'Beauty', 'Supplements', 'Electronics', 'Big & bulky']

  const toggleChannel = (c) => {
    setChannels(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
  }

  const handleSend = () => {
    setSent(true)
    setTimeout(() => setStep(2), 150)
  }

  return (
    <div onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(10, 37, 64, 0.4)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      zIndex: 200,
      display: 'flex', justifyContent: 'flex-end',
      animation: 'fadeIn 200ms ease-out',
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .arca-modal-input {
          width: 100%; padding: 10px 12px;
          border: 1px solid #E8E8ED; border-radius: 8px;
          font-size: 13px; color: #1D1D1F;
          font-family: inherit; background: white;
          transition: all 200ms; outline: none;
          letter-spacing: -0.01em;
        }
        .arca-modal-input:focus { border-color: #0A2540; box-shadow: 0 0 0 3px rgba(10,37,64,0.08); }
        .arca-modal-chip {
          padding: 7px 13px; border-radius: 999px;
          border: 1px solid #E8E8ED; background: white;
          font-size: 12px; font-weight: 500; color: #1D1D1F;
          cursor: pointer; transition: all 200ms;
          letter-spacing: -0.01em; font-family: inherit;
        }
        .arca-modal-chip:hover { border-color: #1D1D1F; }
        .arca-modal-chip-active {
          background: #1D1D1F !important; color: white !important;
          border-color: #1D1D1F !important;
        }
        .arca-send:hover { background: #061A30 !important; }
      `}</style>

      <div onClick={e => e.stopPropagation()} style={{
        width: '520px',
        height: '100vh',
        background: '#FAFAFA',
        overflowY: 'auto',
        animation: 'slideIn 280ms cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '-20px 0 60px rgba(10,37,64,0.15)',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'white',
          borderBottom: '1px solid #E8E8ED',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, zIndex: 1,
        }}>
          <div>
            <div style={{fontSize: '11px', fontWeight: '600', color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em'}}>
              {step === 1 ? 'Send request to' : 'Request sent'}
            </div>
            <div style={{fontSize: '17px', fontWeight: '600', color: '#1D1D1F', letterSpacing: '-0.02em', marginTop: '2px'}}>
              {city}, TX 3PL
            </div>
          </div>
          <button onClick={onClose} style={{
            background: '#F5F5F7', border: 'none',
            width: '32px', height: '32px', borderRadius: '50%',
            cursor: 'pointer', fontSize: '16px', color: '#86868B',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>
        </div>

        {step === 1 && (
          <div style={{padding: '24px'}}>

            {/* Anchor: estimate */}
            <div style={{
              padding: '16px',
              background: 'linear-gradient(135deg, #0A2540 0%, #1E3A5F 100%)',
              borderRadius: '12px',
              color: 'white',
              marginBottom: '24px',
            }}>
              <div style={{fontSize: '10px', fontWeight: '600', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px'}}>
                Arca estimate (anchor)
              </div>
              <div style={{fontSize: '24px', fontWeight: '700', letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums'}}>
                ${pricing.userLow.toFixed(2)}–${pricing.userHigh.toFixed(2)}
                <span style={{fontSize: '13px', fontWeight: '500', color: 'rgba(255,255,255,0.7)', marginLeft: '8px'}}>per order</span>
              </div>
              <div style={{fontSize: '12px', color: 'rgba(255,255,255,0.65)', marginTop: '6px', lineHeight: 1.5}}>
                Calculated from their published ranges + your profile. They'll counter or accept within ~{pricing.responseHr}hr. Their quotes typically land within ±{pricing.accuracy}%.
              </div>
            </div>

            {/* Brief form */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              border: '1px solid #E8E8ED',
              padding: '20px',
              marginBottom: '16px',
            }}>
              <h3 style={{fontSize: '14px', fontWeight: '600', color: '#1D1D1F', margin: '0 0 4px', letterSpacing: '-0.01em'}}>Your brief</h3>
              <p style={{fontSize: '12px', color: '#86868B', margin: '0 0 20px'}}>Pre-filled from your profile. Edit if needed before sending.</p>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px'}}>
                <Field label="Monthly volume">
                  <input className="arca-modal-input" value={volume} onChange={e => setVolume(e.target.value)} />
                </Field>
                <Field label="Avg units / order">
                  <input className="arca-modal-input" value={units} onChange={e => setUnits(e.target.value)} />
                </Field>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px'}}>
                <Field label="Active SKUs">
                  <input className="arca-modal-input" value={sku} onChange={e => setSku(e.target.value)} />
                </Field>
                <Field label="Vertical">
                  <select className="arca-modal-input" value={vertical} onChange={e => setVertical(e.target.value)} style={{cursor: 'pointer'}}>
                    {verticalOptions.map(v => <option key={v}>{v}</option>)}
                  </select>
                </Field>
              </div>

              <Field label="Sales channels">
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px'}}>
                  {channelOptions.map(c => (
                    <button key={c} className={`arca-modal-chip ${channels.includes(c) ? 'arca-modal-chip-active' : ''}`} onClick={() => toggleChannel(c)}>
                      {c}
                    </button>
                  ))}
                </div>
              </Field>

              <div style={{marginTop: '14px', marginBottom: '14px'}}>
                <Field label="Target start">
                  <select className="arca-modal-input" value={startDate} onChange={e => setStartDate(e.target.value)} style={{cursor: 'pointer'}}>
                    <option>ASAP</option>
                    <option>Within 30 days</option>
                    <option>Within 60 days</option>
                    <option>Within 90 days</option>
                    <option>Exploring</option>
                  </select>
                </Field>
              </div>

              <Field label="Anything special they should know? (optional)">
                <textarea className="arca-modal-input" rows={3} value={notes} onChange={e => setNotes(e.target.value)}
                  placeholder="Fragile items, peak season volume, custom packaging..."
                  style={{resize: 'vertical', fontFamily: 'inherit'}}/>
              </Field>
            </div>

            {/* What happens next */}
            <div style={{
              padding: '14px 16px',
              background: '#F0F9FF',
              border: '1px solid #BAE6FD',
              borderRadius: '10px',
              marginBottom: '20px',
            }}>
              <div style={{fontSize: '12px', fontWeight: '600', color: '#0C4A6E', marginBottom: '6px'}}>What happens next</div>
              <div style={{fontSize: '12px', color: '#075985', lineHeight: 1.55}}>
                The 3PL gets your brief plus Arca's estimate as the anchor. They respond with: <strong>(a)</strong> accept at estimate, <strong>(b)</strong> counter with explanation, or <strong>(c)</strong> decline. You'll see their response in your dashboard within ~{pricing.responseHr}hr.
              </div>
            </div>

            {/* Send */}
            <button className="arca-send" onClick={handleSend} style={{
              width: '100%', padding: '14px',
              background: '#0A2540', color: 'white', border: 'none',
              borderRadius: '12px', fontSize: '15px', fontWeight: '600',
              cursor: 'pointer', letterSpacing: '-0.01em',
              fontFamily: 'inherit', transition: 'all 200ms',
            }}>
              Send request to {city}, TX 3PL
            </button>
            <div style={{fontSize: '11px', color: '#86868B', textAlign: 'center', marginTop: '10px', letterSpacing: '-0.01em'}}>
              No commitment. You'll review their quote before anything moves forward.
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{padding: '48px 24px', textAlign: 'center'}}>
            <div style={{
              width: '64px', height: '64px',
              background: '#34C759',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 8px 24px rgba(52,199,89,0.3)',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 style={{fontSize: '20px', fontWeight: '600', color: '#1D1D1F', letterSpacing: '-0.02em', margin: '0 0 8px'}}>Request sent</h3>
            <p style={{fontSize: '14px', color: '#86868B', margin: '0 0 24px', lineHeight: 1.5, maxWidth: '360px', marginLeft: 'auto', marginRight: 'auto'}}>
              {city}, TX 3PL will respond within ~{pricing.responseHr}hr. We'll notify you when their quote lands.
            </p>
            <div style={{
              padding: '16px',
              background: 'white',
              borderRadius: '12px',
              border: '1px solid #E8E8ED',
              textAlign: 'left',
              marginBottom: '20px',
            }}>
              <div style={{fontSize: '11px', fontWeight: '600', color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px'}}>Anchor sent</div>
              <div style={{fontSize: '16px', fontWeight: '600', color: '#1D1D1F', letterSpacing: '-0.02em'}}>
                ${pricing.userLow.toFixed(2)}–${pricing.userHigh.toFixed(2)} <span style={{fontSize: '12px', color: '#86868B', fontWeight: '500'}}>per order</span>
              </div>
              <div style={{fontSize: '12px', color: '#86868B', marginTop: '6px'}}>
                {volume} orders/mo · {vertical} · {channels.length} channels
              </div>
            </div>
            <button onClick={onClose} style={{
              padding: '12px 24px',
              background: 'white', color: '#1D1D1F',
              border: '1px solid #E8E8ED', borderRadius: '10px',
              fontSize: '14px', fontWeight: '600',
              cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '-0.01em',
            }}>Keep browsing</button>
          </div>
        )}
      </div>
    </div>
  )
}

const Field = ({ label, children }) => (
  <div>
    <label style={{
      display: 'block', fontSize: '11px', fontWeight: '600',
      color: '#1D1D1F', marginBottom: '6px', letterSpacing: '-0.01em',
      textTransform: 'uppercase', letterSpacing: '0.04em',
    }}>{label}</label>
    {children}
  </div>
)

export default RequestModal