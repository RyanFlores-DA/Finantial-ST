// src/routes.js
const express = require('express');
const AuthController = require('./controllers/authController');
const GetCardController = require('./controllers/getCardController');
const SetCardController = require('./controllers/setCardController');
const { authenticateToken } = require('./middleware/authMiddleware');
const dbMiddleware = require('./middleware/dbMiddleware');
const createPool = require('./db');
const createPublicPool = require('./publicDb');

const router = express.Router();

const authController = new AuthController(); 
const getCardController = new GetCardController();
const setCardController = new SetCardController();

router.post('/login', (req, res) => authController.login(req, res, createPublicPool())); 
router.get('/tasks', authenticateToken, (req, res) => getCardController.getCards(req, res));
router.post('/incluir/tasks', authenticateToken, (req, res) => setCardController.setCards(req, res));

module.exports = router;
