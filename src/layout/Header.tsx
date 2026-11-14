import Logo from '../assets/logo.svg'
import { CaretDown, Settings } from '../components/Icons.ts'

const Header = () => {
  return (
    <header className="pb-5 md:pb-12 w-full flex gap-2 justify-between">
      <img src={Logo} alt="Weather-now-logo" className="object-fit max-w-37.5 md:max-w-49.25" />
      <button className="bg-neutral-0/20 rounded-sm py-2 px-4 flex gap-3 items-center">
        <Settings />
        <span>Units</span>
        <CaretDown />
      </button>
    </header>
  )
}
export default Header
