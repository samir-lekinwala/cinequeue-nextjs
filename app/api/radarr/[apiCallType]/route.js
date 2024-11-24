import axios from 'axios'
import { NextResponse } from 'next/server'

// Your Radarr API details
const RADARR_API_URL = 'http://192.168.178.176:7878/api/v3/'
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

export async function GET(req, context) {
  const { params } = context
  console.log(params)

  try {
    const response = await fetch(
      `${RADARR_API_URL}config/host?apikey=${API_KEY}`
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
