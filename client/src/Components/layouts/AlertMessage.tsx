import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export const AlertMessage = ({info}:any) => {
    return info === null ? null : (
        <Alert severity={info.type}>
            <AlertTitle>{info.message}</AlertTitle>
      </Alert>
    )
}