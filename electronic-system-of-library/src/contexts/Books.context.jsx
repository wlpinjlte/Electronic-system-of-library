import { createContext, useState} from "react";

export const BooksContext=createContext();
function BookContext(props){
    const [booksArray,booksArraySet]=useState([{title:"nazwa1",author:"mickiewicz"},{title:"nazwa2",author:"mickiewicz2"}])
    const {children}=props;
    return(
        <BooksContext.Provider value={{booksArray:booksArray}}>
            {children}
        </BooksContext.Provider>
    )
}

export default BookContext;