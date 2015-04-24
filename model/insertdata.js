/**
 * Created by jakobgaardandersen on 24/04/15.
 */
var db = require('./db');
var mongoose = require('mongoose');
var category = mongoose.model('Category');
var profile = mongoose.model('Profile');
var offer = mongoose.model('Offer');
var categories = require('./sampledata/category.json');
var profiles = require('./sampledata/profile.json');
var offers = require('./sampledata/offer.json');

function insertCats() {
    category.remove(function () {
        category.create(categories, function (err) {
            console.log('Categories inserted');
        });
    })

}

function insertOffers() {
    offer.remove(function () {
        offer.create(offers, function (err) {
            console.log('Offers inserted!');
        })
    })
}
function insertProfiles() {
    profile.remove(function () {
        profile.create(profiles, function (err) {
            console.log('Profiles isnerted');
        })
    })

}


//insertCats();
//insertProfiles();
//insertOffers();