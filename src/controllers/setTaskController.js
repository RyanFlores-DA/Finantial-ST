// src/controllers/taskController.js
const SetTaskService = require('../services/setTaskService');
const DbMiddleware = require('../middleware/dbMiddleware');

class SetTaskController {
  constructor() {
    this.setTaskService = new SetTaskService();
  }

  async setTasks(req, res) {

    try {
      const tasks = await this.setTaskService.setTasks(req, res);
      return res.json(tasks);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

module.exports = SetTaskController;