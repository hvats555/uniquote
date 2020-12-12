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
                <TextField size="small" fullWidth className={classes.input} label="Name" variant="outlined" type="text" value={props.quotation.name} onChange={event => (props.customerInputHandler("name", event.target.value))} required/>
            </div>            
            <div>
                <TextField size="small" fullWidth className={classes.input} label="Address" variant="outlined" type="text" value={props.quotation.address} onChange={event => (props.customerInputHandler("address", event.target.value))} required/>
            </div>
            <div>
                <TextField size="small" fullWidth className={classes.input} label="Phone Number" variant="outlined" type="number" value={props.quotation.phoneNumber} onChange={event => (props.customerInputHandler("phoneNumber", Number(event.target.value)))} required/>
            </div>
            <div>
                <TextField size="small" fullWidth className={classes.input} label="Email" variant="outlined" type="email" value={props.quotation.email} onChange={event => (props.customerInputHandler("email", event.target.value))} required/>
            </div>
            <div>
                <TextField size="small" fullWidth className={classes.input} label="GSTIN" variant="outlined" type="text" value={props.quotation.gstin} onChange={event => (props.customerInputHandler("gstin", event.target.value))}/><br />
            </div>
        </div>
    )
}

export default CustomerInputForm
