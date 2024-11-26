import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from '@material-tailwind/react'
import { fetchRadarrData } from '../lib/radarrApiCalls'

function AddToRadarrDialog({ content, type }) {
  const [open, setOpen] = useState(false)
  const [qualityProfileOptions, setQualityProfileOptions] = useState([])

  const handleOpen = () => {
    setOpen(!open)
  }

  // console.log(content, type, open)
  //grab the quality profile options
  useEffect(() => {
    if (open) {
      const response = async () => {
        const result = await fetchRadarrData('qualityprofile')
        setQualityProfileOptions(result)
      }
      response()
    } else return
  }, [open])

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

          <p className="font-normal">{content.title}</p>
        </DialogHeader>
        <DialogBody className="text-white">
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody>
        <div className="w-full flex justify-center">
          <select
            className="w-1/2 bg-black bg-opacity-10 text-white"
            placeholder="1"
            labelProps={{
              className: 'hidden',
            }}
          >
            {qualityProfileOptions && qualityProfileOptions.length > 0
              ? qualityProfileOptions.map((quality) => (
                  <option
                    className="bg-black bg-opacity-10 text-white rounded-2xl"
                    key={quality.id}
                    value={quality.id}
                  >
                    {quality.name}
                  </option>
                ))
              : null}
          </select>
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
