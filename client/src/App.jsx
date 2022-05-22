import { createContext, useEffect, useState } from "react"
import { Routes, Route, NavLink, useNavigate } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import LoginPage from "./components/LoginPage"
import { checkAuthStatusApi } from "./helpers/apiCalls"

export const DataContext = createContext()

const API_URL = import.meta.env.VITE_API_URL

function App() {

  const [user, setUser] = useState()
  const [books, setBooks] = useState([])
  const [error, setError] = useState("")

  const sharedData = { user, setUser, books, setBooks, error, setError }

  const navigate = useNavigate()

  // load initial user data (=> also used to authenticate)
  useEffect(() => {
    const checkAuthStatus = async () => {
      const result = await checkAuthStatusApi()  
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

    // logout user (=clear user state!)
    setUser()
    setBooks([])

    navigate("/") // navigate to home page
  }

  return (
    <DataContext.Provider value={sharedData}>
      <div className="App">
        <header>
          <div className="error">{error}</div>
          <nav>
            <NavLink to="/">Home</NavLink>
            {!user && <NavLink to="/login">Login</NavLink>}
            {user && <NavLink to="/dashboard">Dashboard</NavLink>}
            {user && (
              <NavLink to="#" onClick={logout}>
                Logout
              </NavLink>
            )}
          </nav>
        </header>
        <main>
          <Routes>
            <Route index element={<h2>My home is my library</h2>} />
            <Route path="login" element={<LoginPage />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </DataContext.Provider>
  )
}

export default App
