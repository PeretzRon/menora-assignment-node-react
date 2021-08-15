import React from "react";
import classes from './Header.module.css';
import {AppBar, Box, Toolbar, Typography} from "@material-ui/core";
import {title} from "../../utils/texts";
import FiberDvrIcon from '@material-ui/icons/FiberDvr';

const Header = () => {
    return (
        <Box component="div">
            <AppBar position="static" className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <FiberDvrIcon className={classes.icon}/>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
