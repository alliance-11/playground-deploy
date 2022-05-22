import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DataContext } from "../App"
import { loginApi } from "../helpers/apiCalls"

const LoginPage = () => {

  const { setUser } = useContext(DataContext)

  const emailRef = useRef()
  const pwRef = useRef()

  const [error, setError] = useState("")

  const navigate = useNavigate()

  const onLogin = async (e) => {
    e.preventDefault()

    const email = emailRef.current.value
    const password = pwRef.current.value

    if(!email || !password) 
      return setError("Without Email & Password => no party, bro!")

      // login at API with email & password
    const result = await loginApi(email, password)
    if (result.error) return setError(result.error)

    // place user (=> our login status in frontend!)
    setUser(result)
    setError("")

    // redirect to user area
    navigate("/dashboard")
  }

  return (
    <div className="login-form">
      <form onSubmit={onLogin} >
        <input type="email" ref={emailRef} defaultValue="u2@u2.com" />
        <input type="password" ref={pwRef} />
        <button type="submit">Login</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  )
}

export default LoginPage
