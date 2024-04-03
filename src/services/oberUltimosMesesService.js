class ObterUltimosMesesService {
  constructor() {}

  async obterUltimosMeses() {
        const dataAtual = new Date();
      
        const resultados = [];
      
        for (let i = 0; i < 3; i++) {
          const ano = dataAtual.getFullYear();
      
          if (mes < 1) {
            mes = 12;
            dataAtual.setFullYear(ano - 1);
          }
      
          const dataFormatada = `${ano}-${String(mes).padStart(2, '0')}-01`;
      
          resultados.unshift(dataFormatada);
      
          dataAtual.setMonth(dataAtual.getMonth() - 1);
        }
      
        console.log(`('${resultados.join("', '")}')`);
        return `('${resultados.join("', '")}')`;
      }
}

module.exports = ObterUltimosMesesService;
