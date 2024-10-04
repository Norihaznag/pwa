"use client"; // Ensure this is the first line in the file

import Link from "next/link";
import { useState, ChangeEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUserData, LoginUser } from "@/app/api/strapi";
import { login } from '@/app/redux/slices/userSlice';
import { useDispatch, useSelector } from "react-redux";

interface UserCredentials {
  identifier: string;
  password: string;
}

export default function SignIn() {
  const [User, setUser] = useState<UserCredentials>({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await LoginUser({ body: User });

      if (!response.jwt) {
        console.log('Login failed');
        setError(response.error?.message || 'An unknown error occurred');
      } else {
        try {
          const userdata = await getUserData();
          const data = {user : userdata }
          if(data?.user?.role?.name !== "admin"){
            console.log(data)
          }
          // dispatch(login(data));
          console.log('not able')
        } catch (error) {
          console.log(error);
        }
        // router.push(`profile`);
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred while trying to log in. Please try again.');
    } finally {
      setTimeout(() => {
        setError(null);
      }, 4000);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [id]: value }));
  };

  return (
    <div className="w-[90vw] md:w-1/3 mx-auto rounded-lg border p-8">
      <h1 className="text-3xl font-semibold mb-6 text-center ">
        Login
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="identifier"
            placeholder="Username or Email"
            className="w-full px-4 py-2 rounded-md bg-[#414339] focus:outline-none focus:ring-2 focus:ring-[#0071e3] text-white"
            required
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md bg-[#414339] focus:outline-none focus:ring-2 focus:ring-[#0071e3] text-white"
            required
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#0071e3] text-white py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:ring-offset-2 hover:bg-[#005bbf]"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <p className="mt-6 text-center text-sm text-[#86868b]">
        Dont have an account?{' '}
        <Link href="/user/register" className="text-[#0071e3] hover:underline">
          Create one now
        </Link>
      </p>
    </div>
  );
}
