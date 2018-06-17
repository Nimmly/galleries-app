import axios from "axios"

export default class UserService {
    constructor()
    {
        axios.defaults.baseURL = "http://localhost:8000/api/"
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
        }).then(response => {
            localStorage.setItem('loginToken', response.data.token)
            this.setAxiosDefaultAuthorizationHeader()
            return response
        })
    }
    setAxiosDefaultAuthorizationHeader() 
    {
        const TOKEN = localStorage.getItem('loginToken')
        axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`
    }
    isAuthenticated() 
    {
        return !!localStorage.getItem("loginToken");
    }
    logout() 
    {
        localStorage.removeItem("loginToken")
        delete axios.defaults.headers.common["Authorization"]
    }
}

export const userService = new UserService();