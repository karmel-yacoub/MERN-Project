import axios from 'axios'
import React,{useContext,useState,useEffect}from 'react'
import { AuthContext } from '../Context/AuthContext'
import OrdersTable from './OrdersTable'
import Prof from './Prof'
import TableList from './TableList'
// import VisibilityIcon from "@material-ui/icons/Visibility";

const RestaurantForRestaurant = (props) => {
    const {user}=useContext(AuthContext)
    const {id} = props
    const [data ,setData] = useState({})
    const [loaded ,setLoaded] = useState(false)





    const Tabledata = [
        {
          id: 23,
          order: {
            owner: {
              id: 5,
              user: {
                id: 4,
                first_name: "John",
                last_name: "Doe"
              }
            }
          },
          application_date: "2020-07-06"
        },
        {
          id: 24,
          order: {
            owner: {
              id: 5,
              user: {
                id: 4,
                first_name: "Jane",
                last_name: "Doe"
              }
            }
          },
          application_date: "2020-07-06"
        }
      ];
      
      const tableHeaders = ["ID", "First Name", "Last Name", "Options"];
      
      const tableBodies = [
        `id`,
        `order.owner.user.first_name`,
        `order.owner.user.last_name`,
        {
          base: "/user",
          param: `id`,
        //   icon: <VisibilityIcon />
        }
      ];





    useEffect (()=>{

        if(id === user._id){
            setData(user)
            setLoaded(true)
        }
        else if (id !== user._id){
            axios.get('http://localhost:8000/api/users/'+id)
            .then(res => {
                console.log('not same' , res.data)
                setData(res.data)
                setLoaded(true)
            })
            .catch(err => err)
        }
    },[id, user])
    
    return (
        <div>
            {
                loaded && 
                <>
                <Prof data={data} />
                {
                user._id === id ?
                    <TableList
                        data={Tabledata}
                        tableHeaders={tableHeaders}
                        tableBodies={tableBodies}
                        />
                :
                null
                }
                </>
            }
        </div>
    )
}

export default RestaurantForRestaurant
