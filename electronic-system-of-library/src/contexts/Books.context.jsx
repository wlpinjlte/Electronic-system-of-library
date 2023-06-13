import { createContext, useEffect, useState} from "react";
import { getAll } from "../helpers/bookApi";
import { getWithFilters,getBestSeller } from "../helpers/bookApi";
export const BooksContext=createContext();
function BookContext(props){
    const [booksArray,booksArraySet]=useState([])
    const [isLoading,isLoadingSet]=useState(true)
    const [basket, basketSet] = useState([])
    const [total, totalSet] = useState(0)
    const [bestSellerId,bestSellerIdSet]=useState('')
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
        const bestSeller=async()=>{
            let data=await getBestSeller();
            bestSellerIdSet(data.data._id)
            console.log(bestSellerId)
        }
        get()
        bestSeller()
    },[])

    const {children}=props;

    const addBook=(id)=>{
        const x = {...basket}
        if(id in basket){
            x[id]++
        }
        else{
            x[id] = 1
        }
        basketSet(x)
        totalSet(total + booksArray.find(book => book._id === id).price)
    }
    const getBooksWithFilters=async(filters)=>{
        let reponse=await getWithFilters(filters)
        let data=reponse.data
        booksArraySet(Object.values(data))
    }

    return(
        <BooksContext.Provider value={{booksArray:booksArray,addBook:addBook,isLoading:isLoading,booksArraySet:booksArraySet,basket:basket,total:total,totalSet:totalSet,basketSet:basketSet,getBooksWithFilters:getBooksWithFilters,bestSellerId:bestSellerId}}>
            {children}
        </BooksContext.Provider>
    )
}

export default BookContext;