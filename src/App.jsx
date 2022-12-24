import { useState } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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

            <Routes>
              <Route exact path='/super-heroes' element={<SuperHeroesPage/>}/>
              <Route exact path='/rq-super-heroes' element={<RQSuperHeroesPage/>}/>
              <Route exact path='/' element={<HomePage/>}/>
            </Routes>
          </div>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  )
}

export default App
