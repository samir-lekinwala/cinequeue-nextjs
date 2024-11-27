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
        <DialogHeader className="text-white flex flex-col justify-start items-start">
          <p className="text-sm font-thin">Add to Radarr</p>

          <p className="font-normal">
            {content.title} - {yearReleased}
          </p>
        </DialogHeader>
        <DialogBody className="text-white"></DialogBody>
        <div className="w-full flex justify-center flex-col items-center gap-4 text-white">
          <div className="sm:flex-row flex-col flex items-center gap-2 w-full px-4 ">
            <label
              htmlFor="radarr-quality-profile"
              className="w-full text-left px-2"
            >
              Quality Profile
            </label>
            <Select
              id="radarr-quality-profile"
              options={qualityProfileOptions}
              onChange={setSelectedQualityOption}
              className="sm:w-1/2 w-full"
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
              className="w-full text-left px-2 "
            >
              Root Folder
            </label>
            <Select
              id="radarr-root-folder"
              options={rootFolderOptions}
              onChange={setSelectedRootFolderOption}
              className="sm:w-1/2 w-full"
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
                <div className={`${movieMonitored ? 'text-white' : ''}`}>
                  {movieMonitored ? 'Monitored' : 'Not Monitored'}
                </div>
              }
              className=""
            />
            <Switch
              onChange={() => setSearchNow(!searchNow)}
              checked={searchNow}
              label={
                <div className={`${searchNow ? 'text-white' : ''}`}>
                  {searchNow ? 'Search Now' : 'Auto'}
                </div>
              }
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
