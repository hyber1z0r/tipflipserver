/**
 * Created by Filipovic on 22-04-2015.
 */
var mongoose = require('mongoose');
var profile = mongoose.model('Profile');
var offer = mongoose.model('Offer');
var category = mongoose.model('Category');
var store = mongoose.model('Store');

/* Saves a regID to the db */
function saveRegID(id, callback) {
    var profile = new profile({
        regID: id,
        categories: [],
        offers: []
    });
    profile.save(function (err, profile) {
        if (err) {
            callback(err);
        } else {
            callback(null, profile);
        }
    });
}

///* Gets all RegIDs */
//function getRegIDs(callback) {
//    regid.find({}, function (err, ids) {
//        if (err) {
//            console.log(err);
//            callback(err);
//        }
//        else {
//            callback(null, ids);
//        }
//    });
//}

function getProfilesWithCat(cat, callback) {
    category.findOne({name: cat}, function (err, category) {
        if (err) {
            callback(err);
        } else {
            if (!category) {
                var e = new Error();
                e.status = 404;
                e.message = 'No such category';
                callback(e);
            } else {
                profile.find({categories: category._id}, function (err, profiles) {
                    if (err) {
                        callback(err);
                    }
                    else {
                        callback(null, profiles);
                    }
                });
            }
        }
    });
}

/**
 * Senere hen: sortere efter dato, giv kun 10? nyeste.
 * */
function getAllOffers(callback) {
    offer.find().populate('category').populate('store').exec(function (err, offers) {
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
// deep populate because of gson parse error. we must populate all fields/objects for it to work.
function getProfile(regid, callback) {
    profile.findOne({regID: regid}).populate('categories offers').exec(function (err, profile) {
        if (err) {
            callback(err);
        } else {
            category.populate(profile, 'offers.category', function (err, results) {
                if (err) {
                    callback(err);
                } else {
                    store.populate(profile, 'offers.store', function (err, endresults) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, endresults);
                        }
                    });
                }
            })
        }
    })
}

function updateProfile(profile, callback) {
    var query = {"_id": profile._id};
    var update = {categories: profile.categories};
    var options = {new: false};
    profile.findOneAndUpdate(query, update, options, function (err, updatedProfile) {
        if (err) {
            callback(err);
        } else {
            callback(null, updatedProfile);
        }
    });
}

module.exports = {
    saveRegID: saveRegID,
    getProfilesWithCat: getProfilesWithCat,
    getAllOffers: getAllOffers,
    getAllCats: getAllCategories,
    getProfile: getProfile,
    updateProfile: updateProfile
};