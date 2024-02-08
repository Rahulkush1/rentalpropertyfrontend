import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import {Button} from "@mui/material";
export default function PropCard({ data }) {
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
            <Button variant="contained" className="mx-4 my-3">Show</Button>
            <Button variant="outlined" href="#contained-buttons">
              Schedule
            </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
