import { createContext, useEffect, useState} from "react";
import { getAll } from "../helpers/bookApi";
export const BooksContext=createContext();
function BookContext(props){
    const [booksArray,booksArraySet]=useState([])
    const [isLoading,isLoadingSet]=useState(true)
    const [basket, basketSet] = useState([])
    const [total, totalSet] = useState(0)
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

    const addBook=(book)=>{
        // const bookToUpadte=booksArray.map(book=>book._id===id? {...book,onStock:book.onStock-1}:book)
        // console.log(bookToUpadte)
        // booksArraySet(bookToUpadte)
        // booksArraySet([...booksArray.filter(a=>a._id!=bookId),book.data])
        // let arr = [...basket]
        // arr[id] = 1
        // console.log(arr)
        // basketSet(arr)
        // console.log(basket)
        // const clone = new Map(basket)
        // clone.set(id, value)
        // console.log(clone)
        // basketSet(clone)
        // console.log(basket)
        if(!basket.some(x => x.id === book.id)){
            basketSet([...basket, book])
            totalSet(total + book.price)
        }
    }
    return(
        <BooksContext.Provider value={{booksArray:booksArray,addBook:addBook,isLoading:isLoading,booksArraySet:booksArraySet,basket:basket,total:total,totalSet:totalSet,basketSet:basketSet}}>
            {children}
        </BooksContext.Provider>
    )
}

export default BookContext;