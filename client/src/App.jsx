import { createContext, useEffect, useState } from "react"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import LoginPage from "./components/LoginPage"

export const DataContext = createContext()

const API_URL = import.meta.env.VITE_API_URL

function App() {

  const [user, setUser] = useState()
  const [books, setBooks] = useState([])

  const sharedData = { user, setUser, books, setBooks }

  const navigate = useNavigate()

  // load initial user data (=> also used to authenticate)
  useEffect(() => {
    const checkAuthStatus = async () => {
      const response = await fetch(`${API_URL}/me`, {
        credentials: "include", // store received cookies!
      })
  
      const result = await response.json()
      console.log(result)
  
      if(!user && !result.error) setUser(result)
    }
    checkAuthStatus()

  }, [])

  const logout = async (e) => {

    console.log("Logging user out at API...")

    e.preventDefault()

    const response = await fetch(`${API_URL}/logout`, {
      credentials: "include",
    })
    const result = await response.json()
    if (result.error) {
      return console.log("[OUCH]", result.error)
    }

    // logout user (=clear from state!)
    setUser()

    navigate("/") // navigate to home page
  }

  return (
    <DataContext.Provider value={sharedData}>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/">Home</Link>
            { !user && <Link to="/login">Login</Link> }
            { user && <Link to="/dashboard">Dashboard</Link> }
            { user && <Link to="#" onClick={ logout }>Logout</Link> }
          </nav>
          <main>
            <Routes>
              <Route index element={<div>Homepage</div>} />
              <Route path="login" element={<LoginPage />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </header>
      </div>
    </DataContext.Provider>
  )
}

export default App
