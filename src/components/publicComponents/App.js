import React, { useState } from 'react';
import SnackInfo from '../../utils/SnackInfo';
import ProtectedRoutes from "./protectedRoutes";

const App = () => {
  const [internetSnackInfo, setInternetSnackInfo] = useState({
    open: false,
    message: '',
    vertical: 'top',
    horizontal: 'center',
    severity: 'info',
    autoHideDuration: 5000,
  });

  window.onoffline = () => {
    if (internetSnackInfo.message !== 'You lost connection to the internet') {
      setInternetSnackInfo(snackInfo => ({
        ...snackInfo,
        open: true,
        message: 'You lost connection to the internet',
        severity: 'error',
        vertical: 'top',
        horizontal: 'center',
        autoHideDuration: null,
      }));
    }
  };

  window.ononline = () => {
    if (internetSnackInfo.message !== 'You are back online') {
      setInternetSnackInfo(snackInfo => ({
        ...snackInfo,
        open: true,
        message: 'You are back online',
        severity: 'success',
        vertical: 'top',
        horizontal: 'center',
        autoHideDuration: 3000,
      }));
    }
  };

  return (
      <div>
        <ProtectedRoutes/>
        <SnackInfo
            snackInfo={internetSnackInfo}
            handleClose={() =>
                setInternetSnackInfo(internetSnackInfo => ({
                  ...internetSnackInfo,
                  open: false,
                }))
            }
        />
      </div>
  );
};

export default App;
