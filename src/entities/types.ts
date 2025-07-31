export type TDocumento = 'dni' | 'ruc';

export type ISearchPayload = {
  tipoDocumento: string;
  numeroDocumento: string;
};
