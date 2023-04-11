import { React, useState, useEffect } from 'react';
import styles from './backOfficeBody.module.scss';
import cx from 'classnames';
import { Button, Input, Modal } from '../../../components';
import { CheckIcon, SearchIcon, TrashIcon } from '../../../assets/icon';
import { deleteReviewAdmin, getReviews } from '../../../api/Reviews';
import BOpageNation from './BOpageNation/BOpageNation';
import BOreviewModal from './BOmodal/BOreviewModal';
import BOdeleteModal from './BOmodal/BOdeleteModal';

const title = ['작성일', '작성자', '작성내용', '더보기', '삭제'];
const LIMIT = 10;

const BackOfficeReviews = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [ReviewsData, setReviewsData] = useState();
  const [Count, setCount] = useState();
  const [form, setForm] = useState();
  const [pageNationNumber, setPageNationNumber] = useState();
  const [selectedIDs, setSelectedIDs] = useState([]);
  const [selectIndex, setSelectIndex] = useState();

  const onSetData = (data, total) => {
    const totalPage = Math.ceil(total / LIMIT);
    setReviewsData(data);
    setCount(total);
    setPageNationNumber(totalPage);
  };

  const responseData = async () => {
    const response1 = await getReviews(pageNumber, LIMIT);
    //const responseCount = await getReviewsCount();
    onSetData(response1.data.data, response1.data.paging.total);
  };

  const onSearch = async (e) => {
    e.preventDefault();
    setPageNumber(1);
    const response2 = await getReviews(1, LIMIT, form);
    onSetData(response2.data.data, response2.data.paging.total);
  };

  const onSearchPageChange = async () => {
    const response2 = await getReviews(pageNumber, LIMIT, form);
    onSetData(response2.data.data, response2.data.paging.total);
  };

  const pageUp = () => {
    if (pageNumber < pageNationNumber) {
      setPageNumber(pageNumber + 1);
    }
  };
  const pageDown = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  const showModal = (item, index) => {
    return () => {
      setSelectedIDs([item.id]);
      setSelectIndex(index);
      setModalOpen2(false);
      setModalOpen(true);
    };
  };
  const showModal2 = (item, index) => {
    return () => {
      setSelectedIDs([item.id]);
      setSelectIndex(index);
      setModalOpen(false);
      setModalOpen2(true);
    };
  };
  const closeModal = () => {
    setSelectedIDs([]);
    setModalOpen(false);
    setModalOpen2(false);
    responseData();
  };
  const onChange = (e) => {
    const { value } = e.currentTarget;
    setForm(value);
  };
  const onClickCheckBox = (id) => {
    return (e) => {
      const { checked } = e.currentTarget;
      if (checked) {
        setSelectedIDs([...selectedIDs, id]);
      } else {
        setSelectedIDs(selectedIDs.filter((x) => x !== id));
      }
    };
  };
  const deleteChecked = () => {
    const ids = selectedIDs;
    try {
      for (const element of ids) {
        const response = deleteReviewAdmin(element);
        if (response.status === 204) {
          alert('리뷰 일괄 삭제 완료');
          closeModal;
        }
      }
    } catch (err) {
      const errData = err.response.data;
      alert(errData.message);
    }
    closeModal();
  };

  useEffect(() => {
    if (!form) {
      responseData();
    } else {
      onSearchPageChange();
    }
  }, [pageNumber, modalOpen, modalOpen2]);

  return (
    <>
      <header className={styles.header}>
        <h3 className={styles.mainTitle}> 리뷰관리 </h3>
        <form
          id="searchForm"
          className={cx(styles.searchInput, styles['iconLocation'])}
        >
          <Input
            onChange={onChange}
            name="name"
            value={form}
            placeholder="리뷰 작성자 검색"
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
        <Button onClick={deleteChecked}>
          삭제
          <TrashIcon />
        </Button>
      </header>
      {/* 표머리 */}
      <ul className={cx(styles.title, { [styles.Reviews]: true })}>
        <li>선택</li>
        {title.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
      {/* 표 몸통 */}
      {!!ReviewsData &&
        ReviewsData.map((item, index) => {
          return (
            <ul className={cx(styles.tableRow, { [styles.Reviews]: true })}>
              <li className={styles.checkbox}>
                <label className={styles.checkBox}>
                  <input
                    type="checkbox"
                    readOnly
                    hidden
                    checked={selectedIDs.includes(item.id)}
                    onClick={onClickCheckBox(item.id)}
                  />
                  <CheckIcon />
                </label>
              </li>

              <li> {ReviewsData[index].createdAt.slice(0, 10)} </li>
              <li> {ReviewsData[index].user.name} </li>
              <li className={styles.content}> {ReviewsData[index].content} </li>

              <li>
                <Button
                  children="수정"
                  onClick={showModal(item, index)}
                  id={index}
                />
              </li>
              <li>
                <Button
                  children="삭제"
                  onClick={showModal2(item, index)}
                  id={index}
                />
              </li>
            </ul>
          );
        })}
      {selectIndex !== undefined && (
        <BOreviewModal
          className={styles.modal}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          closeModal={closeModal}
          buttonChildren="수정"
          ID={selectedIDs[0]}
          setMovieData={setReviewsData}
          selectedData={ReviewsData[selectIndex]}
          setSelectedIDs={setSelectedIDs}
        />
      )}
      {selectIndex !== undefined && (
        <BOdeleteModal
          className={styles.modal}
          modalOpen2={modalOpen2}
          setModalOpen2={setModalOpen2}
          buttonChildren="삭제"
          ID={selectedIDs[0]}
          setSelectedIDs={setSelectedIDs}
          userORreview="review"
        />
      )}

      {/* 페이지네이션 */}
      <BOpageNation
        pageDown={pageDown}
        pageNationNumber={pageNationNumber}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageUp={pageUp}
      />
    </>
  );
};

export default BackOfficeReviews;
