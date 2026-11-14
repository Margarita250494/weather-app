import { useEffect, useRef, useState } from 'react'
import { getDays, getHourLabel, getHourlyData } from '../../utils/helpers.ts'
import type { WeatherResponse } from '../../utils/types.ts'

const HourlyPanel = ({ weather }: { weather: WeatherResponse }) => {
  const hours = getHourlyData(weather)
  const days = getDays(hours)

  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const activeDay = selectedDay && days.includes(selectedDay) ? selectedDay : days[0]
  const unit = weather.current_units.temperature_2m
  const dayHours = hours.filter((hour) => hour.time.startsWith(activeDay))
  const listRef = useRef<HTMLDivElement>(null)
  const currentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const current = currentRef.current

    list.scrollTop = current ? current.offsetTop : 0
  }, [activeDay, weather])
  const currentHour = weather.current.time.slice(0, 13)

  return (
    <div className=" hourly-panel flex flex-col gap-4 w-full lg:w-[30%]">
      <h6 className="section-title">Hourly Forecast</h6>
      <div ref={listRef} className=" relative flex flex-col gap-4 max-h-150 overflow-y-auto">
        {dayHours.map((item) => {
          const isCurrent = item.time.slice(0, 13) === currentHour
          return (
            <div
              key={item.time}
              ref={isCurrent ? currentRef : null}
              className={`hourly-row ${isCurrent ? 'current' : ''}`}
            >
              <span>{getHourLabel(item.time)}</span>{' '}
              <span>
                {item.temperature}
                {unit}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default HourlyPanel
