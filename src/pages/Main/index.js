import React, { useState } from "react";
import MainCarousel from "./MainCarousel";
import hdata from '../../mock_movie.json';
import Modal1 from "./Modal";

const Main = () =>{

  const [ movies ] = useState(hdata)
  const [ movieInfo , setMovieInfo ] = useState(movies[0])
  const [ isShow , setIsShow ] = useState(false)

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
                <Modal1 
                setIsShow={setIsShow} isShow={isShow}
                onModalClose={onModalClose} movieInfo={movieInfo}>
                </Modal1>
              

      </main>
    )
}

export default Main;