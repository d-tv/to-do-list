import prisma from '../utils/prisma.js';
import {
  validateTaskId,
  validateTaskTitle,
  validateTaskDescription,
  validateTaskStatus,
} from '../utils/validation.js';

/**
 * Creates a task for a particular user.
 */
export const createTask = async (req, res, next) => {
  const { title, description } = req.body;
  const { user } = req;

  try {
    if (!validateTaskTitle(title) ||
        !validateTaskDescription(description)) {
      return res.status(400).json({ msg: 'Invalid request' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        user: { connect: { id: user.id } },
      },
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

/**
 * Gets all tasks that belong to a particular user.
 */
export const getTasks = async (req, res, next) => {
  const { user } = req;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        user: { id: user.id },
      },
    });

    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

/**
 * Gets a task that belongs to a particular user.
 */
export const getTask = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;

  try {
    if (!validateTaskId(id)) {
      return res.status(400).json({ msg: 'Invalid request' });
    }

    const task = await prisma.task.findUnique({
      where: {
        id: +id,
        user: { id: user.id },
      },
    });

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

/**
 * Updates a task that belongs to a particular user.
 */
export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const { user } = req;

  try {
    if (!validateTaskId(id) ||
        !validateTaskTitle(title) ||
        !validateTaskDescription(description) ||
        !validateTaskStatus(status)) {
      return res.status(400).json({ msg: 'Invalid request' });
    }

    const task = await prisma.task.update({
      where: {
        id: +id,
        user: { id: user.id },
      },
      data: {
        title,
        description,
        status,
      },
    });

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

/**
 * Deletes a task that belongs to a particular user.
 */
export const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;

  try {
    if (!validateTaskId(id)) {
      return res.status(400).json({ msg: 'Invalid request' });
    }

    const task = await prisma.task.delete({
      where: {
        id: +id,
        user: { id: user.id },
      },
    });

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
