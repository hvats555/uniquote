import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from 'react-router-dom';
import {useAuth} from '../../../contexts/AuthContext';

const drawerWidth = 240;

const linkStyle = {
  color: 'black',
  textDecoration: 'none'
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
    marginTop: '65px'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Layout(props) {
  const classes = useStyles();
  const {currentUser} = useAuth();

  return (
    <div className={classes.root}>
      <CssBaseline />
      {currentUser ? <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        
        <div className={classes.drawerContainer}>
          <List>
              <ListItem button>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <Link style={linkStyle} to="/"><ListItemText primary={"Home"} /></Link>
              </ListItem>
          </List>

          <Divider />

          <List>
              <ListItem button>
                <ListItemIcon><PostAddIcon /></ListItemIcon>
                <Link style={linkStyle} to="/quotations/new"><ListItemText primary={"New Quotation"} /></Link>
              </ListItem>

              <ListItem button>
                <ListItemIcon><ListIcon /></ListItemIcon>
                <Link style={linkStyle} to="/quotations"><ListItemText primary={"All"} /></Link>
              </ListItem>
          </List>

          <Divider />

          <List>
              <ListItem button>
                <ListItemIcon><AddCircleIcon /></ListItemIcon>
                <Link style={linkStyle} to="/products/new"><ListItemText primary={"New Products"} /></Link>
              </ListItem>

              <ListItem button>
                <ListItemIcon><ListIcon /></ListItemIcon>
                <Link style={linkStyle} to="/products"><ListItemText primary={"All products"} /></Link>
              </ListItem>
          </List>
        </div>
      </Drawer> : null}


      <main className={classes.content}>
        {props.children}
      </main>
    </div>
  );
}
