
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import ShareSection from '../../Components/ShareSection';

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


  return (
    <div className="w-3/4 mx-auto">
        <div>
            <ShareSection heading={'Top Worker'} subheading={ ' top Earners'}>

            </ShareSection>
        </div>
      <div className="mt-20">
       
       <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7'>
        {
            topWorker.map(worker=>(<div key={worker._id}>
                {/* <img src={worker.
photoURL} alt="" className='w-[200px] h-[170px] rounded-md' />
<h2>{worker.name}</h2>
<p>Coins: {worker.coin}</p>
                            <h3>Tasks Completed:</h3>
                            <ul>
                                {worker.tasks.map(task => (
                                    <li key={task._id}>{task.task_name} - {task.status}</li>
                                ))}
                            </ul> */}
                            <div className="card  bg-base-100 shadow-xl">
  <figure><img src={worker.photoURL} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">
    Name:{worker.name}
    </h2>
    <h2>Coin:{worker.coin}</h2>
    
    <div>Approved Tasks: {worker.approvedTasks}</div>
    
    
  </div>
</div>
            </div>))
        }
       </div>
      </div>
    </div>
  );
};

export default TopWorkers;
