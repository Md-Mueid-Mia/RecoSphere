import React from "react";
import { Link } from "react-router-dom";

const MyQueriesCard = ({ query, deleteProduct }) => {
  //   console.log(query);
  const {
    UserName,
    boycottReason,
    email,
    photo,
    postDate,
    postTime,
    productBrand,
    productImageUrl,
    productName,
    queryTitle,
    recommendationCount,
    _id
  } = query;
  return (
    <div className="card bg-base-100  shadow-xl border p-4">
      <figure>
        <img src={productImageUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {productName}
          <div className="badge badge-primary">NEW</div>
        </h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions ">
          <button><Link to='/queryDetails' className="btn btn-primary">View Details</Link></button>
          <button> <Link to='/updateQuery' className="btn btn-primary">Update</Link></button>
          <button onClick={()=>deleteProduct(_id)}> <Link className="btn btn-primary">Delete </Link></button>
         
         
        </div>
      </div>
    </div>
  );
};

export default MyQueriesCard;
