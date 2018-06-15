import axios from "axios"

export default class UserService {
    constructor()
    {
        axios.defaults.baseURL = "http://localhost:8000/api/"
    }
    index()
    {
        return axios.get('galleries')
    }
    show(id)
    {
        return axios.get(`galleries/${id}`)
    }
    showAuthor(user_id)
    {
        return axios.get(`my-galleries/${user_id}`)
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
    addComment(comment, gallery_id, user_id){
        return axios.post(`galleries/${gallery_id}/comments`, comment, user_id)
    }
    deleteGallery(id) 
    {
        return axios.delete(`galleries/${id}`)
    }
}

export const userService = new UserService();