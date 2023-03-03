import React from "react";
import Chats from "./Chats";
import Search from "./Search";
import Top from "./Top";

function Sidebar() {
  return (
    <>
      <Top />
      <Search />
      <Chats />
    </>
  );
}

export default Sidebar;
