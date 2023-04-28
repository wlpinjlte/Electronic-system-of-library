import { useContext } from "react";
import { UsersContext } from "../../contexts/User.context";
function Navbar(){
    const {userName,isLogged,logIn,logOut}=useContext(UsersContext)
    return(
        <div className="Navbar w-full h-12 bg-rose-600 flex justify-center items-center text-white">
            <div className="">
                Menu
            </div>
            <div className="flex items-center absolute right-0">
                <div className="mx-3 aling-self-center">{userName}</div>
                {!isLogged&&
                    <button className='bg-sky-500 p-3 rounded hover:bg-sky-300 duration-200' onClick={()=>{logIn("userId","password")}}>
                        LogIn
                    </button>}
                {isLogged&&
                    <button className='bg-sky-500 p-3 rounded hover:bg-sky-300 duration-200' onClick={logOut}>
                        LogOut
                    </button>}
            </div>
            
            
        </div>
    )
}
export default Navbar;