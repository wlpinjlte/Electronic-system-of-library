import HistoryProduct from "../HistoryProduct"
import './style.css';
import { useState } from "react";
import { getHistory } from "../../helpers/bookApi";
import { useContext } from "react";
import { UsersContext } from "../../contexts/User.context"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { refreshTokenToServer } from "../../helpers/userApi";

function History(props){
    const [history, historySet] = useState([])
    const {token, refreshToken, tokenSet, isLogged} = useContext(UsersContext)
    const navigate = useNavigate()

    useEffect(()=>{
        const get = async () => {
            if(!isLogged){
                navigate('/login')
            }
            let response = await getHistory(token)
            console.log(response);
            console.log(response.data)
            if(response.data.message==="Token expired!"){
                const res = await refreshTokenToServer({refreshToken: refreshToken})
                tokenSet(res.data.token)
                response = await getHistory(res.data.token)
            }
            if(response.data.message === "Success"){
                historySet(Object.values(response.data.data))
            }
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