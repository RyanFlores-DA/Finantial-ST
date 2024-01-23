const GetLineDashboardVendasService = require('../services/getLineDashboardVendasService');

class GetLineDashboardVendasController{
    constructor(){
        this.getLineDashboardVendasService = new GetLineDashboardVendasService;
    }
    async lineDashboardVendasController(req, res, next){
        try {
            const data = await this.getLineDashboardVendasService.lineDashboardVendasService(req, res);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = GetLineDashboardVendasController;