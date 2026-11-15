import clsx from 'clsx'
import HeroCard from '../components/cards/HeroCard.tsx'
import HourlyPanel from '../components/cards/HourlyPanel.tsx'
import MetricCard from '../components/cards/MetricCard.tsx'
import { getMetricData } from '../utils/data.tsx'
import { getHourlyData } from '../utils/helpers.ts'
import { useWeatherData } from '../utils/hooks/useWeatherData.ts'
import type { Coords, LocationResponse, UnitSettings } from '../utils/types.ts'
import { LoadingDots } from './Loading.tsx'

const WeatherPanel = ({
  coords,
  location,
  units,
}: {
  coords: Coords | null
  location: LocationResponse | null
  units: UnitSettings
}) => {
  const { weather, loading, error } = useWeatherData(coords, units)

  if (error) return <p>{error}</p>
  if (!weather) return null
  const metric = weather ? getMetricData(weather) : []
  console.log(getHourlyData(weather))

  return (
    <section className="w-full flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-[70%] flex flex-col gap-8">
        <div
          className={clsx(
            'hero-card flex items-center justify-center  h-75 duration-500',
            loading ? 'bg-neutral-800' : "bg-[url('/bg-today-large.svg')] bg-cover bg-center"
          )}
        >
          {loading || !weather ? (
            <LoadingDots />
          ) : (
            <HeroCard location={location} weather={weather} />
          )}
        </div>
        <div className="metrics-grid">
          {metric.map(({ title, value, unit }) => (
            <MetricCard key={title} title={title} weather={value} unit={unit} />
          ))}
        </div>
      </div>

      <HourlyPanel weather={weather} />
    </section>
  )
}
export default WeatherPanel

/*<div className="flex flex-col md:flex-row w-full gap-10 justify-between items-center">
            <h5 className="location flex flex-col gap-2 text-center md:text-left">
              {location?.city || location?.locality || '—'}, {location?.countryName}
              <span className="body-small text-center md:text-left text-neutral-300">
                {showTime}
              </span>
            </h5>
            <p className="temperature">
              {weather.current.temperature_2m}
              {weather.current_units.temperature_2m}
            </p>
          </div>*/
/*<h1>
          {location?.city || location?.locality || '—'}, {location?.countryName}
        </h1>
        <h2>
          {weather.current.temperature_2m}
          {weather.current_units.temperature_2m}
        </h2>
        <h2>
          {weather.current.apparent_temperature}
          {weather.current_units.apparent_temperature}
        </h2>
        <p>
          Feels like: {weather.current.apparent_temperature}
          {weather.current_units.apparent_temperature}
        </p>
        <p>
          Humidity: {weather.current.relative_humidity_2m}
          {weather.current_units.relative_humidity_2m}
        </p>
        <p>
          Precipitation: {weather.current.precipitation} {weather.current_units.precipitation}
        </p>
        <h1>
          {weather.current.wind_speed_10m} {weather.current_units.wind_speed_10m}
        </h1>*/
