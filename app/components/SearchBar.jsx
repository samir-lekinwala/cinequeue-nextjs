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
  const [pageNumber, setPageNumber] = useState(1)
  const [lastSearchResultNumber, setLastSearchResultNumber] = useState(0)

  const [isLoading, setIsLoading] = useState(false)
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
    setPageNumber(1)
    getSearchData()
  }

  async function getSearchData() {
    console.log('search input from searchdata', searchInput)
    const resultMovies = await getData(
      `search/movie?query=${searchInput}&page=${pageNumber}`
    )
    const resultTv = await getData(
      `search/tv?query=${searchInput}&page=${pageNumber}`
    )
    const result = [...resultMovies.results, ...resultTv.results]
    const totalResults = resultMovies.total_results + resultTv.total_results
    const combinedResult = result.sort((a, b) => a.popularity < b.popularity)
    const totalPages = resultMovies.total_pages + resultTv.total_pages
    console.log(
      'testing6',
      combinedResult,
      'resultmovies',
      resultMovies,
      'resultTV',
      resultTv
    )
    setSearchData({
      total_results: totalResults,
      results: combinedResult,
      total_pages: totalPages,
    })
    setSearchResultsExists(true)
    setLastSearchResultNumber(totalResults)
    // if (!result) {
    //   setIsLoading(true)
    // } else setIsLoading(false)
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
    setPageNumber(1)
    setLastSearchResultNumber(0)
    console.log('searchbarclick', searchBarClick)
  }
  // console.log('searchbar click', searchBarClick)

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
            length={searchData.total_results}
            fetchData={getData}
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
