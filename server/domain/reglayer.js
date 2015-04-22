/**
 * Created by Filipovic on 22-04-2015.
 */
var mongoose = require('mongoose');
var regid = mongoose.model('RegID');

/* Saves all regIDs */
function saveRegIDs(ids, callback){
      var id = new regid ({
          regID : ids
      });

        id.save(function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null, id);
            }
        });
};

/* Should get all the RegIDs */
function getRegIDs (callback){
    regid.find({},function (err, ids) {
        if(err){
            console.log(err);
            callback(err);
        }
        else {
            callback(null, ids);
        }
    })
};

module.exports.saveRegIDs = saveRegIDs();
module.exports.getRegIds = getRegIDs();



