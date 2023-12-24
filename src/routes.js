// src/routes.js
const express = require('express');
const AuthController = require('./controllers/authController');
const GetTaskController = require('./controllers/getTaskController');
const SetTaskController = require('./controllers/setTaskController');
const { authenticateToken } = require('./middleware/authMiddleware');
const dbMiddleware = require('./middleware/dbMiddleware');
const createPool = require('./db');
const createPublicPool = require('./publicDb');

const router = express.Router();

// const pool = createPool({
//   user: 'ryan',
//   host: '191.252.204.101',
//   password: '1234',
//   port: 5432,
//   database: 'control'
// });

const authController = new AuthController(); // Não é necessário passar a pool aqui
const getTaskController = new GetTaskController();
const setTaskController = new SetTaskController();

router.post('/login', (req, res) => authController.login(req, res, createPublicPool())); // Certifique-se de passar a pool aqui
router.get('/tasks', authenticateToken, (req, res) => getTaskController.getTasks(req, res));
router.post('/incluir/tasks', authenticateToken, (req, res) => setTaskController.setTasks(req, res));

module.exports = router;
