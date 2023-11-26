import { IPeriodo } from '@core/contracts';

export class PeriodoUtil {
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
