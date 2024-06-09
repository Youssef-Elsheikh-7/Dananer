import axios from 'axios';
import React, { useEffect, useState } from 'react'
import avatar from '../images/user.png'
function UserProfile() {
    const [userprofile, setuserprofile] = useState([])
    const [loader, setLoader] = useState(false)

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
    },[])
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

export default UserProfile