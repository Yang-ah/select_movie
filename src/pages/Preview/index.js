import React, { useState } from "react";
import MovieView from "./MovieView";
import MovieList from "./MovieList";
import Modal from "./Modal";
import mdata from './movie.json'
import styles from './preview.module.scss'

const Preview = () => {

    const [ data ] = useState(mdata)
    const [ movieInfo , setMovieInfo ] = useState(data[0])
    const [ isShow , setIsShow ] = useState(false)

    const onOver = (id) =>{
        const num = data.findIndex(item => item.rank === id)
        setMovieInfo(data[num])
    }

    const onOpen = () =>{
        setIsShow(true)
    }
    const onClose = () => {
        setIsShow(false)
    }

  return (
    <>
    <div className={styles.previewBody}>
        <MovieView movieInfo={movieInfo} onOpen={onOpen} />
        <MovieList data={data} onOver={onOver}/>
        </div> 
        {
            isShow && <Modal onClose={onClose} movieInfo={movieInfo}/>
        }
    </>
  );
};

export default Preview;
