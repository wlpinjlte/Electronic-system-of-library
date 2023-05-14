import { createContext,useEffect,useState } from "react"
import { registerToServer } from "../helpers/userApi";
import { logInToServer } from "../helpers/userApi";

export const UsersContext=createContext();
function UserContext(props){
    const [userName,userNameSet]=useState("userName");
    const [isLogged,isLoggedSet]=useState(false);
    let isAdmin = true
    let token = null
    let refreshToken = null
    const {children}=props

    const logIn = async(values) => {
        let response = await logInToServer(values)
        console.log(response.data)
        if(response.data.result === 'loggedIn'){
            isLoggedSet(true)
            token = response.data.token
            refreshToken = response.data.refreshToken
            userNameSet(response.data.name)
            isAdmin = response.data.isAdmin
        }
        return response.data.result
    }

    const logOut=()=>{
        console.log("logout")
        isLoggedSet(false)
    }

    const register = async(data) => {
        let response = await registerToServer(data)
        return response.data.result
    }

    return (
        <UsersContext.Provider value={{logIn:logIn,logOut:logOut,register:register,userName:userName,isLogged:isLogged,isAdmin:isAdmin}}>
            {children}
        </UsersContext.Provider>
    )
}
export default UserContext;