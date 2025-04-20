import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [emailId, setEmailId] = useState("argha@gmail.com");
  const [password, setPassword] = useState("Argha@123");

  const handleLogin = async () => {
    try{
      const res = await axios.post("http://localhost:3001/login", {
        emailId: emailId,
        password: password
      },{
        withCredentials: true
      })
    }catch(err){
      console.error(err);
    } 
  }

  return (
    <div className='flex justify-center my-20'>
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div className="my-2">
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Enter Email Id</legend>
              <input type="text" value={emailId} className="input" placeholder="Type here"
              onChange={(e) => setEmailId(e.target.value)} />
            </fieldset>
          </div>
          <div className="my-2">
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Enter Password</legend>
              <input type="text" value={password} className="input" placeholder="Type here"
              onChange={(e) => setPassword(e.target.value)} />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
