import { useContext, useRef, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import InfoIcon from '@mui/icons-material/Info';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import {
  updateJobClientName,
  updateJobSubCategories,
  reassignJobToAnotherDesigner,
  updateJobAdditionalInfo,
  updateJobMainCategory,
  updateJobPaymentStatus,
  updateJobStartDate,
  updateJobNoteTag,
  updateJobRemindedStatus,
} from '../../apicalls/jobCalls';
import 'react-toastify/dist/ReactToastify.css';
import '../modal/modal.scss';

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

const toastObj = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

function EditModal(props) {
  const { admin } = useContext(AuthContext);
  const modalContainerRef = useRef();
  const [modalContents, setModalContents] = useState({
    title: '',
    text: '',
    buttonText: '',
    buttonAction: () => {},
  });
  const { displayModal, setDisplayModal, type, jobInfo, getJobInfo, getLogs } =
    props;
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setDisplayModal(false);

  //EDIT VALUE STATES
  const [editProperty, setEditProperty] = useState('');
  const [editValue, setEditValue] = useState('');

  //@Desc Handle Update Client's Name
  const handleUpdateClientsName = (editValue) => {
    setIsLoading(true);
    updateJobClientName(
      admin.token,
      jobInfo._id,
      admin.name,
      admin.admin_level,
      jobInfo.client_name,
      editValue
    )
      .then((res) => {
        setIsLoading(false);
        /* Check if res is an error (isError === true) */
        if (res.isError === false) {
          const notify = () => toast.success('Client name updated', toastObj);
          notify();
          handleClose();
          getJobInfo();
          getLogs();
        } else {
          setIsLoading(false);
          const notify = () => toast.error(`ERROR: ${res.message}`, toastObj);
          notify();
          console.log(res.message);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  //@Desc Handle Update Sub Categories
  const handleUpdateSubCategories = (editValue) => {
    setIsLoading(true);
    updateJobSubCategories(
      admin.token,
      jobInfo._id,
      admin.name,
      admin.admin_level,
      jobInfo.sub_categories,
      editValue
    )
      .then((res) => {
        setIsLoading(false);
        /* Check if res is an error (isError === true) */
        if (res.isError === false) {
          const notify = () =>
            toast.success('Job sub-categories updated', toastObj);
          notify();
          handleClose();
          getJobInfo();
          getLogs();
        } else {
          setIsLoading(false);
          const notify = () => toast.error(`ERROR: ${res.message}`, toastObj);
          notify();
          console.log(res.message);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  //@Desc Handle Reassign Job To Another Designer
  const handleReassignJobToAnotherDesigner = (editValue) => {
    setIsLoading(true);
    reassignJobToAnotherDesigner(
      admin.token,
      jobInfo._id,
      admin.name,
      admin.admin_level,
      jobInfo.designer_tag,
      editValue
    )
      .then((res) => {
        setIsLoading(false);
        /* Check if res is an error (isError === true) */
        if (res.isError === false) {
          const notify = () =>
            toast.success('Job reassigned to another designer', toastObj);
          notify();
          handleClose();
          getJobInfo();
          getLogs();
        } else {
          setIsLoading(false);
          const notify = () => toast.error(`ERROR: ${res.message}`, toastObj);
          notify();
          console.log(res.message);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  //@Desc Handle Update Additional Info
  const handleUpdateAdditionalInfo = (editValue) => {
    setIsLoading(true);
    updateJobAdditionalInfo(
      admin.token,
      jobInfo._id,
      admin.name,
      admin.admin_level,
      jobInfo.additional_info,
      editValue
    )
      .then((res) => {
        setIsLoading(false);
        /* Check if res is an error (isError === true) */
        if (res.isError === false) {
          const notify = () =>
            toast.success('Job additional info updated', toastObj);
          notify();
          handleClose();
          getJobInfo();
          getLogs();
        } else {
          setIsLoading(false);
          const notify = () => toast.error(`ERROR: ${res.message}`, toastObj);
          notify();
          console.log(res.message);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  //@Desc Handle Update Job's Main Category
  const handleUpdateMainCategory = (editValue) => {
    setIsLoading(true);
    updateJobMainCategory(
      admin.token,
      jobInfo._id,
      admin.name,
      admin.admin_level,
      jobInfo.main_category,
      editValue
    )
      .then((res) => {
        setIsLoading(false);
        /* Check if res is an error (isError === true) */
        if (res.isError === false) {
          const notify = () =>
            toast.success('Job main category updated', toastObj);
          notify();
          handleClose();
          getJobInfo();
          getLogs();
        } else {
          setIsLoading(false);
          const notify = () => toast.error(`ERROR: ${res.message}`, toastObj);
          notify();
          console.log(res.message);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  //@Desc Handle Update Job's Payment Status
  const handleUpdatePaymentStatus = (editValue) => {
    setIsLoading(true);
    updateJobPaymentStatus(
      admin.token,
      jobInfo._id,
      admin.name,
      admin.admin_level,
      jobInfo.payment_status,
      editValue
    )
      .then((res) => {
        setIsLoading(false);
        /* Check if res is an error (isError === true) */
        if (res.isError === false) {
          const notify = () =>
            toast.success('Job payment status updated', toastObj);
          notify();
          handleClose();
          getJobInfo();
          getLogs();
        } else {
          setIsLoading(false);
          const notify = () => toast.error(`ERROR: ${res.message}`, toastObj);
          notify();
          console.log(res.message);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  //@Desc Handle Update Job's Start Date
  const handleUpdateStartDate = (editValue) => {
    setIsLoading(true);
    updateJobStartDate(
      admin.token,
      jobInfo._id,
      admin.name,
      admin.admin_level,
      jobInfo.start_date,
      editValue
    )
      .then((res) => {
        setIsLoading(false);
        /* Check if res is an error (isError === true) */
        if (res.isError === false) {
          const notify = () =>
            toast.success('Job start date updated', toastObj);
          notify();
          handleClose();
          getJobInfo();
          getLogs();
        } else {
          setIsLoading(false);
          const notify = () => toast.error(`ERROR: ${res.message}`, toastObj);
          notify();
          console.log(res.message);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  //@Desc Handle Update Job's Note Tag
  const handleUpdateNote = (editValue) => {
    setIsLoading(true);
    updateJobNoteTag(
      admin.token,
      jobInfo._id,
      admin.name,
      admin.admin_level,
      jobInfo.note,
      editValue
    )
      .then((res) => {
        setIsLoading(false);
        /* Check if res is an error (isError === true) */
        if (res.isError === false) {
          const notify = () => toast.success('Job note updated', toastObj);
          notify();
          handleClose();
          getJobInfo();
          getLogs();
        } else {
          setIsLoading(false);
          const notify = () => toast.error(`ERROR: ${res.message}`, toastObj);
          notify();
          console.log(res.message);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  //@Desc Handle Update Job's Reminded Status
  const handleUpdateJobRemindedStatus = (editValue) => {
    setIsLoading(true);
    updateJobRemindedStatus(
      admin.token,
      jobInfo._id,
      admin.name,
      admin.admin_level,
      jobInfo.reminded_status || 'Not Reminded',
      editValue
    )
      .then((res) => {
        setIsLoading(false);
        /* Check if res is an error (isError === true) */
        if (res.isError === false) {
          const notify = () =>
            toast.success('Job reminded status updated', toastObj);
          notify();
          handleClose();
          getJobInfo();
          getLogs();
        } else {
          setIsLoading(false);
          const notify = () => toast.error(`ERROR: ${res.message}`, toastObj);
          notify();
          console.log(res.message);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    switch (type) {
      case 'change-client-name':
        setEditProperty('client_name');
        setEditValue(jobInfo.client_name);
        setModalContents({
          title: 'Change Client Name',
          text: `NOTE: You are about changing the client's name.`,
          buttonText: 'Save',
        });
        break;

      case 'change-sub-categories':
        setEditProperty('sub_categories');
        setEditValue(jobInfo.sub_categories);
        setModalContents({
          title: 'Change Sub-Categories',
          text: `NOTE: You are about changing the job's sub-categories.`,
          buttonText: 'Save',
        });
        break;

      case 'reassign-job-to-another-designer':
        setEditProperty('designer_tag');
        setEditValue(jobInfo.designer_tag);
        setModalContents({
          title: 'Reassign Job To Another Designer',
          text: `NOTE: You are about reassigning the job to another designer.`,
          buttonText: 'Save',
        });
        break;

      case 'change-additional-info':
        setEditProperty('additional_info');
        setEditValue(jobInfo.additional_info);
        setModalContents({
          title: 'Change Additional Info',
          text: `NOTE: You are about updating the job's additional info.`,
          buttonText: 'Save',
        });
        break;

      case 'change-main-category':
        setEditProperty('main_category');
        setEditValue(jobInfo.main_category);
        setModalContents({
          title: 'Change Main Category',
          text: `NOTE: You are about updating the job's main category.`,
          buttonText: 'Save',
        });
        break;

      case 'change-payment-status':
        setEditProperty('payment_status');
        setEditValue(jobInfo.payment_status);
        setModalContents({
          title: 'Change Payment Status',
          text: `NOTE: You are about updating the job's payment status.`,
          buttonText: 'Save',
        });
        break;

      case 'change-start-date':
        setEditProperty('start_date');
        setEditValue(jobInfo.start_date);
        setModalContents({
          title: 'Change Start Date',
          text: `NOTE: You are about updating the job's start date.`,
          buttonText: 'Save',
        });
        break;

      case 'change-note':
        setEditProperty('note');
        setEditValue(jobInfo.note);
        setModalContents({
          title: 'Change Note',
          text: `NOTE: You are about updating the job's note.`,
          buttonText: 'Save',
        });
        break;

      case 'change-reminded-status':
        setEditProperty('reminded_status');
        setEditValue(jobInfo.reminded_status);
        setModalContents({
          title: 'Change Reminded Status',
          text: `NOTE: You are about updating the job's reminded status.`,
          buttonText: 'Save',
        });
        break;

      default:
        break;
    }
  }, [type]);

  const buttonActions = (editValue) => {
    switch (type) {
      case 'change-client-name':
        handleUpdateClientsName(editValue);
        break;

      case 'change-sub-categories':
        handleUpdateSubCategories(editValue);
        break;

      case 'reassign-job-to-another-designer':
        handleReassignJobToAnotherDesigner(editValue);
        break;

      case 'change-additional-info':
        handleUpdateAdditionalInfo(editValue);
        break;

      case 'change-main-category':
        handleUpdateMainCategory(editValue);
        break;

      case 'change-payment-status':
        handleUpdatePaymentStatus(editValue);
        break;

      case 'change-start-date':
        handleUpdateStartDate(editValue);
        break;

      case 'change-note':
        handleUpdateNote(editValue);
        break;

      case 'change-reminded-status':
        handleUpdateJobRemindedStatus(editValue);
        break;

      default:
        break;
    }
  };

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
            {type !== 'change-additional-info' &&
              type !== 'change-main-category' &&
              type !== 'change-payment-status' &&
              type !== 'change-start-date' &&
              type !== 'change-note' &&
              type !== 'change-reminded-status' && (
                <input
                  required={true}
                  type='text'
                  name={editProperty}
                  id={editProperty}
                  placeholder=''
                  value={editValue}
                  className='input-field'
                  onChange={(event) => setEditValue(event.target.value)}
                />
              )}
            {type === 'change-additional-info' && (
              <textarea
                name={editProperty}
                id={editProperty}
                placeholder=''
                rows={3}
                value={editValue}
                onChange={(event) => setEditValue(event.target.value)}
              />
            )}
            {type === 'change-main-category' && (
              <select
                id={editProperty}
                name={editProperty}
                required
                onChange={(event) => setEditValue(event.target.value)}
                value={editValue}
              >
                <option value='Graphic Design'>Graphic Design</option>
                <option value='Website Development'>Website Development</option>
              </select>
            )}
            {type === 'change-payment-status' && (
              <select
                id={editProperty}
                name={editProperty}
                required
                onChange={(event) => setEditValue(event.target.value)}
                value={editValue}
              >
                <option value='Half'>Half</option>
                <option value='Full'>Full</option>
              </select>
            )}
            {type === 'change-start-date' && (
              <input
                required={true}
                type='datetime-local'
                id={editProperty}
                name={editProperty}
                min='2022-01-01'
                value={editValue}
                onChange={(event) => setEditValue(event.target.value)}
              />
            )}
            {type === 'change-note' && (
              <select
                id='note'
                name='note'
                required={true}
                onChange={(event) => setEditValue(event.target.value)}
                value={editValue}
              >
                <option value='Nil'>Nil</option>
                <option value='Delivered (Awaiting Client Response)'>
                  Delivered (Awaiting Client Response)
                </option>
                <option value='Corrections (Awaiting Designers Delivery)'>
                  Corrections (Awaiting Designers Delivery)
                </option>
              </select>
            )}
            {type === 'change-reminded-status' && (
              <select
                id={editProperty}
                name={editProperty}
                required
                onChange={(event) => setEditValue(event.target.value)}
                value={editValue}
              >
                <option value='Not Reminded'>Not Reminded</option>
                <option value='Reminded x1'>Reminded x1</option>
                <option value='Reminded x2'>Reminded x2</option>
              </select>
            )}
            <div className='btn-container'>
              <button
                className='btn'
                disabled={isLoading}
                onClick={() => buttonActions(editValue)}
              >
                {!isLoading ? (
                  <>{modalContents.buttonText}</>
                ) : (
                  <>
                    Loading
                    <CircularProgress size={20} style={{ marginLeft: '5px' }} />
                  </>
                )}
              </button>
              <button className='btn' onClick={handleClose}>
                Cancel
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default EditModal;
