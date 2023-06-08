import { useContext, useState } from "react";
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
    background-color:${props=>props.onStock==0? "grey":"default"};
`
function Book(props){
    const navigate=useNavigate()
    const {isAdmin, token, refreshToken, tokenSet}=useContext(UsersContext)
    const {booksArray,booksArraySet}=useContext(BooksContext)
    const {title,author,description,onStock,addbook,_id,photo,price}=props
    const addToCart=()=>{
        const book = {
            id: _id,
            title: title,
            author: author,
            onStock: onStock,
            photo: photo,
            price: price,
            quantity: 1
        }
        addbook(book);
    }
    const deleteBook=async(token)=>{
        console.log(token)
        let response=await deleteBookFromServer(_id, token)
        console.log(response.data.message)
        if(response.data.message==="Token expired!"){
            response = await refreshTokenToServer({refreshToken: refreshToken})
            tokenSet(response.data.token)
            deleteBook(response.data.token)
        }
        else if(response.data.message==="Delete succeed!"){
            booksArraySet(booksArray.filter(a=>a._id!=_id))
        }
    }
    return(
        <Container className="flex flex-col justify-between lg:w-1/5 md:w-5/12 w-3/4 my-11 rounded hover:scale-105 hover:shadow-white relative">
            <img className="w-full w-auto rounded-t h-80 object-cover" src={`http://localhost:3000/${photo}`}></img>
            <p className="text-2xl font-bold my-2 px-5">title: {title}</p>
            <p className="text-base px-5">author: {author}</p>
            <p className=" text-sm px-5">{description}</p>
            <Button className="p-2 bg-sky-500 rounded w-1/2 self-center text-white" onStock={onStock} onClick={addToCart} disabled={onStock===0}>dodaj do koszyka</Button>
            <p className="mb-3 mt-1 text-xs font-bold">${price}</p>
            <p className="mb-3 mt-1 text-xs">onStock: {onStock}</p>
            {isAdmin&&<button onClick={() => deleteBook(token)} className="absolute right-2 top-0 font-bold text-2xl text-white">X</button>}
            {isAdmin&&<i className="fa-solid fa-pencil absolute left-2 top-0 font-bold text-2xl text-white cursor-pointer" onClick={()=>{navigate(`/edit/${_id}`)}}></i>}
        </Container>
    )
}

export default Book;