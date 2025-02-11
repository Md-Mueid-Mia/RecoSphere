// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import toast from "react-hot-toast";
// import AuthContext from "../../provider/AuthContext";

// const Register = () => {
//   const navigate = useNavigate();
//   const { signInWitGoogle, createUser, updateUserProfile, setUser } =
//     useContext(AuthContext);
//   const regex = /^(?=.*[A-Z])(?=.*[a-z]).*$/;

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const email = form.email.value;
//     const name = form.name.value;
//     const photo = form.photo.value;
//     const pass = form.password.value;
//     // console.log({ email, pass, name, photo });
//     if (!regex.test(pass)) {
//       toast.error(
//         "Password must contain at least one uppercase and one lowercase letter."
//       );

//       return;
//     }
//     if (pass.length < 6) {
//       toast.error("Password must be at least 6 characters long.");
//     }

//     createUser(email, pass)
//       .then((result) => {
//         const user = result.user;
//         toast.success("Successfully account register");
//         setUser(user);
//         updateUserProfile({ displayName: name, photoURL: photo })
//           .then(() => {
//             // console.log("Profile updated successfully");
//             navigate("/");
//           })
//           .catch((error) => {
//             console.error("Error updating profile:", error);
//           });
//       })
//       .catch((error) => {
//         // console.log(error.code);
//         toast.error(error?.message);
//       });
//   };

//   // Google Signin
//   const handleGoogleSignIn = async () => {
//     signInWitGoogle()
//       .then((result) => {
//         const user = result.user;
//         navigate(location.state);
//         toast.success("Successfully login your account.");
//       })
//       .catch((error) => {});
//   };

//   return (
//     <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
//       <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl ">
//         <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
//           <div className="flex justify-center mx-auto">
//             <img
//               className="w-auto h-7 sm:h-8"
//               src="https://i.ibb.co.com/r08sLfd/Reco-Sphere.png"
//               alt=""
//             />
//           </div>

//           <p className="mt-3 text-xl text-center text-gray-600 ">
//             Get Your Free Account Now.
//           </p>

//           <div
//             onClick={handleGoogleSignIn}
//             className="flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg   hover:bg-gray-50 "
//           >
//             <div className="px-4 py-2">
//               <svg className="w-6 h-6" viewBox="0 0 40 40">
//                 <path
//                   d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
//                   fill="#FFC107"
//                 />
//                 <path
//                   d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
//                   fill="#FF3D00"
//                 />
//                 <path
//                   d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
//                   fill="#4CAF50"
//                 />
//                 <path
//                   d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
//                   fill="#1976D2"
//                 />
//               </svg>
//             </div>

//             <span className="w-5/6 px-4 py-3 font-bold text-center">
//               Sign in with Google
//             </span>
//           </div>

//           <div className="flex items-center justify-between mt-4">
//             <span className="w-1/5 border-b  lg:w-1/4"></span>

//             <div className="text-xs text-center text-gray-500 uppercase  hover:underline">
//               or Registration with email
//             </div>

//             <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
//           </div>
//           <form onSubmit={handleSignUp}>
//             <div className="mt-4">
//               <label
//                 className="block mb-2 text-sm font-medium text-gray-600 "
//                 htmlFor="name"
//               >
//                 Username
//               </label>
//               <input
//                 id="name"
//                 autoComplete="name"
//                 name="name"
//                 className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
//                 type="text"
//               />
//             </div>
//             <div className="mt-4">
//               <label
//                 className="block mb-2 text-sm font-medium text-gray-600 "
//                 htmlFor="photo"
//               >
//                 Photo URL
//               </label>
//               <input
//                 id="photo"
//                 autoComplete="photo"
//                 name="photo"
//                 className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
//                 type="text"
//               />
//             </div>
//             <div className="mt-4">
//               <label
//                 className="block mb-2 text-sm font-medium text-gray-600 "
//                 htmlFor="LoggingEmailAddress"
//               >
//                 Email Address
//               </label>
//               <input
//                 id="LoggingEmailAddress"
//                 autoComplete="email"
//                 name="email"
//                 className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
//                 type="email"
//               />
//             </div>

//             <div className="mt-4">
//               <div className="flex justify-between">
//                 <label
//                   className="block mb-2 text-sm font-medium text-gray-600 "
//                   htmlFor="loggingPassword"
//                 >
//                   Password
//                 </label>
//               </div>

//               <input
//                 id="loggingPassword"
//                 autoComplete="current-password"
//                 name="password"
//                 className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
//                 type="password"
//               />
//             </div>
//             <div className="mt-6">
//               <button
//                 type="submit"
//                 className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
//               >
//                 Sign Up
//               </button>
//             </div>
//           </form>

//           <div className="flex items-center justify-between mt-4">
//             <span className="w-1/5 border-b  md:w-1/4"></span>

//             <Link
//               to="/login"
//               className="text-xs text-gray-500 uppercase  hover:underline"
//             >
//               or sign in
//             </Link>

//             <span className="w-1/5 border-b  md:w-1/4"></span>
//           </div>
//         </div>
//         <div
//           className="hidden bg-cover bg-center lg:block lg:w-1/2"
//           style={{
//             backgroundImage: `url(${"https://i.ibb.co.com/10t6dTf/login.webp"})`,
//           }}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import toast from "react-hot-toast";
import AuthContext from "../../provider/AuthContext";
import { FaGoogle, FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();
  const { signInWitGoogle, createUser, updateUserProfile, setUser } =
    useContext(AuthContext);
  const regex = /^(?=.*[A-Z])(?=.*[a-z]).*$/;

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const photo = form.photo.value;
    const pass = form.password.value;
    // console.log({ email, pass, name, photo });
    if (!regex.test(pass)) {
      toast.error(
        "Password must contain at least one uppercase and one lowercase letter."
      );

      return;
    }
    if (pass.length < 6) {
      toast.error("Password must be at least 6 characters long.");
    }

    createUser(email, pass)
      .then((result) => {
        const user = result.user;
        toast.success("Successfully account register");
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            // console.log("Profile updated successfully");
            navigate("/");
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
          });
      })
      .catch((error) => {
        // console.log(error.code);
        toast.error(error?.message);
      });
  };

  // Google Signin
  const handleGoogleSignIn = async () => {
    signInWitGoogle()
      .then((result) => {
        const user = result.user;
        navigate(location.state);
        toast.success("Successfully login your account.");
      })
      .catch((error) => {});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl flex flex-col-reverse md:flex-row bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Left Side - Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="text-center mb-8">
            <img
              src="https://i.ibb.co.com/r08sLfd/Reco-Sphere.png"
              alt="RecoSphere"
              className="h-12 mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Create Your Account
            </h3>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300 mb-6"
          >
            <FaGoogle className="text-xl text-red-500" />
            <span className="font-medium">Continue with Google</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Or register with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Photo URL
                </label>
                <input
                  name="photo"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors duration-300"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300"
            >
              <FaUserPlus className="text-xl" />
              Create Account
            </motion.button>
          </form>

          <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2 relative overflow-hidden min-h-[200px] md:min-h-full">
          <div 
            className="absolute inset-0 bg-cover bg-center transform hover:scale-110 transition-transform duration-1000"
            style={{
              backgroundImage: `url('https://i.ibb.co.com/10t6dTf/login.webp')`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/50 to-blue-500/30" />
          </div>
          <div className="relative p-12 text-white">
            <h2 className="text-4xl font-bold mb-6">Join RecoSphere</h2>
            <p className="text-lg">Create an account to start sharing your recommendations</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;