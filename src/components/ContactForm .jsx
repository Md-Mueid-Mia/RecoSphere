import React, { useState } from "react";
import { useTheme } from "../provider/ThemeProvider";
import { RiMessage2Line } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { MdMailOutline } from "react-icons/md";
import { FiPhoneCall, FiSend } from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const ContactForm = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Debug logging
    console.log('Form Data:', formData);

    try {
      // Detailed validation
      const { name, email, message } = formData;
      
      if (!name.trim()) {
        throw new Error('Name is required');
      }
      
      if (!email.trim()) {
        throw new Error('Email is required');
      }
      
      if (!message.trim()) {
        throw new Error('Message is required');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      // API call simulation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      toast.error(error.message);
      console.error('Form Error:', error);
    } finally {
      setLoading(false);
    }
};
  return (
    <div id="contact" className={`
      pt-10 pb-16 px-4 md:px-0
      ${theme === 'dark' ? 'bg-gray-900' : ''}
      transition-all duration-300
    `}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Left Section - Contact Info */}
          <div className={`
            p-8 md:p-12
            ${theme === 'dark' 
              ? 'bg-gradient-to-br from-blue-900 to-purple-900' 
              : 'bg-gradient-to-br from-blue-600 to-purple-600'}
          `}>
            <motion.h2 
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center gap-4"
            >
              <RiMessage2Line className="text-4xl" />
              Let's Connect
            </motion.h2>

            <div className="space-y-8">
              {[
                { icon: <CiLocationOn />, title: "Our Location", content: "29832 Makenzie River" },
                { icon: <MdMailOutline />, title: "Email Address", content: "info@company.com" },
                { icon: <FiPhoneCall />, title: "Phone Number", content: "+1 (555) 000-0000" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-center group"
                >
                  <span className="text-2xl p-4 rounded-full bg-white/10 text-white 
                    group-hover:bg-white/20 transition-all duration-300">
                    {item.icon}
                  </span>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="text-white/80">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className={`
            p-8 md:p-12
            ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
          `}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className={`block text-sm font-medium
                  ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}
                `}>
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  className={`
                    w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'}
                  `}
                />
              </div>

              <div className="space-y-2">
                <label className={`block text-sm font-medium
                  ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}
                `}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className={`
                    w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'}
                  `}
                />
              </div>

              <div className="space-y-2">
                <label className={`block text-sm font-medium
                  ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}
                `}>
                  Message
                </label>
                <textarea
                  rows="4"
                  required
                  className={`
                    w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'}
                  `}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2
                  transform transition-all duration-300
                  ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}
                  ${theme === 'dark' 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'}
                `}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <FiSend />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;