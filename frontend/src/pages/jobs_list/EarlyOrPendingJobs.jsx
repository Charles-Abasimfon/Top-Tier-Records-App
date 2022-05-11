import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Datatable from '../../components/datatable/Datatable';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { AuthContext } from '../../context/authContext/AuthContext';
import { SettingsContext } from '../../context/settings/SettingsContext';
import './jobslist.scss';

function EarlyOrPendingJobs() {
  const { admin } = useContext(AuthContext);
  const { settings } = useContext(SettingsContext);

  return (
    <div className='jobs-list-page-content'>
      <div className='top'>
        <div className='title-container early-pending-jobs'>
          <WorkOutlineOutlinedIcon className='title-icon' />
          <h2>Early / Pending Jobs</h2>
        </div>
        {settings && (
          <>
            {admin.admin_level === 'Recorder' &&
              settings.can_recorders_add_new_jobs && (
                <Link className='btn' to='/jobs/add-new'>
                  Add New
                </Link>
              )}
            {admin.admin_level === 'Moderator' &&
              settings.can_moderators_add_new_jobs && (
                <Link className='btn' to='/jobs/add-new'>
                  Add New
                </Link>
              )}
          </>
        )}
        {admin.admin_level === 'Administrator' && (
          <Link className='btn' to='/jobs/add-new'>
            Add New
          </Link>
        )}
      </div>

      <Datatable toDisplay='early-pending-jobs' />
    </div>
  );
}

export default EarlyOrPendingJobs;
