/* eslint-disable @next/next/no-img-element */
'use client'
import { useMediaQuery } from 'usehooks-ts'
import React, { useEffect, useState } from 'react'
import SliderArrows from './SliderArrows'
import Link from 'next/link'
import { getData } from '../api/apiCalls'
import { FallingLines } from 'react-loader-spinner'
import AddToLists from '../[contentType]/[contentId]/components/AddToLists'

function HeroSlider({ content, type }) {
  const smallSize = useMediaQuery('(min-width: 540px)')

  const [currentSlide, setCurrentSlide] = useState(0)
  const [singleContentData, setSingleContentData] = useState(null)
  const [slideshowPause, setSlideshowPaused] = useState(false)

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
              {content.map((item, index) => (
                <>
                  <div
                    className={`${
                      currentSlide == index
                        ? 'opacity-100 h-[140vh] z-0'
                        : 'opacity-0 z-0'
                    } absolute inset-0 transition-all ease-in-out duration-[700ms]`}
                    key={item.id}
                    style={{
                      zIndex: '0',
                      backgroundImage: `
              linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
    linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
    url("https://image.tmdb.org/t/p/original${item.backdrop_path}")`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                    }}
                  ></div>
                  <div
                    className={`${
                      currentSlide == index
                        ? 'opacity-100 z-10'
                        : 'opacity-0 z-0'
                    }`}
                  >
                    <div
                      className={`text-white absolute inset-0  flex w-[100vw] mt-10 sm:mt-0 justify-center text-4xl `}
                    >
                      <div
                        onMouseEnter={() => setSlideshowPaused(true)}
                        onMouseLeave={() => setSlideshowPaused(false)}
                        className="flex flex-col items-center  sm:flex-row gap-10 sm:gap-6  mx-auto sm:mx-2 "
                      >
                        <Link href={`/${type}/${item.id}`}>
                          <img
                            className={`${
                              currentSlide == index
                                ? 'opacity-100 z-20 relative'
                                : 'opacity-0'
                            } grow h-auto w-auto transition-all duration-700 ease-in-out`}
                            alt={`${item.title} poster`}
                            src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                          ></img>
                        </Link>
                        <div className="shrink sm:w-[400px] px-2 relative flex flex-col ">
                          <div
                            className={`${
                              item.title.length > 20
                                ? 'text-xl sm:text-2xl'
                                : 'text-2xl sm:text-3xl md:text-4xl'
                            } h-[20px] sm:h-[368px] z-40 text-center sm:text-pretty `}
                          >
                            {/* If original language is not english 'title' in api call is used as opposed to original title */}
                            <Link href={`/${type}/${item.id}`}>
                              {item.title}
                            </Link>
                            <div
                              className={`${'text-sm pb-10 sm:pb-10 text-zinc-400 w-fit mx-auto'}`}
                            >
                              {/* If slide is in view then it displays the run time - done to reduce api calls per second */}
                              {singleContentData &&
                              singleContentData.id == item.id
                                ? `${singleContentData.runtime} minutes`
                                : 'Loading minutes...'}
                            </div>

                            <div className=" sm:text-base text-base text-pretty h-[20vh] sm:h-[260px] text-ellipsis overflow-auto min-h-0 my-4 sm:my-0">
                              {/* Cuts off the overview if it exceeds 40 words and adds read more onto the end */}
                              {/* {reduceOverviewSize(item.overview)} */}
                              {item.overview}
                            </div>
                          </div>
                          {!smallSize ? (
                            <div className="">
                              <SliderArrows
                                handleLeftClick={handleLeftClick}
                                handleRightClick={handleRightClick}
                              />
                            </div>
                          ) : null}

                          {singleContentData ? (
                            <div
                              className={`${
                                !smallSize
                                  ? 'relative z-20 my-1'
                                  : 'relative z-20'
                              }`}
                            >
                              <AddToLists
                                type={type}
                                content={item}
                                contentRuntime={singleContentData.runtime}
                              />
                            </div>
                          ) : null}
                          {smallSize ? (
                            <div className="">
                              <SliderArrows
                                handleLeftClick={handleLeftClick}
                                handleRightClick={handleRightClick}
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        )}
      </>
    )
  }

  function heroSliderv2() {
    return (
      <div className="h-[120vh] relative">
        {content.map((item, index) => (
          <div key={item.id} className="absolute w-full object-contain">
            {/* background image */}
            <div
              className={`${
                currentSlide == index
                  ? 'visible object-cover w-auto h-[120vh]'
                  : 'hidden'
              } `}
              style={{
                backgroundImage: `
                linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
      linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
      url("https://image.tmdb.org/t/p/original${item.backdrop_path}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
              <div className="text-white flex justify-center ">
                <div className="w-[600px] h-[70vh] flex flex-col sm:flex-row">
                  <Link href={`/${type}/${item.id}`}>
                    <img
                      className=""
                      alt={`${item.title} poster`}
                      src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                    ></img>
                  </Link>
                  <div className="shrink">
                    <h2 className="flex flex-col">
                      {item.title}{' '}
                      <span>
                        {singleContentData && singleContentData.id == item.id
                          ? `${singleContentData.runtime} minutes`
                          : 'Loading minutes...'}
                      </span>
                    </h2>
                    <p className="text-white w-[200px]">{item.overview}</p>
                  </div>
                </div>
              </div>
            </div>

            <div></div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <>
      {/* {heroSliderv2()} */}
      {heroSliderv1()}
    </>
  )
}

export default HeroSlider
