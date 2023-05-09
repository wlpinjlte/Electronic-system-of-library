import axios from "axios"
const URL='http://localhost:3000/api/books'

export const getAll=()=>{
    return axios.get(`${URL}/`)
}

export const addBookToServer=(book)=>{
    return axios.post(`${URL}/add`,book,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const getImage=(url)=>{
    return axios.get(`${URL}/getImage/${url}`);
}

export const deleteBookFromServer=(id)=>{
    return axios.post(`${URL}/destroy`,{_id:id})
}