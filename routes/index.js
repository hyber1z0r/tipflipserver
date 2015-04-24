var express = require('express');
var router = express.Router();
var request = require('request');
var API_KEY = 'AIzaSyCjMpbqlwrlkWg9DCkgulVzlaHOKOlr5Dc';
var datalayer = require('../model/datalayer');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

router.get('/getreg', function (req, res) {
    datalayer.getRegIDs(function (err, ids) {
        if (err) res.status(500).json(err);
        else {
            var regIDs = ids.map(function (e) {
                return e.regID;
            });
            res.json(regIDs);
        }
    })
});

router.post('/savereg', function (req, res) {
    console.log(req.body);
    if (req.body) {
        datalayer.saveRegID(req.body.regid, function (err, regid) {
            if (err) {
                res.status(500).json({error: 'mongoerr:' + err})
            } else {
                res.status(200).json({msg: 'success, inserted: ' + regid});
            }
        });
    } else {
        res.status(403).json({error: 'no reg id supplied'})
    }
});
// bundle.registration_ids = ['APA91bFAlaq7_QrGSoNG6v5FscQ3OkF-5ajP_o35vrYApqgeu1gegeTLXPKxxSk1h_kxSgahHuHg6IQYovwaHzejrjEEc9WP1JuoxkQj7I8Wf0rJX_cEn8g6LdrqYaFrEh7WODfkeLr0BBaxosHC7hWhLKvLX3AMKQ'];
router.post('/send', function (req, res) {
    var bundle = {};
    bundle.data = {};
    // arg checking
    var category = req.body.category;

    datalayer.getProfilesWithCat(category, function (err, profiles) {
        if (err) {
            res.status(500).json({error: 'mongoerr: ' + err});
        } else {
            var regIDs = profiles.map(function (e) {
                return e.regID;
            });
            bundle.registration_ids = regIDs;
            bundle.data.category = category;
            request.post({
                url: 'https://android.googleapis.com/gcm/send',
                body: JSON.stringify(bundle),
                headers: {
                    'Authorization': 'key=' + API_KEY,
                    'Content-Type': 'application/json'
                }
            }, function callback(err, httpResponse, body) {
                if (err) {
                    res.status(500).json({error: 'there was an error contacting the google cloud messaging system, err: ' + err.message})
                } else if (httpResponse.statusCode == 200) {
                    res.json({msg: 'success', googleResponse: body});
                } else if (httpResponse.statusCode == 401) {
                    res.status(401).json({error: 'You are unauthorized'});
                }
            });
        }
    });
});

router.get('/offers', function (req, res) {
    datalayer.getAllOffers(function (err, offers) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(offers);
        }
    })
});

router.get('/profile', function (req, res) {
    var name = req.query.name;
    if (!name) return res.json({error: 'no name'});
    datalayer.getProfile(name, function (err, profile) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(profile);
        }
    });
});

router.get('/categories', function (req, res) {
    datalayer.getAllCats(function (err, cats) {
        if (err) {
            res.json(err);
        } else {
            res.json(cats);
        }
    });
});

module.exports = router;
