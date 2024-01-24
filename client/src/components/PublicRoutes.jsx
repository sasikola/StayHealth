import { Navigate } from "react-router-dom";

function PublicRoutes(props) {
  if (localStorage.getItem("token")) {
    return Navigate("/login");
  } else {
    return props.children;
  }
}

export default PublicRoutes;
