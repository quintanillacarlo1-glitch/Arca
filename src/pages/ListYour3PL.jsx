import { useState } from 'react'

const ListYour3PL = () => {
  const [step, setStep] = useState(1)
  const [showMorePricing, setShowMorePricing] = useState(false)
  const [data, setData] = useState({
    // Step 1
    companyName: '', yearFounded: '', warehouseCount: '', totalSqFt: '', brandCount: '',
    contactName: '', contactEmail: '', contactPhone: '', contactRole: '',
    // Step 2
    locations: [{ address: '', sqFt: '', dockDoors: '', clearHeight: '', utilization: '', acceptingClients: true, startDate: '' }],
    // Step 3
    verticals: [], channels: [], handling: [], carriers: [], wms: '',
    // Step 4 — required pricing
    ppLow: '', ppAvg: '', ppHigh: '',
    stLow: '', stAvg: '', stHigh: '',
    // Step 4 — optional pricing
    addPickLow: '', addPickAvg: '', addPickHigh: '',
    receivingLow: '', receivingAvg: '', receivingHigh: '',
    returnsLow: '', returnsAvg: '', returnsHigh: '',
    acctMgmtLow: '', acctMgmtAvg: '', acctMgmtHigh: '',
    // Step 5
    monthlyMin: '', contractLengths: [], onboardingFee: '', onboardingWeeks: '',
    // Step 6
    yearsInBusiness: '', references: '', certifications: [], insurance: '',
  })

  const update = (key, val) => setData(d => ({ ...d, [key]: val }))
  const toggleMulti = (key, val) => setData(d => ({
    ...d, [key]: d[key].includes(val) ? d[key].filter(x => x !== val) : [...d[key], val]
  }))

  // Pricing validation
  const validateRange = (low, avg, high) => {
    const l = parseFloat(low), a = parseFloat(avg), h = parseFloat(high)
    if (!l || !a || !h) return { valid: false, msg: '' }
    if (a < l || a > h) return { valid: false, msg: 'Average must fall within the range' }
    if (h / l > 2) return { valid: false, msg: `Range too wide (${(h/l).toFixed(1)}x) — max 2x spread` }
    return { valid: true, msg: 'Looks good' }
  }
  const ppValid = validateRange(data.ppLow, data.ppAvg, data.ppHigh)
  const stValid = validateRange(data.stLow, data.stAvg, data.stHigh)

  const steps = [
    'Company basics', 'Locations', 'Capabilities', 'Pricing', 'Terms', 'Proof'
  ]

  return (
    <div style={{minHeight: 'calc(100vh - 68px)', background: '#FAFAFA', padding: '40px 24px'}}>
      <style>{`
        .arca-input {
          width: 100%; padding: 12px 14px;
          border: 1px solid #E8E8ED; border-radius: 10px;
          font-size: 14px; color: #1D1D1F;
          font-family: inherit; background: white;
          transition: all 200ms; outline: none;
          letter-spacing: -0.01em;
        }
        .arca-input:focus { border-color: #0A2540; box-shadow: 0 0 0 3px rgba(10,37,64,0.08); }
        .arca-input::placeholder { color: #C7C7CC; }
        .arca-label {
          display: block; font-size: 12px; font-weight: 600;
          color: #1D1D1F; margin-bottom: 6px; letter-spacing: -0.01em;
        }
        .arca-hint { font-size: 12px; color: #86868B; margin-top: 4px; }
        .arca-chip-toggle {
          padding: 8px 14px; border-radius: 999px;
          border: 1px solid #E8E8ED; background: white;
          font-size: 13px; font-weight: 500; color: #1D1D1F;
          cursor: pointer; transition: all 200ms;
          letter-spacing: -0.01em; font-family: inherit;
        }
        .arca-chip-toggle:hover { border-color: #1D1D1F; }
        .arca-chip-active {
          background: #1D1D1F !important; color: white !important;
          border-color: #1D1D1F !important;
        }
        .arca-btn {
          padding: 12px 24px; border-radius: 10px;
          font-size: 14px; font-weight: 600; cursor: pointer;
          border: none; font-family: inherit; letter-spacing: -0.01em;
          transition: all 200ms;
        }
        .arca-btn-primary { background: #0A2540; color: white; }
        .arca-btn-primary:hover { background: #061A30; }
        .arca-btn-secondary { background: white; color: #1D1D1F; border: 1px solid #E8E8ED; }
        .arca-btn-secondary:hover { border-color: #1D1D1F; }
      `}</style>

      {/* Container */}
      <div style={{maxWidth: '760px', margin: '0 auto'}}>

        {/* Header */}
        <div style={{marginBottom: '32px'}}>
          <div style={{fontSize: '12px', fontWeight: '600', color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px'}}>
            List your 3PL on Arca
          </div>
          <h1 style={{fontSize: '32px', fontWeight: '700', color: '#1D1D1F', letterSpacing: '-0.03em', margin: 0, lineHeight: 1.15}}>
            Be discoverable to brands actively shopping for 3PLs.
          </h1>
          <p style={{fontSize: '15px', color: '#86868B', marginTop: '12px', lineHeight: 1.5, letterSpacing: '-0.01em'}}>
            Takes about 10 minutes. Your published pricing ranges set buyer expectations — we track quote-vs-published accuracy and feature accurate providers.
          </p>
        </div>

        {/* Progress */}
        <div style={{display: 'flex', gap: '8px', marginBottom: '32px'}}>
          {steps.map((label, i) => {
            const stepNum = i + 1
            const active = stepNum === step
            const done = stepNum < step
            return (
              <div key={label} style={{flex: 1}}>
                <div style={{
                  height: '4px',
                  background: done || active ? '#0A2540' : '#E8E8ED',
                  borderRadius: '2px',
                  marginBottom: '8px',
                }}/>
                <div style={{
                  fontSize: '11px', fontWeight: active ? '600' : '500',
                  color: done || active ? '#1D1D1F' : '#86868B',
                  letterSpacing: '-0.01em',
                }}>{label}</div>
              </div>
            )
          })}
        </div>

        {/* Card */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #E8E8ED',
          padding: '32px',
          boxShadow: '0 1px 3px rgba(10,37,64,0.04)',
        }}>

          {/* STEP 1: Company basics */}
          {step === 1 && (
            <div>
              <h2 style={{fontSize: '20px', fontWeight: '600', color: '#1D1D1F', margin: '0 0 4px', letterSpacing: '-0.02em'}}>Company basics</h2>
              <p style={{fontSize: '13px', color: '#86868B', margin: '0 0 24px'}}>Tell us about your operation at a high level.</p>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
                <div>
                  <label className="arca-label">Company name</label>
                  <input className="arca-input" placeholder="ShipBob, ShipMonk, etc." value={data.companyName} onChange={e => update('companyName', e.target.value)} />
                </div>
                <div>
                  <label className="arca-label">Year founded</label>
                  <input className="arca-input" placeholder="2014" value={data.yearFounded} onChange={e => update('yearFounded', e.target.value)} />
                </div>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px'}}>
                <div>
                  <label className="arca-label">Warehouses</label>
                  <input className="arca-input" placeholder="3" value={data.warehouseCount} onChange={e => update('warehouseCount', e.target.value)} />
                </div>
                <div>
                  <label className="arca-label">Total sq ft</label>
                  <input className="arca-input" placeholder="450,000" value={data.totalSqFt} onChange={e => update('totalSqFt', e.target.value)} />
                </div>
                <div>
                  <label className="arca-label">Brands fulfilling</label>
                  <input className="arca-input" placeholder="120" value={data.brandCount} onChange={e => update('brandCount', e.target.value)} />
                </div>
              </div>

              <h3 style={{fontSize: '13px', fontWeight: '600', color: '#1D1D1F', margin: '0 0 12px', letterSpacing: '-0.01em', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.05em'}}>Primary contact</h3>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
                <div>
                  <label className="arca-label">Full name</label>
                  <input className="arca-input" placeholder="Jane Smith" value={data.contactName} onChange={e => update('contactName', e.target.value)} />
                </div>
                <div>
                  <label className="arca-label">Role</label>
                  <input className="arca-input" placeholder="VP Sales" value={data.contactRole} onChange={e => update('contactRole', e.target.value)} />
                </div>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                <div>
                  <label className="arca-label">Email</label>
                  <input className="arca-input" placeholder="jane@company.com" value={data.contactEmail} onChange={e => update('contactEmail', e.target.value)} />
                </div>
                <div>
                  <label className="arca-label">Phone</label>
                  <input className="arca-input" placeholder="(555) 123-4567" value={data.contactPhone} onChange={e => update('contactPhone', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Locations */}
          {step === 2 && (
            <div>
              <h2 style={{fontSize: '20px', fontWeight: '600', color: '#1D1D1F', margin: '0 0 4px', letterSpacing: '-0.02em'}}>Warehouse locations</h2>
              <p style={{fontSize: '13px', color: '#86868B', margin: '0 0 24px'}}>Add each facility. This is how brands find you on the map.</p>

              {data.locations.map((loc, i) => (
                <div key={i} style={{
                  padding: '20px',
                  background: '#FAFAFA',
                  borderRadius: '12px',
                  border: '1px solid #F0F0F2',
                  marginBottom: '12px',
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                    <span style={{fontSize: '12px', fontWeight: '600', color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Facility {i + 1}</span>
                    {data.locations.length > 1 && (
                      <button onClick={() => {
                        update('locations', data.locations.filter((_, idx) => idx !== i))
                      }} style={{background: 'none', border: 'none', color: '#86868B', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit'}}>Remove</button>
                    )}
                  </div>

                  <div style={{marginBottom: '12px'}}>
                    <label className="arca-label">Address</label>
                    <input className="arca-input" placeholder="1234 Industrial Pkwy, Austin, TX 78744" value={loc.address} onChange={e => {
                      const next = [...data.locations]; next[i].address = e.target.value; update('locations', next)
                    }}/>
                  </div>

                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px'}}>
                    <div>
                      <label className="arca-label">Sq ft</label>
                      <input className="arca-input" placeholder="125,000" value={loc.sqFt} onChange={e => {
                        const next = [...data.locations]; next[i].sqFt = e.target.value; update('locations', next)
                      }}/>
                    </div>
                    <div>
                      <label className="arca-label">Dock doors</label>
                      <input className="arca-input" placeholder="24" value={loc.dockDoors} onChange={e => {
                        const next = [...data.locations]; next[i].dockDoors = e.target.value; update('locations', next)
                      }}/>
                    </div>
                    <div>
                      <label className="arca-label">Clear height (ft)</label>
                      <input className="arca-input" placeholder="32" value={loc.clearHeight} onChange={e => {
                        const next = [...data.locations]; next[i].clearHeight = e.target.value; update('locations', next)
                      }}/>
                    </div>
                  </div>

                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
                    <div>
                      <label className="arca-label">Current utilization %</label>
                      <input className="arca-input" placeholder="78" value={loc.utilization} onChange={e => {
                        const next = [...data.locations]; next[i].utilization = e.target.value; update('locations', next)
                      }}/>
                    </div>
                    <div>
                      <label className="arca-label">Earliest start date</label>
                      <input className="arca-input" placeholder="2026-06-15" value={loc.startDate} onChange={e => {
                        const next = [...data.locations]; next[i].startDate = e.target.value; update('locations', next)
                      }}/>
                    </div>
                  </div>

                  <div style={{marginTop: '16px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <div onClick={() => {
                      const next = [...data.locations]; next[i].acceptingClients = !next[i].acceptingClients; update('locations', next)
                    }} style={{
                      width: '40px', height: '24px',
                      background: loc.acceptingClients ? '#34C759' : '#E8E8ED',
                      borderRadius: '999px', position: 'relative',
                      cursor: 'pointer', transition: 'background 200ms',
                    }}>
                      <div style={{
                        position: 'absolute', top: '2px',
                        left: loc.acceptingClients ? '18px' : '2px',
                        width: '20px', height: '20px',
                        background: 'white', borderRadius: '50%',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                        transition: 'left 200ms',
                      }}/>
                    </div>
                    <span style={{fontSize: '13px', color: '#1D1D1F', fontWeight: '500'}}>Accepting new clients</span>
                  </div>
                </div>
              ))}

              <button onClick={() => update('locations', [...data.locations, { address: '', sqFt: '', dockDoors: '', clearHeight: '', utilization: '', acceptingClients: true, startDate: '' }])} style={{
                padding: '12px', background: 'white', border: '1px dashed #C7C7CC',
                borderRadius: '10px', width: '100%', cursor: 'pointer',
                fontSize: '13px', fontWeight: '500', color: '#1D1D1F',
                fontFamily: 'inherit', letterSpacing: '-0.01em',
              }}>+ Add another facility</button>
            </div>
          )}

          {/* STEP 3: Capabilities */}
          {step === 3 && (
            <div>
              <h2 style={{fontSize: '20px', fontWeight: '600', color: '#1D1D1F', margin: '0 0 4px', letterSpacing: '-0.02em'}}>Capabilities</h2>
              <p style={{fontSize: '13px', color: '#86868B', margin: '0 0 24px'}}>What you handle. Brands filter on these.</p>

              <ChipGroup label="Verticals served" options={['Apparel', 'F&B', 'Beauty', 'Supplements', 'Electronics', 'Big & bulky', 'Hazmat', 'Cold chain']} selected={data.verticals} onToggle={v => toggleMulti('verticals', v)} />
              <ChipGroup label="Sales channels" options={['DTC / Shopify', 'Amazon FBA prep', 'Amazon SFP', 'Walmart', 'TikTok Shop', 'Wholesale / B2B', 'Retail (EDI)']} selected={data.channels} onToggle={v => toggleMulti('channels', v)} />
              <ChipGroup label="Special handling" options={['Kitting', 'Subscription boxes', 'Returns processing', 'Custom packaging', 'Gift wrap', 'Refrigerated', 'Frozen', 'Lot tracking', 'Serial tracking', 'FDA-registered']} selected={data.handling} onToggle={v => toggleMulti('handling', v)} />
              <ChipGroup label="Carriers" options={['UPS', 'FedEx', 'USPS', 'DHL', 'Regional carriers']} selected={data.carriers} onToggle={v => toggleMulti('carriers', v)} />

              <div style={{marginTop: '20px'}}>
                <label className="arca-label">Primary WMS / integrations</label>
                <input className="arca-input" placeholder="ShipHero, ShipStation, NetSuite..." value={data.wms} onChange={e => update('wms', e.target.value)} />
              </div>
            </div>
          )}

          {/* STEP 4: Pricing */}
          {step === 4 && (
            <div>
              <h2 style={{fontSize: '20px', fontWeight: '600', color: '#1D1D1F', margin: '0 0 4px', letterSpacing: '-0.02em'}}>Published pricing</h2>
              <p style={{fontSize: '13px', color: '#86868B', margin: '0 0 20px'}}>Show the range you actually charge — including your floor for high-volume accounts and your ceiling for low-volume. Average is what most customers pay.</p>

              {/* Editorial standards callout */}
              <div style={{
                padding: '14px 16px',
                background: '#FFFBEB',
                border: '1px solid #FEF3C7',
                borderRadius: '10px',
                marginBottom: '24px',
              }}>
                <div style={{fontSize: '12px', fontWeight: '600', color: '#92400E', marginBottom: '6px', letterSpacing: '-0.01em'}}>Editorial standards</div>
                <ul style={{margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#78350F', lineHeight: 1.6}}>
                  <li>Range spread must be ≤ 2x (high ÷ low)</li>
                  <li>Average must fall between low and high</li>
                  <li>Quote-vs-published accuracy is tracked and visible to brands</li>
                </ul>
              </div>

              {/* Pick & pack */}
              <PricingRow
                label="Pick & pack" required unit="per order"
                low={data.ppLow} avg={data.ppAvg} high={data.ppHigh}
                onLow={v => update('ppLow', v)} onAvg={v => update('ppAvg', v)} onHigh={v => update('ppHigh', v)}
                valid={ppValid}
              />

              {/* Storage */}
              <PricingRow
                label="Storage" required unit="per cu ft / mo"
                low={data.stLow} avg={data.stAvg} high={data.stHigh}
                onLow={v => update('stLow', v)} onAvg={v => update('stAvg', v)} onHigh={v => update('stHigh', v)}
                valid={stValid}
              />

              {/* More pricing toggle */}
              <button onClick={() => setShowMorePricing(!showMorePricing)} style={{
                marginTop: '16px',
                width: '100%',
                padding: '12px',
                background: '#FAFAFA',
                border: '1px solid #E8E8ED',
                borderRadius: '10px',
                fontSize: '13px', fontWeight: '600',
                color: '#1D1D1F', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                fontFamily: 'inherit', letterSpacing: '-0.01em',
              }}>
                {showMorePricing ? '− Hide additional pricing' : '+ Add more pricing details (optional)'}
                <span style={{fontSize: '11px', color: '#86868B', fontWeight: '400'}}>Featured 3PLs publish full pricing</span>
              </button>

              {showMorePricing && (
                <div style={{marginTop: '16px'}}>
                  <PricingRow label="Additional pick" unit="per extra unit" low={data.addPickLow} avg={data.addPickAvg} high={data.addPickHigh} onLow={v => update('addPickLow', v)} onAvg={v => update('addPickAvg', v)} onHigh={v => update('addPickHigh', v)} valid={validateRange(data.addPickLow, data.addPickAvg, data.addPickHigh)} />
                  <PricingRow label="Receiving" unit="per pallet" low={data.receivingLow} avg={data.receivingAvg} high={data.receivingHigh} onLow={v => update('receivingLow', v)} onAvg={v => update('receivingAvg', v)} onHigh={v => update('receivingHigh', v)} valid={validateRange(data.receivingLow, data.receivingAvg, data.receivingHigh)} />
                  <PricingRow label="Returns" unit="per return" low={data.returnsLow} avg={data.returnsAvg} high={data.returnsHigh} onLow={v => update('returnsLow', v)} onAvg={v => update('returnsAvg', v)} onHigh={v => update('returnsHigh', v)} valid={validateRange(data.returnsLow, data.returnsAvg, data.returnsHigh)} />
                  <PricingRow label="Account management" unit="per month" low={data.acctMgmtLow} avg={data.acctMgmtAvg} high={data.acctMgmtHigh} onLow={v => update('acctMgmtLow', v)} onAvg={v => update('acctMgmtAvg', v)} onHigh={v => update('acctMgmtHigh', v)} valid={validateRange(data.acctMgmtLow, data.acctMgmtAvg, data.acctMgmtHigh)} />
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Terms */}
          {step === 5 && (
            <div>
              <h2 style={{fontSize: '20px', fontWeight: '600', color: '#1D1D1F', margin: '0 0 4px', letterSpacing: '-0.02em'}}>Minimums & terms</h2>
              <p style={{fontSize: '13px', color: '#86868B', margin: '0 0 24px'}}>Helps brands self-qualify before reaching out.</p>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px'}}>
                <div>
                  <label className="arca-label">Monthly minimum ($)</label>
                  <input className="arca-input" placeholder="2,500" value={data.monthlyMin} onChange={e => update('monthlyMin', e.target.value)} />
                </div>
                <div>
                  <label className="arca-label">Onboarding fee ($)</label>
                  <input className="arca-input" placeholder="500 or 0" value={data.onboardingFee} onChange={e => update('onboardingFee', e.target.value)} />
                </div>
              </div>

              <div style={{marginBottom: '20px'}}>
                <label className="arca-label">Onboarding timeline (weeks)</label>
                <input className="arca-input" placeholder="2-3" value={data.onboardingWeeks} onChange={e => update('onboardingWeeks', e.target.value)} />
              </div>

              <ChipGroup label="Contract options offered" options={['Month-to-month', '6 months', '12 months', '24+ months']} selected={data.contractLengths} onToggle={v => toggleMulti('contractLengths', v)} />
            </div>
          )}

          {/* STEP 6: Proof */}
          {step === 6 && (
            <div>
              <h2 style={{fontSize: '20px', fontWeight: '600', color: '#1D1D1F', margin: '0 0 4px', letterSpacing: '-0.02em'}}>Proof & verification</h2>
              <p style={{fontSize: '13px', color: '#86868B', margin: '0 0 24px'}}>Verified providers get featured placement and a green check on listings.</p>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px'}}>
                <div>
                  <label className="arca-label">Years in business</label>
                  <input className="arca-input" placeholder="12" value={data.yearsInBusiness} onChange={e => update('yearsInBusiness', e.target.value)} />
                </div>
                <div>
                  <label className="arca-label">Insurance coverage ($M)</label>
                  <input className="arca-input" placeholder="2" value={data.insurance} onChange={e => update('insurance', e.target.value)} />
                </div>
              </div>

              <div style={{marginBottom: '20px'}}>
                <label className="arca-label">Brand references (2-3 willing to vouch)</label>
                <textarea className="arca-input" rows={3} placeholder="Allbirds, Olipop, Magic Spoon..." value={data.references} onChange={e => update('references', e.target.value)} style={{resize: 'vertical', fontFamily: 'inherit'}}/>
                <div className="arca-hint">We'll only contact with your permission, post-signup.</div>
              </div>

              <ChipGroup label="Certifications" options={['SOC 2', 'FDA-registered', 'USDA Organic', 'cGMP', 'ISO 9001', 'C-TPAT', 'TAPA']} selected={data.certifications} onToggle={v => toggleMulti('certifications', v)} />

              <div style={{
                marginTop: '24px',
                padding: '16px',
                background: '#F0F9FF',
                border: '1px solid #BAE6FD',
                borderRadius: '10px',
              }}>
                <div style={{fontSize: '13px', fontWeight: '600', color: '#0C4A6E', marginBottom: '4px'}}>What happens next</div>
                <div style={{fontSize: '12px', color: '#075985', lineHeight: 1.6}}>
                  Submit for review. We verify business registration, insurance, and one reference call (24-48 hrs). Once verified, you're live and matched to brands. You'll get a dashboard to manage incoming quote requests.
                </div>
              </div>
            </div>
          )}

          {/* Footer nav */}
          <div style={{
            marginTop: '32px', paddingTop: '24px',
            borderTop: '1px solid #F0F0F2',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            {step > 1 ? (
              <button className="arca-btn arca-btn-secondary" onClick={() => setStep(step - 1)}>← Back</button>
            ) : <div />}

            <div style={{fontSize: '12px', color: '#86868B'}}>Step {step} of 6</div>

            {step < 6 ? (
              <button className="arca-btn arca-btn-primary" onClick={() => setStep(step + 1)}>Continue →</button>
            ) : (
              <button className="arca-btn arca-btn-primary" onClick={() => alert('Demo: submission would go to Supabase for review.')}>Submit for review</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Reusable chip group
const ChipGroup = ({ label, options, selected, onToggle }) => (
  <div style={{marginBottom: '20px'}}>
    <label className="arca-label">{label}</label>
    <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
      {options.map(opt => (
        <button
          key={opt}
          className={`arca-chip-toggle ${selected.includes(opt) ? 'arca-chip-active' : ''}`}
          onClick={() => onToggle(opt)}
        >{opt}</button>
      ))}
    </div>
  </div>
)

// Reusable pricing row with inline validation
const PricingRow = ({ label, unit, required, low, avg, high, onLow, onAvg, onHigh, valid }) => (
  <div style={{
    padding: '16px',
    background: '#FAFAFA',
    border: '1px solid #F0F0F2',
    borderRadius: '12px',
    marginBottom: '12px',
  }}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px'}}>
      <div>
        <span style={{fontSize: '14px', fontWeight: '600', color: '#1D1D1F', letterSpacing: '-0.01em'}}>{label}</span>
        {required && <span style={{fontSize: '11px', color: '#86868B', marginLeft: '8px'}}>Required</span>}
      </div>
      <span style={{fontSize: '12px', color: '#86868B'}}>{unit}</span>
    </div>

    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px'}}>
      <div>
        <label style={{fontSize: '11px', color: '#86868B', display: 'block', marginBottom: '4px'}}>Low ($)</label>
        <input className="arca-input" placeholder="0.00" value={low} onChange={e => onLow(e.target.value)} style={{padding: '10px 12px', fontSize: '13px'}}/>
      </div>
      <div>
        <label style={{fontSize: '11px', color: '#86868B', display: 'block', marginBottom: '4px'}}>Average ($)</label>
        <input className="arca-input" placeholder="0.00" value={avg} onChange={e => onAvg(e.target.value)} style={{padding: '10px 12px', fontSize: '13px'}}/>
      </div>
      <div>
        <label style={{fontSize: '11px', color: '#86868B', display: 'block', marginBottom: '4px'}}>High ($)</label>
        <input className="arca-input" placeholder="0.00" value={high} onChange={e => onHigh(e.target.value)} style={{padding: '10px 12px', fontSize: '13px'}}/>
      </div>
    </div>

    {valid.msg && (
      <div style={{
        marginTop: '10px',
        fontSize: '12px',
        color: valid.valid ? '#34C759' : '#FF3B30',
        fontWeight: '500',
        display: 'flex', alignItems: 'center', gap: '6px',
      }}>
        {valid.valid ? '✓' : '✕'} {valid.msg}
      </div>
    )}
  </div>
)

export default ListYour3PL