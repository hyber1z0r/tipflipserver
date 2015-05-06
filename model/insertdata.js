/**
 * Created by jakobgaardandersen on 24/04/15.
 */
var db = require('./db');
var mongoose = require('mongoose');
var category = mongoose.model('Category');
var profile = mongoose.model('Profile');
var offer = mongoose.model('Offer');
var store = mongoose.model('Store');
var categories = require('./sampledata/category.json');
var profiles = require('./sampledata/profile.json');
var offers = require('./sampledata/offer.json');
var stores = require('./sampledata/store.json');

function insertCats() {
    category.remove(function () {
        category.create(categories, function (err) {
            if (err) console.log(err);
            else console.log('Categories inserted');
        });
    })

}

function insertStores() {
    store.remove(function () {
        store.create(stores, function (err) {
            if (err) console.log(err);
            else console.log('Stores inserted');
        })
    })
}

function insertOffers() {
    offer.remove(function () {
        offer.create(offers, function (err) {
            if (err) console.log(err);
            else console.log('Offers inserted!');
        })
    })
}
function insertProfiles() {
    profile.remove(function () {
        profile.create(profiles, function (err) {
            if (err) console.log(err);
            else console.log('Profiles isnerted');
        })
    })

}


//insertCats();
//insertStores();
//insertProfiles();
//insertOffers();