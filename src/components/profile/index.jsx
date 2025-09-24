import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../home/userCard";
import isEqual from "lodash/isEqual";
import { BaseURL } from "../../utils/constant";
import { addUsersFeed } from "../../Redux/slices/feedSlices";
import ShowToast from "../../utils/modal";

function Profile() {
  const user = useSelector((store) => store.login);
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");
  const [profileUrl, setProfileUrl] = useState(user.profileUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [about, setAbout] = useState(user.about || "");
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();
  const prevUserRef = useRef(user);

  useEffect(() => {
    const prevUser = prevUserRef.current;
    if (JSON.stringify(prevUser) !== JSON.stringify(user)) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setProfileUrl(user.profileUrl || "");
      setAge(user.age || "");
      setSkills(user.skills || "");
      setAbout(user.about || "");
      prevUserRef.current = user;
    }
  }, [user]);

  const updatedProfile = async () => {
    try {
      const data = {
        firstName,
        lastName,
        email,
        profileUrl,
        age,
        skills,
        about,
      };

      const updatedFields = {};

      // loop through each field
      Object.keys(data).forEach((key) => {
        if (!isEqual(data[key], user[key])) {
          updatedFields[key] = data[key]; // only store changed values
        }
      });

      if (Object.keys(updatedFields).length > 0) {
        // console.log("Updated fields:", updatedFields);
        const response = await fetch(`${BaseURL}/profile/edit`, {
          method: "PATCH",
          credentials: "include", // allows sending cookies
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFields),
        });
        const data = await response.json();

        // dispatch(addUsersFeed(data?.updatedUser));
        setToast(true);
     setTimeout(() => {
          setToast(false);
        }, 3000);
      } else {
        console.log("No changes detected");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {toast && (
        <ShowToast
          header={"Success"}
          text={`${firstName} profile has been updated !`}
        />
      )}
      <div className="flex justify-center  space-x-6 mt-4">
        <fieldset className="fieldset shadow-lg bg-base-200 border-base-300 rounded-box w-md border flex flex-col">
          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto max-h-[500px] px-6 py-6">
            <label className="label">First Name</label>
            <input
              value={firstName}
              type="text"
              className="input w-md input-lg"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">Last Name</label>
            <input
              value={lastName}
              type="text"
              className="input w-md input-lg"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />

            <label className="label">Email</label>
            <input
              readOnly
              value={email}
              type="email"
              className="input w-md input-lg"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="label">Photo URL</label>
            <input
              value={profileUrl}
              type="text"
              className="input w-md input-lg"
              placeholder="Profile Image URL"
              onChange={(e) => setProfileUrl(e.target.value)}
            />

            <label className="label">Age</label>
            <input
              value={age}
              type="number"
              className="input w-md input-lg"
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
            />

            <label className="label">Skills</label>
            <input
              value={skills}
              type="text"
              className="input w-md input-lg"
              placeholder="Skills"
              onChange={(e) => setSkills(e.target.value)}
            />

            <label className="label">About</label>
            <textarea
              value={about}
              className="textarea w-md textarea-lg"
              placeholder="About"
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          {/* Fixed button */}
          <div className="p-4 bg-base-100 sticky bottom-0">
            <button
              onClick={updatedProfile}
              className="btn w-full btn-active btn-success"
            >
              Update Profile
            </button>
          </div>
        </fieldset>

        {/* Preview updated user */}
        <div className="mt-5">
          <UserCard
            firstName={firstName}
            lastName={lastName}
            email={email}
            profileUrl={profileUrl}
            age={age}
            skills={skills}
            about={about}
          />
        </div>
      </div>
    </>
  );
}

export default Profile;
