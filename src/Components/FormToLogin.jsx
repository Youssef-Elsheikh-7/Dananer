import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function FormToLogin() {
  const navigate = useNavigate();
  const [formData2, setFormData2] = useState({
    email: "",
    password: "",
  });

  const [loginSaccess,setloginSaccess] = useState(false)
  const [userData,setUserData] = useState([])

  const inputHandler2 = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setFormData2((pervState) => ({ ...pervState, [key]: value }));
    console.log(formData2);
  };

  const onSubmitHandler2 = (e) => {
    e.preventDefault();
    console.log(formData2);
    axios
      .post(
        `https://yousef.damas-arch.com/api/login?email=${formData2.email}&password=${formData2.password}`
      )
      .then((data) => {
        console.log(data)
        if(data.status === 200 || 201){
          localStorage.setItem('token',data.data.data.token)
          localStorage.setItem('role',data.data.data.user.role)
          navigate('/')
        }
        setUserData(data)
        setloginSaccess(true)
      });
  };
  console.log()
  return (
    <div className="login-x001">
      <div className="container">
        <h3>Log In</h3>
        <form onSubmit={onSubmitHandler2}>
          <input
            id="email"
            type="email"
            placeholder="Email"
            required
            onChange={inputHandler2}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            required
            onChange={inputHandler2}
          />
          <button type="submit">Log In</button>
        </form>
        <Link to={"/signup"}>you don't Have an account! Sign Up</Link>
      </div>
    </div>
  );
}

export default FormToLogin;
