export abstract class QueryService {
  protected calcularSkip({
    numeroPagina,
    tamanhoPagina,
  }: {
    numeroPagina: number;
    tamanhoPagina: number;
  }): number {
    return (numeroPagina - 1) * tamanhoPagina;
  }
}
