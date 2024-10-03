/* eslint-disable @next/next/no-img-element */
'use client'
import { useMediaQuery } from 'usehooks-ts'
import React, { useEffect, useState } from 'react'
import SliderArrows from './SliderArrows'
import HeroSliderMovies from './HeroSliderMovies'
import HeroSliderTV from './HeroSliderTV'
import Link from 'next/link'
import { getData } from '../api/apiCalls'
import { FallingLines } from 'react-loader-spinner'
import AddToLists from '../[contentType]/[contentId]/components/AddToLists'

function HeroSlider({ content, type }) {
  const smallSize = useMediaQuery('(min-width: 540px)')

  const [currentSlide, setCurrentSlide] = useState(0)
  const [singleContentData, setSingleContentData] = useState(null)
  const [slideshowPause, setSlideshowPaused] = useState(false)
  const [countdown, setCountdown] = useState(20)
  // const [content, setContent] = useState(null)

  // function reduceOverviewSize(overview) {
  //   const overFortyWords = overview.split(' ').length > 40
  //   let newOverview = []
  //   if (overFortyWords) {
  //     newOverview = overview.split(' ').slice(0, 40).join(' ')
  //     return (
  //       <>
  //         {newOverview}
  //         <Link href={'/'} className="text-zinc-400">
  //           ...Read More
  //         </Link>
  //       </>
  //     )
  //   } else return overview
  // }

  useEffect(() => {
    if (!slideshowPause && countdown !== 0) {
      const interval = setInterval(() => {
        setCountdown(countdown - 1)

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
      getSingleContentData(type, content[currentSlide].id)
    }
  }, [content, currentSlide, type])

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

  // console.log('single content data', singleContentData)

  function heroSliderv1() {
    return (
      <>
        {!content ? (
          <div className="flex justify-center items-center ">
            <FallingLines color="#ff7e5f" />
          </div>
        ) : (
          <div className="w-full flex  h-[100vh] relative ">
            <div className="w-full  mb-20 sm:mb-0 object-fit">
              {/* {content.map((item, index) => ( */}
              <>
                {type == 'movie' ? (
                  <HeroSliderMovies
                    // item={item}
                    content={content}
                    type={type}
                    // index={index}
                    setSlideshowPaused={setSlideshowPaused}
                    singleContentData={singleContentData}
                    handleLeftClick={handleLeftClick}
                    handleRightClick={handleRightClick}
                    smallSize={smallSize}
                    currentSlide={currentSlide}
                  />
                ) : (
                  <HeroSliderTV
                    content={content}
                    // item={item}
                    type={type}
                    // index={index}
                    setSlideshowPaused={setSlideshowPaused}
                    singleContentData={singleContentData}
                    handleLeftClick={handleLeftClick}
                    handleRightClick={handleRightClick}
                    smallSize={smallSize}
                    currentSlide={currentSlide}
                  />
                )}
              </>
              {/* ))} */}
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      {/* {heroSliderv2()} */}
      {!content.length > 0 ? (
        <div className="flex justify-center items-center ">
          <FallingLines color="#ff7e5f" />
        </div>
      ) : (
        heroSliderv1()
      )}
      {}
    </>
  )
}

export default HeroSlider
