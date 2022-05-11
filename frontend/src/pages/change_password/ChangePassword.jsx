import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext/AuthContext';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { updateLoggedInAdminPassword } from '../../apicalls/authCalls';
import CircularProgress from '@mui/material/CircularProgress';
import Error from '../../components/error/Error';
import './changepassword.scss';

function ChangePassword() {
  const { admin, dispatch } = useContext(AuthContext);
  const [formInputs, setFormInputs] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorDetails, setErrorDetails] = useState({
    isError: false,
    errorMessage: '',
  });

  const handleFormInputChange = (event) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    setIsUpdating(true);
    setErrorDetails({
      isError: false,
      errorMessage: '',
    });
    updateLoggedInAdminPassword(admin.token, formInputs, dispatch)
      .then((res) => {
        /* Check if res is an error (isError === true) */
        if (res.isError === false) {
          setIsUpdating(false);
          setErrorDetails({
            isError: false,
            errorMessage: '',
          });
        } else {
          console.log(res.message);
          setIsUpdating(false);
          setErrorDetails({
            isError: true,
            errorMessage: res.message,
          });
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

  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    /* This 'if else statement' checks if there is a previous page the user opened, to go back to. Or if user opened this page directly and in this case there is no previous page, then send user back to home page when they click on the back button */
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
    }
  };

  return (
    <div className='edit-profile-container'>
      <div className='top'>
        <div className='title-container'>
          <AccountCircleOutlinedIcon className='title-icon' />
          <h2>Change Password</h2>
        </div>
        <div className='btn-container'>
          <button className='btn' onClick={handleBackButtonClick}>
            Back
          </button>
        </div>
      </div>
      <div className='bottom'>
        <form onSubmit={handleUpdate}>
          <div className='form-group'>
            <label htmlFor='oldPassword'>
              Old Password
              <sup style={{ marginLeft: '5px', color: '#dc2626' }}>
                (required)
              </sup>
            </label>
            <input
              required={true}
              type='password'
              name='oldPassword'
              id='oldPassword'
              placeholder=''
              value={formInputs.oldPassword}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='newPassword'>
              New Password
              <sup style={{ marginLeft: '5px', color: '#dc2626' }}>
                (required)
              </sup>
            </label>
            <input
              required={true}
              type='password'
              name='newPassword'
              id='newPassword'
              placeholder=''
              minLength={8}
              value={formInputs.newPassword}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='confirmNewPassword'>
              Confirm New Password
              <sup style={{ marginLeft: '5px', color: '#dc2626' }}>
                (required)
              </sup>
            </label>
            <input
              required={true}
              type='password'
              name='confirmNewPassword'
              id='confirmNewPassword'
              placeholder=''
              minLength={8}
              value={formInputs.confirmNewPassword}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          {errorDetails.isError && (
            <Error errorMsg={errorDetails.errorMessage} />
          )}
          <div className='form-btn-container'>
            <button className='btn' disabled={isUpdating}>
              {!isUpdating ? (
                <>Update</>
              ) : (
                <>
                  Loading{' '}
                  <CircularProgress size={20} style={{ marginLeft: '5px' }} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
