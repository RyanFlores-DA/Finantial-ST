class ObterUltimosMesesService {
  constructor() {}

  async obterUltimosMeses() {
        // Obter a data atual
        const dataAtual = new Date();
      
        // Array para armazenar os resultados formatados
        const resultados = [];
      
        // Loop para obter os últimos 3 meses
        for (let i = 0; i < 3; i++) {
          // Obter o ano e o mês
          const ano = dataAtual.getFullYear();
          let mes = dataAtual.getMonth() + 1; // Os meses em JavaScript são baseados em zero, então adicionamos 1
      
          // Se o mês for menor que 1 (janeiro), ajustamos para dezembro do ano anterior
          if (mes < 1) {
            mes = 12;
            dataAtual.setFullYear(ano - 1);
          }
      
          // Formatando a data no estilo 'YYYY-MM-DD'
          const dataFormatada = `${ano}-${String(mes).padStart(2, '0')}-01`;
      
          // Adicionar a data ao início do array de resultados
          resultados.unshift(dataFormatada);
      
          // Subtrair 1 mês para a próxima iteração
          dataAtual.setMonth(dataAtual.getMonth() - 1);
        }
      
        // Retornar os resultados como uma string formatada
        console.log(`('${resultados.join("', '")}')`);
        return `('${resultados.join("', '")}')`;
      }
}

module.exports = ObterUltimosMesesService;
