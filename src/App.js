import { useEffect, useState } from "react";
import CoinGecko from 'coingecko-api'
import authService from "./services/authentication"

function App() {
  const [user, setUser] = useState(() => {
    return authService.getUser()
  })

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

  function handleLogout() {
    authService.logout()
    setUser(null)
  }

  function handleLogin() {
    const user = authService.login()
    setUser(user)
  }

  return (
    <div>
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
     
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

export default App;
