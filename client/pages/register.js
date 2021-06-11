import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState,useEffect,useContext } from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {

  const router=useRouter()

  const {isAuthenticated,setAuthState}=useContext(AuthContext)

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState({ isError: false, message: "" });
  const { register, handleSubmit, formState: { errors } } = useForm();

  const registerUser = async (name,email, password) => {
    try {
      setLoading(true);
      const {data} = await axios.post('http://localhost:5000/auth/register',{name, email, password },{
        headers: { "Content-Type": "application/json" },
      })
      setAuthState(data)
      // console.log({resData})
    } catch (err) {
      console.log({err})
      setLoading(false);
      setServerError(error=>({ ...error, isError: true, message: err.message }));
    }
  };

  const onSubmitHandler = (data) => {
    registerUser(data.name,data.email, data.password);
  };

  useEffect(() => {
    if(isAuthenticated()){
      router.push('/')
    }
  }, [isAuthenticated])

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <section className="bg-gray-200">
        <div className="container mx-auto max-w-screen-xl w-full h-full">
          <div className="flex flex-col justify-center items-center w-full min-h-screen">
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="w-full max-w-xl bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h1 className="text-center text-3xl font-semibold ">Register</h1>
              {serverError.isError && serverError.message && (
                <div className="p-4 my-2 text-lg bg-red-300 text-red-700 rounded">
                  {serverError.message}
                </div>
              )}
              <div className="flex flex-wrap  mb-6">
                <div className="w-full md:w-full px-3 my-2">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Full Name
                  </label>
                  <input
                    className={`appearance-none block w-full shadow-sm bg-transparent tracking-wide placeholder-gray-500 text-gray-700 font-medium  rounded-lg py-3 px-3 leading-tight focus:outline-none ${errors.name
                      ? "focus:ring-2 focus:ring-red-300 border border-red-500"
                      : "focus:ring-2 focus:ring-blue-300 border border-blue-500"
                      }`}
                    type="text"
                    placeholder="Full Name"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Please enter your full name.",
                      },
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="name"
                    render={({ message }) => (
                      <small className="error">{message}</small>
                    )}
                  />
                </div>
                <div className="w-full md:w-full px-3 my-2">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Email address
                  </label>
                  <input
                    className={`appearance-none block w-full shadow-sm bg-transparent tracking-wide placeholder-gray-500 text-gray-700 font-medium  rounded-lg py-3 px-3 leading-tight focus:outline-none ${errors.email
                      ? "focus:ring-2 focus:ring-red-300 border border-red-500"
                      : "focus:ring-2 focus:ring-blue-300 border border-blue-500"
                      }`}
                    type="text"
                    placeholder="Email ID"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Please enter your email.",
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Please enter a valid email address.",
                      },
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => (
                      <small className="error">{message}</small>
                    )}
                  />
                </div>
                <div className="w-full md:w-full px-3 my-2">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Password
                  </label>
                  <input
                    className={`appearance-none block w-full shadow-sm bg-transparent tracking-wide placeholder-gray-500 text-gray-700 font-medium  rounded-lg py-3 px-3 leading-tight focus:outline-none ${errors.password
                      ? "focus:ring-2 focus:ring-red-300 border border-red-500"
                      : "focus:ring-2 focus:ring-blue-300 border border-blue-500"
                      }`}
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Please enter your password.",
                      },
                      minLength: {
                        value: 8,
                        message: "Password must have atleast 8 characters.",
                      },
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => (
                      <small className="error">{message}</small>
                    )}
                  />
                </div>
                <div className="w-full md:w-full px-3 mt-4 mb-1">
                  <button
                    className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-gray-700 focus:border-gray-500 transition-colors duration-150"
                    type="submit"
                  >
                    Sign in
                  </button>
                </div>
              </div>
              <Link href="/login" >
                <a className="flex justify-center items-center text-sm  font-bold text-center underline hover:no-underline"  >Already have account. Go to Login page </a>
              </Link>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
