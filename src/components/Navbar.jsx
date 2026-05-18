const Navbar = () => {
  return (
    <nav style={{
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '0 24px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
    }}>
      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
        <span style={{fontSize: '24px'}}>🏭</span>
        <span style={{fontSize: '20px', fontWeight: '800', color: '#FF6B35', letterSpacing: '-0.5px'}}>WarehouseHub</span>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #e5e7eb',
        borderRadius: '40px',
        padding: '8px 16px',
        gap: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        cursor: 'pointer'
      }}>
        <span style={{fontSize: '14px', fontWeight: '600', color: '#374151'}}>Location</span>
        <div style={{width: '1px', height: '20px', background: '#e5e7eb'}}></div>
        <span style={{fontSize: '14px', color: '#6b7280'}}>Size</span>
        <div style={{width: '1px', height: '20px', background: '#e5e7eb'}}></div>
        <span style={{fontSize: '14px', color: '#6b7280'}}>Type</span>
        <div style={{
          background: '#FF6B35',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '16px'
        }}>🔍</div>
      </div>

      <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
        <span style={{fontSize: '14px', fontWeight: '600', color: '#374151', cursor: 'pointer'}}>List your space</span>
        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '40px',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
        }}>
          <span style={{fontSize: '18px'}}>☰</span>
          <div style={{
            background: '#6b7280',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px'
          }}>👤</div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar