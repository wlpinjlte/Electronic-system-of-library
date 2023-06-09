import { useContext, useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import BookContext from "../../contexts/Books.context";
import { addOpinionToBook, getOne } from "../../helpers/bookApi";
import { useForm } from "react-hook-form";
function SingleBookPage(){
    const {bookId}=useParams();
    const [object,objectSet]=useState(false)
    const [isForm,isFormSet]=useState(false)
    const {handleSubmit,register,formState: { errors }}=useForm()
    useEffect(()=>{
        let downloadContent=async()=>{
            let book=await getOne(bookId)
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
        <div className="SingleBookPage flex justify-center items-center mt-40 relative">
            {object&&<>
            <div className="card w-1/4 relative">
                <img src={`http://localhost:3000/${object.photo}`} className="card-img-top h-96 object-cover"></img>
                <div className="card-body">
                    <h5 className="card-title">title:{object.title}</h5>
                    <div className="card-text">
                        author:{object.author}
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
            <form className="card w-1/3 relative p-5 box-border duration-300 overflow-y-scroll" style={{minHeight:!isForm?"43rem":"30rem",maxHeight:"43rem"}} onSubmit={handleSubmit(submitOpinion)}>
            {!isForm&&
                <>
                    <h1 className="card-title">Opinions</h1>
                    {object.opinions?.map(opinion=>(
                        <div className="border-2 border-stone-800 rounded w-5/6 self-center p-2 mt-2">
                            <h5 className="text-left">author:{opinion.author}</h5>
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
            </form></>}
        </div>
    )
}
export default SingleBookPage;