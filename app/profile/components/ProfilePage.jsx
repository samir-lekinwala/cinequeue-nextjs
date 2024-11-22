'use client'

import React, { useState } from 'react'
import RadarrProfilePageSetup from './RadarrProfilePageSetup'

function ProfilePage() {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-4">
      <div className="w-full lg:w-1/2 min-h-[400px] rounded-lg bg-white bg-opacity-10 sm:max-w-[1000px] text-white text-center">
        <RadarrProfilePageSetup />
      </div>
    </div>
  )
}

export default ProfilePage
