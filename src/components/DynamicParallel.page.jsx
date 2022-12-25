import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:3000/superheroes/${heroId}`)
}

export const DynamicParallelPage = ({ heroIds }) => {

    const queryResults = useQueries(
        heroIds.map( id => {
                return {
                    queryKey: ['super-hero', id],
                    queryFn: () => fetchSuperHero(id)
                }
            }
        )
    )

    console.log('queryResults', queryResults)

    return (
        <div>
            <h2>DynamicParallelPage</h2>
        </div>
    )
}
