import axios from 'axios'
import React,{useContext,useState,useEffect}from 'react'
import { AuthContext } from '../Context/AuthContext'
import OrdersTable from './OrdersTable'
import Prof from './Prof'
import TableList from './TableList'
import styles from '../styles/css/restaurant.module.css'
// import VisibilityIcon from "@material-ui/icons/Visibility";

const DeliveryForDelivery = (props) => {
    const {user}=useContext(AuthContext)
    const {id} = props
    const [data ,setData] = useState({})
    const [loaded ,setLoaded] = useState(false)
    const [tabledata , setTabledata] = useState([])




    // const Tabledata = [
    //     {
    //       id: 23,
    //       order: {
    //         owner: {
    //           id: 5,
    //           user: {
    //             id: 4,
    //             first_name: "John",
    //             last_name: "Doe"
    //           }
    //         }
    //       },
    //       application_date: "2020-07-06"
    //     },
    //     {
    //       id: 24,
    //       order: {
    //         owner: {
    //           id: 5,
    //           user: {
    //             id: 4,
    //             first_name: "Jane",
    //             last_name: "Doe"
    //           }
    //         }
    //       },
    //       application_date: "2020-07-06"
    //     }
    //   ];
      
      const tableHeaders = ["Restaurant", "Customer" ,"Date", "Price" , "Action"];
      
      const tableBodies = [
        `restaurant.name`,
        `customer.name`,
        `createdAt`,
        'price',
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
            axios.get('http://localhost:8000/api/orders/delivery/' + user._id)
            .then(res => {
              console.log('table data',res.data)
              setTabledata(res.data)
            })
            .catch(err => console.log(err))
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
        <div className={styles.flexo}>
            {
                loaded && 
                <>
                <div className={styles.prof}>
                  <Prof data={data} />
                </div>
                {
                user._id === id ?
                <div className={styles.table}>
                    <TableList
                        data={tabledata}
                        tableHeaders={tableHeaders}
                        tableBodies={tableBodies}
                        />
                </div>
                :
                null
                }
                </>
            }
        </div>
    )
}

export default DeliveryForDelivery

