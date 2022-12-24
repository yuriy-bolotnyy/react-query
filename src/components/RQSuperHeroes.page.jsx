import { useQuery } from "react-query"
import axios from 'axios'

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:3000/superheroes')
}

export const RQSuperHeroesPage = () => {
    const onSuccess = (data) => {
        console.log('SUCCESS: Perform side effect after data fetching', data)
    }

    const onError = (error) => {
        console.log('ERROR: Perform side effect after encountering error', error)
    }

    const {isLoading, data, isError, error, isFetching, refetch} = useQuery(
        'super-heroes', 
        fetchSuperHeroes,
        {
            cacheTime: 300000,   // Cached query results will be invalidated after 5 min (300,000ms) - default: 5 min
            staleTime: 30000,   // 30 sec (0 by default), no fetching will be done, since last query
            refetchOnMount: true, // also possible options: false or 'always'
            refetchOnWindowFocus: true,
            refetchInterval: 10000,  // continuos refetching each 10 sec, only when window is in focus
            // refetchIntervalInBackground: 7000,
            // enabled: false,     // use it, if you want query not be fetched automatically, but e.g. by button press only
            onSuccess: onSuccess,   // Add success callback
            onError: onError,   // Add error callback
        }
        )

    console.log({ isLoading, isFetching })

    return (
        <div>
            <h2>RQSuperHeroes Page</h2>

            <button onClick={refetch}>Fetch Heroes</button>
            
            {(isLoading || isFetching) && <h2>Data is Loading ...</h2>}

            {isError && <h2>Fetching Error: {error.message}</h2>}

            
            {data?.data.map(hero => (
                <div key={hero.name}>{hero.name}</div>
            ))}
        </div>
        )
}
