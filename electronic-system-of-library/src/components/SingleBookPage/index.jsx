import { useContext, useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import BookContext from "../../contexts/Books.context";
import { getOne } from "../../helpers/bookApi";
function SingleBookPage(){
    const {bookId}=useParams();
    const [object,objectSet]=useState(false)
    useEffect(()=>{
        let downloadContent=async()=>{
            let book=await getOne(bookId)
            objectSet(book.data)
        }
        downloadContent()
    },[])
    console.log(object)
    return(
        <div>
            BookPage
        </div>
    )
}
export default SingleBookPage;