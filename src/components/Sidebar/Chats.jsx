import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

function Chats() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChat = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChat();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <>
      <div className="chats overflow-auto">
        {Object.entries(chats)?.map((chat) => (
          <ul
            className="list-unstyled connection  p-1"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <li>
              <div className="d-flex align-items-center">
                <div
                  style={{ width: "55px", height: "55px", cursor: "pointer" }}
                >
                  <img
                    src={chat[1].userInfo.photoURL}
                    className="w-100 h-100 rounded-circle"
                    alt=""
                  />
                </div>
                <div className="searchedUserInfo  w-75 mx-3">
                  <span>{chat[1].userInfo.displayName}</span>
                  <p className="w-100 font-weight-light">
                    {chat[1].lastMessage?.text}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
}

export default Chats;
