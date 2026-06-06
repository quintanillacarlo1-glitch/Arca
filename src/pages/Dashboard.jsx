import { useState } from 'react'

const mockRequests = [
  {
    id: 'REQ-2841',
    brandName: 'Olipop Co',
    vertical: 'F&B',
    volume: '2k-10k orders/mo',
    units: '1.4 units/order',
    skus: 85,
    channels: ['Shopify / DTC', 'Amazon FBA prep'],
    location: 'Austin, TX',
    startDate: 'Within 30 days',
    notes: 'Carbonated beverages, 4-pack cartons. Need refrigerated storage for sample inventory only.',
    receivedAt: '2 hours ago',
    sla: '46h remaining',
    slaUrgent: false,
    anchor: { low: 7.21, high: 8.63, typical: 7.92 },
    status: 'new',
  },
  {
    id: 'REQ-2839',
    brandName: 'Magic Spoon',
    vertical: 'F&B',
    volume: '10k-50k orders/mo',
    units: '1.8 units/order',
    skus: 12,
    channels: ['Shopify / DTC', 'Amazon FBA prep', 'Walmart'],
    location: 'Los Angeles, CA',
    startDate: 'ASAP',
    notes: 'Cereal boxes, lightweight. Looking to consolidate from current 3PL by end of quarter.',
    receivedAt: '5 hours ago',
    sla: '11h remaining',
    slaUrgent: true,
    anchor: { low: 8.08, high: 9.68, typical: 8.62 },
    status: 'new',
  },
  {
    id: 'REQ-2837',
    brandName: 'Graza',
    vertical: 'F&B',
    volume: '2k-10k orders/mo',
    units: '1.3 units/order',
    skus: 4,
    channels: ['Shopify / DTC', 'Wholesale'],
    location: 'New York, NY',
    startDate: 'Within 60 days',
    notes: 'Olive oil bottles, glass. Need careful handling, currently shipping from co-packer warehouse.',
    receivedAt: '8 hours ago',
    sla: '40h remaining',
    slaUrgent: false,
    anchor: { low: 7.41, high: 8.92, typical: 8.06 },
    status: 'new',
  },
  {
    id: 'REQ-2836',
    brandName: 'Wildwonder',
    vertical: 'F&B',
    volume: '500-2k orders/mo',
    units: '1.2 units/order',
    skus: 24,
    channels: ['Shopify / DTC'],
    location: 'San Francisco, CA',
    startDate: 'Within 60 days',
    notes: 'Functional sodas. Cold-chain preferred but ambient acceptable.',
    receivedAt: '1 day ago',
    sla: 'Responded',
    slaUrgent: false,
    anchor: { low: 6.97, high: 8.32, typical: 7.61 },
    status: 'responded',
    responseType: 'accepted',
  },
  {
    id: 'REQ-2832',
    brandName: 'Allbirds',
    vertical: 'Apparel',
    volume: '50k+ orders/mo',
    units: '1.1 units/order',
    skus: 142,
    channels: ['Shopify / DTC', 'Retail (EDI)'],
    location: 'Portland, OR',
    startDate: 'Exploring',
    notes: 'Footwear. West Coast capacity expansion. Existing east coast 3PL relationship.',
    receivedAt: '2 days ago',
    sla: 'Responded',
    slaUrgent: false,
    anchor: { low: 8.41, high: 10.06, typical: 9.18 },
    status: 'responded',
    responseType: 'countered',
  },
]

