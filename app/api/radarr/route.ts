import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

// Your Radarr API details
const API_KEY = process.env.NEXT_PUBLIC_RADARRAPIKEY // Replace with your actual API key

// export async function hello(req, res) {
//   // res.send('Hello from the api')
//   console.log('is this even being run?')
//   // return NextResponse.json({ hello: 'world' })
//   try {
//     const response = await axios.get(
//       `${RADARR_API_URL}diskspace?apikey=${API_KEY}`
//     )
//     // console.log('response in the api call file', response)
//     // res.status(200).json(response.data)
//     return NextResponse.json(response)
//   } catch (error) {
//     return NextResponse.json(error)
//   }
//   // return NextResponse.json({ hello: 'world' })
// }

export async function GET(req: NextRequest, { params }) {
  // const { path } = req.query
  // console.log('path', path)
  const reqUrl = req.url
  const { searchParams } = new URL(reqUrl)
  const RADARR_API_URL = searchParams.get('ip')
  const query = searchParams.get('query')
  const apiKey = searchParams.get('apiKey')
  console.log('search params', searchParams)
  // console.log('radarr ip', RADARR_API_URL, 'query', query, 'apikey', apiKey)

  // console.log('req', req)
  console.log(
    `the call to fetch ${RADARR_API_URL}/api/v3/${query}?apikey=${apiKey}`
  )

  try {
    const response = await fetch(
      `${RADARR_API_URL}/api/v3/${query}?apikey=${apiKey}`
    )
    const data = await response.json()

    // Return JSON response using NextResponse
    console.log('hello', data)
    return Response.json(data)
  } catch (error) {
    console.error('Error occurred:', error)
    return Response.json({ message: 'Error fetching Radarr data' })
  }
}

export async function POST(req: NextRequest) {
  const reqUrl = req.url
  const { searchParams } = new URL(reqUrl)
  const RADARR_API_URL = searchParams.get('ip')
  const query = searchParams.get('query')
  const apiKey = searchParams.get('apiKey')

  try {
    const data = await req.json()
    const response = await fetch(
      `${RADARR_API_URL}/api/v3/${query}?apikey=${apiKey}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    return Response.json({ message: `${data.title} has been added.` })
  } catch (error) {
    console.error(error)
  }
}
