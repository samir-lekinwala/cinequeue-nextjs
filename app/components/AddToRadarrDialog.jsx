import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Switch,
} from '@material-tailwind/react'
import {
  fetchRadarrData,
  getRadarrMovieIdFromTmdbId,
  postRadarrData,
} from '../lib/radarrApiCalls'
import Select from 'react-select'

function AddToRadarrDialog({ content, type }) {
  const [open, setOpen] = useState(false)
  const [qualityProfileOptions, setQualityProfileOptions] = useState([])
  const [selectedQualityOption, setSelectedQualityOption] = useState(null)
  const [rootFolderOptions, setRootFolderOptions] = useState([])
  const [selectedRootFolderOption, setSelectedRootFolderOption] = useState(null)
  const [movieMonitored, setMovieMonitored] = useState(true)
  const [searchNow, setSearchNow] = useState(false)
  const [movieInRadarr, setMovieInRadarr] = useState(null)

  const qualityProfileFromStorage = JSON.parse(
    localStorage.getItem('radarr-quality-profile')
  )
  const rootFolderFromStorage = JSON.parse(
    localStorage.getItem('radarr-root-folder')
  )

  useEffect(() => {
    if (selectedQualityOption) {
      localStorage.setItem(
        'radarr-quality-profile',
        JSON.stringify(selectedQualityOption)
      )
    }
  }, [selectedQualityOption])

  useEffect(() => {
    if (selectedRootFolderOption) {
      localStorage.setItem(
        'radarr-root-folder',
        JSON.stringify(selectedRootFolderOption)
      )
    }
  }, [selectedRootFolderOption])

  const handleOpen = () => {
    setOpen(!open)
  }

  const yearReleased = content.release_date.split('').splice(0, 4)

  function createOptionsFromQualityFetch(data) {
    let options = []
    for (let i = 0; i < data.length; i++) {
      options.push({ value: data[i].id, label: data[i].name })
    }
    return options
  }
  function createOptionsFromRootFolderFetch(data) {
    let options = []
    for (let i = 0; i < data.length; i++) {
      options.push({ value: data[i].path, label: data[i].path })
    }
    return options
  }

  //grab the quality profile options
  useEffect(() => {
    if (open && content) {
      const response = async () => {
        const resultQuality = await fetchRadarrData('qualityprofile')
        const resultRootFolder = await fetchRadarrData('rootfolder')
        setQualityProfileOptions(createOptionsFromQualityFetch(resultQuality))
        setRootFolderOptions(createOptionsFromRootFolderFetch(resultRootFolder))
      }
      response()
    } else return
  }, [open, content])

  const submitButtonHandler = () => {
    const dataToSendToRadarr = {
      title: content.title,
      qualityProfileId: qualityProfileFromStorage.value,
      tmdbId: content.id, // TMDb ID for Inception
      rootFolderPath: rootFolderFromStorage.value,
      monitored: movieMonitored,
      addOptions: {
        searchForMovie: searchNow,
      },
    }

    const response = async () => {
      const result = await postRadarrData('movie', dataToSendToRadarr)
      console.log('result of post for adding', result, dataToSendToRadarr)
      return result
    }
    console.log(response())
  }

  const isMovieCurrentlyInRadarr = () => {
    const response = async () => {
      const result = await getRadarrMovieIdFromTmdbId('movie', content.id)
      if (result) {
        setMovieInRadarr(result)
      } else setMovieInRadarr(false)
      // console.log('result for movie in radarr already', movieInRadarr)
    }
    response()
  }

  useEffect(() => {
    isMovieCurrentlyInRadarr()
  }, [submitButtonHandler])

  const theme = {
    switch: {
      defaultProps: {
        color: 'blue',
        label: '',
        ripple: true,
        className: '',
        disabled: false,
        containerProps: undefined,
        labelProps: undefined,
        circleProps: undefined,
      },
      valid: {
        colors: [
          'blue-gray',
          'gray',
          'brown',
          'deep-orange',
          'orange',
          'amber',
          'yellow',
          'lime',
          'light-green',
          'green',
          'teal',
          'cyan',
          'light-blue',
          'blue',
          'indigo',
          'deep-purple',
          'purple',
          'pink',
          'red',
        ],
      },
      styles: {
        base: {
          root: {
            display: 'inline-flex',
            alignItems: 'items-center',
          },
          container: {
            position: 'relative',
            display: 'inline-block',
            width: 'w-8',
            height: 'h-4',
            cursor: 'cursor-pointer',
            borderRadius: 'rounded-full',
          },
          input: {
            peer: 'peer',
            appearance: 'appearance-none',
            width: 'w-8',
            height: 'h-4',
            position: 'absolute',
            background: 'bg-blue-gray-100',
            borderRadius: 'rounded-full',
            cursor: 'cursor-pointer',
            transition: 'transition-colors duration-300',
          },
          circle: {
            bg: 'bg-white',
            width: 'w-5',
            height: 'h-5',
            borderWidth: 'border',
            borderColor: 'border-blue-gray-100',
            borderRadius: 'rounded-full',
            boxShadow: 'shadow-md',
            position: 'absolute',
            top: 'top-2/4',
            left: '-left-1',
            transform: '-translate-y-2/4 peer-checked:translate-x-full',
            transition: 'transition-all duration-300',
            cursor: 'cursor-pointer',
            before: {
              content: "before:content['']",
              display: 'before:block',
              bg: 'before:bg-blue-gray-500',
              width: 'before:w-10',
              height: 'before:h-10',
              borderRadius: 'before:rounded-full',
              position: 'before:absolute',
              top: 'before:top-2/4',
              left: 'before:left-2/4',
              transform: 'before:-translate-y-2/4 before:-translate-x-2/4',
              transition: 'before:transition-opacity',
              opacity: 'before:opacity-0 hover:before:opacity-10',
            },
          },
          ripple: {
            display: 'inline-block',
            top: 'top-2/4',
            left: 'left-2/4',
            transform: '-translate-x-2/4 -translate-y-2/4',
            p: 'p-5',
            borderRadius: 'rounded-full',
          },
          label: {
            color: 'text-gray-700',
            fontWeight: 'font-light',
            userSelect: 'select-none',
            cursor: 'cursor-pointer',
            mt: 'mt-px',
            ml: 'ml-3',
            mb: 'mb-0',
          },
          disabled: {
            opacity: 'opacity-50',
            pointerEvents: 'pointer-events-none',
          },
        },
        colors: {
          'blue-gray': {
            input: 'checked:bg-blue-gray-500',
            circle: 'peer-checked:border-blue-gray-500',
            before: 'peer-checked:before:bg-blue-gray-500',
          },
          gray: {
            input: 'checked:bg-gray-500',
            circle: 'peer-checked:border-gray-500',
            before: 'peer-checked:before:bg-gray-500',
          },
          brown: {
            input: 'checked:bg-brown-500',
            circle: 'peer-checked:border-brown-500',
            before: 'peer-checked:before:bg-brown-500',
          },
          'deep-orange': {
            input: 'checked:bg-deep-orange-500',
            circle: 'peer-checked:border-deep-orange-500',
            before: 'peer-checked:before:bg-deep-orange-500',
          },
          orange: {
            input: 'checked:bg-orange-500',
            circle: 'peer-checked:border-orange-500',
            before: 'peer-checked:before:bg-orange-500',
          },
          amber: {
            input: 'checked:bg-amber-500',
            circle: 'peer-checked:border-amber-500',
            before: 'peer-checked:before:bg-amber-500',
          },
          yellow: {
            input: 'checked:bg-yellow-500',
            circle: 'peer-checked:border-yellow-500',
            before: 'peer-checked:before:bg-yellow-500',
          },
          lime: {
            input: 'checked:bg-lime-500',
            circle: 'peer-checked:border-lime-500',
            before: 'peer-checked:before:bg-lime-500',
          },
          'light-green': {
            input: 'checked:bg-light-green-500',
            circle: 'peer-checked:border-light-green-500',
            before: 'peer-checked:before:bg-light-green-500',
          },
          green: {
            input: 'checked:bg-green-500',
            circle: 'peer-checked:border-green-500',
            before: 'peer-checked:before:bg-green-500',
          },
          teal: {
            input: 'checked:bg-teal-500',
            circle: 'peer-checked:border-teal-500',
            before: 'peer-checked:before:bg-teal-500',
          },
          cyan: {
            input: 'checked:bg-cyan-500',
            circle: 'peer-checked:border-cyan-500',
            before: 'peer-checked:before:bg-cyan-500',
          },
          'light-blue': {
            input: 'checked:bg-light-blue-500',
            circle: 'peer-checked:border-light-blue-500',
            before: 'peer-checked:before:bg-light-blue-500',
          },
          blue: {
            input: 'checked:bg-blue-500',
            circle: 'peer-checked:border-blue-500',
            before: 'peer-checked:before:bg-blue-500',
          },
          indigo: {
            input: 'checked:bg-indigo-500',
            circle: 'peer-checked:border-indigo-500',
            before: 'peer-checked:before:bg-indigo-500',
          },
          'deep-purple': {
            input: 'checked:bg-deep-purple-500',
            circle: 'peer-checked:border-deep-purple-500',
            before: 'peer-checked:before:bg-deep-purple-500',
          },
          purple: {
            input: 'checked:bg-purple-500',
            circle: 'peer-checked:border-purple-500',
            before: 'peer-checked:before:bg-purple-500',
          },
          pink: {
            input: 'checked:bg-pink-500',
            circle: 'peer-checked:border-pink-500',
            before: 'peer-checked:before:bg-pink-500',
          },
          red: {
            input: 'checked:bg-red-500',
            circle: 'peer-checked:border-red-500',
            before: 'peer-checked:before:bg-red-500',
          },
        },
      },
    },
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="white"
        className="bg-white text-base bg-opacity-10 font-poppins font-normal normal-case rounded-xl p-2 px-2 hover:shadow-[0px_0px_20px_1px] hover:shadow-[#ff7e5f] transition ease-in-out"
      >
        {movieInRadarr ? 'Remove from Radarr' : 'Add to Radarr'}
      </Button>
      <Dialog
        className="bg-gray-400 bg-opacity-20"
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <div className="p-4 text-white flex flex-col justify-start items-start">
          <p className="text-md font-thin">Add to Radarr</p>

          <p className="text-2xl font-normal">
            {content.title} - {yearReleased}
          </p>
        </div>

        <div className="w-full flex justify-center flex-col items-center gap-4 text-white">
          <div className=" flex-col items-center flex gap-2 w-full px-4 ">
            <label
              htmlFor="radarr-quality-profile"
              className="w-full text-left sm:text-center px-2"
            >
              Quality Profile
            </label>
            <Select
              id="radarr-quality-profile"
              options={qualityProfileOptions}
              onChange={setSelectedQualityOption}
              className="sm:w-2/3 w-full"
              defaultValue={
                qualityProfileFromStorage
                  ? qualityProfileFromStorage
                  : qualityProfileOptions[0]
              }
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: '#2a2a2a', // Highlighted option background on hover
                  primary: '#ff7e5f', // Selected option border and focus color
                  primary50: '#3a3a3a', // Highlighted option background when active
                  neutral0: '#1f1f1f', // Menu background
                  neutral5: '#2a2a2a', // Placeholder/disabled option background
                  neutral10: '#3a3a3a', // Multi-value background
                  neutral20: '#4a4a4a', // Border color
                  neutral30: '#5a5a5a', // Focused border color
                  neutral40: '#9a9a9a', // Placeholder text color
                  neutral50: '#c2c2c2', // Default text color
                  neutral80: '#e2e2e2', // Focused text color
                },
                spacing: {
                  baseUnit: 4,
                  controlHeight: 40,
                  menuGutter: 8,
                },
                borderRadius: 4,
              })}
            ></Select>
            {/* For root folder */}
            <label
              htmlFor="radarr-root-folder"
              className="w-full text-left sm:text-center px-2 "
            >
              Root Folder
            </label>
            <Select
              id="radarr-root-folder"
              options={rootFolderOptions}
              onChange={setSelectedRootFolderOption}
              className="sm:w-2/3 w-full"
              defaultValue={
                rootFolderFromStorage
                  ? rootFolderFromStorage
                  : rootFolderOptions[0]
              }
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: '#2a2a2a', // Highlighted option background on hover
                  primary: '#ff7e5f', // Selected option border and focus color
                  primary50: '#3a3a3a', // Highlighted option background when active
                  neutral0: '#1f1f1f', // Menu background
                  neutral5: '#2a2a2a', // Placeholder/disabled option background
                  neutral10: '#3a3a3a', // Multi-value background
                  neutral20: '#4a4a4a', // Border color
                  neutral30: '#5a5a5a', // Focused border color
                  neutral40: '#9a9a9a', // Placeholder text color
                  neutral50: '#c2c2c2', // Default text color
                  neutral80: '#e2e2e2', // Focused text color
                },
                spacing: {
                  baseUnit: 4,
                  controlHeight: 40,
                  menuGutter: 8,
                },
                borderRadius: 4,
              })}
            ></Select>
          </div>
          <div className="flex gap-3">
            <Switch
              onChange={() => setMovieMonitored(!movieMonitored)}
              checked={movieMonitored}
              label={
                <div
                  className={`${
                    movieMonitored ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {movieMonitored ? 'Monitored' : 'Not Monitored'}
                </div>
              }
              className=""
              color="orange"
            />
            <Switch
              onChange={() => setSearchNow(!searchNow)}
              checked={searchNow}
              label={
                <div
                  className={`${searchNow ? 'text-white' : 'text-gray-400'}`}
                >
                  {searchNow ? 'Search Now' : 'Auto'}
                </div>
              }
              color="orange"
              className=""
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={submitButtonHandler}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default AddToRadarrDialog
