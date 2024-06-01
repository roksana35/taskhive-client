import {  Link, NavLink } from "react-router-dom";


const Navbar = () => {
    const navInfo=<>
        <li><a href="https://www.youtube.com/watch?v=3JtjZ8GnG6o" target="_blank" rel="noopener noreferrer" >Watch Demo</a></li>
        <li><NavLink to='/login' className={({isActive})=> isActive? 'text-green-600 font-bold':'font-bold'}>Login</NavLink></li>
        <li><NavLink to='/register' className={({isActive})=> isActive? 'text-green-600 font-bold':'font-bold'}>Register</NavLink></li>
        <li><NavLink to='/dashboard' className={({isActive})=> isActive? 'text-green-600 font-bold':'font-bold'}>Dashboard</NavLink></li>
        <li><NavLink to='/userprofile' className={({isActive})=> isActive? 'text-green-600 font-bold':'font-bold'}>User Profile</NavLink></li>
        
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
    <h1 className="btn btn-ghost text-xl"><Link to='/'>TaskHive</Link></h1>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {navInfo}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
    );
};

export default Navbar;