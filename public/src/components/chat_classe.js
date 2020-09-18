import React, { Component } from "react";

export default class Chat extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);

    this.state = {
      data: [],
      typing: false,
    };
  }

  componentDidMount() {
    console.log(this.props);
    const socket = this.props.socket;
    socket.on("msg_chat", (data) => {
      if (data.typeing) {
        this.setState({
          typing: `${data.user_name} is typping...`,
        });
      } else {
        var temp = this.state.data;
        temp.push({ user_name: data.user_name, msg: data.msg });
        this.setState({
          data: temp,
          typing: false,
        });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <h2>Mario Chat</h2>
        <div id="chat-window">
          <div id="output">
            {this.state.typing != false ? <p>{this.state.typing}</p> : [""]}
            {this.state.data.map((data) => (
              <p>{`name:[${data.user_name}]:=> ${data.msg}`}</p>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
