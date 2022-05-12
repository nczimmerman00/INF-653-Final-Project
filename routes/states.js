const express = require('express');
const router = express.Router();
const State = require('../model/states');
const statesController = require('../controllers/statesController');

router.get('', statesController.getAllStatesData);

router.route('/:id')
    .get(statesController.getSpecificStateData);

router.route('/:id/funfact')
    .get(statesController.getStateFunFact)
    .post(statesController.addFunFact)
    .patch(statesController.updateFunFact)
    .delete(statesController.deleteFunFact);

router.route('/:id/capital').get(statesController.getStateCapital);

router.route('/:id/nickname').get(statesController.getStateNickname);

router.route('/:id/population').get(statesController.getStatePopulation);

router.route('/:id/admission').get(statesController.getStateAdmission);

module.exports = router;