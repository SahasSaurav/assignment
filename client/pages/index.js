import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { CSVLink } from "react-csv";
import axios from 'axios'

import { AuthContext } from '../context/AuthContext'
import UserCard from '../componets/UserCard'


export default function Home() {

  const router = useRouter()
  const { pathname } = router

  const [users, setUsers] = useState([])

  const { isAuthenticated, logout, authState } = useContext(AuthContext)
  const { accessToken } = authState;

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/user/', {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
      })
      console.log({ data })
      setUsers([...data.allUserData])
    } catch (err) {
      console.error(err);
      setUsers([])
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
    }
  }, [pathname, isAuthenticated])

  const headers = [
    { label: "UserId", key: "_id" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" }
  ];

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="bg-gray-200 min-h-screen">
        <div className="container mx-auto max-w-screen-xl p-4">
          <nav className="flex justify-between items-center py-3">
            <h1 className="text-3xl">Auth</h1>
            <div className="flex flex-wrap gap-4 ">
              <CSVLink className="px-4 py-2 rounded bg-blue-400" data={users} headers={headers} filename={"users.csv"}>
                Download me
              </CSVLink>
              <button className="bg-red-400 text-white px-4 py-2 rounded" onClick={logout}>Logout</button>
            </div>
          </nav>
          <h2>All user</h2>
          <div className="flex flex-wrap gap-3 py-4  justify-center lg:justify-start items-center">
            {users.map(item => (
              <UserCard key={item._id} {...item} />
            ))}
          </div>

        </div>
      </section>
    </>
  )
}

