import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authContext/AuthContext';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { getLoggedInAdminData } from '../../apicalls/authCalls';
import Loader from '../../components/loader/Loader';
import './profile.scss';

function Profile() {
  const { admin } = useContext(AuthContext);
  const [adminInfo, setAdminInfo] = useState(undefined);

  useEffect(() => {
    getLoggedInAdminData(admin.token)
      .then((res) => {
        setAdminInfo(res);
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

  return (
    <>
      {!adminInfo ? (
        <Loader />
      ) : (
        <div className='profile'>
          <div className='top'>
            <div className='title-container'>
              <div className='title'>
                <AccountCircleOutlinedIcon className='title-icon' />
                <h2>Profile</h2>
              </div>
              <button
                className='mobile-back-btn'
                onClick={handleBackButtonClick}
              >
                Back
              </button>
            </div>
            <div className='btn-container'>
              {adminInfo.admin_level === 'Administrator' ? (
                <Link className='btn' to='/profile/edit'>
                  Edit Profile
                </Link>
              ) : (
                <Link className='btn' to='/profile/change-password'>
                  Change Password
                </Link>
              )}
              <button className='back-btn' onClick={handleBackButtonClick}>
                Back
              </button>
            </div>
          </div>

          <div className='below-top'>
            <div className='card'>
              <div className='item'>
                <div className='details'>
                  <h1 className='item-title'>{adminInfo.name}</h1>
                  <div className='detail-item'>
                    <span className='item-key'>Level:</span>
                    <span className='item-value'>{adminInfo.admin_level}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Id:</span>
                    <span className='item-value'>{adminInfo.shorter_id}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Status:</span>
                    <span
                      className={`item-value status 
                ${adminInfo.status === 'Active' && 'active'} 
                ${adminInfo.status === 'Suspended' && 'suspended'}`}
                    >
                      <span>{adminInfo.status}</span>
                    </span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Email:</span>
                    <span className='item-value'>{adminInfo.email}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Phone Number:</span>
                    <span className='item-value'>{adminInfo.phone || '-'}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Added on:</span>
                    <span className='item-value'>{adminInfo.added}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
