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
    _id,
  } = query;
  return (
    <div className="card bg-base-100  shadow-xl border p-4">
      <figure>
        <div data-aos="zoom-in" data-aos-anchor-placement="center-center">
          <img
            src={productImageUrl}
            alt="Shoes"
            className="w-[255px] h-[255px]"
          />
        </div>
      </figure>

      <div className="card-body flex-none">
        <div data-aos="zoom-in" data-aos-anchor-placement="center-center">
          <h2 className="card-title">{productName}</h2>
          <p>{productBrand}</p>
          <p>{queryTitle}</p>
          <p>Recommendation Count: {recommendationCount}</p>
        </div>
        <div className="card-actions ">
          <div data-aos="zoom-in" data-aos-anchor-placement="center-center">
            <button className="btn btn-primary">
              <Link to={`/queryDetails/${_id}`}>Recommend </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentQueriesCard;
