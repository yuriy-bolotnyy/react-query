import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
    const requestUrl = `http://localhost:3000/superheroes/${heroId}`
    console.log(`requestUrl: ${requestUrl}`)
    return axios.get(requestUrl)
}

export const useSuperHeroData = (heroId) => {
    return useQuery(['super-hero', heroId], () => fetchSuperHero(heroId))
}
