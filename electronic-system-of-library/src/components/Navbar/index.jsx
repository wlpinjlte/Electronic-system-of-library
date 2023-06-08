import { useContext } from "react";
import { UsersContext } from "../../contexts/User.context";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
function Navbar(){
    const {userName,isLogged,logIn,logOut,isAdmin}=useContext(UsersContext)
    return(
        <div className="Navbar w-full h-12 bg-orange-700 flex justify-center items-center text-white">
            {isAdmin&&
                <Link className="absolute left-0 text-3xl text-white font-bold flex justify-center items-center w-12" style={{textDecoration:"none"}} to="/add">+</Link>}
            <Link className="absolute left-40 text-white flex justify-center items-center" style={{textDecoration:"none"}} to="/basket">basket</Link>
            <div className="">
                Menu
            </div>
            <div className="flex items-center absolute right-0">
                {isLogged&&
                    <div className="mx-3 aling-self-center">{userName}</div>}    
                {!isLogged&&
                    <Link style={{padding:"0.75rem",textDecoration:"none"}} className='bg-sky-500 rounded hover:bg-sky-300 duration-200 text-white' to="/login" >
                        LogIn
                    </Link>}
                {isLogged&&
                    <button style={{padding:"0.75rem"}} className='bg-sky-500 rounded hover:bg-sky-300 duration-200' onClick={logOut}>
                        LogOut
                    </button>}
            </div>
        </div>
    )
}
export default Navbar;