import clsx from 'clsx'
import { getDayName, getHourLabel, isCurrentHour } from '../../utils/helpers.ts'
import { useHourlyWeather } from '../../utils/hooks/useHourlyWeather.ts'
import type { WeatherResponse } from '../../utils/types.ts'
import { CaretDown } from '../Icons.ts'

const HourlyPanel = ({ weather }: { weather: WeatherResponse }) => {
  const {
    listRef,
    currentRef,
    menuRef,
    toggleDayMenu,
    selectDay,
    activeDay,
    openDay,
    days,
    dayHours,
    unit,
  } = useHourlyWeather(weather)

  return (
    <div className=" hourly-panel flex flex-col gap-4 w-full lg:w-[30%]">
      <div className="w-full flex justify-between items-center gap-2">
        <h6 className="section-title ">Hourly Forecast</h6>
        <div ref={menuRef} className="relative">
          <button
            className="bg-neutral-600 rounded-sm py-2 px-4 flex gap-3 items-center"
            onClick={toggleDayMenu}
            aria-expanded={openDay}
          >
            <span>{getDayName(activeDay)}</span>
            <CaretDown className={clsx('duration-500', openDay ? 'rotate-180' : 'rotate-0')} />
          </button>
          {openDay && (
            <div className="dropdown absolute left-0 top-full z-10 mt-2 w-full">
              <ul className="">
                {days
                  .filter((day) => day !== activeDay)
                  .map((day) => (
                    <li key={day} className="">
                      <button
                        className="dropdown-item duration-500 w-full"
                        onClick={selectDay(day)}
                      >
                        {getDayName(day)}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div ref={listRef} className=" relative flex flex-col gap-4 max-h-150 overflow-y-auto">
        {dayHours.map((item) => {
          const isCurrent = isCurrentHour(item.time, weather.current.time)
          return (
            <div
              key={item.time}
              ref={isCurrent ? currentRef : null}
              className="hourly-row justify-between"
            >
              <span className="body-medium">{getHourLabel(item.time)}</span>{' '}
              <span className="caption">
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
