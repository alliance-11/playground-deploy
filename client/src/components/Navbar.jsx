import { NavLink } from "react-router-dom";
import { useDataContext } from "../contexts/DataProvider";

const Navbar = () => {

  const {user, logout} = useDataContext()

  const handleLogout = (e) => {
    console.log("Logging user out at API...")
    e.preventDefault()
    logout()
  }

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {!user && <NavLink to="/login">Login</NavLink>}
      {user && <NavLink to="/dashboard">Dashboard</NavLink>}
      {user && (
        <NavLink to="#" onClick={ handleLogout }>
          Logout
        </NavLink>
      )}
    </nav>
  )
}
 
export default Navbar;