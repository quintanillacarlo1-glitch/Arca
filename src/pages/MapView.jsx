import { useAppContext } from '../context/AppContext'
import WarehouseMapCDN from '../components/WarehouseMapCDN'

const MapView = () => {
  const { filteredWarehouses, loading } = useAppContext()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Map View</h1>
          <p className="text-gray-600 mt-1">
            {filteredWarehouses.length} properties available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WarehouseMapCDN 
          warehouses={filteredWarehouses} 
          height="calc(100vh - 250px)"
        />
      </div>
    </div>
  )
}

export default MapView