/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import HeroSlide from './HeroSlide'
import Link from 'next/link'
import { getData } from '../api/apiCalls'
import { RiArrowLeftWideFill, RiArrowRightWideFill } from 'react-icons/ri'

function HeroSlider({ content }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [singleContentData, setSingleContentData] = useState(null)
  const [slideshowPause, setSlideshowPaused] = useState(false)

  function reduceOverviewSize(overview) {
    const overFortyWords = overview.split(' ').length > 40
    let newOverview = []
    if (overFortyWords) {
      newOverview = overview.split(' ').slice(0, 40).join(' ')
      return (
        <>
          {newOverview}
          <Link href={'/'} className="text-zinc-400">
            ...Read More
          </Link>
        </>
      )
    } else return overview
  }

  useEffect(() => {
    if (!slideshowPause) {
      const interval = setInterval(() => {
        handleRightClick()
      }, 6000)

      return () => clearInterval(interval)
    }
  })

  async function getSingleContentData(type, id) {
    const result = await getData(`${type}/${id}`)
    setSingleContentData(result)
  }

  useEffect(() => {
    if (content && content.length > 0) {
      getSingleContentData('movie', content[currentSlide].id)
    }
  }, [content, currentSlide])

  const sliderLength = content.length - 1

  function handleLeftClick() {
    if (currentSlide == 0) {
      setCurrentSlide(sliderLength)
    } else setCurrentSlide(currentSlide - 1)
  }
  function handleRightClick() {
    if (currentSlide == sliderLength) {
      setCurrentSlide(0)
    } else setCurrentSlide(currentSlide + 1)
  }

  return (
    <div className="w-full ">
      <div className="absolute w-full flex justify-center items-center h-full ">
        <div className="absolute flex justify-between w-full px-10">
          <div
            onClick={handleLeftClick}
            className="text-2xl text-white w-[2rem] h-[2rem] z-10 hover:text-slate-600 transition-all duration-300"
          >
            <RiArrowLeftWideFill />
          </div>
          <div
            onClick={handleRightClick}
            className="text-2xl text-white w-[2rem] h-[2rem] z-10 hover:text-slate-600 transition-all duration-300"
          >
            <RiArrowRightWideFill />
          </div>
        </div>
      </div>

      {/* Slider shows one slide at a time*/}
      <div className="relative w-full h-[70vh]">
        {content.map((item, index) => (
          <div
            className={`${
              currentSlide == index ? 'opacity-100' : 'opacity-0'
            } absolute inset-0 transition-all ease-in-out duration-[700ms]`}
            key={item.id}
          >
            <HeroSlide
              content={item}
              classes={'w-full h-[70vh] object-cover'}
            />

            {/* background gradient fade for both top and bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black from-2% "></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black from-0% "></div>

            <div className="h-[600px] text-white absolute inset-0 flex justify-center w-full items-center text-4xl">
              <div
                onMouseEnter={() => setSlideshowPaused(true)}
                onMouseLeave={() => setSlideshowPaused(false)}
                className="flex flex-col items-center sm:flex-row gap-6"
              >
                <img
                  className="w-[200px] sm:h-[400px] sm:w-auto "
                  alt={`${item.title} poster`}
                  src={`https://image.tmdb.org/t/p/w300/${item.poster_path}
                `}
                ></img>
                <div className="sm:w-[400px] h-1/2 sm:h-full px-2 relative flex flex-col">
                  <div className="text-2xl sm:text-4xl h-[100px] sm:h-auto z-40 text-center sm:text-pretty">
                    {/* If original language is not english 'title' in api call is used as opposed to original title */}
                    {item.title}
                    <div className="text-sm pb-2 text-zinc-400">
                      {/* If slide is in view then it displays the run time - done to reduce api calls per second */}
                      {singleContentData && singleContentData.id == item.id
                        ? `${singleContentData.runtime} minutes`
                        : 'Loading minutes...'}
                    </div>
                    <div className="sm:text-lg text-base text-pretty h-[15vh] sm:h-[300px] text-ellipsis overflow-auto">
                      {/* Cuts off the overview if it exceeds 40 words and adds read more onto the end */}
                      {/* {reduceOverviewSize(item.overview)} */}
                      {item.overview}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HeroSlider
