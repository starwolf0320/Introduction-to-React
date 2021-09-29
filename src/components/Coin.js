import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import CoinGecko from 'coingecko-api'
import { LineChart } from './LineChart'
import { AuthContext } from "../contexts/AuthContext";

export function Coin() {
    const { coinId } = useParams()
    const { user } = useContext(AuthContext)

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
  
        async function fetchCoin() {
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
    
        fetchCoin()
  
    }, [coinId])

    return (
        <div>
            <div className="border-t border-gray-200 py-5">
                <h2 className="text-2xl text-gray-800">{coinId}</h2>
            </div>
            {!priceData && (
                <div className='bg-gray-100 rounded-sm py-5 text-center'>
                    <h4 className="text-xl text-gray-600">Loading...</h4>
                </div>
            )}
            {user ? (
                <>
                    {priceData && labels && (
                        <LineChart 
                            labels={labels} 
                            coinId={coinId} 
                            priceData={priceData} />
                    )}
                </>
            ) : (
                <p>You need to be logged in to view the chart</p>
            )}
            
        </div>
    )
}