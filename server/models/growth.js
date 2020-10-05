const mongoose = require('mongoose')

const Growth = new mongoose.Schema({
    _id:{
        type: String
    },
    uid:{
        type: Number
    },
    country_iso2:{
        type: String
    },
    country_iso3:{type: String},
    country_code:{type: Number},
    country:{type: String},
    combined_name:{type: String},
    population:{type:Number},
    loc:{
        type:{type: String},
        coordinates: [{type: Number}]
    },
    date: {type: Date},
    confirmed: {type: Number},
    deaths: {type: Number},
    recovered: {type: Number}

}, {collection: 'global'});

module.exports = mongoose.model('global', Growth)
