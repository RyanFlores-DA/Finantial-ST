const PutAtualizaVendasService = require('../services/putAtualizaVendasService');

class PutAtualizaVendasController{
    constructor(){
        this.putAtualizaVendasService = new PutAtualizaVendasService;
    }
    async atualizaVendas(req, res, next){
        try {
            const data = await this.putAtualizaVendasService.putAtualizaVendasService(req, res);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = PutAtualizaVendasController;