import { BiMoneyWithdraw, BiSolidPurchaseTag, BiTask } from "react-icons/bi";
import {  FaCalendar, FaEnvelope, FaHome, FaList, FaSearch,  FaTasks, FaUsers,  } from "react-icons/fa";
import { LuHistory } from "react-icons/lu";
import { MdAddTask } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";



const Dashboard = () => {
    const {user}=useAuth()
    const axiosSecure = useAxiosSecure();
    const { data: isRole = [], refetch } = useQuery({
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
    
    return (
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
                        
                            {/* <li>
                                <NavLink to="/dashboard/Home">
                                    <FaHome></FaHome>
                                     Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/tasklist">
                                <FaList />
                                    TaskList</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/submission">
                                    <FaList></FaList>
                                    My Submissions</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/withdrow">
                                <BiMoneyWithdraw />
                                    withdrawals </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addtask">
                                <BiTask />
                                    Add new Tasks</NavLink>
                            </li>
                        
                            
                            
                                <li>
                                    <NavLink to="/dashboard/mytask">
                                    <MdAddTask />
                                        My Task’s</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/coin">
                                    <BiSolidPurchaseTag />
                                        Purchase Coin</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/paymentHistory">
                                    <LuHistory />
                                        Payment history</NavLink>
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
                                </li> */}
                            
                    
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                            <FaSearch></FaSearch>
                            Menu</NavLink>
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
    );
};

export default Dashboard;