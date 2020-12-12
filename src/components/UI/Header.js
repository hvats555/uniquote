import React from 'react'
import {Link} from 'react-router-dom';
import {AppBar, Toolbar, makeStyles} from '@material-ui/core';

import Logo from './Logo/Logo';

const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}

const useStyles = makeStyles(() => ({
    header: {
       backgroundColor: "#400CCC",
    }
 }));

function Header() {
    const { header } = useStyles(); 

    return (
        <div>
            <AppBar className={header}>
                <Toolbar>
                    <Link style={linkStyle}to="/"><Logo /></Link>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
