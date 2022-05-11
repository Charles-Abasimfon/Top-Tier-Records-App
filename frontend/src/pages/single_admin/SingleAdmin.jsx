import { useNavigate, Link, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import Modal from '../../components/modal/Modal';
import TelegramIcon from '@mui/icons-material/Telegram';
import { AuthContext } from '../../context/authContext/AuthContext';
import { getRecorderOrModeratorDataById } from '../../apicalls/adminCalls';
import Loader from '../../components/loader/Loader';
import './singleadmin.scss';

function SingleAdmin() {
  let { adminId } = useParams();
  const { admin } = useContext(AuthContext);
  const [adminInfo, setAdminInfo] = useState(undefined);
  const [modalType, setModalType] = useState('');
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    getRecorderOrModeratorDataById(admin.token, adminId)
      .then((res) => {
        setAdminInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [adminId]);

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
      {!adminInfo ? (
        <Loader />
      ) : (
        <div className='single-admin'>
          <div className='top'>
            <div className='title-container'>
              <div className='title'>
                <InfoIcon className='title-icon' />
                <h2>{adminInfo.admin_level} Information</h2>
              </div>
              <button
                className='mobile-back-btn'
                onClick={handleBackButtonClick}
              >
                Back
              </button>
            </div>
            <div className='btn-container'>
              <Link
                className='btn'
                to={`/recorders-moderators/edit/${adminId}`}
              >
                Edit
              </Link>
              {adminInfo.status === 'Active' ? (
                <button
                  className='btn'
                  onClick={() => toggleModal('suspend-recorder-or-moderator')}
                >
                  Suspend
                </button>
              ) : (
                <button
                  className='btn'
                  onClick={() =>
                    toggleModal('reactivate-recorder-or-moderator')
                  }
                >
                  Reactivate
                </button>
              )}

              <button
                className='btn'
                onClick={() => toggleModal('delete-recorder-or-moderator')}
              >
                Delete {adminInfo.admin_level}
              </button>
              <button className='back-btn' onClick={handleBackButtonClick}>
                Back
              </button>
            </div>
          </div>

          <Modal
            displayModal={displayModal}
            setDisplayModal={setDisplayModal}
            type={modalType}
            adminId={adminInfo._id}
            adminToken={admin.token}
            setAdminInfo={setAdminInfo}
          />

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
                      className={`item-value admin-status 
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
                    <span className='item-key'>Added:</span>
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

export default SingleAdmin;
