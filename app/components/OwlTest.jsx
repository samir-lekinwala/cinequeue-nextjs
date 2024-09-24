import { useEffect } from 'react'
import $ from 'jquery'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import 'owl.carousel'
import SingleItemContent from './SingleItemContent'

function OwlTest({ content }) {
  const data = content.data.results

  useEffect(() => {
    if (typeof window !== 'undefined') {
      $(document).ready(function () {
        $('.owl-carousel').owlCarousel({
          loop: true,
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
    <div className="owl-carousel">
      {data.map((item) => (
        <div className="item" key={item.id}>
          <SingleItemContent content={item} />
        </div>
      ))}
    </div>
  )
}

export default OwlTest
