import { BiMoneyWithdraw,  BiTask } from "react-icons/bi";
import {   FaEnvelope, FaHome, FaList,   FaTasks, FaUsers,  } from "react-icons/fa";
import { LuHistory } from "react-icons/lu";
import { MdAddTask } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import dashboardlogo from "../assets/dashboard.png.png";
import { useEffect, useState } from "react";
import { BsCoin } from "react-icons/bs";



const Dashboard = () => {
    const {user}=useAuth()
    const axiosSecure = useAxiosSecure();
    const [roleData, setRoleData] = useState(null);

    const { data: isRole = [], refetch} = useQuery({
        queryKey: [user?.email,'isRole'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/${user.email}`);
                console.log('Users data:', res.data);  // Debug statement
                return res.data;
            } catch (error) {
                console.error('Error fetching users:', error);  // Debug statement
                throw error;
            }
        }
    });
    useEffect(() => {
        const hUserInfo = async () => {
            try {
                const res = await axiosSecure.get(`/usersinfo/${user.email}`);
                console.log(res.data); // Debug statement
                setRoleData(res.data); // Update state with fetched role data
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        hUserInfo();
    }, [user.email, axiosSecure]);
    if (!roleData) {
        return <div>Loading...</div>; // Show loading state
    }
    
    return (
        <div className="md:px-16">
            {/* logo and userrole uerimage  */}
            <div className="navbar bg-base-200">
  <div className="flex-1">
    <img src={dashboardlogo} className="w-16 h-16 rounded-lg "></img>
  </div>
  <div className="hover:bg-slate-400 p-2 rounded-xl">
  
  <span>{roleData?.role}</span>
      </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
        <BsCoin className="text-2xl" />
          <span className="badge badge-sm indicator-item">{roleData.coin}</span>
        </div>
      </div>
     
     
    </div>
    <div className="dropdown dropdown-end">
      <div  className="btn btn-ghost btn-circle avatar"  title={roleData?.name}>
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={roleData.photoURL} />
        </div>
      </div>
      <button className="btn btn-ghost btn-circle">
      <div className="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
      
    </div>
  </div>
</div>


{/* navigation */}
<div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                
                   {
                    isRole.admin?(
                        <><li>
                        <NavLink to="/dashboard/adminhome">
                            <FaHome></FaHome>
                           Admin  Home</NavLink>
                    </li>
                    <li>
                                    <NavLink to="/dashboard/manageuser">
                                        <FaUsers></FaUsers>
                                        Manage Users</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/managetask">
                                    <FaTasks />
                                        Manage Task
</NavLink>
                                </li>

                    </>
                    ): isRole.taskcreator ? (
                        <>
                            <li>
                                <NavLink to="/dashboard/taskhome">
                                    <FaHome />
                                   TakCreator Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addtask">
                                    <BiTask />
                                    Add New Tasks
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/mytask">
                                    <MdAddTask />
                                    My Tasks
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/coin">
                                    <BiMoneyWithdraw />
                                    Purchase Coin
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/paymentHistory">
                                    <LuHistory />
                                    Payment History
                                </NavLink>
                            </li>
                        </>
                    ) :isRole.worker ? (
                        <>
                            <li>
                                <NavLink to="/dashboard/workerhome">
                                    <FaHome />
                                   Worker Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/tasklist">
                                    <FaList />
                                    Task List
                                </NavLink>
                            </li>
                            
                            <li>
                                <NavLink to="/dashboard/submission">
                                    <FaList />
                                  My Sumission
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/withdraw">
                                <BiMoneyWithdraw />
                                    withdrawals 
                                </NavLink>
                            </li>
                        </>
                    ) : null
                   }
                        
                            
                    
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    
                    <li>
                        <NavLink to="/order/contact">
                            <FaEnvelope></FaEnvelope>
                            Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>

        </div>
        
    );
};

export default Dashboard;