import React from "react";
import logo from "../Assets/Images/unknown.png";
const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img width="120" src={logo} alt="logo" />
    </div>
  );
};

export default Logo;
