import React from "react";
import { Link } from "react-router-dom";

const MyQueries = () => {
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
            <p className="mb-3">Looking for Alternatives? Submit Your Query!
            </p>
            <button className="btn btn-primary"><Link to='/add-queries'>Add Queries</Link></button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default MyQueries;
