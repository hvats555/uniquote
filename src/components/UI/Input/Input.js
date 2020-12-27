import React from 'react'
import TextField from '@material-ui/core/TextField';

function Input(props) {

    return (
        <TextField style={{margin: '2px'}}
        error={props.errorState}
        helperText={props.helperText}
        fullWidth={props.fullWidth}
        variant="outlined" 
        size={props.size}
        label={props.label} 
        multiline={props.multiline}
        rowsMax={props.rowsMax}
        type="text" 
        value={props.value} 
        onChange={event => {props.inputChangeHandler(props.inputKey, event.target.value)}}/>
    )
}

export default Input



