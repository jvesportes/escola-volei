export function calcularDataVencimento(plano: string): Date | null {
  // Verificar se o plano é válido
  if (['mensal', 'trimestral', 'semestral', 'anual'].includes(plano)) {
    // Obter a data de hoje
    const dataHoje = new Date();

    // Definir a data de vencimento como a data de hoje
    const dataVencimento = new Date(dataHoje);

    // Calcular os meses a serem adicionados com base no plano
    let mesesASeremAdicionados = 0;
    switch (plano) {
      case 'mensal':
        mesesASeremAdicionados = 1;
        break;
      case 'trimestral':
        mesesASeremAdicionados = 3;
        break;
      case 'semestral':
        mesesASeremAdicionados = 6;
        break;
      case 'anual':
        mesesASeremAdicionados = 12;
        break;
    }

    // Adicionar os meses ao plano
    dataVencimento.setMonth(dataVencimento.getMonth() + mesesASeremAdicionados);

    return dataVencimento;
  } else {
    console.log(
      'Plano inválido. Escolha entre mensal, trimestral, semestral ou anual.'
    );
    return null;
  }
}
