'use client'
import { NextResponse } from 'next/server'
import React, { useEffect, useState } from 'react'
import {
  deleteRadarrMovie,
  deleteRadarrMovieFunc,
  fetchRadarrData,
  getRadarrMovieIdFromTmdbId,
  postDataFunc,
  postRadarrData,
} from '../../lib/radarrApiCalls'

function RadarrSettingsPageSetup() {
  const [radarrData, setRadarrData] = useState()

  const [radarrIp, setRadarrIp] = useState('')
  const [radarrApiKey, setRadarrApiKey] = useState('')
  const [radarrQuery, setRadarrQuery] = useState('')
  const [radarrConnection, setRadarrConnection] = useState()
  const [loading, setLoading] = useState(false)

  const handleRadarrIpInput = (e) => {
    console.log('checking radarr', e.target.value)
    setRadarrIp(e.target.value)
  }

  const checkRadarrInstance = () => {
    const fetchData = async () => {
      const apiCallData = await fetchRadarrData(radarrQuery)
      console.log('what is this', apiCallData)
      setRadarrData(apiCallData)
    }
    fetchData()
  }

  const data = {
    // title: 'Inception',
    qualityProfileId: 1,
    // titleSlug: 'inception',
    // images: [],
    tmdbId: 27205, // TMDb ID for Inception
    // year: 2010,
    rootFolderPath: 'D:\\Torrents\\Movies',
    monitored: false,
    // addOptions: {
    //   searchForMovie: false,
    // },
  }

  useEffect(() => {
    if (radarrIp && radarrApiKey) {
      // deleteRadarrMovieFunc(radarrIp, radarrApiKey, 'movie', data.tmdbId)
      // postDataFunc(radarrIp, radarrApiKey, 'movie', data)

      const response = async () => {
        try {
          const response = await getRadarrMovieIdFromTmdbId(
            radarrIp,
            radarrApiKey,
            'movie',
            data.tmdbId
          )
          console.log(response)
          // deleteRadarrMovieFunc(radarrIp, radarrApiKey, 'movie', response)
        } catch (error) {
          console.log(error)
        }
      }
      // response()
    }
  }, [radarrIp, radarrApiKey])

  useEffect(() => {
    if (radarrIp && radarrApiKey && radarrQuery) {
      setLoading(true)
      checkRadarrInstance()
      setLoading(false)
    }
  }, [radarrIp, radarrApiKey, radarrQuery])

  const handleRadarrApiKeyInput = (e) => {
    setRadarrApiKey(e.target.value)
  }

  const getLocalStorageItem = (key, defaultValue = null) => {
    if (typeof window === 'undefined') return defaultValue
    return localStorage.getItem(key) || defaultValue
  }

  const setLocalStorageItem = (key, value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value)
    }
  }

  useEffect(() => {
    const radarrApiFromStorage = getLocalStorageItem('radarr-ip')
    const radarrApiKeyFromStorage = getLocalStorageItem('radarr-api-key')
    const radarrConnectionStatus = getLocalStorageItem('radarr-connection')

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
    setLocalStorageItem('radarr-ip', radarrIp)
    setLocalStorageItem('radarr-api-key', radarrApiKey)
    // localStorage.setItem('radarr-ip', radarrIp)
    // localStorage.setItem('radarr-api-key', radarrApiKey)

    setRadarrQuery('config/host')
    handleTestRadarrButton()
    checkRadarrInstance()
  }
  const submitClearSettings = (e) => {
    e.preventDefault()

    localStorage.removeItem('radarr-ip')
    localStorage.removeItem('radarr-api-key')
    localStorage.removeItem('radarr-connection')
    setRadarrIp('')
    setRadarrApiKey('')
    setRadarrConnection(false)
  }

  const handleTestRadarrButton = () => {
    setRadarrQuery('config/host')
    checkRadarrInstance()
    if (radarrData.id) {
      setLocalStorageItem('radarr-connection', true)
      setRadarrConnection(true)
    } else if (!radarrData.id || !radarrData) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('radarr-connection')
      }
      setRadarrConnection(false)
    }
  }

  return (
    <div
      className={`min-h-[400px] w-full max-w-[500px] rounded-3xl bg-white bg-opacity-10 ${
        radarrConnection ? 'green-box-shadow-glow' : ''
      }`}
    >
      <div className="flex justify-center h-full items-center object-contain">
        <div className="flex gap-4 justify-center flex-col items-center transition-all duration-500 ease-in-out">
          <div className="mb-4 h-auto ">
            <img src="/images/radarr-logo.png" alt="" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex-col w-full flex gap-2 justify-center mx-auto">
              <div>Add your local Radarr instance</div>
              <div className="flex flex-col gap-2 items-end">
                <div className="flex gap-2 px-2">
                  <label
                    htmlFor="radarr-ip-address-input"
                    className="whitespace-nowrap"
                  >
                    Local IP Address
                  </label>
                  <input
                    id="radarr-ip-address-input"
                    required
                    className="text-black w-full py-1 px-2 text-center rounded-2xl"
                    onChange={(e) => handleRadarrIpInput(e)}
                    value={radarrIp}
                    placeholder="Radarr IP address"
                  />
                </div>
                {/* api key for radarr */}
                <div className="flex gap-2 px-2">
                  <label
                    htmlFor="radarr-api-key-input"
                    className="whitespace-nowrap"
                  >
                    API key
                  </label>
                  <input
                    id="radarr-api-key-input"
                    required
                    className="text-black w-full py-1 px-2 text-center rounded-2xl"
                    onChange={(e) => handleRadarrApiKeyInput(e)}
                    value={radarrApiKey}
                    placeholder="Radarr API Key"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-center mx-auto mt-4">
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
                  <span className="text-red-600 py-2 px-1">No connection</span>
                ) : (
                  <span>Test</span>
                )}
              </button>
              <div className="text-white">
                {loading ? <p>Loading...</p> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RadarrSettingsPageSetup
