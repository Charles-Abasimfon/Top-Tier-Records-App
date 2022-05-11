import { Outlet, useLocation, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widgets/Widget';
import { AuthContext } from '../../context/authContext/AuthContext';
import { DarkModeContext } from '../../context/dark_mode/darkModeContext';
import { SettingsContext } from '../../context/settings/SettingsContext';
import './home.scss';
import { getAllJobs } from '../../apicalls/jobCalls';
import { fetchSettings } from '../../apicalls/settingCalls';
import logoColored from '../../assets/logo/logo.webp';
import logoWhite from '../../assets/logo/logowhite.webp';

function Home(props) {
  const location = useLocation();
  const { pathname } = useLocation();
  const { darkMode } = useContext(DarkModeContext);
  const { settings, dispatch } = useContext(SettingsContext);

  const { appRef } = props;

  const [jobs, setJobs] = useState(undefined);
  const { admin } = useContext(AuthContext);

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    if (pathname === '/') {
      setJobs(undefined);
      getAllJobs(admin.token)
        .then((res) => {
          setJobs(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchSettings(admin.token, dispatch);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowHeight(window.innerHeight);
    });
    return () => {
      window.removeEventListener('resize', () => {
        setWindowHeight(window.innerHeight);
      });
    };
  }, [window.innerHeight]);

  const getNumberOfJobsInCategory = (category) => {
    if (!jobs) return '...';
    switch (category) {
      case 'Early/Pending':
        return jobs.filter((job) => job.status === 'Pending').length;
      case 'Late':
        return jobs.filter((job) => job.status === 'Late').length;
      case 'Completed':
        return jobs.filter((job) => job.status === 'Completed').length;
      default:
        return 0;
    }
  };

  return (
    <div className='dashboard'>
      <Sidebar />
      <div className='dashboard-container'>
        <Navbar appRef={appRef} />
        <div
          className='dashboard-content'
          style={{ height: `calc(${windowHeight}px - 70px)` }}
        >
          {/* ///// USE OF OUTLET ///// */}
          <Outlet />

          {/* IF DASHBOARD HOME PAGE DISPLAY: */}
          {location.pathname === '/' && (
            <div className='home-content'>
              <div className='logotitle-container'>
                <img
                  src={darkMode ? logoWhite : logoColored}
                  alt='Logo'
                  className='logo'
                />
                <h3 className='logo-title'>Top Tier Branding Agency</h3>
                <p className='logo-text'>
                  Admin Dashboard & Records Management
                </p>
              </div>
              <div className='widgets'>
                <Widget
                  type='early-pending'
                  counter={getNumberOfJobsInCategory('Early/Pending')}
                />
                <Widget
                  type='late'
                  counter={getNumberOfJobsInCategory('Late')}
                />
                <Widget
                  type='completed'
                  counter={getNumberOfJobsInCategory('Completed')}
                />
              </div>
              {settings && (
                <div className='btn-container'>
                  {admin.admin_level === 'Recorder' &&
                    settings.can_recorders_add_new_jobs && (
                      <Link className='btn' to='/jobs/add-new'>
                        Add New Job
                      </Link>
                    )}
                  {admin.admin_level === 'Moderator' &&
                    settings.can_moderators_add_new_jobs && (
                      <Link className='btn' to='/jobs/add-new'>
                        Add New Job
                      </Link>
                    )}
                  {admin.admin_level === 'Administrator' && (
                    <Link className='btn' to='/jobs/add-new'>
                      Add New Job
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}
          {location.pathname === 'home' && (
            <div className='home-content'>
              <div className='logotitle-container'>
                <img
                  src={darkMode ? logoWhite : logoColored}
                  alt='21Xage Logo'
                  className='logo'
                />
                <p className='logo-text'>
                  Admin Dashboard & Records Management
                </p>
              </div>
              <div className='widgets'>
                <Widget
                  type='early-pending'
                  counter={getNumberOfJobsInCategory('Early/Pending')}
                />
                <Widget
                  type='late'
                  counter={getNumberOfJobsInCategory('Late')}
                />
                <Widget
                  type='completed'
                  counter={getNumberOfJobsInCategory('Completed')}
                />
              </div>
              {settings && (
                <div className='btn-container'>
                  {admin.admin_level === 'Recorder' &&
                    settings.can_recorders_add_new_jobs && (
                      <Link className='btn' to='/jobs/add-new'>
                        Add New Job
                      </Link>
                    )}
                  {admin.admin_level === 'Moderator' &&
                    settings.can_moderators_add_new_jobs && (
                      <Link className='btn' to='/jobs/add-new'>
                        Add New Job
                      </Link>
                    )}
                  {admin.admin_level === 'Administrator' && (
                    <Link className='btn' to='/jobs/add-new'>
                      Add New Job
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
