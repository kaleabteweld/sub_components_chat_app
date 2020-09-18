import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";

import "./css/chat.css";

function Chat(porps) {
  const output_ref = useRef();
  const typing_ref = useRef();

  const [Main, setMain] = useState([]);
  const [typing, settyping] = useState(undefined);

  useEffect(() => {
    const socket = porps.socket;
    socket.on("msg_chat", (data) => {
      console.log("DATA", data);
      if (data.typeing) {
        settyping(`${data.user_name} is typping...`);
      } else {
        console.log("false", Main);
        var temp = Main;
        temp.push({ user_name: data.user_name, msg: data.msg });
        console.log("false temp", temp);
        setMain(temp);
        settyping(undefined);
      }
    });
  }, []);

  console.log("main", Main);
  return (
    <React.Fragment>
      <h2>Mario Chat</h2>
      <div id="chat-window">
        <div ref={output_ref} id="output">
          {typing != undefined ? <p ref={typing_ref}>{typing}</p> : [""]}
          {Main.map((data) => (
            <p>{`name:[${data.user_name}]:=> ${data.msg}`}</p>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Chat;
