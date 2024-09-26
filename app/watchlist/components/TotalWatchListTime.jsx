import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function TotalWatchListTime({ data }) {
  const [runtime, setRuntime] = useState(null)
  const [hoursRuntime, setHoursRuntime] = useState(null)
  const [clickHours, setClickHours] = useState(false)

  function handleRuntimeClick() {
    setClickHours(!clickHours)
  }

  useEffect(() => {
    if (data) {
      const getTotalRuntime = () => {
        let tempRunTime = 0
        data.map((item) => {
          tempRunTime += item.runtime
        })
        setRuntime(tempRunTime)
        const totalHoursRuntime = tempRunTime / 60
        setHoursRuntime(Number(totalHoursRuntime).toFixed(2))
      }
      getTotalRuntime()
    }
  }, [data])

  return (
    <div className="text-white bg-white bg-opacity-10 flex gap-4 rounded-lg p-4 items-center">
      Total amount of minutes required to complete watching all content{' '}
      <div onClick={handleRuntimeClick}>
        <p className="text-2xl">
          {clickHours ? (
            <span>{hoursRuntime} Hours</span>
          ) : (
            <span>{runtime} Minutes</span>
          )}
        </p>
      </div>
    </div>
  )
}

export default TotalWatchListTime
