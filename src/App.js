import "./App.css";
import Chat from "./components/chat/Chat";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import { useStateValue } from "./components/StateProvider";
import { useEffect, useState } from "react";
import { auth } from "./Firebase";

function App() {
  const [ {user}, dispatch] = useStateValue();
  const [toggle, setToggle] = useState(false)

  const TOGGLER = (data)=>{
    setToggle(data)
  }
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      dispatch({
        type:"SET_USER",
        user:user
      })
    })
  },[])

  return (
    <BrowserRouter>
    { !user ? (<Login />) : (

      <div className="App">
      <Sidebar toggle={toggle}  TOGGLER={TOGGLER}/>
      <Routes>
        <Route exact path="/" element={<Chat TOGGLER={TOGGLER} />} />
        <Route exact path="/room/:roomId" element={<Chat TOGGLER={TOGGLER} />} />
      </Routes>
      </div>
      )}
    </BrowserRouter>
  );
}

export default App;
