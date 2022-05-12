import { useNavigate, Link, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import Modal from '../../components/modal/Modal';
import { AuthContext } from '../../context/authContext/AuthContext';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { getJobDataById } from '../../apicalls/jobCalls';
import { getLogsForJob } from '../../apicalls/logCalls';
import Loader from '../../components/loader/Loader';
import JobEditMode from '../../components/job_edit_mode/JobEditMode';
import './singlejob.scss';

function SingleJob() {
  let { jobId } = useParams();
  const { admin } = useContext(AuthContext);
  const [jobInfo, setJobInfo] = useState(undefined);
  const [logs, setLogs] = useState(undefined);
  const [modalType, setModalType] = useState('');
  const [displayModal, setDisplayModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { settings } = useContext(SettingsContext);

  const getJobInfo = () => {
    getJobDataById(admin.token, jobId)
      .then((res) => {
        setJobInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLogs = () => {
    getLogsForJob(admin.token, jobId)
      .then((res) => {
        setLogs(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getJobInfo();
    getLogs();
  }, [jobId]);

  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    /* This 'if else statement' checks if there is a previous page the user opened, to go back to. Or if user opened this page directly and in this case there is no previous page, then send user back to home page when they click on the back button */
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
    }
  };

  const toggleModal = (type) => {
    setModalType(type);
    setDisplayModal(!displayModal);
  };

  return (
    <>
      {!jobInfo ? (
        <Loader />
      ) : (
        <div className='single-job'>
          <div className='top'>
            <div className='title-container'>
              <div className='title'>
                <InfoIcon className='title-icon' />
                <h2>Job Info</h2>
              </div>
              <button
                className='mobile-back-btn'
                onClick={handleBackButtonClick}
              >
                Back
              </button>
            </div>
            <div className='btn-container'>
              {editMode ? (
                <button className='btn' onClick={() => setEditMode(false)}>
                  Off Edit Mode
                </button>
              ) : (
                <button className='btn' onClick={() => setEditMode(true)}>
                  On Edit Mode
                </button>
              )}
              {admin.admin_level === 'Administrator' && (
                <>
                  {jobInfo.status !== 'Completed' && (
                    <button
                      className='btn'
                      onClick={() =>
                        toggleModal('change-job-status-to-completed')
                      }
                    >
                      Mark Job as completed
                    </button>
                  )}
                </>
              )}
              {settings && (
                <>
                  {admin.admin_level === 'Recorder' &&
                    settings.can_recorders_mark_jobs_as_completed && (
                      <>
                        {jobInfo.status !== 'Completed' && (
                          <button
                            className='btn'
                            onClick={() =>
                              toggleModal('change-job-status-to-completed')
                            }
                          >
                            Mark Job as completed
                          </button>
                        )}
                      </>
                    )}
                  {admin.admin_level === 'Moderator' &&
                    settings.can_moderators_mark_jobs_as_completed && (
                      <>
                        {jobInfo.status !== 'Completed' && (
                          <button
                            className='btn'
                            onClick={() =>
                              toggleModal('change-job-status-to-completed')
                            }
                          >
                            Mark Job as completed
                          </button>
                        )}
                      </>
                    )}
                </>
              )}
              <button className='back-btn' onClick={handleBackButtonClick}>
                Back
              </button>
            </div>
          </div>

          <Modal
            displayModal={displayModal}
            setDisplayModal={setDisplayModal}
            type={modalType}
            jobId={jobInfo._id}
            adminToken={admin.token}
            getJobInfo={getJobInfo}
            getLogs={getLogs}
          />

          <div className='below-top'>
            {editMode ? (
              <JobEditMode
                jobInfo={jobInfo}
                getJobInfo={getJobInfo}
                getLogs={getLogs}
              />
            ) : (
              <div className='card'>
                <div className='item'>
                  <div className='details'>
                    <h1 className='item-title'>{jobInfo.main_category}</h1>
                    <h2 className='item-subtitle'>
                      - {jobInfo.sub_categories}
                    </h2>
                    <div className='detail-item'>
                      <span className='item-key'>Client Name:</span>
                      <span className='item-value client-name'>
                        {jobInfo.client_name}
                      </span>
                    </div>
                    <div className='detail-item'>
                      <span className='item-key'>Payment Status:</span>
                      <span className='item-value payment'>
                        {jobInfo.payment_status}
                      </span>
                    </div>
                    <div className='detail-item'>
                      <span className='item-key'>Job ID:</span>
                      <span className='item-value'>{jobInfo.shorter_id}</span>
                    </div>
                    <div className='detail-item'>
                      <span className='item-key'>Start Date:</span>
                      <span className='item-value'>
                        {jobInfo.start_date.slice(0, 10)} (
                        {jobInfo.start_date.slice(11)})
                      </span>
                    </div>
                    <div className='detail-item'>
                      <span className='item-key'>Job Status:</span>
                      <span
                        className={`item-value status 
                ${jobInfo.status === 'Pending' && 'pending'} 
                ${jobInfo.status === 'Late' && 'late'} 
                ${jobInfo.status === 'Completed' && 'completed'}`}
                      >
                        <span>{jobInfo.status}</span>
                      </span>
                    </div>
                    {jobInfo.status !== 'Completed' &&
                      jobInfo.main_category !== 'Website Development' && (
                        <div className='detail-item'>
                          <span className='item-key'>How Late:</span>
                          <span className='item-value'>{jobInfo.how_late}</span>
                        </div>
                      )}

                    <div className='detail-item'>
                      <span className='item-key'>Designer Tag:</span>
                      <span className='item-value designer'>
                        {jobInfo.designer_tag}
                      </span>
                    </div>
                    <div className='detail-item'>
                      <span className='item-key'>Note:</span>
                      <span className='item-value'>
                        {jobInfo.note || 'Nil'}
                      </span>
                    </div>
                    <div className='detail-item'>
                      <span className='item-key'>Any Additional Info:</span>
                      <span className='item-value'>
                        {jobInfo.additional_info || 'NONE'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className='logs-title-container'>
              <SummarizeOutlinedIcon className='logs-title-icon' />
              <h2>Logs for this job</h2>
            </div>
            {!logs ? (
              <Loader />
            ) : (
              <div className='logs-container'>
                {logs.map((log) => (
                  <div className='log' key={log._id}>
                    <h4 className='log-date'>
                      {log.date.slice(0, 10)} ({log.time})
                    </h4>
                    <h3 className='log-title'>{log.title}</h3>
                    <p className='log-content'>{log.info}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default SingleJob;
