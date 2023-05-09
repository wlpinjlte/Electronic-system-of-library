import { createContext,useEffect,useState } from "react"

export const UsersContext=createContext();
function UserContext(props){
    const [userName,userNameSet]=useState("userName");
    const [isLogged,isLoggedSet]=useState(false);
    const isAdmin=true
    const {children}=props
    const logIn=(userId,password)=>{
        console.log(userId,password);
        isLoggedSet(true)
    }
    const logOut=()=>{
        console.log("logout")
        isLoggedSet(false)
    }
    const signIn=(userId,password)=>{

    }
    return (
        <UsersContext.Provider value={{logIn:logIn,logOut:logOut,signIn:signIn,userName:userName,isLogged:isLogged,isAdmin:isAdmin}}>
            {children}
        </UsersContext.Provider>
    )
}
export default UserContext;