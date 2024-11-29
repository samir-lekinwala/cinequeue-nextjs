const radarrIp = () => {
  if (typeof window !== undefined) {
    localStorage.getItem('radarr-ip')
  }
}

const radarrApiKey = () => {
  if (typeof window !== undefined) {
    localStorage.getItem('radarr-api-key')
  }
}

export const fetchRadarrData = async (query) => {
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
export const postDataFunc = (query, data) => {
  const fetchData = async () => {
    const apiCallData = await postRadarrData(query, data)
    console.log('posting method lets see', apiCallData)
    // setRadarrData(apiCallData)
  }
  fetchData()
}

//Front end to backend posting data

export const postRadarrData = async (query, data) => {
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
    return err
  }
}

export const deleteRadarrMovieFunc = (query, id) => {
  const deleteMovie = async () => {
    // console.log('logging query', query)
    const apiCallData = await deleteRadarrMovie(query, id)
    // console.log('posting method lets see', apiCallData)
    // setRadarrData(apiCallData)
    return apiCallData
  }
  return deleteMovie()
}

export const deleteRadarrMovie = async (query, movieId) => {
  console.log('query from api call delete func', query, 'movie id', movieId)
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
    return jsonData
  } catch (err) {
    // setError(err.message);
    console.error('error', err)
  }
}

export async function getRadarrMovieIdFromTmdbId(query, tmdbId) {
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
    if (jsonData[0]) {
      return jsonData[0].id
    }
    // return Response.json({ message: jsonData[0].id })
  } catch (error) {
    console.error(error)
  }
}
