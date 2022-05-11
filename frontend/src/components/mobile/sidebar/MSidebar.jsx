import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../../../context/dark_mode/darkModeContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CheckIcon from '@mui/icons-material/Check';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AddTaskIcon from '@mui/icons-material/AddTask';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import logoColored from '../../../assets/logo/logo.webp';
import logoWhite from '../../../assets/logo/logowhite.webp';
import CustomScroll from 'react-custom-scroll';
import { AuthContext } from '../../../context/authContext/AuthContext';
import { SettingsContext } from '../../../context/settings/SettingsContext';
import { logout } from '../../../context/authContext/AuthActions';
import 'react-custom-scroll/dist/customScroll.css';
import './msidebar.scss';

function MSidebar({ displayMSidebar, setDisplayMSidebar }) {
  const { darkMode } = useContext(DarkModeContext);
  const { admin, dispatch: authDispatch } = useContext(AuthContext);
  const { settings, dispatch: settingsDispatch } = useContext(SettingsContext);

  const closeSidebar = () => {
    setDisplayMSidebar(false);
  };

  const handleLogout = () => {
    settingsDispatch({ type: 'DELETE_SETTINGS' });
    authDispatch(logout());
  };

  return (
    <div className={`mobile-sidebar ${displayMSidebar && 'enter'}`}>
      <div className='sidebar-top'>
        <div className='logo'>
          <a href='/'>
            <img src={darkMode ? logoWhite : logoColored} alt='21Xage' />
          </a>
        </div>
      </div>
      <hr />
      <CustomScroll heightRelativeToParent={'72%'}>
        <div className='sidebar-center'>
          <ul>
            <p className='title'>MAIN</p>
            <NavLink
              to='/'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeSidebar}
            >
              <DashboardIcon className='sidebar-list-icon' />
              <span>Dashboard</span>
            </NavLink>
            <p className='title'>JOBS</p>
            <NavLink
              to='/jobs/pending'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeSidebar}
            >
              <WorkOutlineOutlinedIcon className='sidebar-list-icon' />
              <span>Early/Pending Jobs</span>
            </NavLink>
            <NavLink
              to='/jobs/late'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeSidebar}
            >
              <WorkHistoryOutlinedIcon className='sidebar-list-icon' />
              <span>Late Jobs</span>
            </NavLink>
            <NavLink
              to='/jobs/completed'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeSidebar}
            >
              <CheckIcon className='sidebar-list-icon' />
              <span>Completed Jobs</span>
            </NavLink>
            <NavLink
              to='/jobs/all'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeSidebar}
            >
              <ListAltIcon className='sidebar-list-icon' />
              <span>All Jobs</span>
            </NavLink>
            {settings && (
              <>
                {admin.admin_level === 'Recorder' &&
                  settings.can_recorders_add_new_jobs && (
                    <NavLink
                      to='/jobs/add-new'
                      className={({ isActive }) =>
                        isActive ? 'active' : undefined
                      }
                      onClick={closeSidebar}
                    >
                      <AddTaskIcon className='sidebar-list-icon' />
                      <span>Add Job</span>
                    </NavLink>
                  )}
                {admin.admin_level === 'Moderator' &&
                  settings.can_moderators_add_new_jobs && (
                    <NavLink
                      to='/jobs/add-new'
                      className={({ isActive }) =>
                        isActive ? 'active' : undefined
                      }
                      onClick={closeSidebar}
                    >
                      <AddTaskIcon className='sidebar-list-icon' />
                      <span>Add Job</span>
                    </NavLink>
                  )}
              </>
            )}
            {admin.admin_level === 'Administrator' && (
              <NavLink
                to='/jobs/add-new'
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                onClick={closeSidebar}
              >
                <AddTaskIcon className='sidebar-list-icon' />
                <span>Add Job</span>
              </NavLink>
            )}
            <NavLink
              to='/jobs/search'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeSidebar}
            >
              <SearchOutlinedIcon className='sidebar-list-icon' />
              <span>Search</span>
            </NavLink>
            {admin.admin_level && admin.admin_level === 'Administrator' && (
              <>
                <p
                  className='title'
                  style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                >
                  RECORDERS & MODERATORS
                </p>
                <NavLink
                  to='/recorders-moderators/all'
                  className={({ isActive }) =>
                    isActive ? 'active' : undefined
                  }
                  onClick={closeSidebar}
                >
                  <BadgeOutlinedIcon className='sidebar-list-icon' />
                  <span>View All</span>
                </NavLink>
                <NavLink
                  to='/recorders-moderators/add-new'
                  className={({ isActive }) =>
                    isActive ? 'active' : undefined
                  }
                  onClick={closeSidebar}
                >
                  <AddTaskIcon className='sidebar-list-icon' />
                  <span>Add New</span>
                </NavLink>
              </>
            )}
            <p className='title'>SYSTEM</p>
            <NavLink
              to='/logs'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeSidebar}
            >
              <SummarizeOutlinedIcon className='sidebar-list-icon' />
              <span>Logs</span>
            </NavLink>
            <NavLink
              to='/search-logs'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeSidebar}
            >
              <SummarizeOutlinedIcon className='sidebar-list-icon' />
              <span>Search Logs</span>
            </NavLink>
            {admin.admin_level === 'Administrator' && (
              <NavLink
                to='/settings'
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                onClick={closeSidebar}
              >
                <SettingsOutlinedIcon className='sidebar-list-icon' />
                <span>Settings</span>
              </NavLink>
            )}
            <p className='title'>USER</p>
            <NavLink
              to='/profile'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeSidebar}
            >
              <AccountCircleOutlinedIcon className='sidebar-list-icon' />
              <span>My Profile</span>
            </NavLink>
            <button onClick={handleLogout}>
              <LogoutOutlinedIcon className='sidebar-list-icon' />
              <span>Logout</span>
            </button>
            <br />
          </ul>
        </div>
      </CustomScroll>
      <hr />
    </div>
  );
}

export default MSidebar;
