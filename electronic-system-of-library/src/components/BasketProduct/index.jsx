import { useContext } from "react";
import { BooksContext } from "../../contexts/Books.context";
import './style.css';
import { MdDelete } from "react-icons/md"

function BasketProduct(props){
    const {id,title,author,onStock,photo,price,quantity}=props
    const {basket, basketSet, total, totalSet}=useContext(BooksContext)

    const plus = () => {
        basketSet(basket.map(book => book.id === id? {...book, quantity: quantity+1} : book))
        totalSet(total + price)
    }
    
    const minus = () => {
        if(quantity === 1) removeProduct()
        else{
            basketSet(basket.map(book => book.id === id? {...book, quantity: quantity-1} : book))
            totalSet(total - price)
        }
        
    }

    const removeProduct = () => {
        const index = basket.findIndex(x => x.id === id)
        basketSet(basket.toSpliced(index, 1))
        totalSet(total - quantity*price)
    }
    
    return(
        <div>
            <div className="box">
                <div className="left">
                    <img className="photo" src={`http://localhost:3000/${photo}`}></img>
                    <div className="name">
                        <div>
                            <p className="font-bold text-lg">{title}</p>
                            <p>{author}</p>
                        </div>
                        <p className="text-sm">units on stock: {onStock}</p>
                    </div>
                </div>
                <p className="font-bold text-lg">${price}</p>
                <div className="flex">
                    <div className="n" onClick={plus}>+</div>
                    <div className="quantity">{quantity}</div>
                    <div className="n" onClick={minus}>-</div>
                </div>
                <MdDelete className="text-4xl cursor-pointer" onClick={removeProduct}/>
            </div>
            <div className="line"></div>
        </div>
        
        // <Container className="flex flex-col justify-between lg:w-1/5 md:w-5/12 w-3/4 my-11 rounded hover:scale-105 hover:shadow-white relative">
        //     <img className="w-full w-auto rounded-t h-80 object-cover" src={`http://localhost:3000/${photo}`}></img>
        //     <p className="text-2xl font-bold my-2 px-5">title: {title}</p>
        //     <p className="text-base px-5">author: {author}</p>
        //     <p className=" text-sm px-5">{description}</p>
        //     <Button className="p-2 bg-sky-500 rounded w-1/2 self-center text-white" onStock={onStock} onClick={addToCart} disabled={onStock===0}>dodaj do koszyka</Button>
        //     <p className="mb-3 mt-1 text-xs font-bold">${price}</p>
        //     <p className="mb-3 mt-1 text-xs">onStock: {onStock}</p>
        //     {isAdmin&&<button onClick={() => deleteBook(token)} className="absolute right-2 top-0 font-bold text-2xl text-white">X</button>}
        //     {isAdmin&&<i className="fa-solid fa-pencil absolute left-2 top-0 font-bold text-2xl text-white cursor-pointer" onClick={()=>{navigate(`/edit/${_id}`)}}></i>}
        // </Container>
    )
}

export default BasketProduct;