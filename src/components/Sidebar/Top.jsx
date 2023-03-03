import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function Top() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <div className="row">
        <div className="col-md-8 d-flex align-items-center">
          <div id="profile" style={{ width: "55px", height: "55px" }}>
            <img
              src={currentUser.photoURL}
              className="w-100 h-100 rounded-circle"
              alt=""
            />
          </div>

          <h6 className="mx-2">{currentUser.displayName}</h6>
        </div>

        <div className="col-md-4 d-flex align-items-center justify-content-end">
          <div className="top-right ">
            <a href="/login">
              <button className="btn btn-warning" onClick={() => signOut(auth)}>
                Logout
              </button>
            </a>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default Top;
