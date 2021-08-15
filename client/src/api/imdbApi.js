const imdbApi = {
    getPopularMovies: async function () {
        try {
            const url = 'http://10.0.0.25:3001/popularMovies';
            const options = prepareRequest(url, 'GET');
            const data = await fetch(url, options);
            return await data.json();
        } catch (error) {
            return null;
        }
    },
    getMoviesByText: async function (movieName) {
        const url = `http://10.0.0.25:3001/searchMovie?search=${movieName}`;
        const options = prepareRequest(url, 'GET');
        const data = await fetch(url, options);
        return await data.json();
    }
};

const prepareRequest = (url, type) => {
    return {
        method: type,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    };
};


export default imdbApi;
