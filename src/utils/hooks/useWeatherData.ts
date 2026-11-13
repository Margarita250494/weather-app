import { useEffect, useState } from 'react'
import { getWeatherUrl } from '../helpers.ts'
import type { Coords, WeatherResponse } from '../types.ts'

export const useWeatherData = (coords: Coords | null) => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!coords) return
    const { lat, lon } = coords

    async function loadWeather() {
      try {
        const url = getWeatherUrl(lat, lon)
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

  return { weather, loading, error }
}
