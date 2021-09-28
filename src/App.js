import { useEffect } from "react";
import axios from 'axios'

function App() {

  useEffect(() => {

    async function pingAPI() {
      return await axios.get("https://api.coingecko.com/api/v3/ping")
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }

    pingAPI()

  }, [])

  return (
    <div>
      Hello World
    </div>
  );
}

export default App;
