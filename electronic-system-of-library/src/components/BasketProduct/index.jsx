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
    )
}

export default BasketProduct;