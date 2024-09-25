/* eslint-disable @next/next/no-img-element */
import { useMediaQuery } from 'usehooks-ts'
import React, { useEffect, useState } from 'react'
import HeroSlide from './HeroSlide'
import SliderArrows from './SliderArrows'
import Link from 'next/link'
import { getData } from '../api/apiCalls'
import { RiArrowLeftWideFill, RiArrowRightWideFill } from 'react-icons/ri'

function HeroSlider({ content }) {
  const smallSize = useMediaQuery('(min-width: 540px)')

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
    <div className="w-full h-full">
      <div className="w-full h-[70vh] ">
        {content.map((item, index) => (
          <div
            className={`${
              currentSlide == index ? 'opacity-100 ' : 'opacity-0'
            } absolute inset-0 transition-all ease-in-out duration-[700ms] h-fit`}
            key={item.id}
          >
            <HeroSlide
              content={item}
              classes={'w-full h-[70vh] object-cover'}
            />

            {/* background gradient fade for both top and bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black from-2% "></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black from-0% "></div>

            <div className=" text-white absolute inset-0 h-[70vh] flex w-[100vw] justify-center items-center text-4xl">
              <div
                onMouseEnter={() => setSlideshowPaused(true)}
                onMouseLeave={() => setSlideshowPaused(false)}
                className="flex flex-col items-center justify-center sm:flex-row gap-6 h-[70vh] mx-auto sm:mx-2 "
              >
                <img
                  className="w-[200px] object-scale-down min-h-0 md:w-[300px]"
                  alt={`${item.title} poster`}
                  src={`https://image.tmdb.org/t/p/w300/${item.poster_path}
                `}
                ></img>
                <div className="shrink sm:w-[400px] px-2 relative flex flex-col justify-center">
                  <div
                    className={`${
                      item.title.length > 20
                        ? 'text-xl sm:text-2xl'
                        : 'text-2xl sm:text-3xl md:text-4xl'
                    } h-[20px] sm:h-[368px] z-40 text-center sm:text-pretty `}
                  >
                    {/* If original language is not english 'title' in api call is used as opposed to original title */}
                    {item.title}
                    <div className="text-sm pb-2 text-zinc-400 w-fit mx-auto">
                      {/* If slide is in view then it displays the run time - done to reduce api calls per second */}
                      {singleContentData && singleContentData.id == item.id
                        ? `${singleContentData.runtime} minutes`
                        : 'Loading minutes...'}
                    </div>
                    <div className="sm:text-base text-base text-pretty h-[15vh] sm:h-[260px] text-ellipsis overflow-auto min-h-0">
                      {/* Cuts off the overview if it exceeds 40 words and adds read more onto the end */}
                      {/* {reduceOverviewSize(item.overview)} */}
                      {item.overview}
                    </div>
                  </div>
                  <SliderArrows
                    handleLeftClick={handleLeftClick}
                    handleRightClick={handleRightClick}
                  />
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
