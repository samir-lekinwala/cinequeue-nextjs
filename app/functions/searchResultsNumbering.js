//getting two sets of data, has total pages, total results
//have to get the api to make a call to movies and tv shows if there are still pages, otherwise only call the single one.
//the if total_pages in the single api call for eg, tv show has 4 pages, movies has 1 then the movies api call should end at 1.
//how to handle pages system? Make a scroll to get next page instead of click. Removes the numbering system.

export function searchResultsNumbering(tvResults, movieResults) {}

const testTv = { total_results: 206, total_pages: 11 }
const testMovies = { total_results: 55, total_pages: 3 }
console.log(searchResultsNumbering(testTv, testMovies))

// const resultMovies = await getData(
//   `search/movie?query=${searchInput}&page=${pageNumber}`
// )
// const resultTv = await getData(
//   `search/tv?query=${searchInput}&page=${pageNumber}`
// )
