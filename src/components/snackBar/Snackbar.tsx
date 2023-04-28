 import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useSelector} from "react-redux";
import {AppDispatch, AppRootState} from "../../bll/store";
 import {appSetErrorAC} from "../../bll/allActions";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Snackbars() {

    const error = useSelector<AppRootState, string | null>(state => state.app.error)
    const dispatch = AppDispatch();

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
         dispatch(appSetErrorAC(null))
    };

    return (
        <Snackbar
            open={!!error}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>

            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {error}
            </Alert>

        </Snackbar>
    );
}