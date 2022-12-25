import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
    const requestUrl = `http://localhost:3000/superheroes/${heroId}`
    console.log(`requestUrl: ${requestUrl}`)
    return axios.get(requestUrl)
}

export const useSuperHeroData = (heroId) => {
    const queryClient = useQueryClient()

    return useQuery(['super-hero', heroId], () => fetchSuperHero(heroId), {
        initialData: () => {
            const hero = queryClient.getQueryData('super-heroes')?.data?.find((hero) => hero.id === parseInt(heroId))

            if (hero) {
                return { data: hero }
            } else {
                return undefined
            }
        },
    })
}
