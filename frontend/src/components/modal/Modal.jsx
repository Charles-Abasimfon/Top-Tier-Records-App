import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import InfoIcon from '@mui/icons-material/Info';
import {
  updateRecorderOrModeratorStatusToActiveOrInactiveById,
  deleteRecorderOrModeratorById,
} from '../../apicalls/adminCalls';
import {
  updateJobStatusToCompletedById,
  deleteJobById,
} from '../../apicalls/jobCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './modal.scss';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  bgcolor: '#fff',
  border: '2px solid #1e293b',
  boxShadow: 10,
  p: 4,
};

function ModalComponent(props) {
  const { admin } = useContext(AuthContext);
  const navigate = useNavigate();
  const modalContainerRef = useRef();
  const [modalContents, setModalContents] = useState({
    title: '',
    text: '',
    buttonText: '',
    buttonAction: () => {},
  });
  const {
    displayModal,
    setDisplayModal,
    type,
    adminId,
    adminToken,
    setAdminInfo,
    jobId,
    shorterId,
    getJobInfo,
    getLogs,
  } = props;
  const handleClose = () => setDisplayModal(false);

  //@Desc Handle Suspend/Re-Activate recorder/moderator
  const handleSuspendOrReactivateRecorderOrModerator = (type) => {
    updateRecorderOrModeratorStatusToActiveOrInactiveById(
      adminToken,
      adminId,
      type
    )
      .then((res) => {
        /* Check if res is an error (isError === true) */
        if (res.isError === false) {
          setAdminInfo({ ...res });
          handleClose();
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //@Desc Handle Delete recorder/moderator
  const handleDeleteRecorderOrModerator = () => {
    deleteRecorderOrModeratorById(adminToken, adminId)
      .then((res) => {
        handleClose();
        navigate('/recorders-moderators/all', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //@Desc Handle Delete Job
  const handleDeleteJob = () => {
    deleteJobById(adminToken, jobId, shorterId, admin.name)
      .then((res) => {
        const notify = () =>
          toast.success('Job deleted successfully.', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        notify();
        handleClose();
        navigate(-1);
      })
      .catch((err) => {
        const notify = () =>
          toast.error(`ERROR: Failed to delete.`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        notify();
        console.log(err);
      });
  };

  //@Desc Handle Mark Job as Completed
  const handleMarkJobAsCompleted = (type) => {
    updateJobStatusToCompletedById(
      adminToken,
      jobId,
      admin.name,
      admin.admin_level
    )
      .then((res) => {
        /* Check if res is an error (isError === true) */
        if (res.isError === false) {
          const notify = () =>
            toast.success('Job marked as completed.', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            });
          notify();
          handleClose();
          getJobInfo();
          getLogs();
        } else {
          const notify = () =>
            toast.error(`ERROR: ${res.message}`, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            });
          notify();
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    switch (type) {
      case 'suspend-recorder-or-moderator':
        setModalContents({
          title: 'Suspend Recorder',
          text: 'Are you sure you want to suspend this recorder?',
          buttonText: 'Suspend',
          buttonAction: () =>
            handleSuspendOrReactivateRecorderOrModerator('Suspended'),
          buttonClass: 'suspend-button',
        });
        break;

      case 'reactivate-recorder-or-moderator':
        setModalContents({
          title: 'Reactivate Recorder',
          text: 'Are you sure you want to reactivate this recorder?',
          buttonText: 'Reactivate',
          buttonAction: () =>
            handleSuspendOrReactivateRecorderOrModerator('Active'),
        });
        break;

      case 'delete-recorder-or-moderator':
        setModalContents({
          title: 'Delete Recorder',
          text: 'Are you sure you want to delete this recorder?',
          buttonText: 'Delete',
          buttonAction: () => handleDeleteRecorderOrModerator(),
          buttonClass: 'delete-button',
        });
        break;

      case 'change-job-status-to-completed':
        setModalContents({
          title: 'Mark Job as Completed',
          text: `Are you sure you want to change this job's status to Completed?`,
          buttonText: 'Change Status',
          buttonAction: () => handleMarkJobAsCompleted(),
        });
        break;

      case 'delete-job':
        setModalContents({
          title: 'Delete Job',
          text: 'Are you sure you want to delete this job?',
          buttonText: 'Delete',
          buttonAction: () => handleDeleteJob(),
          buttonClass: 'delete-button',
        });
        break;

      default:
        break;
    }
  }, [type]);

  return (
    <div className='modal' ref={modalContainerRef}>
      <ToastContainer />
      <Modal
        container={modalContainerRef.current}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
        open={displayModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={displayModal}>
          <Box sx={modalStyle}>
            <div
              className={`modal-title-container  ${
                type === 'suspend-recorder' && 'suspend'
              }
              ${type === 'delete-recorder' && 'delete'}
              ${
                type === 'change-subscriber-status-to-active' &&
                'change-status-to-active'
              }
                ${type === 'reactivate-recorder' && 'change-status-to-active'}`}
            >
              <InfoIcon className='title-icon' />
              <h2>{modalContents.title}</h2>
            </div>
            <div className='modal-content'>
              <p className='text'>{modalContents.text}</p>
            </div>
            <div className='btn-container'>
              <button
                className={`btn ${
                  modalContents.buttonClass && modalContents.buttonClass
                }`}
                onClick={modalContents.buttonAction}
              >
                {modalContents.buttonText}
              </button>
              <button className='btn' onClick={handleClose}>
                Close
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalComponent;
