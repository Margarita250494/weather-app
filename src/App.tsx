import Header from './layout/Header.tsx'
import Main from './layout/Main.tsx'

function App() {
  return (
    <div className=" flex flex-col items-center">
      <div className="weather-container py-5 md:py-12  flex flex-col items-center">
        <Header />

        <Main />
      </div>
    </div>
  )
}

export default App
