import {  Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.png.png";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure"
import { useEffect, useState } from "react";
import { BsCoin } from "react-icons/bs";


const Navbar = () => {
  const {user,logOut}=useAuth();
  const [roleData, setRoleData] = useState(null);
    const axiosSecure=useAxiosSecure()
  


//   const {data:userData,refetch}=useQuery({
//     queryKey:['user',user?.email],
//     queryFn:async()=>{
//         const result= await axiosSecure.get(`/user/${user.email}`)
//         // console.log(result.data)
//         return result.data;
//     }
// })

// useEffect(() => {
//   const hUserInfo = async () => {
//     try {
//       const res = await axiosSecure.get(`/usersinfo/${user.email}`);
//       // console.log(res.data); // Debug statement
//       setRoleData(res.data); // Update state with fetched role data
//     } catch (error) {
//       // console.error("Error fetching user info:", error);
//     }
//   };

//   hUserInfo();
// }, [user.email, axiosSecure]);
const { data: userData, refetch, isLoading, isError } = useQuery({
  queryKey: ['user', user?.email],
  queryFn: async () => {
    if (user?.email) {
      const result = await axiosSecure.get(`/user/${user.email}`);
      return result.data;
    }
    return null;
  },
  enabled: !!user?.email, // Only run the query if user email exists
});
console.log(userData)
useEffect(() => {
  const hUserInfo = async () => {
    if (user?.email) {
      try {
        const res = await axiosSecure.get(`/usersinfo/${user.email}`);
        setRoleData(res.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
  };

  hUserInfo();
}, [user?.email, axiosSecure]);
console.log(userData)
  const handlelogOut=()=>{
    logOut()
    
  }

    const navInfo=<>
    {
      user?<div className="flex justify-evenly items-center">
      
      <li><NavLink to='/dashboard' className={({isActive})=> isActive? 'text-green-600 font-bold':'font-bold'}>Dashboard</NavLink></li>
      <li><NavLink to='/coin' className={({isActive})=> isActive? 'text-green-600 font-bold':'font-bold'}><button className=" btn ">
            <BsCoin className="ml-2 text-xl"/> 
            <div className="badge badge-secondary">{roleData?.coin}</div>
          </button></NavLink></li>
          <li><NavLink to='/userprofile' className={({isActive})=> isActive? 'text-green-600 font-bold':'font-bold'}><img src={roleData?.photoURL} className="w-12 h-12 rounded-full"></img></NavLink></li>
      
      </div>
      :
      <>
      <li><a href="https://www.youtube.com/watch?v=3JtjZ8GnG6o" target="_blank" rel="noopener noreferrer" >Watch Demo</a></li>
      <li><NavLink to='/login' className={({isActive})=> isActive? 'text-green-600 font-bold':'font-bold'}>Login</NavLink></li>
        <li><NavLink to='/register' className={({isActive})=> isActive? 'text-green-600 font-bold':'font-bold'}>Register</NavLink></li>
      </>
    }
        
        
        
        
       
        
    </>
    return (
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {navInfo}
      </ul>
    </div>
    <Link to='/' className="btn btn-ghost  gap-0 md:inline-block lg:text-2xl font-lato hidden sm:inline-block"><span><img src={logo} className="w-[40px] h-[40px] md:w-[70px] md:h-[60px] mr-0 rounded-md mt-0 " alt="" /></span></Link>
    <p className="lg:text-3xl  font-bold"><span className="bg-gradient-to-r from-orange-800 to-purple-800 text-transparent bg-clip-text font-extrabold">TakHive</span></p>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {navInfo}
    </ul>
  </div>
  <div className="navbar-end">
    {
      user?
       
      
      <a onClick={handlelogOut} className="btn">LogOut</a>
      
      :<></>
    }
    
  </div>
</div>
    );
};

export default Navbar;