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
      <div data-aos="zoom-in" data-aos-duration="1500">

        <img src={productImageUrl} alt="Shoes" className="w-[255px] h-[255px]" />
</div>
      </figure>
      <div className="card-body flex-none">
      <div data-aos="zoom-in" data-aos-duration="1500">

        <h2 className="card-title">
          {productName}
        </h2>
        <p>{productBrand}</p>
        <p>{queryTitle}</p>
        <p>Recommendation: {recommendationCount}</p>
        <div className="flex flex-col md:flex-row gap-4">
          <button className="" ><Link to={`/queryDetails/${_id}`} className="btn mt-4 md:mt-0 btn-primary">View Details</Link></button>
          <button className="" > <Link to={`/updateQuery/${_id}`} className="btn btn-primary">Update</Link></button>
          <button className="" onClick={()=>deleteProduct(_id)}> <Link className="btn btn-primary">Delete </Link></button>
         
</div>
         
        </div>
      </div>
    </div>
  );
};

export default MyQueriesCard;
