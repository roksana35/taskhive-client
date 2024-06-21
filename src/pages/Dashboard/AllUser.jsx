import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrashAlt,  } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";



const AllUser = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedRoles, setSelectedRoles] = useState(null);
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/users');
                // console.log('Users data:', res.data);  // Debug statement
                return res.data;
            } catch (error) {
                console.error('Error fetching users:', error);  // Debug statement
                throw error;
            }
        }
    });
  //   const handleRoleChange = (userId, role) => {
  //     setSelectedRoles((prevRoles) => ({
  //         ...prevRoles,
  //         [userId]: role,
  //     }));
  // };
  const handleRoleChange = (userId, role) => {
    setSelectedRoles((prevRoles) => ({
        ...prevRoles,
        [userId]: role,
    }));
}
 
     
    const handleMakeAdmin=user=>{
      const newRole = selectedRoles[user._id];
      // console.log(newRole)
      

        axiosSecure.patch(`/users/admins/${user._id}`,{ role: newRole })
        .then(res=>{
          // console.log(res.data)
          if(res.data.modifiedCount>0){
            refetch()
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} is an updated role now`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
    }


    const handleDelete=user=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                .then(res=>{
                    if(res.data.deletedCount>0){
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
                })


              
            }
          });
    }

    return (
        <div >
            <div className="flex justify-evenly">
                <h2>All Users</h2>
                <h2>Total Users:{users.length}</h2>
            </div>
            <div className="overflow-x-auto mt-3 lg:mt-8">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Image</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {
            users.map((user,index)=><tr key={user._id}>
            <th>{index+1}</th>
            <td><div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={user.photoURL} alt="Avatar Tailwind CSS Component" />
              </div>
            </div></td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <select name="role" id="role" 
              defaultValue={user.role}
              onChange={(e) => handleRoleChange(user._id, e.target.value)}
               className="select select-bordered  max-w-xs">
              <option value="">{user.role} 
           </option>
                <option value="admin">Admin</option>
                <option value="taskcreator">taskcreator</option>
              </select>
              <input onClick={()=>handleMakeAdmin(user)} className="md:ml-2 btn btn-ghost" type="submit" value="update" />
           
            </td>
            <td>
            <button onClick={()=>handleDelete(user)}  className="btn btn-ghost btn-lg"><FaTrashAlt className="text-red-600"/></button>
            </td>
          </tr>)
        }
      {/* row 1 */}
      

    </tbody>
  </table>
</div>
            
        </div>
    );
};

export default AllUser;