import React from 'react'
import HeroSlider from './HeroSlider'

function Hero() {
  const apiContent = null
  return (
    <div className="w-full h-[50vh]">
      <div>
        <HeroSlider content={apiContent} />
      </div>
    </div>
  )
}

export default Hero
