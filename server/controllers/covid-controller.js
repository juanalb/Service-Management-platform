
const Covid = require('../models/covid.js')
const Growth = require('../models/growth.js')

getSummaryNetherlands = async (req, res) => {
    await Covid.find({country: 'Netherlands', date: { $gte: '2020-09-30', $lte: '2020-10-05'}}, null, {limit: null}, (err, covids) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!covids.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: covids })
    }).catch(err => console.log(err))
}

getGrowthNetherlands = async (req, res) => {
    await Growth.find({country_iso2: 'NL', date: { $gte: '2020-08-12', $lte: '2020-10-05'}}, null, {limit: null}, (err, covids) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!covids.length) {
            return res
                .status(404)
                .json({ success: false, error: `Growth not found` })
        }
        return res.status(200).json({ success: true, data: covids })
    }).catch(err => console.log(err))
}

module.exports = {
    getSummaryNetherlands,
    getGrowthNetherlands
}