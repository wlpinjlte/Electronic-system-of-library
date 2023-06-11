import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { UsersContext } from "../../contexts/User.context"
import { useNavigate } from "react-router-dom";

function Register(){
    const {handleSubmit,register,formState: { errors },watch}=useForm();
    const {register: signUp} = useContext(UsersContext)
    const [error, errorSet] = useState(false)
    const navigate = useNavigate()

    const submit = async(values)=>{
        let result = await signUp(values)
        // console.log(values)
        console.log(result)
        if(result === 'registered'){
            navigate('/login')
        }
        else if(result === 'email'){
            errorSet(true)
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
                    {error&&!errors.email&& <p className="text-red-600">Ten adres jest już zajęty</p>}
                </div>

                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form2Example1">Place</label>
                    <input type="place" id="form2Example1" className="form-control"  {...register("place",{
                        required:{
                            value:true,
                            message:"Pole wymagane"
                        },
                        pattern:{
                            value:/^[A-Z][a-z]+$/,
                            message:"Nieprawidłowa nazwa miejscowości"
                        }
                    })}/>
                    {errors.place&&<p className="text-red-600">{errors.place.message}</p>}
                </div>

                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form2Example1">Street</label>
                    <input type="street" id="form2Example1" className="form-control"  {...register("street",{
                        required:{
                            value:true,
                            message:"Pole wymagane"
                        },
                        pattern:{
                            value:/^[A-Z][a-z]+$/,
                            message:"Nieprawidłowa nazwa ulicy"
                        }
                    })}/>
                    {errors.street&&<p className="text-red-600">{errors.street.message}</p>}
                </div>

                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form2Example1">Home number</label>
                    <input type="home-number" id="form2Example1" className="form-control"  {...register("number",{
                        required:{
                            value:true,
                            message:"Pole wymagane"
                        },
                        pattern:{
                            value:/^[1-9]+[A-Z]*$/,
                            message:"Nieprawidłowy numer mieszkania"
                        }
                    })}/>
                    {errors.number&&<p className="text-red-600">{errors.number.message}</p>}
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
                            if (watch('password') !== val) {
                              return "Your passwords do no match";
                            }
                          }
                    })}/>
                    {errors.repeatPassword&&<p className="text-red-600">{errors.repeatPassword.message}</p>}
                </div>

                <button type="submit" className="w-1/3 bg-sky-500 mt-2 p-2 rounded self-center text-white hover:bg-sky-400">Sign up</button>
            </form>
        </div>
    )
}
export default Register;