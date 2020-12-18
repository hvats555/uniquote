import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    input : {
        margin: '5px 0'
    }
}));

function CustomerInputForm(props) {
    const classes = useStyles();
    return (
        <div>
            <p> Enter Customer details</p>

            <div>
                <TextField 
                size="small" 
                fullWidth 
                className={classes.input} 
                label="Name" 
                variant="outlined" 
                type="text" 
                value={props.quotation.name} 
                error={props.validationErrors.name.isError} 
                helperText={props.validationErrors.name.errorText} 
                onChange={event => (props.customerInputHandler("name", event.target.value))}/>
            </div>            
            <div>
                <TextField 
                size="small" 
                fullWidth 
                className={classes.input} 
                label="Address" 
                variant="outlined" 
                type="text" 
                value={props.quotation.address}
                error={props.validationErrors.address.isError} 
                helperText={props.validationErrors.address.errorText} 
                onChange={event => (props.customerInputHandler("address", event.target.value))}/>
            </div>
            <div>
                <TextField 
                size="small" 
                fullWidth 
                className={classes.input} 
                label="Phone Number" 
                variant="outlined" 
                type="number" 
                value={props.quotation.phoneNumber} 
                error={props.validationErrors.address.isError} 
                helperText={props.validationErrors.phoneNumber.errorText}
                onChange={event => (props.customerInputHandler("phoneNumber", Number(event.target.value)))}/>
            </div>
            <div>
                <TextField 
                size="small" 
                fullWidth 
                className={classes.input} 
                label="Email" 
                variant="outlined" 
                type="email" 
                value={props.quotation.email} 
                error={props.validationErrors.email.isError} 
                helperText={props.validationErrors.email.errorText}
                onChange={event => (props.customerInputHandler("email", event.target.value))}/>
            </div>
        </div>
    )
}

export default CustomerInputForm
