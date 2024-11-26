'use client'

import React, { useState } from 'react'
import RadarrSettingsPageSetup from './RadarrSettingsPageSetup'
import SonarrSettingsPageSetup from './SonarrSettingsPageSetup'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebaseConfig'

function SettingsPage() {
  const [user] = useAuthState(auth)

  return user ? (
    <div className="flex flex-col w-full justify-center items-center gap-4">
      <div className="w-full justify-center flex-wrap flex gap-4 rounded-lg text-white text-center ">
        <div className="min-h-[400px] w-full max-w-[500px] rounded-3xl bg-white bg-opacity-10">
          <RadarrSettingsPageSetup />
        </div>
        <div className="min-h-[400px] w-full max-w-[500px] rounded-3xl bg-white bg-opacity-10">
          <SonarrSettingsPageSetup />
        </div>
      </div>
    </div>
  ) : null
}

export default SettingsPage
