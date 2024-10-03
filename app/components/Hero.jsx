import React, { useEffect, useState } from 'react'
import HeroSlider from './HeroSlider'
import { getData } from '../api/apiCalls'
import { FallingLines } from 'react-loader-spinner'

function Hero({ type }) {
  const [heroData, setHeroData] = useState([])

  async function getHeroData() {
    const result = await getData(`trending/${type}/week?language=en-US`)
    setHeroData(result.results)
  }

  useEffect(() => {
    getHeroData()
  }, [type])

  console.log('testing1', heroData)
  return (
    <div className="">
      {!heroData ? (
        <div className="flex justify-center items-center">
          <FallingLines color="#ff7e5f" />
        </div>
      ) : (
        <HeroSlider type={type} content={heroData} />
      )}
    </div>
  )
}

export default Hero
