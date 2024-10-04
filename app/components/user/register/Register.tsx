"use client";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Icono from "../../nav/Icono";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    passwordAgain: "",
    isMatched: true,
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = useCallback((e:any) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, [name]: value };

      if (name === "password" || name === "passwordAgain") {
        updatedUser.isMatched =
          updatedUser.password === updatedUser.passwordAgain;
      }

      return updatedUser;
    });
  }, []);

  const handleRegister = async (e:any) => {
    e.preventDefault();
    setError("");

    if (!user.isMatched) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:1337/api/auth/local/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.username,
            email: user.email,
            phone: user.phone,
            password: user.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.jwt);
        router.push("/user/profile");
      } else {
        setError(data.error.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full  p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <Icono name="pizza" className="h-12 w-12 text-orange-600" />
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us and start ordering delicious food!
          </p>
        </div>
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="username"
              placeholder="username"
              required
              className="p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={user.username}
              onChange={handleInputChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={user.email}
              onChange={handleInputChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              required
              className="p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={user.phone}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className={`p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                user.isMatched ? "border-green-500" : "border-red-500"
              }`}
              value={user.password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="passwordAgain"
              placeholder="Confirm Password"
              required
              className={`p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                user.isMatched ? "border-green-500" : "border-red-500"
              }`}
              value={user.passwordAgain}
              onChange={handleInputChange}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150"
          >
            Create Account
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="/login" className="text-orange-600 hover:text-orange-500">
            Already have an account? Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
