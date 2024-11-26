export const fetchRadarrData = async (query) => {
  const radarrIp = localStorage.getItem('radarr-ip')
  const radarrApiKey = localStorage.getItem('radarr-api-key')

  try {
    const response = await fetch(
      `/api/radarr/?ip=${radarrIp}&query=${query}&apiKey=${radarrApiKey}`,
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
export const postDataFunc = (radarrIp, radarrApiKey, query, data) => {
  const fetchData = async () => {
    const apiCallData = await postRadarrData(
      radarrIp,
      radarrApiKey,
      query,
      data
    )
    console.log('posting method lets see', apiCallData)
    // setRadarrData(apiCallData)
  }
  fetchData()
}

//Front end to backend posting data
export const postRadarrData = async (radarrIp, radarrApiKey, query, data) => {
  try {
    const response = await fetch(
      `/api/radarr/?ip=${radarrIp}&query=${query}&apiKey=${radarrApiKey}`,
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

export const deleteRadarrMovieFunc = (radarrIp, radarrApiKey, query, id) => {
  const deleteMovie = async () => {
    const apiCallData = await deleteRadarrMovie(
      radarrIp,
      radarrApiKey,
      query,
      id
    )
    console.log('posting method lets see', apiCallData)
    // setRadarrData(apiCallData)
  }
  deleteMovie()
}

export const deleteRadarrMovie = async (
  radarrIp,
  radarrApiKey,
  query,
  movieId
) => {
  console.log(radarrIp, radarrApiKey, query, movieId)

  try {
    const response = await fetch(
      `/api/radarr/?ip=${radarrIp}&query=${query}&id=${movieId}&apiKey=${radarrApiKey}`,
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

export async function getRadarrMovieIdFromTmdbId(
  radarrIp,
  radarrApiKey,
  query,
  tmdbId
) {
  try {
    const response = await fetch(
      `/api/radarr/?ip=${radarrIp}&query=${query}&tmdbId=${tmdbId}&apiKey=${radarrApiKey}`,
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
