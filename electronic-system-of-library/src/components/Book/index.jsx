import { useState } from "react";
import styled from "styled-components";
const Container=styled.div`
    background-color:white;
    transition:0.5s;
`
const Button=styled.button`
    background-color:${props=>props.onStock==0? "grey":"default"};
`
function Book(props){
    const {title,author,description,onStock,addbook,_id}=props
    const click=()=>{
        addbook(_id);
    }
    return(
        <Container className="flex flex-col justify-between lg:w-1/5 md:w-5/12 w-3/4 my-11 rounded hover:scale-105 hover:shadow-white">
            <img className="w-full w-auto rounded-t" src="https://ecsmedia.pl/c/quo-vadis-b-iext123393340.jpg"></img>
            <p className="text-2xl font-bold my-2 px-5">name: {title}</p>
            <p className="text-base mb-5 px-5">author: {author}</p>
            <p className="mb-5 text-sm px-5">{description}</p>
            <Button className="p-2 bg-sky-500 rounded w-1/2 self-center text-white" onStock={onStock} onClick={click} disabled={onStock===0}>dodaj do koszyka</Button>
            <p className="mb-5 mt-1 text-xs">onStock:{onStock}</p>
        </Container>
    )
}

export default Book;