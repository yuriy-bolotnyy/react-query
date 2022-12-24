import { useQuery } from "react-query"
import axios from 'axios'

export const RQSuperHeroesPage = () => {

    const {isLoading, data} = useQuery('super-heroes', () => {
        return axios.get('http://localhost:3000/superheroes')
    })

    console.log(isLoading, data)

    return (
        <div>
            {isLoading && <h2>Data is Loading ...</h2>}

            <h2>RQSuperHeroes Page</h2>
            {data?.data.map(hero => (
                <div key={hero.name}>{hero.name}</div>
            ))}
        </div>
        )
}
