export const fetchSonarrData = async (sonarrIp, sonarrApiKey, query) => {
  try {
    const response = await fetch(
      `/api/sonarr/?ip=${sonarrIp}&query=${query}&apiKey=${sonarrApiKey}`,
      {
        headers: {
          Accept: 'application/json',
          method: 'GET',
        },
      }
    )
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const jsonData = await response.json()
    // console.log(jsonData)
    return jsonData
  } catch (err) {
    // setError(err.message);
    console.error('error', err)
  }
}

//For the front end
export const postDataFunc = (SonarrIp, SonarrApiKey, query, data) => {
  const fetchData = async () => {
    const apiCallData = await postSonarrData(
      SonarrIp,
      SonarrApiKey,
      query,
      data
    )
    console.log('posting method lets see', apiCallData)
    // setSonarrData(apiCallData)
  }
  fetchData()
}

//Front end to backend posting data
export const postSonarrData = async (SonarrIp, SonarrApiKey, query, data) => {
  try {
    const response = await fetch(
      `/api/sonarr/?ip=${SonarrIp}&query=${query}&apiKey=${SonarrApiKey}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    if (!response.ok) {
      throw new Error('Failed to add data')
    }
    const jsonData = await response.json()
    // console.log(jsonData)
    return jsonData
  } catch (err) {
    // setError(err.message);
    console.error('error', err)
  }
}

export const deleteSonarrMovieFunc = (SonarrIp, SonarrApiKey, query, id) => {
  const deleteMovie = async () => {
    const apiCallData = await deleteSonarrMovie(
      SonarrIp,
      SonarrApiKey,
      query,
      id
    )
    console.log('posting method lets see', apiCallData)
    // setSonarrData(apiCallData)
  }
  deleteMovie()
}

export const deleteSonarrMovie = async (
  SonarrIp,
  SonarrApiKey,
  query,
  movieId
) => {
  console.log(SonarrIp, SonarrApiKey, query, movieId)

  try {
    const response = await fetch(
      `/api/sonarr/?ip=${SonarrIp}&query=${query}&id=${movieId}&apiKey=${SonarrApiKey}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    if (!response.ok) {
      throw new Error('Failed to delete movie')
    }
    const jsonData = await response.json()
    // console.log(jsonData)
    console.log(jsonData)
  } catch (err) {
    // setError(err.message);
    console.error('error', err)
  }
}

export async function getSonarrMovieIdFromTmdbId(
  SonarrIp,
  SonarrApiKey,
  query,
  tmdbId
) {
  try {
    const response = await fetch(
      `/api/sonarr/?ip=${SonarrIp}&query=${query}&tmdbId=${tmdbId}&apiKey=${SonarrApiKey}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    const jsonData = await response.json()
    // console.log()
    return jsonData[0].id
    // return Response.json({ message: jsonData[0].id })
  } catch (error) {
    console.error(error)
  }
}
