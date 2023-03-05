import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Login() {
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      navigate("/");
    } catch (err) {
      setErr(err);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
  };

  return (
    <>
      {err ? (
        <div
          class="alert alert-danger text-center position-fixed w-100"
          style={{ zIndex: "1" }}
          role="alert"
        >
          User doesn't exists!!
        </div>
      ) : (
        ""
      )}
      <div
        style={{ height: "100vh" }}
        className="container-fluid  d-flex justify-content-center  align-items-center vh-100 bg-dark"
      >
        <div className="card" style={{ width: "400px" }}>
          <form onSubmit={handleSubmit} className="form-group card-body">
            <h3 className="text-center">Whatsapp</h3>
            <input
              type="text"
              className="form-control my-1"
              placeholder="Enter Email..."
            />
            <input
              type="text"
              className="form-control my-1"
              placeholder="Enter Password..."
            />

            <div className="d-flex justify-content-between align-items-center mt-2">
              <button className="btn btn-warning">Login</button>
              <span>
                <Link to="/register">Don't have an Account?</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
