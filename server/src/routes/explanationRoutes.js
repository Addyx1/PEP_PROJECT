const express = require('express');
const {
    createExplanation,
    getExplanations,
    getExplanation,
    deleteExplanation,
} = require('../controllers/explanationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getExplanations)
    .post(createExplanation);

router.route('/:id')
    .get(getExplanation)
    .delete(deleteExplanation);

module.exports = router;
