import { createContext, useEffect, useState} from "react";
import axios from 'axios'
import { getAll } from "../helpers/bookApi";
export const BooksContext=createContext();
function BookContext(props){
    const [booksArray,booksArraySet]=useState([])
    const [isLoading,isLoadingSet]=useState(true)
    //title author describe onStock id photo price
    //id title author 
    useEffect(()=>{
        const get=async()=>{
            let reponse=await getAll()
            console.log(reponse.data)
            let data=reponse.data
            console.log(data)
            booksArraySet(Object.values(data))
            isLoadingSet(false)
        }
        get()
    },[])

    const {children}=props;

    const addBook=(id)=>{
        const bookToUpadte=booksArray.map(book=>book._id===id? {...book,onStock:book.onStock-1}:book)
        console.log(bookToUpadte)
        booksArraySet(bookToUpadte)
    }
    return(
        <BooksContext.Provider value={{booksArray:booksArray,addBook:addBook,isLoading:isLoading,booksArraySet:booksArraySet}}>
            {children}
        </BooksContext.Provider>
    )
}

export default BookContext;