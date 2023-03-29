import React from 'react';
 
 
// MovieList.js에서 넘어온 item을 받아줌
const MovieItem = ({item,onOver}) => {
 
    const {rank,movieNm,salesAmt,audiCnt,rankInten} = item
 
    return (
        <tr onMouseOver={()=>onOver(rank)}>
            <td>{rank}</td>
            <td>{movieNm}</td>
            <td>{salesAmt}</td>
            <td>{audiCnt}</td>
            <td>
                {rankInten}
                {rankInten===0 && 'toto'}
                {rankInten>0 && 'nono'}
                {rankInten<0 && 'hoho'}
            </td>
        </tr>
    );
};
 
export default MovieItem;