import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SearchInput from '../../components/Common/SearchInput';
import styles from './search.module.scss';
import { getMovies } from '../../api/Movies';
import { useEffect, useState } from 'react';
import SearchCard from './SearchCard';

const SearchPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [searchResult, setSearchResult] = useState({
    keyword: params.keyword,
    results: [],
  });

  const [isSearching, setIsSearching] = useState(false);

  const fetchSearchedMovies = async () => {
    const response = await getMovies(1, 20, searchResult.keyword);
    setSearchResult({ ...searchResult, results: response.data.data });
    setIsLoading(false);
    console.log(searchResult.results);
  };

  useEffect(() => {
    fetchSearchedMovies();
  }, []);

  const onClick = () => {
    navigate(`/search/${searchResult.keyword}`);
    setIsLoading(true);
    fetchSearchedMovies();
    setIsSearching(false);
  };

  const onChange = (e) => {
    setSearchResult({ ...searchResult, keyword: e.currentTarget.value });
    setIsSearching(true);
  };

  return (
    <form className={styles.wrap}>
      {isLoading && <h1>열심히 검색중이에요 조금만 기다려주세요 ٩( ᐛ )و</h1>}
      {isLoading || (
        <>
          <SearchInput
            className={styles.searchInput}
            onClick={onClick}
            value={searchResult.keyword}
            onChange={onChange}
          />

          {searchResult.results.length === 0 && !isSearching && (
            <h1>
              '{searchResult.keyword}'에 대한 검색 결과가 없습니다. 다른
              제목으로 검색해보면 어떨까요 ?
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
