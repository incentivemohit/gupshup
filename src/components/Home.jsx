import React from "react";
import Chat from "./ChatContainer/Chat";

import Sidebar from "./Sidebar/Sidebar";

function Home() {
  return (
    <>
      <h4 className="text-center bg-success text-white p-2">Gupshup</h4>

      <div className="card m-auto gupshup-container ">
        <div className="content-body d-flex ">
          <div id="sidebar" className="p-2">
            <Sidebar />
          </div>
          <div id="chat-box">
            <Chat />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
