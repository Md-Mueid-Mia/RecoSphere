import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../provider/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { signOutUser, user } = useContext(AuthContext);
  const handleLogOutUser=() => {
    signOutUser()
    .then(res=>{
      toast.success('User logged out')
    })
    .catch(err=>{
      toast.error(err?.message)
    })
  }
  const links = (
    <>
      
        <div className="space-x-5 flex flex-col md:flex-row items-center justify-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-bold" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/queries"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-bold" : ""}`
            }
          >
            Queries
          </NavLink>

            {user?.email && <>
          <NavLink
            to="/recommendations-for-me"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-bold" : ""}`
            }
          >
            Recommendations For Me
          </NavLink>
          <NavLink
            to="/add-queries"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-bold" : ""}`
            }
          >
            Add Queries
          </NavLink>
          <NavLink
            to="/my-queries"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-bold" : ""}`
            }
          >
            My Queries
          </NavLink>
          <NavLink
            to="/my-recommendations"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-bold" : ""}`
            }
          >
            My Recommendations
          </NavLink>
          <button
            onClick={handleLogOutUser}
            className="  py-2 rounded  "
          >
            Logout
          </button></>}

        </div>
      

     
    </>
  );
  return (
    <div className="navbar bg-base-100 overscroll-x-none">
      <div className="navbar-start flex items-center gap-3">
        <img
          className="w-10"
          src="https://i.ibb.co.com/r08sLfd/Reco-Sphere.png"
          alt=""
        />
        <a className="text-xl font-bold">RecoSphere</a>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {!user?.email ? (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-bold" : ""}`
            }
          >
            Log in
          </NavLink>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="Tailwind CSS Navbar component"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
            </ul>
          </div>
        )}

        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost relative md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-64  right-2 p-2 shadow"
          >
            <div className="">{links}</div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
