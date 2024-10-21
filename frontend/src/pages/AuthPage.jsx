import { useState } from "react";

import LoginForm from "../components/LoginForm";

import SignupForm from "../components/SignupForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br
		from-red-500 to-pink-500 p-4
	"
    >
      <div className="w-full max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-white mb-8">
          {isLogin ? "Sign in to Flickerr" : "Create an account"}
        </h2>

        <div className="bg-white shadow-xl rounded-lg p-8">
          {isLogin ? <LoginForm /> : <SignupForm />}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "New to Flickerr?" : "Already have an account?"}
            </p>

            <button
              onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
              className="mt-2 text-red-600 hover:text-red-800 font-medium transition-colors duration-300"
            >
              {isLogin ? "Create a new account" : "Sign in to your account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
