import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function TotalWatchListTime({ data }) {
  const [runtime, setRuntime] = useState(null)
  // const [hoursRuntime, setHoursRuntime] = useState(null)
  // const [clickHours, setClickHours] = useState(false)
  const [runtimeData, setRuntimeData] = useState([])
  const [runtimeType, setRuntimeType] = useState(0)

  function handleRuntimeClick() {
    const lengthOfArray = runtimeData.length - 1
    console.log(lengthOfArray)

    if (runtimeType == lengthOfArray) {
      setRuntimeType(0)
    } else {
      setRuntimeType(runtimeType + 1)
    }
  }

  useEffect(() => {
    if (data) {
      const getTotalRuntime = () => {
        const runtimeArray = []

        let tempRunTime = 0
        data.map((item) => {
          tempRunTime += item.runtime
        })
        // setRuntime(tempRunTime)
        const totalHoursRuntime = tempRunTime / 60
        const daysRuntime = totalHoursRuntime / 24
        const weeksRuntime = daysRuntime / 7

        runtimeArray.push({ runtime: tempRunTime, type: 'minutes' })
        runtimeArray.push({
          runtime: Number(totalHoursRuntime).toFixed(2),
          type: 'hours',
        })
        runtimeArray.push({
          runtime: Number(daysRuntime.toFixed(2)),
          type: 'days',
        })
        runtimeArray.push({
          runtime: Number(weeksRuntime.toFixed(2)),
          type: 'weeks',
        })

        setRuntimeData(runtimeArray)
      }
      getTotalRuntime()
    }
  }, [data])

  return runtimeData.length > 0 ? (
    <div
      onClick={handleRuntimeClick}
      className="text-white bg-white bg-opacity-10 flex gap-4 rounded-lg p-4 items-center cursor-pointer"
    >
      Total amount of {runtimeData[runtimeType].type} required to complete
      watching all content{' '}
      <div>
        <p className="text-2xl">{runtimeData[runtimeType].runtime}</p>
        <p className="text-center">{runtimeData[runtimeType].type}</p>
      </div>
    </div>
  ) : null
}

export default TotalWatchListTime
