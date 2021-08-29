import React, { useEffect, useRef, useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import io from "socket.io-client";
import "./Chat.css";
import ScrollableFeed from "react-scrollable-feed";
import cookies from "react-cookies";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
function Chat({ roomID }) {
  const firstName = cookies.load("userName");
  const [state, setState] = useState({
    message: "",
    name: firstName,
  });
  const [chat, setChat] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("https://igotitiam.herokuapp.com");
    socketRef.current.emit("chatRoom", roomID);
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    if (message !== "") {
      socketRef.current.emit("message", { name, message });
      setState({ message: "", name });
    }
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h6>
          <AccountCircleIcon /> {name}:<span className="mySpan">{message}</span>
        </h6>
      </div>
    ));
  };

  return (
    <div className="cardd">
      <div className="render-chat">
        <ScrollableFeed>
          <h1>LTUC Canvas </h1>
          {renderChat()}
        </ScrollableFeed>
      </div>

      <form className="myform" onSubmit={onMessageSubmit} autoComplete="off">
        <button className="roomButton">Send Message</button>

        <div className="rowInput">
          <div className="name-field">
            <TextField
              hidden 
              fullWidth
              name="name"
              // onChange={(e) => onTextChange(e)}
              value={state.name}
              label="Name"
              variant="filled"
            />
          </div>

          <div className="message-field">
            <TextField
              fullWidth
              name="message"
              onChange={(e) => onTextChange(e)}
              value={state.message}
              id="outlined-multiline-static"
              variant="filled"
              label="Message"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Chat;