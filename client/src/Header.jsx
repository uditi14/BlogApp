import logo from "./logo.jpg";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContex";

export default function Header() {
  const { setuserinfo, userinfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:5000/profile", {
      credentials: "include",
    })
      .then((response) => {
        response.json().then((userinfo) => {
          setuserinfo(userinfo);
          console.log(userinfo);
        });
      })

      .catch((error) => console.error(error));
  }, []);

  function logout(params) {
    fetch("http://localhost:5000/logout", {
      credentials: "include",
      method: "POST",
    });
    setuserinfo(null);
  }

  const username = userinfo?.name;

  return (
    <header>
      <Link to="/">
        <img src={logo} className="logo"></img>
      </Link>
      <nav>
        {username && (
          <>
            <Link to="create">Create new post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}