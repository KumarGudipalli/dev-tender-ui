import React, { useEffect } from "react";
import { BaseURL } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../Redux/slices/connectionSlice";
import EmptySpace from "../../utils/emptySpace";
import { useNavigate } from "react-router-dom";
const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const navigate = useNavigate();
  const fetchConnections = async () => {
    try {
      const response = await fetch(BaseURL + "request/allConnections", {
        method: "GET",
        credentials: "include", // allows sending cookies
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch(addConnections(data.connections));
      //   console.log(data.userAllConnections);
    } catch (error) {}
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  console.log(connections, "connections");
  if (!connections) return;
  if (connections.length == 0)
    return (
      <EmptySpace
        text="No connections found "
        desc="Try connecting with more people to see updates here."
      />
    );
  return (
    <div className=" text-center  my-2 ">
      <div className="text-3xl font-bold">Connections</div>
      <div className="flex flex-col my-3 items-center">
        {connections &&
          connections.map((item) => (
            <div className=" justify-between flex gap-4 w-1/2 my-2 p-4 items-center  bg-base-200 shadow-xl">
              <div
                key={item._id}
                className="flex gap-4 w-3/4 my-2 p-4 items-center justify-start "
              >
                <div className="w-14 h-14">
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src={item?.profileUrl}
                  />
                </div>

                <div className="text-left">
                  <p>
                    {item?.firstName} {item?.lastName}
                  </p>
                  <p>{item?.about}</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/chat/${item?._id}`)}
                className="btn btn-soft btn-primary w-[105px] font-bold"
              >
                chat
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Connection;
