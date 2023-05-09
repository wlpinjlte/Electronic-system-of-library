import { useContext, useState } from "react"
import { addBookToServer } from "../../helpers/api"
import {useNavigate} from 'react-router-dom'
import { BooksContext } from "../../contexts/Books.context"
function BookForm(){
    const {booksArray,booksArraySet}=useContext(BooksContext)
    const navigate=useNavigate()
    const[formData,formDataSet]=useState({
        title:"",
        author:"",
        description:"",
        onStock:0,
        price:0,
        photo:""
    })
    const [file,fileSet]=useState()
    const update=(event)=>{
        formDataSet({...formData,[event.target.name]:event.target.value})
        console.log(formData)
    }
    const submit=async(event)=>{
        event.preventDefault()
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        Object.keys(formData).forEach(key=>{
            bodyFormData.append(key,formData[key])
        })
        let book=await addBookToServer(bodyFormData)
        if(book){
            booksArraySet([...booksArray,book.data])
            navigate("/")
        }
        console.log(book)
    }
    const uploadFileHandler=async(e)=>{
        fileSet(e.target.files[0])
    }
    return(
        <div className="BookForm flex justify-center items-center">
            <form className="w-1/2 flex justify-center flex-col my-20 p-5 bg-white rounded text-left">
                <label className="form-label text-2xl text-center">Trip Form</label>
                <label className="form-label text-mb">Name:</label>
                <input className="form-control mb-2" name="title" onChange={update}></input>
                <label className="form-label text-mb">Author:</label>
                <input className="form-control mb-2" name="author" onChange={update}></input>
                <label className="form-label text-mb">Description:</label>
                <input className="form-control mb-2" name="description" onChange={update}></input>
                <label className="form-label text-mb">OnStock:</label>
                <input className="form-control mb-2" name="onStock" onChange={update}></input>
                <label className="form-label text-mb">Price:</label>
                <input className="form-control mb-2" name="price" onChange={update}></input>
                <label className="form-label text-mb">Photo:</label>
                <input className="form-control mb-2" type="file" name="photo" onChange={uploadFileHandler} accept="image/png, image/jpeg, image/jpg"></input>
                <button onClick={submit} className="p-2 bg-sky-500 rounded w-full self-center text-white">submit</button>
            </form>
        </div> 
    )
}

export default BookForm;