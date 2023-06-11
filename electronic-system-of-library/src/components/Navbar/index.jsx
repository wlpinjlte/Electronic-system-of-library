import { useContext } from "react";
import { UsersContext } from "../../contexts/User.context";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Hlink=styled(Link)`
    &:hover{
        background-color:rgb(255,255,255,0.5);
    }
`


function Navbar(){
    const {userName,isLogged,logOut,isAdmin}=useContext(UsersContext)
    const navigate = useNavigate()
    const signOut = () => {
        logOut()
        navigate('/login')
    }

    return(
        <div className="Navbar w-full h-12 bg-orange-700 flex justify-center items-center text-white">
            <Hlink className="absolute left-0 text-white flex justify-center items-center text-3xl" style={{padding:"0.65rem",textDecoration:"none"}} to="/basket">
                <i className="fa-solid fa-cart-shopping"></i>
            </Hlink>
            {isLogged&&
                <Hlink className="absolute text-white flex justify-center items-center text-3xl" style={{padding:"0.65rem",textDecoration:"none",left: "54.53px"}} to="/history">
                    <i class="fa-solid fa-clock-rotate-left"></i>            
                </Hlink>}
            <div className="flex">
                <Hlink className="text-3xl text-white" to='/' style={{padding:"0.4rem"}}><i className="fa-solid fa-house"></i></Hlink>
                {isAdmin&&
                <Hlink className="text-3xl text-white font-bold flex justify-center items-center w-12" style={{padding:"0.4rem",textDecoration:"none"}} to="/add">+</Hlink>} 
            </div>
            <div className="flex items-center absolute right-0">
                {isLogged&&
                    <div className="mx-3 aling-self-center">{userName}</div>}    
                {!isLogged&&
                    <Link style={{padding:"0.75rem",textDecoration:"none"}} className='bg-sky-500 hover:bg-sky-300 duration-200 text-white' to="/login" >
                        LogIn
                    </Link>}
                {isLogged&&
                    <button style={{padding:"0.75rem"}} className='bg-sky-500 hover:bg-sky-300 duration-200' onClick={signOut}>
                        LogOut
                    </button>}
            </div>
        </div>
    )
}
export default Navbar;