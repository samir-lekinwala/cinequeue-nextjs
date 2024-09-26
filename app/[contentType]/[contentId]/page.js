// import React,  from 'react'
import ContentPage from './components/ContentPage'

function page({ params }) {
  return (
    <div>
      <ContentPage type={params.contentType} contentId={params.contentId} />
    </div>
  )
}

export default page
