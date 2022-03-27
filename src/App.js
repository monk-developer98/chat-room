import "./App.css";
import Chat from "./components/chat/Chat";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import { useStateValue } from "./components/StateProvider";
import { useEffect } from "react";
import { auth } from "./Firebase";

function App() {
  const [ {user}, dispatch] = useStateValue();
  
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
      <Sidebar />
      <Routes>
        <Route exact path="/" element={<Chat />} />
        <Route exact path="/room/:roomId" element={<Chat />} />
      </Routes>
      </div>
      )}
    </BrowserRouter>
  );
}

export default App;
