import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

// Your Sonarr API details
const API_KEY = process.env.NEXT_PUBLIC_SonarrAPIKEY // Replace with your actual API key

// export async function hello(req, res) {
//   // res.send('Hello from the api')
//   console.log('is this even being run?')
//   // return NextResponse.json({ hello: 'world' })
//   try {
//     const response = await axios.get(
//       `${Sonarr_API_URL}diskspace?apikey=${API_KEY}`
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
  const Sonarr_API_URL = searchParams.get('ip')
  const query = searchParams.get('query')
  const apiKey = searchParams.get('apiKey')
  const tmdbId = searchParams.get('tmdbId')
  console.log('search params', searchParams)
  // console.log('Sonarr ip', Sonarr_API_URL, 'query', query, 'apikey', apiKey)

  // console.log('req', req)

  try {
    if (tmdbId) {
      const response = await fetch(
        `${Sonarr_API_URL}/api/v3/${query}?tmdbId=${tmdbId}&apikey=${apiKey}`
      )
      const data = await response.json()

      // Return JSON response using NextResponse
      console.log('hello tmdb id detected', data)
      return Response.json(data)
      // http://192.168.178.176:7878/api/v3/movie?tmdbId=27205&apikey=438168f831174e489373f3bb1ed6fcd3
    } else {
      const response = await fetch(
        `${Sonarr_API_URL}/api/v3/${query}?apikey=${apiKey}`
      )
      const data = await response.json()

      // Return JSON response using NextResponse
      console.log('hello without tmdb id', data)
      return Response.json(data)
    }
  } catch (error) {
    console.error('Error occurred:', error)
    return Response.json({ message: 'Error fetching Sonarr data' })
  }
}

export async function POST(req: NextRequest) {
  const reqUrl = req.url
  const { searchParams } = new URL(reqUrl)
  const Sonarr_API_URL = searchParams.get('ip')
  const query = searchParams.get('query')
  const apiKey = searchParams.get('apiKey')

  try {
    const data = await req.json()
    const response = await fetch(
      `${Sonarr_API_URL}/api/v3/${query}?apikey=${apiKey}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    console.log(response)
    if (response.status != 201) {
      return Response.json({
        message: `Error adding ${data.title}.`,
        error: `Code ${response.status} - ${response.statusText}`,
      })
    } else return Response.json({ message: `${data.title} has been added.` })
  } catch (error) {
    console.error(error)
  }
}

export async function DELETE(req: Request) {
  const url = req.url

  const { searchParams } = new URL(url)

  const Sonarr_API_URL = searchParams.get('ip')
  const query = searchParams.get('query')
  const apiKey = searchParams.get('apiKey')
  const movieId = searchParams.get('id')

  console.log('search params on delete', searchParams)

  try {
    const response = await fetch(
      `${Sonarr_API_URL}/api/v3/${query}/${movieId}?apikey=${apiKey}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    console.log('search params on delete', searchParams)
    console.log(response.json())
    return Response.json(response)
  } catch (error) {
    console.error(error)
  }
}

// 27205
