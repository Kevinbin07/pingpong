const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data', 'scores.json');

const timeOptions = {
    timeZone: 'Europe/Amsterdam',
    hour12: false, 
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
};


router.get('/', (req, res) => {
    res.render('match', { showHeader: false });
});

router.post('/', (req, res) => {
    const scoreLeft = req.body.scoreLeft;
    const scoreRight = req.body.scoreRight;

    const timestamp = new Date().toLocaleString('en-US', timeOptions);

    let jsonData = [];
    try {
        jsonData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    } catch (err) {
    }

    jsonData.push({ scoreLeft, scoreRight, timestamp });

    fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2), 'utf8');

    res.json({ message: 'Data saved successfully' });
});

module.exports = router;
