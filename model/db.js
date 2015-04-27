/**
 * Created by Filipovic on 22-04-2015.
 */
var mongoose = require('mongoose');
var dbURI;
var Schema = mongoose.Schema;
var ObjID = Schema.Types.ObjectId;

//This is set by the backend tests
if (typeof global.TEST_DATABASE != 'undefined') {
    dbURI = global.TEST_DATABASE;
}
else {
    //dbURI = 'mongodb://localhost/TipFlipBase';
    dbURI = 'mongodb://test:test@ds051841.mongolab.com:51841/tipflip';
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    global.mongo_error = "Not Connected to the Database";
    console.error('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});


////**Food clothing schema **//
//var FoodSchema = new mongoose.Schema({
//    soda : string,
//    meat : string,
//    fruit : string,
//    vegetables : string,
//    candy : string,
//    alcohol : string,
//    snack : string,
//    fastfood : string,
//    energydrink : string
//});
//mongoose.model('Food', FoodSchema, "food");
//
////**Womens clothing schema **//
//var WomenSchema = new mongoose.Schema({
//    bra : string,
//    pants : string,
//    top : string,
//    shoes : string,
//    belt : string,
//    suit : string,
//    cardigan : string,
//    bag : string,
//    foundation : string,
//    cleanser : string,
//    consealer : string,
//    brush : string,
//    nail : string,
//    razor : string,
//    other : string
//});
//mongoose.model('Women', WomenSchema, "women");
//
//
////**Mens clothing schema **//
//var MenSchema = new mongoose.Schema({
//    pants : string,
//    shirt : string,
//    suit : string,
//    shoes : string,
//    belt : string,
//    blouse : string,
//    cardigan : string,
//    ties : string,
//    razor : string,
//    cremeAndGel : string
//});
//mongoose.model('Men', MenSchema, "men");
//
//
////** Perfume Schema **//
//var PerfumeSchema = new mongoose.Schema({
//    mensperfume : string,
//    womensperfume : string
//});
//mongoose.model('Perfume', PerfumeSchema, "perfume");
//
//
////** Electronics schema **//
//var ElectronicSchema = new mongoose.Schema ({
//    tv : string,
//    cellphone : string,
//    sound : string,
//    inCar : string,
//    laptop : string,
//    staionaryPC : string,
//    kitchenappliance : string
//});
//mongoose.model('Electronic', ElectronicSchema, "electronic");

var RegIDsSchema = new Schema({
    regID: {type: String}
});
mongoose.model('RegID', RegIDsSchema, "regid");

var CategorySchema = new Schema({
    category: {type: String, required: 'Category name required!'},
    image: {type: String} // base64
});
mongoose.model('Category', CategorySchema, "category");

var OffersSchema = new Schema({
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    discount: {type: String}
});
mongoose.model('Offer', OffersSchema, 'offers');

var ProfileSchema = new Schema({
    name: {type: String},
    regID: {type: String},
    categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    offers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Offer'}]
});

mongoose.model('Profile', ProfileSchema, 'profiles');

