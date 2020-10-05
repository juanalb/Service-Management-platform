const express = require('express')

const covidController = require('../controllers/covid-controller')

const router = express.Router()

// router.post('/movie', MovieCtrl.createMovie)
// router.put('/movie/:id', MovieCtrl.updateMovie)
// router.delete('/movie/:id', MovieCtrl.deleteMovie)
// router.get('/movie/:id', MovieCtrl.getMovieById)
router.get('/covid', covidController.getSummaryNetherlands)
router.get('/growth', covidController.getGrowthNetherlands)

module.exports = router