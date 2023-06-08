import { useContext } from "react"
import { BooksContext } from "../../contexts/Books.context"
import BasketProduct from "../BasketProduct"
import './style.css';

function Basket(props){
    const {basket, total} = useContext(BooksContext)

    return(
        <div className="container">
            {basket.map(book=>(
                <BasketProduct {...book}></BasketProduct>
            ))}
            {/* {basket.values().map(x =>(
                <BasketProduct {...x}></BasketProduct>
            ))} */}
            {/* {for (const x of basket.values()){
                <BasketProduct {...x}></BasketProduct>
            }} */}
             {/* {basket.forEach((key, value) => (
                <BasketProduct {...value}></BasketProduct>
            ))} */}
            <p className="text-3xl">Total: ${total}</p>
            <div className="kup text-3xl bg-orange-700">Buy</div>
        </div>
    )
}
export default Basket;