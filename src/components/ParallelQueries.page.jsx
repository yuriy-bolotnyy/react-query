import { useQuery } from "react-query"
import axios from "axios"

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:3000/superheroes')
}

const fetchFriends = () => {
    return axios.get('http://localhost:3000/friends')
}

export const ParallelQueriesPage = () => {

    const { data: superheroes } = useQuery('super-heroes', fetchSuperHeroes)
    const { data: friends } = useQuery('friends', fetchFriends)

    console.log('superheroes: ', superheroes?.data)
    console.log('friends: ', friends?.data)

    return (
        <div>
            <div>ParallelQueriesPage</div>
            <br />
            
            <div>
                <h3>Friends: </h3>
                {friends?.data.map(
                    friend => (
                        <div>{friend.name}</div>
                    )
                )}
            </div>
            
            <br />

            <div>
                <h3>Super Heroes: </h3>
                {superheroes?.data.map(
                    hero => (
                        <div>{hero.name}</div>
                    )
                )}
            </div>
        </div>
    )
}
