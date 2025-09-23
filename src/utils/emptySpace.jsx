import React from "react";

function EmptySpace({ text, desc }) {
  return (
    <div className=" flex m-auto flex-col my-14 justify-center w-[400px] p-6 bg-base-200 rounded-xl shadow">
      <p className="text-lg font-semibold text-gray-100">{text}</p>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}

export default EmptySpace;
