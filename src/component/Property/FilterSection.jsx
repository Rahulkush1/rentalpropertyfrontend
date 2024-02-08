import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './filterSection.css'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function valuetext(value) {
    return `${value}°C`;
  }

const SortingMethods = [
    { label: 'Sort By Name', year: 1994 },
    { label: 'Sort By Lowest Price', year: 1972 },
    { label: 'Sort By Highest Price', year: 1974 }, 
  ];

const propertyType = [
  "PG",
  "ROOM",
  "1BHK",
  "2BHK",
  "3BHK",
];
const FilterSection = (props) => {
    const {price, priceHandler} = props;
    const [type,setType] = useState("")
    const [ratings,setRatings] = useState(0)
    const ratingHandler = (e, newRating) => {
      setRatings(newRating);
    };
  return (
   <>
			<div className="filterBox p-4">
        <Box> 
          <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={SortingMethods}
                
                renderInput={(params) => <TextField {...params} label="Sort By .." />}
          />
        </Box>
        <hr style={{'color': "black"}}/>
        <p className='text-dark fs-5'>Price</p>
        <Box >
            <Slider
                size="small"
                getAriaLabel={() => 'Temperature range'}
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={0}
                max={5000}
            />
        </Box>
        <hr style={{'color': "black"}}/>
        <p className='text-dark fs-5'>Type</p>
        <ul className="categoris">
					{propertyType.map((type,index) => (
						<li
							className="category-link"
							key={index}
							onClick={() => {
								setType(type);
							}}>
							{type}
						</li>
					))}
				</ul>
        <hr style={{'color': "black"}}/>

        <fieldset>
          <legend><p className='text-dark fs-5'>Rating</p></legend>
					<Slider
						aria-label="Small steps"
						getAriaValueText={valuetext}
						step={1}
						marks
						min={0}
						max={5}
						valueLabelDisplay="auto"
						value={ratings}
						onChange={ratingHandler}
					/>
				</fieldset>

			</div>
   </>
  )
}

export default FilterSection

