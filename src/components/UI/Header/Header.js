import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useAuth} from '../../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1
  },
  authInfo: {
      display: 'flex',
      justifyContent: 'space-between'
  },
  logoutButton: {
      margin: '10px',
      
  }
}));

function Header() {
    const {currentUser} = useAuth();
    const {logout} = useAuth();
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography className={classes.title} variant="h6" noWrap>
                    Uniquote
                </Typography>
                {currentUser ?
                <div className={classes.authInfo}>
                    <p>{currentUser.email}</p>
                    <Button size="small" color="secondary" variant="contained" onClick={logout} className={classes.logoutButton}>Logout</Button>
                </div> : <p>Currently, Not logged in</p>}

            </Toolbar>
        </AppBar>
    )
}

export default Header
