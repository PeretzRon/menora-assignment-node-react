import React, {useState} from "react";
import {Button, CircularProgress, IconButton, InputBase, Paper} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import classes from './SearchBar.module.css';

const SearchBar = props => {
    const [input, setInput] = useState("");
    const onTextChange = event => {
        setInput(event.target.value);
    };

    const onBackAction = () => {
        setInput("");
        props.onBackAction();
    };
    return (
        <div className={classes.searchBar}>
            {props.showBackButton &&
            <Button onClick={onBackAction}
                    variant="outlined"
                    color="primary"
                    className={classes.buttonBack}>
                Back
            </Button>}
            <Paper component="form" className={classes.paper}>
                <InputBase
                    className={classes.input}
                    value={input}
                    placeholder="Search..."
                    onChange={onTextChange}
                />
                {props.showLoading && <CircularProgress className={classes.progress}/>}
                <IconButton onClick={(event) => props.onClickSearch(event, input)} type="submit" aria-label="search">
                    <SearchIcon/>
                </IconButton>
            </Paper>
        </div>

    );
};

export default SearchBar;
