import { useState } from 'react'
import { Search } from '../components/Icons.ts'
import { useCitySearch } from '../utils/hooks/useCitySearch.ts'
import type { Coords, GeoResult } from '../utils/types.ts'

const SearchField = ({ onSelect }: { onSelect: (coords: Coords) => void }) => {
  const [query, setQuery] = useState('')
  const { results, searching, searchError, search, clear } = useCitySearch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim().length < 2) return
    void search(query.trim())
  }

  const handlePick = (city: GeoResult) => {
    onSelect({ lat: city.latitude, lon: city.longitude })
    setQuery('')
    clear()
  }
  const showDropdown = searching || searchError !== null || results.length > 0
  return (
    <section className="flex flex-col md:flex-row gap-3 w-full items-center justify-center">
      <div className="relative w-full md:w-[50%]">
        <form id="search-form" onSubmit={handleSubmit} className="search-field w-full">
          <Search className="w-6 h-6" />
          <label htmlFor="city-find" className="sr-only">
            Search Place
          </label>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            id="city-find"
            placeholder="Search for a place..."
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={results.length > 0}
          />
        </form>
        {showDropdown && (
          <div className="dropdown absolute left-0 top-full z-10 mt-2 w-full">
            {searching && <p className="dropdown-group-label">Searching...</p>}
            {searchError && <p className="dropdown-group-label">{searchError}</p>}

            <ul>
              {results.map((city) => (
                <li key={`${city.latitude}-${city.longitude}`}>
                  <button
                    type="button"
                    onClick={() => handlePick(city)}
                    className="dropdown-item w-full text-left"
                  >
                    <span>{city.name}</span>
                    <span className="text-neutral-300">{city.country}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button type="submit" form="search-form" className="search-button w-full md:w-auto">
        Search
      </button>
    </section>
  )
}
export default SearchField
