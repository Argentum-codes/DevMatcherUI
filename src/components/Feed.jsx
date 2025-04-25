import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';

const Feed = () => {

  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if(feed) return;
    try{
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      })
      dispatch(addFeed(res.data));
    }catch(err){
      console.error(err);
    }
  }

  useEffect(() => {
    getFeed();
  },[])

  if(!feed || feed.length === 0) {
    return (
      <div className='flex justify-center my-10'>
        <h1 className='text-2xl font-bold'>No new users found</h1>
      </div>
    )
  }

  return (
    feed &&(
      <div className='flex justify-center my-10'>
        <UserCard user= {feed[0]}/>
      </div>
    )
  )
}

export default Feed
