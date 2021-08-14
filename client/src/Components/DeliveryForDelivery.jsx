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
    const [reRender, setReRender] = useState(true)

      
      const tableHeaders = ["Restaurant", "Customer" ,"Date", "Price" ,"Status", "Action"];
      
      const tableBodies = [
        `restaurant.name`,
        `customer.name`,
        `createdAt`,
        'price',
        'status',
        {
          base: "/user",
          param: `id`,
        //   icon: <VisibilityIcon />
        }
      ];







    useEffect (()=>{

        if(id === user._id){
            setData(user)
            
            axios.get('http://localhost:8000/api/orders/delivery/' + user._id)
            .then(res => {
              setLoaded(true)
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
    },[id, user , reRender])
    
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
                        setReRender={setReRender}
                        reRender={reRender}
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

