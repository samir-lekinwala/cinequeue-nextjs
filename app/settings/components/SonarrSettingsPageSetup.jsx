import { NextResponse } from 'next/server'
import React, { useEffect, useState } from 'react'
import {
  deleteSonarrMovie,
  deleteSonarrMovieFunc,
  fetchSonarrData,
  getSonarrMovieIdFromTmdbId,
  postDataFunc,
  postSonarrData,
} from '../../lib/sonarrApiCalls'

function SonarrSettingsPageSetup() {
  const [SonarrData, setSonarrData] = useState()

  const [SonarrIp, setSonarrIp] = useState('')
  const [SonarrApiKey, setSonarrApiKey] = useState('')
  const [SonarrQuery, setSonarrQuery] = useState('')
  const [sonarrConnection, setSonarrConnection] = useState()
  const [loading, setLoading] = useState(false)

  const handleSonarrIpInput = (e) => {
    console.log('checking Sonarr', e.target.value)
    setSonarrIp(e.target.value)
  }

  const checkSonarrInstance = () => {
    const fetchData = async () => {
      const apiCallData = await fetchSonarrData(
        SonarrIp,
        SonarrApiKey,
        SonarrQuery
      )
      console.log('what is this', apiCallData)
      setSonarrData(apiCallData)
    }
    fetchData()
  }

  const data = {
    title: 'Inception',
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
    if (SonarrIp && SonarrApiKey) {
      // deleteSonarrMovieFunc(SonarrIp, SonarrApiKey, 'movie', data.tmdbId)
      postDataFunc(SonarrIp, SonarrApiKey, 'movie', data)

      const response = async () => {
        try {
          const response = await getSonarrMovieIdFromTmdbId(
            SonarrIp,
            SonarrApiKey,
            'movie',
            data.tmdbId
          )
          console.log(response)
          // deleteSonarrMovieFunc(SonarrIp, SonarrApiKey, 'movie', response)
        } catch (error) {
          console.log(error)
        }
      }
      // response()
    }
  }, [SonarrIp, SonarrApiKey])

  useEffect(() => {
    if (SonarrIp && SonarrApiKey && SonarrQuery) {
      setLoading(true)
      checkSonarrInstance()
      setLoading(false)
    }
  }, [SonarrIp, SonarrApiKey, SonarrQuery])

  const handleSonarrApiKeyInput = (e) => {
    setSonarrApiKey(e.target.value)
  }

  useEffect(() => {
    const SonarrApiFromStorage = localStorage.getItem('sonarr-ip')
    const SonarrApiKeyFromStorage = localStorage.getItem('sonarr-api-key')
    const SonarrConnectionStatus = localStorage.getItem('sonarr-connection')

    if (SonarrApiFromStorage) {
      setSonarrIp(SonarrApiFromStorage)
    }
    if (SonarrApiKeyFromStorage) {
      setSonarrApiKey(SonarrApiKeyFromStorage)
    }
    if (SonarrConnectionStatus) {
      setSonarrConnection(true)
    } else if (!SonarrConnectionStatus) {
      setSonarrConnection(false)
    }
  }, [])

  const submitSonarrSettings = (e) => {
    e.preventDefault()

    localStorage.setItem('sonarr-ip', SonarrIp)
    localStorage.setItem('sonarr-api-key', SonarrApiKey)
    setSonarrQuery('config/host')
    handleTestSonarrButton()
    checkSonarrInstance()
  }
  const submitClearSettings = (e) => {
    e.preventDefault()

    localStorage.removeItem('sonarr-ip')
    localStorage.removeItem('sonarr-api-key')
    localStorage.removeItem('sonarr-connection')
    setSonarrIp('')
    setSonarrApiKey('')
    setSonarrConnection(false)
  }

  const handleTestSonarrButton = () => {
    setSonarrQuery('config/host')
    checkSonarrInstance()
    if (SonarrData.id) {
      localStorage.setItem('sonarr-connection', true)
      setSonarrConnection(true)
    } else if (!SonarrData.id || !SonarrData) {
      localStorage.removeItem('sonarr-connection')
      setSonarrConnection(false)
    }
  }

  return (
    <div
      className={`min-h-[400px] w-full max-w-[500px] rounded-3xl bg-white bg-opacity-10 ${
        sonarrConnection ? 'green-box-shadow-glow' : ''
      }`}
    >
      <div className="flex justify-center h-full items-center">
        <div className="flex gap-4 justify-center flex-col items-center transition-all duration-500 ease-in-out">
          <div className="mb-4 h-auto mx-auto">
            <img src="/images/sonarr-logo.png" alt="" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex-col flex gap-2 w-fit justify-center mx-auto">
              <div>Add your local Sonarr instance</div>
              <div className="flex flex-col gap-2 items-end">
                <div className="flex gap-2 px-2">
                  <label
                    htmlFor="sonarr-ip-adress-input"
                    className="whitespace-nowrap"
                  >
                    Local IP Address
                  </label>
                  <input
                    id="sonarr-ip-adress-input"
                    required
                    className=" text-black w-full py-1 px-2 text-center rounded-2xl"
                    onChange={(e) => handleSonarrIpInput(e)}
                    value={SonarrIp}
                    placeholder="Sonarr IP address"
                  />
                </div>
                {/* api key for Sonarr */}
                <div className="flex gap-2 px-2">
                  <label
                    htmlFor="sonarr-api-key-input"
                    className="whitespace-nowrap"
                  >
                    API key
                  </label>
                  <input
                    id="sonarr-api-key-input"
                    required
                    className="text-black w-full py-1 px-2 text-center rounded-2xl"
                    onChange={(e) => handleSonarrApiKeyInput(e)}
                    value={SonarrApiKey}
                    placeholder="Sonarr API Key"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full justify-center mt-4">
              <button
                onClick={(e) => submitSonarrSettings(e)}
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
                onClick={handleTestSonarrButton}
                className="bg-white bg-opacity-25 py-2 px-5 rounded-xl hover:bg-opacity-35 transition-all ease-in-out"
              >
                {sonarrConnection == true ? (
                  <span className="text-light-green-400 py-2 px-5">✓</span>
                ) : sonarrConnection == false ? (
                  <span className="text-red-600 py-2 px-5">No connection</span>
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

export default SonarrSettingsPageSetup
