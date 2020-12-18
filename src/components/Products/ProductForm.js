import {useState} from 'react';
import db from '../../firebase';
import firebase from 'firebase';
import Input from '../UI/Input/Input';
import Button from '@material-ui/core/Button';
import Modal from '../UI/Modal/Modal';
import {Link} from 'react-router-dom';



function ProductForm() {
  const [open, setOpen] = useState(false);

    const [input, setInput] = useState(
      {
        modelNumber: '',
        description: '',
        price: ''
      }
    );

    const [productValidationErrors, setProductValidationErrors] = useState({
      price: {
        isError: false,
        errorText: ''
      },
      modelNumber: {
        isError: false,
        errorText: ''
      },
      description: {
        isError: false,
        errorText: ''
      }
    });

    const handleProductValidation = () => {
      const fields = input;
      let errors = {...productValidationErrors};
      let formIsValid = true;
      
      // Cannot be empty
      if(!fields['modelNumber']){
        formIsValid = false;
        errors.modelNumber['isError'] = !formIsValid;
        errors.modelNumber['errorText'] = 'Cannot be empty';
      }

      if(!fields['description']){
        formIsValid = false;
        errors.description['isError'] = !formIsValid;
        errors.description['errorText'] = 'Cannot be empty';
      }

      if(!fields['price']){
        formIsValid = false;
        errors.price['isError'] = !formIsValid;
        errors.price['errorText'] = 'Cannot be empty';
      }

      // Price has to be a number
      if(fields['price'] && isNaN(fields['price'])){
        formIsValid = false;
        errors.price['isError'] = !formIsValid;
        errors.price['errorText'] = 'Price has to be a number';
      }

      setProductValidationErrors(errors);
      return formIsValid;
    }
    
    const inputChangeHandler = (key, value) => {
      setInput({...input, [key]: value});
    }

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const addProduct = (event) => {
      event.preventDefault();
      if(handleProductValidation()){
        db.collection('products').add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          modelNumber: input.modelNumber,
          description: input.description,
          price: input.price
        });

        setInput({modelNumber: '', description: '', price: ''});

        setProductValidationErrors({
          price: {
            isError: false,
            errorText: ''
          },
          modelNumber: {
            isError: false,
            errorText: ''
          },
          description: {
            isError: false,
            errorText: ''
          }
        });

        handleOpen()

      }
    }

    return (
        <div>
        <h1>Add product</h1>
        <p>Enter product details</p>
          <div>
            <Input 
            errorState={productValidationErrors.modelNumber.isError}
            helperText={productValidationErrors.modelNumber.errorText}
            label="Model Number" 
            value={input.modelNumber} 
            inputKey={'modelNumber'} 
            inputChangeHandler={inputChangeHandler} 
            size="small"
            variant="outlined"/>
          </div>

          <div>
            <Input 
            errorState={productValidationErrors.description.isError}
            helperText={productValidationErrors.description.errorText}
            label="Description" 
            value={input.description} 
            inputKey={'description'} 
            size="small"
            inputChangeHandler={inputChangeHandler} />
          </div>

          <div>
            <Input 
            errorState={productValidationErrors.price.isError}
            helperText={productValidationErrors.price.errorText}
            label="Price" 
            value={input.price} 
            inputKey={'price'} 
            size="small"
            inputChangeHandler={inputChangeHandler} />
          </div>

          <Button size="medium" type="submit" variant="contained" color="primary" onClick={(event) => {addProduct(event)}}>Add product</Button> 

          <Modal open={open} handleClose={handleClose}>
              <p>Product has been added</p>
              <Link to="/quotations/new">New Quotation</Link>
          </Modal>

      </div>
    )
}

export default ProductForm
