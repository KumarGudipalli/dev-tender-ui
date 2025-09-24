import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../Redux/slices/loginSlices";
import { Link, useNavigate } from "react-router-dom";
import { BaseURL } from "../../utils/constant";
import Cookies from "js-cookie";
import ShowToast from "../../utils/modal";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) navigate("/feed");
  }, []);
  const loginUser = async () => {
    try {
      const data = {
        email,
        password,
      };

      const response = await fetch(`${BaseURL}auth/login`, {
        method: "POST",
        credentials: "include", // allows sending cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      // console.log(responseData.data);
      if (responseData) {
        dispatch(addUser(responseData.data));
        navigate("/feed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // setError(error);
    }
  };

  return (
    <div className="flex justify-center mt-50 ">
      <div className="card card-border  w-96 bg-slate-700">
        <div className="card-body">
          <h2 className="card-title ">Login </h2>
          <div className="flex flex-col space-y-2.5">
            {/* email */}
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                value={email}
                type="email"
                name="email"
                placeholder="mail@site.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
            {/* //password */}
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {/* <p className="validator  hidden">
              Must be more than 8 characters, including
              <br />
              At least one number <br />
              At least one lowercase letter <br />
              At least one uppercase letter
            </p> */}
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="card-actions justify-center">
            <button
              disabled={email === "" && password == ""}
              onClick={() => loginUser()}
              className="btn btn-primary"
            >
              Login
            </button>
          </div>
          <p className="text-sm text-gray-100 text-center mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
