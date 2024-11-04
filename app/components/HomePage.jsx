import React, { useEffect, useState } from 'react'
import Hero from './Hero'
import MoviesCarousel from './MoviesCarousel'
import TVCarousel from './TVCarousel'
import SwitchContent from './SwitchContent'

function HomePage() {
  const [contentType, setContentType] = useState(null)
  const [typeBarClick, setTypeBarClick] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('type') == undefined) {
      setContentType('movie')
    } else setContentType(JSON.parse(localStorage.getItem('type')))
  }, [])

  function handleMoviesClick() {
    setContentType('movie')
    localStorage.setItem('type', JSON.stringify('movie'))
  }

  function handleTVShowsClick() {
    setContentType('tv')
    localStorage.setItem('type', JSON.stringify('tv'))
  }

  function handleTypeBarClick() {
    setTypeBarClick(!typeBarClick)
  }

  useEffect(() => {
    function Func1Delay() {
      setTimeout(load, 3000)

      function load() {
        setTypeBarClick(false)
        // Stuff to do three seconds later
      }
    }
    Func1Delay()
  }, [])

  return (
    <div>
      <SwitchContent
        handleMoviesClick={handleMoviesClick}
        handleTVShowsClick={handleTVShowsClick}
        handleTypeBarClick={handleTypeBarClick}
        typeBarClick={typeBarClick}
        contentType={contentType}
      />
      <Hero type={contentType} />
      {contentType == 'movie' ? <MoviesCarousel /> : <TVCarousel />}
    </div>
  )
}

export default HomePage
