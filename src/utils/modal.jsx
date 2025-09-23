import React from "react";

function ShowToast({header ,text}) {
  return (
    <div>
      <div className="toast toast-top toast-end">
       
        <div className="alert alert-success">
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
}

export default ShowToast;
