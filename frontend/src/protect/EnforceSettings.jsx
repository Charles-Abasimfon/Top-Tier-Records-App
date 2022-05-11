import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getSettings } from '../apicalls/settingCalls';
import Loader from '../components/loader/Loader';

/* This special protect component enforces system settings (Role Capabilities) */
const EnforceSettings = ({ admin, redirectPath = '/', children }) => {
  let enforceSetting = 'unknown';
  if (admin.admin_level === 'Recorder') {
    enforceSetting = 'can_recorders_add_new_jobs';
  }
  if (admin.admin_level === 'Moderator') {
    enforceSetting = 'can_moderators_add_new_jobs';
  }

  const [settings, setSettings] = useState(undefined);

  useEffect(() => {
    getSettings(admin.token)
      .then((res) => {
        setSettings(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!admin) {
    return <Navigate to={redirectPath} replace />;
  }

  //If Admin is an Administrator, then he can access all the pages
  if (admin.admin_level === 'Administrator') {
    return children;
  }

  if (!settings) {
    return <Loader />;
  }

  if (settings[enforceSetting]) {
    return children;
  }

  return <Navigate to={redirectPath} replace />;
};

export default EnforceSettings;
