import React, {SyntheticEvent, useState} from 'react';
import { Snackbar as MUISnackbar }  from '@material-ui/core';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';

interface SnackbarProps {
    open: boolean,
    message: string,
    severity: SeverityTypes,
}

export enum SeverityTypes {
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
    SUCCESS = 'success',
}

export function Snackbar(props: SnackbarProps) {
    const { severity, message } = props;
    const [open, setOpen] = useState(props.open);

    React.useEffect(() => {
        setOpen(props.open)
    },[props])

    const handleClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const renderAlert = (severity: string, message: string) => {
        switch (severity) {
            case "error":
                return <Alert onClose={handleClose} severity="error">{message}</Alert>;
            case "warning":
                return <Alert onClose={handleClose} severity="warning">{message}</Alert>;
            case "info":
                return <Alert onClose={handleClose} severity="info">{message}</Alert>;
            case "success":
                return <Alert onClose={handleClose} severity="success">{message}</Alert>;
            default:
                return <Alert onClose={handleClose} severity="info">{message}</Alert>;
        }
    }

    return (
        <div>
            <MUISnackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                {renderAlert(severity, message)}
            </MUISnackbar>
        </div>
    );
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}