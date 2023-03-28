import React from 'react';
 
 
// MovieList.js에서 넘어온 item을 받아줌
const MovieItem = ({item,onOver}) => {
 
    const {rank,movieNm,salesAmt,audiCnt,rankInten} = item
// 이미지 : thumbUrl
// 영화명 :movieNm​
// 개봉일 : openDt​
// 제작상태 :moviePrdtStat​
// 영화구분:movieType​
// 관람등급: watchGradeNm​
// 상영시간 :showTs​
// 제작국가:repNationCd​
// 감독:director​
// 장르:genre​
// 배급사: dtNm​
// 영화명 :movieNm​
// 매출액:salesAmt​
// 관객수:audiCnt​
// 증감: rankInten
 
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