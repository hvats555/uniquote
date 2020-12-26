import React, {useContext, useEffect, useState} from 'react';
import Modal from '@material-ui/core/Modal';

const modalContext = React.createContext();

export function useModal(){
    return useContext();
}

// ... do it later in refactoring