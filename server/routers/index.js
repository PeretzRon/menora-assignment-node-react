const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/health', (req, res) => {
   res.status(200).send('OK')
})

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../..', 'client', 'build', 'index.html'));
})

module.exports = {
    router
};
