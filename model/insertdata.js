/**
 * Created by jakobgaardandersen on 24/04/15.
 */
var db = require('./db');
var mongoose = require('mongoose');
var category = mongoose.model('Category');
var profile = mongoose.model('Profile');
var categories = require('./sampledata/category.json');
var profiles = require('./sampledata/profile.json');

function insertCats() {
    category.create(categories, function (err) {
        console.log('Categories inserted');
    });
}

function insertProfiles() {
    profile.create(profiles, function (err) {
        console.log('Profiles isnerted');
    })
}

//insertCats();
//insertProfiles();