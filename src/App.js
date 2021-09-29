import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CoinGecko from 'coingecko-api'
import authService from "./services/authentication"

function Home() {
  const [coins, setCoins] = useState(null)

  useEffect(() => {
    const CoinGeckoClient = new CoinGecko();

    async function pingAPI() {
      return await CoinGeckoClient.ping();
    }

    async function fetchCoinList() {
      const response = await CoinGeckoClient.coins.all()
      setCoins(response.data)
      return response
    }

    pingAPI()
    fetchCoinList()

  }, [])

  return (
    <div>
      {coins && (
        <ul>
          {coins.map(coin => {
            return (
              <li key={coin.id}>{coin.id}</li>
            )
          })}
        </ul>
      )}
    </div>
  );
}

function About() {
  return (
    <div>
      About
    </div>
  )
}


function Navbar() {
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
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  )
}

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}