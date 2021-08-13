import axios from 'axios';

export default {
    login: user => {
        return axios.post("http://localhost:8000/login", user)
        .then(res => {
            // console.log("service",res);
            res.message = "Login Successfully";
            return res.data;
        })
        .catch(res => {
            // console.log(res);
            // res.message = "Not"
            return res.data;
        })
    },
    register: user => {
        return axios.post("http://localhost:8000/register", user)
        .then(res => {
            // console.log(res.data)
            return res.data
        })
        .catch(err => {
            return err.response.data
        })
    },
    logout: () => {
        return axios.post("/logout")
        .then(res => res.data)
    },
    isAuthenticated: () => {
        return axios.get("http://localhost:8000/authenticated")
        .then(res => {
            if (res.status !== 401) {
                // console.log("suc")
                return res.data;
            }
            else {
                // console.log("401")
                return  {isAuthenticated: false, user: {name:"", genre:""}}
            }
        })
        .catch(err => {
            // console.log("catch")
            return  {isAuthenticated: false, user: {name:"", genre:""}}
        })
    }
}