import React, { useEffect, useState } from "react";
import Formatprice from "../Helper/FormatPrice";
import { useDispatch, useSelector } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import "./PropertyDetails.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WifiIcon from "./../Images/wifi.png";
import GymIcon from "./../Images/fitness.png";
import GardenIcon from "./../Images/garden.png";
import Parking from "./../Images/parking-lot.png";
import SwimmingPool from "./../Images/swimming-pool.png";
import FoodServiceIcon from "./../Images/catering.png";
import Breadcrumb from "../Helper/Breadcrumb";
import Loader from "../Helper/Loader";
import { CreatePropertyReview, fetchPropertyDetails } from "../../Action/propertyAction";
import ReviewCard from "../Helper/ReviewCard";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const PropertyDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { property, loading } = useSelector((state) => state.properties);
  
  const [reviews, setReviews] = useState({
    id: id
  });
  const HandleReview = (e) => {
    setReviews({...reviews, [e.target.name]: e.target.value})
  }

  const SubmitReview = async (e) => {
    e.preventDefault();
    dispatch(CreatePropertyReview(reviews));
    dispatch(fetchPropertyDetails(id));
    setReviews({ ...reviews, rating: 0, review: "" });
  }
  useEffect(() => {
    dispatch(fetchPropertyDetails(id));
  }, [dispatch, id]);


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="m-5">
          <div className="grey my-3">
            <Breadcrumb />
          </div>
          <div className="row">
            <div className="col-lg-9">
              <div className="row">
                <div className="col-lg-8">
                  <div className="property-img-slider">
                    <Swiper
                      spaceBetween={30}
                      centeredSlides={true}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={true}
                      modules={[Autoplay, Pagination, Navigation]}
                      className="mySwiper"
                    >
                      {property &&
                        property.avatar &&
                        property.avatar.map((data, index) => {
                          return (
                            <>
                              <SwiperSlide key={index}>
                                <img
                                  src={`http://localhost:5000/${data}`}
                                  alt=""
                                  className=" img-fluid property_img"
                                  style={{ width: "100%" }}
                                />
                              </SwiperSlide>
                            </>
                          );
                        })}
                    </Swiper>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="d-flex flex-column justify-content-between">
                    <img
                      src={`http://localhost:5000/${
                        property && property.avatar && property.avatar[0]
                      }`}
                      alt=""
                      className="img-fluid mb-3  property_img"
                    />
                    <img
                      src={`http://localhost:5000/${
                        property && property.avatar && property.avatar[0]
                      }`}
                      alt=""
                      className="img-fluid  property_img"
                    />
                  </div>
                </div>
                <h2 className="price text-dark my-2">
                  {" "}
                  <Formatprice price={property.price} />{" "}
                </h2>
                <div className="d-flex justify-content-between">
                  <p className="grey">
                    <LocationOnIcon className="pin_point" />{" "}
                    {property && property.address && property.address.street}{" "}
                    {property && property.address && property.address.city}{" "}
                    {property && property.address && property.address.state},{" "}
                    {property && property.address && property.address.country}
                  </p>
                  <Button
                    variant="contained"
                    className="fw-bold text-center fs-5 px-5 floating"
                  >
                    <LocalPhoneIcon className="mx-2 " /> Schedule Meeting
                  </Button>
                </div>
                <div
                  className="amenities  d-flex justify-content-around w-50 "
                  style={{ color: "var(--grey)" }}
                >
                  {property &&
                    property.amenities &&
                    property.amenities.map((data, index) => {
                      return (
                        <>
                          {index < 3 ? (
                            <p
                              key={index}
                              className="d-flex align-items-center"
                            >
                              {data.title.toLowerCase() === `wifi` ? (
                                <img
                                  src={WifiIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              ) : data.title.toLowerCase() ===
                                `gym facility` ? (
                                <img
                                  src={GymIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              ) : data.title.toLowerCase() === `garden area` ? (
                                <img
                                  src={GardenIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              ) : data.title.toLowerCase() ===
                                `food facility` ? (
                                <img
                                  src={WifiIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              ) : data.title.toLowerCase() ===
                                `parking area` ? (
                                <img
                                  src={Parking}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              ) : data.title.toLowerCase() === `ro water` ? (
                                <img
                                  src={WifiIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              ) : (
                                <img
                                  src={SwimmingPool}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              )}
                              <span className="mx-2">{data.title}</span>
                            </p>
                          ) : (
                            ""
                          )}
                        </>
                      );
                    })}
                </div>
                <div className="discription text-dark text-break my-4">
                  <h4 className="grey">Property Description</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Adipisci distinctio fuga veniam sed, sunt enim? Sit
                    obcaecati necessitatibus praesentium nihil vero itaque
                    exercitationem reiciendis delectus.
                  </p>
                </div>
                <div className="posted_by  grey my-3">
                  <div className="">
                    <h4>Posted By</h4>
                    <p className="posted">{property && property.posted}</p>
                  </div>
                </div>
                <div className="text-dark text-end">
                  <h3>
                    <Formatprice price={property.price} />
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div
                className="card border-primary mb-3"
                style={{ maxWidth: "28rem" }}
              >
                <div className="card-header">Header</div>
                <div className="card-body text-primary">
                  <h5 className="card-title">Primary card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <Button variant="outlined" className="">
                    {" "}
                    <LocalPhoneIcon className="mx-2" /> Contact here
                  </Button>
                </div>
              </div>
              <div
                className="card border-primary mb-3"
                style={{ maxWidth: "28rem" }}
              >
                <div className="card-header">Header</div>
                <div className="card-body text-primary">
                  <h5 className="card-title">Primary card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
              <div>
                <h3 className="my-4" style={{ color: "var(--grey)" }}>
                  Amenities
                </h3>
                <div className="row p-4">
                  {property &&
                    property.amenities &&
                    property.amenities.map((data, index) => {
                      return (
                        <>
                          <div className="col-lg-6 text-secondary">
                            <p
                              key={index}
                              className="d-flex  align-items-center"
                            >
                              {data.title.toLowerCase() === `wifi` ? (
                                <img
                                  src={WifiIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              ) : data.title.toLowerCase() ===
                                `gym facility` ? (
                                <img
                                  src={GymIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              ) : data.title.toLowerCase() === `garden area` ? (
                                <img
                                  src={GardenIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              ) : data.title.toLowerCase() ===
                                `food facility` ? (
                                <img
                                  src={FoodServiceIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              ) : data.title.toLowerCase() ===
                                `parking area` ? (
                                <img
                                  src={Parking}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              ) : data.title.toLowerCase() === `ro water` ? (
                                <img
                                  src={WifiIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              ) : (
                                <img
                                  src={SwimmingPool}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              )}
                              <span className="mx-2">{data.title}</span>
                            </p>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="grey text-center">Review </h4>
            <div>
              <p className="grey">Create Review</p>
              <div class="card w-25 mb-3 ">
                <div class="card-body">
                    <form onSubmit={SubmitReview}>
                      <div className="mb-3">
                        <p className="grey">Give Rating</p>
                        <Stack spacing={1}>
                          <Rating name="rating" value={reviews.rating} defaultValue={0} precision={0.5} onChange={HandleReview} />
                        </Stack>
                      </div>
                      <div className="mb-3">
                        <textarea rows="5" name="review" value={reviews.review} placeholder="Give Review.." className="form-control p-3"  onChange={HandleReview} />
                      </div>
                      <input type="submit" value="submit" className="btn btn-primary" />
                    </form>
                </div>
               
              </div>
            </div>

            {property &&
              property.reviews &&
              property.reviews.data &&
              property.reviews.data.map((review) => {
                console.log(review);
                return (
                  <div key={review.id}>
                    <ReviewCard review={review.attributes} />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyDetails;
