import React from 'react'
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ProductSearchResults from './ProductSearchResults/ProductSearchResults';

const useStyles = makeStyles((theme) => ({
    input : {
        margin: '2px 2px',
        width: '50%'
    },
    productForm: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

function ProductSearch(props) {
    const classes = useStyles();
    return(
        <div>
            <form>
                <div className={classes.productForm}>
                    <TextField 
                    className={classes.input} 
                    size="small" 
                    label="Model Number" 
                    variant="outlined" 
                    value={props.product.modelNumber} 
                    onChange={event => {props.productInputHandler("modelNumber", event.target.value); props.searchDb(event); }} 
                    error={props.validationErrors.modelNumber.isError} 
                    helperText={props.validationErrors.modelNumber.errorText}/>

                    <TextField 
                    className={classes.input} 
                    size="small" 
                    label="Brand" 
                    variant="outlined" 
                    type="text" 
                    value={props.product.brand} 
                    onChange={event => props.productInputHandler("brand",event.target.value)} 
                    error={props.validationErrors.brand.isError} 
                    helperText={props.validationErrors.brand.errorText}/>

                    <TextField 
                    className={classes.input} 
                    size="small" 
                    label="Product quantity" 
                    variant="outlined" 
                    type="number" 
                    value={props.product.quantity} 
                    onChange={event => props.productInputHandler("quantity",Number(event.target.value))} 
                    error={props.validationErrors.quantity.isError} 
                    helperText={props.validationErrors.quantity.errorText}/>

                    <TextField 
                    className={classes.input} 
                    size="small" 
                    label="Tax" 
                    variant="outlined" 
                    type="number" 
                    value={props.product.tax} 
                    onChange={event => props.productInputHandler("tax",Number(event.target.value))} 
                    error={props.validationErrors.tax.isError} 
                    helperText={props.validationErrors.tax.errorText}/>

                    <TextField 
                    className={classes.input} 
                    size="small" 
                    label="Discount" 
                    variant="outlined" 
                    type="number"
                    value={props.product.discount} 
                    onChange={event => props.productInputHandler("discount",Number(event.target.value))} 
                    error={props.validationErrors.discount.isError} 
                    helperText={props.validationErrors.discount.errorText} />

                    <Button 
                    size='large' 
                    className={classes.addProductButton} 
                    variant="contained" 
                    color="secondary" 
                    type="submit" 
                    onClick={props.addProductHandler}>
                        Add
                    </Button>
                </div>
            </form>

            <ProductSearchResults searchListClickHandler={props.searchListClickHandler} results={props.searchResults} />
        </div>
    )
}

export default ProductSearch
