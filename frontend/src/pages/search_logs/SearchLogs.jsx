import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authContext/AuthContext';
import { searchLogs } from '../../apicalls/logCalls';
import Loader from '../../components/loader/Loader';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Pagination from '@mui/material/Pagination';
import './searchlogs.scss';
function Logs() {
  const { admin } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState(
    sessionStorage.getItem('searchLogsQuery') || ''
  );
  const [logs, setLogs] = useState([]);
  const [logsToShow, setLogsToShow] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event, value) => {
    setPage(value);
    setLogsToShow(logs.slice((value - 1) * 100, value * 100));
  };

  useEffect(() => {
    setLogs('');
    if (searchQuery) {
      setIsLoading(true);
      searchLogs(admin.token, searchQuery)
        .then((res) => {
          setIsLoading(false);

          setLogs(res);
          setTotalPages(res.length / 100);
          setLogsToShow(res.slice(0, 100));
        })
        .catch((err) => {
          setIsLoading(false);

          console.log(err);
        });
    }
  }, []);

  let handleSearch = () => {
    setIsLoading(true);
    sessionStorage.setItem('searchLogsQuery', searchQuery);
    setLogs('');
    searchLogs(admin.token, searchQuery)
      .then((res) => {
        setIsLoading(false);
        setLogs(res);
        setTotalPages(res.length / 100);
        setLogsToShow(res.slice(0, 100));
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  let handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='search-logs-page-content'>
      <div className='top'>
        <div className='search'>
          <input
            type='search'
            placeholder='Search Logs by date, time, job id, title'
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyPress={handleEnterKeyPress}
          />
          <SearchOutlinedIcon
            className='navbar-search-icon'
            onClick={handleSearch}
          />
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='pagination'>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
            />
          </div>
          <div className='logs-container'>
            {!logs || logs.length < 1 ? (
              <div className='no-results'>
                <h2>No Results</h2>
              </div>
            ) : (
              <>
                {logsToShow.map((log) => (
                  <div className='log' key={log._id}>
                    <h4 className='log-date'>
                      {log.date.slice(0, 10)} ({log.time})
                    </h4>
                    <h3 className='log-title'>{log.title}</h3>
                    <p className='log-content'>{log.info}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Logs;
