import clsx from 'clsx'
import { useCallback, useRef, useState } from 'react'
import Logo from '../assets/logo.svg'
import { CaretDown, Check, Settings } from '../components/Icons.ts'
import { UNITS_KEY } from '../utils/helpers.ts'
import { useClickOutside } from '../utils/hooks/useClickOutside.ts'
import type { UnitSettings } from '../utils/types.ts'

const Header = ({
  units,
  onSelect,
}: {
  units: UnitSettings
  onSelect: (units: UnitSettings) => void
}) => {
  const [openMenu, setOpenMenu] = useState(false)
  const headerMenuRef = useRef<HTMLDivElement>(null)
  const handleMenuClick = () => {
    setOpenMenu((prev) => !prev)
  }
  const closeHeaderMenu = useCallback(() => {
    setOpenMenu(false)
  }, [])

  useClickOutside(headerMenuRef, closeHeaderMenu)
  const isCelsius = units.temperatureUnit === UNITS_KEY.TEMPERATURE_M
  const isFahrenheit = units.temperatureUnit === UNITS_KEY.TEMPERATURE_I
  const isKMH = units.windUnit === UNITS_KEY.WIND_M
  const isMPH = units.windUnit === UNITS_KEY.WIND_I
  const isMM = units.precipitationUnit === UNITS_KEY.PRECIPITATION_M
  const isIN = units.precipitationUnit === UNITS_KEY.PRECIPITATION_I
  return (
    <header className=" pb-5 md:pb-12 w-full flex gap-2 justify-between">
      <img src={Logo} alt="Weather-now-logo" className="object-fit max-w-37.5 md:max-w-49.25" />
      <div ref={headerMenuRef} className="relative">
        <button
          onClick={handleMenuClick}
          aria-expanded={openMenu}
          className=" bg-neutral-0/20 rounded-sm py-2 px-4 flex gap-3 items-center"
        >
          <Settings />
          <span>Units</span>
          <CaretDown />
        </button>
        {openMenu && (
          <div className="dropdown absolute right-0 top-full z-10 mt-2 w-70 flex flex-col gap-4">
            <div className="px-2 pt-2">
              <button>Switch to ....</button>
            </div>
            <span className="dropdown-divider" />
            <span className="caption text-neutral-300 px-2">Temperature</span>
            <ul className="w-full flex flex-col gap-2">
              <li className="w-full">
                <button
                  onClick={() => onSelect({ ...units, temperatureUnit: UNITS_KEY.TEMPERATURE_M })}
                  className={clsx(
                    'dropdown-item duration-500 w-full',
                    isCelsius && 'bg-neutral-0/20'
                  )}
                >
                  Celsius (°C)
                  {isCelsius && <Check className="w-5 h-5" />}
                </button>
              </li>
              <li className="w-full">
                <button
                  onClick={() => onSelect({ ...units, temperatureUnit: UNITS_KEY.TEMPERATURE_I })}
                  className={clsx(
                    'dropdown-item duration-500 w-full',
                    isFahrenheit && 'bg-neutral-0/20'
                  )}
                >
                  Fahrenheit (°F)
                  {isFahrenheit && <Check className="w-5 h-5" />}
                </button>
              </li>
            </ul>
            <span className="dropdown-divider" />
            <span className="caption text-neutral-300 px-2 ">Wind speed</span>
            <ul className="w-full flex flex-col gap-2">
              <li className="w-full">
                <button
                  onClick={() => onSelect({ ...units, windUnit: UNITS_KEY.WIND_M })}
                  className={clsx('dropdown-item duration-500 w-full', isKMH && 'bg-neutral-0/20')}
                >
                  Kilometers per hour (kmh)
                  {isKMH && <Check className="w-5 h-5" />}
                </button>
              </li>
              <li className="w-full">
                <button
                  onClick={() => onSelect({ ...units, windUnit: UNITS_KEY.WIND_I })}
                  className={clsx('dropdown-item duration-500 w-full', isMPH && 'bg-neutral-0/20')}
                >
                  Miles per hour (mph)
                  {isMPH && <Check className="w-5 h-5" />}
                </button>
              </li>
            </ul>
            <span className="dropdown-divider" />
            <span className="caption text-neutral-300 px-2 ">Precipitation</span>
            <ul className="w-full flex flex-col gap-2">
              <li className="w-full">
                <button
                  onClick={() =>
                    onSelect({ ...units, precipitationUnit: UNITS_KEY.PRECIPITATION_M })
                  }
                  className={clsx('dropdown-item duration-500 w-full', isMM && 'bg-neutral-0/20')}
                >
                  Millimeters (mm)
                  {isMM && <Check className="w-5 h-5" />}
                </button>
              </li>
              <li className="w-full">
                <button
                  onClick={() =>
                    onSelect({ ...units, precipitationUnit: UNITS_KEY.PRECIPITATION_I })
                  }
                  className={clsx('dropdown-item duration-500 w-full', isIN && 'bg-neutral-0/20')}
                >
                  Inch (in)
                  {isIN && <Check className="w-5 h-5" />}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
