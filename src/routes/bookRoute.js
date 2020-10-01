const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookController')

router.get('/', controller.getAll)
router.get('/theme', controller.getAllByFilter)
router.get('/:title', controller.getByTitle)
router.post('/', controller.create)
router.put('/:_id', controller.put)
router.delete('/:_id', controller.delete)

module.exports = router