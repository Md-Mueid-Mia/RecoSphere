
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import AuthContext from '../../provider/AuthContext'
import { FaGoogle } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Login = () => {
  const { signIn, signInWitGoogle, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state || '/'

  // Existing handleGoogleSignIn and handleSignIn functions...

  // Google Signin
  const handleGoogleSignIn = async () => {
    signInWitGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user)
        navigate(location.state)
        toast.success('Successfully login your account.')
      })
      .catch((error) => {
        toast.error('Failed to login', error);
       
      });
  }

  // Email Password Signin
  const handleSignIn = async e => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value
    // console.log({ email, password })
   
      //User Login
       signIn(email, password)
       .then(res=>{
        const user = res.user
        setUser(user)
        // console.log(user);

         toast.success('Signin Successful')
         navigate(from, { replace: true })
       })
       .catch((error) => {
       toast.error('Error: ' + error);
       });
       
    
  }
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Left Side - Image */}
        <div className="md:w-1/2 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transform hover:scale-110 transition-transform duration-1000"
            style={{
              backgroundImage: `url('https://i.ibb.co.com/10t6dTf/login.webp')`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/50 to-blue-500/30" />
          </div>
          <div className="relative p-12 text-white">
            <h2 className="text-4xl font-bold mb-6">Welcome Back</h2>
            <p className="text-lg">Login to access your personalized recommendations</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="text-center mb-8">
            <img 
              src="https://i.ibb.co.com/r08sLfd/Reco-Sphere.png" 
              alt="RecoSphere" 
              className="h-12 mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Sign in to RecoSphere</h3>
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
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login