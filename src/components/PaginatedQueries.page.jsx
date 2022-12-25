import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const ItemsPerPage = 2      // Desired number of item per page request e.g. 2 will return only two elements per page

const fetchColors = (pageNumber) => axios.get(`http://localhost:3000/colors?_limit=${ItemsPerPage}&_page=${pageNumber}`)

export const PaginatedQueriesPage = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const { data : colors } = useQuery(
        ['colors', pageNumber], 
        () => fetchColors(pageNumber),
        {
            keepPreviousData: true,     // Keep previous data for retrieved pages
        })
    
    console.log('colors', colors?.data) 

    return (
        <div>
            <h2>PaginatedQueriesPage</h2>

            {colors?.data?.map(color => (
                <div key={color.id}>{color.id} - {color.label}</div>
            ))}

            <button onClick={() => setPageNumber(page => page - 1)} disabled={pageNumber === 1}>Prev Page</button>
            <button onClick={() => setPageNumber(page => page + 1)} disabled={pageNumber === 4}>Next Page</button>  // 4 pages max
        </div>)
}
