import { Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import LoginPage from "./components/LoginPage"
import Navbar from "./components/Navbar"
import { useDataContext } from "./contexts/DataProvider"

function App() {

  const { error } = useDataContext()

  return (
    <div className="App">
      <header>
        <div className="error">{error}</div>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route index element={<h2>My home is my library</h2>} />
          <Route path="login" element={<LoginPage />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
