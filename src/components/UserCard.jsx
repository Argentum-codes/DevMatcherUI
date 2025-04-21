import React from 'react'

const UserCard = ({user}) => {
    const {firstName, lastName, photoUrl, age, gender, about, skills} = user;
  return (
    <div>
        <div className="card bg-base-300 w-96 shadow-sm my-20">
        <figure>
            <img
            src={user.photoUrl}
            alt="New User" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            <p>{age +", " + gender}</p>
            <p>{about}</p>
            <h3 >Skills:</h3>
            <p>{skills}</p>
            <div className="card-actions justify-between my-4">
                <button className="btn btn-primary">Ignore</button>
                <button className="btn btn-secondary">Send request</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default UserCard
