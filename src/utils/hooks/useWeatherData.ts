import { useEffect, useState } from 'react'
import { getWeatherUrl } from '../helpers.ts'
import type { Coords, WeatherResponse } from '../types.ts'

export const useWeatherData = (coords: Coords | null) => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null)
  const [loadedKey, setLoadedKey] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!coords) return
    console.log('3. эффект погоды, coords =', coords)
    const { lat, lon } = coords
    let cancelled = false

    async function loadWeather() {
      try {
        const response = await fetch(getWeatherUrl(lat, lon))
        if (!response.ok) {
          throw new Error('Failed to fetch weather')
        }
        const data: WeatherResponse = await response.json()
        if (cancelled) return
        setWeather(data)
        setError(null)
      } catch {
        if (!cancelled) setError('something wrong')
      } finally {
        if (!cancelled) setLoadedKey(`${lat},${lon}`)
      }
    }
    void loadWeather()

    return () => {
      cancelled = true
    }
  }, [coords])

  const loading = !coords || loadedKey !== `${coords.lat},${coords.lon}`

  return { weather, loading, error }
}
