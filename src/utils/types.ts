export interface WeatherResponse {
  current_units: {
    temperature_2m: string
    apparent_temperature: string
    relative_humidity_2m: string
    wind_speed_10m: string
    precipitation: string
  }
  current: {
    time: string
    temperature_2m: number
    apparent_temperature: number
    relative_humidity_2m: number
    wind_speed_10m: number
    precipitation: number
  }
}

export interface LocationResponse {
  countryName: string
  city: string
  locality?: string
}
