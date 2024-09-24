import React from 'react'
import SingleItemContent from './SingleItemContent'
import GlideSlider from './GlideSlider'

function Carousel({ data }) {
  console.log('data from carousel', data)
  return (
    <div>
      <p className="text-2xl text-center" key={data.type}>
        {data.type}
      </p>
      {/* {console.log('type', type.data)} */}
      {/* <div className="flex gap-2 flex-wrap justify-center">
        {data.data.results.map((content) => (
          
          <SingleItemContent content={content} key={content.id} classes={''} />
        ))}
      </div> */}
    </div>
  )
}

export default Carousel
