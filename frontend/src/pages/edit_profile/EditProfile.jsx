import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext/AuthContext';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {
  getLoggedInAdminData,
  updateLoggedInAdminData,
} from '../../apicalls/authCalls';
import Loader from '../../components/loader/Loader';
import CircularProgress from '@mui/material/CircularProgress';
import Error from '../../components/error/Error';
import './editprofile.scss';

function EditProfile() {
  const { admin, dispatch } = useContext(AuthContext);
  const [formInputs, setFormInputs] = useState(undefined);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorDetails, setErrorDetails] = useState({
    isError: false,
    errorMessage: '',
  });

  useEffect(() => {
    getLoggedInAdminData(admin.token)
      .then((res) => {
        setFormInputs({
          name: res.name,
          email: res.email,
          phone: res.phone,
          admin_level: res.admin_level,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [admin.token]);

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
    updateLoggedInAdminData(admin.token, formInputs, dispatch)
      .then((res) => {
        /* Check if res is an error (isError === true) */
        if (res.isError === false) {
          setIsUpdating(false);
          setErrorDetails({
            isError: false,
            errorMessage: '',
          });
          navigate('/profile', { replace: true });
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
    <>
      {!formInputs ? (
        <Loader />
      ) : (
        <div className='edit-profile-container'>
          <div className='top'>
            <div className='title-container'>
              <AccountCircleOutlinedIcon className='title-icon' />
              <h2>Edit Profile</h2>
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
                <label htmlFor='name'>
                  Full Name
                  <sup style={{ marginLeft: '5px', color: '#dc2626' }}>
                    (required)
                  </sup>
                </label>
                <input
                  required={true}
                  type='text'
                  name='name'
                  id='name'
                  placeholder=''
                  value={formInputs.name}
                  onChange={(event) => handleFormInputChange(event)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>
                  Email Address
                  <sup style={{ marginLeft: '5px', color: '#dc2626' }}>
                    (required)
                  </sup>
                </label>
                <input
                  required={true}
                  type='email'
                  name='email'
                  id='email'
                  placeholder=''
                  value={formInputs.email}
                  onChange={(event) => handleFormInputChange(event)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='phone'>Phone Number</label>
                <input
                  type='tel'
                  name='phone'
                  id='phone'
                  placeholder=''
                  value={formInputs.phone}
                  onChange={(event) => handleFormInputChange(event)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='admin_level'>
                  Select Admin Level
                  <sup style={{ marginLeft: '5px', color: '#dc2626' }}>
                    (required)
                  </sup>
                </label>
                <select
                  id='admin_level'
                  name='admin_level'
                  required
                  onChange={(event) => handleFormInputChange(event)}
                  value={formInputs.admin_level}
                >
                  <option value='Recorder'>Recorder</option>
                  <option value='Moderator'>Moderator</option>
                </select>
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
                      <CircularProgress
                        size={20}
                        style={{ marginLeft: '5px' }}
                      />
                    </>
                  )}
                </button>
              </div>
              <Link
                to='/profile/change-password'
                style={{
                  display: 'block',
                  textAlign: 'center',
                  color: '#6b7280',
                  fontWeight: '600',
                  marginTop: '20px',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                Change Password?
              </Link>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile;
