
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import { useTheme } from '../provider/ThemeProvider';

const Footer = () => {
   const { theme, toggleTheme } = useTheme();
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
    <footer className={`${theme === 'dark' ? darkColors.primary : lightColors.primary} text-white`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://i.ibb.co.com/r08sLfd/Reco-Sphere.png"
                alt="RecoSphere"
                className="w-12 h-12"
              />
              <span className="text-2xl font-bold">RecoSphere</span>
            </div>
            <p className="text-gray-300">
              Providing Product Recommendations since 1992
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="hover:text-blue-400 transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/queries" className="hover:text-blue-400 transition-colors">
                  Queries
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>123 Business Street</li>
              <li>New York, NY 10001</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@recosphere.com</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <div className="space-y-4">
              <p className="text-gray-300">Subscribe to our newsletter for updates</p>
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded  text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 py-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} RecoSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;