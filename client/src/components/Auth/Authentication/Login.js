import React from "react";

import { Fragment } from "react";
import MainNavigation from "../../../components/Layout/MainNavigation";
import Axios from "axios";
import { useRef, useState } from "react";
// import AuthContext from "../../store/Auth-Context";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passInputRef = useRef();

  //   const AuthCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  ////////////////////////////// SUBMIT HANDLER /////////////////////

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("this is being ran");
    const data = {
      email: emailInputRef.current.value,
      password: passInputRef.current.value,
    };
    // setIsLoading(true);
    console.log(data);
    // let url;
    Axios.post("http://localhost:5000/loginCheck", data)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   if (isLogin) {
  //     url =
  //       "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAMfBsjXY54YNmM5cdrn7pqHyKB2rWitvk";
  //   } else {
  //     url =
  //       "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAMfBsjXY54YNmM5cdrn7pqHyKB2rWitvk";
  //   }
  //   fetch(url, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       email: emailInputValue,
  //       password: passInputValue,
  //       returnSecureToken: true,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       setIsLoading(false);
  //       if (res.ok) {
  //         return res.json();
  //       } else {
  //         return res.json().then((data) => {
  //           let errorMessage = "authentication failed !!";
  //           // if (data && data.error && data.error.message) {
  //           //   errorMessage = data.error.message;
  //           // }
  //           alert(errorMessage);
  //           throw new Error(errorMessage);
  //         });
  //       }
  //     })
  //     .then((data) => {
  //       const expirationTime = new Date(
  //         new Date().getTime() + +data.expiresIn * 1000
  //       );
  //       // AuthCtx.login(data.idToken, expirationTime.toISOString());
  //       console.log(expirationTime);
  //       navigate.replace("/");
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });
  // };
  return (
    <Fragment>
      <MainNavigation />
      <section className="col-md-12 d-flex justify-content-center align-items-center p-5">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input type="password" id="password" required ref={passInputRef} />
          </div>
          <div className={classes.actions}>
            {!isLoading && (
              <button type="submit">
                {isLogin ? "Login" : "Create Account"}
              </button>
            )}
            {isLoading && <h5> data is loading...</h5>}
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </Fragment>
  );
};
export default Login;
