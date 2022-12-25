import { useParams } from 'react-router-dom'
import { useSuperHeroData } from '../hooks/useSuperHeroData'

export const RQSuperHeroPage = () => {
    // Extract heroId from App.js: <Route exact path='/rq-super-heroes/:heroId' element={<RQSuperHeroPage/>}/>
    const { heroId } = useParams()      
    
    const {isLoading, data, isError, error} = useSuperHeroData(heroId)
    console.log('Hero data: ', data)
    console.log({isLoading})

    return (
        <div>
            <h2>Super hero details</h2>

            {(isLoading) && <h2>Data is Loading ...</h2>}

            {isError && <h2>Fetching Error: {error.message}</h2>}

            {data && <div>
                {data?.data.name} - {data.data.alterEgo}
            </div>}
        </div>
    )
}
