import { useContext } from "react";
import styled from "styled-components";
import {UsersContext} from '../../contexts/User.context'
import { deleteBookFromServer } from "../../helpers/bookApi";
import { BooksContext } from "../../contexts/Books.context";
import { useNavigate } from "react-router-dom";
import { refreshTokenToServer } from "../../helpers/userApi";


const Container=styled.div`
    background-color:white;
    transition:0.5s;
`
const Button=styled.button`
    background-color:${props=>props.onStock===0? "grey":"default"};
`
function Book(props){
    const navigate=useNavigate()
    const {isAdmin, token, refreshToken, tokenSet}=useContext(UsersContext)
    const {booksArray, booksArraySet, basket, basketSet, total, totalSet,bestSellerId}=useContext(BooksContext)
    const {title,author,description,onStock,addbook,_id,photo,price}=props
    const addToCart=()=>{
        addbook(_id);
    }
    const deleteBook=async(token)=>{
        console.log(token)
        let response = await deleteBookFromServer(_id, token)
        console.log(response.data.message)
        if(response.data.message==="Token expired!"){
            const res = await refreshTokenToServer({refreshToken: refreshToken})
            tokenSet(res.data.token)
            response = await deleteBookFromServer(_id, res.data.token)
        }
        if(response.data.message==="Delete succeed!"){
            if(_id in basket){
                totalSet(total - basket[_id] * price)
                const b = {...basket}
                delete b[_id]
                basketSet(b)
            }
            booksArraySet(booksArray.filter(a=>a._id!==_id))
        }
    }
    return(
        <Container className="flex flex-col justify-between lg:w-1/5 md:w-5/12 w-3/4 my-11 rounded hover:scale-105 hover:shadow-white relative" style={{height:"50rem"}}>
            <img className="w-full w-auto rounded-t object-cover cursor-pointer" src={`http://localhost:3000/${photo}`} onClick={()=>{navigate(`/${_id}`)}}></img>
            
            <p className="text-2xl font-bold my-2 px-5 relative text-center flex justify-center">
                {title}
                {bestSellerId===_id&&
                    <p className="text-xs text-red-600 font-bold">BESTSELLER</p>}
            </p>
            <p className="text-base px-5">{author}</p>
            {/* <p className=" text-sm px-5">{description}</p> */}
            <Button className="p-2 bg-sky-500 rounded w-1/2 self-center text-white" onStock={onStock} onClick={addToCart} disabled={onStock===0}>Add to cart</Button>
            <p className="mb-3 mt-1 font-bold">${price}</p>
            <p className="mb-3 mt-1 text-xs">units on stock: {onStock}</p>
            {isAdmin&&<button onClick={() => deleteBook(token)} className="absolute right-2 top-0 font-bold text-2xl text-white">X</button>}
            {isAdmin&&<i className="fa-solid fa-pencil absolute left-2 top-0 font-bold text-2xl text-white cursor-pointer" onClick={()=>{navigate(`/edit/${_id}`)}}></i>}
        </Container>
    )
}

export default Book;