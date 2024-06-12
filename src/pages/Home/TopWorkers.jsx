
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const TopWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const axiosPublic=useAxiosPublic();

//   useEffect(() => {
//     fetch('/top-workers')
//       .then(response => response.json())
//       .then(data => setWorkers(data))
//       .catch(error => console.error('Error fetching top workers:', error));
//   }, []);
const {data:topWorker=[],refetch}=useQuery({
    queryKey:['topworker'],
    queryFn:async()=>{
        const result= await axiosPublic.get('/top-workers')
        // console.log(result.data)
        return result.data;
    }
})
console.log(topWorker)
//   const settings = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     speed: 5000,
//     autoplaySpeed: 4000,
//     cssEase: 'linear',
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1, infinite: true, dots: true } },
//       { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1, initialSlide: 2 } },
//       { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
//     ]
//   };

  return (
    <div className="w-3/4 mx-auto">
      <div className="mt-20">
       <h2>Topworkers:{topWorker.length}</h2>
      </div>
    </div>
  );
};

export default TopWorkers;
