
import { Link } from "react-router-dom";


const Errorpage = () => {
    return (
        <div className="relative">
            
            <img className="lg:w-[824px] mx-auto mt-4 rounded-lg  lg:h-[500px] " src="https://i.ibb.co/VJJK5WB/4934501-2537405.jpg" alt="404"></img>
            <Link to='/'><button className="btn absolute top-14 left-1/2  bg-purple-600 text-white z-10">Go Back Home</button></Link>
        </div>
    );
};

export default Errorpage;