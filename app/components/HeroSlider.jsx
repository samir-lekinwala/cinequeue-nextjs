import React, { useState } from 'react'
import HeroSlide from './HeroSlide'

function HeroSlider({ content }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const sliderLength = content.length - 1
  // console.log('sliderlength', sliderLength)

  function handleLeftClick() {
    if (currentSlide == 0) {
      setCurrentSlide(sliderLength)
      console.log(currentSlide)
    } else setCurrentSlide(currentSlide - 1)
    console.log(currentSlide)
  }
  function handleRightClick() {
    if (currentSlide == sliderLength) {
      setCurrentSlide(0)
      console.log(currentSlide)
    } else setCurrentSlide(currentSlide + 1)
    console.log(currentSlide)
  }

  return (
    <div className="w-full relative">
      <div className="absolute  w-full flex justify-center items-center h-full">
        <div className="absolute flex justify-between w-full px-10">
          <div
            onClick={handleLeftClick}
            className="bg-white w-4 h-4 z-10"
          ></div>
          <div
            onClick={handleRightClick}
            className="bg-white w-4 h-4 z-10"
          ></div>
        </div>
      </div>
      {content.map((item, index) => (
        <div
          className={`${
            currentSlide == index ? 'visible' : 'hidden'
          } relative w-full h-[70vh]`}
          key={item.id}
        >
          <HeroSlide content={item} classes={'w-full h-[70vh] object-cover'} />
          <div className="absolute inset-0 bg-gradient-to-t from-black from-2% "></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black from-1% "></div>
        </div>
      ))}
    </div>
  )
}

export default HeroSlider
