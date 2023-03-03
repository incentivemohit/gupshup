import React from "react";
import { useState } from "react";
import {
  collection,
  query,
  where,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(err);
    }
  };

  const handlekey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check group exists or not

    console.log(user.uid);

    console.log(currentUser.uid);
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log(res);
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }

      //create user chats
    } catch (err) {}
    setErr(err);
    setUsername("");
    setUser(null);
  };

  return (
    <>
      <input
        type="text"
        value={username}
        className="border-0 shadow-none p-2 mb-2"
        style={{ width: "100%", height: "40px" }}
        placeholder="Find a user..."
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handlekey}
      />
      {err && <span>User not found!!</span>}
      {user && (
        <div
          className="searchedUserImage d-flex align-items-center "
          style={{ width: "55px", height: "55px", cursor: "pointer" }}
          onClick={handleSelect}
        >
          <img
            src={user.photoURL}
            className="w-100 h-100 rounded-circle"
            alt=""
          />
          <div className="searchedUserName mx-3">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}

      <hr />
    </>
  );
}

export default Search;
