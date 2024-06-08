import { BiMoneyWithdraw, BiTask } from "react-icons/bi";
import { FaEnvelope, FaHome, FaList, FaTasks, FaUsers } from "react-icons/fa";
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
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [roleData, setRoleData] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { data: isRole = [], refetch } = useQuery({
    queryKey: [user?.email, "isRole"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        console.log("Users data:", res.data); // Debug statement
        return res.data;
      } catch (error) {
        console.error("Error fetching users:", error); // Debug statement
        throw error;
      }
    },
  });

  useEffect(() => {
    const hUserInfo = async () => {
      try {
        const res = await axiosSecure.get(`/usersinfo/${user.email}`);
        console.log(res.data); // Debug statement
        setRoleData(res.data); // Update state with fetched role data
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    hUserInfo();
  }, [user.email, axiosSecure]);

  if (!roleData) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="max-w-screen-xl md:py-5">
      {/* Navbar */}
      <div className="navbar bg-base-200  flex justify-between items-center fixed top-0 max-w-screen-xl z-50">
        <div className="flex items-center">
          <img src={dashboardlogo} className="w-16 h-16 rounded-lg" alt="Dashboard Logo" />
          
        </div>
       
       
        <div className="flex items-center">
        <div>
                <span className="">{roleData?.role}</span>
                </div>
          <div className="dropdown dropdown-end">
           
          
          
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
                <BsCoin className="text-2xl" />
                <span className="badge badge-sm indicator-item">{roleData.coin}</span>
              </div>
              
            </div>
          </div>
          <div className="dropdown dropdown-end">
         
            <div className="btn btn-ghost btn-circle avatar" title={roleData?.name}>
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={roleData.photoURL} />
              </div>
            </div>
          </div>
          <button
            className="btn btn-ghost btn-circle md:hidden"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <div
          className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 transform ${
            isNavOpen ? "translate-x-0" : "-translate-x-full"
          } md:static md:translate-x-0 transition-transform duration-300 ease-in-out md:w-64`}
          onClick={() => setIsNavOpen(false)}
        >
          <div className="w-64 min-h-screen mt-16 md:mt-0 bg-orange-400 p-4" onClick={(e) => e.stopPropagation()}>
            <ul className="menu">
              {isRole.admin ? (
                <>
                  <li>
                    <NavLink to="/dashboard/adminhome">
                      <FaHome /> Admin Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manageuser">
                      <FaUsers /> Manage Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/managetask">
                      <FaTasks /> Manage Task
                    </NavLink>
                  </li>
                </>
              ) : isRole.taskcreator ? (
                <>
                  <li>
                    <NavLink to="/dashboard/taskhome">
                      <FaHome /> TaskCreator Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/addtask">
                      <BiTask /> Add New Tasks
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/mytask">
                      <MdAddTask /> My Tasks
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/coin">
                      <BiMoneyWithdraw /> Purchase Coin
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/paymentHistory">
                      <LuHistory /> Payment History
                    </NavLink>
                  </li>
                </>
              ) : isRole.worker ? (
                <>
                  <li>
                    <NavLink to="/dashboard/workerhome">
                      <FaHome /> Worker Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/tasklist">
                      <FaList /> Task List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/submission">
                      <FaList /> My Submission
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/withdraw">
                      <BiMoneyWithdraw /> Withdrawals
                    </NavLink>
                  </li>
                </>
              ) : null}

              {/* Shared Nav Links */}
              <div className="divider"></div>
              <li>
                <NavLink to="/">
                  <FaHome /> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/order/contact">
                  <FaEnvelope /> Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 max-w-screen-lg overflow-auto sm:relative sm:z-10">
          <div className="overflow-x-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
