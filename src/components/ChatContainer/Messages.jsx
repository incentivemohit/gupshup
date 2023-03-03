import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import Message from "./Message";
import { db } from "../../firebase";
import { onSnapshot, doc } from "firebase/firestore";

function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <>
      <div className="messages" style={{ height: "70vh" }}>
        {messages.map((m) => (
          <Message message={m} key={m.id} />
        ))}
      </div>
    </>
  );
}

export default Messages;
