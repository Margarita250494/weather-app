import { Search } from '../components/Icons.ts'

const SearchField = () => {
  return (
    <section className="flex flex-col md:flex-row gap-3 w-full items-center justify-center">
      <div className="search-field w-full  md:w-[50%]">
        <Search className="w-6 h-6" />
        <label htmlFor="city-find" className="sr-only">
          Search Place
        </label>
        <input id="city-find" placeholder="Search for a place..." />
      </div>
      <button className="search-button w-full md:w-auto">Search</button>
    </section>
  )
}
export default SearchField
