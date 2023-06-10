import { createContext, useEffect, useState} from "react";
import { getAll } from "../helpers/bookApi";
import { getWithFilters } from "../helpers/bookApi";
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
        if(!basket.some(x => x.id === book.id)){
            basketSet([...basket, book])
            totalSet(total + book.price)
        }
        else{
            basketSet(basket.map(x => x.id === book.id? {...x, quantity: x.quantity + 1} : x))
            totalSet(total + book.price)
        }
    }
    const getBooksWithFilters=async(filters)=>{
        let reponse=await getWithFilters(filters)
        let data=reponse.data
        booksArraySet(Object.values(data))
    }

    return(
        <BooksContext.Provider value={{booksArray:booksArray,addBook:addBook,isLoading:isLoading,booksArraySet:booksArraySet,basket:basket,total:total,totalSet:totalSet,basketSet:basketSet,getBooksWithFilters:getBooksWithFilters}}>
            {children}
        </BooksContext.Provider>
    )
}

export default BookContext;