import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import TelegramIcon from '@mui/icons-material/Telegram';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AuthContext } from '../../context/authContext/AuthContext';
import { getLatestSubscribers } from '../../apicalls/subscriberCalls';
import './table.scss';

function List() {
  const { admin } = useContext(AuthContext);
  const [subscribers, setSubscribers] = useState(undefined);

  useEffect(() => {
    getLatestSubscribers(admin.token)
      .then((res) => {
        setSubscribers(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell className='table-cell'>Name</TableCell>
            <TableCell className='table-cell'>Country</TableCell>
            <TableCell className='table-cell'>Email</TableCell>
            <TableCell className='table-cell'>Telegram</TableCell>
            <TableCell className='table-cell'>Status</TableCell>
            <TableCell className='table-cell'>Last Subscription</TableCell>
            <TableCell className='table-cell'>Actions</TableCell>
          </TableRow>
        </TableHead>
        {subscribers && (
          <TableBody>
            {subscribers.map((subscriber) => (
              <TableRow key={subscriber.shorter_id}>
                <TableCell className='table-cell' component='th' scope='row'>
                  {subscriber.name}
                </TableCell>
                <TableCell className='table-cell'>
                  {subscriber.country}
                </TableCell>
                <TableCell className='table-cell'>{subscriber.email}</TableCell>
                <TableCell className='table-cell'>
                  {subscriber.telegram}
                </TableCell>
                <TableCell className='table-cell'>
                  <div
                    className={`subscriber-status-container 
                ${subscriber.status === 'Active' && 'active'} 
                ${subscriber.status === 'Almost Expired' && 'pending'} 
                ${subscriber.status === 'Expired' && 'expired'}`}
                  >
                    {subscriber.status}
                  </div>
                </TableCell>
                <TableCell className='table-cell'>
                  {subscriber.lastsubscription}
                </TableCell>
                <TableCell className='table-cell buttons'>
                  <Link to={`/subscribers/${subscriber.id}`}>
                    <VisibilityIcon className='view-icon' />
                  </Link>
                  <Link to={`/subscribers/edit/${subscriber.id}`}>
                    <EditIcon className='edit-icon' />
                  </Link>
                  <a
                    href={`https://telegram.me/${subscriber.telegram}`}
                    target='_blank'
                  >
                    <TelegramIcon className='telegram-icon' />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

export default List;
