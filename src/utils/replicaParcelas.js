class ReplicaParcelas{
    constructor(){}
    async replicarParcelas(parcelas, dataCompra) {
        let data = new Date(dataCompra);
    
        let datasParcelas = [];
    
        for (let i = 0; i < parcelas; i++) {
            data.setMonth(data.getMonth() + 1);
    
            let dataParcela = new Date(data);
    
            datasParcelas.push(dataParcela.toISOString().slice(0,10));
        }
    
        return datasParcelas;
    }
}

module.exports = ReplicaParcelas;