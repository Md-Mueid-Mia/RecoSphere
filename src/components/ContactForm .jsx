import React from "react";
import { RiMessage2Line } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { MdMailOutline } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
const ContactForm = () => {
  return (
    <div className="flex flex-col md:flex-row p-8 md:p-16">
      {/* Left Section */}
      <div className="bg-blue-700 text-white p-8 md:w-1/2 rounded-lg ">
        <h2 className="text-5xl font-bold mb-8 mt-4 flex gap-3"><RiMessage2Line /> Let's talk</h2>
        <div className="mb-6 pt-8">
          <div className="flex items-center mb-2">
            <span className="text-xl border rounded-full p-3"><CiLocationOn className="text-4xl"/></span>
            <p className="ml-4">
              <strong className="text-2xl">Our Location</strong>
              <br />
              <span className="text-lg">29832 Makenzie River</span>
            </p>
          </div>
        </div>
        <div className="mb-6 py-8">
          <div className="flex items-center mb-2">
            <span className="text-xl border rounded-full p-3"><MdMailOutline className="text-4xl"/></span>
            <p className="ml-4">
              <strong className="text-2xl">Email Address</strong>
              <br />
              <span className="text-lg">info@company.com</span>
            </p>
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <span className="text-xl border rounded-full p-3"><FiPhoneCall className="text-4xl"/></span>
            <p className="ml-4">
              <strong className="text-2xl">Telephone</strong>
              <br />
              <span className="text-lg">+1 (123) 456-7890</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 bg-gray-100 p-8 rounded-lg mt-8 md:mt-0 md:ml-8">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter your First Name"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter your Last Name"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter a valid email address"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Message
            </label>
            <textarea
              placeholder="Enter your message"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white rounded-lg p-2 font-semibold hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
