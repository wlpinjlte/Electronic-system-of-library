import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function LogIn(props){
    const {handleSubmit,register,formState: { errors }}=useForm();
    const navigate=useNavigate();
    const submit=(values)=>{
        console.log(values)
    }
    return(
        <div className="LogIn flex justify-center items-center">
            <form className="lg:w-1/3 md:w-1/2 w-3/4 flex justify-center flex-col mt-20 p-5 bg-white rounded text-left" onSubmit={handleSubmit(submit)}>
                <h2 className="self-center">Login Form</h2>
                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form2Example1">Email address</label>
                    <input type="email" id="form2Example1" className="form-control"  {...register("email",{
                        required:{
                        value:true,
                        message:"Pole wymagane"
                        },
                        pattern:{
                            value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message:"Nieprawidłowy email"
                        }
                    })}/>
                    {errors.email&&<p className="text-red-600">{errors.email.message}</p>}
                </div>

                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form2Example2">Password</label>
                    <input type="password" id="form2Example2" className="form-control" {...register("password",{
                        required:{
                            value:true,
                            message:"Pole wymagane"
                        },
                        minLength:{
                            value:8,
                            message:"Minimum 8 znaków"
                        }
                    })}/>
                    {errors.password&&<p className="text-red-600">{errors.password.message}</p>}
                </div>

                <button type="submit" className="w-1/3 bg-sky-500 mb-4 p-2 rounded self-center text-white">Sign in</button>
                <div className="text-center">
                    <p>Not a member? <a href="" onClick={()=>navigate("/register")}>Register</a></p>
                </div>
            </form>
        </div>
    )
}
export default LogIn;