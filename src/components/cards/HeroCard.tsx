import { showTime } from '../../utils/helpers.ts'
import type { LocationResponse, WeatherResponse } from '../../utils/types.ts'

const HeroCard = ({
  location,
  weather,
}: {
  location: LocationResponse | null
  weather: WeatherResponse
}) => {
  return (
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
  )
}
export default HeroCard
