import React, { useState } from "react";
import "./Signup.css";
import { useForm } from "../../utils/useForm";
import { SignupApi } from "../../Api/Api";
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

function Signup() {
  const Navigator = useNavigate();
  const [errMsg, setErrMsg] = useState({});
  const [value, setValues] = useForm({
    name: "",
    email: "",
    password: "",
  });
  const Submit = async () => {
    if (value.name.trim() && value.email.trim() && value.password.trim()) {
      setErrMsg("");
      const data = await SignupApi(
        value.email.toLowerCase(),
        value.name.toLowerCase(),
        value.password
      );
      if (data.success) {
        setErrMsg({ status: true, msg: "User Created successfully" });

        setTimeout(() => {
          Navigator("/login");
        }, 1500);
      } else {
        setErrMsg({ status: false, msg: "Try again" });
      }
    } else {
      setErrMsg({ status: false, msg: "Fill the form properly" });
    }
  };
  return (
    <div>
      <div className="container">
        <div className="form">
          <div className="elements">
            <div className="header">Sign Up</div>
            <p
              style={{
                textAlign: "center",
                color: errMsg.status === true ? "green" : "red",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              {errMsg.msg}
            </p>
            <input
              type="text"
              value={value.name}
              onChange={setValues}
              className="element1"
              placeholder="Enter full Name"
              name="name"
              minLength={3}
              maxLength={50}
              required={true}
            />
            <br />
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
              Signup
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
                Signup with google
              </button>
              <Link to={"/login"}>
                {" "}
                <p>Already have an account?</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;
