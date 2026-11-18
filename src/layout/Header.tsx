import * as React from 'react'
import Logo from '../assets/logo.svg'
import Button from '../components/Button.tsx'
import { Settings } from '../components/Icons.ts'
import SwitcherInput from '../components/SwitcherInput.tsx'
import UnitSelectGroup from '../components/UnitSelectGroup.tsx'
import { getWeatherUnits, UNITS_KEY } from '../utils/helpers.ts'
import { useOpenHeaderMenu } from '../utils/hooks/useOpenHeaderMenu.ts'
import type { UnitSettings } from '../utils/types.ts'

const Header = ({
  units,
  onSelect,
}: {
  units: UnitSettings
  onSelect: (units: UnitSettings) => void
}) => {
  const { openMenu, handleMenuClick, headerMenuRef } = useOpenHeaderMenu()
  const { switcherLabel, isImperial } = getWeatherUnits(units)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const isChecked = e.target.checked

    onSelect({
      ...units,
      temperatureUnit: isChecked ? UNITS_KEY.TEMPERATURE_I : UNITS_KEY.TEMPERATURE_M,
      windUnit: isChecked ? UNITS_KEY.WIND_I : UNITS_KEY.WIND_M,
      precipitationUnit: isChecked ? UNITS_KEY.PRECIPITATION_I : UNITS_KEY.PRECIPITATION_M,
    })
  }

  return (
    <header className=" pb-5 md:pb-12 w-full flex gap-2 justify-between">
      <img src={Logo} alt="Weather-now-logo" className="object-fit max-w-37.5 md:max-w-49.25" />
      <div ref={headerMenuRef} className="relative">
        <Button
          handleMenuOpen={handleMenuClick}
          ariaExpanded={openMenu}
          className="bg-neutral-0/20"
          icon={<Settings />}
          buttonLabel="Units"
        />

        {openMenu && (
          <div className="dropdown absolute right-0 top-full z-10 mt-2 w-70 flex flex-col gap-4">
            <SwitcherInput
              switcherLabel={switcherLabel}
              isImperial={isImperial}
              handleChange={handleChange}
            />
            <UnitSelectGroup
              title="Temperature"
              selectedValue={units.temperatureUnit}
              onSelect={() => onSelect({ ...units, temperatureUnit: UNITS_KEY.TEMPERATURE_M })}
              options={[
                {
                  label: 'Celsius (°C)',
                  value: UNITS_KEY.TEMPERATURE_M,
                },
                {
                  label: 'Fahrenheit (°F)',
                  value: UNITS_KEY.TEMPERATURE_I,
                },
              ]}
            />

            <UnitSelectGroup
              title="Wind speed"
              selectedValue={units.windUnit}
              onSelect={() => onSelect({ ...units, windUnit: UNITS_KEY.WIND_M })}
              options={[
                {
                  label: 'Kilometers per hour (kmh)',
                  value: UNITS_KEY.WIND_M,
                },
                {
                  label: 'Miles per hour (mph)',
                  value: UNITS_KEY.WIND_I,
                },
              ]}
            />

            <UnitSelectGroup
              title="Precipitation"
              selectedValue={units.precipitationUnit}
              onSelect={() => onSelect({ ...units, precipitationUnit: UNITS_KEY.PRECIPITATION_M })}
              options={[
                {
                  label: 'Millimeters (mm)',
                  value: UNITS_KEY.PRECIPITATION_M,
                },
                {
                  label: 'Inches (in)',
                  value: UNITS_KEY.PRECIPITATION_I,
                },
              ]}
              className="pb-1.5"
            />
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
