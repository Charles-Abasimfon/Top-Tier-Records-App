import Alert from '@mui/material/Alert';

function Error({ errorMsg }) {
  return (
    <Alert
      severity='error'
      style={{ marginBottom: '10px', fontSize: '17px', color: '#dc2626' }}
    >
      {errorMsg}.
    </Alert>
  );
}

export default Error;
