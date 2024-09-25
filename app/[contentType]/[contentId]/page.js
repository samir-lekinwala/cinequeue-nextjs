import React from 'react'
import { getData } from '../../api/apiCalls'

function page({ params }) {
  async function getContentData() {
    const result = await getData(`${params.contentType}/${params.contentId}`)

    return result
  }

  return (
    <div className="text-white">
      {params.contentType} {params.contentId}
    </div>
  )
}

export default page
