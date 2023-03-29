import React from "react";
import MovieItem from "./MovieItem";
import styles from "./movielist.module.scss";

const MovieList = ({ data, onOver }) => {
  return (
    <article className={styles.list}>
      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>영화명</th>
            <th>매출액</th>
            <th>관객수</th>
            <th>증감률</th>
          </tr>
        </thead>
        <tbody>
          {/* Movies.js에서 받은 데이터를 map으로 반복문 돌림 */}
          {/* 그리고 item을 MovieItem.js로 넘겨줌 */}
          {data.map((item) => (
            <MovieItem key={item.rank} item={item} onOver={onOver} />
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default MovieList;
