import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import Layout from "./components/Layout";
import ApplyDoctor from "./Pages/Applydoctor";
import Notifications from "./Pages/Notifications";

function App() {
  const loading = useSelector((state) => state.alerts.loading);

  return (
    <>
      <Router>
        {loading && (
          <div className="spinner-parent flex-col gap-4">
            <div className="w-16 h-16 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full"></div>
          </div>
        )}
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                {" "}
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/applydoctor"
            element={
              <ProtectedRoutes>
                {" "}
                <ApplyDoctor />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoutes>
                {" "}
                <Notifications />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />{" "}
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />{" "}
              </PublicRoutes>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
