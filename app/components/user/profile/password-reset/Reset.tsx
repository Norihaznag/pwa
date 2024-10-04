"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface PasswordState {
  ancientPassword: string;
  newpassword: string;
  passwordAgain: string;
}

const Reset = () => {
  const [password, setPassword] = useState<PasswordState>({
    ancientPassword: "",
    newpassword: "",
    passwordAgain: "",
  });
  const [isMatched, setMatched] = useState(false);

  // Update the state based on the input field change
  function change(
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof PasswordState
  ) {
    const value = e.target.value;
    setPassword((prevPassword) => {
      const newPasswordState = {
        ...prevPassword,
        [key]: value,
      };

      // Check if newpassword matches passwordAgain and update the isMatched state
      const { newpassword, passwordAgain } = newPasswordState;
      setMatched(newpassword === passwordAgain);
      return newPasswordState;
    });
  }

  function oldPassVerfifecation({ user }: any) {
    const { username, password } = user;
    const isOldPasswordCorrect = axios.post(
      "http://localhost:1337/api/users/1",
      {
        username: username,
        password: password,
      }
    );
  }

  function onSubmit(e: any) {
    e.preventDefault();
    const { newpassword, passwordAgain }: any = password;
    const passwords = {
      newpassword,
      passwordAgain,
    };
    const lengths = Object.values(passwords).every((item) => item.length > 8);
  }

  useEffect(() => {
    // Validate passwords whenever the newpassword or passwordAgain changes
    setMatched(password.newpassword === password.passwordAgain);
  }, [password.newpassword, password.passwordAgain]);

  console.log(password);

  return (
    <div className="capitalize">
      <form
        className="h-[50vh] md:w-[50vw] w-full rounded-lg"
        onSubmit={onSubmit}
      >
        <div className="ancientPassword flex flex-col">
          <label htmlFor="ancient-password">Ancient Password</label>
          <input
            type="password"
            name="ancient-password"
            id="ancient-password"
            className="p-4 rounded-md"
            onChange={(e) => change(e, "ancientPassword")}
          />
        </div>

        <div className="new-password flex flex-col">
          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            name="new-password"
            id="new-password"
            className="p-4 rounded-md"
            onChange={(e) => change(e, "newpassword")}
          />
        </div>

        <div className="password-again flex flex-col mb-4">
          <label htmlFor="password-again">Type New Password Again</label>
          <input
            type="password"
            name="password-again"
            id="password-again"
            className="p-4 rounded-md"
            onChange={(e) => change(e, "passwordAgain")}
          />
        </div>

        {isMatched && password.passwordAgain ? (
          <h1 className="p-2 bg-green-300 text-green-800 rounded-md ">
            Matched
          </h1>
        ) : (
          ""
        )}
        <button type="submit" className="p-4 bg-white my-4 rounded-md px-4">
          submit
        </button>
      </form>
    </div>
  );
};

export default Reset;
