import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { addNewAdmin } from '../../apicalls/adminCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Error from '../../components/error/Error';
import Success from '../../components/success/Success';
import './addadmin.scss';

function AddAdmin() {
  const { admin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState({
    isError: false,
    errorMessage: '',
  });
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [formInputs, setFormInputs] = useState({
    name: '',
    email: '',
    phone: '',
    admin_level: 'Recorder',
    password: '',
    confirmPassword: '',
  });

  const handleFormInputChange = (event) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    });
    setSuccess(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorDetails({
      isError: false,
      errorMessage: '',
    });
    setSuccess(false);
    addNewAdmin(admin.token, formInputs)
      .then((res) => {
        /* Check if res is an error (isError === false) */
        if (res.isError === false) {
          setIsLoading(false);
          setErrorDetails({
            isError: false,
            errorMessage: '',
          });
          setSuccessMsg(`${formInputs.admin_level} added successfully.`);
          setSuccess(true);
          //Refresh form
          setFormInputs({
            name: '',
            email: '',
            phone: '',
            admin_level: 'Recorder',
            password: '',
            confirmPassword: '',
          });
        } else {
          console.log(res.message);
          setIsLoading(false);
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
        setIsLoading(false);
        setErrorDetails({
          isError: true,
          errorMessage: 'Something went wrong. Please try again later.',
        });
      });
  };

  return (
    <div className='add-admin-container'>
      <div className='top'>
        <div className='title-container'>
          <AddTaskIcon className='title-icon' />
          <h2>Add New Recorder/Moderator</h2>
        </div>
        <div className='btn-container'>
          <button className='btn' onClick={handleBackButtonClick}>
            Back
          </button>
        </div>
      </div>
      <div className='bottom'>
        <form onSubmit={(event) => handleSubmit(event)}>
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
              <option value='Recorder' selected>
                Recorder
              </option>
              <option value='Moderator'>Moderator</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='password'>
              Password
              <sup style={{ marginLeft: '5px', color: '#dc2626' }}>
                (required)
              </sup>
            </label>
            <input
              required={true}
              type='text'
              name='password'
              id='password'
              placeholder=''
              minLength={8}
              value={formInputs.password}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='confirmPassword'>
              Confirm Password
              <sup style={{ marginLeft: '5px', color: '#dc2626' }}>
                (required)
              </sup>
            </label>
            <input
              required={true}
              type='text'
              name='confirmPassword'
              id='confirmPassword'
              placeholder=''
              minLength={8}
              value={formInputs.confirmPassword}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          {errorDetails.isError && (
            <Error errorMsg={errorDetails.errorMessage} />
          )}
          {success && <Success successMsg={successMsg} />}
          <div className='form-btn-container'>
            <button className='btn' disabled={isLoading}>
              {!isLoading ? (
                <>Add {formInputs.admin_level}</>
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

export default AddAdmin;
