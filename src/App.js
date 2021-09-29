import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Navbar } from './components/Navbar'
import { Home } from './components/Home'
import { Coin } from './components/Coin'

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/:coinId/" exact>
            <Coin />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}