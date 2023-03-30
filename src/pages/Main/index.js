import React, { useState } from "react";
import MainCarousel from "./MainCarousel";
import hdata from '../../mock_movie.json';
import Modal from "./Modal";

const Main = () =>{

  const [ movies ] = useState(hdata);
  const [ movieInfo , setMovieInfo ] = useState(movies[0]);
  const [ isShow , setIsShow ] = useState(false);

  const onOver = (id) =>{
    const num = movies.findIndex(item => item.id === id)
    setMovieInfo(movies[num])
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
          <MainCarousel movieInfo={movieInfo} movies={movies} onModalClick={onModalClick} onOver={onOver} />
        </div>
              {isShow &&(
                <Modal onModalClose={onModalClose} movieInfo={movieInfo} 
                modalOpen1={isShow} setIsShow={setIsShow}>
                </Modal>
              )} 
      </main>
    )
}

export default Main;