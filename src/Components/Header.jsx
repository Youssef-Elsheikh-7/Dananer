import { useEffect, useState } from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import avatar from '../images/user.png'
import axios from "axios";

function Header() {
  const [logIn, setlogIn] = useState(localStorage.getItem('role'));
  return (
    <header className="header" data-header>
      <div className="container">
        <a href="#" className="logo">
          <img src={logo} width="32" height="32" alt="Cryptex logo" />
          Dananyer
        </a>
        {(() => {
          if (logIn === 'empty' || null || undefined) {
            return (
              <Link className="loginbtn" to={"loginorsignup"}>
                LogIn / SignUp
              </Link>
            );
          }  else if(logIn === 'user') {
            return <Link className="userData" to={'/userProfile'}>
              <img src={avatar} alt="" style={{width:'40px',height:'40px'}}/>
            </Link>;

          }else {
            return <Link className="userData" to={'/adminProfile'}>
              <img src={avatar} alt="" style={{width:'40px',height:'40px'}}/>
            </Link>;
          }
        })()}
      </div>
    </header>
  );
}

export default Header;
