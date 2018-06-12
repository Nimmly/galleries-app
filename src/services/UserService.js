import axios from "axios"

export default class UserService {
    constructor()
    {
        axios.defaults.baseURL = "http://localhost:8000/api/"
    }
    index(term = ''){
        return axios.get({
            params: {
                term
            }
        })
    }
    register(first_name, last_name, email, password, password_confirmation) 
    {
        return axios.post('register', {
            first_name,
            last_name,
            email,
            password,
            password_confirmation
        })
    }
    login(email, password)
    {
        return axios.post('login', {
            email,
            password
        }).then(data => {
            window.localStorage.setItem('loginToken', data.data.token)
            this.setAxiosDefaultAuthorizationHeader()
        })
    }
    setAxiosDefaultAuthorizationHeader() 
    {
        const TOKEN = window.localStorage.getItem('loginToken')
        axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`
    }
    isAuthenticated() {
        return !!window.localStorage.getItem("loginToken");
    }
    logout() 
    {
        window.localStorage.removeItem("loginToken")
        delete axios.defaults.headers.common["Authorization"]
    }
}

export const userService = new UserService();