import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import WarehouseMapCDN from '../components/WarehouseMapCDN'

const Home = () => {
  const { filteredWarehouses, loading } = useAppContext()
  const [hoveredId, setHoveredId] = useState(null)

  if (loading) {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '48px', marginBottom: '16px'}}>🏭</div>
          <p style={{color: '#6b7280', fontSize: '18px'}}>Finding warehouses...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden'}}>

      {/* LEFT: Listings */}
      <div style={{width: '52%', overflowY: 'auto', padding: '24px'}}>
        <p style={{color: '#6b7280', fontSize: '14px', marginBottom: '20px', fontWeight: '500'}}>
          {filteredWarehouses.length}+ industrial spaces available in Texas
        </p>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
          {filteredWarehouses.map((warehouse) => (
            <div
              key={warehouse.id}
              onMouseEnter={() => setHoveredId(warehouse.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                transform: hoveredId === warehouse.id ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hoveredId === warehouse.id ? '0 12px 24px rgba(0,0,0,0.15)' : 'none'
              }}
            >
              {/* Image */}
              <div style={{
                background: `linear-gradient(135deg, #1A1F3A, #2D3561)`,
                height: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <span style={{fontSize: '56px'}}>🏭</span>
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'white',
                  borderRadius: '8px',
                  padding: '4px 8px',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: warehouse.availability === 'Available Now' ? '#16a34a' : '#d97706'
                }}>
                  {warehouse.availability}
                </div>
              </div>

              {/* Info */}
              <div style={{padding: '12px 4px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px'}}>
                  <p style={{fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0}}>
                    {warehouse.address.split(',')[1]?.trim()}, TX
                  </p>
                  <span style={{fontSize: '12px', color: '#6b7280'}}>⭐ 4.9</span>
                </div>
                <p style={{fontSize: '13px', color: '#6b7280', marginBottom: '6px'}}>
                  {warehouse.size.toLocaleString()} sq ft · {warehouse.clear_height}' clear · {warehouse.dock_doors} docks
                </p>
                <p style={{fontSize: '14px', color: '#111827', margin: 0}}>
                  <span style={{fontWeight: '700'}}>${warehouse.price.toFixed(2)}</span>
                  <span style={{color: '#6b7280'}}> {warehouse.price_unit}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Map */}
      <div style={{
        width: '48%',
        position: 'sticky',
        top: 0,
        height: '100%'
      }}>
        <WarehouseMapCDN warehouses={filteredWarehouses} height="100%" />
      </div>
    </div>
  )
}

export default Home