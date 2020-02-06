import React from "react";
import "../App.scss";
import "../Components/navbar.scss";

export const MobileRoute = () => {
  return (
    <div className="card" id="card">
      <div className="card-header"></div>
      <div className="card-body">
        <h1>For better experience please use Desktop version</h1>
        <div className="card-buttons"></div>
      </div>
    </div>
  );
};
