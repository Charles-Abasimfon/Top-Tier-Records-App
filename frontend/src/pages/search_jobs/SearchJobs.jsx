import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authContext/AuthContext';
import SearchDatatable from '../../components/search_datatable/SearchDatatable';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { searchJobs } from '../../apicalls/jobCalls';
import './searchjobs.scss';

function SearchJobs() {
  const { admin } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState(
    sessionStorage.getItem('searchQuery') || ''
  );
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs('');
    searchJobs(admin.token, searchQuery)
      .then((res) => {
        setJobs(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let handleSearch = () => {
    sessionStorage.setItem('searchQuery', searchQuery);
    setJobs('');
    searchJobs(admin.token, searchQuery)
      .then((res) => {
        setJobs(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='search-jobs-list-page-content'>
      <div className='top'>
        <div className='search'>
          <input
            type='search'
            placeholder='Search Jobs'
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

      <SearchDatatable searchQuery={searchQuery} jobs={jobs} />
    </div>
  );
}

export default SearchJobs;
