var express = require('express');
var router = express.Router();
var request = require('request');
var API_KEY = 'AIzaSyCjMpbqlwrlkWg9DCkgulVzlaHOKOlr5Dc';

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

router.post('/send', function (req, res) {
    var data = {};
    data.data = {};
    // arg checking
    data.registration_ids = ['APA91bENK1t7Ynkp8psaAMIXibQmdF5FWlOaomAPg1zYYJ66K8lg3GG2hl9VATgPM544KaBX4kudMfd2XLexMJLihZ0OrWTFm-Y_5pCbpkWrLVJry-ifr4ZMk-Nf3zP16go81rABRlyn1tQ2MbpZidI4YwCpkGl38A'];
    data.data.string = 'this should work';

    request.post({
        url: 'https://android.googleapis.com/gcm/send',
        body: JSON.stringify(data),
        headers: {
            'Authorization': 'key=' + API_KEY,
            'Content-Type': 'application/json'
        }
    }, function callback(err, httpResponse, body) {
        if (err) {
            res.status(500).json({error: 'there was an error contacting the google cloud messesaging system, err: ' + err.message})
        } else if (httpResponse.statusCode == 200) {
            res.json({msg: 'success', googleResponse: body});
        } else if (httpResponse.statusCode == 401) {
            res.status(401).json({error: 'You are unauthorized'});
        }
    });
});

module.exports = router;
