import Datatable from '../../components/datatable/Datatable';
import CheckIcon from '@mui/icons-material/Check';
import './jobslist.scss';

function CompletedJobs() {
  return (
    <div className='jobs-list-page-content'>
      <div className='top'>
        <div className='title-container completed-jobs'>
          <CheckIcon className='title-icon' />
          <h2>Completed Jobs</h2>
        </div>
      </div>

      <Datatable toDisplay='completed-jobs' />
    </div>
  );
}

export default CompletedJobs;
