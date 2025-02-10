// import React, { useContext } from "react";
// import { NavLink } from "react-router-dom";
// import AuthContext from "../provider/AuthContext";
// import toast from "react-hot-toast";

// const Navbar = () => {
//   const { signOutUser, user } = useContext(AuthContext);
//   const handleLogOutUser = () => {
//     signOutUser()
//       .then((res) => {
//         toast.success("User logged out");
//       })
//       .catch((err) => {
//         toast.error(err?.message);
//       });
//   };
//   const links = (
//     <>
//       <div className="space-x-5 flex flex-col items-start lg:flex-row  lg:items-center justify-center">
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             `hover:underline ml-5 ${isActive ? "font-bold text-blue-700" : ""}`
//           }
//         >
//           Home
//         </NavLink>
//         <NavLink
//           to="/queries"
//           className={({ isActive }) =>
//             `hover:underline ${isActive ? "font-bold text-blue-700" : ""}`
//           }
//         >
//           Queries
//         </NavLink>

//         {user?.email && (
//           <>
//             <NavLink
//               to="/recommendations-for-me"
//               className={({ isActive }) =>
//                 `hover:underline ${isActive ? "font-bold text-blue-700" : ""}`
//               }
//             >
//               Recommendations For Me
//             </NavLink>
//             <NavLink
//               to="/add-queries"
//               className={({ isActive }) =>
//                 `hover:underline ${isActive ? "font-bold  text-blue-700" : ""}`
//               }
//             >
//               Add Queries
//             </NavLink>
//             <NavLink
//               to="/my-queries"
//               className={({ isActive }) =>
//                 `hover:underline ${isActive ? "font-bold text-blue-700" : ""}`
//               }
//             >
//               My Queries
//             </NavLink>
//             <NavLink
//               to="/my-recommendations"
//               className={({ isActive }) =>
//                 `hover:underline ${isActive ? "font-bold text-blue-700" : ""}`
//               }
//             >
//               My Recommendations
//             </NavLink>
//             <button onClick={handleLogOutUser} className="  rounded  ">
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </>
//   );
//   return (
//     <div className="navbar bg-base-100 justify-between sticky top-0">
//       <div className=" flex items-center gap-3">
//         <img
//           className="w-10"
//           src="https://i.ibb.co.com/r08sLfd/Reco-Sphere.png"
//           alt=""
//         />
//         <a className="text-xl font-bold">RecoSphere</a>
//       </div>
//       <div className="navbar-center hidden lg:flex justify-center items-center">
//         <ul className="menu menu-horizontal px-1">{links}</ul>
//       </div>
//       <div className="">
//         {!user?.email ? (
//           <NavLink
//             to="/login"
//             className={({ isActive }) =>
//               `hover:underline ${isActive ? "font-bold" : ""}`
//             }
//           >
//             Log in
//           </NavLink>
//         ) : (
//           <div className="dropdown dropdown-end">
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-circle avatar"
//             >
//               <div
//                 style={{
//                   width: "40px",
//                   borderRadius: "50%",
//                   overflow: "hidden",
//                 }}
//               >
//                 <img
//                   referrerPolicy="no-referrer"
//                   alt="User Profile"
//                   src={user?.photoURL}
//                   style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                 />
//               </div>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
//             >
//               <li>
//                 <a className="justify-between">
//                   Profile
//                   <span className="badge">New</span>
//                 </a>
//               </li>
//               <li>
//                 <a>Settings</a>
//               </li>
//             </ul>
//           </div>
//         )}

//         <div className="dropdown">
//           <div
//             tabIndex={0}
//             role="button"
//             className="btn btn-ghost relative lg:hidden"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </div>
//           <ul
//             tabIndex={0}
//             className="menu dropdown-content bg-base-100 rounded-box z-50 mt-3 w-64  right-2 p-2 shadow"
//           >
//             <div className="">{links}</div>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React, { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../provider/AuthContext";
import toast from "react-hot-toast";
import { useTheme } from "../provider/ThemeProvider";
import { FaSun } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

const Navbar = () => {
  const { signOutUser, user } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  
  const handleLogOutUser = () => {
    signOutUser()
      .then(() => toast.success("User logged out"))
      .catch((err) => toast.error(err?.message));
  };
  useEffect(() => {
    // Check for hash in URL when page loads
    if (window.location.hash === '#contact') {
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 100);
    }
  }, []);
// Light Mode Colors
const lightColors = {
  primary: "bg-gradient-to-r from-blue-600 to-indigo-800", // Main nav background
  secondary: "bg-white",  // Content background
  accent: "bg-blue-500", // Buttons/highlights
  text: "text-gray-800", // Main text
  textLight: "text-gray-600" // Secondary text
}

