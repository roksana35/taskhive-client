import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import GoogleSignin from "../../share/GoogleSignin";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Regiser = () => {
    const {signUpUser,updateProfileUser}=useAuth();
    const navigate=useNavigate();
    const axiosPublic =useAxiosPublic();
    
    const {
        register,
        handleSubmit,
        reset,
       
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => {
        console.log(data)
        signUpUser(data.email,data.password)
        .then(result=>{
            const userInfo=result.user;
            console.log(userInfo)
            updateProfileUser(data.name,data.photo)
            .then(()=>{
                console.log('user update successfully')
                const userInfo={
                  name:data.name,
                  email:data.email,
                  role:data.role,
                  photoURL:data.photo
                }
                axiosPublic.post('/users',userInfo)
                .then(res=>{
                  if(res.data.insertedId){
                    console.log('user added to the database')
                    reset();
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'User created successfully.',
                      showConfirmButton: false,
                      timer: 1500
                  });
                  navigate('/');
                  }
                })
              
            }).catch((error) => {
                console.log(error.message);
              });
        }).catch((error) => {
            console.log(error.message);
          });
    }
    //   createuser()

//   console.log(watch("example")) 

    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
            <div className="w-1/2 mr-12">
                <img src="https://i.ibb.co/wwNzd1r/8135212-3835131.jpg" alt="" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <h1 className="text-3xl text-center font-bold">Ragister</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text"  {...register("name", { required: true })} name='name' placeholder="Name" className="input input-bordered" />
                        </div>
                        {errors.name && (
                <span className="text-red-600">This field is required</span>
              )}
                       
                        <div className ="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text"  {...register("email", { required: true })} name='email' placeholder="Email" className="input input-bordered" />
                        </div>
                        {errors.email && (
                <span className="text-red-600">This field is required</span>
              )}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">PhotoURL</span>
                            </label>
                            <input type="text"  {...register("photo", { required: true })} name='photo' placeholder="PhotoURL" className="input input-bordered" />
                        </div>
                        {errors.photo && (
                <span className="text-red-600">This field is required</span>
              )}
              <div className="label">
<span className="label-text">Role</span>
</div>
 <select defaultValue="default" {...register('role', { required: true })}
                              className="select select-bordered w-full">
                                <option disabled value="default">Select a Role</option>
                                 <option value=" worker"> Worker</option>
                                <option value="taskcreator">TaskCreator</option> 
                            </select>
                            {errors.role && (
                <span className="text-red-600">This field is required</span>
              )}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text"  {...register("password", { required: true,minLength: 6,
                            maxLength: 20,
                            pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{6,}$/, })} name='password' placeholder="password" className="input input-bordered" />
                        </div>
                        {errors.password?.type === "required" && (
                <p className="text-red-600">password is required</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  {" "}
                  Password must not exceed 20 characters
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">
                  Password must be at least 6 characters long
                </p>
              )}

              {errors.password?.type === "pattern" && (
                 <p className="text-red-600">
                 Password must include at least one uppercase
                 letter, one lowercase letter, one digit, and one
                 special character
               </p>
             )}
               

                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Register" />
                        </div>

                    </form>
                    <div className='mx-auto'>
                  <p className='my-4 text-center'>New to Car Doctors? <Link className='text-orange-600 font-bold' to="/register">Register</Link> </p>
                  <GoogleSignin ></GoogleSignin>

                  </div>
                 
            </div>
        </div>
    </div>
    </div>
    );
};

export default Regiser;