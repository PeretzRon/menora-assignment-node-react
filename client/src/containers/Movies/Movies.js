import React from "react";
import classes from './Movies.module.css';
import MovieCard from "../../components/MovieCard/MovieCard";
import {Grid} from "@material-ui/core";
import MoreDetailsDialog from "../../components/MovieMoreDetails/MoreDetailsDialog";

const Movies = props => {
    const [moreDetailsDialog, setMoreDetailsDialog] = React.useState({
        isOpen: false,
        selectedMovie: null,
    });

    const onMovieCardClickAction = id => {
        const selectedMovie = props.movies.find(movie => movie.imdbID === id);
        setMoreDetailsDialog({...moreDetailsDialog, isOpen: true, selectedMovie: selectedMovie});
    };

    const onDialogClose = () => {
        setMoreDetailsDialog({...moreDetailsDialog, isOpen: false, selectedMovie: null});
    };

    const popularMovies = props.movies.map(movie => {
        return <Grid key={movie.imdbID}
                     item
                     xs={12} sm={6} md={4} lg
                     onClick={() => onMovieCardClickAction(movie.imdbID)}>
            <MovieCard {...movie}/>
        </Grid>;
    });

    return (
        <div className={classes.movies}>
            {props.message.length > 0 && <h1>{props.message}</h1>}
            <Grid container
                  spacing={3}
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
            >
                {popularMovies}
                {moreDetailsDialog.isOpen && <MoreDetailsDialog
                    onClose={onDialogClose}
                    dialogMoreDetails={moreDetailsDialog}/>}
            </Grid>
        </div>
    );
};

export default Movies;
