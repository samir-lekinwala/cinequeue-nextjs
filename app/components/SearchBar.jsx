import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useRef, useState } from 'react'
import { getData } from '../api/apiCalls'
import { set } from 'firebase/database'
import SingleSearchItem from './SingleSearchItem'
import page from '../watchlist/page'
import Link from 'next/link'
import InfiniteScrollFunc from '../functions/InfiniteScrollFunc'

function SearchBar({ searchBarClick, setSearchBarClick }) {
  const [searchInput, setSearchInput] = useState('')
  const [searchData, setSearchData] = useState([])
  const [searchResultsExists, setSearchResultsExists] = useState(false)
  const [pageNumber, setPageNumber] = useState({ movies: 0, tv: 0 })
  const [totalSearchResults, setTotalSearchResults] = useState(0)
  const [totalPages, setTotalPages] = useState({ movies: 0, tv: 0 })

  const searchRef = useRef(null)
  const inputRef = useRef(null)

  function handleSearchInput(e) {
    setSearchInput(e.target.value)
  }

  const inputFocus = () => {
    inputRef.current.focus()
  }

  useEffect(() => {
    if (searchBarClick) {
      setTimeout(() => {
        inputFocus()
      }, 100)
    }
  }, [searchBarClick])

  useEffect(() => {
    if (searchData.results) {
      // Prevent scrolling on the body
      document.body.style.overflow = 'hidden'
    } else {
      // Re-enable scrolling on the body
      document.body.style.overflow = ''
    }

    // Cleanup function to reset overflow when component unmounts or searchData changes
    return () => {
      document.body.style.overflow = ''
    }
  }, [searchData.results])

  const clickSearchBar = () => {
    setSearchBarClick(true)
  }

  function handleSubmitButton(e) {
    e.preventDefault()
    setPageNumber({ movies: 1, tv: 1 })
    getSearchData()
  }

  async function getSearchData(movies, tv) {
    if (movies && tv) {
      console.log('movies and tv')
      const resultMovies = await getData(
        `search/movie?query=${searchInput}&page=${pageNumber.movies}`
      )
      const resultTv = await getData(
        `search/tv?query=${searchInput}&page=${pageNumber.tv}`
      )
      const result = [...resultMovies.results, ...resultTv.results]
      const combinedResult = result.sort((a, b) => a.popularity < b.popularity)

      console.log('page', pageNumber, combinedResult)
      console.log('testing20', [...searchData.results, ...combinedResult])
      setSearchData({ results: [...searchData.results, ...combinedResult] })
    } else {
      const resultMovies = await getData(
        `search/movie?query=${searchInput}&page=${pageNumber.movies}`
      )
      const resultTv = await getData(
        `search/tv?query=${searchInput}&page=${pageNumber.tv}`
      )
      const result = [...resultMovies.results, ...resultTv.results]
      const totalResults = resultMovies.total_results + resultTv.total_results
      const combinedResult = result.sort((a, b) => a.popularity < b.popularity)
      // const totalPages = resultMovies.total_pages + resultTv.total_pages

      setSearchData({
        results: combinedResult,
      })
      setTotalPages({
        movies: resultMovies.total_pages,
        tv: resultTv.total_pages,
      })
      setTotalSearchResults(totalResults)
      setSearchResultsExists(true)
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        closeSearchBar()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchRef])

  const closeSearchBar = () => {
    setTimeout(() => {
      setSearchBarClick(false)
    }, 1)

    setSearchInput('')
    setSearchData([])
    setSearchResultsExists(false)
    setPageNumber({ movies: 0, tv: 0 })
    setTotalSearchResults(0)
    setTotalPages({ movies: 0, tv: 0 })
    console.log('searchbarclick', searchBarClick)
  }

  function getNextSearchResults() {
    console.log('getnextsearchresults func')

    if (
      pageNumber.movies < totalPages.movies &&
      pageNumber.tv < totalPages.tv
    ) {
      const tempPageNumberMovies = pageNumber.movies + 1
      const tempPageNumberTv = pageNumber.tv + 1

      setPageNumber((previousPageNumber) => ({
        movies: previousPageNumber.movies + 1,
        tv: previousPageNumber.tv + 1,
      }))
      getSearchData('movies', 'tv')
      // console.log('total pages', totalPages)

      // getSearchData('movies', 'tv')
      // console.log('test1', pageNumber, totalPages, {
      //   movies: pageNumber.movies + 1,
      //   tv: pageNumber.tv + 1,
      // })
    } else if (pageNumber.movies < totalPages.movies) {
      setPageNumber({ movies: pageNumber.movies + 1, tv: pageNumber.tv })
      getSearchData('movies')
      console.log('test2', pageNumber, totalPages)
    } else if (pageNumber.tv < totalPages.tv) {
      setPageNumber({ movies: pageNumber.movies, tv: pageNumber.tv + 1 })
      getSearchData('tv')
      console.log('test3', pageNumber, totalPages)
    }

    //will get called via the infinite scrolling component
    //changes the pagenumber based on if the pagenumber is less than the total number.
    //
  }

  return (
    <div
      className={`z-0 sm:absolute ${
        searchBarClick ? 'absolute p-2' : 'sm:pr-0 pr-16'
      } ${
        searchData ? 'absolute p-0' : ''
      } w-full flex justify-end sm:justify-center text-white my-auto`}
    >
      {searchResultsExists ? (
        <div className="fixed inset-0 backdrop-blur-sm"> </div>
      ) : null}

      <div
        ref={searchRef}
        onClick={clickSearchBar}
        className={`  ${
          searchBarClick ? 'w-full' : 'w-0 sm:w-1/4'
        }  transition-all ease-in-out relative `}
      >
        <MagnifyingGlassIcon
          className={` ${
            searchBarClick
              ? 'h-full absolute '
              : 'sm:absolute relative h-[20px]'
          } w-[24px] '
          `}
        />
        {searchBarClick ? (
          <form className="relative">
            <div className="flex items-center">
              <input
                ref={inputRef}
                value={searchInput}
                onChange={(e) => handleSearchInput(e)}
                className={`bg-gray-800 h-[20px] rounded-2xl  bg-opacity-25 text-center ${
                  searchBarClick
                    ? ' w-full block'
                    : 'sm:block hidden w-1/2 h-20'
                } `}
              />
              {searchBarClick ? (
                <button
                  onClick={(e) => handleSubmitButton(e)}
                  type="submit"
                  className={`rounded-2xl bg-opacity-25 text-base absolute right-0 mr-1 font-poppins
                    
                  `}
                >
                  Search
                </button>
              ) : null}
            </div>
          </form>
        ) : (
          <form className="relative">
            <input
              value={searchInput}
              onChange={(e) => handleSearchInput(e)}
              className={`bg-gray-800 h-[20px] rounded-2xl hidden sm:block w-full  bg-opacity-25 pr-16 pl-6 text-center`}
            />
          </form>
        )}
        {searchData.results ? (
          <InfiniteScrollFunc
            items={searchData.results}
            totalResults={totalSearchResults}
            fetchData={getNextSearchResults}
            // setNextSearchScroll={setNextSearchScroll}
            closeSearchBar={closeSearchBar}
            setSearchBarClick={setSearchBarClick}
            searchBarClick={searchBarClick}
          />
        ) : null}
      </div>
    </div>
  )
}

export default SearchBar
