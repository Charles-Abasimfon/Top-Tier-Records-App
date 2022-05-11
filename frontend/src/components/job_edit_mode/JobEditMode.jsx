import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { AuthContext } from '../../context/authContext/AuthContext';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import EditModal from './EditModal';
import './jobeditmode.scss';

function JobEditMode({ jobInfo, getJobInfo, getLogs }) {
  const [modalType, setModalType] = useState('');
  const [adminLevel, setAdminLevel] = useState('');
  const { settings } = useContext(SettingsContext);
  const { admin } = useContext(AuthContext);
  const [displayModal, setDisplayModal] = useState(false);
  const toggleModal = (type) => {
    setModalType(type);
    setDisplayModal(!displayModal);
  };

  const canPerformAction = (action) => {
    if (admin.admin_level === 'Administrator') {
      return true;
    }
    if (admin.admin_level === 'Recorder') {
      switch (action) {
        case 'change-main-category':
          return settings.can_recorders_change_job_main_category;
          break;
        case 'change-sub-category':
          return settings.can_recorders_change_job_sub_categories;
          break;
        case 'change-client-name':
          return settings.can_recorders_change_client_name;
          break;
        case 'change-payment-status':
          return settings.can_recorders_change_job_payment_status;
          break;
        case 'change-start-date':
          return settings.can_recorders_change_job_start_date;
          break;
        case 'change-designer-tag':
          return settings.can_recorders_reassign_jobs_to_other_designers;
          break;
        case 'change-additional-info':
          return settings.can_recorders_change_job_additional_info;
          break;

        default:
          return false;
          break;
      }
    }
    if (admin.admin_level === 'Moderator') {
      switch (action) {
        case 'change-main-category':
          return settings.can_moderators_change_job_main_category;
          break;
        case 'change-sub-category':
          return settings.can_moderators_change_job_sub_categories;
          break;
        case 'change-client-name':
          return settings.can_moderators_change_client_name;
          break;
        case 'change-payment-status':
          return settings.can_moderators_change_job_payment_status;
          break;
        case 'change-start-date':
          return settings.can_moderators_change_job_start_date;
          break;
        case 'change-designer-tag':
          return settings.can_moderators_reassign_jobs_to_other_designers;
          break;
        case 'change-additional-info':
          return settings.can_moderators_change_job_additional_info;
          break;
        default:
          return false;
          break;
      }
    }
  };

  return (
    <>
      {settings && (
        <div className='card'>
          <div className='item'>
            <div className='details'>
              <h1 className='item-title'>
                {jobInfo.main_category}{' '}
                {canPerformAction('change-main-category') && (
                  <EditSharpIcon
                    className='edit-icon'
                    onClick={() => toggleModal('change-main-category')}
                  />
                )}
              </h1>
              <h2 className='item-subtitle'>
                - {jobInfo.sub_categories}{' '}
                {canPerformAction('change-sub-category') && (
                  <EditSharpIcon
                    className='edit-icon'
                    onClick={() => toggleModal('change-sub-categories')}
                  />
                )}
              </h2>
              <div className='detail-item'>
                <span className='item-key'>Client Name:</span>
                <span className='item-value client-name'>
                  {jobInfo.client_name}
                  {canPerformAction('change-client-name') && (
                    <EditSharpIcon
                      className='edit-icon'
                      onClick={() => toggleModal('change-client-name')}
                    />
                  )}
                </span>
              </div>
              <div className='detail-item'>
                <span className='item-key'>Payment Status:</span>
                <span className='item-value payment'>
                  {jobInfo.payment_status}
                  {canPerformAction('change-payment-status') && (
                    <EditSharpIcon
                      className='edit-icon'
                      onClick={() => toggleModal('change-payment-status')}
                    />
                  )}
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
                  {canPerformAction('change-start-date') && (
                    <EditSharpIcon
                      className='edit-icon'
                      onClick={() => toggleModal('change-start-date')}
                    />
                  )}
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
                  {canPerformAction('change-designer-tag') && (
                    <EditSharpIcon
                      className='edit-icon'
                      onClick={() =>
                        toggleModal('reassign-job-to-another-designer')
                      }
                    />
                  )}
                </span>
              </div>
              <div className='detail-item'>
                <span className='item-key'>Any Additional Info:</span>
                <span className='item-value'>
                  {jobInfo.additional_info || 'NONE'}
                  {canPerformAction('change-additional-info') && (
                    <EditSharpIcon
                      className='edit-icon'
                      onClick={() => toggleModal('change-additional-info')}
                    />
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {displayModal && (
        <EditModal
          type={modalType}
          jobInfo={jobInfo}
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
          getJobInfo={getJobInfo}
          getLogs={getLogs}
        />
      )}
    </>
  );
}

export default JobEditMode;
