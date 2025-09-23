import React, { useEffect, useState } from "react";
import { BaseURL } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUsersFeed } from "../../Redux/slices/feedSlices";
import UserCard from "./userCard";
import EmptySpace from "../../utils/emptySpace";

function FeedSlices() {
  const usersFeed = useSelector((store) => store.feedDetails);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const getUserInFeed = async () => {
    if (Object.keys(usersFeed).length > 0) return;
    try {
      const response = await fetch(`${BaseURL}connections/feed`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // console.log(data);
      dispatch(addUsersFeed(data.FeedUsers));
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    if (Object.keys(usersFeed).length == 0) getUserInFeed();
  }, []);

  if (usersFeed.length == 0)
    return (
      <EmptySpace
        text="No users found in your feed 👀"
        desc="Try connecting with more people to see updates here."
      />
    );
  return (
    <div className="flex justify-center my-5">
      {usersFeed.length > 0 && (
        <UserCard
          firstName={usersFeed[0]?.firstName}
          lastName={usersFeed[0]?.lastName}
          profileUrl={usersFeed[0]?.profileUrl}
          about={usersFeed[0]?.about}
          age={usersFeed[0]?.age}
          gender={usersFeed[0]?.gender}
          skills={usersFeed[0]?.skills}
          _id={usersFeed[0]?._id}
        />
      )}
    </div>
  );
}

export default FeedSlices;
