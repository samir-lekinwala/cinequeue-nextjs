function getAverageRuntimeFromSeason1(season) {
  const episodesArray = season.episodes
  let totalSeason1Runtime = 0

  for (let i = 0; i < episodesArray.length; i++) {
    totalSeason1Runtime += episodesArray[i].runtime
  }
  return (totalSeason1Runtime / episodesArray.length - 1).toFixed(0)
}

export function getTotalEpisodesRuntime(singleItemData) {
  const singleEpisodeRuntime = getEpisodeRunTime(singleItemData)
  const totalNubmerOfEpisodes = singleItemData.number_of_episodes

  return ((singleEpisodeRuntime * totalNubmerOfEpisodes) / 60).toFixed(2)
}

function getEpisodeRunTime(singleItemData) {
  const runTimeArray = singleItemData.episode_run_time
  let averageRunTime = 0

  if (runTimeArray.length > 1) {
    let totalTimeFromArray = 0

    for (let i = 0; i < runTimeArray.length; index++) {
      totalTimeFromArray += runTimeArray[i]
    }
    averageRunTime = totalTimeFromArray / runTimeArray.length - 1
  } else if (runTimeArray.length == 1) {
    averageRunTime = runTimeArray[0]
  }

  if (averageRunTime == 0) {
    return getAverageRuntimeFromSeason1(singleItemData['season/1'])
  } else return averageRunTime.toFixed(0)
}
