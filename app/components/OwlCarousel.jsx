'use client'

import { useEffect } from 'react'
import $ from 'jquery'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import 'owl.carousel'
import SingleItemContent from './SingleItemContent'

function OwlCarousel({ content, type }) {
  const data = content.data.results
  console.log('owl carousel check for content type', content)

  useEffect(() => {
    const window = global.window
    if (typeof window !== 'undefined') {
      $(document).ready(function () {
        $('.owl-carousel').owlCarousel({
          // loop: true,
          autoWidth: true,
          margin: 10,
          // nav: true,
          responsive: {
            0: {
              items: 3,
            },
            600: {
              items: 4,
            },
            800: {
              items: 5,
            },
            1000: {
              items: 8,
            },
          },
        })
      })
    }
  }, [])

  return (
    <div className="">
      <p className="text-center text-2xl font-poppins text-gray-400 relative z-50">
        {content.type}
      </p>
      <div className="owl-carousel">
        {!data ? (
          <p>Loading...</p>
        ) : (
          data.map((item) => (
            <div className="item" key={item.id}>
              {/* <Link href={`/${content.contentType}/${item.id}#trailer`}> */}
              <SingleItemContent content={item} type={type} />
              {/* </Link> */}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default OwlCarousel
