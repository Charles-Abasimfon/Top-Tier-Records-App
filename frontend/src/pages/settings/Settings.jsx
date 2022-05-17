import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authContext/AuthContext';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { getSettings, updateSettings } from '../../apicalls/settingCalls';
import Loader from '../../components/loader/Loader';
import CircularProgress from '@mui/material/CircularProgress';
import Error from '../../components/error/Error';
import Success from '../../components/success/Success';
import './settings.scss';

function Settings() {
  const { admin } = useContext(AuthContext);
  const [settings, setSettings] = useState(undefined);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorDetails, setErrorDetails] = useState({
    isError: false,
    errorMessage: '',
  });
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    getSettings(admin.token)
      .then((res) => {
        setSettings(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    /* This 'if else statement' checks if there is a previous page the user opened, to go back to. Or if user opened this page directly and in this case there is no previous page, then send user back to home page when they click on the back button */
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
    }
  };

  const handleFormInputChange = (event) => {
    setSettings({
      ...settings,
      [event.target.name]: event.target.checked,
    });
    setSuccess(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsUpdating(true);
    setErrorDetails({
      isError: false,
      errorMessage: '',
    });
    setSuccess(false);
    updateSettings(admin.token, settings._id, settings)
      .then((res) => {
        /* Check if res is an error (isError === false) */
        if (res.isError === false) {
          setIsUpdating(false);
          setErrorDetails({
            isError: false,
            errorMessage: '',
          });
          setSuccessMsg(`Settings updated successfully.`);
          setSuccess(true);
          //Refresh form
        } else {
          console.log(res.message);
          setIsUpdating(false);
          setErrorDetails({
            isError: true,
            errorMessage: res.message,
          });
          setSuccessMsg('');
          setSuccess(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsUpdating(false);
        setErrorDetails({
          isError: true,
          errorMessage: 'Something went wrong. Please try again later.',
        });
      });
  };

  return (
    <>
      {!settings ? (
        <Loader />
      ) : (
        <div className='settings'>
          <div className='top'>
            <div className='title-container'>
              <div className='title'>
                <SettingsOutlinedIcon className='title-icon' />
                <h2>Settings</h2>
              </div>
              <button
                className='mobile-back-btn'
                onClick={handleBackButtonClick}
              >
                Back
              </button>
            </div>
            <div className='btn-container'>
              <button className='back-btn' onClick={handleBackButtonClick}>
                Back
              </button>
            </div>
          </div>

          <div className='below-top'>
            <div className='card'>
              <div className='item'>
                <div className='details'>
                  <h1 className='item-title'>System Settings</h1>
                  <form onSubmit={(event) => handleSubmit(event)}>
                    <h2 className='item-below-title'>
                      Customize Role Capabilities
                    </h2>
                    <h3 className='item-subtitle'>Recorders:</h3>
                    <div className='checkbox-group'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          onChange={(event) => handleFormInputChange(event)}
                          id='can_recorders_add_new_jobs'
                          name='can_recorders_add_new_jobs'
                          checked={settings.can_recorders_add_new_jobs}
                        />
                      </div>
                      <label for='can_recorders_add_new_jobs'>
                        Can recorders add new jobs.
                      </label>
                    </div>
                    <div className='checkbox-group'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          onChange={(event) => handleFormInputChange(event)}
                          id='can_recorders_mark_jobs_as_completed'
                          name='can_recorders_mark_jobs_as_completed'
                          checked={
                            settings.can_recorders_mark_jobs_as_completed
                          }
                        />
                      </div>
                      <label for='can_recorders_mark_jobs_as_completed'>
                        Can recorders mark jobs as completed.
                      </label>
                    </div>
                    <div className='checkbox-group'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          onChange={(event) => handleFormInputChange(event)}
                          id='can_recorders_reassign_jobs_to_other_designers'
                          name='can_recorders_reassign_jobs_to_other_designers'
                          checked={
                            settings.can_recorders_reassign_jobs_to_other_designers
                          }
                        />
                      </div>
                      <label for='can_recorders_reassign_jobs_to_other_designers'>
                        Can recorders re-assign jobs to other designers.
                      </label>
                    </div>
                    <div className='checkbox-group'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          onChange={(event) => handleFormInputChange(event)}
                          id='can_recorders_change_job_payment_status'
                          name='can_recorders_change_job_payment_status'
                          checked={
                            settings.can_recorders_change_job_payment_status
                          }
                        />
                      </div>
                      <label for='can_recorders_change_job_payment_status'>
                        Can recorders change job payment status (Half / Full).
                      </label>
                    </div>
                    <div className='checkbox-group'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          onChange={(event) => handleFormInputChange(event)}
                          id='can_recorders_change_job_main_category'
                          name='can_recorders_change_job_main_category'
                          checked={
                            settings.can_recorders_change_job_main_category
                          }
                        />
                      </div>
                      <label for='can_recorders_change_job_main_category'>
                        Can recorders change job main category.
                      </label>
                    </div>
                    <div className='checkbox-group'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          onChange={(event) => handleFormInputChange(event)}
                          id='can_recorders_change_job_sub_categories'
                          name='can_recorders_change_job_sub_categories'
                          checked={
                            settings.can_recorders_change_job_sub_categories
                          }
                        />
                      </div>
                      <label for='can_recorders_change_job_sub_categories'>
                        Can recorders change job sub categories.
                      </label>
                    </div>
                    <div className='checkbox-group'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          onChange={(event) => handleFormInputChange(event)}
                          id='can_recorders_change_job_start_date'
                          name='can_recorders_change_job_start_date'
                          checked={settings.can_recorders_change_job_start_date}
                        />
                      </div>
                      <label for='can_recorders_change_job_start_date'>
                        Can recorders change job start date.
                      </label>
                    </div>
                    <div className='checkbox-group'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          onChange={(event) => handleFormInputChange(event)}
                          id='can_recorders_change_job_additional_info'
                          name='can_recorders_change_job_additional_info'
                          checked={
                            settings.can_recorders_change_job_additional_info
                          }
                        />
                      </div>
                      <label for='can_recorders_change_job_additional_info'>
                        Can recorders change job additional info.
                      </label>
                    </div>
                    <div className='checkbox-group'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          onChange={(event) => handleFormInputChange(event)}
                          id='can_recorders_change_client_name'
                          name='can_recorders_change_client_name'
                          checked={settings.can_recorders_change_client_name}
                        />
                      </div>
                      <label for='can_recorders_change_client_name'>
                        Can recorders change client name in jobs.
                      </label>
                    </div>
                    <div className='checkbox-group'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          onChange={(event) => handleFormInputChange(event)}
                          id='can_recorders_change_job_note'
                          name='can_recorders_change_job_note'
                          checked={settings.can_recorders_change_job_note}
                        />
                      </div>
                      <label for='can_recorders_change_job_note'>
                        Can recorders change job note.
                      </label>
                    </div>
                    <h3 className='item-subtitle'>Moderators:</h3>
                    <div className='checkbox-group'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          onChange={(event) => handleFormInputChange(event)}
                          id='can_moderators_add_new_jobs'
                          name='can_moderators_add_new_jobs'
                          checked={settings.can_moderators_add_new_jobs}
                        />
                      </div>
                      <label for='can_moderators_add_new_jobs'>
                        Can moderators add new jobs.
                      </label>
                    </div>
                    <div className='checkbox-group'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          onChange={(event) => handleFormInputChange(event)}
                          id='can_moderators_mark_jobs_as_completed'
                          name='can_moderators_mark_jobs_as_completed'
                          checked={
                            settings.can_moderators_mark_jobs_as_completed
                          }
                        />
                      </div>
                      <label for='can_moderators_mark_jobs_as_completed'>
                        Can moderators mark jobs as completed.
                      </label>
                    </div>
                    <div className='checkbox-group'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          onChange={(event) => handleFormInputChange(event)}
                          id='can_moderators_reassign_jobs_to_other_designers'
                          name='can_moderators_reassign_jobs_to_other_designers'
                          checked={
                            settings.can_moderators_reassign_jobs_to_other_designers
                          }
                        />
                      </div>
                      <label for='can_moderators_reassign_jobs_to_other_designers'>
                        Can moderators re-assign jobs to other designers.
                      </label>
                    </div>
                    <div className='checkbox-group'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          onChange={(event) => handleFormInputChange(event)}
                          id='can_moderators_change_job_payment_status'
                          name='can_moderators_change_job_payment_status'
                          checked={
                            settings.can_moderators_change_job_payment_status
                          }
                        />
                      </div>
                      <label for='can_moderators_change_job_payment_status'>
                        Can moderators change job payment status (Half / Full).
                      </label>
                    </div>
                    <div className='checkbox-group'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          onChange={(event) => handleFormInputChange(event)}
                          id='can_moderators_change_job_main_category'
                          name='can_moderators_change_job_main_category'
                          checked={
                            settings.can_moderators_change_job_main_category
                          }
                        />
                      </div>
                      <label for='can_moderators_change_job_main_category'>
                        Can moderators change job main category.
                      </label>
                    </div>
                    <div className='checkbox-group'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          onChange={(event) => handleFormInputChange(event)}
                          id='can_moderators_change_job_sub_categories'
                          name='can_moderators_change_job_sub_categories'
                          checked={
                            settings.can_moderators_change_job_sub_categories
                          }
                        />
                      </div>
                      <label for='can_moderators_change_job_sub_categories'>
                        Can moderators change job sub categories.
                      </label>
                    </div>
                    <div className='checkbox-group'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          onChange={(event) => handleFormInputChange(event)}
                          id='can_moderators_change_job_start_date'
                          name='can_moderators_change_job_start_date'
                          checked={
                            settings.can_moderators_change_job_start_date
                          }
                        />
                      </div>
                      <label for='can_moderators_change_job_start_date'>
                        Can moderators change job start date.
                      </label>
                    </div>
                    <div className='checkbox-group'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          onChange={(event) => handleFormInputChange(event)}
                          id='can_moderators_change_job_additional_info'
                          name='can_moderators_change_job_additional_info'
                          checked={
                            settings.can_moderators_change_job_additional_info
                          }
                        />
                      </div>
                      <label for='can_moderators_change_job_additional_info'>
                        Can moderators change job additional info.
                      </label>
                    </div>
                    <div className='checkbox-group'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          onChange={(event) => handleFormInputChange(event)}
                          id='can_moderators_change_client_name'
                          name='can_moderators_change_client_name'
                          checked={settings.can_moderators_change_client_name}
                        />
                      </div>
                      <label for='can_moderators_change_client_name'>
                        Can moderators change client name in jobs.
                      </label>
                    </div>
                    <div className='checkbox-group'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          onChange={(event) => handleFormInputChange(event)}
                          id='can_moderators_change_job_note'
                          name='can_moderators_change_job_note'
                          checked={settings.can_moderators_change_job_note}
                        />
                      </div>
                      <label for='can_moderators_change_job_note'>
                        Can moderators change job note.
                      </label>
                    </div>
                    {errorDetails.isError && (
                      <Error errorMsg={errorDetails.errorMessage} />
                    )}
                    {success && <Success successMsg={successMsg} />}
                    <div className='form-btn-container'>
                      <button className='btn' disabled={isUpdating}>
                        {!isUpdating ? (
                          <>Save Settings</>
                        ) : (
                          <>
                            Loading{' '}
                            <CircularProgress
                              size={20}
                              style={{ marginLeft: '5px' }}
                            />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Settings;
