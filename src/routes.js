const express = require('express');
const AuthController = require('./controllers/authController');
const GetCardController = require('./controllers/getCardController');
const SetCardController = require('./controllers/setCardController');
const GetVendasController = require('./controllers/getVendasController');
const GetMetasController = require('./controllers/getMetasController');
const GetAssinaturasController = require('./controllers/getAssinaturasController');
const GetDespesasController = require('./controllers/getDespesasController');
const GetCaixaTotalController = require('./controllers/getCaixaTotalController');
const GetLineDashboardVendasController = require('./controllers/getLineDashboardVendasController');
const PutAtualizaVendasController = require('./controllers/putAtualizaVendasController');
const GetResumoCartoesController = require('./controllers/getResumoCartoesController');
const PostVendasController = require('./controllers/postVendasController');
const { authenticateToken } = require('./middleware/authMiddleware');
const dbMiddleware = require('./middleware/dbMiddleware');
const createPool = require('./db');
const createPublicPool = require('./publicDb');

const router = express.Router();

const authController = new AuthController(createPublicPool()); 
const getCardController = new GetCardController();
const setCardController = new SetCardController();
const getVendasController = new GetVendasController();
const getMetasController = new GetMetasController();
const getAssinaturasController = new GetAssinaturasController();
const getDespesasController = new GetDespesasController();
const getCaixaTotalController = new GetCaixaTotalController();
const getLineDashboardVendasController = new GetLineDashboardVendasController();
const putAtualizaVendasController = new PutAtualizaVendasController();
const getResumoCartoesController = new GetResumoCartoesController();
const postVendasController = new PostVendasController();

router.post('/login', (req, res) => authController.login(req, res)); 
router.get('/cards', authenticateToken, (req, res) => getCardController.getCards(req, res));
router.post('/includ/card', authenticateToken, (req, res) => setCardController.setCards(req, res));
router.get('/vendas', authenticateToken, (req, res) => getVendasController.getVendas(req, res));
router.get('/metas', authenticateToken, (req, res) => getMetasController.getMetas(req, res));
router.get('/assinaturas', authenticateToken, (req, res) => getAssinaturasController.getMetas(req, res));
router.get('/despesas', authenticateToken, (req, res, next) => getDespesasController.getMetas(req, res, next));
router.get('/totalCaixa', authenticateToken, (req, res, next) => getCaixaTotalController.getTotalCaixa(req, res, next));
router.get('/dashboard/vendas', authenticateToken, (req, res, next) => getLineDashboardVendasController.lineDashboardVendasController(req, res, next));
router.put('/atualizar/vendas', authenticateToken, (req, res, next) => putAtualizaVendasController.atualizaVendas(req, res, next));
router.get('/resumo/cartoes', authenticateToken, (req, res, next) => getResumoCartoesController.getResumoCartoes(req, res, next));
router.get('/inserir/vendas', authenticateToken, (req, res, next) => postVendasController.inserirVendas(req, res, next));

module.exports = router;
