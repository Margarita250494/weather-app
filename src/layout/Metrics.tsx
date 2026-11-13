import { useEffect, useState } from 'react'
import bgToday from '../assets/bg-today-large.svg'
import type { LocationResponse, WeatherResponse } from '../utils/types.ts'

const BERLIN = { lat: 52.52, lon: 13.41 }
const Metrics = () => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null)
  const [location, setLocation] = useState<LocationResponse | null>(null)
  useEffect(() => {
    if (!coords) return
    const { lat, lon } = coords
    async function loadLocation() {
      try {
        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch location')
        }

        const data: LocationResponse = await response.json()
        setLocation(data)
      } catch {
        setLocation(null)
      }
    }
    void loadLocation()
  }, [coords])
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      },
      () => {
        setCoords(BERLIN)
      }
    )
  }, [])

  useEffect(() => {
    if (!coords) return
    const { lat, lon } = coords

    async function loadWeather() {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation`

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch weather')
        }
        const data: WeatherResponse = await response.json()

        setWeather(data)
      } catch {
        setError('something wrong')
      } finally {
        setLoading(false)
      }
    }
    void loadWeather()
  }, [coords])

  if (loading)
    return (
      <p className="loading-dots">
        <span />
        <span />
        <span />
      </p>
    )
  if (error) return <p>{error}</p>
  if (!weather) return null
  const showTime = new Date().toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return (
    <section className="w-full flex flex-col lg:flex-row gap-4">
      <div
        className="hero-card flex items-center justify-center w-full lg:w-[70%] h-75 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgToday})` }}
      >
        <div className="flex flex-col md:flex-row w-full gap-10 justify-between items-center">
          <h5 className="location flex flex-col gap-2 text-center md:text-left">
            {location?.city || location?.locality || '—'}, {location?.countryName}
            <span className="body-small text-center md:text-left text-neutral-300">{showTime}</span>
          </h5>
          <p className="temperature">
            {weather.current.temperature_2m}
            {weather.current_units.temperature_2m}
          </p>
        </div>
      </div>

      <div className=" hourly-panel flex flex-col gap-4 w-full lg:w-[30%]">
        <div className="hourly-row">1</div>
      </div>
    </section>
  )
}
export default Metrics

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
