import { NextResponse } from 'next/server'
import React, { useEffect, useState } from 'react'

function RadarrProfilePageSetup() {
  const [radarrData, setRadarrData] = useState()

  const [radarrIp, setRadarrIp] = useState('')
  const [radarrApiKey, setRadarrApiKey] = useState('')

  const handleRadarrIpInput = (e) => {
    console.log('checking radarr', e.target.value)
    setRadarrIp(e.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/radarr/diskspace', {
          headers: {
            Accept: 'application/json',
            method: 'GET',
          },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const jsonData = await response.json()
        console.log('test44')
        console.log(jsonData)
        setRadarrData(NextResponse.json(jsonData))

        // console.log('json data test', jsonData)
        // setData(jsonData);
      } catch (err) {
        // setError(err.message);
        console.error('error from new test', err)
      }
    }
    fetchData()
    console.log(radarrData)
  }, [])

  // async function checkRadarrApiInfo() {
  //   const url =
  //     'http://192.168.178.176:7878/api?apikey=438168f831174e489373f3bb1ed6fcd3'
  //   try {
  //     const response = await fetch(url)
  //     console.log('response', response)
  //     if (response) {
  //       const json = await response.json()
  //       console.log('Radarr API check', json)
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  // checkRadarrApiInfo()

  const handleRadarrApiKeyInput = (e) => {
    setRadarrApiKey(e.target.value)
  }

  useEffect(() => {
    const radarrApiFromStorage = localStorage.getItem('radarr-ip')
    const radarrApiKeyFromStorage = localStorage.getItem('radarr-api-key')

    if (radarrApiFromStorage) {
      setRadarrIp(radarrApiFromStorage)
    }
    if (radarrApiKeyFromStorage) {
      setRadarrApiKey(radarrApiKeyFromStorage)
    }
  }, [])

  const submitRadarrSettings = (e) => {
    e.preventDefault()

    localStorage.setItem('radarr-ip', radarrIp)
    localStorage.setItem('radarr-api-key', radarrApiKey)
  }
  const submitClearSettings = (e) => {
    e.preventDefault()

    localStorage.removeItem('radarr-ip')
    localStorage.removeItem('radarr-api-key')
    setRadarrIp('')
    setRadarrApiKey('')
  }

  return (
    <div>
      <div className="flex-col flex gap-2 w-fit justify-center  mx-auto">
        Add your local Radarr instance here
        <div className="flex flex-col gap-2 items-end">
          <div className="flex gap-2">
            Radarr Local IP Address
            <input
              required
              className="text-black"
              onChange={(e) => handleRadarrIpInput(e)}
              value={radarrIp}
              placeholder="Radarr IP address"
            />
          </div>
          {/* api key for radarr */}
          <div className="flex gap-2">
            API key
            <input
              required
              className="text-black"
              onChange={(e) => handleRadarrApiKeyInput(e)}
              value={radarrApiKey}
              placeholder="Radarr API Key"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-center mt-4">
        <button
          onClick={(e) => submitRadarrSettings(e)}
          className="bg-white bg-opacity-25 py-2 px-5 rounded-xl hover:bg-opacity-35 transition-all ease-in-out"
        >
          Submit
        </button>
        <button
          onClick={(e) => submitClearSettings(e)}
          className="bg-white bg-opacity-25 py-2 px-5 rounded-xl hover:bg-opacity-35 transition-all ease-in-out"
        >
          Clear
        </button>
      </div>
    </div>
  )
}

export default RadarrProfilePageSetup
