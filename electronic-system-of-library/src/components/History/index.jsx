import HistoryProduct from "../HistoryProduct"
import './style.css';
import { useState } from "react";
import { getHistory } from "../../helpers/bookApi";
import { useContext } from "react";
import { UsersContext } from "../../contexts/User.context"
import { useEffect } from "react";

function History(props){
    const [history, historySet] = useState([])
    const {token} = useContext(UsersContext)

    useEffect(()=>{
        const get = async () => {
            let response = await getHistory(token)
            console.log(response.data)
            historySet(Object.values(response.data.data))
        }
        get()
    },[])

    return(
        <div className="container">
            {history.map(book=>(
                <HistoryProduct {...book}></HistoryProduct>
            ))}
        </div>
    )
}
export default History;