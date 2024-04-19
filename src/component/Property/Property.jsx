import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gridView, listView } from "../../Slice/propertySlice";
import "./Property.css";
import ReorderIcon from "@mui/icons-material/Reorder";
import GridViewIcon from "@mui/icons-material/GridView";
import Grid from "./Grid";
import List from "./List";
import FilterSection from "./FilterSection";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Breadcrumb from "../Helper/Breadcrumb";
import Loader from "../Helper/Loader";
import { fetchAllProperty } from "../../Action/propertyAction";
import { useSearchParams } from "react-router-dom";
import NoData from "../Images/noData.jpg";

const Property = () => {
  const { properties, loading, view, totalpropertycount } = useSelector(
    (state) => state.properties
  );
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [price, setPrice] = useState([0, 5000]);
  const [ratings, setRatings] = useState(0);
  const [filter, setFilter] = useState({
    sort_option: null,
    min_price: null,
    max_price: null,
    prop_type: searchParams.get("prop_type"),
    page: 1,
    keyword: searchParams.get("keyword"),
    posted: null,
    rating: null,
  });

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
    setFilter({ ...filter, min_price: price[0], max_price: price[1] });
  };
  const ratingHandler = (e) => {
    // setRatings(e.target.value);
    setFilter({ ...filter, rating: e.target.value });
  };
  const HandleChange = (e, selected) => {
    if (selected != null) {
      setFilter({ ...filter, sort_option: selected.name });
    }
  };
  const HandleType = (e) => {
    setFilter({ ...filter, prop_type: e.target.innerText });
  };

  const HandlePosted = (e, selected) => {
    if (selected != null) {
      setFilter({ ...filter, posted: selected.name });
    }
  };
  const setPageNo = (e) => {
    setFilter({ ...filter, page: e.target.innerText });
  };
  const GridView = () => {
    dispatch(gridView());
  };
  const ListView = () => {
    dispatch(listView());
  };
  const clearFilter = () => {
    setFilter({
      sort_option: null,
      min_price: null,
      max_price: null,
      prop_type: null,
      posted: null,
      rating: null,
      keyword: null,
    });
    setRatings(0);
    setPrice([0, 5000]);
  };
  useEffect(() => {
    dispatch(fetchAllProperty(filter));
  }, [dispatch, filter]);

  console.log(filter);
  return (
    <>
      <div className=" m-5 ">
        <div className="grey my-3">
          <Breadcrumb />
        </div>
        <div className="row ">
          <div
            className="col-lg-2 website-view "
            style={{ "border-right": "1px  solid var(--grey)" }}
          >
            <div className="main_filter">
              <FilterSection
                price={price}
                HandleChange={HandleChange}
                priceHandler={priceHandler}
                ratingHandler={ratingHandler}
                ratings={ratings}
                clearFilter={clearFilter}
                HandleType={HandleType}
                HandlePosted={HandlePosted}
              />
            </div>
           
          </div>

          <div className="col-lg-10  properties scrollable website-view">
            <div className=" ">
              <div className="sortDiv text-dark shadow-sm p-2 mb-5 bg-body-tertiary rounded d-flex justify-content-between align-items-center">
                <div></div>
                <h2 style={{ color: "var(--blue)" }}>
                  {" "}
                  Properties ({properties && properties.length})
                </h2>
                <div className="d-flex justify-content-between">
                  <div className="d-flex  mx-4">
                    <button
                      id="list"
                      onClick={ListView}
                      className={
                        view === "list" ? "activeList px-3 py-2 border-0" : ""
                      }
                    >
                      <ReorderIcon />
                    </button>
                    <button
                      id="grid"
                      onClick={GridView}
                      className={
                        view === "grid" ? "activeGrid px-3 py-2 border-0" : ""
                      }
                    >
                      <GridViewIcon />
                    </button>
                  </div>
                </div>
              </div>
              {properties && properties.length == 0 ? (
                <div className="d-flex justify-content-center align-itmes-center">
                  <img src={NoData} className="img-fluid no-data-img" />
                </div>
              ) : loading ? (
                <Loader />
              ) : (
                <div className="main-property row gy-5">
                  {view === "grid" ? (
                    <Grid properties={properties} />
                  ) : (
                    <List properties={properties} />
                  )}
                  <div className="d-flex justify-content-center">
                    <Stack spacing={2}>
                      <Pagination
                        count={Math.ceil(totalpropertycount / 25)}
                        variant="outlined"
                        shape="rounded"
                        onClick={setPageNo}
                      />
                    </Stack>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-12 properties scrollable mobile-view">
          <div className="mobile-filter" >
              <button
                class="btn btn-primary"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
              >
                Filters
              </button>

              <div
                class="offcanvas offcanvas-start"
                tabindex="-1"
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
              >
                <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasExampleLabel">
                    Offcanvas
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="offcanvas-body">
                  <FilterSection
                    price={price}
                    HandleChange={HandleChange}
                    priceHandler={priceHandler}
                    ratingHandler={ratingHandler}
                    ratings={ratings}
                    clearFilter={clearFilter}
                    HandleType={HandleType}
                    HandlePosted={HandlePosted}
                  />
                </div>
              </div>
            </div>
            <div className=" ">
              <div className="sortDiv text-dark shadow-sm p-2 mb-5 bg-body-tertiary rounded d-flex justify-content-between align-items-center">
                <div></div>
                <h2 style={{ color: "var(--blue)" }}>
                  {" "}
                  Properties ({properties && properties.length})
                </h2>
                <div className="d-flex justify-content-between">
                  <div className="d-flex  mx-4">
                    <button
                      id="list"
                      onClick={ListView}
                      className={
                        view === "list" ? "activeList px-3 py-2 border-0" : ""
                      }
                    >
                      <ReorderIcon />
                    </button>
                    <button
                      id="grid"
                      onClick={GridView}
                      className={
                        view === "grid" ? "activeGrid px-3 py-2 border-0" : ""
                      }
                    >
                      <GridViewIcon />
                    </button>
                  </div>
                </div>
              </div>
              {properties && properties.length == 0 ? (
                <div className="d-flex justify-content-center align-itmes-center">
                  <img src={NoData} className="img-fluid no-data-img" />
                </div>
              ) : loading ? (
                <Loader />
              ) : (
                <div className="main-property row gy-5">
                  {view === "grid" ? (
                    <Grid properties={properties} />
                  ) : (
                    <List properties={properties} />
                  )}
                  <div className="d-flex justify-content-center">
                    <Stack spacing={2}>
                      <Pagination
                        count={Math.ceil(totalpropertycount / 25)}
                        variant="outlined"
                        shape="rounded"
                        onClick={setPageNo}
                      />
                    </Stack>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Property;
