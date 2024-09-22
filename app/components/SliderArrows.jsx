import React from 'react'
import { RiArrowLeftWideFill, RiArrowRightWideFill } from 'react-icons/ri'

function SliderArrows({ handleLeftClick, handleRightClick }) {
  return (
    <div className=" w-full flex justify-center items-end h-full z-60">
      <div className=" flex justify-between w-full ">
        <div
        // onClick={handleLeftClick}
        // className="text-2xl text-white z-70 hover:text-slate-600 transition-all duration-300"
        >
          <RiArrowLeftWideFill
            onClick={handleLeftClick}
            className=" text-2xl relative text-white  z-99 hover:text-slate-600 transition-all duration-300"
          />
        </div>
        <div
          onClick={handleRightClick}
          className="text-2xl text-white z-70 hover:text-slate-600 transition-all duration-300"
        >
          <RiArrowRightWideFill />
        </div>
      </div>
    </div>
  )
}

export default SliderArrows
