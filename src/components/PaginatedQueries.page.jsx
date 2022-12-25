import { useQuery } from "react-query";
import axios from "axios";

const fetchColors = () => axios.get('http://localhost:3000/colors')

export const PaginatedQueriesPage = () => {
    const { data : colors } = useQuery('colors', fetchColors)
    
    console.log('colors', colors?.data) 

    return <div>
            <h2>PaginatedQueriesPage</h2>

            {colors?.data?.map(color => (
                <div key={color.id}>{color.id} - {color.label}</div>
            ))}
        </div>
}
