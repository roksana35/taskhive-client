import Banner from "./Banner";
import ExtraSeasion from "./ExtraSeasion";
import Feature from "./Feature";
import TopWorkers from "./TopWorkers";
import WorkSetion from "./WorkSetion";


const Home = () => {
    return (
     <div>
        <Banner></Banner>
        <Feature></Feature>
        <WorkSetion></WorkSetion>
        <TopWorkers></TopWorkers>
        <ExtraSeasion></ExtraSeasion>

     </div>
           
    );
};

export default Home;