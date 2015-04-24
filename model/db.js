/**
 * Created by Filipovic on 22-04-2015.
 */
var mongoose = require('mongoose');
var dbURI;

//This is set by the backend tests
if (typeof global.TEST_DATABASE != 'undefined') {
    dbURI = global.TEST_DATABASE;
}
else {
    dbURI = 'mongodb://localhost/TipFlipBase';
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


//**Food clothing schema **//
var FoodSchema = new mongoose.Schema({
    soda : string,
    meat : string,
    fruit : string,
    vegetables : string,
    candy : string,
    alcohol : string,
    snack : string,
    fastfood : string,
    energydrink : string
});
mongoose.model('Food', FoodSchema, "food");

//**Womens clothing schema **//
var WomenSchema = new mongoose.Schema({
    bra : string,
    pants : string,
    top : string,
    shoes : string,
    belt : string,
    suit : string,
    cardigan : string,
    bag : string,
    foundation : string,
    cleanser : string,
    consealer : string,
    brush : string,
    nail : string,
    razor : string,
    other : string
});
mongoose.model('Women', WomenSchema, "women");


//**Mens clothing schema **//
var MenSchema = new mongoose.Schema({
    pants : string,
    shirt : string,
    suit : string,
    shoes : string,
    belt : string,
    blouse : string,
    cardigan : string,
    ties : string,
    razor : string,
    cremeAndGel : string
});
mongoose.model('Men', MenSchema, "men");


//** Perfume Schema **//
var PerfumeSchema = new mongoose.Schema({
    mensperfume : string,
    womensperfume : string
});
mongoose.model('Perfume', PerfumeSchema, "perfume");


//** Electronics schema **//
var ElectronicSchema = new mongoose.Schema ({
    tv : string,
    cellphone : string,
    sound : string,
    inCar : string,
    laptop : string,
    staionaryPC : string,
    kitchenappliance : string
});
mongoose.model('Electronic', ElectronicSchema, "electronic");

var RegIDsSchema = new mongoose.Schema ({
    regID : string
});
mongoose.model('RegID', RegIDsSchema, "regid");

var CategorySchema = new mongoose.Schema ({
    category : string
});
mongoose.model('Category', CategorySchema, "category")

