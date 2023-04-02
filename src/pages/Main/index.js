import React, { useState } from "react";
import MainCarousel from "./MainCarousel";
import hdata from '../../mock_movie.json';
/* import { getMoviesTop } from "../../api/Movies"; */
import Modal1 from "./Modal";

const Main = () =>{
  
  /* const [topMovies, setTopMovies] = useState();

  const fetchTopMovies = async () => {
    const response = await getMoviesTop(
      "0151449f-d2ae-4753-a44c-79be9044f8ff"
    );

    setTopMovies(response.data);

  };

  useEffect(() => {
    fetchTopMovies();
  }, []); */
 
  

  const [ movies ] = useState(hdata);
  const [ movieInfo , setMovieInfo ] = useState(movies[0]);
  const [ isShow , setIsShow ] = useState(false);



  const onModalClick = () =>{
    setIsShow(true)
}
  const onModalClose = () => {
    setIsShow(false)
}
    
    return(
      <main>
        <div>
          <MainCarousel movieInfo={movieInfo} movies={movies} onModalClick={onModalClick} />
        </div>
                <Modal1 
                setIsShow={setIsShow} isShow={isShow}
                onModalClose={onModalClose} movieInfo={movieInfo}>
                </Modal1>
              

      </main>
    )
}

export default Main;