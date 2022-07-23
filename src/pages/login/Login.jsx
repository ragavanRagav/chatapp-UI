import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/serviceCalls";

const clientId =
  "975481281366-3n2for71bc6d3dmuq9171ntt342cnb39.apps.googleusercontent.com";
const Login = () => {
  let navigate = useNavigate();
  const responseSuccGoogle = (response) => {
    login(response?.profileObj?.email).then((res) => {
      if (res?.status) {
        sessionStorage.setItem(
          "userDetails",
          JSON.stringify(response?.profileObj)
        );
        sessionStorage.setItem("loginStat", true);
        navigate("/");
      } else {
        alert("Something went wrong!!! try again");
      }
    });
  };
  const responseErrGoogle = (response) => {
    alert("Login not sucessful!!! Try again...");
    console.log(response);
  };
  return (
    <div>
      <header className="App-header">
        <p>Welcome!!! Please login to continue</p>

        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={responseSuccGoogle}
          onFailure={responseErrGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </header>
    </div>
  );
};

export default Login;
