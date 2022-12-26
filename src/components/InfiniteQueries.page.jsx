import { Fragment, useState } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

const ItemsPerPage = 2      // Desired number of item per page request e.g. 2 will return only two elements per page

const fetchColors = ({ pageParam = 1 }) => axios.get(`http://localhost:3000/colors?_limit=2&_page=${pageParam}`)

export const InfiniteQueriesPage = () => {
    // const [pageNumber, setPageNumber] = useState(1)
    const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(['colors'], fetchColors,
        {
            getNextPageParam: (_lastPage, pages) => {
                if (pages.length <4) {  // 4 pages max <- 8 colors by 2 colors per page
                    return pages.length + 1
                } else {
                    return undefined
                }
            },
        })
    
    console.log('infinite colors: ', data?.pages) 

    return (
        <div>
            <h2>InfiniteQueriesPage</h2>

            {data?.pages.map((group, i) => {
                return (
                    <Fragment key={i}>
                        {group?.data?.map(color => (
                            <h2 key={color.id}>{color.id} - {color.label}</h2>))}
                    </Fragment>
                )
            })}

            {/* {data?.data?.map(color => (
                <div key={color.id}>{color.id} - {color.label}</div>
            ))} */}

            <button onClick={fetchNextPage} disabled={ !hasNextPage }>Load More</button>
            {/* <button onClick={() => setPageNumber(page => page + 1)} disabled={pageNumber === 4}>Next Page</button>  // 4 pages max */}
        </div>)
}
