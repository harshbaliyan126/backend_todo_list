const express = require('express');
const router = express.Router();
const taskController = require('../controller/task');

router.get('/', taskController.getTask);
router.post('/', taskController.postTask);
router.put('/:id', taskController.putTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
