import React, {useEffect, useState} from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Movies from "../Movies/Movies";
import imdbApi from "../../api/imdbApi";
import {serverMessages} from '../../utils/texts';

let popularMovies = []; // keep the poplar movies list for user go back from search results
const Body = () => {

    const [movies, setMovies] = useState([]);
    const [showAdditionalComponent, setShowAdditionalComponent] = useState({
        showBackButton: false,
        showLoading: false,
        message: "",
    });

    const handleSearch = (event, input) => {
        event.preventDefault();
        if (input === '') return; // no input, do nothing
        setShowAdditionalComponent({...showAdditionalComponent, showLoading: true, message: ""});
        imdbApi.getMoviesByText(input)
            .then(searchResultsMovies => {
                if (searchResultsMovies.length === 0) { // no movies was found []
                    setShowAdditionalComponent({
                        ...showAdditionalComponent,
                        message: serverMessages.moviesNotFounds,
                        showBackButton: true,
                        showLoading: false
                    });
                } else {
                    setShowAdditionalComponent({ // [..., ...]
                        ...showAdditionalComponent, message: "", showBackButton: true, showLoading: false
                    });
                }
                setMovies(searchResultsMovies);
            }).catch(reason => {
            setShowAdditionalComponent({...showAdditionalComponent, showBackButton: true, showLoading: false});
        });
    };

    const handleBack = () => {
        setMovies([...popularMovies]);
        setShowAdditionalComponent({...showAdditionalComponent, showBackButton: false, message: ""});
    };

    useEffect(() => {
        function getPopularMovies() {
            imdbApi.getPopularMovies().then(results => {
                if (results) {
                    setMovies(results);
                    popularMovies = results;
                } else {
                    setShowAdditionalComponent({...showAdditionalComponent, message: serverMessages.serverError});
                }
            }).catch(reason => setShowAdditionalComponent({
                ...showAdditionalComponent,
                message: serverMessages.serverError
            }));
        }

        getPopularMovies();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <SearchBar
                onClickSearch={handleSearch}
                onBackAction={handleBack}
                showLoading={showAdditionalComponent.showLoading}
                showBackButton={showAdditionalComponent.showBackButton}/>
            <Movies movies={movies}
                    message={showAdditionalComponent.message}/>
        </>
    );
};

export default Body;
