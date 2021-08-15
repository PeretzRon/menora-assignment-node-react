import React from "react";
import classes from './Header.module.css';
import {Box, Typography} from "@material-ui/core";

const Header = () => {
    return (
        <Box component="div">
            <Typography component="h2" className={classes.Header}>Menora - Movies IMDB</Typography>
        </Box>
    );
};

export default Header;
