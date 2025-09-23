import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/navabar/navbar";
import { useDispatch, useSelector } from "react-redux";
import { BaseURL } from "./utils/constant";
import { addUser } from "./Redux/slices/loginSlices";

function Body() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.login);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BaseURL}api/profile/view`, {
          method: "GET",
          credentials: "include",
          headers: {
            // ✅ lowercase
            "Content-Type": "application/json",
          },
        });

        if (response.status == 401) navigate("/login");
        const data = await response.json();
        if (data) {
          dispatch(addUser(data.user));
        }
      } catch (error) {
        console.error("Profile fetch failed:", error);
      }
    };
    if (!userDetails?.firstname) fetchProfile();
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Body;
