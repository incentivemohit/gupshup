import React, { useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behaviour: "smooth" });
  }, [message]);

  return (
    <>
      <div
        ref={ref}
        className={`message ${
          message.senderId === currentUser.uid && "owner"
        } d-flex my-2`}
      >
        <div
          className="user-chat-image"
          style={{ width: "55px", height: "55px" }}
        >
          <img
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            className="w-100 h-100 rounded-circle"
            alt=""
          />
        </div>
        <div className="userChatInfo mx-3">
          <p className="user-message" style={{ fontSize: "13px" }}>
            {message.text}
          </p>
        </div>
      </div>
    </>
  );
}

export default Message;
