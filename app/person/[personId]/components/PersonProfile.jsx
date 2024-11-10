import React, { useEffect, useState } from 'react'
import SingleItemContent from '../../../components/SingleItemContent'
import OwlCarousel from '../../../components/OwlCarousel'

function PersonProfile({ data }) {
  const [biographyButtonClick, setBiographyButtonClick] = useState(false)
  const [yearsOld, setYearsOld] = useState(0)
  const [movieCredits, setMovieCredits] = useState([])
  const [tvCredits, setTvCredits] = useState([])
  const [charactersClick, setCharactersClick] = useState(false)

  const biographyOpen = () => setBiographyButtonClick(true)
  const biographyClose = () => setBiographyButtonClick(false)

  const handleCharactersClick = () => setCharactersClick(!charactersClick)
  // const handleCharactersClick = () => setCharactersClick(false)

  function calculateAge(birthDate, otherDate) {
    birthDate = new Date(birthDate)
    otherDate = new Date(otherDate)
    console.log(birthDate, otherDate)
    let years = otherDate.getFullYear() - birthDate.getFullYear()

    if (
      otherDate.getMonth() < birthDate.getMonth() ||
      (otherDate.getMonth() == birthDate.getMonth() &&
        otherDate.getDate() < birthDate.getDate())
    ) {
      years--
    }

    return years
  }

  useEffect(() => {
    if (data) {
      if (data.deathday) {
        setYearsOld(calculateAge(data.birthday, data.birthday))
      } else if (data.birthday) {
        const todaysDate = new Date()
        setYearsOld(calculateAge(data.birthday, todaysDate))
      }
      const sortedMoviesByDate = data.movie_credits.cast.toSorted((a, b) => {
        const aTest = new Date(a.release_date)
        const bTest = new Date(b.release_date)

        return bTest - aTest
      })
      setMovieCredits(sortedMoviesByDate)

      function combineDuplicateId() {
        const characterMap = {}
        //get the id of the show, if the id is the same add the character to the characterArray.
        const tvCreditsArray = data.tv_credits.cast
        // const tvCreditsArray = data.tv_credits.cast.toSorted((a, b) => a.id - b.id)

        if (tvCreditsArray) {
          for (let i = 0; i < tvCreditsArray.length; i++) {
            // console.log('index', i, tvCreditsArray[i + 1])
            if (
              characterMap[tvCreditsArray[i].id]
              //stuck here...
            ) {
              characterMap[tvCreditsArray[i].id].push(
                tvCreditsArray[i].character
              )
            } else {
              characterMap[tvCreditsArray[i].id] = [tvCreditsArray[i].character]
            }
          }

          console.log('combined deplicate test', characterMap)
        }

        let newSortedTvCredits = [...tvCreditsArray]

        for (const key in characterMap) {
          if (characterMap[key].length >= 2) {
            console.log('length longer than 1', key, characterMap[key])
            // tvCreditsArray[key]
            const filterDuplicate = newSortedTvCredits.filter(
              (item) => item.id == key
            )
            const removedDuplicates = newSortedTvCredits.filter(
              (item) => item.id != key
            )
            filterDuplicate[0].character = characterMap[key].join(', ')

            removedDuplicates.push(filterDuplicate[0])
            // removedDuplicates.push()
            newSortedTvCredits = [...removedDuplicates]
          }
        }

        const sortedTvByDate = newSortedTvCredits.toSorted((a, b) => {
          const aTest = new Date(a.first_air_date)
          const bTest = new Date(b.first_air_date)

          return bTest - aTest
        })

        console.log('new sorted tv credits', sortedTvByDate)
        return sortedTvByDate
      }

      setTvCredits(combineDuplicateId())
    }
  }, [data])

  return data ? (
    <div className="">
      <div className="p-4 sm:flex-row flex flex-col gap-2">
        <div className="">
          {' '}
          <img
            className="rounded-xl   object-contain "
            src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`}
            alt=""
          />
        </div>

        <div className="text-white sm:w-full flex flex-col gap-2">
          <div className="text-2xl animate-gradient-animation-text text-transparent text-center">
            {data.name}
          </div>
          <div>{yearsOld} Years old</div>
          {data.deathday ? (
            <div>
              {data.birthday} - {data.deathday}
            </div>
          ) : (
            <div>{data.birthday}</div>
          )}
          <div>{data.place_of_birth}</div>
          <div
            onClick={!biographyButtonClick ? biographyOpen : biographyClose}
            className={`text-sm ${
              biographyButtonClick ? 'line-clamp-none' : 'line-clamp-6'
            }`}
          >
            {data.biography}
          </div>
          <div className="text-transparent animate-gradient-animation-text">
            {!biographyButtonClick ? (
              <button onClick={biographyOpen}>Read More</button>
            ) : (
              <button onClick={biographyClose}>Read Less</button>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="text-center relative">
          <span className="flex justify-center items-center flex-col relative text-transparent animate-gradient-animation-text text-2xl">
            Movies
            <span className="h-[1px] bottom-0 w-2/3 bg-deep-orange-500 animate-gradient-animation"></span>
          </span>
          {/* <div className="flex justify-center flex-wrap gap-2 "> */}
          <div className="">
            {movieCredits ? (
              <OwlCarousel
                type={'movie'}
                content={movieCredits}
                actorsPage={true}
              />
            ) : null}
          </div>
          {/* {movieCredits?.map((movie) => (
              <div
                key={movie.id}
                className="hover:scale-[1.02] transition-all duration-300"
              >
                <span
                  onClick={handleCharactersClick}
                  className={`text-white object-contain w-[200px] ${
                    charactersClick ? 'line-clamp-none' : 'line-clamp-1'
                  } `}
                >
                  {movie.character
                    ? movie.character
                    : 'No Character Name Found'}
                </span>
                <SingleItemContent
                  content={movie}
                  type={'movie'}
                  classes={'rounded-xl'}
                />
              </div>
            ))} */}
          {/* </div> */}
        </div>
        <div className="text-center">
          <span className="flex justify-center items-center flex-col relative text-transparent animate-gradient-animation-text text-2xl">
            TV
            <span className="h-[1px] bottom-0 w-2/3 bg-deep-orange-500 animate-gradient-animation"></span>
          </span>
          <div className="">
            {tvCredits ? (
              <OwlCarousel type={'tv'} content={tvCredits} actorsPage={true} />
            ) : null}
          </div>
          {/* <div className="flex justify-center flex-wrap gap-2">
            {tvCredits?.map((tv) => (
              <div
                key={tv.credit_id}
                className="hover:scale-[1.02] transition-all duration-300"
              >
                <span
                  onClick={handleCharactersClick}
                  className={`text-white object-contain w-[200px] ${
                    charactersClick ? 'line-clamp-none' : 'line-clamp-1'
                  } `}
                >
                  {tv.character ? tv.character : 'No Character Name Found'}
                </span>
                <SingleItemContent
                  content={tv}
                  type={'tv'}
                  classes={'rounded-xl'}
                />
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  ) : null
}

export default PersonProfile
