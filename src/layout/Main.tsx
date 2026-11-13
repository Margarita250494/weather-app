import Metrics from './Metrics.tsx'
import SearchField from './SearchField.tsx'

const Main = () => {
  return (
    <main className="w-full flex flex-col gap-8 md:gap-16">
      <h1 className="heading text-center">How's the sky looking today?</h1>
      <SearchField />
      <Metrics />
    </main>
  )
}
export default Main
