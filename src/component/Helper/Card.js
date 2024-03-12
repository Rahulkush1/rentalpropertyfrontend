
import React, { useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


export default function PropCard({ data }) {
  // const navigate = useNavigate();
  // const redirectUrl = () => {
  //   navigate();
  // };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={`http://localhost:5000/${data.attributes.avatar[0]}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.attributes.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across
          </Typography>
          <a href={`/properties/${data.attributes.id}`}>
            <Button
              variant="contained"
              className="mx-4 my-3"
             
            >
              Show
            </Button>
          </a>

          <Button variant="outlined" href="#contained-buttons">
            Schedule
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
