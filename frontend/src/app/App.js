import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { DarkModeContext } from '../context/dark_mode/darkModeContext';
import { AuthContext } from '../context/authContext/AuthContext';
import Home from '../pages/home/Home';
import AllJobs from '../pages/jobs_list/AllJobs';
import EarlyOrPendingJobs from '../pages/jobs_list/EarlyOrPendingJobs';
import LateJobs from '../pages/jobs_list/LateJobs';
import CompletedJobs from '../pages/jobs_list/CompletedJobs';
import Login from '../pages/login/Login';
import AddJob from '../pages/add_job/AddJob';
import SearchJobs from '../pages/search_jobs/SearchJobs';
import SingleJob from '../pages/single_job/SingleJob';
import AllAdmin from '../pages/admin_list/AllAdmin';
import SingleAdmin from '../pages/single_admin/SingleAdmin';
import AddAdmin from '../pages/add_admin/AddAdmin';
import EditAdmin from '../pages/edit_admin/EditAdmin';
import Profile from '../pages/profile/Profile';
import EditProfile from '../pages/edit_profile/EditProfile';
import ChangePassword from '../pages/change_password/ChangePassword';
import Settings from '../pages/settings/Settings';
import Logs from '../pages/logs/Logs';
import SearchLogs from '../pages/search_logs/SearchLogs';
import ProtectedRoute from '../protect/ProtectedRoutes';
import PreventNonAdministrators from '../protect/PreventNonAdministrators';
import EnforceSettings from '../protect/EnforceSettings';
import '../global_styles/main.scss';
import '../global_styles/darkmode.scss';

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { admin } = useContext(AuthContext);

  const appRef = useRef();
  return (
    <div className={`app ${darkMode ? 'dark' : ''}`} ref={appRef}>
      <Router>
        <Routes>
          <Route path='home' element={<Navigate replace to='/' />} />
          <Route
            path='login'
            element={admin ? <Navigate replace to='/' /> : <Login />}
          />
          <Route
            path='/'
            element={
              <ProtectedRoute admin={admin}>
                <Home appRef={appRef} />
              </ProtectedRoute>
            }
          >
            <Route path='profile'>
              <Route index element={<Profile />} />
              <Route
                path='edit'
                element={
                  <PreventNonAdministrators admin={admin}>
                    <EditProfile />
                  </PreventNonAdministrators>
                }
              />
              <Route path='change-password' element={<ChangePassword />} />
            </Route>
            <Route path='jobs'>
              <Route index element={<AllJobs />} />
              <Route path='all' element={<AllJobs />} />
              <Route path='pending' element={<EarlyOrPendingJobs />} />
              <Route path='late' element={<LateJobs />} />
              <Route path='completed' element={<CompletedJobs />} />
              <Route path='all' element={<AllJobs />} />
              <Route path='search' element={<SearchJobs />} />
              <Route path=':jobId' element={<SingleJob />} />
              <Route
                path='add-new'
                element={
                  <EnforceSettings whichSetting='add-job' admin={admin}>
                    <AddJob />
                  </EnforceSettings>
                }
              />
            </Route>
            <Route path='recorders-moderators'>
              <Route
                index
                element={
                  <PreventNonAdministrators admin={admin}>
                    <AllAdmin />
                  </PreventNonAdministrators>
                }
              />
              <Route
                path='all'
                element={
                  <PreventNonAdministrators admin={admin}>
                    <AllAdmin />
                  </PreventNonAdministrators>
                }
              />
              <Route
                path=':adminId'
                element={
                  <PreventNonAdministrators admin={admin}>
                    <SingleAdmin />
                  </PreventNonAdministrators>
                }
              />
              <Route
                path='add-new'
                element={
                  <PreventNonAdministrators admin={admin}>
                    <AddAdmin />
                  </PreventNonAdministrators>
                }
              />
              <Route
                path='edit/:adminId'
                element={
                  <PreventNonAdministrators admin={admin}>
                    <EditAdmin />
                  </PreventNonAdministrators>
                }
              />
            </Route>
            <Route
              path='settings'
              element={
                <PreventNonAdministrators admin={admin}>
                  <Settings />
                </PreventNonAdministrators>
              }
            ></Route>
            <Route path='logs' element={<Logs />}></Route>
            <Route path='search-logs' element={<SearchLogs />} />
          </Route>
          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
