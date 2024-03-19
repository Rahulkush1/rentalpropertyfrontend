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
    prop_type:  null,
    page: 1,
    keyword: searchParams.get("keyword"),
  });
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
    setFilter({ ...filter, min_price: price[0], max_price: price[1] });
  };
  const ratingHandler = (e, newRating) => {
    setRatings(newRating);
  };
  const HandleChange = (e, selected) => {
    if (selected != null) {
      setFilter({ ...filter, sort_option: selected.name });
    }
  };
  const HandleType = (e) => {
    setFilter({...filter, prop_type: e.target.innerText })
  }
  
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
    });
    setPrice([0, 5000]);
  };
  useEffect(() => {
    dispatch(fetchAllProperty(filter));
  }, [dispatch, filter]);
  return (
    <>
      <div className=" m-5 ">
        <div className="grey my-3">
          <Breadcrumb />
        </div>
        <div className="row">
          <div
            className="col-lg-2 "
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
                HandleType= {HandleType}
              />
            </div>
          </div>
          <div className="col-lg-10 properties scrollable">
            <div className=" ">
              <div className="sortDiv text-dark shadow-sm p-2 mb-5 bg-body-tertiary rounded d-flex justify-content-between align-items-center">
                <div>
                  {/* <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "30ch" },
                      }}
                      noValidate
                      autoComplete="on"
                    >
                      <TextField
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                      />
                    </Box> */}
                </div>
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
              {loading ? (
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
