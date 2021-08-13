import axios from 'axios'
import React , {useState , useEffect} from 'react'



const UserPage = (props) => {
    const {id} = props
    const [user , setUser] = useState({})
    const [loaded , setLoaded] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + id)
        .then(res => {
            setUser(res.data)
            console.log(res.data)
            setLoaded(true)
        })
    },[id])
    return (
        <div>
            {loaded && user.name}
         
        </div>
    )
}

export default UserPage
