import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../provider/AuthContext";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import RecentQueriesCard from "../RecentQueriesCard";
import { FaExclamationTriangle } from "react-icons/fa";
import MyQueriesCard from "./MyQueriesCard";
import Swal from "sweetalert2";

const MyQueries = () => {
  const [queries, setQueries] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getAllQueries();
  }, [axiosSecure]);

  const getAllQueries = () => {
    axiosSecure
      .get(`/queries/${user?.email}`)
      .then((response) => {
        setQueries(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  console.log(queries);


  const deleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete/${id}`)
        
          // .then((response) => console.log(response))
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            setQueries(queries.filter((query) => query._id !== id));
          });
      }
    });
  };



  return (
    <div className="min-h-[calc(100vh-390px)]">
      <div
        className="hero md:h-[300px]"
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/ftGTWG9/medium-shot-people-working-with-computers.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-3 text-2xl md:text-4xl font-bold">Hello there</h1>
            <p className="mb-3">Looking for Alternatives? Submit Your Query!</p>
            <button className="btn btn-primary">
              <Link to="/add-queries">Add Queries</Link>
            </button>
          </div>
        </div>
      </div>

      <div className="my-12">
        {queries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {queries.map((query, index) => (
              <MyQueriesCard key={index} query={query} deleteProduct={deleteProduct}/>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 bg-gray-100">
            <div className="text-center">
              <FaExclamationTriangle className="text-red-500 mx-auto text-6xl mb-4" />
              <h1 className="text-4xl font-bold mb-2 ">
                <img
                  className="mx-auto"
                  src="https://i.ibb.co.com/dmmCnKq/Main-Scene.gif"
                  alt=""
                />
              </h1>
              <p className="text-xl  mb-6">
                Oops! The page data doesn’t exist.
              </p>
              <Link
                to="/src/routes/router.jsx"
                className="btn btn-primary px-6 py-2 rounded-lg shadow-md"
              >
                Go Back Add Query
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyQueries;
