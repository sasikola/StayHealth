import { Navigate } from "react-router-dom";

function ProtectedRoutes(props) {
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return Navigate("/login");
  }
}

export default ProtectedRoutes;
