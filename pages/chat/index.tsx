import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Chat.module.scss";
import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io";

let socket: any;
type SocketMessage = {
  username: string;
  message: string;
};

socket = io();

(async () => {
  await fetch("/api/socket");

  socket.on("connect", () => {
    console.log("connected");
  });
})();

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<SocketMessage[]>();

  useEffect(() => {
    socket.on("chat-message", (data: SocketMessage) => {
      if (data.username === localStorage.getItem("username")) return;
      setMessages((prev) => [...(!prev ? [] : [...prev]), data]);
    });

    return () => {
      socket.off("chat-message");
    };
  }, []);

  const sendMessage = () => {
    if (!message) return;
    const username = localStorage.getItem("username") || "";
    const data: SocketMessage = { username, message };
    setMessage("");

    setMessages((prev) => [...(prev || []), data]);
    setMessage("");
    socket.emit("message", data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatBox}>
        {messages?.map((message, index) => (
          <div key={index} className={styles.message}>
            <span className={styles.name}>{message.username}</span>
            <span className={styles.content}>{message.message}</span>
          </div>
        ))}
      </div>
      <div className={styles.textContainer}>
        <Input placeholder="Let's chat" value={message} setValue={setMessage} />
        <Button
          label={"Send"}
          className={styles.buttonContainer}
          onClick={sendMessage}
        />
      </div>
    </div>
  );
}
