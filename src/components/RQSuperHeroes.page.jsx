import { useQuery } from "react-query"
import axios from 'axios'

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:3000/superheroes3')
}

export const RQSuperHeroesPage = () => {

    const {isLoading, data, isError, error} = useQuery('super-heroes', fetchSuperHeroes)

    console.log(isLoading, data)

    return (
        <div>
            {isLoading && <h2>Data is Loading ...</h2>}

            {isError && <h2>Fetching Error: {error.message}</h2>}

            <h2>RQSuperHeroes Page</h2>
            {data?.data.map(hero => (
                <div key={hero.name}>{hero.name}</div>
            ))}
        </div>
        )
}
