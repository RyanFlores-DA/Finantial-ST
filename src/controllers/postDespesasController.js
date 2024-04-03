const PostDespesasService = require('../services/postDespesasService');

class PostDespesasController{
    constructor(){
        this.postDespesasService = new PostDespesasService;
    }
    async inserirDespesas(req, res, next){
        try {
            const data = await this.postDespesasService.inserirDespesas(req, res);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = PostDespesasController;