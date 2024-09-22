import React, { useEffect, useState } from 'react'
import HeroSlider from './HeroSlider'
import { getData } from '../api/apiCalls'

function Hero() {
  const [heroData, setHeroData] = useState([])

  async function getHeroData() {
    const result = await getData('movie/popular?language=en-US&page=1')
    setHeroData(result.results)
  }

  useEffect(() => {
    getHeroData()
  }, [])

  console.log('testing1', heroData)
  return (
    <div className="w-full relative h-[80vh]">
      <HeroSlider content={heroData} />
    </div>
  )
}

export default Hero
