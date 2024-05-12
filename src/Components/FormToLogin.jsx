import React, { useState } from "react";
import { Link } from "react-router-dom";

function FormToLogin() {
  const [formData2, setFormData2] = useState({
    email: "",
    password: "",
  });

  const inputHandler2 = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setFormData2((pervState) => ({ ...pervState, [key]: value }));
    console.log(formData2);
  };

  const onSubmitHandler2 = (e) => {
    e.preventDefault();
    console.log(formData2);
    // axios
    //   .post(
    //     `https://yousef.damas-arch.com/api/register?name=${formData.name}&email=${formData.email}&password=${formData.password}&password_confirmation=${formData.password_confirmation}`
    //   )
    //   .then((data) => console.log(data));
  };
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
