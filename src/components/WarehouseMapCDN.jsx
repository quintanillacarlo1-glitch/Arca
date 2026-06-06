import { useEffect, useRef } from 'react'

// Match the pricing math from Home.jsx so markers and cards agree
const seeded = (id, salt) => {
  const x = Math.sin(id * 9301 + salt * 49297) * 233280
  return x - Math.floor(x)
}
const pricingFor = (w) => {
  const base = w.price
  const ppAvg = +(base * (0.92 + seeded(w.id, 1) * 0.12)).toFixed(2)
  const ppLow = +(base * 0.78).toFixed(2)
  const ppHigh = +(base * 1.18).toFixed(2)
  const stLow = +(0.45 + seeded(w.id, 2) * 0.1).toFixed(2)
  const stAvg = +(stLow * (1.2 + seeded(w.id, 3) * 0.35)).toFixed(2)
  return { ppAvg, ppLow, ppHigh, stAvg }
}

const WarehouseMapCDN = ({ warehouses, height = '600px', hoveredId = null }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef({})

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      const map = L.map(mapRef.current, {
        zoomControl: false,
      }).setView([31.0, -99.0], 6)

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '©OpenStreetMap ©CartoDB',
        maxZoom: 19
      }).addTo(map)

      L.control.zoom({ position: 'bottomright' }).addTo(map)
      mapInstanceRef.current = map
    }

    // Clear existing markers
    Object.values(markersRef.current).forEach(m => m.remove())
    markersRef.current = {}

    if (warehouses && warehouses.length > 0 && mapInstanceRef.current) {
      const bounds = []

      warehouses.forEach(warehouse => {
        const p = pricingFor(warehouse)

        const icon = L.divIcon({
          className: '',
          html: `
            <div class="arca-marker" data-id="${warehouse.id}" style="
              background: white;
              color: #1D1D1F;
              padding: 5px 10px;
              border-radius: 999px;
              font-size: 12px;
              font-weight: 700;
              white-space: nowrap;
              box-shadow: 0 2px 6px rgba(10,37,64,0.16), 0 0 0 1px rgba(10,37,64,0.06);
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              cursor: pointer;
              letter-spacing: -0.02em;
              transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
              transform-origin: center bottom;
            ">$${p.ppAvg.toFixed(2)}</div>
          `,
          iconSize: [56, 26],
          iconAnchor: [28, 13],
          popupAnchor: [0, -16]
        })

        const marker = L.marker([warehouse.latitude, warehouse.longitude], { icon })

        const popupContent = `
          <div style="
            padding: 0;
            width: 260px;
            border-radius: 14px;
            overflow: hidden;
            font-family: 'Inter', -apple-system, sans-serif;
          ">
            <div style="height: 110px; background: linear-gradient(135deg, #0A2540 0%, #1E3A5F 100%); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.3); font-size: 32px; font-weight: 700;">A</div>
            <div style="padding: 14px 16px 16px;">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px;">
                <div style="font-size: 15px; font-weight: 600; color: #1D1D1F; letter-spacing: -0.02em;">${warehouse.address.split(',').slice(1, 2).join(',').trim()}, TX</div>
                <div style="font-size: 12px; color: #1D1D1F; font-weight: 500;">★ 4.9</div>
              </div>
              <div style="font-size: 11px; color: #86868B; margin-bottom: 10px;">
                ${warehouse.clear_height}' clear · ${warehouse.dock_doors} docks
              </div>
              <div style="padding: 10px 12px; background: #FAFAFA; border-radius: 8px; border: 1px solid #F0F0F2; margin-bottom: 8px;">
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: #1D1D1F; margin-bottom: 3px;">
                  <span>Pick & pack</span>
                  <span style="font-variant-numeric: tabular-nums;">$${p.ppLow.toFixed(2)}–$${p.ppHigh.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: #1D1D1F;">
                  <span>Storage</span>
                  <span style="font-variant-numeric: tabular-nums;">~$${p.stAvg.toFixed(2)}/cu ft</span>
                </div>
              </div>
              <div style="display: flex; align-items: baseline; gap: 4px;">
                <span style="font-size: 18px; font-weight: 700; color: #0A2540; letter-spacing: -0.02em; font-variant-numeric: tabular-nums;">$${p.ppAvg.toFixed(2)}</span>
                <span style="font-size: 11px; color: #86868B;">avg per order</span>
              </div>
            </div>
          </div>
        `

        marker.bindPopup(popupContent, {
          maxWidth: 280,
          closeButton: false,
          className: 'arca-popup'
        })

        marker.addTo(mapInstanceRef.current)
        markersRef.current[warehouse.id] = marker
        bounds.push([warehouse.latitude, warehouse.longitude])
      })

      if (bounds.length > 0) {
        mapInstanceRef.current.fitBounds(bounds, { padding: [60, 60] })
      }
    }
  }, [warehouses])

  // Highlight marker on card hover
  useEffect(() => {
    document.querySelectorAll('.arca-marker').forEach(el => {
      const id = parseInt(el.dataset.id)
      if (id === hoveredId) {
        el.style.background = '#1D1D1F'
        el.style.color = '#FFFFFF'
        el.style.transform = 'scale(1.15)'
        el.style.zIndex = '1000'
        el.style.boxShadow = '0 8px 20px rgba(10,37,64,0.3)'
      } else {
        el.style.background = '#FFFFFF'
        el.style.color = '#1D1D1F'
        el.style.transform = 'scale(1)'
        el.style.zIndex = '1'
        el.style.boxShadow = '0 2px 6px rgba(10,37,64,0.16), 0 0 0 1px rgba(10,37,64,0.06)'
      }
    })
  }, [hoveredId])

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div style={{ position: 'relative', height, width: '100%' }}>
      <style>{`
        .arca-marker:hover {
          transform: scale(1.12) !important;
          z-index: 1000 !important;
          box-shadow: 0 6px 16px rgba(10,37,64,0.25) !important;
        }
        .arca-popup .leaflet-popup-content-wrapper {
          border-radius: 14px !important;
          padding: 0 !important;
          box-shadow: 0 12px 32px rgba(10,37,64,0.18) !important;
          border: 1px solid rgba(10,37,64,0.06);
        }
        .arca-popup .leaflet-popup-content {
          margin: 0 !important;
        }
        .arca-popup .leaflet-popup-tip {
          background: white !important;
        }
      `}</style>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
    </div>
  )
}

export default WarehouseMapCDN