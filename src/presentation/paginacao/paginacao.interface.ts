export interface IFindPaginado<Resultado> {
  totalLinhas: number;
  numeroPagina: number;
  tamanhoPagina: number;
  data: Resultado[];
}
