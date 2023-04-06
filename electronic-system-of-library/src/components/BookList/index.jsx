import { useContext } from "react";
import { BooksContext } from "../../contexts/Books.context";
function BookList(props){
    const {booksArray}=useContext(BooksContext);
    console.log(booksArray);
    return(
        <>
            {booksArray.map(book=>(
                <div style={{color:"white"}}>
                    <p>autor: {book.author}</p>
                    <p>tytuł: {book.title}</p>
                </div>
            ))}
        </>
    )
}
export default BookList;