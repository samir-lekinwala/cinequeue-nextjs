/* eslint-disable @next/next/no-img-element */
'use client'
import { useMediaQuery } from 'usehooks-ts'
import React, { useEffect, useState } from 'react'
import SliderArrows from './SliderArrows'
import HeroSliderMovies from './HeroSliderMovies'
import HeroSliderTV from './HeroSliderTV'
import Link from 'next/link'
import { getData } from '../lib/apiCalls'
import { FallingLines } from 'react-loader-spinner'
import AddToLists from '../[contentType]/[contentId]/components/AddToLists'

function HeroSlider({ content, type }) {
  const smallSize = useMediaQuery('(min-width: 540px)')

  const [currentSlide, setCurrentSlide] = useState(0)
  const [singleContentData, setSingleContentData] = useState(null)
  const [slideshowPause, setSlideshowPaused] = useState(false)
  const [countdown, setCountdown] = useState(19)
  const [isLoading, setIsLoading] = useState(true)

  //useEffects
  useEffect(() => {
    if (content && content.length > 0) {
      getSingleContentData(type, content[currentSlide].id)
      console.log('current slide', currentSlide)
    }
  }, [content, currentSlide, type])

  useEffect(() => {
    setCountdown(19)
    setCurrentSlide(0)
  }, [type])

  useEffect(() => {
    if (type == 'tv' && !singleContentData.name) {
      getSingleContentData(type, content[currentSlide].id)
    }
  }, [currentSlide])

  useEffect(() => {
    if (!slideshowPause && countdown !== 0) {
      const interval = setInterval(() => {
        setCountdown(countdown - 1)

        handleRightClick()
        console.log(countdown)
      }, 6000)

      return () => clearInterval(interval)
    }
  })

  //data for the current slide, used interchangably with movies and tv shows
  async function getSingleContentData(type, id) {
    setIsLoading(true)
    console.log('isloading', isLoading)
    const result = await getData(
      `${type}/${id}${type == 'tv' ? '?append_to_response=season%2F1' : null}`
    ).then((returnedResult) => {
      setSingleContentData(returnedResult)
      setIsLoading(false)
      console.log('isloading', isLoading)
    })
    console.log('async function getsinglecontentdata result', type, id, result)
  }

  const sliderLength = content.length - 1

  //buttons for slider
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

  function heroSliderv1() {
    return (
      <>
        {!content ? (
          <div className="flex justify-center items-center ">
            <FallingLines color="#ff7e5f" />
          </div>
        ) : (
          <div className="w-full flex relative ">
            <div className="w-full  mb-20 sm:mb-0 object-fit">
              {/* {content.map((item, index) => ( */}
              <>
                {type == 'movie' ? (
                  <HeroSliderMovies
                    // item={item}
                    content={content}
                    type={type}
                    isLoading={isLoading}
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
                    isLoading={isLoading}
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
