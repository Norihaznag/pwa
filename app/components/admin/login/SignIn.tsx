"use client";
import Link from "next/link";
import { LoginUser } from "@/app/api/strapi";
import { useState, ChangeEvent } from "react";
import { useRouter, usePathname } from "next/navigation";

interface UserCredentials {
  identifier: string;
  password: string;
}

export default function SignIn() {
  const [user, setUser]:any = useState<UserCredentials>({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const path = usePathname();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await LoginUser({ body: user });

      if (response.data) {
        console.log('Login successful:', response.data);
        router.push(`admin/dashboard`);
      } else if (response.error) {
        console.log('Login failed:', response.error.message);
        setError(response.error.message || 'An unknown error occurred');
      }
      
      // else {
      //   console.warn('Unexpected response structure:', response);
      //   setError('An unexpected error occurred');
      // }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred while trying to log in. Please try again.');
    } finally {
      setTimeout(() => {
        setError(false)
      }, 4000);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prevUser:any) => ({ ...prevUser, [id]: value }));
  };

  return (
    <div className="w-[90vw] md:w-1/3 mx-auto rounded-lg bg-[#272822] p-8">
      <h1 className="text-3xl font-semibold mb-6 text-center text-white">
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
          className="w-full bg-[#000000] text-white py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:ring-offset-2 hover:bg-[#333333]"
        >
          Login
        </button>
      </form>
    
       { error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
           {error}
        </div>}
      
      <p className="mt-6 text-center text-sm text-[#86868b]">
        Dont have an account?
        <Link href="/user/register" className="text-[#0071e3] hover:underline">
          Create one now
        </Link>
      </p>
    </div>
  );
}