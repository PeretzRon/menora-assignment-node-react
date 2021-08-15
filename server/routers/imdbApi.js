const express = require('express');
const fetch = require('node-fetch');
const NodeCache = require("node-cache");
const configuration = require('../config');


const router = express.Router();
const cache = new NodeCache({stdTTL: 600, useClones: false});

// const popularMoviesID = [{imdbID: 'tt0120591',}, {imdbID: 'tt1201607',}, {imdbID: 'tt0099253',},
//     {imdbID: 'tt0111161',}, {imdbID: 'tt0167261',}, {imdbID: 'tt0120338',}, {imdbID: 'tt0118158'},
//     {imdbID: 'tt0108778',}, {imdbID: 'tt0117571',}, {imdbID: 'tt0114709',}];

const popularMoviesID = [{imdbID: 'tt0120591'}];

async function getPopularMovies() {
    const popularMoviesCache = cache.get("PopularMoviesCache$");
    if (popularMoviesCache) {
        return popularMoviesCache;
    } else {
        const popularMovies = await getMoviesByID(popularMoviesID);
        if (popularMovies) {
            cache.set("PopularMoviesCache$", popularMovies);
        }
        return popularMovies;
    }
}

async function getMoviesByID(movies) {
    const allPromises = movies.map(movie => fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${configuration.apiKey}`));
    const all = await Promise.all(allPromises);
    const allMoviesAsJson = all.map(value => value.json());
    return await Promise.all(allMoviesAsJson);
}

router.get('/popularMovies', async (req, res) => {
    const movies = await getPopularMovies();
    res.status(200).send(movies);
});

router.get('/searchMovie', (req, res) => {
    const movieName = req.query.search;
    const valueFromCache = cache.get(movieName.toLowerCase());
    if (valueFromCache) {
        res.status(200).send(valueFromCache);
    } else {
        fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=${configuration.apiKey}`)
            .then(value => value.json())
            .then(results => {
                if (results.Error === 'Movie not found!') {
                    res.status(200).send(JSON.stringify([]));
                    return JSON.stringify([]);
                } else {
                    return getMoviesByID(results.Search);
                }
            })
            .then(results => {
                cache.set(movieName.toLowerCase(), results);
                res.status(200).send(results);
            }).catch(error => {
            res.status(501).send();
        });
    }
});

module.exports = {
    router,
    initialPopularMovies: getPopularMovies
};
