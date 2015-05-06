var express = require('express'),
    router = express.Router();


router.get('/', function (req, res, next) {
    res.render('index', {title: "Socket Chat"});
});

router.post('/', function (req, res) {
    var userName = req.body.name;
    console.log(req.body);
    if (userName) {
        res.render('chat', {title: "Socket Chat", 'userName': userName });
    } else {
        res.render('index', {title: "Socket Chat"});
    }
});

module.exports = router;
