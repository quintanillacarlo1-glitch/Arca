import { useEffect, useRef } from 'react'

const WarehouseMapCDN = ({ warehouses, height = '600px' }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      const map = L.map(mapRef.current).setView([30.2672, -97.7431], 6)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map)

      mapInstanceRef.current = map
    }

    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    if (warehouses && warehouses.length > 0 && mapInstanceRef.current) {
      const bounds = []

      warehouses.forEach(warehouse => {
        const customIcon = L.divIcon({
          className: 'custom-warehouse-marker',
          html: `
            <div style="position: relative;">
              <div style="
                background: linear-gradient(135deg, #FF6B35, #F7931E);
                width: 48px;
                height: 48px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 4px solid white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                font-size: 24px;
              ">
                🏭
              </div>
              <div style="
                position: absolute;
                top: -8px;
                right: -8px;
                background: white;
                color: #FF6B35;
                font-size: 11px;
                font-weight: bold;
                padding: 3px 6px;
                border-radius: 10px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                white-space: nowrap;
              ">
                $${warehouse.price.toFixed(0)}
              </div>
            </div>
          `,
          iconSize: [48, 48],
          iconAnchor: [24, 48],
          popupAnchor: [0, -48]
        })

        const marker = L.marker([warehouse.latitude, warehouse.longitude], {
          icon: customIcon
        })

        const popupContent = `
          <div style="padding: 12px; min-width: 280px;">
            <div style="
              background: linear-gradient(135deg, #1A1F3A, #2D3561);
              border-radius: 8px;
              height: 120px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 12px;
            ">
              <span style="font-size: 48px;">🏭</span>
            </div>

            <div style="margin-bottom: 12px;">
              <div style="font-size: 20px; font-weight: bold; color: #1A1F3A; margin-bottom: 4px;">
                $${warehouse.price.toFixed(2)}
                <span style="font-size: 14px; color: #6B7280; font-weight: 500;">
                  ${warehouse.price_unit}
                </span>
              </div>
              <p style="font-size: 14px; color: #6B7280; margin-bottom: 8px;">
                📍 ${warehouse.address}
              </p>
            </div>

            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
              <span style="background: #F3F4F6; color: #374151; font-size: 12px; padding: 4px 8px; border-radius: 6px; font-weight: 500;">
                ${warehouse.size.toLocaleString()} sf
              </span>
              <span style="background: #F3F4F6; color: #374151; font-size: 12px; padding: 4px 8px; border-radius: 6px; font-weight: 500;">
                ${warehouse.clear_height}' clear
              </span>
              <span style="background: #F3F4F6; color: #374151; font-size: 12px; padding: 4px 8px; border-radius: 6px; font-weight: 500;">
                ${warehouse.dock_doors} doors
              </span>
            </div>

            <a 
              href="/property/${warehouse.id}"
              style="
                display: block;
                width: 100%;
                background: linear-gradient(135deg, #FF6B35, #F7931E);
                color: white;
                text-align: center;
                padding: 10px;
                border-radius: 8px;
                font-weight: bold;
                font-size: 14px;
                text-decoration: none;
                cursor: pointer;
              "
            >
              View Details →
            </a>
          </div>
        `

        marker.bindPopup(popupContent, {
          maxWidth: 300,
          className: 'custom-leaflet-popup'
        })

        marker.addTo(mapInstanceRef.current)
        markersRef.current.push(marker)
        bounds.push([warehouse.latitude, warehouse.longitude])
      })

      if (bounds.length > 0) {
        mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] })
      }
    }
  }, [warehouses])

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div style={{ position: 'relative', height }}>
      <div 
        ref={mapRef} 
        style={{ 
          height: '100%', 
          width: '100%',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          border: '2px solid #E5E7EB'
        }}
      />
    </div>
  )
}

export default WarehouseMapCDN