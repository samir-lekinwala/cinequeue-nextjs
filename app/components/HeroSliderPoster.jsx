import React from 'react'

function HeroSliderPoster({ item, index, currentSlide, contentLength }) {
  return (
    <>
      {currentSlide === index ||
      index == currentSlide + 1 ||
      index == currentSlide - 1 ||
      index == contentLength - 1 ||
      (currentSlide == contentLength - 1 && index == 0) ? (
        <img
          className={`${
            currentSlide == index ? 'opacity-100 z-20 relative ' : 'opacity-0'
          } grow  w-auto h-[450px] transition-all duration-[500ms] ease-in-out `}
          alt={`${item.name} poster`}
          src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
        ></img>
      ) : null}
    </>
  )
}

export default HeroSliderPoster
