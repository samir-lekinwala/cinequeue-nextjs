'use client'

import React, { useState } from 'react'
import RadarrSettingsPageSetup from './RadarrSettingsPageSetup'

function SettingsPage() {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-4">
      <div className="w-full  min-h-[400px] rounded-lg bg-white bg-opacity-10 sm:max-w-[1000px] text-white text-center ">
        <RadarrSettingsPageSetup />
      </div>
    </div>
  )
}

export default SettingsPage
