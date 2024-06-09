import axios from 'axios';
import React, { useEffect, useState } from 'react'
import avatar from '../images/user.png'
import Swal from 'sweetalert2';
function AdminProfile() {
        const [userprofile, setuserprofile] = useState([])
        const [usersData, setusersData] = useState([])
        const [loader, setLoader] = useState(false)
        const [loader2, setLoader2] = useState(false)
    
        useEffect(()=>{
            const token = localStorage.getItem('token')
            axios.get('https://yousef.damas-arch.com/api/get-profile', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }).then((data)=>{
                setuserprofile(data.data.message)
                setLoader(true)
    
              })
              axios.get('https://yousef.damas-arch.com/api/get-users', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }).then((data)=>{
                console.log(data.data)
                setusersData(data.data.message)
                setLoader2(true)
    
              })
        },[])
const DeleteUser = (userId)=>{
    console.log(userId)
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
            const token = localStorage.getItem('token')
            axios.delete(`https://yousef.damas-arch.com/api/delete-user?user_id=${userId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }).then((data)=>{
                console.log(data.data)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
              })



          
        }
      });
}
      return (
        <div>
            {
                ((()=>{
                    if(loader){
                        return <>
                        <div className="userInfo-x02">
                            <img src={avatar} alt="" />
                            <h3>{userprofile.name}</h3>
                            <h4>{userprofile.email}</h4>
                            <p>ID : {userprofile.id}</p>
                            <p>Role : {userprofile.role}</p>
                            <span></span>
                            <h3>Users List</h3>
                        </div>
                            <div>
                            <div className="userrow-x02">
                                                        <span>ID</span>
                                                        <span>Name</span>
                                                        <span>Email</span>
                                                        <span>Role</span>
                                                        <span>Delete User</span>
                                                        
                                                    </div>
                            <span className="seppppp-x02"></span>
                                                    
                                {
                                    ((()=>{
                                        if(loader2){
                                            return (
                                                usersData.map((e,i)=>{
                                                    return <>
                                                    <div className="userrow-x02" key={i}>
                                                        <span>{i}</span>
                                                        <span>{e.name}</span>
                                                        <span>{e.email}</span>
                                                        <span>{e.role}</span>
                                                        <button onClick={()=> DeleteUser(e.id)}>Delete</button>
                                                    </div>
                                                    </>
                                                })
                                            )
                                        }
                                    })())
                                }
                            </div>
                        </>
                    }else {
                        return <div>loading...</div>
                    }
                })())
            }
        </div>
      )
    }

export default AdminProfile