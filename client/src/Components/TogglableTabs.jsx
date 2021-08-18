import styles from '../styles/css/togglableTaps.module.css'
import axios from 'axios'
import React, { useContext, useState, useEffect, useRef } from 'react'
import { AuthContext } from '../Context/AuthContext'
import OrdersTable from './OrdersTable'
import Prof from './Prof'
import TableList from './TableList'
// import styles from '../styles/css/restaurant.module.css'
import Menu from './Menu'
import moment from 'moment'
// import VisibilityIcon from "@material-ui/icons/Visibility";




const TogglableTabs = (props) => {
    const { user } = useContext(AuthContext)
    // const { id } = props
    const componentRef = useRef(null);
    const menuRef = useRef(null);
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

    const openCity = (cityName, e, color) => {
        // Hide all elements with class="tabcontent" by default */
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            console.log(tabcontent[i]);
            tabcontent[i].style.display = "none";
        }

        // Remove the background color of all tablinks/buttons
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].style.backgroundColor = "";
        }

        // Show the specific tab content
        // document.getElementById(cityName).style.display = "block";
        console.log(cityName);
        cityName.current.style.display = "block"

        // Add the specific color to the button used to open the tab content
        e.target.style.backgroundColor = color;
    }

    useEffect(() => {

        axios.get('http://localhost:8000/api/deliveries')
            .then(res => {
                setDeliveries(res.data)
                console.log('deliveries', res.data)
            })

        if (props.id === user._id) {
            setData(user)

            axios.get('http://localhost:8000/api/orders/restaurant/' + user._id)
                .then(res => {
                    // console.log('table data',res.data)
                    res.data.map(item => {
                        item.createdAt = moment(item.createdAt).calendar();
                    })
                    setTabledata(res.data)
                    setLoaded(true)
                })
                .catch(err => console.log(err))
        }
        else if (props.id !== user._id) {
            axios.get('http://localhost:8000/api/users/' + props.id)
                .then(res => {
                    setData(res.data)
                    setLoaded(true)
                })
                .catch(err => err)
        }
    }, [props.id, user, reRender])

    // Get the element with id="defaultOpen" and click on it
    // useEffect(() => {
    //     document.getElementById("defaultOpen").click();
    // }, [])

    return (
        <div>

            {
                loaded &&
                <>
                    {/* <div className={styles.prof}>
                        <Prof data={data} />
                    </div> */}
                    {
                        // user._id === props.id ?
                        <div >
                            <div ref={componentRef} className={`${styles.tabcontent} tabcontent`}>
                                <TableList
                                    data={tabledata}
                                    tableHeaders={tableHeaders}
                                    tableBodies={tableBodies}
                                    setReRender={setReRender}
                                    reRender={reRender}
                                />
                            </div>
                            {/* <Menu ref={node => menuRef.current = node} className={`${styles.tabcontent} tabcontent`} id={props.id} /> */}
                            <div ref={menuRef} className={`${styles.tabcontent} tabcontent`}>
                                <h1 >Tokyo</h1>
                                <p>Tokyo is the capital of Japan.</p>
                            </div>
                        </div>
                        // :
                        // null
                    }
                </>
            }


            {/* <div id="Tokyo" className={`${styles.tabcontent} tabcontent`}>
                <h1>Tokyo</h1>
                <p>Tokyo is the capital of Japan.</p>
            </div>

            <div id="Oslo" className={`${styles.tabcontent} tabcontent`}>
                <h1>Oslo</h1>
                <p>Oslo is the capital of Norway.</p>
            </div> */}

            <button className={`${styles.tablink} tablink `} onClick={e => openCity(componentRef, e, 'red')} id="defaultOpen" >London</button>
            <button className={`${styles.tablink} tablink `} onClick={e => openCity(menuRef, e, 'green')}>Paris</button>
            {/* <button className={`${styles.tablink} tablink `} onClick={e => openCity('Tokyo', e, 'blue')} >Tokyo</button>
            <button className={`${styles.tablink} tablink `} onClick={e => openCity('Oslo', e, 'orange')}>Oslo</button> */}
        </div>
    )
}

export default TogglableTabs

