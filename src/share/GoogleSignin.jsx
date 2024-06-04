import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const GoogleSignin = () => {
    const {googleSignIn}=useAuth();
    const axiosPublic=useAxiosPublic();
    const navigate=useNavigate();
    const handleGoogleLogIn=()=>{
        googleSignIn()
        .then(res=>{
            console.log(res.user)
            const socialuserInfo ={
                email:res.user.email,
                name:res.user.displayName,
                photoURL:res.user.
                photoURL,
                role: 'worker' 

            }
            axiosPublic.post('/users',socialuserInfo)
            .then(res=>{
                if(res.data.insertedId){
                    console.log('user added to the database')
                   
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
    })
}

    return (
          <div>
            <div>
            <button onClick={handleGoogleLogIn} className='btn btn-outline'><FaGoogle /> Continue With Google</button>
            </div>
        </div>
    );
};

export default GoogleSignin;