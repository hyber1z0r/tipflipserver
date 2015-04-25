/**
 * Created by Filipovic on 22-04-2015.
 */
var mongoose = require('mongoose');
var regid = mongoose.model('RegID');
var profile = mongoose.model('Profile');
var offer = mongoose.model('Offer');
var category = mongoose.model('Category');

/* Saves a regID to the db */
function saveRegID(id, callback) {
    var regID = new regid({
        regID: id
    });

    regID.save(function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null, regID);
        }
    });
}

/* Gets all RegIDs */
function getRegIDs(callback) {
    regid.find({}, function (err, ids) {
        if (err) {
            console.log(err);
            callback(err);
        }
        else {
            callback(null, ids);
        }
    });
}

function getProfilesWithCat(cat, callback) {
    profile.find({categories: cat}, function (err, profiles) {
        if (err) {
            callback(err)
        }
        else {
            callback(null, profiles);
        }
    });
}

/**
 * Senere hen: sortere efter dato, giv kun 10? nyeste.
 * category returnere null lige nu.
 * */
function getAllOffers(callback) {
    offer.find().populate('category').exec(function (err, offers) {
        if (err) {
            callback(err);
        } else {
            callback(null, offers);
        }
    });
}

function getAllCategories(callback) {
    category.find({}, function (err, cats) {
        if (err) {
            callback(err);
        } else {
            callback(null, cats);
        }
    })
}

// should be changed to username in the future
function getProfile(name, callback) {
    profile.findOne({name: {$regex: new RegExp(name, 'i')}}).populate('categories').populate('offers').exec(function (err, profile) {
        if (err) {
            callback(err);
        } else {
            callback(null, profile);
        }
    })
}

module.exports = {
    saveRegID: saveRegID,
    getRegIDs: getRegIDs,
    getProfilesWithCat: getProfilesWithCat,
    getAllOffers: getAllOffers,
    getAllCats: getAllCategories,
    getProfile: getProfile
};