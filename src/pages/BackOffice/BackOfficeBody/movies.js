import { React, useState, useEffect } from "react";
import { getMovies, getMoviesCount } from "../../../api/Movies";
import styles from "./backOfficeBody.module.scss";
import cx from "classnames";
import { Button, Input, Modal, SearchInput } from "../../../components";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  TrashIcon,
} from "../../../assets/icon";
import BOmovieModal from "./BOmodal/BOmovieModal";
import { range } from "lodash-es";

//NOTE: 상수
const LIMIT = 10;
const title = ["영화제목", "개봉일", "평균평점", "수정"];

const BackOfficeMovies = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonNumber, setButtonNumber] = useState();
  const [movieData, setMovieData] = useState();
  const [Count, setCount] = useState();
  const [form, setForm] = useState();
  const [pageNationNumber, setPageNationNumber] = useState();
  const [selectedIds, setSelectedIds] = useState([]);

  //NOTE: 같은 로직을 가진 코드는 함수로 분리~
  const onSetData = (data, total) => {
    const totalPage = Math.ceil(total / LIMIT);
    setMovieData(data);
    setCount(total);
    setPageNationNumber(totalPage);
  };

  const responseData = async () => {
    const response1 = await getMovies(pageNumber, LIMIT);
    // const responseCount = await getMoviesCount();
    onSetData(response1.data.data, response1.data.paging.total);
  };

  const pageUp = () => {
    setPageNumber(pageNumber + 1);
  };
  const pageDown = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  const showModal = (id) => {
    return () => {
      setSelectedIds([id]);
      setModalOpen(true);
    };
  };

  //NOTE: 모달을 닫는 함수는 바깥에 있는 것이 편하다!
  const closeModal = () => {
    setSelectedIds([]);
    setModalOpen(false);
  };

  const onChange = (e) => {
    const { value } = e.currentTarget;
    setForm(value);
  };
  const onClickCheckBox = (id) => {
    return (e) => {
      const { checked } = e.currentTarget;
      if (checked) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds(selectedIds.filter((v) => v !== id));
      }
    };
  };

  //NOTE: 삭제 방법 (1)
  // selectedIds.forEach(()=>{
  //   삭제삭제~~~
  // })

  //NOTE: 삭제 방법 (2)
  // DELETE : /movies?ids=id1,id2
  // selectedIds.join(",");

  const onSearch = async (e) => {
    e.preventDefault();
    if (form.length < 2) {
      return alert("두 글자 이상을 검색해 주세요");
    }
    const response2 = await getMovies(1, LIMIT, form);
    //NOTE: 검색에서 페이지네이션 구현
    onSetData(response2.data.data, response2.data.paging.total);
  };

  //pageNationNumber => 20 => [1,~~,20]
  //NOTE: [lodash / lodash-es(사용)] -> 각종 utils성 함수가 있는 라이브러리
  // const pageNationNumbers = Array(pageNationNumber)
  //   .fill()
  //   .map((v, i) => i + 1);

  useEffect(() => {
    responseData();
  }, [pageNumber]);

  return (
    <>
      <header className={styles.header}>
        <h3 className={styles.mainTitle}>영화관리</h3>
        <form
          id="searchForm"
          className={cx(styles.searchInput, styles["iconLocation"])}
        >
          <Input
            onChange={onChange}
            name="title"
            value={form}
            placeholder="영화 제목을 두글자 이상 검색해주세요"
            className={styles.inputWrapper}
          />
          <button
            type="submit"
            form="searchForm"
            onClick={onSearch}
            className={cx(styles.button)}
          >
            <SearchIcon />
          </button>
        </form>
        <Button>
          삭제
          <TrashIcon />
        </Button>
      </header>

      {/* 표머리 */}
      <ul className={styles.title}>
        <li>선택</li>
        {title.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
      {/* 표 몸통 */}
      {/* //NOTE: table, th, tbody, tr, td  */}
      {/* //NOTE:  => div */}
      {!!movieData &&
        movieData.map((item, index) => {
          return (
            <ul className={styles.tableRow}>
              <li className={styles.checkbox}>
                <label className={styles.checkBox}>
                  <input
                    type="checkbox"
                    readOnly
                    hidden
                    checked={selectedIds.includes(item.id)}
                    onClick={onClickCheckBox(item.id)}
                  />
                  <CheckIcon />
                </label>
              </li>
              <li> {movieData[index].title} </li>
              <li> {movieData[index].releasedAt} </li>
              <li>
                {!!movieData[index].averageScore &&
                  movieData[index].averageScore.toFixed(1)}{" "}
              </li>
              <li>
                <Button
                  children="수정"
                  onClick={showModal(item.id)}
                  id={index}
                />
              </li>
            </ul>
          );
        })}
      <BOmovieModal
        className={styles.modal}
        modalOpen1={modalOpen}
        setModalOpen={setModalOpen}
        children="a"
        buttonChildren="수정"
        num={selectedIds[0]}
      />

      {/* 페이지네이션 */}
      {/* //TODO: 현재 페이지가 몇 페이지인지 확인할 수 있도록 */}
      {/* //TODO: 전체 영화 개수 대비 페이지 수가 일치할 수 있도록 */}
      {/* //TODO: Pagination 컴포넌트 분리 */}
      {/* //TODO: ul li 없어도 된다 */}
      <ul className={styles.pagination}>
        <li className={styles.prevIcon}>
          <ChevronLeftIcon className={styles.Icon} onClick={pageDown} />
        </li>
        {/* //NOTE: range(1,10) => [1,~~~,9] */}
        {range(1, pageNationNumber + 1).map((number, i) => (
          <li
            className="currentPage"
            key={i}
            onClick={() => setPageNumber(number)}
          >
            {number}
          </li>
        ))}
        <li className={styles.nextIcon}>
          <ChevronRightIcon className={styles.Icon} onClick={pageUp} />
        </li>
      </ul>
    </>
  );
};

export default BackOfficeMovies;
