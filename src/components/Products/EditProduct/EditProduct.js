import {useState, useEffect} from 'react';
import db from '../../../firebase';
import firebase from 'firebase';
import Input from '../../UI/Input/Input';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom';
import {storage} from '../../../firebase';
import './EditProduct.css';

function EditProduct({match}) {
    const [redirect, setRedirect] = useState(false);
    const [newImageUploaded, setNewUploaded] = useState(false);

    const [input, setInput] = useState(
      {
        modelNumber: '',
        description: '',
        price: '',
        imageURL: '',
        imageFileName: ''
      }
    );

    const [previousInput, setPreviousInput] = useState();

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

    useEffect(() => {
        db.collection('products').doc(match.params.id).get().then(function(snapshot){
          const product = {
            modelNumber: snapshot.data().modelNumber,
            description: snapshot.data().description,
            price: snapshot.data().price,
            imageURL: snapshot.data().imageURL,
            imageFileName: snapshot.data().imageFileName
        }
          setInput(product);
          setPreviousInput(product);
        })
    }, []);

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
            setImage(null);
            setInput({
              ...input,
              imageURL: url,
              imageFileName: imageName
            });
            setNewUploaded(true);
          });
      });
    }

    const deleteProductImage = (imageRef) => {
      const deleteRef = storage.ref().child(`productImages/${imageRef}`);
      
      deleteRef.delete().then(function(){
        console.log("File deleted successfully");
      }).catch(function(error){
        console.log("Cannot delete file");
      });
    }

    const sanatizeInput = (input) => {
      return input.toLowerCase()
    }
  
    const updateProduct = (event) => {
      event.preventDefault();

      let sanatizedModelNumber = sanatizeInput(input.modelNumber);
      let sanatizedDescription = sanatizeInput(input.description);


      if(handleProductValidation()){
        db.collection('products').doc(match.params.id).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          modelNumber: sanatizedModelNumber,
          description: sanatizedDescription,
          price: input.price,
          imageURL: input.imageURL,
          imageFileName: input.imageFileName
        });

        if(newImageUploaded){
          deleteProductImage(previousInput.imageFileName);
        }

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
        setRedirect(true);
      }
    }

    const handleFileChange = (event) => {
      setImage(event.target.files[0]);
    }

    return (
        <div>
        <h1>Edit product</h1>
        <p>Update product details</p>
          <div>
            <Input 
            errorState={productValidationErrors.modelNumber.isError}
            helperText={productValidationErrors.modelNumber.errorText}
            label="Model Number" 
            value={input.modelNumber} 
            inputKey={'modelNumber'} 
            inputChangeHandler={inputChangeHandler} 
            fullWidth={true}
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
            fullWidth={true}
            size="small"
            inputChangeHandler={inputChangeHandler} />
          </div>

          <div>
            <input type="file" onChange={(event) => {handleFileChange(event)}}/>
            <button disabled={image == null} onClick={handleUpload}>Update Image</button>
          </div>

            {input.imageURL ?
            <div className="productImage">
              <img src={input.imageURL} alt="Product" />
            </div>
            : null}
            <p>{productValidationErrors.imageURL.errorText}</p>

          <Button size="medium" type="submit" variant="contained" color="primary" onClick={(event) => {updateProduct(event)}}>Update product</Button> 

          {redirect ? <Redirect to="/products"/> : null}
      </div>
    )
}

export default EditProduct
