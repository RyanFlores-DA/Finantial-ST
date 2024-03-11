const PostVendasService = require('../services/postVendasService');

class PostVendasController{
    constructor(){
        this.postVendasService = new PostVendasService;
    }
    async inserirVendas(req, res, next){
        try {
            const data = await this.postVendasService.inserirVendas(req, res);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = PostVendasController;