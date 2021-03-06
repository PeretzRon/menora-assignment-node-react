const http = require('http');
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config({path: path.join(__dirname, '.env')});

const imdbApi = require('./routers/imdbApi');
const mainRoutes = require('./routers/index');
const errorRoutes = require('./routers/errors');

const app = express();
app.use(express.static(path.resolve(__dirname, '..' ,'client/build'), {
    'index': false,
}));
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(imdbApi.router);
app.use(mainRoutes.router);
app.use(errorRoutes.router);

const server = http.createServer(app);

// get the 10 popular movie and then start the server

(async () => {
    try {
        await imdbApi.initialPopularMovies();
        server.listen(process.env.SERVER_PORT, () => {
            console.log(`Server start on port ${process.env.SERVER_PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
})();
