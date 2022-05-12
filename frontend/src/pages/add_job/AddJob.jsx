import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { addNewJob } from '../../apicalls/jobCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Error from '../../components/error/Error';
import Success from '../../components/success/Success';
import './addjob.scss';

function AddJob() {
  const { admin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState({
    isError: false,
    errorMessage: '',
  });
  const [success, setSuccess] = useState(false);
  const [settingToBeEnforced, setSettingToBeEnforced] = useState('unknown');

  useEffect(() => {
    if (admin.admin_level === 'Recorder') {
      setSettingToBeEnforced('can_recorders_add_new_jobs');
    }
    if (admin.admin_level === 'Moderator') {
      setSettingToBeEnforced('can_moderators_add_new_jobs');
    }
  }, [admin.admin_level]);

  //Get todays date and time
  var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  var localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
  let today = localISOTime.slice(0, 16);

  const [formInputs, setFormInputs] = useState({
    client_name: '',
    payment_status: 'Half',
    main_category: 'Graphic Design',
    sub_categories: '',
    designer_tag: '',
    start_date: today,
    additional_info: '',
    note: 'Nil',
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
    addNewJob(admin.token, admin.name, {
      ...formInputs,
      settingToBeEnforced,
    })
      .then((res) => {
        /* Check if res is an error (isError === false) */
        if (res.isError === false) {
          setIsLoading(false);
          setErrorDetails({
            isError: false,
            errorMessage: '',
          });
          setSuccess(true);
          //Refresh form
          setFormInputs({
            client_name: '',
            sub_categories: '',
            designer_tag: '',
            start_date: today,
            additional_info: '',
            payment_status: formInputs.payment_status,
            main_category: formInputs.main_category,
            note: 'Nil',
          });
        } else {
          console.log(res.message);
          setIsLoading(false);
          setErrorDetails({
            isError: true,
            errorMessage: res.message,
          });
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
    <div className='add-job-container'>
      <div className='top'>
        <div className='title-container'>
          <AddIcon className='title-icon' />
          <h2>Add New Job</h2>
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
            <label htmlFor='client_name'>
              Client Name
              <sup style={{ marginLeft: '5px', color: '#dc2626' }}>
                (required)
              </sup>
            </label>
            <input
              required={true}
              type='text'
              name='client_name'
              id='client_name'
              placeholder=''
              value={formInputs.client_name}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='payment_status'>
              Payment Status
              <sup style={{ marginLeft: '5px', color: '#dc2626' }}>
                (required)
              </sup>
            </label>
            <select
              id='payment_status'
              name='payment_status'
              required
              onChange={(event) => handleFormInputChange(event)}
              value={formInputs.payment_status}
            >
              <option value='Half'>Half</option>
              <option value='Full'>Full</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='main_category'>
              Main Category
              <sup style={{ marginLeft: '5px', color: '#dc2626' }}>
                (required)
              </sup>
            </label>
            <select
              id='main_category'
              name='main_category'
              required
              onChange={(event) => handleFormInputChange(event)}
              value={formInputs.main_category}
            >
              <option value='Graphic Design'>Graphic Design</option>
              <option value='Website Development'>Website Development</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='sub_categories'>
              Sub Categories
              <sup style={{ marginLeft: '5px', color: '#dc2626' }}>
                (required)
              </sup>
            </label>
            <input
              required={true}
              type='sub_categories'
              name='sub_categories'
              id='sub_categories'
              placeholder={
                formInputs.main_category === 'Website Development'
                  ? 'ex: Business Website, Portfolio Website ...'
                  : 'ex: Full Package, Logo Design, Business Cards ...'
              }
              value={formInputs.sub_categories}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='designer_tag'>
              Designer Tag
              <sup style={{ marginLeft: '5px', color: '#dc2626' }}>
                (required)
              </sup>
            </label>
            <input
              required={true}
              type='text'
              name='designer_tag'
              id='designer_tag'
              placeholder='D1, D2, ... D50'
              value={formInputs.designer_tag}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='start_date'>
              Start Date
              <sup style={{ marginLeft: '5px', color: '#dc2626' }}>
                (required)
              </sup>
            </label>
            <input
              required={true}
              type='datetime-local'
              id='start_date'
              name='start_date'
              min='2022-01-01'
              value={formInputs.start_date}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='note'>Note</label>
            <select
              id='note'
              name='note'
              required
              onChange={(event) => handleFormInputChange(event)}
              value={formInputs.note}
            >
              <option value='Nil'>Nil</option>
              <option value='Delivered (Awaiting Client Response)'>
                Delivered (Awaiting Client Response)
              </option>
              <option value='Corrections (Awaiting Designers Delivery)'>
                Corrections (Awaiting Designers Delivery)
              </option>
            </select>
          </div>
          <div className='form-group textarea'>
            <label htmlFor='additional_info'>Any Additional Info</label>
            <textarea
              name='additional_info'
              id='additional_info'
              placeholder='Optional'
              rows={3}
              value={formInputs.additional_info}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          {errorDetails.isError && (
            <Error errorMsg={errorDetails.errorMessage} />
          )}
          {success && <Success successMsg='Job added successfully' />}
          <div className='form-btn-container'>
            <button className='btn' disabled={isLoading}>
              {!isLoading ? (
                <>Add Job</>
              ) : (
                <>
                  Loading
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

export default AddJob;
