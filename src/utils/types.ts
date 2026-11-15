import { UNITS_KEY } from './helpers.ts'

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
  hourly: {
    time: string[]
    temperature_2m: number[]
  }
}

export interface LocationResponse {
  countryName: string
  city: string
  locality?: string
}

export interface MetricData {
  title: string
  value: number
  unit: string
}

export interface Coords {
  lat: number
  lon: number
}

export interface GeoResult {
  name: string
  latitude: number
  longitude: number
  country: string
}

export interface GeoResponse {
  results?: GeoResult[]
}

export interface HourlyItem {
  time: string
  temperature: number
}

export type Units = 'metric' | 'imperial'

export type TemperatureUnit = UNITS_KEY.TEMPERATURE_M | UNITS_KEY.TEMPERATURE_I
export type WindUnit = UNITS_KEY.WIND_M | UNITS_KEY.WIND_I
export type PrecipitationUnit = UNITS_KEY.PRECIPITATION_M | UNITS_KEY.PRECIPITATION_I

export type UnitSettings = {
  temperatureUnit: TemperatureUnit
  windUnit: WindUnit
  precipitationUnit: PrecipitationUnit
}
