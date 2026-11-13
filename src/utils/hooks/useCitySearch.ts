import { useState } from 'react'
import { getGeocodingUrl } from '../helpers.ts'
import type { GeoResponse, GeoResult } from '../types.ts'

export const useCitySearch = () => {
  const [results, setResults] = useState<GeoResult[]>([])
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)

  const search = async (query: string) => {
    const name = query.trim()

    if (name.length < 2) {
      clear()
      return
    }

    setSearching(true)
    setSearchError(null)
    setResults([])

    try {
      const response = await fetch(getGeocodingUrl(name))

      if (!response.ok) {
        throw new Error('Something went wrong')
      }

      const data: GeoResponse = await response.json()

      setResults(data.results ?? [])
    } catch {
      setSearchError('Search failed')
    } finally {
      setSearching(false)
    }
  }

  const clear = () => {
    setResults([])
    setSearching(false)
    setSearchError(null)
  }

  return { results, searching, searchError, search, clear }
}
