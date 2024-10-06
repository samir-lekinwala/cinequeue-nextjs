import React from 'react'
import { RiArrowLeftWideFill, RiArrowRightWideFill } from 'react-icons/ri'

function SliderArrows({ handleLeftClick, handleRightClick }) {
  return (
    <div className="relative flex justify-center items-end h-full z-60">
      <div className=" flex justify-between w-full ">
        <div
        // onClick={handleLeftClick}
        // className="text-2xl text-white z-70 hover:text-slate-600 transition-all duration-300"
        >
          <RiArrowLeftWideFill
            onClick={handleLeftClick}
            className=" text-2xl absolute left-0 top-1/2 transform -translate-y-1/2 text-white  z-50 hover:text-slate-600"
          />
        </div>
        <div
          onClick={handleRightClick}
          className="text-2xl text-white z-50 absolute right-0 top-1/2 transform -translate-y-1/2 hover:text-slate-600  "
        >
          <RiArrowRightWideFill />
        </div>
      </div>
    </div>
  )
}

export default SliderArrows
