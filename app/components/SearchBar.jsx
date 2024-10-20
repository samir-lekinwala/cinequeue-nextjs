import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useRef, useState } from 'react'
import { getData } from '../api/apiCalls'
import { set } from 'firebase/database'
import SingleSearchItem from './SingleSearchItem'
import page from '../watchlist/page'
import Link from 'next/link'

function SearchBar({ searchBarClick, setSearchBarClick }) {
  const [searchInput, setSearchInput] = useState('')
  const [searchData, setSearchData] = useState([])
  const [searchResultsExists, setSearchResultsExists] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [lastSearchResultNumber, setLastSearchResultNumber] = useState(0)
  const [nextPageButton, setNextPageButton] = useState(false)
  const [previousPageButton, setPreviousPageButton] = useState(false)
  const searchRef = useRef(null)
  const searchItemRef = useRef(null)

  function handleSearchInput(e) {
    setSearchInput(e.target.value)
  }

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

  function handlePreviousPageClick() {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1)
      getSearchData()
    } else setPageNumber(1)
  }
  function handleNextPageClick() {
    if (pageNumber !== searchData.total_pages) {
      setPageNumber(pageNumber + 1)
      getSearchData()
    } else setPageNumber(searchData.total_pages)
  }

  useEffect(() => {
    if (searchInput) {
      getSearchData()
    }
  }, [pageNumber])

  async function getSearchData() {
    console.log('search input from searchdata', searchInput)
    const result = await getData(
      `search/movie?query=${searchInput}&page=${pageNumber}`
    )
    console.log('testing6', result)
    setSearchData(result)
    setSearchResultsExists(true)
    setLastSearchResultNumber(result.total_results)
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

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (
  //       searchItemRef.current &&
  //       !searchItemRef.current.contains(event.target)
  //     ) {
  //       closeSearchBar()
  //     }
  //   }
  //   // Bind the event listener
  //   document.addEventListener('mousedown', handleClickOutside)
  //   return () => {
  //     // Unbind the event listener on clean up
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // }, [searchItemRef, searchBarClick])

  function showingResultsFromPageNumber() {
    let resultsSpan = ''
    // let currentTotal = 0

    if (searchData.total_results < 20) {
      resultsSpan = `0 to ${searchData.total_results}`
    } else if (
      searchData.total_results > 20 &&
      searchData.total_pages == pageNumber &&
      searchData.results.length > 0
    ) {
      const previousPagesResults = (pageNumber - 1) * 20
      const lastPageResultsLength =
        searchData.results.length + previousPagesResults
      resultsSpan = `${previousPagesResults + 1} to ${lastPageResultsLength}`
      // currentTotal = lastPageResultsLength
    } else {
      resultsSpan = `${pageNumber * 20 - 19} to ${pageNumber * 20}`
      // currentTotal = pageNumber * 20
      // setPreviousPageButton(true)
    }

    return resultsSpan
  }

  useEffect(() => {
    if (pageNumber <= searchData.total_pages) {
      setNextPageButton(true)
    } else {
      setNextPageButton(false)
    }

    if (pageNumber <= 1) {
      setPreviousPageButton(false)
    } else {
      setPreviousPageButton(true)
    }

    if (pageNumber * 20 >= searchData.total_results) {
      setNextPageButton(false)
    }
  }, [pageNumber, searchData.total_pages, searchData.total_results])

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
        searchBarClick ? 'absolute pr-0' : ''
      } w-full flex justify-end sm:justify-center pr-5 sm:p-0 text-white my-auto`}
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
            searchBarClick ? 'h-full absolute' : 'sm:absolute relative h-[20px]'
          } w-[15px]'
          `}
        />
        {searchBarClick ? (
          <form className="relative">
            <input
              value={searchInput}
              onChange={(e) => handleSearchInput(e)}
              className={`bg-gray-800 h-[20px] rounded-2xl  bg-opacity-25 pr-16 pl-6 text-center ${
                searchBarClick ? 'block w-full' : 'sm:block hidden w-1/2 h-20'
              } `}
            />
            {searchBarClick ? (
              <button
                onClick={(e) => handleSubmitButton(e)}
                type="submit"
                className={`
                    
                  absolute right-2`}
              >
                Search
              </button>
            ) : null}
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
          <>
            <div className="bg-black absolute backdrop-blur-sm bg-opacity-90 z-30 top-[25px] w-full flex flex-col gap-2 max-h-[70vh] transition-all overflow-scroll items-start">
              {/* how many results and pages */}
              {searchData.total_results == 0 ? (
                <div className="text-center w-full text-2xl">
                  No results found.
                </div>
              ) : (
                <>
                  <div className="flex justify-center w-full flex-col items-center">
                    <div>Total results {searchData.total_results}</div>
                    <div>
                      Showing Results {showingResultsFromPageNumber()} Page
                      number: {pageNumber}
                    </div>
                  </div>
                  <div className="flex justify-between w-full px-4 transition-all">
                    <div
                      onClick={handlePreviousPageClick}
                      className={`${
                        previousPageButton
                          ? 'opacity-100 cursor-pointer'
                          : 'opacity-0'
                      } hover:text-gray-400 transition-all duration-200`}
                    >
                      Previous
                    </div>
                    <div
                      onClick={handleNextPageClick}
                      className={`${
                        nextPageButton
                          ? 'opacity-100 cursor-pointer'
                          : 'opacity-0'
                      } hover:text-gray-400 transition-all duration-200`}
                    >
                      Next
                    </div>
                  </div>

                  {searchData.results.map((item) => (
                    <>
                      <div
                        key={item.id}
                        onClick={closeSearchBar}
                        // ref={searchItemRef}
                      >
                        <SingleSearchItem
                          data={item}
                          type={'movie'}
                          setSearchBarClick={setSearchBarClick}
                          searchBarClick={searchBarClick}
                        />
                      </div>
                    </>
                  ))}
                  <div>
                    {/* <div
                  onClick={handlePreviousPageClick}
                  className={`${pageNumber == 1 ? 'hidden' : 'visible'}`}
                >
                  Previous
                </div>
                <div onClick={handleNextPageClick}>Next</div> */}
                  </div>
                </>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default SearchBar
