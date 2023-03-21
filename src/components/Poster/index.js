import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const Poster = ({ movie }) => {
  return (
    <Card sx={{ maxHeight: 297, maxWidth: 210, position: "relative" }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia component="img" image={movie.image} />
      </Box>
    </Card>
  );
};
export default Poster;
