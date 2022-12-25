import { useQuery } from "react-query"
import { Link } from 'react-router-dom'
import { useSuperHeroesData } from '../hooks/useSuperHeroesData'

export const RQSuperHeroesPage = () => {
    const onSuccess = (data) => {
        console.log('SUCCESS: Perform side effect after data fetching', data)
    }

    const onError = (error) => {
        console.log('ERROR: Perform side effect after encountering error', error)
    }

    const {isLoading, data, isError, error, isFetching, refetch} = useSuperHeroesData(onSuccess, onError)

    console.log({ isLoading, isFetching })

    return (
        <div>
            <h2>RQ Super Heroes Page</h2>

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
