import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./sidebar.css";
import db from "../../Firebase";
import { Link } from "react-router-dom";

const SidebarChat = ({ id, name, addnewchat }) => {
  const [seed, setSeed] = useState("");
  const [ lastmsg , setLastmsg] = useState("")

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));

    db.collection("rooms").doc(id).collection("message").orderBy("timestamp", "desc").onSnapshot(snapshot=>setLastmsg(snapshot.docs.map(doc=>doc.data())))
  }, []);

  const createChat = () => {
    const room = prompt("please Enter Your Room Name");
    if (room) {
      db.collection("rooms").add({
        name: room,
      });
    }
  };
  return !addnewchat ? (
    <Link className="link" to={`/room/${id}`} >
      <div className="sidebar_chat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="user">
          <span>{name}</span>
          <p>{lastmsg[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebar_chat" onClick={createChat}>
      <h3>Add New Room</h3>
    </div>
  );
};

export default SidebarChat;
