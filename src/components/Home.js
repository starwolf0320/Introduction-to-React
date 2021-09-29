import { useEffect, useState } from "react";
import CoinGecko from 'coingecko-api'
import { Link } from "react-router-dom";

export function Home() {
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
                <li key={coin.id} className="flex items-center mt-2 py-3 px-5 border border-gray-200 rounded-sm">
                    <img src={coin.image.small} alt={coin.id} className="w-8 h-8" />
                    <Link to={`/${coin.id}/`} className="ml-3 hover:text-blue-600">
                        {coin.name}
                    </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    );
  }