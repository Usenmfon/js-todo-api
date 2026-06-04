const mongoose = require('mongoose');
const Todo = require('../models/Todo');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Todos fetched successfully',
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

const getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid todo ID',
      });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Todo fetched successfully',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

const createTodo = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Title is required and must be a non-empty string',
      });
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Completed must be a boolean value',
      });
    }

    const todo = await Todo.create({
      title,
      description,
      completed,
    });

    return res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = {};

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid todo ID',
      });
    }

    if (req.body.title !== undefined) {
      if (typeof req.body.title !== 'string' || !req.body.title.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Title must be a non-empty string',
        });
      }

      updates.title = req.body.title;
    }

    if (req.body.description !== undefined) {
      if (typeof req.body.description !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Description must be a string',
        });
      }

      updates.description = req.body.description;
    }

    if (req.body.completed !== undefined) {
      if (typeof req.body.completed !== 'boolean') {
        return res.status(400).json({
          success: false,
          message: 'Completed must be a boolean value',
        });
      }

      updates.completed = req.body.completed;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Provide at least one valid field to update',
      });
    }

    const todo = await Todo.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid todo ID',
      });
    }

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
