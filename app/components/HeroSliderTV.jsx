import Link from 'next/link'
import React, { useContext, useEffect, useRef, useState } from 'react'
import SliderArrows from './SliderArrows'
import AddToLists from '../[contentType]/[contentId]/components/AddToLists'
import { FallingLines, ProgressBar } from 'react-loader-spinner'
import { getTotalEpisodesRuntime } from '../functions/tvShowRuntime'
import RuntimeBreakdown from './RuntimeBreakdown'
import RatingsYearAndRuntime from './RatingsYearAndRuntime'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useMediaQuery } from 'usehooks-ts'
import Backdrop from './Backdrop'
import HeroSliderPoster from './HeroSliderPoster'
import { useInView } from 'react-intersection-observer'
import { SlideshowPausedContext } from './HeroSlider'

function HeroSliderTV({
  // item,
  content,
  type,
  // index,
  isLoading,
  setSlideshowPaused,
  singleContentData,
  handleLeftClick,
  handleRightClick,
  smallSize,
  currentSlide,
}) {
  const [runtime, setRuntime] = useState()
  const [runtimeClick, setRuntimeClick] = useState(false)
  const widthSmall = useMediaQuery('(max-width: 350px)')
  const mobileScreen = useMediaQuery('(min-height: 800px)')

  const showEpisodeInfoRef = useRef(null)
  const heroPosterSection = useRef(null)

  const [ref, inView] = useInView({ threshold: 1 })

  useEffect(() => {
    console.log(inView)
    if (!inView) {
      setSlideshowPaused(true)
    } else setSlideshowPaused(false)
  }, [inView])

  useEffect(() => {
    if (singleContentData && singleContentData.name) {
      setRuntime(getTotalEpisodesRuntime(singleContentData, type))
    }
  }, [singleContentData, type])

  return (
    <>
      {content[0].name == undefined ? (
        <div className="flex justify-center items-center ">
          <FallingLines color="#ff7e5f" />
        </div>
      ) : (
        <div className={`${widthSmall ? 'min-h-[700px]' : 'min-h-[700px]'} `}>
          {content.map((item, index) => (
            <>
              {/* area of concern, need to fix!!!! */}
              <Backdrop
                item={item}
                index={index}
                currentSlide={currentSlide}
                contentLength={content.length}
              />

              <div
                className={`${
                  currentSlide == index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div
                  className={`text-white absolute inset-0  flex w-full mt-10 sm:mt-0 justify-center text-4xl `}
                >
                  <div
                    ref={ref}
                    onMouseEnter={() => setSlideshowPaused(true)}
                    onMouseLeave={() => setSlideshowPaused(false)}
                    className="flex flex-col items-center fill-transparent bg-transparent sm:my-auto sm:flex-row gap-10 sm:gap-6  mx-auto sm:mx-2 "
                  >
                    <Link href={`/${type}/${item.id}`}>
                      <HeroSliderPoster
                        item={item}
                        index={index}
                        currentSlide={currentSlide}
                        contentLength={content.length}
                      />
                    </Link>
                    <div
                      className={` ${
                        currentSlide == index
                          ? 'opacity-100 z-20 relative'
                          : 'opacity-0'
                      }shrink sm:w-[400px] px-2 relative flex flex-col transition-all duration-[700ms] ease-in-out`}
                    >
                      <div
                        className={`${
                          item.name.length > 20
                            ? 'text-lg sm:text-xl'
                            : item.name.length > 30
                            ? 'text-base sm:text-xl'
                            : 'text-2xl sm:text-3xl md:text-4xl'
                        } h-[20px] sm:h-[368px] z-40 text-center sm:text-pretty mx-auto`}
                      >
                        {/* If original language is not english 'title' in api call is used as opposed to original title */}
                        <Link href={`/${type}/${item.id}`}>{item.name}</Link>
                        <div className="text-sm pb-2 text-zinc-400 mx-auto w-fit relative transition-transform duration-1000 ease-in-out">
                          {singleContentData &&
                          item.id == singleContentData.id ? (
                            <RatingsYearAndRuntime
                              content={singleContentData}
                              runtime={runtime}
                              type={type}
                              isLoading={isLoading}
                              heroSlider={true}
                              setSlideshowPaused={setSlideshowPaused}
                            />
                          ) : (
                            <div className="w-full h-[40px]">
                              <div className="flex flex-col justify-center items-center gap-1">
                                <span className="w-[200px] h-[7px] mb-5 animate-gradient-animation-loading  rounded-full"></span>
                                {/* <span className="w-[200px] h-[7px] my-1 animate-gradient-animation-loading rounded-full"></span> */}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="visible sm:hidden">
                          <AddToLists
                            type={type}
                            content={item}
                            contentRuntime={runtime}
                          />
                        </div>
                        <div
                          className={`${
                            currentSlide == index
                              ? ` h-[22vh] sm:h-[260px] sm:text-base text-base text-pretty  text-ellipsis overflow-auto min-h-0 my-4 sm:my-0`
                              : 'hidden'
                          }`}
                        >
                          {/* Cuts off the overview if it exceeds 40 words and adds read more onto the end */}
                          {/* {reduceOverviewSize(item.overview)} */}
                          {item.overview}
                        </div>
                        {/* <div className="hidden sm:visible">
                          <AddToLists
                            type={type}
                            content={item}
                            contentRuntime={runtime}
                          />
                        </div> */}
                      </div>
                      {!smallSize ? (
                        <div className=" pb-4">
                          <SliderArrows
                            handleLeftClick={handleLeftClick}
                            handleRightClick={handleRightClick}
                          />
                        </div>
                      ) : null}

                      {singleContentData && runtime > 0 ? (
                        <div
                          className={`${
                            !smallSize
                              ? ' hidden'
                              : 'visible relative z-20 my-4'
                          }`}
                        >
                          <AddToLists
                            type={type}
                            content={item}
                            contentRuntime={runtime}
                          />
                        </div>
                      ) : null}
                      {smallSize ? (
                        <div className="mt-2">
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
      )}
    </>
  )
}

export default HeroSliderTV
