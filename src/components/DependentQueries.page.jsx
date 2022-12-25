import { useQuery } from "react-query"
import axios from 'axios'

const fetchUserByEmail = (email) => {
    return axios.get(`http://localhost:3000/users/${email}`)
}

const fetchCoursesByChannelId = (channelId) => {
    return axios.get(`http://localhost:3000/channels/${channelId}`)
}

export const DependentQueriesPage = ({ email }) => {

    const {data: user} = useQuery(['user', email], () => fetchUserByEmail(email))
    console.log('user: ', user?.data)
    const channelId = user?.data.channelId

    const {data: channel} = useQuery(
        ['courses', channelId], 
        () => fetchCoursesByChannelId(channelId),
        {
            enabled: !!channelId,   // Keep the second (dependent) query in a disabled state, until the first query fetches result (channelId)
        })

    console.log('channel: ', channel?.data)
    const courses = channel?.data?.courses
    console.log('courses: ', courses)

    return <div>
        <h2>DependentQueries</h2>

        {channelId && <h3>ChannelId: {channelId}</h3>}

        {courses?.map(course => (
            <div key={course}>{course}</div>
        ))}

        </div>
}
