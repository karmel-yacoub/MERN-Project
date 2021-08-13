import axios from 'axios';

export default {
    login: user => {
        return axios.post("http://localhost:8000/login", user)
        .then(res => {
            console.log(res);
            res.message = "ok";
            return res;
        })
        .catch(res => {
            console.log(res);
            // res.message = "Not"
            return res;
        })
    },
    register: user => {
        return axios.post("http://localhost:8000/register", user)
        .then(res => {
            // console.log(res.data)
            return res.data
        })
        .catch(res => {
            // console.log(res.data)
            return res.data.errors
        })
    },
    logout: () => {
        return axios.post("/logout")
        .then(res => res.data)
    },
    isAuthenticated: (user) => {
        return axios.get("http://localhost:8000/authenticated")
        .then(res => {
            if (res.status !== 401) {
                return res.data;
            }
            else {
                return  {isAuthenticated: false, user: {name:"", genre:""}}
            }
        })
        .catch(err => {
            return  {isAuthenticated: false, user: {name:"", genre:""}}
        })
    }
}