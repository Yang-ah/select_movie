import React from "react";
import styles from "./poster.module.scss";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const Poster = ({ movie }) => {
  return (
    <div className={styles.wrapper}>
      <Card
        sx={{
          maxHeight: 450,
          maxWidth: 300,
          position: "relative",
          borderRadius: 2,
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia component="img" image={movie.image} />
        </Box>
      </Card>
    </div>
  );
};
export default Poster;
