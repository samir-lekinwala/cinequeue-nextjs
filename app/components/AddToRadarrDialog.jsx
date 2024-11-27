import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react'
import { fetchRadarrData } from '../lib/radarrApiCalls'
import Select from 'react-select'

function AddToRadarrDialog({ content, type }) {
  const [open, setOpen] = useState(false)
  const [qualityProfileOptions, setQualityProfileOptions] = useState([])
  const [selectedQualityOption, setSelectedQualityOption] = useState(null)

  const qualityProfileFromStorage = JSON.parse(
    localStorage.getItem('radarr-quality-profile')
  )

  console.log(qualityProfileFromStorage)

  useEffect(() => {
    if (selectedQualityOption) {
      console.log('quality option selected', selectedQualityOption)
      localStorage.setItem(
        'radarr-quality-profile',
        JSON.stringify(selectedQualityOption)
      )
    }
  }, [selectedQualityOption])

  const handleOpen = () => {
    setOpen(!open)
  }

  // useEffect(() => {
  // const qualityProfileFromStorage = localStorage.getItem("radarr-quality-profile")

  // if(qualityProfileFromStorage){

  // setSelectedQualityOption()

  // }

  // },[])

  const yearReleased = content.release_date.split('').splice(0, 4)

  function createOptionsFromQualityFetch(data) {
    let options = []
    for (let i = 0; i < data.length; i++) {
      options.push({ value: data[i].id, label: data[i].name })
    }
    return options
  }

  // console.log(content, type, open)
  //grab the quality profile options
  useEffect(() => {
    if (open && content) {
      const response = async () => {
        const result = await fetchRadarrData('qualityprofile')
        setQualityProfileOptions(createOptionsFromQualityFetch(result))
        console.log(createOptionsFromQualityFetch(result))
      }
      response()
    } else return
  }, [open, content])

  const dataToSendToRadarr = {
    // title: 'Inception',
    qualityProfileId: 1,
    // titleSlug: 'inception',
    // images: [],
    tmdbId: 27205, // TMDb ID for Inception
    // year: 2010,
    rootFolderPath: 'D:\\Torrents\\Movies',
    monitored: false,
    // addOptions: {
    //   searchForMovie: false,
    // },
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="white"
        className="bg-white text-base bg-opacity-10 font-poppins font-normal normal-case rounded-xl p-2 px-2 hover:shadow-[0px_0px_20px_1px] hover:shadow-[#ff7e5f] transition ease-in-out"
      >
        Add to Radarr
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
        <div className="w-full flex justify-center text-white">
          <Select
            options={qualityProfileOptions}
            onChange={setSelectedQualityOption}
            className="w-1/2 "
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
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default AddToRadarrDialog
