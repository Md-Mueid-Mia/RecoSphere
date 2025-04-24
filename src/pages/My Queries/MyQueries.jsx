

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch, FiGrid, FiList, FiTrash2, FiEdit2 } from "react-icons/fi";
import AuthContext from "../../provider/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useTheme } from "../../provider/ThemeProvider";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
const MyQueries = () => {
  const axiosSecure = useAxiosSecure();
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingQuery, setEditingQuery] = useState(null);
  const [editFormData, setEditFormData] = useState({
    productName: "",
    productBrand: "",
    productImageUrl: "",
    queryTitle: "",
    boycottReason: "",
  });

  useEffect(() => {
    getAllQueries();
  }, []);

  const getAllQueries = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get(`/queries/${user?.email}`);
      setQueries(response?.data);
    } catch (error) {
      console.error("Error fetching queries:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/delete/${id}`);
          getAllQueries();
          Swal.fire("Deleted!", "Your query has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete query.", "error");
        }
      }
    });
  };

  // Add these functions inside component
  const handleEditProduct = (query) => {
    setEditingQuery(query);
    setEditFormData({
      productName: query.productName,
      productBrand: query.productBrand,
      productImageUrl: query.productImageUrl,
      queryTitle: query.queryTitle,
      boycottReason: query.boycottReason,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateQuery = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/queries/${editingQuery._id}`, editFormData);
      setIsEditModalOpen(false);
      getAllQueries();
      Swal.fire("Updated!", "Query has been updated.", "success");
    } catch (error) {
      Swal.fire("Error!", "Failed to update query.", "error");
    }
  };

  const filteredQueries = queries.filter(
    (query) =>
      query.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.queryTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className={` pb-10 pt-20 px-4 md:px-8 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            My Queries
          </h1>
          <p className="text-lg opacity-80">
            Manage and track your product queries
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div
          className={`flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-lg ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } shadow-md`}
        >
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search queries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg outline-none ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                }`}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg ${
                view === "grid" ? "bg-blue-500 text-white" : ""
              }`}
            >
              <FiGrid size={20} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg ${
                view === "list" ? "bg-blue-500 text-white" : ""
              }`}
            >
              <FiList size={20} />
            </button>
          </div>
        </div>

        {/* Queries Grid/List */}
        {filteredQueries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <img
              src="/empty-state.svg"
              alt="No queries"
              className="w-48 mx-auto mb-6 opacity-50"
            />
            <h3 className="text-xl font-semibold mb-2">No queries found</h3>
            <p className="opacity-70">Start by adding your first query</p>
            <Link
              to="/add-query"
              className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add New Query
            </Link>
          </motion.div>
        ) : (
          <div
            className={`grid ${
              view === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            } gap-6`}
          >
            {filteredQueries.map((query, index) => (
              <motion.div
                key={query._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-6 rounded-lg shadow-lg ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-50"
                } transition-all duration-300`}
              >
                <div className="flex gap-4">
                  <img
                    src={query.productImageUrl || "/default-product.png"}
                    alt={query.productName}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      {query.productName}
                    </h3>
                    <p className="text-sm mb-2 opacity-70">
                      {query.queryTitle}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          theme === "dark"
                            ? "bg-blue-900 text-blue-300"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {query.productBrand}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => deleteProduct(query._id)}
                          className="p-2 rounded-full hover:bg-red-100 text-red-500 transition-colors"
                        >
                          <FiTrash2 />
                        </button>
                        {/* to={`/edit-query/${query._id}`} */}
                        <Link >
                          <button
                            onClick={() => handleEditProduct(query)}
                            className="p-2 rounded-full hover:bg-blue-100 text-blue-500 transition-colors"
                          >
                            <FiEdit2 />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Transition appear show={isEditModalOpen} as={Fragment}>
        <Dialog 
          as="div" 
          className="relative z-50" 
          onClose={() => setIsEditModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>
      
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={`
                  w-full max-w-2xl transform rounded-2xl p-6 text-left shadow-xl transition-all
                  ${theme === 'dark' 
                    ? 'bg-gray-800/90 border border-gray-700' 
                    : 'bg-white/90 border border-gray-200'
                  }
                  backdrop-blur-lg
                  before:absolute before:inset-0 before:rounded-2xl
                  before:bg-gradient-to-r before:from-blue-500/20 before:to-purple-500/20
                  before:opacity-50 before:-z-10
                `}>
                  <div className="relative">
                    <Dialog.Title className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                      Edit Query
                    </Dialog.Title>
      
                    <form onSubmit={handleUpdateQuery} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className={`block  ${theme === 'dark' 
                                  ? 'text-white' 
                                  : ''
                                } text-sm font-medium mb-2 opacity-80`}>Product Name</label>
                            <input
                              type="text"
                              value={editFormData.productName}
                              onChange={(e) => setEditFormData({...editFormData, productName: e.target.value})}
                              className={`w-full p-3 rounded-lg outline-none border 
                                ${theme === 'dark' 
                                  ? ' border-gray-600 focus:border-blue-500' 
                                  : 'bg-white/50 border-gray-200 focus:border-blue-500'
                                }
                                transition-colors duration-200
                              `}
                              required
                            />
                          </div>
      
                          <div>
                            <label className={`block  ${theme === 'dark' 
                                  ? 'text-white' 
                                  : ''
                                } text-sm font-medium mb-2 opacity-80`}>Brand</label>
                            <input
                              type="text"
                              value={editFormData.productBrand}
                              onChange={(e) => setEditFormData({...editFormData, productBrand: e.target.value})}
                              className={`w-full p-3 rounded-lg outline-none border 
                                ${theme === 'dark' 
                                  ? ' border-gray-600 focus:border-blue-500' 
                                  : 'bg-white/50 border-gray-200 focus:border-blue-500'
                                }
                                transition-colors duration-200
                              `}
                              required
                            />
                          </div>
      
                          <div>
                            <label className={`block  ${theme === 'dark' 
                                  ? 'text-white' 
                                  : ''
                                } text-sm font-medium mb-2 opacity-80`}>Image URL</label>
                            <input
                              type="url"
                              value={editFormData.productImageUrl}
                              onChange={(e) => setEditFormData({...editFormData, productImageUrl: e.target.value})}
                              className={`w-full p-3 rounded-lg outline-none border 
                                ${theme === 'dark' 
                                  ? ' border-gray-600 focus:border-blue-500' 
                                  : 'bg-white/50 border-gray-200 focus:border-blue-500'
                                }
                                transition-colors duration-200
                              `}
                              required
                            />
                          </div>
                        </div>
      
                        <div className="space-y-4">
                          <div>
                            <label className={`block  ${theme === 'dark' 
                                  ? 'text-white' 
                                  : ''
                                } text-sm font-medium mb-2 opacity-80`}>Query Title</label>
                            <input
                              type="text"
                              value={editFormData.queryTitle}
                              onChange={(e) => setEditFormData({...editFormData, queryTitle: e.target.value})}
                              className={`w-full p-3 rounded-lg outline-none border 
                                ${theme === 'dark' 
                                  ? ' border-gray-600 focus:border-blue-500' 
                                  : 'bg-white/50 border-gray-200 focus:border-blue-500'
                                }
                                transition-colors duration-200
                              `}
                              required
                            />
                          </div>
      
                          <div>
                            <label className={`block  ${theme === 'dark' 
                                  ? 'text-white' 
                                  : ''
                                } text-sm font-medium mb-2 opacity-80`}>Reason</label>
                            <textarea
                              value={editFormData.boycottReason}
                              onChange={(e) => setEditFormData({...editFormData, boycottReason: e.target.value})}
                              rows="5"
                              className={`w-full p-3 rounded-lg outline-none border 
                                ${theme === 'dark' 
                                  ? ' border-gray-600 focus:border-blue-500' 
                                  : 'bg-white/50 border-gray-200 focus:border-blue-500'
                                }
                                transition-colors duration-200
                              `}
                              required
                            ></textarea>
                          </div>
                        </div>
                      </div>
      
                      <div className="flex justify-end gap-4 mt-8">
                        <button
                          type="button"
                          onClick={() => setIsEditModalOpen(false)}
                          className={`px-6 py-2.5 rounded-lg border
                            ${theme === 'dark'
                              ? 'border-gray-600 hover:bg-gray-700 text-white'
                              : 'border-gray-200 hover:bg-gray-100'
                            }
                            transition-colors duration-200
                          `}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-opacity duration-200"
                        >
                          Update Query
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default MyQueries;
