import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function FormToSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const inputHandler = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setFormData((pervState) => ({ ...pervState, [key]: value }));
    console.log(formData);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post(
        `https://yousef.damas-arch.com/api/register?name=${formData.name}&email=${formData.email}&password=${formData.password}&password_confirmation=${formData.password_confirmation}`
      )
      .then((data) => {
        if(data.status === 200 || 201){
          navigate("/loginorsignup")
        }
      });
  };

  return (
    <div className="login-x001">
      <div className="container">
        <h3>Sign Up</h3>
        <form onSubmit={onSubmitHandler}>
          <input
            id="name"
            type="text"
            placeholder="Name"
            required
            onChange={inputHandler}
          />
          <input
            id="email"
            type="email"
            placeholder="Email"
            required
            onChange={inputHandler}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            required
            onChange={inputHandler}
          />
          <input
            id="password_confirmation"
            type="password"
            placeholder="Confirm Password"
            required
            onChange={inputHandler}
          />
          <button type="submit">Sign Up</button>
        </form>
        <Link to={"/loginorsignup"}>Do you Have an account! Log In</Link>
      </div>
    </div>
  );
}

export default FormToSignUp;
