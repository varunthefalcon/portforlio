import { useEffect, useState } from "react";
import { Button, Form, Icon, Input } from "semantic-ui-react";
import axios from "axios";
import { URL_USER_CHAT } from "../utils/constants";
import ReactMardown from "react-markdown";

const ChatBox = (props) => {
  const { fileID = "" } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [messageInp, setMessageInp] = useState("");
  const [chatAPILoading, setChatAPILoading] = useState(false);
  const [chat, setChat] = useState([]);

  const toggle = () => setIsOpen((flag) => !flag);

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: URL_USER_CHAT,
        method: "POST",
        data: {
          role: "user",
          message: messageInp,
          fileID,
        },
      };

      setChat((chat) => [{ role: "user", message: messageInp }, ...chat]);
      setMessageInp("");
      setChatAPILoading(true);

      const resp = await axios(config);
      setChat((chat) => [
        { role: "bot", message: resp.data.respMessage },
        ...chat,
      ]);

      console.log(resp);
    } catch (error) {
      console.error(error);
    } finally {
      setChatAPILoading(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      {isOpen && (
        <div className="chat_window_wrapper">
          <div
            onClick={toggle}
            style={{
              backgroundColor: "#a2d4ff",
              padding: "5px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>AI assistant</span>
            <Icon name="window minimize outline" />
          </div>
          <div
            style={{
              height: "400px",
              width: "350px",
              padding: "5px",
              display: "flex",
              flexDirection: "column-reverse",
              overflow: "auto",
            }}
          >
            {chat.map((e) => (
              <ChatComponent {...e} />
            ))}
          </div>
          {chatAPILoading && <small>Thinking...</small>}
          <div>
            <Form onSubmit={handleSend}>
              <Input fluid>
                <input
                  onChange={(e) => setMessageInp(e.target.value)}
                  value={messageInp}
                  disabled={chatAPILoading}
                  placeholder="Search..."
                />
                <Button>
                  <Icon style={{ margin: 0 }} name="send" />
                </Button>
              </Input>
            </Form>
          </div>
        </div>
      )}
      {!isOpen && (
        <div onClick={toggle} className="chat_icon_wrapper">
          <Icon name="user" className="chat_icon" color="red" />
        </div>
      )}
    </>
  );
};

export default ChatBox;

const ChatComponent = (props) => {
  const { role = "", message = "" } = props;

  return (
    <div
      style={{
        textAlign: role == "user" ? "right" : "left",
      }}
    >
      <small>{role}</small>
      <br />
      <p
        style={{
          backgroundColor: role == "user" ? "lightblue" : "silver",
          borderRadius: "5px",
          display: "inline-block",
          padding: "5px 15px",
        }}
      >
        <ReactMardown>{message}</ReactMardown>
      </p>
    </div>
  );
};
