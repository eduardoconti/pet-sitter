import { IPeriodo } from '@core/contracts';

export class PeriodoUtil {
  static horasEntrePeriodo({ inicio, fim }: IPeriodo): number {
    const diferencaEmMilissegundos = fim.getTime() - inicio.getTime();
    if (diferencaEmMilissegundos === 0) {
      return 1;
    }
    const diferencaEmHoras = diferencaEmMilissegundos / (1000 * 60 * 60);
    return Math.ceil(diferencaEmHoras);
  }

  static verificaSobreposicao(periodos: IPeriodo[]) {
    // Ordena os períodos pelo início
    periodos.sort((a, b) => a.inicio.getTime() - b.inicio.getTime());

    // Itera sobre os períodos para verificar sobreposições
    for (let i = 0; i < periodos.length - 1; i++) {
      const periodoAtual = periodos[i];
      const proximoPeriodo = periodos[i + 1];

      // Verifica se há sobreposição
      if (periodoAtual.fim.getTime() >= proximoPeriodo.inicio.getTime()) {
        return true; // Sobreposição encontrada
      }
    }
  }
}
