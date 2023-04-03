/*
import styles from './new.module.scss'
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { makeImagePath } from "../utils";
import { getMovies } from "../../api/Movies";

import Movie from "./Movie";



const rowVariants = {
  hidden: (direction) => ({
    x: direction > 0 ? window.outerWidth + 10 : -window.outerWidth - 10
  }), //initial
  visible: {
    x: 0
  }, //animate
  exit: (direction) => ({
    x: direction > 0 ? -window.outerWidth - 10 : window.outerWidth + 10
  }) //exit
};

const boxVariants = {
  normal: {
    scale: 1
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.3,
      duration: 0.4
    }
  }
};

const [moviedata , setMovieData] = useState();

const responseData = async ()=>{
    const response1 = await getMovies(page,20);
  
    setMovieData({
        id : response1.data.data[i].id,
        title : response1.data.data[i].title,
        releasedAt : response1.data.data[i].releasedAt,
        averageScore : response1.data.data[i].averageScore,
    })
  }
  useEffect(()=>{
    responseData();
  },[page]);
  


const offset = 6;

function New() {
  const navigate = useNavigate();
  const movieMatch = useMatch("/movies/:movieId");
  const [[index, direction], setIndex] = useState([0, 0]);
  const [leaving, setLeaving] = useState(false);

  const maxIndex = Math.floor((movieData?.results.length || 0) / offset) - 1;
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };

  const onClick = (newDirection) => {
    if (!leaving) {
      setIndex([index + newDirection, newDirection]);
      toggleLeaving();
    }
  };

  const onBoxClicked = (MovieId) => {
    navigate(`/movies/${MovieId}`);
  };

  return (
    <>
        <>
          <div className={styles.Wrapper}>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
              custom={direction}
            >
            <motion.div>
              <div className={styles.Row}>
                key={index}
                custom={direction}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  type: "tween",
                  duration: 3
                }}
                {movieData?.results
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <div className={styles.Box}
                      key={movie.id}
                      layoutId={movie.id + ""}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      onClick={() => onBoxClicked(movie.id)}
                    ></div>
                  ))}
              </div>
              </motion.div>
            </AnimatePresence>
            {index === 0 ? null : (
              <button
                className={styles.Button}
                onClick={() => onClick(-1)}
                style={{
                  left: 0,
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0.1))"
                }}
              >
                left
              </button>
            )}
            {index === maxIndex ? null : (
                <button
                  className={styles.Button}
              onClick={() => onClick(1)} style={{ right: 0 }}>
                right
              </button>
            )}
          </div>
          {movieMatch ? (
            <Movie movieId={movieMatch.params.movieId || ""} />
          ) : null}
        </>
    </>
  );
}

export default New;
*/