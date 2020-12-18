import {useState, useEffect} from 'react';
import db from '../../../firebase';
import './AllProducts.css';
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

function AllProducts() {
  const classes = useStyles();

    const [product, setProduct] = useState([]);
    useEffect(() => {
        db.collection('products').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
          setProduct(snapshot.docs.map(doc => ({id: doc.id, modelNumber: doc.data().modelNumber, description: doc.data().description, price: doc.data().price})))
        })
      }, []);

    return (
          <div className={classes.root}>
            <Grid container spacing={2}>
              {product.map(p => (
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <h1 className={classes.heading}>{p.modelNumber}</h1>
                    <p className={classes.content}>{p.description}</p>
                    <p>Price: ₹{p.price}</p>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
    )
}

export default AllProducts
