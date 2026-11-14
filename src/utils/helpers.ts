//default Location

import type { HourlyItem, WeatherResponse } from './types.ts'

export const BERLIN = { lat: 52.52, lon: 13.41 }

export const getWeatherUrl = (lat: number, lon: number): string => {
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation&hourly=temperature_2m&timezone=auto&forecast_days=2`
}

export const getLocationUrl = (lat: number, lon: number) => {
  return `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
}

export const showTime = new Date().toLocaleDateString('de-DE', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export const getGeocodingUrl = (name: string): string => {
  return `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=5&language=en`
}

export const getHourlyData = (weather: WeatherResponse): HourlyItem[] => {
  return weather.hourly.time.map((time, i) => {
    return {
      time,
      temperature: weather.hourly.temperature_2m[i],
    }
  })
}

export const getDays = (items: HourlyItem[]): string[] => {
  return [...new Set(items.map((item) => item.time.slice(0, 10)))]
}

export const getDayName = (date: string) =>
  new Date(date).toLocaleDateString('de-DE', { weekday: 'long', timeZone: 'UTC' })

export const getHourLabel = (time: string) => time.slice(11, 16)
