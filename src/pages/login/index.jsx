import React from "react";
import "./index.css";

import LoginFrom from "../../components/loginForm/Index";

export default function Login(props) {

  const login = () => {
    props.history.push('/index/')
  }

  return (
    <div className="bgc">
      <div className="login">
        <LoginFrom login={login}/>
      </div>
    </div>
  );
}
