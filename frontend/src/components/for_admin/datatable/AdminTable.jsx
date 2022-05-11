import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported';

import TelegramIcon from '@mui/icons-material/Telegram';
import { AuthContext } from '../../../context/authContext/AuthContext';
import { getAllRecordersAndModerators } from '../../../apicalls/adminCalls';
import Loader from '../../loader/Loader';
import './admintable.scss';

/* TABLE COLUMNS SETTINGS -- START */
const columns = [
  {
    field: 'name',
    headerName: 'Name',
    width: 220,
    renderCell: (params) => {
      return (
        <div className='name'>
          <Link to={`/recorders-moderators/${params.row._id}`}>
            {params.row.name}
          </Link>
        </div>
      );
    },
  },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'phone', headerName: 'Phone', width: 160 },
  { field: 'admin_level', headerName: 'Admin Level', width: 160 },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    renderCell: (params) => {
      return (
        <div
          className={`recorder-status-container 
                ${params.row.status === 'Active' && 'active'} 
                ${params.row.status === 'Suspended' && 'suspended'}`}
        >
          {params.row.status}
        </div>
      );
    },
  },
  {
    field: 'added',
    headerName: 'Added',
    width: 130,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    filterable: false,
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <Link to={`/recorders-moderators/${params.row._id}`}>
            <VisibilityIcon className='view-icon' />
          </Link>
          <Link to={`/recorders-moderators/edit/${params.row._id}`}>
            <EditIcon className='edit-icon' />
          </Link>
        </>
      );
    },
  },
];
/* TABLE COLUMNS SETTINGS -- END */

function AdminTable() {
  const { admin } = useContext(AuthContext);
  const [recordersAndModerators, setRecordersAndModerators] =
    useState(undefined);

  useEffect(() => {
    getAllRecordersAndModerators(admin.token)
      .then((res) => {
        setRecordersAndModerators(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='datatable'>
      {!recordersAndModerators ? (
        <Loader />
      ) : (
        <DataGrid
          rows={recordersAndModerators}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          className='datatable-grid'
          getRowId={(person) => person.shorter_id}
          components={{
            NoRowsOverlay: () => (
              <div className='empty-overlay'>
                <BrowserNotSupportedIcon className='empty-overlay-icon' />
              </div>
            ),
          }}
        />
      )}
    </div>
  );
}

export default AdminTable;
