import { useNavigate, useParams } from 'react-router-dom';
import SearchInput from '../../components/Common/SearchInput';
import styles from './search.module.scss';
import { getMovies } from '../../api/Movies';
import { useEffect, useState } from 'react';
import SearchCard from './SearchCard';
import cx from 'classnames';

const SearchPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResult, setSearchResult] = useState({
    keyword: params.keyword,
    results: [],
  });

  const fetchSearchedMovies = async () => {
    const response = await getMovies(1, 20, searchResult.keyword);
    setSearchResult({ ...searchResult, results: response.data.data });
    setIsLoading(false);
  };

  const onChange = (e) => {
    setSearchResult({ ...searchResult, keyword: e.currentTarget.value });
    setIsSearching(true);
  };

  const onClick = async (e) => {
    if (searchResult.keyword.length === 0) {
      e.preventDefault();
      return alert('검색어를 입력해주세요 :)');
    }
    navigate(`/search/${searchResult.keyword}`);
    setIsLoading(true);
    await fetchSearchedMovies();
    setIsSearching(false);
  };

  useEffect(() => {
    fetchSearchedMovies();
  }, []);

  return (
    <form className={styles.wrap}>
      {isLoading && (
        <h1 className={cx(styles.statusText, styles.isLoading)}>
          열심히 검색중이에요. 조금만 기다려주세요 ٩( ᐛ )و
        </h1>
      )}
      {isLoading || (
        <>
          <SearchInput
            className={styles.searchInput}
            onClick={onClick}
            value={searchResult.keyword}
            onChange={onChange}
            placeholder="검색어를 입력하세요."
          />

          {searchResult.results.length === 0 && !isSearching && (
            <h1 className={styles.statusText}>
              <span className={styles.empty}>텅</span>
              <p>
                <span>'{searchResult.keyword}'</span> 에 대한 검색 결과가
                없습니다.
              </p>
              <p>다른 키워드로 검색해보면 어떨까요 ?</p>
            </h1>
          )}

          <section className={styles.moviesSection}>
            {searchResult.results.length === 0 ||
              searchResult.results.map((result) => {
                return (
                  <SearchCard
                    key={result.id}
                    movieId={result.id}
                    title={result.title}
                    averageScore={result.averageScore}
                    isLiked={result.isLiked}
                    postImage={result.postImage}
                  />
                );
              })}
          </section>
        </>
      )}
    </form>
  );
};

export default SearchPage;
