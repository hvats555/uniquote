import React from 'react'
import {useState} from 'react';
import db from '../../firebase';
import firebase from 'firebase';
import ProductSearch from '../Products/ProductSearch/ProductSearch';
import ProductTable from '../Products/ProductTable/ProductTable';
import CustomerInputForm from '../Customers/CustomerInputForm';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '../UI/Modal/Modal';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  quotationSubmitButton : {
      margin: '25px 0'
  },
  quotationShow : {
    color: 'white',
    backgroundColor: 'orange'
  }
}));

function QuotationForm() {  
    const classes = useStyles();
    

    const quotationInitialState = {name : '', address: '', phoneNumber: '', email: '', gstin: '', products: []};
    const productInitialState = {brand: '', modelNumber: '', quantity: '', discount: '', tax: ''};
    
    const [pdfLink, setPdfLink] = useState('');
    const [quotation, setQuotation] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [product, setProduct] = useState({});
    const [open, setOpen] = React.useState(false);

    db.collection('quotations').doc("zdsFSgVzK2m0BL5IFJDS").get().then(function(doc){
      console.log(doc.data());
    }).catch(function(err){
      console.log("Failled to get the doc from the database");
    });

    async function searchDb(event){
        setSearchResults([]);
        if(event.target.value !== ''){
          await db.collection('products').where('modelNumber', '>=', event.target.value).where('modelNumber', '<=', event.target.value + '\uf8ff').get().then(function(snapshot){      
            setSearchResults(snapshot.docs.map(doc => ( {productId:doc.id, modelNumber: doc.data().modelNumber, description: doc.data().description, price: doc.data().price} )));
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
        const discountValue = (discount/100) * productPrice;
        const totalPrice = (productPrice - discountValue) + taxValue;

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
          let newQuotation = quotation;   
          let newProduct = product;  
          let grandTotal = 0;
          let totalTax = 0;
          let totalDiscount = 0;;
          let productPricing = calculateProductPricing(newProduct.price, newProduct.quantity, newProduct.tax, newProduct.discount);

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

          event.preventDefault();
      }

      const quotationSubmitHandler = () => {
        let newQuotation = quotation;
        newQuotation["timestamp"] = firebase.firestore.FieldValue.serverTimestamp();
        db.collection("quotations").add(newQuotation).then(async function(docRef) {
          setPdfLink(`https://us-central1-uniquote-d48ca.cloudfunctions.net/makePdf/quotations/${docRef.id}/pdf`);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });

        setQuotation(quotationInitialState);
        setProduct(productInitialState);
      }

      const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


    return (
        <div>
            <h1>Create new Quotation</h1>
            <CustomerInputForm quotation={quotation} customerInputHandler={customerInputHandler}></CustomerInputForm>
            <ProductTable quotation={quotation} />
            <ProductSearch 
                  addProductHandler={addProductHandler} 
                  productInputHandler={productInputHandler} 
                  searchResults={searchResults} 
                  product={product} searchDb={searchDb} 
                  calculateProductPrice={calculateProductPricing} 
                  searchListClickHandler={searchListClickHandler} 
                  />
            
            <Button className={classes.quotationSubmitButton} size="large" variant="contained" color="primary" onClick={() => {quotationSubmitHandler(); handleOpen()}}>Save Quotation</Button> 
            <Modal open={open} handleClose={handleClose}>
              <p>Quotation has been saved</p>
              {/* <Button className={classes.quotationShow} size="large" variant="contained" color="">Show Quotation</Button>  */}
              <a href={pdfLink}>Download PDF</a>
            </Modal>
        </div>
    )
} 

export default QuotationForm
