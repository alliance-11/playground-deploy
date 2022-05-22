import { createContext, useContext, useEffect, useState } from "react"
import { checkAuthStatusApi, loginApi, logoutApi } from "../helpers/apiCalls"
import { useNavigate } from "react-router-dom"

const DataContext = createContext()

export const useDataContext = () => {
  return useContext(DataContext)
}

const DataProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [books, setBooks] = useState([])
  const [error, setError] = useState("")

  const navigate = useNavigate()

  // load initial user data (=> also used to authenticate)
  useEffect(() => {
    const checkAuthStatus = async () => {
      const result = await checkAuthStatusApi()
      if (!user && !result.error) setUser(result)
    }
    checkAuthStatus()
  }, [])

  const login = async (email, password, redirectRoute = "/dashboard") => {
    if (!email || !password)
      return setError("Without Email & Password => no party, bro!")

    // login at API with email & password
    const result = await loginApi(email, password)
    if (result.error) return setError(result.error)

    // place user (=> our login status in frontend!)
    setUser(result)
    setError("")

    // redirect to user area
    navigate( redirectRoute )

  }

  const logout = async () => {
    const result = await logoutApi()

    if (result.error) {
      return console.log("[OUCH]", result.error)
    }

    // logout user (=clear user state!)
    setUser()
    setBooks([])

    navigate("/") // navigate to home page
  }

  const sharedData = { user, setUser, books, setBooks, error, setError, login, logout }

  return (
    <DataContext.Provider value={sharedData}>{children}</DataContext.Provider>
  )
}

export default DataProvider
