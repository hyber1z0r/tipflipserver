/**
 * Created by Filipovic on 22-04-2015.
 */
var mongoose = require('mongoose');
var regid = mongoose.model('RegID');

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

module.exports = {
    saveRegID: saveRegID,
    getRegIDs: getRegIDs
};