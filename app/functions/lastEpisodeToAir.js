export function lastEpisodeToAir(content) {
  //get current date
  //get date of last episode aired
  //get total seasons, add each seasons number of episodes together
  //minus the unaired from latest season using current date

  // console.log('lastepisode to air function', content)
  const currentDate = new Date()

  //number of seasons aired and un-aired
  const seasons = content.seasons

  //last episode content data
  const lastEpisodeAiredContent = content.last_episode_to_air

  //last air date and current episode number. Current episode will be the episode last aired already. Same with current season.
  const {
    air_date: lastAirDate,
    episode_number: currentEpisodeNumber,
    season_number: currentSeason,
  } = lastEpisodeAiredContent

  //last episode date formatted
  const lastEpisodeAirDateFormatted = new Date(lastAirDate)

  //goes through the seasons array if it's longer than 1. Makes sure that it checks if the season that's in the array is less than the one that's in the current season before adding any episodes to the total
  if (seasons.length > 1) {
    let totalEpisodeCount = 0
    for (let i = 0; i < seasons.length; i++) {
      if (
        seasons[i].season_number > 0 &&
        new Date(seasons[i].air_date) <= currentDate &&
        seasons[i].season_number <= currentSeason
      ) {
        totalEpisodeCount += seasons[i].episode_count
      }
    } //checks if the last aired episode is less than the last season that's in the data. If it is then it minuses the episode count and adds the last aired to the total instead.
    if (seasons[seasons.length - 1].episode_count > currentEpisodeNumber) {
      totalEpisodeCount -= seasons[seasons.length - 1].episode_count
      totalEpisodeCount += currentEpisodeNumber
    }

    // console.log('total episode count', totalEpisodeCount)
    return totalEpisodeCount
  } else if (seasons.length == 1) {
    return currentEpisodeNumber
  } else return content.first_air_date
}
