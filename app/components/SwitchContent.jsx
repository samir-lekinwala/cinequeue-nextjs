import React from 'react'

function SwitchContent({
  handleMoviesClick,
  handleTVShowsClick,
  handleTypeBarClick,
  typeBarClick,
  contentType,
}) {
  return (
    <div
      onClick={handleTypeBarClick}
      className={`mt-3 bg-opacity-10 w-1/2 mx-auto rounded-full max-w-[400px]  ${
        typeBarClick ? 'h-8' : 'h-2'
      } transition-all duration-300 flex justify-center items-center bg-white font-poppins`}
    >
      {/* Conditional rendering for switch bar for movies */}
      <div
        onClick={handleMoviesClick}
        className={` ${
          typeBarClick && contentType == 'movie'
            ? 'text-[#ff7e5f] h-8 flex justify-center items-center rounded-full border border-[#ff7e5f]'
            : 'text-white'
        } 
    
    ${
      //Conditional if typebar hasn't been clicked and the content is selected as movies
      !typeBarClick && contentType == 'movie'
        ? 'bg-[#ff7e5f] bg-opacity-45 h-2 rounded-full animate-gradient-animation'
        : null
    } text-sm w-1/2 text-center`}
      >
        {/* Text for Movies */}
        {!typeBarClick ? null : 'Movies'}
      </div>
      {/* Conditional rendering for switch bar for tv shows */}
      <div
        onClick={handleTVShowsClick}
        className={`${
          typeBarClick && contentType == 'tv'
            ? 'text-[#ff7e5f] h-8 flex justify-center items-center rounded-full border border-[#ff7e5f] '
            : 'text-white'
        } ${
          //Conditional if typebar hasn't been clicked and the content is selected as movies
          !typeBarClick && contentType == 'tv'
            ? 'bg-[#ff7e5f] bg-opacity-45 h-2 rounded-full animate-gradient-animation'
            : null
        } text-sm w-1/2 text-center`}
      >
        {/* Text for TV Shows */}
        {!typeBarClick ? null : 'TV Shows'}
      </div>
    </div>
  )
}

export default SwitchContent
