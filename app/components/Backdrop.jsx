import React from 'react'

function Backdrop({ item, index, currentSlide, contentLength }) {
  return (
    <>
      {currentSlide === index ||
      index == currentSlide + 1 ||
      index == currentSlide - 1 ||
      index == contentLength - 1 ||
      (currentSlide == contentLength - 1 && index == 0) ? (
        <div
          className={`${
            currentSlide == index ? `min-h-[850px] opacity-100  ` : 'opacity-0'
          } transition-all ease-in duration-[700ms]`}
          key={item.id}
          style={{
            zIndex: '0',
            backgroundImage: `
linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
url("https://image.tmdb.org/t/p/w1280${item.backdrop_path}")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>
      ) : null}
    </>
  )
}

export default Backdrop
