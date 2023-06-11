import { createContext,useState } from "react"
import { registerToServer } from "../helpers/userApi";
import { logInToServer } from "../helpers/userApi";
export const UsersContext=createContext();

function UserContext(props){
    const [userName,userNameSet]=useState("userName");
    const [isLogged,isLoggedSet]=useState(false);
    const [token, tokenSet]=useState("");
    const [refreshToken, refreshTokenSet]=useState("");
    const [isAdmin, isAdminSet] = useState(false)
    const {children}=props

    const logIn = async(values) => {
        let response = await logInToServer(values)
        console.log(response.data)
        if(response.data.result === 'loggedIn'){
            isLoggedSet(true)
            tokenSet(response.data.token)
            refreshTokenSet(response.data.refreshToken)
            userNameSet(response.data.name)
            isAdminSet(response.data.isAdmin)
            console.log(token)
        }

        console.log(token)
        // console.log(token2)
        return response.data.result
    }

    const logOut=()=>{
        console.log("logout")
        isLoggedSet(false)
        isAdminSet(false)
        tokenSet("")
        refreshTokenSet("")
    }

    const register = async(data) => {
        let response = await registerToServer(data)
        return response.data.result
    }

    return (
        <UsersContext.Provider value={{logIn:logIn,logOut:logOut,register:register,userName:userName,isLogged:isLogged,isAdmin:isAdmin, token:token, refreshToken:refreshToken, tokenSet:tokenSet}}>
            {children}
        </UsersContext.Provider>
    )
}
export default UserContext;