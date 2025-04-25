import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try{
      const res = await axios.post( BASE_URL+"/login", { 
        emailId: emailId,
        password: password
      },{
        withCredentials: true
      })
      dispatch(addUser(res.data));// (res.data.data)?
      return navigate("/")
    }catch(err){
      setError(err?.response?.data || "Something went wrong");
    } 
  }

  const handleSignUp = async () => {
    try{
      const res = await axios.post( BASE_URL+"/signup", { 
        firstName: firstName,
        lastName: lastName,
        emailId: emailId,
        password: password
      },{
        withCredentials: true
      })
      dispatch(addUser(res.data.data));
      return navigate("/profile")
    }catch(err){
      setError(err?.response?.data || "Something went wrong");
    } 
  }

  return (
    <div className='flex justify-center my-20'>
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "SignUp"}</h2>
          {!isLoginForm && (<>
          <div className="my-2">
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Enter Firstname</legend>
              <input type="text" value={firstName} className="input" placeholder="Type here"
              onChange={(e) => setFirstName(e.target.value)} />
            </fieldset>
          </div>
          <div className="my-2">
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Enter Lastname</legend>
              <input type="text" value={lastName} className="input" placeholder="Type here"
              onChange={(e) => setLastName(e.target.value)} />
            </fieldset>
          </div>
          </>
          )}
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
              <input type="password" value={password} className="input" placeholder="Type here"
              onChange={(e) => setPassword(e.target.value)} />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginForm? handleLogin: handleSignUp}>{isLoginForm ? "Login" : "SignUp"}</button>
          </div>
          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
          <p className='text-red-500'>{error}</p>
        </div>
      </div>
    </div>
  )
}

export default Login
