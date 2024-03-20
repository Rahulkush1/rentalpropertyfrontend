import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "./filterSection.css";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
function valuetext(value) {
  return `${value}°C`;
}

const SortingMethods = [
  { label: "Sort By Name", name: "name" },
  { label: "Sort By Lowest Price", name: "low_to_high" },
  { label: "Sort By Highest Price", name: "high_to_low" },
];

const Posted = [
  {label: "Owner", name: 'owner'},
  {label: "broker", name: 'broker'}
]

const propertyType = ["PG", "ROOM", "1BHK", "2BHK", "3BHK"];
const FilterSection = (props) => {
  const {
    price,
    priceHandler,
    ratingHandler,
    ratings,
    HandleChange,
    clearFilter,
    HandleType,
    HandlePosted
  } = props;
  
  return (
    <>
      <div className="filterBox p-4">
        <Box>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={SortingMethods}
            getOptionLabel={(option) => option.label}
            onChange={HandleChange}
            renderInput={(params) => (
              <TextField {...params} label="Sort By .." />
            )}
          />
        </Box>

        <hr style={{ color: "black" }} />
        <p className="text-dark fs-5">Price</p>
        <Box>
          <Slider
            size="small"
            getAriaLabel={() => "Temperature range"}
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={0}
            max={5000}
          />
        </Box>
        <hr style={{ color: "black" }} />
        <p className="text-dark fs-5">Type</p>
        <ul className="categoris">
          {propertyType &&
            propertyType.map((type, index) => (
              <li
                className="category-link"
                key={index}
                onClick={HandleType}
              >
                {type}
              </li>
            ))}
        </ul>

        {/* <fieldset>
          <legend>
            <p className="text-dark fs-5">Rating</p>
          </legend>
          <Slider
            aria-label="Small steps"
            getAriaValueText={valuetext}
            step={1}
            marks
            min={0}
            max={5}
            valueLabelDisplay="auto"
            value={ratings}
            // onChange={ratingHandler}
          />
        </fieldset> */}
        <hr style={{ color: "black" }} />
        <p className="text-dark fs-5">Posted By</p>
        <Box>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={Posted}
            getOptionLabel={(option) => option.label}
            onChange={HandlePosted}
            renderInput={(params) => (
              <TextField {...params} label="Posted By .." />
            )}
          />
        </Box>
        <Stack spacing={1}>
          <Rating name="half-rating" defaultValue={3} precision={0.5} onChange={ratingHandler} />
        </Stack>
        <div className="clear-filter text-center mt-4">
          <Button variant="outlined" onClick={clearFilter}>
            {" "}
            Clear <FilterAltOffIcon />{" "}
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterSection;


