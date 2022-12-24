

import { useState } from 'react'

import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'

import reactLogo from './assets/react.svg'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>

      <div className="App">
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>

          

        </div>








        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>

      </div>

    </Router>

  )
}

export default App
