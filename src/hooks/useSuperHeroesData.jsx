import { useQuery, useMutation, useQueryClient } from "react-query"

import axios from 'axios'

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:3000/superheroes')
}

const addSuperHero = (hero) => {
    return axios.post('http://localhost:3000/superheroes', hero)
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

// This example invaidates query right after adding a new superhero, so the screen refreshes automatically 
// export const addSuperHeroesData = () => {
//     const queryClient = useQueryClient()
//     return useMutation(addSuperHero, {
//         onSuccess: (data) => {
//             console.log(`useMutation OnSuccess => data: `, data)
//             queryClient.invalidateQueries('super-heroes')   // Invalidate query, so it will automatically re-fetch, when new superhero added
//         }
//             })
// }

// In this example, we re-use data from POST request's response, so we do save one network request, which would happen after invalidation, see ^^^
// export const addSuperHeroesData = () => {
//     const queryClient = useQueryClient()
//     return useMutation(addSuperHero, {
//         onSuccess: (data) => {
//             console.log(`useMutation OnSuccess => data: `, data)
//             // queryClient.invalidateQueries('super-heroes')   // Invalidate query, so it will automatically re-fetch, when new superhero added
//             queryClient.setQueryData('super-heroes', (oldQueryData) => {
//                 return {
//                     ...oldQueryData,
//                     data: [...oldQueryData.data, data.data],
//                 }
//             })
//         }
//             })
// }

// In this example we use optimistic updates i.e. we add new hero right away, then re-fetch it in background
export const addSuperHeroesData = () => {
    const queryClient = useQueryClient()
    return useMutation(addSuperHero, {
        onMutate: async (newHero) => {
            await queryClient.cancelQueries('super-heroes')
            const previousHeroData = queryClient.getQueryData('super-heroes')
            
            queryClient.setQueryData('super-heroes', (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [
                        ...oldQueryData.data, 
                        { id: oldQueryData?.data?.length + 1, ...newHero},
                    ],
                }
            })

            return {
                previousHeroData,
            }
        },

        onError: (_error, _hero, context) => {
            queryClient.setQueryData('super-heroes', context.previousHeroData)
        },

        onSettled: () => {
            queryClient.invalidateQueries('super-heroes')
        },
    })
}