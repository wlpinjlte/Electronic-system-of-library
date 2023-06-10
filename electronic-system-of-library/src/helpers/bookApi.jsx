import axios from "axios"

const URL='http://localhost:3000/api/books'

export const getAll=()=>{
    return axios.get(`${URL}/`)
}

export const addBookToServer=(book, token)=>{
    return axios.post(`${URL}/add`,book,{
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    })
}

export const getOne=(id)=>{
    return axios.post(`${URL}/getOne`,{_id:id});
}

export const deleteBookFromServer=(id, token)=>{
    return axios.post(`${URL}/destroy`,{_id:id},{
        headers:{
            'Authorization': 'Bearer ' + token
        }
    })
}

export const updateBookOnServer=(book, token)=>{
    console.log(book)
    return axios.post(`${URL}/update`,book,{
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    })
}

export const addOpinionToBook=(opinion,id)=>{
    return axios.post(`${URL}/addOpinion`,{...opinion,_id:id})
}

export const buyBooksFromServer = (books, token) => {
    return axios.post(`${URL}/buy`, books,{
        headers:{
            'Authorization': 'Bearer ' + token
        }
    })
}

export const getWithFilters=(filters)=>{
    return axios.post(`${URL}/getWithFilters`,filters)
}