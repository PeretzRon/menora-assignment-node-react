import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Rating} from "@material-ui/lab";
import classes from './MovieCard.module.css';
import {Box} from "@material-ui/core";

const MovieCard = props => {
    let poster = props.Poster;
    // in case that poster not available, show default poster
    if (poster === 'N/A') {
        poster = 'https://thumbs.dreamstime.com/z/movie-film-festival-poster-template-design-modern-retro-vintage-style-can-be-used-background-backdrop-banner-brochure-125779526.jpg'
    }

    return (
        <Card className={classes.root}>
            <Typography className={classes.title} variant="h5">
                {props.Title}
            </Typography>
            <CardMedia
                className={classes.poster}
                image={poster}
                title="poster"
            />
            <CardContent className={classes.description}>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.Plot}
                </Typography>
            </CardContent>
            <Box className={classes.ratingBox} component="div" mb={3} borderColor="transparent">
                <Rating className={classes.rating}  readOnly  name="customized-10" value={Number(props.imdbRating)} precision={0.1} max={10}/>
            </Box>
        </Card>
    );
};

export default MovieCard;
