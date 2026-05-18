import { createContext, useContext, useState, useEffect } from 'react'
import { fetchWarehouses } from '../services/api'

const AppContext = createContext()

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [warehouses, setWarehouses] = useState([])
  const [filteredWarehouses, setFilteredWarehouses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const data = await fetchWarehouses()
      setWarehouses(data)
      setFilteredWarehouses(data)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    warehouses,
    filteredWarehouses,
    loading
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}