import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            setTimeout(() => {
              setSuccess(true);
            }, 2000);
            navigate("/login");
          });
        }
      );
    } catch (err) {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 4000);
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
          Oops !! User Already Registered ! Please try again
        </div>
      ) : (
        ""
      )}
      {success ? (
        <div
          class="alert alert-danger text-center position-fixed w-100"
          style={{ zIndex: "1" }}
          role="alert"
        >
          Registration Successfull
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
              placeholder="Enter username..."
            />
            <input
              type="email"
              className="form-control my-1"
              placeholder="Enter Email..."
            />
            <input
              type="password"
              className="form-control my-1"
              placeholder="Enter Password..."
            />
            <input type="file" className="form-control my-1" />

            <div className="d-flex justify-content-between align-items-center mt-2">
              <button className="btn btn-warning">Register</button>
              <span>
                <Link to="/login">Already have an Account?</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
