import { useContext, useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import BookContext from "../../contexts/Books.context";
import { addOpinionToBook, getOne } from "../../helpers/bookApi";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Contianer=styled.div`
    flex-direction:row;
    @media(max-width:770px){
        flex-direction:column;
    }
`
const Formm=styled.form`
    @media(max-width:770px){
        margin-top:1rem;
    }
`
function SingleBookPage(){
    const {bookId}=useParams();
    const [object,objectSet]=useState(false)
    const [isForm,isFormSet]=useState(false)
    const {handleSubmit,register,formState: { errors }}=useForm()
    const navigate = useNavigate()

    useEffect(()=>{
        let downloadContent=async()=>{
            let book=await getOne(bookId)
            if(book.data.message === 'Error!'){
                navigate('/')
            }
            objectSet(book.data)
        }
        downloadContent()
    },[])
    const submitOpinion=async(values)=>{
        console.log(values)
        let opinion=await addOpinionToBook(values,bookId)
        opinion=opinion.data
        if(opinion){
            objectSet({...object,opinions:[...object.opinions,opinion]})
        }
        isFormSet(!isForm)
    }
    console.log(object)
    return(
        <Contianer className="SingleBookPage flex justify-center items-center my-20 relative md:felx-row lg:felx-row">
            {!object&&<div className="text-white text-7xl">loading...</div>}
            {object&&<>
            <div className="card lg:w-1/4 md:w-1/3 relative w-5/6">
                <img src={`http://localhost:3000/${object.photo}`} className="card-img-top object-cover"></img>
                <div className="card-body">
                    <h4 className="card-title">{object.title}</h4>
                    <div className="card-text">
                        {object.author}
                    </div>
                    <div className="card-text">
                        {object.description}
                    </div>
                    <div className="card-text font-bold">
                        {object.price}$
                    </div>
                    <div className="card-text">
                        onStock:{object.onStock}
                    </div>
                </div>
            </div>
            <Formm className="card relative p-5 box-border duration-300 overflow-y-scroll lg:w-1/3 md:w-1/2 w-5/6" style={{minHeight:!isForm?"43rem":"30rem",maxHeight:"43rem"}} onSubmit={handleSubmit(submitOpinion)}>
            {!isForm&&
                <>
                    <h1 className="card-title">Opinions</h1>
                    {object.opinions?.map(opinion=>(
                        <div className="border-2 border-stone-800 rounded w-5/6 self-center p-2 mt-2">
                            <h5 className="text-left">{opinion.author}</h5>
                            <div className="text-left">{opinion.content}</div>
                            <div className="flex text-yellow-500 justify-end">
                                {Array.from({ length: opinion.rating }, (_, index) => index).map(liczba=>(
                                    <i class="fa-solid fa-star"></i>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button className="self-center bottom-3 text-white p-2 bg-sky-500 rounded mt-4" onClick={()=>{isFormSet(!isForm)}}>Move to Form</button>
                </>}
            {isForm&&
                <>
                    <div className="text-4xl absolute left-1 top-1 cursor-pointer" onClick={()=>{isFormSet(!isForm)}}>🠔</div>
                    <h1 className="card-title mt-4">Opinion Form</h1>
                    <label className="form-label text-left">Nick:</label>
                    <input className="form-control w-2/3" {...register("author",{
                        required:{
                        value:true,
                        message:"Pole wymagane"
                    }})}></input>
                    {errors.author&&<p className="text-red-600">{errors.author.message}</p>}
                    <label className="form-label text-left">Opinion:</label>
                    <textarea className="w-2/3 self-center form-control" {...register("content",{
                            required:{
                            value:true,
                            message:"Pole wymagane"
                        },minLength:{
                            value:50,
                            message:"Minimum 50 znaków"
                        }})}></textarea>
                    {errors.content&&<p className="text-red-600">{errors.content.message}</p>}
                    <label className="form-label text-left">Rating(1-5):</label>
                    <input className="form-control w-2/3" {...register("rating",{
                        required:{
                        value:true,
                        message:"Pole wymagane"
                        },pattern:{
                            value:/^[1-5]$/,
                            message:"only 1-5"
                    }})}></input>
                    {errors.rating&&<p className="text-red-600">{errors.rating.message}</p>}
                    <button className="absolute self-center bottom-3 text-white p-2 bg-sky-500 rounded" type='submit'>Submit Opinion</button>
                </>}
            </Formm></>}
        </Contianer>
    )
}
export default SingleBookPage;