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
      <nav className="py-5 flex items-center justify-between">
        <ul>
          <li>
            <Link to="/" className="text-blue-500 hover:text-blue-600">Home</Link>
          </li>
        </ul>
        {user ? (
          <button className="px-3 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-md" 
          onClick={handleLogout}>Logout</button>
        ) : (
          <button className="px-3 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-md" 
          onClick={handleLogin}>Login</button>
        )} 
      </nav>
    )
  }