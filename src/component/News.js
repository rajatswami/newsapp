import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const { country, pageSize, category } = props;
    const apiKey = '419ee7e2a0a9419fbe91a7b0684d34f6';

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;

    try {
      setLoading(true);
      const response = await fetch(url);
      props.setProgress(30);
      const parsedData = await response.json();
      props.setProgress(70);

      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);

      props.setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
    document.title=`${capitalizeFirstLetter(props.category)}- NewsMonkey`;
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const { country, pageSize, category } = props;
    const apiKey = '419ee7e2a0a9419fbe91a7b0684d34f6';

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${nextPage}&pageSize=${pageSize}&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const parsedData = await response.json();

      setArticles(articles.concat(parsedData.articles || []));
      setTotalResults(parsedData.totalResults || totalResults);
      setPage(nextPage);
    } catch (error) {
      console.error("Error loading more news:", error);
    }
  };

  return (
    <div className="container my-3" style={{ overflowX: 'hidden' }}>
      <h2 className="text-center mb-4" style={{marginTop:'90px'}}>
        NewsMonkey - Top Headlines from {capitalizeFirstLetter(props.category)}
      </h2>

      {loading && articles.length === 0 && (
        <div className="d-flex justify-content-center my-5">
          <Spinner />
        </div>
      )}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={
          articles.length < totalResults ? (
            <div className="d-flex justify-content-center my-4">
              <Spinner />
            </div>
          ) : null
        }
      >
        <div className="row g-4">
          {articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title || ''}
                description={element.description || ''}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default News;
