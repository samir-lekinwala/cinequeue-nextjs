import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useRef, useState } from 'react'
import { getData } from '../api/apiCalls'
import { set } from 'firebase/database'

function SearchBar({ searchBarClick, setSearchBarClick }) {
  const [searchInput, setSearchInput] = useState('')
  const [searchData, setSearchData] = useState([])
  const dummy = useRef(null)

  function handleSearchInput(e) {
    setSearchInput(e.target.value)
  }

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

  async function getSearchData() {
    console.log('search input from searchdata', searchInput)
    const result = await getData(`search/movie?query=${searchInput}`)
    console.log(result)
    setSearchData(result)
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
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dummy, searchInput])

  return (
    <div
      className={`z-0 sm:absolute ${
        searchBarClick ? 'absolute pr-0' : ''
      } w-full flex justify-end sm:justify-center pr-5 sm:p-0 text-white my-auto`}
    >
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
          <div className="bg-red-200 absolute z-30 top-[25px] w-full flex flex-col max-h-[70vh]">
            {searchData.results.map((item) => (
              <p className="text-white" key={item.id}>
                {item.title}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default SearchBar
