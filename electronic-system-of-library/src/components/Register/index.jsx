import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UsersContext } from "../../contexts/User.context"
import { useNavigate } from "react-router-dom";

function Register(){
    const {handleSubmit,register,formState: { errors },watch}=useForm();
    const {register: signUp} = useContext(UsersContext)
    const navigate = useNavigate()

    const submit = async(values)=>{
        let result = await signUp(values)
        console.log(result)
        if(result === 'registered'){
            navigate('/login')
        }
    }
    return(
        <div className="Register flex justify-center items-center">
            <form className="lg:w-1/3 md:w-1/2 w-3/4 flex justify-center flex-col mt-20 p-5 bg-white rounded text-left" onSubmit={handleSubmit(submit)}>
                <h2 className="self-center">Register Form</h2>
                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form2Example1">Name</label>
                    <input type="name" id="form2Example1" className="form-control"  {...register("name",{
                        required:{
                            value:true,
                            message:"Pole wymagane"
                        },
                    })}/>
                    {errors.name&&<p className="text-red-600">{errors.name.message}</p>}
                </div>

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

                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form2Example2">Repeat Password</label>
                    <input type="password" id="form2Example2" className="form-control" {...register("repeatPassword",{
                        required:{
                            value:true,
                            message:"Pole wymagane"
                        },
                        minLength:{
                            value:8,
                            message:"Minimum 8 znaków"
                        },
                        validate: (val) => {
                            if (watch('password') != val) {
                              return "Your passwords do no match";
                            }
                          }
                    })}/>
                    {errors.repeatPassword&&<p className="text-red-600">{errors.repeatPassword.message}</p>}
                </div>

                <button type="submit" className="w-1/3 bg-sky-500 mt-2 p-2 rounded self-center text-white">Sign up</button>
            </form>
        </div>
    )
}
export default Register;