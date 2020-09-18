import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";

import "./css/msg.css";
function Msg(porps) {
  const handle_ref = useRef();
  const message_ref = useRef();
  const send_ref = useRef();

  const socket = porps.socket;

  const [handle, sethandle] = useState("");
  const [message, setmessage] = useState("");

  var Input = (event) => {
    let target = $(event.target);
    if ($(target).attr("name") == "Handle") {
      sethandle($(target).val());
    }
    if ($(target).attr("name") == "Message") {
      socket.emit("typeing", { user_name: handle, msg: " " });
      setmessage($(target).val());
    }
  };
  var send = () => {
    socket.emit("msg_chat", {
      msg: $(message_ref.current).val(),
      user_name: $(handle_ref.current).val(),
    });
  };
  return (
    <React.Fragment>
      <input
        id="handle"
        ref={handle_ref}
        value={handle}
        onChange={Input}
        name="Handle"
        type="text"
        placeholder="Handle"
      />
      <input
        id="message"
        ref={message_ref}
        value={message}
        onChange={Input}
        name="Message"
        type="text"
        placeholder="Message"
      />
      <button id="send" onClick={send} ref={send_ref}>
        Send
      </button>
    </React.Fragment>
  );
}

export default Msg;
