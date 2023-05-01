import axios from "axios"
const URL='http://localhost:3000/api/books'

export const getAll=async()=>{
    return axios.get(`${URL}/`)
}