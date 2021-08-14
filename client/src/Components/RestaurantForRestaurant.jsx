import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext'
import OrdersTable from './OrdersTable'
import Prof from './Prof'
import TableList from './TableList'
import styles from '../styles/css/restaurant.module.css'
import Menu from './Menu'
// import VisibilityIcon from "@material-ui/icons/Visibility";

const RestaurantForRestaurant = (props) => {
  const { user } = useContext(AuthContext)
  const { id } = props
  const [data, setData] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [tabledata, setTabledata] = useState([])
  const [reRender, setReRender] = useState(false)
  const tableHeaders = ["Customer", "Delivery", "Date", "Price", "Status"];
  const [deleveries, setDeliveries] = useState([])

  const tableBodies = [
    `customer.name`,
    `delivery.name`,
    `createdAt`,
    'price',
    'status',
    deleveries,
    {
      base: "/user",
      param: `id`,
      //   icon: <VisibilityIcon />
    }
  ];


  useEffect(() => {

    if (id === user._id) {
      setData(user)
      setLoaded(true)
      axios.get('http://localhost:8000/api/orders/restaurant/' + user._id)
        .then(res => {
          // console.log('table data',res.data)
          setTabledata(res.data)
        })
        .catch(err => console.log(err))
    }
    else if (id !== user._id) {
      axios.get('http://localhost:8000/api/users/' + id)
        .then(res => {
          setData(res.data)
          setLoaded(true)
        })
        .catch(err => err)
    }


    axios.get('http://localhost:8000/api/deliveries')
      .then(res => console.log('deliveries', res.data))
      .catch(err => err)
  }, [id, user, reRender])

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
                <Menu id={id} />
              </div>
              :
              null
          }
        </>
      }
    </div>
  )
}
export default RestaurantForRestaurant
