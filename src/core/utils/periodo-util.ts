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

  static isMesmoDia({ inicio, fim }: IPeriodo) {
    return inicio.toISOString().slice(0, 10) === fim.toISOString().slice(0, 10);
  }

  static contarDiasEntreDatas({ inicio, fim }: IPeriodo): number {
    const diferencaEmMilissegundos = Math.abs(fim.getTime() - inicio.getTime());

    const dias = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));

    return dias;
  }
}
