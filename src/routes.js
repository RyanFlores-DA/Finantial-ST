const express = require('express');
const AuthController = require('./controllers/authController');
const GetCardController = require('./controllers/getCardController');
const SetCardController = require('./controllers/setCardController');
const GetVendasController = require('./controllers/getVendasController');
const { authenticateToken } = require('./middleware/authMiddleware');
const dbMiddleware = require('./middleware/dbMiddleware');
const createPool = require('./db');
const createPublicPool = require('./publicDb');

const router = express.Router();

const authController = new AuthController(createPublicPool()); 
const getCardController = new GetCardController();
const setCardController = new SetCardController();
const getVendasController = new GetVendasController();

router.post('/login', (req, res) => authController.login(req, res)); 
router.get('/cards', authenticateToken, (req, res) => getCardController.getCards(req, res));
router.post('/includ/card', authenticateToken, (req, res) => setCardController.setCards(req, res));
router.get('/vendas', authenticateToken, (req, res) => getVendasController.getVendas(req, res));

module.exports = router;
