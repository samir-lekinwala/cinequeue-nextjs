import React, { useEffect, useState } from 'react'
import Hero from './Hero'
import MoviesCarousel from './MoviesCarousel'
import TVCarousel from './TVCarousel'
import SwitchContent from './SwitchContent'
import { useDocumentTitle } from 'usehooks-ts'

function HomePage() {
  const [contentType, setContentType] = useState(null)
  const [typeBarClick, setTypeBarClick] = useState(true)

  const typesFormatted = new Map([
    ['movie', 'Movies'],
    ['tv', 'TV Shows'],
  ])
  useDocumentTitle(`CineQueue - ${typesFormatted.get(contentType)}`)

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
    <div className="">
      <SwitchContent
        handleMoviesClick={handleMoviesClick}
        handleTVShowsClick={handleTVShowsClick}
        handleTypeBarClick={handleTypeBarClick}
        typeBarClick={typeBarClick}
        contentType={contentType}
      />
      <div className="">
        <Hero type={contentType} />
        {contentType == 'movie' ? <MoviesCarousel /> : <TVCarousel />}
      </div>
    </div>
  )
}

export default HomePage
