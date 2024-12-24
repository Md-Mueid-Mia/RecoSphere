import React from "react";
import { Link } from "react-router-dom";

const RecentQueriesCard = ({ query }) => {
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
        <img
          src={productImageUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body flex-none">
        <h2 className="card-title">
          {productName}
        </h2>
        <p>{productBrand}</p>
        <p>{queryTitle}</p>
        <p>Recommendation Count: {recommendationCount}</p>
        <div className="card-actions ">
          <button className="btn btn-primary"><Link to={`/queryDetails/${_id}`}>Recommend </Link></button>
        </div>
      </div>
    </div>
  );
};

export default RecentQueriesCard;
