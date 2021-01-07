import {useState} from 'react';
import db from '../../firebase';
import firebase from 'firebase';
import Input from '../UI/Input/Input';
import Button from '@material-ui/core/Button';
import './AddProduct.css';

function AddProduct() {
    const [input, setInput] = useState(
      {
        modelNumber: '',
        description: '',
        price: '',
        imageURL: '',
        imageFileName: ''
      }
    );

    const [image, setImage] = useState(null);

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
      },
      imageURL: {
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

    function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    
    function handleUpload(e) {
      e.preventDefault();
      const imageName = uuidv4() + '.' + image.type.slice(6);
      const uploadTask = firebase.storage().ref(`/productImages/${imageName}`).put(image);
      uploadTask.on("state_changed", console.log, console.error, () => { 
        firebase.storage()
          .ref("productImages")
          .child(imageName)
          .getDownloadURL()
          .then((url) => {
            setInput({
              ...input,
              imageURL: url,
              imageFileName: imageName
            });
          });
      });
    }

    const sanatizeInput = (input) => {
      return input.toLowerCase()
    }
  
    const addProduct = (event) => {
      event.preventDefault();
      if(handleProductValidation()){
        let sanatizedModelNumber = sanatizeInput(input.modelNumber);
        let sanatizedDescription = sanatizeInput(input.description);

        db.collection('products').add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          modelNumber: sanatizedModelNumber,
          description: sanatizedDescription,
          price: input.price,
          imageURL: input.imageURL,
          imageFileName: input.imageFileName
        });

        setInput({
          modelNumber: '',
          description: '',
          price: '',
          imageURL: '',
          imageFileName: ''
        });

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
          },
          imageURL: {
            isError: false,
            errorText: ''
          }
        });
      }
    }

    const handleFileChange = (event) => {
      setImage(event.target.files[0]);
    }

    return (
        <div>
        <h1>Add product</h1>
          <div>
            <Input 
            errorState={productValidationErrors.modelNumber.isError}
            helperText={productValidationErrors.modelNumber.errorText}
            label="Model Number" 
            value={input.modelNumber} 
            inputKey={'modelNumber'} 
            inputChangeHandler={inputChangeHandler} 
            size="small"
            fullWidth={true}
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
            fullWidth={true}
            multiline={true}
            rowsMax={5}
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
            fullWidth={true}
            inputChangeHandler={inputChangeHandler} />
          </div>

          <div>
            <input type="file" onChange={(event) => {handleFileChange(event)}}/>
            <button disabled={image == null} onClick={handleUpload}>Upload Image</button>
          </div>

            {input.imageURL ?
            <div className="productImage">
              <img src={input.imageURL} alt="Product" />
            </div>
            : null}
            <p>{productValidationErrors.imageURL.errorText}</p>

          <Button size="medium" type="submit" variant="contained" color="primary" onClick={(event) => {addProduct(event)}}>Add product</Button> 
      </div>
    )
}

export default AddProduct
