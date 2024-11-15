'use client'

import { useEffect } from 'react'
import $ from 'jquery'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import 'owl.carousel'
import SingleItemContent from './SingleItemContent'

function OwlCarousel({ content, type, actorsPage }) {
  let data = actorsPage ? content : content?.data?.results

  // console.log('data from owl', data)

  // console.log('owl carousel check for content type', content)

  useEffect(() => {
    const window = global.window
    if (data && typeof window !== 'undefined') {
      setTimeout(() => {
        $('.owl-carousel').owlCarousel({
          // loop: true,
          autoWidth: true,
          margin: 10,
          responsive: {
            0: { items: 3 },
            600: { items: 4 },
            800: { items: 5 },
            1000: { items: 8 },
          },
        })
      }, 100) // Adjust timeout as necessary
    }
  }, [])

  return (
    <div className="">
      <p className="text-center text-2xl font-poppins text-gray-400">
        {content.type}
      </p>
      <div className="owl-carousel">
        {!data ? (
          <p>Loading...</p>
        ) : (
          data.map((item) => (
            <div className="item" key={item.id}>
              {/* <Link href={`/${content.contentType}/${item.id}#trailer`}> */}
              <SingleItemContent
                content={item}
                type={type}
                actorsPage={actorsPage}
                carousel={true}
              />
              {/* </Link> */}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default OwlCarousel
