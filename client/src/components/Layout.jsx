// src/components/Layout.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuHome } from "react-icons/lu";
import { GrNotes } from "react-icons/gr";
import { FaUserDoctor } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { FaUsersLine } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState("Home"); // Default active item
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Update activeMenuItem when user.name changes
    if (user && user.name) {
      setActiveMenuItem(user.name);
    }
  }, [user]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const userItems = [
    {
      name: "Home",
      path: "/",
      icon: <LuHome />,
    },
    {
      name: "Profile",
      paht: "/profile",
      icon: <CgProfile />,
    },
    {
      name: "Appointment",
      path: "/appointment",
      icon: <GrNotes />,
    },
    {
      name: "Apply Doctor",
      path: "/applydoctor",
      icon: <FaUserDoctor />,
    },
  ];
  const adminItems = [
    {
      name: "Home",
      path: "/",
      icon: <LuHome />,
    },
    {
      name: "Profile",
      paht: "/profile",
      icon: <CgProfile />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <FaUsersLine />,
    },
    {
      name: "Doctor",
      path: "/doctor",
      icon: <FaUserDoctor />,
    },
  ];

  const menuToRendered = user?.isAdmin ? adminItems : userItems;
  const handleMenuItemClick = (itemName) => {
    setActiveMenuItem(itemName);
  };

  const Badge = ({ count }) => (
    <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs absolute top-0 right-0">
      {count}
    </span>
  );
  return (
    <div
      className={`flex h-screen bg-red-600 ${isSidebarOpen ? "" : "md:ml-64"}`}
    >
      {/* Sidebar */}
      <div
        className={`md:flex md:flex-shrink-0 ${
          isSidebarOpen ? "h-full" : "hidden"
        }`}
      >
        <div className="flex flex-col w-46  h-full">
          {/* Set the height to full */}
          {/* Your Logo */}
          <div className="flex items-center justify-center h-16 bg-gray-900 text-white">
            <div className="text-3xl font-extrabold">Logo</div>
          </div>
          {/* Sidebar Links with Icons */}
          <nav className="flex-1 bg-gray-800 p-4 space-y-2">
            {menuToRendered.map((item) => (
              <Link
                to={item.path}
                key={item.name}
                className={`flex items-center text-white hover:bg-gray-700 p-2 rounded ${
                  activeMenuItem === item.name ? "bg-gray-700" : ""
                }`}
                onClick={() => handleMenuItemClick(item.name)}
              >
                <span className="mr-2">{item.icon} </span>
                {item.name}
              </Link>
            ))}
            <div
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="flex items-center text-white hover:bg-gray-700 p-2 rounded cursor-pointer"
            >
              <CiLogout className="mr-2" /> Logout
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 bg-white border-b">
          <div className="flex justify-between p-4">
            {/* User Name on the right */}
            <Link to="/profile" className="mr-4">
              {user?.name || "Guest"}
            </Link>

            <div className="relative">
              <IoMdNotifications />
              <Badge count={2} />
            </div>

            {/* Toggle Button (if you want it on the left) */}
            <button className="md:hidden" onClick={toggleSidebar}>
              {/* Insert your toggle icon here */}
              Toggle
            </button>
          </div>
        </header>

        {/* Main Section */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
