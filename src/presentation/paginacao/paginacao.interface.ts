export interface IFindPaginado<Resultado> extends IFiltroPaginado {
  totalLinhas: number;
  quantidadePaginas: number;
  data: Resultado[];
}

export interface IFiltroPaginado {
  numeroPagina: number;
  tamanhoPagina: number;
}
