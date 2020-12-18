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