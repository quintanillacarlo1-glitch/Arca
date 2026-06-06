import { createContext, useContext, useState } from 'react'

const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null) // null = anonymous, object = filled
  const [signedUp, setSignedUp] = useState(false) // separate from profile

  const updateProfile = (data) => setProfile(data)
  const clearProfile = () => setProfile(null)

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, clearProfile, signedUp, setSignedUp }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => useContext(ProfileContext)