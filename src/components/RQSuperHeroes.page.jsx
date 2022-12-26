import { useQuery } from "react-query"
import { useState } from "react"
import { Link } from 'react-router-dom'
import { useSuperHeroesData, addSuperHeroesData } from '../hooks/useSuperHeroesData'

export const RQSuperHeroesPage = () => {
    const [name, setName] = useState('')
    const [alterEgo, setAlterEgo] = useState('')

    const onSuccess = (data) => {
        console.log('SUCCESS: Perform side effect after data fetching', data)
    }

    const onError = (error) => {
        console.log('ERROR: Perform side effect after encountering error', error)
    }

    const {isLoading, data, isError, error, isFetching, refetch} = useSuperHeroesData(onSuccess, onError)

    const { mutate: addHero } = addSuperHeroesData()     // mutate does call POST request

    const handleAddHeroClick = () => {
        console.log({name, alterEgo})
        const hero = {name, alterEgo}
        addHero(hero)
    }

    console.log({ isLoading, isFetching })

    return (
        <div>
            <h2>RQ Super Heroes Page</h2>

            <br />

            <input type="text" value={name} placeholder='Enter Name' onChange={e => setName(e.target.value)} />
            <input type="text" value={alterEgo} placeholder='Enter Alter Ego' onChange={e => setAlterEgo(e.target.value)} />
            <button onClick={handleAddHeroClick}>Add Hero</button>

            <br />

            <button onClick={refetch}>Fetch Heroes</button>
            
            {(isLoading || isFetching) && <h2>Data is Loading ...</h2>}

            {isError && <h2>Fetching Error: {error.message}</h2>}
            
            {data?.data.map(hero => (
                <div key={hero.id}>
                    <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
                </div>
            ))}
        </div>
        )
}
