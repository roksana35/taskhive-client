import { Link } from "react-router-dom";


const ForbiddenPage = () => {
    return (
        <div className="relative">
            
        <img className="lg:w-[824px] mx-auto mt-4 rounded-lg  lg:h-[500px] " src="https://i.ibb.co/4MjQs70/2483035-344224-PAVMLX-531.jpg" alt="404"></img>
        <Link to='dashboard'><button className="btn absolute top-14 left-1/2  bg-purple-600 text-white z-10">Go Back DashBoard</button></Link>
    </div>
    );
};

export default ForbiddenPage;