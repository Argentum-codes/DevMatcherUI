import React from 'react'
import { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
  const [firstName,setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender || "");
  const [age, setAge] = useState(user.age);   
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try{
        const res = await axios.patch(BASE_URL+"/profile/edit", 
            {firstName, lastName, photoUrl, age, gender, about, skills},{
            withCredentials: true
        })
        dispatch(addUser(res?.data?.data))
        setShowToast(true);
        const i = setTimeout(()=>{
            setShowToast(false);
        },3000)
    }catch(err){
      setError(err.response.data);
    }
  }


  return (
    <>
    <div className='flex justify-center my-10 mx-10'>
    <div className='flex justify-center my-20 mx-20'>
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          <div className="my-2">
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">First Name</legend>
              <input type="text" value={firstName} className="input" placeholder="Type here"
              onChange={(e) => setFirstName(e.target.value)} />
            </fieldset>
          </div>
          <div className="my-2">
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Last Name</legend>
              <input type="text" value={lastName} className="input" placeholder="Type here"
              onChange={(e) => setLastName(e.target.value)} />
            </fieldset>
          </div>
          <div className="my-2">
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Age</legend>
              <input type="text" value={age} className="input" placeholder="Type here"
              onChange={(e) => setAge(e.target.value)} />
            </fieldset>
          </div>
          <div className="my-2">
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Gender</legend>
              <input type="text" value={gender} className="input" placeholder="Type here"
              onChange={(e) => setGender(e.target.value)} />
            </fieldset>
          </div>
          <div className="my-2">
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">About</legend>
              <input type="text" value={about} className="input" placeholder="Type here"
              onChange={(e) => setAbout(e.target.value)} />
            </fieldset>
          </div>
          <div className="my-2">
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Photo</legend>
              <input type="text" value={photoUrl} className="input" placeholder="Type here"
              onChange={(e) => setPhotoUrl(e.target.value)} />
            </fieldset>
          </div>
          <div className="my-2">
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Skills</legend>
              <input type="text" value={skills} className="input" placeholder="Type here"
              onChange={(e) => setSkills(e.target.value)} />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary my-4" onClick={saveProfile}>Save Profile Details</button>
          </div>
          <p className='text-red-500'>{error}</p>
        </div>
      </div>
    </div>
    <UserCard user={{firstName, lastName, photoUrl, gender, about, skills, age}}/>
    
    </div>
    {showToast && (<div className="toast toast-top toast-center">
 
        <div className="alert alert-success">
            <span>Profile saved successfully.</span>
        </div>
    </div>)}
    </>
  )
}

export default EditProfile
