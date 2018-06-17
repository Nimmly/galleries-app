import axios from "axios"

export default class GalleryService {
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
    showUserGalleries(user_id)
    {
        return axios.get(`my-galleries/${user_id}`)
    }
    showAuthorsGalleries(user)
    {
        return axios.get(`authors-galleries/${user}`)
    }
    addComment(comment, gallery_id, user_id){
        return axios.post(`galleries/${gallery_id}/comments`, comment, user_id)
    }
    deleteComment(gallery_id, comment_id)
    {
        return axios.delete(`galleries/${gallery_id}/comments/${comment_id}`)
    }
    aaddGallery(gallery)
    {
        return axios.post('galleries/create', gallery)
    }
    addGallery(name,imgURL,description){
        return axios.post('galleries',{name,imgURL,description})
    }
    deleteGallery(id) 
    {
        return axios.delete(`galleries/${id}`)
    }
}

export const galleryService = new GalleryService();