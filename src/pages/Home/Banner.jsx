
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <div  className="md:h-[400px]">
             <Carousel
        autoPlay
        infiniteLoop
        >
                <div className="relative overflow-hidden h-100vh">
                    {/* <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover" src="../../assets/5849636-sd_960_540_30fps.mp4">
                    </video>
                   
                    <div className=" absolute
                    top-52 left-52 z-1 transform -translate-x-1/2 -translate-y-1/2 ">
                <h2>Heading</h2>
                <p>Title</p> */}
                <img src="https://i.ibb.co/cT5ncT9/2148038657.jpg" />
                    <p className="legend">Legend 2</p>
            </div>
            <div>
                    <img src="https://i.ibb.co/cT5ncT9/2148038657.jpg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="https://i.ibb.co/cT5ncT9/2148038657.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
                </div>
                

       
       
    );
};

export default Banner;