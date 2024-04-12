
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import {Button} from "@mui/material";
import { Link } from "react-router-dom";
import Formatprice from "./FormatPrice";
import './Card.css'

export default function PropCard({ data }) {
  return (
    <Link to={`/properties/${data.attributes.id}`} className="text-decoration-none" >
    <Card className="image-card"  >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={`http://localhost:5000/${data.attributes.avatar[0]}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className="card_title">
            {data.attributes.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" className="card_price">
            <Formatprice price={data.attributes.price} />
          </Typography>
          <Typography variant="body2" color="text.secondary" className="card-content" >
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across
          </Typography>
            <Button
              variant="contained"
              className="mx-4 my-3 card-btn"    
              style={{fontSize: '1vmax'}}
            >
              Show
            </Button>
              
          <Button variant="outlined" className="card-btn"   href="#contained-buttons" style={{fontSize: '1vmax'}}  >
            Schedule
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
  );
}

