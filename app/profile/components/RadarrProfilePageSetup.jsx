import { NextResponse } from 'next/server'
import React, { useEffect, useState } from 'react'
import { fetchRadarrData } from '../../lib/radarrApiCalls'

function RadarrProfilePageSetup() {
  const [radarrData, setRadarrData] = useState()

  const [radarrIp, setRadarrIp] = useState('')
  const [radarrApiKey, setRadarrApiKey] = useState('')
  const [radarrQuery, setRadarrQuery] = useState('')
  const [radarrConnection, setRadarrConnection] = useState()

  const handleRadarrIpInput = (e) => {
    console.log('checking radarr', e.target.value)
    setRadarrIp(e.target.value)
  }

  const fetchDataFunc = () => {
    const fetchData = async () => {
      const apiCallData = await fetchRadarrData(
        radarrIp,
        radarrApiKey,
        radarrQuery
      )
      console.log('what is this', apiCallData)
      setRadarrData(apiCallData)
    }
    fetchData()
  }

  useEffect(() => {
    if (radarrIp && radarrApiKey && radarrQuery) {
      fetchDataFunc()
    }
  }, [radarrIp, radarrApiKey, radarrQuery])

  const handleRadarrApiKeyInput = (e) => {
    setRadarrApiKey(e.target.value)
  }

  useEffect(() => {
    const radarrApiFromStorage = localStorage.getItem('radarr-ip')
    const radarrApiKeyFromStorage = localStorage.getItem('radarr-api-key')
    const radarrConnectionStatus = localStorage.getItem('radarr-connection')

    if (radarrApiFromStorage) {
      setRadarrIp(radarrApiFromStorage)
    }
    if (radarrApiKeyFromStorage) {
      setRadarrApiKey(radarrApiKeyFromStorage)
    }
    if (radarrConnectionStatus) {
      setRadarrConnection(true)
    } else if (!radarrConnectionStatus) {
      setRadarrConnection(false)
    }
  }, [])

  const submitRadarrSettings = (e) => {
    e.preventDefault()

    localStorage.setItem('radarr-ip', radarrIp)
    localStorage.setItem('radarr-api-key', radarrApiKey)
    setRadarrQuery('config/host')
    handleTestRadarrButton()
    fetchDataFunc()
  }
  const submitClearSettings = (e) => {
    e.preventDefault()

    localStorage.removeItem('radarr-ip')
    localStorage.removeItem('radarr-api-key')
    setRadarrIp('')
    setRadarrApiKey('')
  }

  const handleTestRadarrButton = () => {
    setRadarrQuery('config/host')
    fetchDataFunc()
    if (radarrData.id) {
      localStorage.setItem('radarr-connection', true)
      setRadarrConnection(true)
    } else if (!radarrData.id) {
      localStorage.removeItem('radarr-connection')
      setRadarrConnection(false)
    }
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
        <button
          onClick={handleTestRadarrButton}
          className="bg-white bg-opacity-25 py-2 px-5 rounded-xl hover:bg-opacity-35 transition-all ease-in-out"
        >
          {radarrConnection == true ? (
            <span className="text-light-green-400 py-2 px-5">✓</span>
          ) : radarrConnection == false ? (
            <span className="text-red-600 py-2 px-5">No connection</span>
          ) : (
            <span>Test</span>
          )}
        </button>
      </div>
      <div>
        Data
        <div></div>
      </div>
    </div>
  )
}

export default RadarrProfilePageSetup
