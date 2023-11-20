import { Typography } from '@aircall/tractor';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    if (accessToken) {
      navigate('/calls');
    } else {
      navigate('/login', { replace: true });
    }
  }, [accessToken]);

  return (
    <>
      <Typography variant="displayM" textAlign="center" py={3}>
        Oops!!
      </Typography>
      <p>This Page Does not exist, Kindly enter a valid url</p>
    </>
  );
};
