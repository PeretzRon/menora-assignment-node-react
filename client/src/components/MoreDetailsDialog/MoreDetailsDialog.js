import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MuiThemeProvider,
    unstable_createMuiStrictModeTheme as createMuiTheme
} from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import EventNoteIcon from '@material-ui/icons/EventNote';
import GradeIcon from '@material-ui/icons/Grade';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import GroupIcon from '@material-ui/icons/Group';
import {moviePopupTexts} from '../../utils/texts';
import classes from './MoreDetailsDialog.module.css';

// to get rid from findDOMNode is deprecated in StrictMode without cancel strict mode
const theme = createMuiTheme({});

const MoreDetailsDialog = props => {
    // const classes = useStyles(theme);
    return (
        <MuiThemeProvider theme={theme}>
            <Dialog
                open={props.dialogMoreDetails.isOpen}
                hideBackdrop={false}
                onClose={props.onClose}
            >
                <DialogTitle className={classes.dialogTitle}>
                    {props.dialogMoreDetails.selectedMovie.Title}
                </DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <EventNoteIcon/>
                            </ListItemIcon>
                            <ListItemText primary={moviePopupTexts.Released}
                                          secondary={props.dialogMoreDetails.selectedMovie.Released}/>
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <AccessTimeIcon/>
                            </ListItemIcon>
                            <ListItemText primary={moviePopupTexts.Runtime}
                                          secondary={`${props.dialogMoreDetails.selectedMovie.Runtime} minutes`}/>
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <GradeIcon/>
                            </ListItemIcon>
                            <ListItemText primary={moviePopupTexts.imdbRating}
                                          secondary={`${props.dialogMoreDetails.selectedMovie.imdbRating}`}/>
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <ThumbsUpDownIcon/>
                            </ListItemIcon>
                            <ListItemText primary={moviePopupTexts.imdbVotes}
                                          secondary={`${props.dialogMoreDetails.selectedMovie.imdbVotes}`}/>
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <GroupIcon/>
                            </ListItemIcon>
                            <ListItemText primary={moviePopupTexts.Actors}
                                          secondary={`${props.dialogMoreDetails.selectedMovie.Actors}`}/>
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions className={classes.dialogAction}>
                    <Button onClick={props.onClose} variant="outlined" color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </MuiThemeProvider>
    );
};

export default MoreDetailsDialog;
