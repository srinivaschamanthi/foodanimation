import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  return (
    <div className="not-found-route-container">
      <h1 className="not-found-heading">
        {err.status} : {err.statusText}
      </h1>
    </div>
  );
};

export default Error;
