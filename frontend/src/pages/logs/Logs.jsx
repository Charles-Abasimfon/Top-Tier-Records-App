import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext/AuthContext';
import { getLogs } from '../../apicalls/logCalls';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import Loader from '../../components/loader/Loader';
import Pagination from '@mui/material/Pagination';
import './logs.scss';
function Logs() {
  const { admin } = useContext(AuthContext);
  const [logs, setLogs] = useState(undefined);
  const [logsToShow, setLogsToShow] = useState(undefined);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    setLogsToShow(logs.slice((value - 1) * 100, value * 100));
  };

  useEffect(() => {
    getLogs(admin.token)
      .then((res) => {
        setLogs(res);
        setTotalPages(res.length / 100);
        setLogsToShow(res.slice(0, 100));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='logs-page-content'>
      <div className='top'>
        <div className='title-container'>
          <SummarizeOutlinedIcon className='title-icon' />
          <h2>Logs</h2>
        </div>
        <Link className='btn' to='/search-logs'>
          Search
        </Link>
      </div>
      {!logsToShow ? (
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
            {logsToShow.map((log) => (
              <div className='log' key={log._id}>
                <h4 className='log-date'>
                  {log.date.slice(0, 10)} ({log.time})
                </h4>
                <h3 className='log-title'>{log.title}</h3>
                <p className='log-content'>{log.info}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Logs;
