const { Router } = require('express');
const eventController = require('../controllers/eventController');
const router = Router();

router.get('/', eventController.getEvents);
router.get('/participants/:eventid', eventController.getParticipants);

module.exports = router;