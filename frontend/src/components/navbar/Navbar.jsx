import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../context/dark_mode/darkModeContext';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from '../../context/authContext/AuthContext';
import { logout } from '../../context/authContext/AuthActions';
import { SettingsContext } from '../../context/settings/SettingsContext';
import MSidebar from '../mobile/sidebar/MSidebar';
import './navbar.scss';

function Navbar(props) {
  const navigate = useNavigate();
  const menuContainerRef = useRef();
  const { darkMode, dispatch } = useContext(DarkModeContext);
  const { dispatch: authDispatch, admin } = useContext(AuthContext);
  const [displayMSidebar, setDisplayMSidebar] = useState(false);
  const { dispatch: settingsDispatch } = useContext(SettingsContext);

  const handleLogout = () => {
    settingsDispatch({ type: 'DELETE_SETTINGS' });
    authDispatch(logout());
  };

  /* FOR ACCOUNT MENU */
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  /* ------------- */

  /* FOR FULLSCREEN MODE */
  const [inFullscreenMode, setInFullscreenMode] = useState(false);
  const handleEnterFullscreen = () => {
    if (document.body.requestFullscreen) {
      document.body.requestFullscreen();
    } else if (document.body.mozRequestFullScreen) {
      document.body.mozRequestFullScreen(); // Firefox
    } else if (document.body.webkitRequestFullscreen) {
      document.body.webkitRequestFullscreen(); // Chrome and Safari
    }
    setInFullscreenMode(true);
  };

  const handleExitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    setInFullscreenMode(false);
  };
  /* -------------- */

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      setInFullscreenMode(document.fullscreen);
    });
    document.addEventListener('mozfullscreenchange', () => {
      setInFullscreenMode(document.mozFullScreen);
    });
    document.addEventListener('webkitfullscreenchange', () => {
      setInFullscreenMode(document.webkitIsFullScreen);
    });
    return () => {
      document.removeEventListener('fullscreenchange', () => {
        setInFullscreenMode(document.fullscreen);
      });
      document.removeEventListener('mozfullscreenchange', () => {
        setInFullscreenMode(document.mozFullScreen);
      });
      document.removeEventListener('webkitfullscreenchange', () => {
        setInFullscreenMode(document.webkitIsFullScreen);
      });
    };
  });

  const handleOpenProfile = () => {
    navigate('/profile', { replace: true });
    handleClose();
  };

  return (
    <div className='navbar' ref={menuContainerRef}>
      <div className='wrapper'>
        <div className='welcome'>
          <div className='sidebar-icon-container'>
            {!displayMSidebar ? (
              <ListOutlinedIcon
                className='sidebar-icon'
                onClick={() => setDisplayMSidebar(true)}
              />
            ) : (
              <CloseIcon
                className='sidebar-icon'
                onClick={() => setDisplayMSidebar(false)}
              />
            )}
          </div>
          <MSidebar
            displayMSidebar={displayMSidebar}
            setDisplayMSidebar={setDisplayMSidebar}
          />
          <h2
            className='welcome-text'
            onClick={() => navigate('/', { replace: true })}
          >
            Welcome {admin.name}!
          </h2>
          <h2
            className='welcome-text-mobile'
            onClick={() => navigate('/', { replace: true })}
          >
            Welcome!
          </h2>
        </div>
        <div className='items'>
          <div className='item navbar-icon-container'>
            <SearchOutlinedIcon
              className='navbar-icon'
              onClick={() => navigate('/jobs/search', { replace: true })}
            />
          </div>
          <div className='item navbar-icon-container'>
            {darkMode ? (
              <DarkModeOutlinedIcon
                className='navbar-icon'
                onClick={() => dispatch({ type: 'LIGHT_MODE' })}
              />
            ) : (
              <LightModeOutlinedIcon
                className='navbar-icon'
                onClick={() => dispatch({ type: 'DARK_MODE' })}
              />
            )}
          </div>
          <div className='item navbar-icon-container fullscreen'>
            {inFullscreenMode ? (
              <FullscreenExitOutlinedIcon
                className='navbar-icon'
                onClick={handleExitFullscreen}
              />
            ) : (
              <FullscreenOutlinedIcon
                className='navbar-icon'
                onClick={handleEnterFullscreen}
              />
            )}
          </div>
          <div className='item navbar-icon-container'>
            <AccountCircleIcon
              className='navbar-icon'
              aria-haspopup='true'
              onClick={handleClick}
            />
          </div>
          {/*           <div className='item navbar-icon-container'>
            <NotificationsNoneOutlinedIcon className='navbar-icon' />
            {notificationCount > 0 && (
              <div className='navbar-counter'>{notificationCount}</div>
            )}
          </div>
          <div className='item navbar-icon-container'>
            <LocalPostOfficeOutlinedIcon className='navbar-icon' />
            {chatCount > 0 && <div className='navbar-counter'>{chatCount}</div>}
          </div>
          <div className='item navbar-icon-container'>
            <ListOutlinedIcon className='navbar-icon' />
          </div> */}
        </div>
      </div>

      {/* MENU */}
      <Menu
        container={menuContainerRef.current}
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleOpenProfile}>My Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      {/*  */}
    </div>
  );
}

export default Navbar;