const Metric = ({ label, value, sublabel, good }) => (
  <div style={{
    padding: '18px 20px',
    background: 'white',
    borderRadius: '14px',
    border: '1px solid #E8E8ED',
    boxShadow: '0 1px 3px rgba(10,37,64,0.04)',
  }}>
    <div style={{
      fontSize: '10px',
      fontWeight: 700,
      color: '#86868B',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      marginBottom: '8px',
    }}>{label}</div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
      <span style={{
        fontSize: '26px',
        fontWeight: 700,
        color: '#0A2540',
        letterSpacing: '-0.025em',
        fontVariantNumeric: 'tabular-nums',
      }}>{value}</span>
      {good && (
        <span style={{
          fontSize: '11px',
          color: '#34C759',
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '2px',
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </span>
      )}
    </div>
    <div style={{
      fontSize: '11px',
      color: '#86868B',
      marginTop: '4px',
      letterSpacing: '-0.01em',
      lineHeight: 1.4,
    }}>{sublabel}</div>
  </div>
)

const DetailField = ({ label, value }) => (
  <div>
    <div style={{
      fontSize: '10px',
      fontWeight: 600,
      color: '#86868B',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '4px',
    }}>{label}</div>
    <div style={{
      fontSize: '13px',
      color: '#1D1D1F',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    }}>{value}</div>
  </div>
)

const SectionLabel = ({ children }) => (
  <div style={{
    fontSize: '10px',
    fontWeight: 700,
    color: '#86868B',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: '10px',
  }}>{children}</div>
)

const SuccessState = ({ onClose }) => (
  <div style={{ padding: '40px 16px', textAlign: 'center' }}>
    <div style={{
      width: '60px',
      height: '60px',
      background: '#34C759',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      boxShadow: '0 8px 24px rgba(52,199,89,0.3)',
    }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </div>
    <h3 style={{
      fontSize: '20px',
      fontWeight: 700,
      color: '#1D1D1F',
      letterSpacing: '-0.02em',
      margin: '0 0 8px',
    }}>Quote sent</h3>
    <p style={{
      fontSize: '13px',
      color: '#86868B',
      margin: '0 0 24px',
      lineHeight: 1.5,
      letterSpacing: '-0.01em',
    }}>
      The brand will see your response within minutes. Tracked against your accuracy stats.
    </p>
    <button onClick={onClose} style={{
      padding: '10px 22px',
      background: 'white',
      color: '#1D1D1F',
      border: '1px solid #E8E8ED',
      borderRadius: '10px',
      fontSize: '13px',
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'inherit',
      letterSpacing: '-0.01em',
    }}>Back to inbox</button>
  </div>
)

const Dashboard = () => {
  const [selectedId, setSelectedId] = useState(null)
  const [filter, setFilter] = useState('all')
  const [responseAction, setResponseAction] = useState(null)
  const [counterPrice, setCounterPrice] = useState('')
  const [counterReason, setCounterReason] = useState('')
  const [sentResponses, setSentResponses] = useState(new Set())

  const selectedRequest = mockRequests.find(r => r.id === selectedId)

  const filteredRequests = mockRequests.filter(r => {
    if (filter === 'all') return true
    if (filter === 'new') return r.status === 'new'
    if (filter === 'responded') return r.status === 'responded'
    return true
  })

  const newCount = mockRequests.filter(r => r.status === 'new').length
  const respondedCount = mockRequests.length - newCount

  const handleSelect = (id) => {
    setSelectedId(id)
    setResponseAction(null)
    setCounterPrice('')
    setCounterReason('')
  }

  const handleSend = () => {
    if (selectedRequest) {
      const next = new Set(sentResponses)
      next.add(selectedRequest.id)
      setSentResponses(next)
    }
  }

  const closeDetail = () => {
    setSelectedId(null)
    setResponseAction(null)
    setCounterPrice('')
    setCounterReason('')
  }

  const counterDelta = counterPrice && selectedRequest
    ? ((parseFloat(counterPrice) - selectedRequest.anchor.typical) / selectedRequest.anchor.typical * 100).toFixed(1)
    : null

  return (
    <div style={{ minHeight: 'calc(100vh - 72px)', background: '#FAFAFA' }}>
      <style>{`
        .row { transition: background 150ms ease; cursor: pointer; }
        .row:hover { background: #F5F5F7; }
        .row.selected { background: rgba(10,37,64,0.05); }
        .action-tile { transition: all 180ms ease; cursor: pointer; }
        .action-tile:hover { border-color: #1D1D1F; background: #FAFAFA; }
        .action-tile.active { background: #0A2540; color: white; border-color: #0A2540; }
        .action-tile.active .action-tile-sub { color: rgba(255,255,255,0.7); }
        .filter-pill { transition: all 180ms ease; cursor: pointer; }
        .filter-pill:hover { border-color: #1D1D1F; }
        .send-btn { transition: background 180ms ease; }
        .send-btn:hover { background: #061A30; }
        .close-btn { transition: background 150ms ease; cursor: pointer; }
        .close-btn:hover { background: #E8E8ED; }
        @keyframes slideIn {
          from { transform: translateX(24px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .detail-pane { animation: slideIn 280ms cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .new-dot { animation: pulse 2s ease-in-out infinite; }
      `}</style>

      {/* PERFORMANCE BAR */}
      <section style={{
        background: 'white',
        borderBottom: '1px solid #E8E8ED',
        padding: '28px 40px',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '24px',
          }}>
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#86868B',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '6px',
              }}>Provider dashboard</div>
              <h1 style={{
                fontSize: '26px',
                fontWeight: 700,
                color: '#0A2540',
                letterSpacing: '-0.03em',
                margin: 0,
                lineHeight: 1.1,
              }}>Austin Fulfillment Co.</h1>
              <p style={{
                fontSize: '13px',
                color: '#86868B',
                margin: '8px 0 0',
                letterSpacing: '-0.01em',
              }}>Verified provider · Apparel, F&B · Accepting new clients</p>
            </div>
            <div style={{
              padding: '7px 14px',
              background: 'rgba(52,199,89,0.08)',
              border: '1px solid rgba(52,199,89,0.2)',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#0F7B30',
              letterSpacing: '-0.01em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#34C759',
                boxShadow: '0 0 0 3px rgba(52,199,89,0.2)',
              }}/>
              Featured Provider
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '14px',
          }}>
            <Metric label="Quote accuracy" value="±6%" sublabel="of published avg · last 50 quotes" good />
            <Metric label="Response time" value="14hr" sublabel="avg · well within 48hr SLA" good />
            <Metric label="Win rate" value="38%" sublabel="quotes accepted by brands" good />
            <Metric label="Requests this month" value="47" sublabel="↑ 12 vs last month" good />
          </div>
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '32px 40px',
        display: 'flex',
        gap: '24px',
      }}>
        {/* LEFT: Inbox */}
        <div style={{
          flex: selectedRequest ? '0 0 540px' : '1',
          transition: 'flex 280ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#1D1D1F',
              letterSpacing: '-0.02em',
              margin: 0,
            }}>Incoming requests</h2>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[
                { key: 'all', label: 'All', count: mockRequests.length },
                { key: 'new', label: 'New', count: newCount },
                { key: 'responded', label: 'Responded', count: respondedCount },
              ].map(f => {
                const active = filter === f.key
                return (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className="filter-pill"
                    style={{
                      padding: '7px 14px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: active ? '#1D1D1F' : 'white',
                      color: active ? 'white' : '#1D1D1F',
                      border: '1px solid',
                      borderColor: active ? '#1D1D1F' : '#E8E8ED',
                      letterSpacing: '-0.01em',
                      fontFamily: 'inherit',
                    }}>
                    {f.label} <span style={{ opacity: 0.55, marginLeft: '4px', fontWeight: 500 }}>{f.count}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div style={{
            background: 'white',
            border: '1px solid #E8E8ED',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(10,37,64,0.04)',
          }}>
            {filteredRequests.length === 0 && (
              <div style={{
                padding: '60px 20px',
                textAlign: 'center',
                color: '#86868B',
                fontSize: '13px',
                letterSpacing: '-0.01em',
              }}>
                No requests in this view.
              </div>
            )}
            {filteredRequests.map((req, i) => {
              const isSelected = selectedId === req.id
              const isLast = i === filteredRequests.length - 1
              const isSent = sentResponses.has(req.id)
              const showNewDot = req.status === 'new' && !isSent

              return (
                <div
                  key={req.id}
                  className={`row ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(req.id)}
                  style={{
                    padding: '18px 22px',
                    borderBottom: isLast ? 'none' : '1px solid #F0F0F2',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#1D1D1F',
                        letterSpacing: '-0.015em',
                      }}>{req.brandName}</span>
                      {showNewDot && (
                        <span
                          className="new-dot"
                          style={{
                            width: '7px',
                            height: '7px',
                            borderRadius: '50%',
                            background: '#FF3B30',
                          }}/>
                      )}
                    </div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: isSent ? '#0F7B30' : (req.slaUrgent ? '#FF3B30' : '#86868B'),
                      letterSpacing: '-0.01em',
                    }}>
                      {isSent ? 'Sent' : req.sla}
                    </span>
                  </div>

                  <div style={{
                    fontSize: '12px',
                    color: '#86868B',
                    letterSpacing: '-0.01em',
                  }}>
                    {req.vertical} · {req.volume} · {req.location}
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '2px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontSize: '9px',
                        color: '#86868B',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}>Anchor</span>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#0A2540',
                        letterSpacing: '-0.01em',
                        fontVariantNumeric: 'tabular-nums',
                      }}>${req.anchor.low.toFixed(2)}–${req.anchor.high.toFixed(2)}</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#86868B' }}>{req.receivedAt}</span>
                  </div>

                  {req.status === 'responded' && (
                    <div style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: req.responseType === 'accepted' ? '#0F7B30' : '#86868B',
                      letterSpacing: '-0.01em',
                      marginTop: '4px',
                    }}>
                      {req.responseType === 'accepted' ? '✓ Accepted at anchor' : '↗ Counter sent'}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* RIGHT: Detail pane */}
        {selectedRequest && (
          <div
            className="detail-pane"
            style={{
              flex: 1,
              background: 'white',
              border: '1px solid #E8E8ED',
              borderRadius: '16px',
              padding: '28px',
              height: 'fit-content',
              position: 'sticky',
              top: '24px',
              boxShadow: '0 1px 3px rgba(10,37,64,0.04)',
            }}>
            {sentResponses.has(selectedRequest.id) ? (
              <SuccessState onClose={closeDetail} />
            ) : (
              <>
                {/* Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '24px',
                }}>
                  <div>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#86868B',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '6px',
                    }}>Request {selectedRequest.id}</div>
                    <h2 style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      color: '#1D1D1F',
                      letterSpacing: '-0.025em',
                      margin: 0,
                      lineHeight: 1.1,
                    }}>{selectedRequest.brandName}</h2>
                    <p style={{
                      fontSize: '13px',
                      color: '#86868B',
                      margin: '8px 0 0',
                      letterSpacing: '-0.01em',
                    }}>Received {selectedRequest.receivedAt} · {selectedRequest.sla}</p>
                  </div>
                  <div
                    className="close-btn"
                    onClick={closeDetail}
                    style={{
                      background: '#F5F5F7',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      color: '#86868B',
                    }}>×</div>
                </div>

                {/* Anchor */}
                <div style={{
                  padding: '18px 20px',
                  background: 'linear-gradient(135deg, #0A2540 0%, #1E3A5F 100%)',
                  borderRadius: '14px',
                  color: 'white',
                  marginBottom: '24px',
                  boxShadow: '0 4px 16px rgba(10,37,64,0.15)',
                }}>
                  <div style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.65)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '10px',
                  }}>Arca estimate · shown to brand</div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                  }}>
                    <span style={{
                      fontSize: '28px',
                      fontWeight: 700,
                      letterSpacing: '-0.03em',
                      fontVariantNumeric: 'tabular-nums',
                    }}>${selectedRequest.anchor.low.toFixed(2)}–${selectedRequest.anchor.high.toFixed(2)}</span>
                    <span style={{
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.75)',
                      fontVariantNumeric: 'tabular-nums',
                    }}>~${selectedRequest.anchor.typical.toFixed(2)} typical</span>
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.6)',
                    marginTop: '8px',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.5,
                  }}>Computed from your published ranges and this brand's profile. Your response is tracked against this anchor.</div>
                </div>

                {/* Brand profile */}
                <div style={{ marginBottom: '20px' }}>
                  <SectionLabel>Brand profile</SectionLabel>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    padding: '18px',
                    background: '#FAFAFA',
                    borderRadius: '12px',
                    border: '1px solid #F0F0F2',
                  }}>
                    <DetailField label="Vertical" value={selectedRequest.vertical} />
                    <DetailField label="Volume" value={selectedRequest.volume} />
                    <DetailField label="Avg units / order" value={selectedRequest.units} />
                    <DetailField label="Active SKUs" value={String(selectedRequest.skus)} />
                    <DetailField label="Location" value={selectedRequest.location} />
                    <DetailField label="Target start" value={selectedRequest.startDate} />
                  </div>
                </div>

                {/* Channels */}
                <div style={{ marginBottom: '20px' }}>
                  <SectionLabel>Sales channels</SectionLabel>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {selectedRequest.channels.map(c => (
                      <span key={c} style={{
                        padding: '6px 12px',
                        background: '#F5F5F7',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: '#1D1D1F',
                        letterSpacing: '-0.01em',
                      }}>{c}</span>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {selectedRequest.notes && (
                  <div style={{ marginBottom: '24px' }}>
                    <SectionLabel>Notes from brand</SectionLabel>
                    <div style={{
                      padding: '14px 16px',
                      background: '#FAFAFA',
                      borderRadius: '12px',
                      border: '1px solid #F0F0F2',
                      fontSize: '13px',
                      color: '#1D1D1F',
                      lineHeight: 1.55,
                      letterSpacing: '-0.01em',
                    }}>{selectedRequest.notes}</div>
                  </div>
                )}

                {/* Response */}
                <div style={{ borderTop: '1px solid #F0F0F2', paddingTop: '22px' }}>
                  <SectionLabel>Your response</SectionLabel>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px',
                    marginBottom: '16px',
                  }}>
                    {[
                      { key: 'accept', title: 'Accept at anchor', sub: 'Match the estimate' },
                      { key: 'counter', title: 'Counter offer', sub: 'Adjust with reason' },
                      { key: 'decline', title: 'Decline', sub: 'Not a fit' },
                    ].map(action => (
                      <div
                        key={action.key}
                        className={`action-tile ${responseAction === action.key ? 'active' : ''}`}
                        onClick={() => setResponseAction(action.key)}
                        style={{
                          padding: '14px 12px',
                          background: 'white',
                          border: '1px solid #E8E8ED',
                          borderRadius: '12px',
                          textAlign: 'center',
                        }}>
                        <div style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          letterSpacing: '-0.01em',
                        }}>{action.title}</div>
                        <div className="action-tile-sub" style={{
                          fontSize: '11px',
                          color: '#86868B',
                          marginTop: '4px',
                          letterSpacing: '-0.01em',
                        }}>{action.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Counter form */}
                  {responseAction === 'counter' && (
                    <div style={{
                      padding: '18px',
                      background: '#FAFAFA',
                      borderRadius: '12px',
                      border: '1px solid #F0F0F2',
                      marginBottom: '16px',
                    }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                        marginBottom: '14px',
                      }}>
                        <div>
                          <div style={{
                            fontSize: '10px',
                            fontWeight: 600,
                            color: '#86868B',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: '6px',
                          }}>Your quote ($/order)</div>
                          <input
                            value={counterPrice}
                            onChange={e => setCounterPrice(e.target.value)}
                            placeholder="9.25"
                            style={{
                              width: '100%',
                              padding: '10px 12px',
                              border: '1px solid #E8E8ED',
                              borderRadius: '8px',
                              fontSize: '13px',
                              fontFamily: 'inherit',
                              outline: 'none',
                              boxSizing: 'border-box',
                            }}/>
                        </div>
                        <div>
                          <div style={{
                            fontSize: '10px',
                            fontWeight: 600,
                            color: '#86868B',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: '6px',
                          }}>vs anchor</div>
                          <div style={{
                            padding: '10px 12px',
                            background: 'white',
                            border: '1px solid #E8E8ED',
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: 500,
                            color: counterDelta && Math.abs(parseFloat(counterDelta)) > 10 ? '#FF9F0A' : '#1D1D1F',
                          }}>
                            {counterDelta ? `${counterDelta > 0 ? '+' : ''}${counterDelta}% from typical` : '—'}
                          </div>
                        </div>
                      </div>
                      <div style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        color: '#86868B',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '6px',
                      }}>Reason for counter</div>
                      <textarea
                        value={counterReason}
                        onChange={e => setCounterReason(e.target.value)}
                        placeholder="Heavier than profile assumed · Custom packaging · Peak season volume..."
                        rows={2}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #E8E8ED',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontFamily: 'inherit',
                          outline: 'none',
                          resize: 'vertical',
                          boxSizing: 'border-box',
                        }}/>
                      <div style={{
                        fontSize: '11px',
                        color: '#86868B',
                        marginTop: '10px',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.5,
                      }}>Counter-offers are tracked. Chronic high deltas affect your featured status.</div>
                    </div>
                  )}

                  {responseAction && (
                    <button
                      onClick={handleSend}
                      className="send-btn"
                      disabled={responseAction === 'counter' && !counterPrice}
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: responseAction === 'decline' ? '#86868B' : '#0A2540',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: (responseAction === 'counter' && !counterPrice) ? 'not-allowed' : 'pointer',
                        letterSpacing: '-0.01em',
                        fontFamily: 'inherit',
                        opacity: (responseAction === 'counter' && !counterPrice) ? 0.5 : 1,
                      }}>
                      {responseAction === 'accept' && `Send quote at $${selectedRequest.anchor.typical.toFixed(2)}/order`}
                      {responseAction === 'counter' && (counterPrice ? `Send counter at $${counterPrice}/order` : 'Send counter')}
                      {responseAction === 'decline' && 'Send decline'}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

export default Dashboard