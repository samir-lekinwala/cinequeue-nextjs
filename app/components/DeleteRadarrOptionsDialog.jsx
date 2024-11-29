import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Checkbox,
  Typography,
} from '@material-tailwind/react'

export function DeleteRadarrOptionsDialog({
  exclusionChecked,
  setExclusionChecked,
  deleteMovieFolderChecked,
  setDeleteMovieFolderChecked,
  open,
  setOpen,
  content,
  yearReleased,
  deleteMovieFromRadarr,
  firstDialogBoxOpen,
}) {
  // const [open, setOpen] = React.useState(false)

  useEffect(() => {
    if (open) {
      setOpen(true)
    } else if (!open) {
      setOpen(false)
      //   setTimeout(
      //     (() => setDeleteButtonClicked(false),
      //     console.log('delete dialog close')),
      //     1000
      //   )
    }
  }, [open])

  const handleOpen = () => setOpen(!open)

  const deleteConfirmed = () => {
    console.log('checked or not', exclusionChecked, deleteMovieFolderChecked)
    deleteMovieFromRadarr(deleteMovieFolderChecked, exclusionChecked)

    setTimeout(() => handleOpen(), 200)
    setTimeout(() => {
      firstDialogBoxOpen()
    }, 300)
  }

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-gray-400 bg-opacity-20 duration-400"
      >
        <div className="p-4 text-white flex flex-col justify-start items-start">
          <p className="text-md font-thin">Delete Options</p>

          <p className="text-2xl font-normal">
            {content.title} - {yearReleased}
          </p>
        </div>
        <Checkbox
          defaultChecked={exclusionChecked}
          onChange={() => setExclusionChecked(!exclusionChecked)}
          label={
            <div>
              <Typography color="white" className="font-medium">
                Add List Exclusion
              </Typography>
              <Typography variant="small" color="white" className="font-normal">
                Prevent movie from being added to Radarr by lists.
              </Typography>
            </div>
          }
          containerProps={{
            className: '-mt-5',
          }}
        />
        <Checkbox
          defaultChecked={deleteMovieFolderChecked}
          onChange={() =>
            setDeleteMovieFolderChecked(!deleteMovieFolderChecked)
          }
          label={
            <div>
              <Typography color="white" className="font-medium">
                Delete Movie Folder
              </Typography>
              <Typography variant="small" color="white" className="font-normal">
                Delete the movie folder and its contents.
              </Typography>
            </div>
          }
          containerProps={{
            className: '-mt-5',
          }}
        />
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="red" onClick={deleteConfirmed}>
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default DeleteRadarrOptionsDialog
