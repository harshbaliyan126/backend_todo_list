const Task = require('../model/task');
const { fieldMissing } = require('../utils/fieldMissing');

const getTask = async (req, res, next) => {
  try {
    const getAllTask = await Task.find();
    res.status(200).json({
      count: getAllTask.length,
      ...(getAllTask.length > 0 && { todo: getAllTask }),
    });
  } catch (err) {
    next(err);
  }
};

const postTask = async (req, res, next) => {
  try {
    const { task } = req.body;

    if (!task)
      return res
        .status(400)
        .json({ status: 'error', message: fieldMissing({ task }) });

    if (typeof task !== 'string')
      return res.status(400).json({ status: 'error', message: 'Invalid type' });

    const result = await Task.create({ task });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const putTask = async (req, res, next) => {
  try {
    if (!req?.params?.id)
      return res.status(400).json({ message: 'task id required.' });

    const { task, status } = req.body;

    if (!task || !status)
      return res
        .status(400)
        .json({ status: 'error', message: fieldMissing({ task, status }) });

    if (typeof task !== 'string' || typeof status !== 'boolean')
      return res.status(400).json({ status: 'error', message: 'Invalid type' });

    const todoTask = await Task.findById(req.params.id);
    if (!todoTask) return res.status(404).json({ message: 'Task not found.' });

    todoTask.status = status;
    await todoTask.save();

    res.status(200).json(todoTask);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    if (!req?.params?.id)
      return res.status(400).json({ message: 'task id required.' });

    const todoTask = await Task.findByIdAndDelete(req.params.id);
    if (!todoTask) return res.status(404).json({ message: 'Task not found.' });
    console.log(todoTask);
    res.status(200).json(todoTask);
  } catch (err) {
    next(err);
  }
};

module.exports = { getTask, postTask, putTask, deleteTask };
