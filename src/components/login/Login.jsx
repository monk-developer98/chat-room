import React from 'react'
import { auth, provider } from '../../Firebase'
import { useStateValue } from '../StateProvider'
import "./login.css"

const Login = () => {
  const [{},dispatch] = useStateValue()
  const signIn = () =>{
     auth.signInWithPopup(provider).then(result=>{
        dispatch({
          type:"SET_USER",
          user: result.user
        })
    }).catch(error=>alert(error))
  }
  return (
    <div className='login_wraper'>
       <div className="login">
         <img src="/logo.jpg" alt="" />
         <h2>S!gn !n to ChatApp</h2>
         <button onClick={signIn}>Login With Gmail</button>
       </div>
    </div>
  )
}

export default Login