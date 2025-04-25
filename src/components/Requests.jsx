import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch()

    const reviewRequest = async (status, _id) => {
        try {
          const res = axios.post(
            BASE_URL + "/request/review/" + status + "/" + _id,
            {},
            { withCredentials: true }
          );
          dispatch(removeRequest(_id));
        } catch (err) {
            //handle error case
            console.error(err);
        }
    };
    


    const fetchRequests = async () => {
        try{
            const res = await axios.get(BASE_URL+"/user/requests/received", {
                withCredentials: true
            })
            console.log(res.data.data);
            dispatch(addRequests(res.data.data));

        }catch(err){
            //handle error case
            console.error(err);
        }
    }

    

    useEffect(() => {
        fetchRequests();
    },[])

    if(!requests) return;
    if(requests.length === 0) 
        return (
        <div className='flex justify-center my-20'>
            <h1 className="text-bold text-2xl">No Requests Found</h1>
        </div>
    )
    return (
        <div className="text-center my-10">
          <h1 className="font-bold text-white text-3xl mb-6">Connection Requests</h1>
      
          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
      
            return (
              <div
                key={_id}
                className="flex items-center justify-between m-4 p-4 rounded-lg bg-base-300 w-3/4 mx-auto"
              >
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <img
                    alt="photo"
                    className="w-20 h-20 rounded-full object-cover"
                    src={photoUrl}
                  />
                </div>
      
                {/* User Details */}
                <div className="flex-1 text-left mx-6">
                  <h2 className="font-bold text-xl text-white">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && <p className="text-white">{age + ", " + gender}</p>}
                  <p className="text-white">{about}</p>
                </div>
      
                {/* Buttons */}
                <div className="flex flex-col space-y-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
    );
      
}

export default Requests
