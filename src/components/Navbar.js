import { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../services/authentication"

export function Navbar() {
    const [user, setUser] = useState(() => {
      return authService.getUser()
    })
  
    function handleLogout() {
      authService.logout()
      setUser(null)
    }
  
    function handleLogin() {
      const user = authService.login()
      setUser(user)
    }
  
    return (
      <nav>
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )} 
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    )
  }