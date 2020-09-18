import React, { useState, useRef, useEffect } from "react";
import socketIOClient from "socket.io-client";

import Chat from "./components/chat";
import Chat_class from "./components/chat_classe";
import Msg from "./components/msg";

function App() {
  const ENDPOINT = "http://localhost:1234";
  const [socket, setsocket] = useState(undefined);

  useEffect(() => {
    // socket init
    if (socket == undefined) {
      setsocket(socketIOClient(ENDPOINT));
    }
  });

  if (socket != undefined) {
    return (
      <React.Fragment>
        <Chat_class socket={socket} />
        <Msg socket={socket} />
      </React.Fragment>
    );
  } else {
    return <p>conecting....</p>;
  }
}

export default App;

// <Chat socket={socket} />
