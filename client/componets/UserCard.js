import React from 'react'

const UserCard = ({ name, email, _id }) => {
  return (
    <div className="flex flex-col bg-white shadow-sm w-full max-w-sm space-y-2 p-4 rounded-md">
      <p>UserId: {_id}</p>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </div>
  )
}

export default UserCard
