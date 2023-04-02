import React, { useState } from "react";
import MainCarousel from "./MainCarousel";
import hdata from '../../mock_movie.json';
/* import { getMoviesTop } from "../../api/Movies"; */
import Modal1 from "./Modal";

const Main = () =>{
 
  const [ movies ] = useState(hdata);
  const [ movieInfo , setMovieInfo ] = useState(movies[0]);
  const [ isShow , setIsShow ] = useState(false);

  const onOver = (id) => {
    const num = hdata.findIndex(item=>item===id)
    setMovieInfo(hdata[num])       
}

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
        {
            isShow && <Modal1 onModalClose={onModalClose} movieInfo={movieInfo}  onOver={onOver}/>
        }
              

      </main>
    )
}

export default Main;