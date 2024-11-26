'use client'

import React from 'react'
import RadarrSettingsPageSetup from './RadarrSettingsPageSetup'
import SonarrSettingsPageSetup from './SonarrSettingsPageSetup'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebaseConfig'

function SettingsPage() {
  const [user] = useAuthState(auth)

  return user ? (
    <div className="flex flex-col w-full justify-center items-center gap-4 mt-4">
      <div className="w-full px-2 justify-center flex-wrap flex gap-6 rounded-lg text-white text-center ">
        <RadarrSettingsPageSetup />
        <SonarrSettingsPageSetup />
      </div>
    </div>
  ) : null
}

export default SettingsPage
