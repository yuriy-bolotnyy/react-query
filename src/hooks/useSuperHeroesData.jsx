import { useQuery, useMutation, useQueryClient } from "react-query"

import axios from 'axios'

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:3000/superheroes')
}

const addSuperHero = (hero) => {
    axios.post('http://localhost:3000/superheroes', hero)
}

export const useSuperHeroesData = (onSuccess, onError) => {
    return useQuery(
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
}

export const addSuperHeroesData = () => {
    const queryClient = useQueryClient()
    return useMutation(addSuperHero, {
        onSuccess: () => {
            queryClient.invalidateQueries('super-heroes')   // Invalidate query, so it will automatically re-fetch, when new superhero added
        }
    })
}