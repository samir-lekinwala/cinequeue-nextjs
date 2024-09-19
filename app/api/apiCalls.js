const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDBAPIKEY}`,
  },
}

// fetch('https://api.themoviedb.org/3/movie/533535?language=en-US', options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err))

export async function getData(apiOptions) {
  try {
    const result = await fetch(
      `https://api.themoviedb.org/3/${apiOptions}`,
      options
    )
    console.log('api was called')
    return await result.json()

    // console.log('result from getdata', data)
  } catch (error) {}
}
