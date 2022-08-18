import React from "react";

export default function Loading({ center }) {
  return <div className={`loading ${center && "loading-center"}`} />;
}
