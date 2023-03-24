import Board from './Table'

const BOPage = () => {
  return (
    <section>
      <div>관리자화면</div>
      <Board bh_1={'선택'}
      bh_2={'영화'}
      bh_3={'감독'}
      bh_4={'장르'}
      bh_5={'개봉일자'}
      bh_6={'평균평점'}
      bh_7={'좋아요수'}
      />
    </section>
  );
};

export default BOPage;
