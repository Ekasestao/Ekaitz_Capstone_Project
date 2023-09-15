import React from "react";
import { useParams } from "react-router-dom";

const slugIdHook = (Component) => {
  return (props) => {
    const slug_id = useParams();

    return <Component slug_id={slug_id.slug} {...props} />;
  };
};

export default slugIdHook;
