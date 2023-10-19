import React, { useState } from "react";
import "./Login.css";
import { LoginApi } from "../../Api/Api";
import { useForm } from "../../utils/useForm";
import { Link, useNavigate } from "react-router-dom";
import goole from "../../utils/google.webp";

function navigate(url) {
  window.location.href = url;
}

async function auth() {
  const resp = await fetch(`${process.env.REACT_APP_GURL}/Gauth`, {
    method: "post",
  });
  const data = await resp.json();
  navigate(data.url);
}

function Login() {
  const [errMsg, setErrMsg] = useState("");
  const Navigatorr = useNavigate();
  const [value, setValues] = useForm({
    email: "",
    password: "",
  });
  const Submit = async () => {
    if (value.email.trim() && value.password.trim()) {
      setErrMsg("");
      const data = await LoginApi(value.email, value.password);

      if (data?.success) {
        Navigatorr("/home");
      }
    } else {
      setErrMsg("Fill the form properly");
    }
  };
  return (
    <div>
      <div className="container">
        <div className="form">
          <div className="elements">
            <div className="header">Log In</div>
            <p
              style={{
                textAlign: "center",
                color: "red",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              {errMsg}
            </p>
            <input
              type="email"
              value={value.email}
              onChange={setValues}
              className="element2"
              placeholder="Enter Your email"
              name="email"
              minLength={3}
              maxLength={50}
              required={true}
            />
            <br />
            <input
              type="password"
              value={value.password}
              onChange={setValues}
              className="element3"
              placeholder="Enter New password"
              name="password"
              minLength={3}
              maxLength={50}
              required={true}
            />
            <br />
            <button type="button" onClick={Submit} placeholder="Submit">
              Login
            </button>
            <div className="or">
              <h4>OR</h4>
            </div>
            <div className="signUp-bottom">
              <button
                onClick={() => auth()}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  fontWeight: "100px",
                }}
              >
                <img
                  src={goole}
                  alt="no icon"
                  style={{
                    width: "25px",
                    height: "20px",
                  }}
                />
                Continue with google
              </button>
              <Link to={"/signup"}>
                {" "}
                <p>Create an account?</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
