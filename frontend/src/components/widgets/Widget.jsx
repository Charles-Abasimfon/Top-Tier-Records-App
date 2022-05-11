import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CallMadeOutlinedIcon from '@mui/icons-material/CallMadeOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import CheckIcon from '@mui/icons-material/Check';

import './widget.scss';

function Widget(props) {
  const { type, counter } = props;
  /* the type prop carries information on the type of the widget */

  const [widgetDetails, setWidgetDetails] = useState({
    title: '',
    linkText: '',
    linkUrl: '',
    icon: '',
    color: '#111827',
    backgroundColor: '#d1d5db',
  });

  useEffect(() => {
    switch (type) {
      case 'early-pending':
        setWidgetDetails({
          title: 'Early/Pending Jobs',
          linkText: 'View list',
          linkUrl: '/jobs/pending',
          icon: WorkOutlineOutlinedIcon,
          color: '#ca8a04',
          backgroundColor: '#fde047',
        });
        break;

      case 'late':
        setWidgetDetails({
          title: 'Late Jobs',
          linkText: 'View list',
          linkUrl: '/jobs/late',
          icon: WorkHistoryOutlinedIcon,
          color: '#e11d48',
          backgroundColor: '#fda4af',
        });
        break;

      case 'completed':
        setWidgetDetails({
          title: 'Completed Jobs',
          linkText: 'View list',
          linkUrl: '/jobs/completed',
          icon: CheckIcon,
          color: '#2563eb',
          backgroundColor: '#bfdbfe',
        });
        break;
      default:
        break;
    }
  }, [type]);

  return (
    <div className='widget'>
      <div className='left'>
        <span className='title'>{type && widgetDetails.title}</span>
        <span className='counter'>{counter}</span>
        <Link className='link' to={widgetDetails.linkUrl}>
          {type && widgetDetails.linkText}{' '}
          <CallMadeOutlinedIcon className='link-icon' />
        </Link>
      </div>
      <div className='right'>
        {type && widgetDetails.icon && (
          <widgetDetails.icon
            className='icon'
            style={{
              backgroundColor: widgetDetails.backgroundColor,
              color: widgetDetails.color,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Widget;
