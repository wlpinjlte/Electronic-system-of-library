import { useContext, useEffect, useState } from "react"
import { addBookToServer } from "../../helpers/api"
import {useNavigate, useParams} from 'react-router-dom'
import { BooksContext } from "../../contexts/Books.context"
import { useForm } from "react-hook-form";
import {getOne,updateBookOnServer}from "../../helpers/api.jsx"
function BookForm(props){
    let {bookId}=useParams()
    const [object,objectSet]=useState(false)
    console.log(bookId)
    useEffect(()=>{
        if(bookId){
            const DownloadData=async()=>{
                let data=await getOne(bookId)
                objectSet(data.data)
            }
            DownloadData()
        }
    },[])
    const {booksArray,booksArraySet}=useContext(BooksContext)
    const navigate=useNavigate()

    const addBook=async(values)=>{
        const bodyFormData = new FormData();
        bodyFormData.append('file', values.file[0]);
        Object.keys(values).forEach(key=>{
            if(key!='file'){
            bodyFormData.append(key,values[key])}
        })
        let book=await addBookToServer(bodyFormData)
        return book
    }

    const updateBook=async(values)=>{
        const bodyFormData = new FormData();
        if(values.file){
            bodyFormData.append('file', values.file[0]);
        }else{
            bodyFormData.append('photo', object.photo);
        }
        Object.keys(values).forEach(key=>{
            if(key!='file'){
            bodyFormData.append(key,values[key])}
        })
        let book=await updateBookOnServer(bodyFormData)
        return book
    }

    const submit=async(values)=>{
        console.log(values)
        let book
        if(object){
            book=await updateBook(values)
        }else{
            book=await addBook(values)
        }
        if(book){
            console.log(book)
            booksArraySet([...booksArray.filter(a=>a._id!=bookId),book.data])
            navigate("/")
        }
    }

    const {handleSubmit,register,formState: { errors },reset}=useForm()
    console.log(errors)

    useEffect(()=>{
        reset(object)
    },[object])

    return(
        <div className="BookForm flex justify-center items-center">
            <form className="lg:w-1/3 md:w-1/2 w-3/4 flex justify-center flex-col my-20 p-5 bg-white rounded text-left" onSubmit={handleSubmit(submit)}>
                <h2 className="text-center">Trip Form</h2>
                <label className="form-label text-mb" >Name:</label>
                <input className="form-control mb-2" name="title" {...register("title",{
                    required:{
                    value:true,
                    message:"Pole wymagane"
                }})}></input>
                {errors.title&&<p className="text-red-600">{errors.title.message}</p>}

                <label className="form-label text-mb">Author:</label>
                <input className="form-control mb-2" name="author" {...register("author",{
                    required:{
                    value:true,
                    message:"Pole wymagane"
                }})}></input>
                {errors.author&&<p className="text-red-600">{errors.author.message}</p>}

                <label className="form-label text-mb">Description:</label>
                <input className="form-control mb-2" name="description" {...register("description",{
                    required:{
                    value:true,
                    message:"Pole wymagane"
                }})}></input>
                {errors.description&&<p className="text-red-600">{errors.description.message}</p>}

                <label className="form-label text-mb">OnStock:</label>
                <input className="form-control mb-2" name="onStock" {...register("onStock",{
                    required:{
                        value:true,
                        message:"Pole wymagane"
                    },
                    pattern:{
                        value:/^[1-9]+[0-9]*$/,
                        message:"tylko liczby"
                    }})}></input>
                {errors.onStock&&<p className="text-red-600">{errors.onStock.message}</p>}

                <label className="form-label text-mb">Price:</label>
                <input className="form-control mb-2" name="price" {...register("price",{
                    required:{
                        value:true,
                        message:"Pole wymagane"
                    },
                    pattern:{
                        value:/^[1-9]+[0-9]*$/,
                        message:"tylko liczby"
                    }})}></input>
                {errors.price&&<p className="text-red-600">{errors.price.message}</p>}

                <label className="form-label text-mb">Photo:</label>
                {object.photo&&<img className="w-full w-auto rounded-t h-80 object-cover" src={`http://localhost:3000/${object.photo}`}></img>}
                <input className="form-control mb-2" type="file" name="file" accept="image/png, image/jpeg, image/jpg" {...register("file",{
                    required:{
                        value:(true&&!object.photo),
                        message:"pole wymagane"}})}></input>
                 {errors.file&&<p className="text-red-600">{errors.file.message}</p>}

                <button className="p-2 bg-sky-500 rounded w-full self-center text-white" type='submit'>submit</button>
            </form>
        </div> 
    )
}

export default BookForm;