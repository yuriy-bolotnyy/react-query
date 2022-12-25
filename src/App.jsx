import { useState } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import { RQSuperHeroPage } from './components/RQSuperHero.page'
import { ParallelQueriesPage } from './components/ParallelQueries.page'
import { DynamicParallelPage } from './components/DynamicParallel.page'
import { DependentQueriesPage } from './components/DependentQueries.page'

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
                {/* <li>
                  <Link to='/super-heroes'>Traditional Super Heroes</Link>
                </li> */}
                <li>
                  <Link to='/rq-super-heroes'>Super Heroes</Link>
                </li>
                <li>
                  <Link to='/rq-parallel'>Parallel Queries</Link>
                </li>
                <li>
                  <Link to='/rq-dynamic-parallel'>Dynamic Parallel Queries</Link>
                </li>
                <li>
                  <Link to='/rq-dependent'>Dependent Queries</Link>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route exact path='/rq-dependent' element={<DependentQueriesPage email='vishwas@example.com' />}/>
              <Route exact path='/rq-dynamic-parallel' element={<DynamicParallelPage heroIds={[1, 3]} />}/>
              <Route exact path='/rq-parallel' element={<ParallelQueriesPage />}/>
              <Route exact path='/rq-super-heroes/:heroId' element={<RQSuperHeroPage/>}/>
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
