import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useRef, useState } from 'react'
import { getData } from '../api/apiCalls'
import { set } from 'firebase/database'
import SingleSearchItem from './SingleSearchItem'
import page from '../watchlist/page'

function SearchBar({ searchBarClick, setSearchBarClick }) {
  const [searchInput, setSearchInput] = useState('')
  const [searchData, setSearchData] = useState([])
  const [searchResultsExists, setSearchResultsExists] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const dummy = useRef(null)

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

  // useEffect(() => {
  //   console.log(searchInput)
  // }, [searchInput])

  //need function that sets the state with data
  //need useeffect that gets the function to run when submit button clicked

  const clickSearchBar = () => {
    setSearchBarClick(true)
    console.log('dummy', dummy.current)
  }

  function handleSubmitButton(e) {
    e.preventDefault()
    getSearchData()
  }

  function handlePreviousPageClick() {
    setPageNumber(pageNumber - 1)
    getSearchData()
  }
  function handleNextPageClick() {
    setPageNumber(pageNumber + 1)
    getSearchData()
  }

  async function getSearchData() {
    console.log('search input from searchdata', searchInput)
    const result = await getData(
      `search/movie?query=${searchInput}&page=${pageNumber}`
    )
    console.log(result)
    setSearchData(result)
    setSearchResultsExists(true)
  }

  // useEffect(() => {

  //   getSearchData()
  // }, [searchInput])

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (dummy.current && !dummy.current.contains(event.target)) {
        setSearchBarClick(false)
        setSearchInput('')
        setSearchData([])
        setSearchResultsExists(false)
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dummy, searchInput])

  function showingResultsFromPageNumber() {
    let resultsSpan = ''

    if (searchData.total_results < 20) {
      resultsSpan = `0 to ${searchData.total_results}`
    } else if (
      searchData.total_results > 20 &&
      searchData.total_pages == pageNumber
    ) {
      const previousPagesResults = (pageNumber - 1) * 20
      const lastPageResultsLength =
        searchData.results.length + previousPagesResults
      resultsSpan = `${previousPagesResults + 1} to ${lastPageResultsLength}`
    } else {
      resultsSpan = `${pageNumber * 20 - 19} to ${pageNumber * 20}`
    }

    return resultsSpan
  }

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
        ref={dummy}
        onClick={clickSearchBar}
        className={`  ${
          searchBarClick ? 'w-full' : 'w-0 sm:w-1/4'
        }  transition-all ease-in-out relative `}
      >
        <MagnifyingGlassIcon
          className={`absolute h-full w-[15px]'
          `}
        />
        <form className="relative">
          <input
            value={searchInput}
            onChange={(e) => handleSearchInput(e)}
            className={`${
              searchBarClick ? 'visible ' : ''
            } bg-gray-800 h-[20px] w-full rounded-2xl bg-opacity-25 pr-16 pl-6 text-center`}
          />
          {searchBarClick ? (
            <button
              onClick={(e) => handleSubmitButton(e)}
              type="submit"
              className="absolute right-2"
            >
              Search
            </button>
          ) : null}
        </form>
        {searchData.results ? (
          <>
            <div className="bg-black absolute backdrop-blur-sm bg-opacity-90 z-30 top-[25px] w-full flex flex-col gap-2 max-h-[70vh] transition-all overflow-scroll items-start">
              {/* how many results and pages */}
              <div>Total results {searchData.total_results}</div>
              <div>Showing Results {showingResultsFromPageNumber()}</div>
              <div>
                <div
                  onClick={handlePreviousPageClick}
                  className={`${pageNumber == 1 ? 'hidden' : 'visible'}`}
                >
                  Previous
                </div>
                <div onClick={handleNextPageClick}>Next</div>
              </div>
              {searchData.results.map((item) => (
                <SingleSearchItem key={item.id} data={item} type={'movie'} />
              ))}
              <div>
                <div
                  onClick={handlePreviousPageClick}
                  className={`${pageNumber == 1 ? 'hidden' : 'visible'}`}
                >
                  Previous
                </div>
                <div onClick={handleNextPageClick}>Next</div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default SearchBar
