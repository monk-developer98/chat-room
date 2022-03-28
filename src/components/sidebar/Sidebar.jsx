import { Chat, DonutLarge, MenuOutlined,MoreVert, CloseOutlined, Search } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./sidebar.css";
import db from "../../Firebase";
import SidebarChat from "./SidebarChat";
import {useStateValue} from ".././StateProvider"


const Sidebar = ({toggle,TOGGLER}) => {
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
  console.log('toggle',toggle);
  return (
    <div className={toggle?"sidebar sidebar_Active":"sidebar"}>
      <div className="head">
        <Avatar src={user.photoURL}  />
        <div className="sidebar_right">
          <IconButton>
            <DonutLarge />
          </IconButton>

          <IconButton>
            <Chat />
          </IconButton>

          <IconButton onClick={()=>TOGGLER(false)}>
            {toggle?<CloseOutlined />:<MoreVert />}
          </IconButton>
        </div>
      </div>
      <div className= "sidebar_search" >
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
