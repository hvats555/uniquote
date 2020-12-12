import React from 'react'
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';



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
                    <TextField className={classes.input} size="small" label="Brand" variant="outlined" type="text" value={props.product.brand} onChange={event => props.productInputHandler("brand",event.target.value)} required />
                    <TextField className={classes.input} size="small" label="Model Number" variant="outlined" value={props.product.modelNumber} onChange={event => {props.productInputHandler("modelNumber", event.target.value); props.searchDb(event); }} required />
                    <TextField className={classes.input} size="small" label="Product quantity" variant="outlined" type="number" value={props.product.quantity} onChange={event => props.productInputHandler("quantity",Number(event.target.value))} required />
                    <TextField className={classes.input} size="small" label="Tax" variant="outlined" type="number" value={props.product.tax} onChange={event => props.productInputHandler("tax",Number(event.target.value))} required />
                    <TextField className={classes.input} size="small" label="Discount" variant="outlined" type="number" value={props.product.discount} onChange={event => props.productInputHandler("discount",Number(event.target.value))} required />
                    <IconButton size='large' className={classes.addProductButton} variant="contained" color="secondary" type="submit" onClick={props.addProductHandler}> <AddCircleIcon fontSize="large" /></IconButton>
                </div>
            </form>

            {props.searchResults.map(s => (
                    <div key={s.productId}>
                        <hr />
                        <p>{s.modelNumber}</p>
                        <p>{s.description}</p>
                        <p>{s.productId}</p>
                        <button onClick={event => props.searchListClickHandler(s)}>Add to list</button>
                        <hr />
                    </div>
            ))} 
        </div>
    )
}

export default ProductSearch
