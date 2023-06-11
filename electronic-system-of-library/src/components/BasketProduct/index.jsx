import { useContext } from "react";
import { BooksContext } from "../../contexts/Books.context";
import './style.css';
import { MdDelete } from "react-icons/md"

function BasketProduct(props){
    const {obj}=props
    const {basket, basketSet, total, totalSet, booksArray}=useContext(BooksContext)
    const id = obj[0]
    const quantity = obj[1]
    const book = booksArray.find(book => book._id === id)

    const plus = () => {
        const x = {...basket}
        x[id]++
        basketSet(x)
        totalSet(total + book.price)
    }
    
    const minus = () => {
        if(quantity === 1) removeProduct()
        else{
            const x = {...basket}
            x[id]--
            basketSet(x)
            totalSet(total - book.price)
        }
        
    }

    const removeProduct = () => {
        const x = {...basket}
        delete x[id]
        basketSet(x)
        totalSet(total - quantity * book.price)
    }
    
    return(
        <div>
            <div className="box">
                <div className="left">
                    <img className="photo" src={`http://localhost:3000/${book.photo}`}></img>
                    <div className="name">
                        <div>
                            <p className="font-bold text-lg mb-0">{book.title}</p>
                            <p>{book.author}</p>
                        </div>
                        <p className="text-sm mb-0">units on stock: {book.onStock}</p>
                    </div>
                </div>
                <p className="font-bold text-lg">${book.price}</p>
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