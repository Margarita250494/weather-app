import type { MetricData, WeatherResponse } from './types.ts'

export const getMetricData = (weather: WeatherResponse): MetricData[] => [
  {
    title: 'Feels Like',
    value: weather.current.apparent_temperature,
    unit: weather.current_units.apparent_temperature,
  },
  {
    title: 'Humidity',
    value: weather.current.relative_humidity_2m,
    unit: weather.current_units.relative_humidity_2m,
  },
  {
    title: 'Wind Speed',
    value: weather.current.wind_speed_10m,
    unit: weather.current_units.wind_speed_10m,
  },
  {
    title: 'Precipitation',
    value: weather.current.precipitation,
    unit: weather.current_units.precipitation,
  },
]
