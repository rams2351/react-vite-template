import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex h-screen w-full flex-col space-y-3 items-center justify-center">
      <div>NotFound</div>
      <Link to={"/"} title="Go to Home">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
