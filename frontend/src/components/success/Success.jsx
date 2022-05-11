import Alert from '@mui/material/Alert';

function Error({ successMsg }) {
  return (
    <Alert
      severity='success'
      style={{ marginBottom: '15px', fontSize: '17px', color: '#16a34a' }}
    >
      {successMsg}.
    </Alert>
  );
}

export default Error;
