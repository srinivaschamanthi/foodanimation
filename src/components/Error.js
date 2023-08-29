import React from "react";
import { useRouteError,Link } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  return (
    <div className="not-found-route-container">
      <h1 className="not-found-heading">
        {err.status} : {err.statusText}
      </h1>
     <Link to='/'>
      <button style={{cursor:"pointer"}}>Back to home</button>
      </Link>
    </div>
  );
};

export default Error;
