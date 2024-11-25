'use client'

import React, { useState } from 'react'
import RadarrProfilePageSetup from './RadarrProfilePageSetup'

function ProfilePage() {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-4">
      <div className="w-full  min-h-[400px] rounded-lg bg-white bg-opacity-10 sm:max-w-[1000px] text-white text-center transition-all duration-500 ease-in-out">
        <RadarrProfilePageSetup />
      </div>
    </div>
  )
}

export default ProfilePage
