import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import SliderArrows from './SliderArrows'
import AddToLists from '../[contentType]/[contentId]/components/AddToLists'
import { FallingLines } from 'react-loader-spinner'
import { getTotalEpisodesRuntime } from '../functions/tvShowRuntime'
import RuntimeBreakdown from './RuntimeBreakdown'
import RatingsYearAndRuntime from './RatingsYearAndRuntime'

function HeroSliderTV({
  // item,
  content,
  type,
  // index,
  setSlideshowPaused,
  singleContentData,
  handleLeftClick,
  handleRightClick,
  smallSize,
  currentSlide,
}) {
  const [runtime, setRuntime] = useState()
  const [runtimeClick, setRuntimeClick] = useState(false)

  const showEpisodeInfoRef = useRef(null)

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
        <>
          {content.map((item, index) => (
            <>
              <div
                className={`${
                  currentSlide == index
                    ? 'opacity-100 h-[140vh] z-0'
                    : 'opacity-0 z-0 h-[140vh]'
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
                  currentSlide == index ? 'opacity-100 z-10' : 'opacity-0 z-0'
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
                        } grow h-auto w-auto transition-all duration-[700ms] ease-in-out`}
                        alt={`${item.name} poster`}
                        src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                      ></img>
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
                        {singleContentData ? (
                          <div className="text-sm pb-2 text-zinc-400 mx-auto w-fit relative">
                            <RatingsYearAndRuntime
                              content={singleContentData}
                              runtime={runtime}
                              type={type}
                            />
                          </div>
                        ) : null}

                        {/* <div
                          className={`${'text-sm pb-10 sm:pb-10 text-zinc-400 w-fit mx-auto flex justify-between gap-4'}`}
                        >
                          <div>⭐{item.vote_average}</div>
                          <div
                            ref={showEpisodeInfoRef}
                            onClick={() => setRuntimeClick(!runtimeClick)}
                          >
                            {/* If slide is in view then it displays the run time - done to reduce api calls per second */}
                        {/* {singleContentData &&
                            singleContentData.id == item.id
                              ? `⌛${(runtime / 60).toFixed(2)} hours`
                              : 'Loading runtime...'}
                          </div>
                          {runtimeClick ? (
                            <RuntimeBreakdown
                              content={singleContentData}
                              showEpisodeInfoRef={showEpisodeInfoRef}
                              runtimeClick={runtimeClick}
                              setRuntimeClick={setRuntimeClick}
                            />
                          ) : null}
                        </div> */}

                        <div className=" sm:text-base text-base text-pretty h-[20vh] sm:h-[260px] text-ellipsis overflow-auto min-h-0 my-4 sm:my-0">
                          {/* Cuts off the overview if it exceeds 40 words and adds read more onto the end */}
                          {/* {reduceOverviewSize(item.overview)} */}
                          {item.overview}
                        </div>
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
                            !smallSize ? 'relative z-20 my-4' : 'relative z-20'
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
        </>
      )}
    </>
  )
}

export default HeroSliderTV
