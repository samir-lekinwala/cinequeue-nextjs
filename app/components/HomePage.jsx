import React, { useEffect, useState } from 'react'
import Hero from './Hero'
import MoviesCarousel from './MoviesCarousel'
import SwitchContent from './SwitchContent'

function HomePage() {
  const [contentType, setContentType] = useState('movie')
  const [typeBarClick, setTypeBarClick] = useState(true)

  function handleMoviesClick() {
    setContentType('movie')
  }

  function handleTVShowsClick() {
    setContentType('tv')
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
      <MoviesCarousel />
    </div>
  )
}

export default HomePage
