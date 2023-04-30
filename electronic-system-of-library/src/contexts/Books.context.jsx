import { createContext, useEffect, useState} from "react";

export const BooksContext=createContext();
function BookContext(props){
    const [booksArray,booksArraySet]=useState([{title:"nazwa1",author:"mickiewicz",describe:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis ipsum quis cum delectus pariatur aliquid?",onStock:10,id:0},
    {title:"nazwa2",author:"mickiewicz2",describe:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis ipsum quis cum delectus pariatur aliquid?",onStock:10,id:1},
    {title:"nazwa3",author:"mickiewicz3",describe:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis ipsum quis cum delectus pariatur aliquid?",onStock:10,id:2},
    {title:"nazwa4",author:"mickiewicz4",describe:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis ipsum quis cum delectus pariatur aliquid?",onStock:10,id:3},
    {title:"nazwa5",author:"mickiewicz5",describe:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis ipsum quis cum delectus pariatur aliquid?",onStock:10,id:4}])
    //title author describe onStock id photo price
    //id title author 
    const {children}=props;
    const addBook=(id)=>{
        const book=booksArray.filter(a=>a.id===id)[0]
        book["onStock"]-=1
        console.log(book)
        console.log([...booksArray.filter(a=>a.id!==id),{...book}].sort((a,b)=>a.id-b.id))
        booksArraySet([...booksArray.filter(a=>a.id!==id),{...book}].sort((a,b)=>a.id-b.id))
    }
    return(
        <BooksContext.Provider value={{booksArray:booksArray,addBook:addBook}}>
            {children}
        </BooksContext.Provider>
    )
}

export default BookContext;