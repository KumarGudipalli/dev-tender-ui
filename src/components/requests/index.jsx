import React, { useEffect, useState } from "react";
import { BaseURL } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../../Redux/slices/RequestSlice";

const Connection = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const [error, setError] = useState("");
  const fetchRequests = async () => {
    try {
      const response = await fetch(BaseURL + "request/pending", {
        method: "GET",
        credentials: "include", // allows sending cookies
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch(addRequest(data.pendingRequests));
      //   console.log(data.pendingRequests);
    } catch (error) {}
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  const handleRequestStatus = async (status, _id) => {
    try {
      const response = await fetch(
        BaseURL + `request/review/${status}/${_id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("error :" + response.error.message);
      }

      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  if (!requests) return;
  if (requests.length == 0)
    return (
      <p className="flex items-center justify-center my-10 ">
        No Requests Found
      </p>
    );

  return (
    <div className=" text-center  my-2 ">
      <div className="text-3xl font-bold">Requests</div>
      <div className="flex flex-col my-3 items-center">
        {requests &&
          requests.map((item) => (
            <div className="flex w-1/2 mx-2 my-2 bg-base-200 shadow-xl items-center justify-between">
              <div
                key={item._id}
                className="flex gap-4 my-2 p-4 items-center justify-start "
              >
                <div className="w-14 h-14">
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src={item.senderId?.profileUrl}
                  />
                </div>

                <div className="text-left">
                  <p>
                    {item?.senderId?.firstName} {item?.senderId?.lastName}
                  </p>
                  <p>{item?.senderId?.about}</p>
                </div>
              </div>
              <div className="mr-4 flex gap-2.5">
                <button
                  onClick={() => handleRequestStatus("reject", item._id)}
                  className="btn btn-soft btn-error"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleRequestStatus("accept", item._id)}
                  className="btn btn-soft btn-success"
                >
                  Accept
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Connection;
