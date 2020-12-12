import {useState} from 'react';
import db from '../../firebase';
import firebase from 'firebase';
import TextField from '@material-ui/core/TextField';


function ProductForm() {


    const [input, setInput] = useState(
      {
        modelNumber: '',
        description: '',
        price: ''
      }
    );
  
    const addProduct = (event) => {
      event.preventDefault();
      db.collection('products').add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        modelNumber: input.modelNumber,
        description: input.description,
        price: input.price
      });
    }

    return (
        <div>
        <h1>Add product</h1>
        <p>Enter product details</p>
        <form>  
          <TextField variant="outlined" label="Model Number" type="text" value={input.modelNumber} onChange={event => setInput((input) => ({...input, modelNumber: event.target.value}))} required />
          <TextField variant="outlined" label="Product Description" type="text" value={input.description} onChange={event => setInput((input) => ({...input, description: event.target.value}))} required />
          <TextField variant="outlined" label="Price" type="number" value={input.price} onChange={event => setInput((input) => ({...input, price: event.target.value}))} required />
          <button type="submit" onClick={addProduct}>Add product</button>
        </form>
      </div>
    )
}

export default ProductForm
