import { React, useState, useEffect } from 'react';
import styles from './backOfficeBody.module.scss';
import cx from 'classnames';
import { Button, Input } from '../../../components';
import { CheckIcon, SearchIcon, TrashIcon } from '../../../assets/icon';
import { getUsers, deleteUsers } from '../../../api/Users';
import BOpageNation from './BOpageNation/BOpageNation';
import BOuserModal from './BOmodal/BOuserModal';
import BOdeleteModal from './BOmodal/BOdeleteModal';
import { backOfficeTotalCount } from '../../../atom';
import { useRecoilState } from 'recoil';
import { getReviewsCount } from '../../../api/Reviews';

const title = ['가입일', '이메일', '닉네임', '수정', '탈퇴'];
const LIMIT = 10;

const BackOfficeUsers = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [usersData, setUsersData] = useState();
  const [Count, setCount] = useState();
  const [form, setForm] = useState();
  const [pageNationNumber, setPageNationNumber] = useState();
  const [selectedIDs, setSelectedIDs] = useState([]);
  const [selectIndex, setSelectIndex] = useState();
  const [totalCount, setTotalCount] = useRecoilState(backOfficeTotalCount);

  const onSetData = (data, total, reviewTotal) => {
    const totalPage = Math.ceil(total / LIMIT);
    setUsersData(data);
    setTotalCount({...totalCount, users:total, reviews:reviewTotal});
    setPageNationNumber(totalPage);
  };

  const responseData = async () => {
    const response1 = await getUsers(pageNumber, LIMIT);
    const reviewsCount = await getReviewsCount();
    onSetData(response1.data.data, response1.data.paging.total, 
      reviewsCount.data.count);
    //console.log(reviewsCount.data.count);
  };

  const onSearch = async (e) => {
    e.preventDefault();
    setPageNumber(1);
    const response2 = await getUsers(pageNumber, LIMIT, form);
    onSetData(response2.data.data, response2.data.paging.total);
  };

  const onSearchPageChange = async () => {
    const response2 = await getUsers(pageNumber, LIMIT, form);
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
  const deleteChecked = async () => {
    const ids = selectedIDs;
    try {
      for (const element of ids) {
        //NOTE: await 가 없어서 alert가 안떴다.
        await deleteUsers(element);
      }

      alert('회원 일괄 삭제 완료'); //왜 출력이 안되는 가...
    } catch (err) {
      const errData = err.response.data;
      alert(errData.message);
    }
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
        <h3 className={styles.mainTitle}> 유저관리 </h3>
        <form
          id="searchForm"
          className={cx(styles.searchInput, styles['iconLocation'])}
        >
          <Input
            onChange={onChange}
            name="title"
            value={form}
            placeholder="회원이름검색"
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
      <ul className={cx(styles.title, { [styles.users]: true })}>
        <li>선택</li>
        {title.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
      {/* 표 몸통 */}
      {!!usersData &&
        usersData.map((item, index) => {
          return (
            <ul className={cx(styles.tableRow, { [styles.users]: true })}>
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

              <li> {usersData[index].createdAt.slice(0, 10)} </li>
              <li> {usersData[index].email} </li>
              <li> {usersData[index].name} </li>

              <li>
                <Button
                  children="수정"
                  onClick={showModal(item, index)}
                  id={index}
                />
              </li>

              <li>
                <Button
                  children="탈퇴"
                  onClick={showModal2(item, index)}
                  id={index}
                />
              </li>
            </ul>
          );
        })}
      {selectIndex !== undefined && (
        <BOuserModal
          className={styles.modal}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          closeModal={closeModal}
          buttonChildren="수정"
          ID={selectedIDs[0]}
          setMovieData={setUsersData}
          selectedData={usersData[selectIndex]}
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
          userORreview="user"
        />
      )}
      {/* 페이지네이션 
TODO: 검색 후 페이지 변경시 검색한 데이터가 사라짐, 검색 후 페이지 변경이 안됨*/}
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

export default BackOfficeUsers;
