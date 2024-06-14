import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

import useAuth from "../../../hooks/useAuth";
import { FaDollarSign } from "react-icons/fa";
import "./submission.css";


const MySubmission = () => {
    const axiosPublic=useAxiosPublic();
    const {user}=useAuth();
    const [submission,setSubmission]=useState([]);
    const [currentPage,setCurrentPage]=useState(0);
    const [itemPerPage,setItemPerPage]=useState(4);
    const [totalSubmissions, setTotalSubmissions] = useState(0);
    const [loading, setLoading] = useState(true);
    // console.log(submission)
    // const itemperPage=4;

    useEffect(()=>{
      setLoading(true);
      if(user?.email){
        axiosPublic.get(`/submission/${user?.email}?&page=${currentPage}&size=${itemPerPage}`)
        .then(res=>{
          if (res.data) {
            setSubmission(res.data.result || []); // Ensure it is an array
            console.log(res.data.result)
            setTotalSubmissions(res.data.totalSubmissions || 0);}
         setLoading(false)
         

        })

      }
       
    },[axiosPublic,user?.email,currentPage,itemPerPage])


    const numberOfPages = Math.ceil(totalSubmissions / itemPerPage);
  const pages = [...Array(numberOfPages).keys()];
  console.log(pages)

    const handleItemsPerPages=e=>{
      const value=parseInt(e.target.value);
      console.log(value)
      setItemPerPage(value);
      setCurrentPage(0)
    }
    const handlePreviousPage=()=>{
      if(currentPage>0){
        setCurrentPage(currentPage-1)
      }
    }
    const handleNextPage=()=>{
      if(currentPage<pages.length -1){
        setCurrentPage(currentPage+1)
      }
    }
    
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
        <div className="overflow-x-auto">
          <h2>{submission?.length}</h2>
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          #
        </th>
        
        <th>Image</th>
        <th>Name</th>
        <th>Creator_Email</th>
        <th>Creator_Name</th>
        <th>Payable_Amount</th>
        <th>Status</th>

      </tr>
    </thead>
    <tbody>
     {
        submission.map((sub,index)=>(
            <tr key={sub._id}>
              <td>{index+1}</td>
              
        
            <td>
            
                <div className="avatar">
                  <div className="mask mask-squircle w-16 h-16">
                    <img src={sub.task_img_url} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                
              
            </td>
            <td>{sub.task_title}</td>
            
            <td>{sub.creator_email}</td>
            <td >{sub.creator_name}</td>
            <td>
                                <div className="text-xl flex items-center text-green-500">
                                    <FaDollarSign />
                                    {sub.payable_amount}
                                </div>
                            </td>
            <td className="badge badge-secondary mt-8">{sub.status}</td>
            {/* <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th> */}
          </tr>
        ))
     }
      
    </tbody>
    
  </table>
  <div className="text-center mb-10 pagination">
    <h2>currentPage:{currentPage + 1}</h2>
    <button className="btn" onClick={handlePreviousPage}>Previous</button>
    {
      pages.map(page=><button  key={page} onClick={()=>setCurrentPage(page)} className={currentPage === page ? 'selected':''}>{page+1}</button>)
    }
      <button className="btn" onClick={handleNextPage}>Next</button>
    
    <select value={itemPerPage} onChange={handleItemsPerPages} name="" id="">
      <option value="2">3</option>
      <option value="4">4</option>
      <option value="6">6</option>
    </select>
  

  </div>
</div>
    );
};

export default MySubmission;