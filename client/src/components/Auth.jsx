import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import AuthHeader from "../assets/AuthHeader.png";
import ChatAppLogoPurple from "../assets/ChatAppLogoPurple.png";
import { Chat } from "stream-chat-react";

const cookies = new Cookies();

const initialState = {
  fullName: "",
  username: "",
  phoneNumber: "",
  AvatarURL: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);

  const switchAuth = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const { fullName, username, avatarURL, phoneNumber, password } = form;

    const URL = "http://localhost:3000/auth";

    try {
      const {
        data: { token, userId, hashedPassword },
      } = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
        username,
        password,
        fullName,
        phoneNumber,
        avatarURL,
      });

      cookies.set("token", token);
      cookies.set("username", username);
      cookies.set("fullName", fullName);
      cookies.set("userId", userId);

      if (isSignup) {
        cookies.set("phoneNumber", phoneNumber);
        cookies.set("avatarURL", avatarURL);
        cookies.set("hashedPassword", hashedPassword);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img className="h-12 w-auto" src={ChatAppLogoPurple} alt="ChatApp" />
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {isSignup ? "Sign up for an account" : "Login in to your account"}
            </h2>
          </div>

          <div className="mt-10">
            <div>
              <form onSubmit={submitForm} className="space-y-6">
                {isSignup && (
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="fullName"
                        placeholder="Full Name"
                        onChange={handleInputChange}
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      placeholder="username"
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {isSignup && (
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        autoComplete="phoneNumber"
                        placeholder="Phone Number"
                        onChange={handleInputChange}
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                )}

                {isSignup && (
                  <div>
                    <label
                      htmlFor="avatarURL"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Avatar URL
                    </label>
                    <div className="mt-2">
                      <input
                        id="avatarURL"
                        name="avatarURL"
                        type="text"
                        autoComplete="avatarURL"
                        placeholder="Avatar URL"
                        onChange={handleInputChange}
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Password"
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {isSignup && (
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleInputChange}
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {isSignup ? "Sign Up" : "Sign In"}
                  </button>
                </div>
              </form>

              <p className="flex justify-center pt-3">
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}
                <span
                  onClick={switchAuth}
                  className="text-indigo-600 hover:text-indigo-500 cursor-pointer pl-1"
                >
                  {isSignup ? "Sign In" : "Sign Up"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative min-h-screen lg:block hidden w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={AuthHeader}
          alt="Login Header"
        />
      </div>
    </div>
  );
};

export default Auth;
