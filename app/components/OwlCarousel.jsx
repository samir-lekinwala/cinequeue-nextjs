import { useEffect } from 'react'
import $ from 'jquery'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import 'owl.carousel'
import SingleItemContent from './SingleItemContent'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function OwlCarousel({ content, type }) {
  const data = content.data.results

  useEffect(() => {
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
    <div className="owl-carousel">
      {!data ? (
        <Skeleton count={5} />
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
  )
}

export default OwlCarousel
