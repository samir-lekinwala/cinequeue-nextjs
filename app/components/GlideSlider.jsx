// import React from 'react'
// import { useEffect } from 'react'
// import Glide from '@glidejs/glide'
// import '@glidejs/glide/dist/css/glide.core.min.css'
// import '@glidejs/glide/dist/css/glide.theme.min.css'
// import SingleItemContent from './SingleItemContent'

// function GlideSlider({ content }) {
//   const data = content.data.results
//   // console.log('contentobject', content.data.results)

//   useEffect(() => {
//     // Initialize Glide.js when component mounts
//     const glide = new Glide('.glide', {
//       type: 'carousel',
//       // autoplay: false, // 3 seconds
//       hoverpause: true,
//       perView: 3, // Show 1 slide at a time
//       gap: 2, // No gap between slides
//     })

//     glide.mount() // Start the slider

//     // Clean up the instance when component unmounts
//     return () => glide.destroy()
//   }, [])

//   return (
//     <div className="glide">
//       <div className="glide__track" data-glide-el="track">
//         <ul className="glide__slides">
//           {data.map((item) => (
//             <li className="glide__slide" key={item.id}>
//               <SingleItemContent content={item} />
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Optional navigation buttons */}
//       <div className="glide__arrows" data-glide-el="controls">
//         <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
//           Prev
//         </button>
//         <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
//           Next
//         </button>
//       </div>

//       {/* Optional bullet indicators */}
//       <div className="glide__bullets" data-glide-el="controls[nav]">
//         <button className="glide__bullet" data-glide-dir="=0"></button>
//         <button className="glide__bullet" data-glide-dir="=1"></button>
//         <button className="glide__bullet" data-glide-dir="=2"></button>
//       </div>
//     </div>
//   )
// }

// export default GlideSlider
