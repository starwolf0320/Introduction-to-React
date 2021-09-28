import { useEffect, useState } from "react";
import CoinGecko from 'coingecko-api'

function App() {
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

export default App;
