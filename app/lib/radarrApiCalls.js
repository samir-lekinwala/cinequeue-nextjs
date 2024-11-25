export const fetchRadarrData = async (radarrIp, radarrApiKey, query) => {
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
