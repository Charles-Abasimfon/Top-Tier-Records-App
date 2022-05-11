import { Link } from 'react-router-dom';
import AdminTable from '../../components/for_admin/datatable/AdminTable';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import './admin.scss';
function AllAdmin() {
  return (
    <div className='recorders-list-page-content'>
      <div className='top'>
        <div className='title-container'>
          <BadgeOutlinedIcon className='title-icon' />
          <h2>Recorders & Moderators</h2>
        </div>
        <Link className='btn' to='/recorders-moderators/add-new'>
          Add
        </Link>
      </div>

      <AdminTable />
    </div>
  );
}

export default AllAdmin;
