import {
  AttachFile,
  Attachment,
  EmojiEmotions,
  Logout,
  MicNoneOutlined,
  Search,
  Send,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../Firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "./chat.css";
import {useStateValue} from ".././StateProvider"

const Chat = () => {
  const { roomId } = useParams();
  const [seed, setSeed] = useState("");
  const [ roomName , setRoomName ] = useState("");
  const [ chatmsg , setChatmsg ] = useState([]);
  const [ message , setMessage] = useState('');
  const [{user},dispatch] = useStateValue();

  useEffect(()=>{
    if(roomId){
      db.collection("rooms").doc(roomId).onSnapshot(snapshot =>{
        setRoomName(snapshot.data().name);
      });

      db.collection("rooms").doc(roomId).collection("message").orderBy("timestamp", "asc").onSnapshot(snapshot=>{
        setChatmsg(snapshot.docs.map(doc=>doc.data()))
      })

    }
    setSeed(Math.floor(Math.random() * 5000));
  },[roomId])

  const sendMessage = (e) =>{
    e.preventDefault();
    if(message===""){
      return alert("Please Enter your message")
    }
    db.collection("rooms").doc(roomId).collection("message").add({
      name: user.displayName,
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setMessage("");
  }

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="header_info">
          <span>{roomName}</span>
          <p>
          {
              new Date(chatmsg[chatmsg.length-1]?.timestamp?.seconds*1000).toLocaleTimeString([], {hour:'2-digit' , minute: '2-digit'})
            }
          </p>
        </div>
        <div className="header_right">
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <Attachment />
          </IconButton>
          <IconButton onClick={e=>firebase.auth().signOut()}>
            <Logout/>
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {
          chatmsg.map(msg=>(
            <p className= {`chat_message ${user.displayName==msg.name && 'chat_reciever'}`} key={msg.message} >
            <span className="chat_Name">{msg.name}</span>
            {msg.message}
            <span className="chat_Time"> {
              new Date(msg.timestamp?.seconds*1000).toLocaleTimeString([], {hour:'2-digit' , minute: '2-digit'})
            } </span>
          </p>
          ))
        }
       
       
      </div>
      <div className="chat_footer">
        <IconButton>
          <EmojiEmotions />
        </IconButton>
        <IconButton>
          <AttachFile />
        </IconButton>
        <form onSubmit={sendMessage}>
          <input type="text" placeholder="Type your meassage" value={message}  onChange={e=> setMessage(e.target.value)} />
          <button type="submit"><Send /></button>
        </form>
        <IconButton>
          <MicNoneOutlined />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
