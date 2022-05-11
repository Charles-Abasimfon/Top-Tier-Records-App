import Datatable from '../../components/datatable/Datatable';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import './jobslist.scss';

function LateJobs() {
  return (
    <div className='jobs-list-page-content'>
      <div className='top'>
        <div className='title-container late-jobs'>
          <WorkHistoryOutlinedIcon className='title-icon' />
          <h2>Late Jobs</h2>
        </div>
      </div>

      <Datatable toDisplay='late-jobs' />
    </div>
  );
}

export default LateJobs;
