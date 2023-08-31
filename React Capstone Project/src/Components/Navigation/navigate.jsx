import React from "react";
import { useNavigate } from "react-router-dom";

const navigateHook = (Component) => {
  return (props) => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />;
  };
};

export default navigateHook;
