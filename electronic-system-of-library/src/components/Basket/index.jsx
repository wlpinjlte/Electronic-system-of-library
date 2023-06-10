import { useContext } from "react"
import { BooksContext } from "../../contexts/Books.context"
import BasketProduct from "../BasketProduct"
import './style.css';
import { buyBooksFromServer } from "../../helpers/bookApi";
import { UsersContext } from "../../contexts/User.context"


function Basket(props){
    const {basket, basketSet, total, totalSet} = useContext(BooksContext)
    const {token} = useContext(UsersContext)

    const buy = async() => {
        let response = await buyBooksFromServer(basket, token)
        console.log(response.data)
        if(response.data.message === "Success"){
            basketSet([])
            totalSet(0)
        }
    }

    return(
        <div className="container">
            {basket.map(book=>(
                <BasketProduct {...book}></BasketProduct>
            ))}
            <p className="text-3xl">Total: ${total}</p>
            <div className="kup text-3xl bg-orange-700" onClick={buy}>Buy</div>
        </div>
    )
}
export default Basket;