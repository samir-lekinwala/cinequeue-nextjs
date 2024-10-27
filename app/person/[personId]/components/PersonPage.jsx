'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { getData } from '../../../api/apiCalls'
import PersonProfile from './PersonProfile'

function PersonPage() {
  const [data, setData] = useState()

  const personId = useParams().personId

  useEffect(() => {
    if (personId) {
      async function getPersonData() {
        const result = await getData(
          `/person/${personId}?append_to_response=movie_credits%2Ctv_credits&language=en-US`
        )
        setData(result)
        console.log('person data', result)
      }
      getPersonData()
    }
  }, [])

  return (
    <div>
      <PersonProfile data={data} />
    </div>
  )
}

export default PersonPage
