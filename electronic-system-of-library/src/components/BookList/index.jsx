import { useContext,useState } from "react";
import { BooksContext } from "../../contexts/Books.context";
import styled from "styled-components";
import Book from "../Book"; 
import { useForm } from "react-hook-form";
import { getWithFilters } from "../../helpers/bookApi";
const Div=styled.div`
    &:hover{
        background-color:rgb(255,255,255,0.5);
    }
`

const FilterBar=styled.form`
    width:15rem;
    height:290vh;
    transform:${({isFilter})=>isFilter?"translateX(0)":"translateX(-15rem)"}
`
const getAuthors=(bookArray)=>{
    return ["",...new Set(bookArray.map(a=>a.author))]
}

function BookList(props){
    const {booksArray,addBook,isLoading,getBooksWithFilters}=useContext(BooksContext);
    const [isFilter,isFilterSet]=useState(false);
    console.log(isFilter)
    const {handleSubmit,register,formState: { errors },watch,reset}=useForm()

    const submit=async(values)=>{
        console.log(values)
        let filters={}
        if(values.from!=''){
            filters['from']=Number(values.from)
        }
        if(values.to!=''){
            filters['to']=Number(values.to)
        }
        if(values.author!=''){
            filters['author']=values.author
        }
        if(values.sort=='Cena rosnąco'){
            filters['sort']={price:1}
        }else if(values.sort=='Cena malejąco'){
            filters['sort']={price:-1}
        }else if(values.sort=='Autor alfabetycznie'){
            filters['sort']={author:1}
        }
        console.log(filters)
        getBooksWithFilters(filters)
    }

    return(
        <div className="flex justify-center flex-col flex-wrap items-center md:flex-row md:gap-x-10 w-full relative">
            <Div className="text-white absolute left-0 text-3xl cursor-pointer" style={{padding:"0.6rem",top:"0.03rem"}} onClick={()=>{isFilterSet(!isFilter)}}>
                <i className="fa-solid fa-bars"></i>
            </Div>
            <FilterBar className="absolute bg-white top-0 left-0 duration-200 z-10 flex flex-col" isFilter={isFilter} onSubmit={handleSubmit(submit)}>
                <div className="absolute left-2 top-2 text-3xl cursor-pointer" onClick={()=>{isFilterSet(!isFilter)}}>
                    <i class="fa-solid fa-arrow-left"></i>
                </div>
                <div className="text-2xl mt-1 font-bold">
                    Filters
                </div>
                <div className="text-2xl mt-1">
                    <label className="label-form">Zakres cenowy</label>
                    <div className="flex p-2">
                        <input className="form-control"
                            {...register("from",{
                                pattern:{
                                    value:/^[1-9]+[0-9]*$/,
                                    message:"tylko liczby"
                                }})}/>
                        <div>-</div>
                        <input className="form-control"
                        {...register("to",{
                            pattern:{
                                value:/^[1-9]+[0-9]*$/,
                                message:"tylko liczby"
                            },
                            validate: (val) => {
                                if (watch('from')!=''&&val!=''&&watch('from') > val) {
                                  return "błedne wartość";
                                }
                              }})}/>
                    </div>
                    {errors.from&&<p className="text-red-600 text-lg">{errors.from.message}</p>}
                    {errors.to&&<p className="text-red-600 text-lg">{errors.to.message}</p>}
                </div>
                <div className="text-2xl mt-1 flex justify-center flex-col items-center">
                    <label className="label-form">Wybór autora</label>
                    <select className="form-control mt-2" style={{width:"80%"}}
                    {...register("author")}>
                        {getAuthors(booksArray).map(author=>(
                            <option>{author}</option>
                        ))}
                    </select>
                </div>
                <div className="text-2xl mt-1 flex justify-center flex-col items-center">
                    <label className="label-form">Sortuj</label>
                    <select className="form-control mt-2" style={{width:"80%"}}
                    {...register("sort")}>
                        <option></option>
                        <option>Cena rosnąco</option>
                        <option>Cena malejąco</option>
                        <option>Autor alfabetycznie</option>
                    </select>
                </div>
                <button style={{padding:"0.7rem"}} className='bg-sky-500 rounded hover:bg-sky-300 duration-200 text-white text-2xl w-4/5 self-center mt-3' type="submit">
                        Filtruj
                </button>
                <button style={{padding:"0.7rem"}} className='bg-orange-700 rounded hover:bg-orange-500 duration-200 text-white text-2xl w-4/5 self-center mt-3' onClick={()=>reset()}>
                        Reset
                </button>
            </FilterBar>
            {isLoading&&
            <div className='text-white text-2xl'>Loading...</div>}
            {booksArray.map(book=>(
                <Book {...book} addbook={addBook}></Book>
            ))}
        </div>
    )
}
export default BookList;