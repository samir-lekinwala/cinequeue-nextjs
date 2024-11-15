import Link from 'next/link'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import SliderArrows from './SliderArrows'
import AddToLists from '../[contentType]/[contentId]/components/AddToLists'
import { FallingLines } from 'react-loader-spinner'
import RatingsYearAndRuntime from './RatingsYearAndRuntime'
import Backdrop from '../components/Backdrop.jsx'

function HeroSliderMovies({
  item,
  type,
  // index,
  content,
  setSlideshowPaused,
  singleContentData,
  handleLeftClick,
  handleRightClick,
  smallSize,
  currentSlide,
}) {
  // const BackdropLazyLoad = lazy(() => import('../components/Backdrop.jsx'))

  return (
    <>
      {content[0].title == undefined ? (
        <div className="flex justify-center items-center ">
          <FallingLines color="#ff7e5f" />
        </div>
      ) : (
        <div className="min-h-[700px]">
          {content.map((item, index) => (
            <>
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
                            ? 'opacity-100 z-20 relative '
                            : 'opacity-0'
                        } grow  w-auto h-[450px] transition-all duration-[700ms] ease-in-out`}
                        alt={`${item.title} poster`}
                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
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
                          item.title.length > 20
                            ? 'text-lg sm:text-xl'
                            : item.title.length > 30
                            ? 'text-base sm:text-xl'
                            : 'text-2xl sm:text-3xl md:text-4xl'
                        } h-[20px] sm:h-[368px] z-40 text-center sm:text-pretty mx-auto`}
                      >
                        {/* If original language is not english 'title' in api call is used as opposed to original title */}
                        <Link href={`/${type}/${item.id}`}>{item.title}</Link>
                        <div className="text-sm pb-2 text-zinc-400 mx-auto w-fit relative transition-transform duration-1000 ease-in-out">
                          {singleContentData &&
                          item.id == singleContentData.id ? (
                            <RatingsYearAndRuntime
                              content={singleContentData}
                              runtime={singleContentData.runtime}
                              type={type}
                              // isLoading={isLoading}
                            />
                          ) : (
                            <div className="w-full h-[20px]">
                              <div className="flex flex-col justify-center items-center gap-1">
                                <span className="w-[200px] h-[7px] mt-2 animate-gradient-animation-loading  rounded-full"></span>
                                {/* <span className="w-[200px] h-[7px] my-1 animate-gradient-animation-loading rounded-full"></span> */}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="visible sm:hidden">
                          {singleContentData ? (
                            <AddToLists
                              type={type}
                              content={item}
                              contentRuntime={singleContentData.runtime}
                            />
                          ) : null}
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

                      {singleContentData ? (
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
                            contentRuntime={singleContentData.runtime}
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

export default HeroSliderMovies
