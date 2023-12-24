// src/controllers/taskController.js
const GetTaskService = require('../services/getTaskService');
const DbMiddleware = require('../middleware/dbMiddleware');

class TaskController {
  constructor() {
    this.getTaskService = new GetTaskService();
  }

  async getTasks(req, res) {

    try {
      const tasks = await this.getTaskService.getTasks(req, res);
      return res.json(tasks);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

module.exports = TaskController;