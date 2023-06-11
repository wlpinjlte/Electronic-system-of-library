import { useContext } from "react"
import { BooksContext } from "../../contexts/Books.context"
import BasketProduct from "../BasketProduct"
import './style.css';
import { buyBooksFromServer } from "../../helpers/bookApi";
import { UsersContext } from "../../contexts/User.context"
import { useNavigate } from "react-router-dom";
import { refreshTokenToServer } from "../../helpers/userApi";

function Basket(props){
    const {basket, basketSet, total, totalSet, booksArray, booksArraySet} = useContext(BooksContext)
    const {token, isLogged, refreshToken, tokenSet} = useContext(UsersContext)
    const navigate = useNavigate()
    console.log(basket)

    const buy = async() => {
        if(!isLogged){
            navigate('/login')
            return
        }
        const books = []
        for (const [id, quantity] of Object.entries(basket)){
            const book = {...booksArray.find(x => x._id === id)}
            book.quantity = quantity
            books.push(book)
            console.log(booksArray)
        }
        let response = await buyBooksFromServer(books, token)
        console.log(response.data)
        if(response.data.message==="Token expired!"){
            const res = await refreshTokenToServer({refreshToken: refreshToken})
            tokenSet(res.data.token)
            response = await buyBooksFromServer(books, res.data.token)
        }
        console.log(response.data.message)
        if(response.data.message === "Success"){
            const booksCopy = structuredClone(booksArray)
            for (const [id, quantity] of Object.entries(basket)){
                booksCopy.find(book => book._id === id).onStock -= quantity
            }
            booksArraySet(booksCopy)
            basketSet([])
            totalSet(0)
        }
        else if(response.data.message === "Not enough units on stock"){
            booksArraySet(booksArray.map(book => book._id === response.data.id? {...book, onStock: response.data.onStock} : book))
            alert(response.data.message)
        }
    }

    return(
        <div className="container">
            {Object.entries(basket).map((obj)=>(
                <BasketProduct obj = {obj}></BasketProduct>
            ))}
            <p className="text-3xl">Total: ${total}</p>
            <div className="kup text-3xl bg-orange-700" onClick={buy}>Buy</div>
        </div>
    )
}
export default Basket;