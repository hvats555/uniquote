import React from 'react'
import TextField from '@material-ui/core/TextField';

function Input(props) {

    return (
        <TextField 
        error={props.errorState}
        helperText={props.helperText}
        fullWidth
        variant="outlined" 
        size={props.size}
        label={props.label} 
        type="text" 
        value={props.value} 
        onChange={event => {props.inputChangeHandler(props.inputKey, event.target.value)}}/>
    )
}

export default Input



