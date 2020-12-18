import {useState, useEffect} from 'react';
import db from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.primary
  },
  content: {
    color: theme.palette.text.secondary
  },
  heading: {
    textTransform: 'uppercase',
    fontSize: '22px',
  }
}));

function AllQuotations() {
  const classes = useStyles();

    const [quotations, setQuotations] = useState([]);
    useEffect(() => {
        db.collection('quotations').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
          setQuotations(snapshot.docs.map(doc => ({id: doc.id, name: doc.data().name, address: doc.data().address})))
        })
      }, []);

    return (
          <div className={classes.root}>
            <Grid container spacing={2}>
              {quotations.map(quotation => (
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <h1 className={classes.heading}>{quotation.name}</h1>
                    <p className={classes.content}>{quotation.address}</p>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
    )
}

export default AllQuotations
