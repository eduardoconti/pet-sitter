export abstract class QueryService {
  private readonly _tamanhoPagina!: number;

  constructor(tamanhoPagina = 10) {
    this._tamanhoPagina = tamanhoPagina;
  }

  get tamanhoPagina(): number {
    return this._tamanhoPagina;
  }
  calcularSkip({ numeroPagina }: { numeroPagina: number }): number {
    return (numeroPagina - 1) * this.tamanhoPagina;
  }

  quantidadePaginas({ totalLinhas }: { totalLinhas: number }) {
    return Math.ceil(totalLinhas / this.tamanhoPagina);
  }
}
