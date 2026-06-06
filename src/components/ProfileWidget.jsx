import { useState } from 'react'
import { useProfile } from '../context/ProfileContext'

const verticals = ['Apparel', 'F&B', 'Beauty', 'Supplements', 'Electronics', 'Big & bulky']
const volumes = ['<500/mo', '500-2k', '2k-10k', '10k-50k', '50k+']
const channels = ['Shopify / DTC', 'Amazon', 'Wholesale', 'Retail']

const ProfileWidget = ({ variant = 'hero', onSubmit }) => {
  const { profile, updateProfile, clearProfile } = useProfile()
  const [expanded, setExpanded] = useState(false)
  const [draft, setDraft] = useState({
    volume: '2k-10k',
    vertical: 'Apparel',
    channels: ['Shopify / DTC'],
    skus: '85',
    units: '1.4',
  })

  const toggleChannel = (c) => {
    setDraft(d => ({ ...d, channels: d.channels.includes(c) ? d.channels.filter(x => x !== c) : [...d.channels, c] }))
  }

  const handleSave = () => {
    updateProfile(draft)
    setExpanded(false)
    onSubmit?.()
  }

  // STICKY BAR (after profile is filled): tiny pill that lives above listings
  if (variant === 'sticky' && profile && !expanded) {
    return (
      <div style={{
        background: 'white',
        border: '1px solid #E8E8ED',
        borderRadius: '999px',
        padding: '8px 8px 8px 18px',
        display: 'inline-flex', alignItems: 'center', gap: '12px',
        boxShadow: '0 1px 3px rgba(10,37,64,0.04)',
      }}>
        <div style={{
          width: '7px', height: '7px', borderRadius: '50%',
          background: '#34C759', boxShadow: '0 0 0 3px rgba(52,199,89,0.15)',
        }}/>
        <div style={{fontSize: '12px', color: '#1D1D1F', display: 'flex', gap: '12px', alignItems: 'center'}}>
          <span style={{fontWeight: '600'}}>{profile.volume}</span>
          <span style={{color: '#D2D2D7'}}>·</span>
          <span>{profile.vertical}</span>
          <span style={{color: '#D2D2D7'}}>·</span>
          <span>{profile.channels.length} {profile.channels.length === 1 ? 'channel' : 'channels'}</span>
        </div>
        <button onClick={() => setExpanded(true)} style={{
          padding: '5px 12px', borderRadius: '999px',
          background: '#F5F5F7', border: 'none', color: '#1D1D1F',
          fontSize: '11px', fontWeight: '600', cursor: 'pointer',
          fontFamily: 'inherit', letterSpacing: '-0.01em',
        }}>Edit</button>
      </div>
    )
  }

  // HERO VARIANT (anonymous): the big search-bar-like widget in the hero
  if (variant === 'hero' && !profile && !expanded) {
    return (
      <div style={{
        background: 'white',
        border: '1px solid rgba(10,37,64,0.06)',
        borderRadius: '20px',
        padding: '8px',
        boxShadow: '0 24px 60px rgba(10,37,64,0.12), 0 4px 12px rgba(10,37,64,0.04)',
        display: 'flex', alignItems: 'center', gap: '4px',
        maxWidth: '780px',
        margin: '0 auto',
      }}>
        <style>{`
          .pw-segment {
            flex: 1; padding: 14px 20px;
            border-radius: 14px; cursor: pointer;
            transition: background 200ms;
            text-align: left;
          }
          .pw-segment:hover { background: #FAFAFA; }
          .pw-segment-label {
            font-size: 10px; font-weight: 700; color: #1D1D1F;
            text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;
          }
          .pw-segment-value { font-size: 13px; color: #86868B; letter-spacing: -0.01em; }
          .pw-divider { width: 1px; height: 32px; background: #E8E8ED; }
        `}</style>

        <div className="pw-segment" onClick={() => setExpanded(true)}>
          <div className="pw-segment-label">Volume</div>
          <div className="pw-segment-value">Add monthly orders</div>
        </div>
        <div className="pw-divider"/>
        <div className="pw-segment" onClick={() => setExpanded(true)}>
          <div className="pw-segment-label">Vertical</div>
          <div className="pw-segment-value">Add your category</div>
        </div>
        <div className="pw-divider"/>
        <div className="pw-segment" onClick={() => setExpanded(true)}>
          <div className="pw-segment-label">Channels</div>
          <div className="pw-segment-value">Add sales channels</div>
        </div>

        <button onClick={() => setExpanded(true)} style={{
          height: '56px', minWidth: '56px',
          padding: '0 24px',
          background: '#0A2540', color: 'white', border: 'none',
          borderRadius: '14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          fontSize: '14px', fontWeight: '600', cursor: 'pointer',
          fontFamily: 'inherit', letterSpacing: '-0.01em',
          transition: 'background 200ms',
          marginLeft: '4px',
        }} onMouseEnter={e => e.target.style.background = '#061A30'}
           onMouseLeave={e => e.target.style.background = '#0A2540'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          See estimates
        </button>
      </div>
    )
  }

  // EXPANDED — full form. Same as before. Used for both first-time fill and edit.
  return (
    <div style={{
      background: 'white',
      border: '1px solid #E8E8ED',
      borderRadius: '20px',
      padding: '28px',
      boxShadow: '0 24px 60px rgba(10,37,64,0.12), 0 4px 12px rgba(10,37,64,0.04)',
      maxWidth: '780px',
      margin: '0 auto',
    }}>
      <style>{`
        .pw-chip {
          padding: 8px 14px; border-radius: 999px;
          border: 1px solid #E8E8ED; background: white;
          font-size: 13px; font-weight: 500; color: #1D1D1F;
          cursor: pointer; transition: all 200ms;
          letter-spacing: -0.01em; font-family: inherit;
        }
        .pw-chip:hover { border-color: #1D1D1F; }
        .pw-chip-active {
          background: #1D1D1F !important; color: white !important;
          border-color: #1D1D1F !important;
        }
        .pw-input {
          padding: 10px 12px; border: 1px solid #E8E8ED; border-radius: 10px;
          font-size: 13px; color: #1D1D1F; font-family: inherit; background: white;
          outline: none; letter-spacing: -0.01em; transition: all 200ms;
          width: 100%;
        }
        .pw-input:focus { border-color: #0A2540; box-shadow: 0 0 0 3px rgba(10,37,64,0.08); }
      `}</style>

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px'}}>
        <div>
          <div style={{fontSize: '11px', fontWeight: '700', color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px'}}>
            {profile ? 'Edit profile' : '90-second profile'}
          </div>
          <h2 style={{fontSize: '20px', fontWeight: '700', color: '#1D1D1F', letterSpacing: '-0.02em', margin: 0, lineHeight: 1.2}}>
            {profile ? 'Update your shipping details' : 'Tell us about your shipping'}
          </h2>
          {!profile && (
            <p style={{fontSize: '13px', color: '#86868B', margin: '6px 0 0', letterSpacing: '-0.01em'}}>
              No email needed. Helps us compute your real cost across 100+ 3PLs.
            </p>
          )}
        </div>
        {profile && (
          <button onClick={() => setExpanded(false)} style={{
            background: '#F5F5F7', border: 'none',
            width: '32px', height: '32px', borderRadius: '50%',
            cursor: 'pointer', fontSize: '16px', color: '#86868B',
          }}>×</button>
        )}
      </div>

      <div style={{marginBottom: '16px'}}>
        <label style={{fontSize: '11px', fontWeight: '700', color: '#1D1D1F', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Monthly order volume</label>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px'}}>
          {volumes.map(v => (
            <button key={v} className={`pw-chip ${draft.volume === v ? 'pw-chip-active' : ''}`} onClick={() => setDraft(d => ({...d, volume: v}))}>{v}</button>
          ))}
        </div>
      </div>

      <div style={{marginBottom: '16px'}}>
        <label style={{fontSize: '11px', fontWeight: '700', color: '#1D1D1F', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Vertical</label>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px'}}>
          {verticals.map(v => (
            <button key={v} className={`pw-chip ${draft.vertical === v ? 'pw-chip-active' : ''}`} onClick={() => setDraft(d => ({...d, vertical: v}))}>{v}</button>
          ))}
        </div>
      </div>

      <div style={{marginBottom: '20px'}}>
        <label style={{fontSize: '11px', fontWeight: '700', color: '#1D1D1F', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Sales channels</label>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px'}}>
          {channels.map(c => (
            <button key={c} className={`pw-chip ${draft.channels.includes(c) ? 'pw-chip-active' : ''}`} onClick={() => toggleChannel(c)}>{c}</button>
          ))}
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px'}}>
        <div>
          <label style={{fontSize: '11px', fontWeight: '700', color: '#1D1D1F', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Active SKUs</label>
          <input className="pw-input" value={draft.skus} onChange={e => setDraft(d => ({...d, skus: e.target.value}))} placeholder="85" />
        </div>
        <div>
          <label style={{fontSize: '11px', fontWeight: '700', color: '#1D1D1F', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Units / order</label>
          <input className="pw-input" value={draft.units} onChange={e => setDraft(d => ({...d, units: e.target.value}))} placeholder="1.4" />
        </div>
      </div>

      <div style={{display: 'flex', gap: '10px'}}>
        <button onClick={handleSave} style={{
          flex: 1, padding: '14px',
          background: '#0A2540', color: 'white', border: 'none',
          borderRadius: '12px', fontSize: '14px', fontWeight: '600',
          cursor: 'pointer', letterSpacing: '-0.01em',
          fontFamily: 'inherit', transition: 'background 200ms',
        }} onMouseEnter={e => e.target.style.background = '#061A30'}
           onMouseLeave={e => e.target.style.background = '#0A2540'}>
          {profile ? 'Save changes' : 'See your estimates →'}
        </button>
        {profile && (
          <button onClick={() => { clearProfile(); setExpanded(false); }} style={{
            padding: '14px 20px',
            background: 'white', color: '#86868B',
            border: '1px solid #E8E8ED', borderRadius: '12px',
            fontSize: '13px', fontWeight: '500',
            cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '-0.01em',
          }}>Clear</button>
        )}
      </div>
    </div>
  )
}

export default ProfileWidget