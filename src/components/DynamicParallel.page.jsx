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
    console.log('queryResults[0].data.data', queryResults[0]?.data?.data)

    return (
        <div>
            <h2>DynamicParallelPage</h2>

            {queryResults?.map(query => {
                const hero = query?.data?.data
                hero && console.log('hero:', hero.id, hero.name, hero.alterEgo)

                return <div key={hero?.id}>{hero?.id}. {hero?.name} - {hero?.alterEgo}</div>
            })}
        </div>
    )
}
