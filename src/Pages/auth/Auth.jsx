import React, { useState } from "react";
import SignIn from "../../components/Signin";
import SignUp from "../../components/SignUp";

const Auth = () => {
  const [newUser, setNewUser] = useState(false);

  const handleAuth = () => {
    setNewUser(!newUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {!newUser ? <SignIn /> : <SignUp />}
        <button
          onClick={handleAuth}
          className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <a>
            {!newUser
              ? "New User? Please Sign Up"
              : "Already Have an Account? Sign In"}
          </a>
        </button>
      </div>
    </div>
  );
};

export default Auth;
