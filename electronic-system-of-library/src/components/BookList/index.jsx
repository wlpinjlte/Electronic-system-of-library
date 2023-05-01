import { useContext } from "react";
import { BooksContext } from "../../contexts/Books.context";
import Book from "../Book";
function BookList(props){
    const {booksArray,addBook,isLoading}=useContext(BooksContext);
    return(
        <div className="flex justify-center flex-col flex-wrap items-center md:flex-row md:gap-x-10 w-full">
            {isLoading&&
            <div className='text-white text-2xl'>Loading...</div>}
            {booksArray.map(book=>(
                <Book {...book} addbook={addBook}></Book>
            ))}
        </div>
    )
}
export default BookList;