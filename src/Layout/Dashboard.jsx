import { BiMoneyWithdraw, BiSolidPurchaseTag, BiTask } from "react-icons/bi";
import {  FaCalendar, FaEnvelope, FaHome, FaList, FaSearch,  FaTasks, FaUsers,  } from "react-icons/fa";
import { LuHistory } from "react-icons/lu";
import { MdAddTask } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";



const Dashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/users');
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
                {users.map(user => (
                        <div key={user._id}>
                            {user.role === 'worker' && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/Home">
                                            <FaHome></FaHome>
                                            Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/tasklist">
                                            <FaList />
                                            TaskList
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/submission">
                                            <FaList></FaList>
                                            My Submissions
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/withdrow">
                                            <BiMoneyWithdraw />
                                            withdrawals 
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {user.role === 'taskcreator' && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/Home">
                                            <FaHome></FaHome>
                                             Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/addtask">
                                            <BiTask />
                                            Add new Tasks
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/mytask">
                                            <MdAddTask />
                                            My Task’s
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/coin">
                                            <BiSolidPurchaseTag />
                                            Purchase Coin
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/paymentHistory">
                                            <LuHistory />
                                            Payment history
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {user.role === 'admin' && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/Home">
                                            <FaHome></FaHome>
                                            Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/manageuser">
                                            <FaUsers></FaUsers>
                                            Manage Users
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/managetask">
                                            <FaTasks />
                                            Manage Task
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </div>
                    ))}
                    
                        
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