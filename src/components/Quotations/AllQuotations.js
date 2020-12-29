import {useState, useEffect} from 'react';
import db from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const linkStyle = {
  color: 'white',
  textDecoration: 'none'
}

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
    textTransform: 'Capitalize',
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

                    <div className="productOptions">
                      <Button target="_blank" color="primary" size="small" variant="contained" href={`https://us-central1-${process.env.REACT_APP_FIREBASE_PROJECT_ID}.cloudfunctions.net/makePdf/quotations/${quotation.id}/pdf`}>Download</Button>

                      <Link style={linkStyle} to={`/quotations/${quotation.id}/edit`}>
                        <Button size="small" color="secondary">Edit</Button>
                      </Link>
                    </div>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
    )
}

export default AllQuotations
