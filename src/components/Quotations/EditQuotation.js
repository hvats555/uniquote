import React, {useState, useEffect} from 'react'
import db from '../../firebase';
import firebase from 'firebase';
import ProductSearch from '../Products/ProductSearch/ProductSearch';
import ProductTable from '../Products/ProductTable/ProductTable';
import CustomerInputForm from '../Customers/CustomerInputForm';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '../UI/Modal/Modal';

const useStyles = makeStyles((theme) => ({
  quotationSubmitButton : {
      margin: '25px 0'
  },
  quotationShow : {
    color: 'white',
    backgroundColor: 'orange'
  }
}));

function EditQuotation({match}) {  
    const classes = useStyles();
  
    const quotationInitialState = {name : '', address: '', phoneNumber: '', email: '', gstin: '', products: []};
    const productInitialState = {brand: '', modelNumber: '', quantity: '', discount: '', tax: ''};
    
    const [pdfLink, setPdfLink] = useState('');

    const [quotation, setQuotation] = useState({
      name: '',
      address: '',
      phoneNumber: '',
      email: ''
    });

    const [searchResults, setSearchResults] = useState([]);

    const [product, setProduct] = useState({
      brand: '',
      modelNumber: '',
      quantity: '',
      tax: '',
      discount: ''
    });

    const [open, setOpen] = useState(false);
    
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [productValidationErrors, setProductValidationErrors] = useState({
      brand: {
        isError: false,
        errorText: ''
      },
      modelNumber: {
        isError: false,
        errorText: ''
      },
      quantity: {
        isError: false,
        errorText: ''
      },
      tax: {
        isError: false,
        errorText: ''
      },
      discount: {
        isError: false,
        errorText: ''
      }
    });

    const [quotationValidationErrors, setQuotationValidationErrors] = useState({
      name: {
        isError: false,
        errorText: ''
      },
      address: {
        isError: false,
        errorText: ''
      },
      phoneNumber: {
        isError: false,
        errorText: ''
      },
      email: {
        isError: false,
        errorText: ''
      },
      products: {
        isError: false,
        errorText: ''
      }
    });

    useEffect(() => {
        db.collection('quotations').doc(match.params.id).get().then(function(snapshot){
          setQuotation(snapshot.data());
        })
    }, []);

    const handleQuotationValidation = () => {
      const fields = quotation;
      let errors = {...quotationValidationErrors};
      let formIsValid = true;
      
      // Cannot be empty
      if(!fields['name']){
        formIsValid = false;
        errors.name['isError'] = !formIsValid;
        errors.name['errorText'] = 'Cannot be empty';
      }

      if(!fields['address']){
        formIsValid = false;
        errors.address['isError'] = !formIsValid;
        errors.address['errorText'] = 'Cannot be empty';
      }

      if(!fields['phoneNumber']){
        formIsValid = false;
        errors.phoneNumber['isError'] = !formIsValid;
        errors.phoneNumber['errorText'] = 'Cannot be empty';
      }

      // quantity has to be a number
      if(fields['phoneNumber'] && isNaN(fields['phoneNumber'])){
        formIsValid = false;
        errors.phoneNumber['isError'] = !formIsValid;
        errors.phoneNumber['errorText'] = 'Quantity has to be a number';
      }

      if(!fields['email']){
        formIsValid = false;
        errors.email['isError'] = !formIsValid;
        errors.email['errorText'] = 'Cannot be empty';
      }

      if(typeof fields["email"] !== "undefined"){
        let lastAtPos = fields["email"].lastIndexOf('@');
        let lastDotPos = fields["email"].lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
          formIsValid = false;
          errors.email['isError'] = !formIsValid;
          errors.email["errorText"] = "Email is not valid";
         }
      }
      
      if(fields['products'].length == 0){
          formIsValid = false;
          errors.products['isError'] = !formIsValid;
          errors.products["errorText"] = "You must add atleast 1 product.";
      }

      setQuotationValidationErrors(errors);

      return formIsValid;
    }

    const handleProductValidation = () => {
      const fields = product;
      let errors = {...productValidationErrors};
      let formIsValid = true;
      
      // Cannot be empty
      if(!fields['modelNumber']){
        formIsValid = false;
        errors.modelNumber['isError'] = !formIsValid;
        errors.modelNumber['errorText'] = 'Cannot be empty';
      }

      if(!fields['brand']){
        formIsValid = false;
        errors.brand['isError'] = !formIsValid;
        errors.brand['errorText'] = 'Cannot be empty';
      }

      if(!fields['quantity']){
        formIsValid = false;
        errors.quantity['isError'] = !formIsValid;
        errors.quantity['errorText'] = 'Cannot be empty';
      }

      // quantity has to be a number
      if(fields['quantity'] && isNaN(fields['quantity'])){
        formIsValid = false;
        errors.quantity['isError'] = !formIsValid;
        errors.price['errorText'] = 'Quantity has to be a number';
      }

      if(!fields['tax']){
        formIsValid = false;
        errors.tax['isError'] = !formIsValid;
        errors.tax['errorText'] = 'Cannot be empty';
      }

      // quantity has to be a number
      if(fields['tax'] && isNaN(fields['tax'])){
        formIsValid = false;
        errors.tax['isError'] = !formIsValid;
        errors.tax['errorText'] = 'Tax has to be a number';
      }

      if(!fields['discount']){
        formIsValid = false;
        errors.discount['isError'] = !formIsValid;
        errors.discount['errorText'] = 'Cannot be empty';
      }

      // discount has to be a number
      if(fields['discount'] && isNaN(fields['discount'])){
        formIsValid = false;
        errors.disocunt['isError'] = !formIsValid;
        errors.disocunt['errorText'] = 'Discount has to be a number';
      }

      setProductValidationErrors(errors);
      return formIsValid;
    }

    async function searchDb(event){
        setSearchResults([]);
        if(event.target.value !== ''){
          await db.collection('products').where('modelNumber', '>=', event.target.value).where('modelNumber', '<=', event.target.value + '\uf8ff').get().then(function(snapshot){      
            setSearchResults(snapshot.docs.map(doc => (
              {
                productId:doc.id,
                modelNumber: doc.data().modelNumber,
                description: doc.data().description,
                imageURL: doc.data().imageURL,
                price: doc.data().price
              }
            )));
          });
        }
      }
    
      const searchListClickHandler = (selectedproduct) => {
          setProduct({...product, ...selectedproduct});
          setSearchResults([]);
      }

      const productInputHandler = (key, value) => {
        setProduct({...product, [key]: value});
      }

      const customerInputHandler = (key, value) => {
        setQuotation({...quotation, [key]: value});
      }

      const calculateProductPricing = (unitPrice, quantity, tax, discount) => {
        const productPrice = unitPrice * quantity;
        const taxValue = (tax/100)* productPrice;
        const discountValue = Math.ceil((discount/100) * productPrice);
        const totalPrice = Math.ceil((productPrice - discountValue) + taxValue);

        const productPricing = {
          productPrice : productPrice,
          taxValue: taxValue,
          discountValue: discountValue,
          totalPrice: totalPrice
        }

        if(totalPrice === taxValue){
            return 0
        }else{
          return productPricing;
        }
    }
    
      const addProductHandler = (event) => { 
        if(handleProductValidation()){
          let newQuotation = quotation;   
          let newProduct = product;  
          let grandTotal = 0;
          let totalTax = 0;
          let totalDiscount = 0;
          let productPricing = calculateProductPricing(newProduct.price, newProduct.quantity, newProduct.tax, newProduct.discount);
          console.log(productPricing);

          newProduct['productPricing'] = productPricing;

          newQuotation['products'] = newQuotation['products'] ? newQuotation['products'] : [];

          newQuotation['products'].push(newProduct);

          newQuotation.products.forEach(product => {
            grandTotal += product.productPricing.totalPrice;
            totalDiscount += product.productPricing.discountValue;
            totalTax += product.productPricing.taxValue;
          });

          newQuotation['totalPricing'] = {
            grandTotal: grandTotal,
            totalDiscount: totalDiscount,
            totalTax: totalTax,
          };

          setQuotation(newQuotation);
          setProduct(productInitialState);

          setProductValidationErrors({
            brand: {
              isError: false,
              errorText: ''
            },
            modelNumber: {
              isError: false,
              errorText: ''
            },
            quantity: {
              isError: false,
              errorText: ''
            },
            tax: {
              isError: false,
              errorText: ''
            },
            discount: {
              isError: false,
              errorText: ''
            }
          })
        }
        event.preventDefault();

      }

      const quotationSubmitHandler = () => {
        if(handleQuotationValidation()){
          let newQuotation = quotation;
          newQuotation["timestamp"] = firebase.firestore.FieldValue.serverTimestamp();
          db.collection("quotations").doc(match.params.id).update(newQuotation).then(async function(docRef) {
            setPdfLink(`https://us-central1-${process.env.REACT_APP_FIREBASE_PROJECT_ID}.cloudfunctions.net/makePdf/quotations/${docRef.id}/pdf`);
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
          });
  
          setQuotation(quotationInitialState);
          setProduct(productInitialState);
          setQuotationValidationErrors({
            name: {
              isError: false,
              errorText: ''
            },
            address: {
              isError: false,
              errorText: ''
            },
            phoneNumber: {
              isError: false,
              errorText: ''
            },
            email: {
              isError: false,
              errorText: ''
            },
            products: {
              isError: false,
              errorText: ''
            }
          });
          handleOpen();
        }

      }

      const deleteTableProduct = (productId) => {
        let newQuotation = {...quotation};

        const productIndex = newQuotation.products.findIndex(p => p.productId === productId);

        newQuotation.totalPricing['grandTotal'] -= newQuotation.products[productIndex].productPricing.totalPrice;
        newQuotation.totalPricing['totalDiscount'] -= newQuotation.products[productIndex].productPricing.discountValue;
        newQuotation.totalPricing['totalTax'] -= newQuotation.products[productIndex].productPricing.taxValue;

        if(productIndex > -1){
          newQuotation.products.splice(productIndex, 1);
        }

        setQuotation(newQuotation);
      }

      const editTableProduct = (productId) => {
        let newQuotation = {...quotation};
        let newProduct = {};
        const productIndex = newQuotation.products.findIndex(p => p.productId === productId);

        if(productIndex > -1){
            newProduct = {
              brand: newQuotation.products[productIndex].brand,
              modelNumber: newQuotation.products[productIndex].modelNumber,
              description: newQuotation.products[productIndex].description,
              price: newQuotation.products[productIndex].price,
              imageURL: newQuotation.products[productIndex].imageURL,
              quantity: newQuotation.products[productIndex].quantity,
              discount: newQuotation.products[productIndex].discount,
              tax: newQuotation.products[productIndex].tax
            }
        }
        setProduct(newProduct);
        deleteTableProduct(productId);
      }

      console.log(quotationValidationErrors);

    return (
        <div>
            <h1>Edit Quotation</h1>

            <CustomerInputForm 
            quotation={quotation} 
            customerInputHandler={customerInputHandler}
            validationErrors={quotationValidationErrors} 
            ></CustomerInputForm>

            <ProductTable editTableProduct={editTableProduct} deleteTableProduct={deleteTableProduct} quotation={quotation} />

            <ProductSearch 
                  addProductHandler={addProductHandler} 
                  productInputHandler={productInputHandler} 
                  searchResults={searchResults} 
                  product={product} searchDb={searchDb} 
                  calculateProductPrice={calculateProductPricing} 
                  searchListClickHandler={searchListClickHandler}
                  validationErrors={productValidationErrors} 
                  />
            
            <Button 
            className={classes.quotationSubmitButton} 
            size="large" 
            variant="contained" 
            color="primary" 
            onClick={() => {quotationSubmitHandler()}}>Update Quotation</Button>

            <div style={{color: 'red'}}>
                {quotationValidationErrors.products.isError ? quotationValidationErrors.products.errorText : null}
            </div>

            <Modal open={open} handleClose={handleClose}>
              <p>Quotation has been Updated</p>
              <a href={pdfLink}>Download PDF</a>
            </Modal>
        </div>
    )
} 

export default EditQuotation
