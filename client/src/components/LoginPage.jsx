import { useRef } from "react"
import { useDataContext } from "../contexts/DataProvider"

const LoginPage = () => {

  const { login } = useDataContext()

  const emailRef = useRef()
  const pwRef = useRef()

  const onLogin = async (e) => {
    e.preventDefault()
    login(emailRef.current.value, pwRef.current.value)
  }

  return (
    <div className="login-form">
      <form onSubmit={onLogin} >
        <div>
          <label>EMAIL</label>
        <input type="email" ref={emailRef} defaultValue="u2@u2.com" />
        </div>
        <div>
        <label>PASSWORD</label>
        <input type="password" ref={pwRef} />
        </div>
        <div>
        <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
