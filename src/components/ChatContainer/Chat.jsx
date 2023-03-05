import React from "react";
import { useContext } from "react";
import { ChatContext } from "../Context/ChatContext";
import Input from "./Input";
import Messages from "./Messages";

function Chat() {
  const { data } = useContext(ChatContext);

  return (
    <>
      <div className="chat-box ">
        <div className="chat-user-info d-flex align-items-center bg-white p-2">
          <div style={{ width: "55px", height: "55px", cursor: "pointer" }}>
            <img
              src={data.user ? data.user.photoURL : ""}
              className={`w-100 h-100 rounded-circle`}
              alt=""
            />
          </div>
          <div className="searchedUserInfo  w-75 mx-3">
            <span>{data.user ? data.user.displayName : ""}</span>
          </div>
        </div>

        <Messages />
        <Input />
      </div>
    </>
  );
}

export default Chat;
