import { useState } from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header() {
  const [logIn, setlogIn] = useState(true);
  return (
    <header className="header" data-header>
      <div className="container">
        <a href="#" className="logo">
          <img src={logo} width="32" height="32" alt="Cryptex logo" />
          Dananyer
        </a>
        {(() => {
          if (logIn) {
            return (
              <Link className="loginbtn" to={"loginorsignup"}>
                LogIn / SignUp
              </Link>
            );
          } else {
            return <Link className="userData">useData</Link>;
          }
        })()}
      </div>
    </header>
  );
}

export default Header;
