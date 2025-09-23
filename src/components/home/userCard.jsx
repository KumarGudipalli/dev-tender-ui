import React from "react";
import { BaseURL } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { removeUsersFromFeed } from "../../Redux/slices/feedSlices";

function UserCard({
  firstName,
  lastName,
  profileUrl,
  about,
  age,
  gender,
  skills,
  _id = null,
}) {
  const dispatch = useDispatch();
  const handleRequestConnection = async (id, status) => {
    try {
      const response = await fetch(
        BaseURL + "request/send/" + status + "/" + id,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("error : " + response.error.message);
      }
      dispatch(removeUsersFromFeed(id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="card h-[550px] shadow-lg  px-6 py-6 justify-center bg-base-300 border-base-300 rounded-box w-sm border">
        <figure className="w-full h-80 overflow-hidden flex items-center justify-center">
          {profileUrl ? (
            <img
              src={profileUrl}
              alt="User"
              className="w-full h-full object-contain rounded-xl"
            />
          ) : (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwaC2JFGV1ztlUeZeuElwPBFz2lJHjuxAn-w&s"
              alt="Default"
              className="w-full object-cover rounded-xl"
            />
          )}
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {about && <p>{about}</p>}
          {age && gender && <p>{age + ", " + gender}</p>}
          <div className="card-actions justify-center">
            <button
              onClick={() => handleRequestConnection(_id, "ignore")}
              className="btn btn-secondary"
            >
              Ignore
            </button>
            <button
              onClick={() => handleRequestConnection(_id, "intrested")}
              className="btn btn-success"
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
