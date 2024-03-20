import React from "react";
import './ReviewCard.css'

const ReviewCard = ({review}) => {

  return (
    <div class="card w-100 mb-3 border-0">
      <div class="card-body">
        
        <b class="card-title"><img src="https://picsum.photos/200/200" className="img-fluid review-profile-img me-1" alt="profile"  /> {review.user}</b>
        <p class="card-text ms-5 ">
         {review.review}
         {" "}
         {review.rating}

        </p>
      </div>
      <hr/>
    </div>
  );
};

export default ReviewCard;
