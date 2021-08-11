import axios from 'axios';

export default {
    login: user => {
        return axios.post("/login", user)
        .then(res => res.data)
    },
    register: user => {
        return axios.post("/register", user)
        .then(res => res.data)
    },
    logout: () => {
        return axios.post("/logout")
        .then(res => res.data)
    },
    isAuthenticated: () => {
        return axios.post("/authenticated", user)
        .then(res => {
            if (res.status !== 401) {
                return res.data;
            }
            else {
                return  {isAuthenticated: false, user: {name:"", genre:""}}
            }
        })
    }
}