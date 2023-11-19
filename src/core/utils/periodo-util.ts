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
}
