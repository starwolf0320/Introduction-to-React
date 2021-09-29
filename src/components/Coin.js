import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import CoinGecko from 'coingecko-api'
import { LineChart } from './LineChart'
import { AuthContext } from "../contexts/AuthContext";
import { Loader } from './Loader'

export function Coin() {
    const { coinId } = useParams()
    const { user } = useContext(AuthContext)

    const [coin, setCoin] = useState(null)
    const [priceData, setPriceData] = useState(null)
    const [labels, setLabels] = useState(null)

    useEffect(() => {
        const date = new Date()
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
        const firstDayUnix = firstDay.getTime() / 1000
        const currentDayUnix = date.getTime() / 1000

        const CoinGeckoClient = new CoinGecko();

        function formatUnix(unixTimestamp) {
            const date = new Date(unixTimestamp)
            return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}` 
        }
  
        async function fetchCoinMarketData() {
            const response = await CoinGeckoClient.coins.fetchMarketChartRange(
                coinId,
                {
                    vs_currency: "usd",
                    from: firstDayUnix,
                    to: currentDayUnix,
                }
            )
            setPriceData(response.data.prices.map(item => item[1]))
            setLabels(response.data.prices.map(item => formatUnix(item[0])))
            return response
        }

        async function fetchCoin() {
            const response = await CoinGeckoClient.coins.fetch(coinId)
            setCoin(response.data)
            return response
        }
    
        if (user) {
            fetchCoin()
            fetchCoinMarketData()
        }

    }, [coinId, user])

    return (
        <div>
            {user ? (
                <> 
                    {(!coin || !priceData ) && <Loader />}
                    {coin && priceData && (
                        <>
                            <div className="flex items-center border-t border-gray-200 py-5">
                                <img src={coin.image.small} alt={coin.name} className="w-12 h-12" />
                                <h2 className="ml-2 text-2xl text-gray-800">{coin.name}</h2>
                            </div>
                            {priceData && labels && (
                                <LineChart 
                                    labels={labels} 
                                    coinId={coinId} 
                                    priceData={priceData} />
                            )}
                        </>
                    )}
                </>
            ) : (
                <p>You need to be logged in to view the chart</p>
            )}
        </div>
    )
}