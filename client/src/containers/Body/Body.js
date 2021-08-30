import React, {useEffect, useState} from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Movies from "../Movies/Movies";
import imdbApi from "../../api/imdbApi";
import {serverMessages} from '../../utils/texts';

const Body = () => {

    const [movies, setMovies] = useState([]);
    const [showAdditionalComponent, setShowAdditionalComponent] = useState({
        showBackButton: false,
        showLoading: false,
        message: "",
    });

    const getPopularMovies = async () => {
        return imdbApi.getPopularMovies().then(results => {
            if (results) {
                setMovies(results);
            } else {
                setShowAdditionalComponent({...showAdditionalComponent, message: serverMessages.serverError});
            }
        }).catch(reason => setShowAdditionalComponent({
            ...showAdditionalComponent,
            message: serverMessages.serverError
        }));
    }

    const handleSearch = (event, input) => {
        event.preventDefault();
        if (input === '') return; // no input, do nothing
        setShowAdditionalComponent({...showAdditionalComponent, showLoading: true, message: ""});
        imdbApi.getMoviesByText(input)
            .then(searchResultsMovies => {
                if (!Array.isArray(searchResultsMovies)) { // some error from the api
                    setShowAdditionalComponent({
                        ...showAdditionalComponent,
                        message: searchResultsMovies,
                        showBackButton: true,
                        showLoading: false
                    });
                } else {
                    setShowAdditionalComponent({ // [..., ...]
                        ...showAdditionalComponent, message: "", showBackButton: true, showLoading: false
                    });
                    setMovies(searchResultsMovies);
                }
            }).catch(reason => {
            setShowAdditionalComponent({...showAdditionalComponent, showBackButton: true, showLoading: false});
        });
    };

    const handleBack = async () => {
        await getPopularMovies()
        setShowAdditionalComponent({...showAdditionalComponent, showBackButton: false, message: ""});
    };

    useEffect(() => {
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
