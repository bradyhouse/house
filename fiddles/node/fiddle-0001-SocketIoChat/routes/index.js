var express = require('express'),
    router = express.Router();


router.get('/', function (req, res, next) {
    res.render('index', {title: "ITM 465 ~ Assignment 3"});
});

router.post('/', function (req, res) {
    console.log('index.js > post');
    var userName = req.body.name;
    console.log(req.body);
    if (userName) {
        res.render('chat', {title: "ITM 465 ~ Assignment 3", 'userName': userName });
    } else {
        res.render('index', {title: "ITM 465 ~ Assignment 3"});
    }
});

module.exports = router;
