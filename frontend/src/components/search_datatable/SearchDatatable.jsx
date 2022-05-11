import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported';
import Loader from '../loader/Loader';
import './searchdatatable.scss';

/* TABLE COLUMNS SETTINGS -- START */
const columns = [
  {
    field: 'client_name',
    headerName: 'Client Name',
    width: 140,
    renderCell: (params) => {
      return (
        <div className='name'>
          <Link to={`/jobs/${params.row._id}`}>{params.row.client_name}</Link>
        </div>
      );
    },
  },
  { field: 'payment_status', headerName: 'Payment Status', width: 140 },
  { field: 'main_category', headerName: 'Main Category', width: 180 },
  { field: 'sub_categories', headerName: 'Sub Categories', width: 210 },
  { field: 'designer_tag', headerName: 'Designer Tag', width: 150 },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => {
      return (
        <div
          className={`job-status-container 
                ${params.row.status === 'Completed' && 'completed'} 
                ${params.row.status === 'Pending' && 'pending'} 
                ${params.row.status === 'Late' && 'late'}`}
        >
          {params.row.status}
        </div>
      );
    },
  },
  {
    field: 'how_late',
    headerName: 'How Late',
    width: 150,
  },
  {
    field: 'view',
    headerName: 'Actions',
    sortable: false,
    filterable: false,
    width: 80,
    renderCell: (params) => {
      return (
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Link to={`/jobs/${params.row._id}`}>
            <VisibilityIcon className='view-icon' />
          </Link>
        </div>
      );
    },
  },
  {
    field: 'start_date',
    headerName: 'Start Date',
    width: 120,
    renderCell: (params) => {
      return <div>{params.row.start_date.slice(0, 10)}</div>;
    },
  },
];
/* TABLE COLUMNS SETTINGS -- END */

function Datatable(props) {
  const { jobs } = props;

  return (
    <div className='search-datatable'>
      {!jobs ? (
        <Loader />
      ) : (
        <DataGrid
          rows={jobs}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          className='datatable-grid'
          getRowId={(job) => job.shorter_id}
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

export default Datatable;