// Dark Mode Colors
const darkColors = {
  primary: "bg-gradient-to-r from-gray-900 to-slate-700", // Main nav background
  secondary: "bg-gray-800", // Content background
  accent: "bg-blue-500", // Buttons/highlights
  text: "text-white", // Main text
  textLight: "text-gray-300" // Secondary text
}
  return (
//     <div className={`
//   fixed w-full z-20 top-0 start-0
//   ${theme === 'dark' ? darkColors.primary : lightColors.primary}
//   shadow-lg backdrop-blur-sm bg-opacity-90
// `}>
<nav className={`
  fixed w-full z-20 top-0 start-0
  ${theme === 'dark' ? darkColors.primary : lightColors.primary}
  shadow-lg backdrop-blur-sm bg-opacity-90
`}>

      <div className=" px-4">
        <div className="navbar max-w-7xl mx-auto justify-between">
          {/* Logo Section */}
          <Link to={'/'}>
          <div className="flex items-center gap-3">
            <img
              className="w-10"
              src="https://i.ibb.co.com/r08sLfd/Reco-Sphere.png"
              alt="RecoSphere Logo"
            />
            <span className="text-xl font-bold text-white">RecoSphere</span>
          </div>

          </Link>
          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:underline ${isActive 
                  ? "font-bold text-blue-400" 
                  : theme === 'dark' 
                    ? darkColors.textLight 
                    : "text-white"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/queries"
              className={({ isActive }) =>
                `hover:underline ${isActive 
                  ? "font-bold text-blue-400" 
                  : theme === 'dark' 
                    ? darkColors.textLight 
                    : "text-white"
                }`
              }
            >
              Queries
            </NavLink>
           

            {user?.email && (
              <>
                <NavLink
                  to="/recommendations-for-me"
                  className={({ isActive }) =>
                    `hover:underline ${isActive 
                      ? "font-bold text-blue-400" 
                      : theme === 'dark' 
                        ? darkColors.textLight 
                        : "text-white"
                    }`
                  }
                >
                  Recommendations
                </NavLink>
                <NavLink
                  to="/add-queries"
                  className={({ isActive }) =>
                    `hover:underline ${isActive 
                      ? "font-bold text-blue-400" 
                      : theme === 'dark' 
                        ? darkColors.textLight 
                        : "text-white"
                    }`
                  }
                >
                  Add Query
                </NavLink>
                <NavLink
                  to="/my-queries"
                  className={({ isActive }) =>
                    `hover:underline ${isActive 
                      ? "font-bold text-blue-400" 
                      : theme === 'dark' 
                        ? darkColors.textLight 
                        : "text-white"
                    }`
                  }
                >
                  My Queries
                </NavLink>
              </>
            )}
 <NavLink
  onClick={(e) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    } else {
      window.location.href = '/#contact';
    }
  }}
  className={`
    hover:underline cursor-pointer
    ${theme === 'dark' ? "text-gray-300" : "text-white"}
  `}
>
  Contact
</NavLink>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle text-white"
            >
              {theme === 'dark' ? <FaSun className="text-xl"/> : <MdDarkMode className="text-xl"/>}
            </button>

            {/* User Menu */}
            {user?.email ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL} alt={user.displayName} />
                  </div>
                </div>
                <ul className={`mt-3 p-2 shadow menu menu-compact dropdown-content rounded-box w-52 ${
                  theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'
                }`}>
                  <li><span>{user.displayName}</span></li>
                  <li><button onClick={handleLogOutUser}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="btn btn-ghost text-white"
              >
                Login
              </NavLink>
            )}

                        {/* Mobile Menu */}
            <div className="dropdown dropdown-end lg:hidden">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </label>
              
              <ul tabIndex={0} className={`
                menu menu-sm dropdown-content 
                mt-3 z-[1] p-2 shadow-lg rounded-box w-52
                ${theme === 'dark' 
                  ? 'bg-gray-800 text-white border border-gray-700' 
                  : 'bg-white text-gray-700 border border-gray-200'
                }
              `}>
                <li>
    <NavLink
      to="/"
      className={({ isActive }) =>
        `hover:underline ${isActive ? "font-bold text-blue-400" : 
        theme === 'dark' ? "text-gray-300" : "text-black"}`
      }
    >
      Home
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/queries"
      className={({ isActive }) =>
        `hover:underline ${isActive ? "font-bold text-blue-400" : 
        theme === 'dark' ? "text-gray-300" : "text-black"}`
      }
    >
      Queries
    </NavLink>
  </li>
  {user?.email ? (
    <>
      <li>
        <NavLink
          to="/recommendations-for-me"
          className={({ isActive }) =>
            `hover:underline ${isActive ? "font-bold text-blue-400" : 
            theme === 'dark' ? "text-gray-300" : "text-black"}`
          }
        >
          Recommendations
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-queries"
          className={({ isActive }) =>
            `hover:underline ${isActive ? "font-bold text-blue-400" : 
            theme === 'dark' ? "text-gray-300" : "text-black"}`
          }
        >
          Add Query
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-queries"
          className={({ isActive }) =>
            `hover:underline ${isActive ? "font-bold text-blue-400" : 
            theme === 'dark' ? "text-gray-300" : "text-black"}`
          }
        >
          My Queries
        </NavLink>
      </li>
    </>
  ) : (
    <li>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          `hover:underline ${isActive ? "font-bold text-blue-400" : 
          theme === 'dark' ? "text-gray-300" : "text-black"}`
        }
      >
        Login
      </NavLink>
    </li>
  )}
  <li>
  <NavLink
  onClick={(e) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    } else {
      window.location.href = '/#contact';
    }
  }}
  className={`
    hover:underline cursor-pointer
    ${theme === 'dark' ? "text-gray-300" : "text-white"}
  `}
>
  Contact
</NavLink></li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;