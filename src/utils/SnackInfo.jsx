import React, { Fragment } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const SnackInfo = ({ snackInfo, handleClose }) => {
    const {
        open = false,
        vertical = 'bottom',
        horizontal = 'left',
        message = '',
        severity = 'info',
        autoHideDuration,
    } = snackInfo;

    const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />;
    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical} ${horizontal}`}
            open={open}
            onClose={handleClose}
            autoHideDuration={autoHideDuration}
        >
            <Alert
                severity={severity}
                action={
                    <Fragment>
                        {snackInfo.snackbarAction && (
                            <button
                                className="custom-button outlined white"
                                onClick={snackInfo.snackbarAction.handler}
                            >
                                {snackInfo.snackbarAction.title}
                            </button>
                        )}
                    </Fragment>
                }
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackInfo;
