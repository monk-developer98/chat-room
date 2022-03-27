import { Chat, DonutLarge, MoreVert, Search } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./sidebar.css";
import db from "../../Firebase";
import SidebarChat from "./SidebarChat";
import {useStateValue} from ".././StateProvider"


const Sidebar = () => {
  const [{user}, dispatch] = useStateValue()
  const [ rooms , setRooms ] = useState([]);
  useEffect(()=> {
    db.collection("rooms").onSnapshot(snapshot=>{
      setRooms(snapshot.docs.map(doc=>({
          id:doc.id,
          data:doc.data()
      })))
    })
  },[])
  return (
    <div className="sidebar">
      <div className="head">
        <Avatar src={user.photoURL}  />
        <div className="sidebar_right">
          <IconButton>
            <DonutLarge />
          </IconButton>

          <IconButton>
            <Chat />
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
          <div className="search_container">
              <Search />
              <input type="text" placeholder="Search or Start new Chat" />
          </div>
      </div>
      <div className="sidebar_chats">
          <SidebarChat addnewchat />
          {
            rooms.map(room=>{
             return <SidebarChat key={room.id} id={ room.id} name={room.data.name} />
            })
          }
      </div>
    </div>
  );
};

export default Sidebar;
