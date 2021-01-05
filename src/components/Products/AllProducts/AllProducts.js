import {useState, useEffect} from 'react';
import db from '../../../firebase';
import './AllProducts.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {storage} from '../../../firebase';

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
    textTransform: 'uppercase',
    fontSize: '22px',
  }
}));

function AllProducts() {
  const classes = useStyles();
    const [product, setProduct] = useState([]);
    
    useEffect(() => {
        db.collection('products').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
          setProduct(snapshot.docs.map(doc => (
            {id: doc.id,
              modelNumber: doc.data().modelNumber,
              description: doc.data().description,
              price: doc.data().price,
              imageURL: doc.data().imageURL,
              imageFileName: doc.data().imageFileName
            })))
        })
      }, []);

      const deleteProductImage = (imageRef) => {
        const deleteRef = storage.ref().child(`productImages/${imageRef}`);
        deleteRef.delete().then(function(){
          console.log("File deleted successfully");
        }).catch(function(error){
          console.log("Cannot delete file");
        });
      }

      const deleteProductHandler = (id, imageFileName) => {
        deleteProductImage(imageFileName);
        db.collection('products').doc(id).delete();
      }

      const storageRef = storage.ref();
      console.log(storageRef);
    return (
          <div className={classes.root}>
            <Grid container spacing={2}>
              {product.map(p => (
                <Grid item xs={3} key={p.id}>
                  <Paper className={classes.paper}>
                    {p.imageURL ?
                    <div className='imageContainer'>
                      <img id="productImage" className='productImage' src={p.imageURL} alt="product" />
                    </div> : null }
                    <h1 className={classes.heading}>{p.modelNumber}</h1>
                    <p className={classes.content}>{p.description}</p>
                    <p>Price: ₹{p.price}</p>
                    <div className="productOptions">
                      <Link style={linkStyle} to={`/products/${p.id}/edit`}>
                        <Button size="small" variant="contained" color="primary">Edit</Button>
                      </Link>
                    <Button color="secondary" onClick={event => deleteProductHandler(p.id, p.imageFileName)}>Delete</Button>
                    </div>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
    )
}

export default AllProducts
