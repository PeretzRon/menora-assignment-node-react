const http = require('http');
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');


const configuration = require('./config');
const imdbApi = require('./routers/imdbApi');
const mainRoutes = require('./routers/imdbApi');
const errorRoutes = require('./routers/errors');

const app = express();
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(imdbApi.router);
app.use(mainRoutes.router);
app.use(errorRoutes.router);

const server = http.createServer(app);

// get the 10 popular movie and then start the server
imdbApi.initialPopularMovies(true)
    .then(() => {
        server.listen(configuration.serverPort, () => {
            console.log(`Server start on port ${configuration.serverPort}`);
        });
    }).catch(reason => console.log(reason));
