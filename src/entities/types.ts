export type TDocumento = 'dni' | 'ruc';

export type ISearchPayload = {
  tipoDocumento: string;
  numeroDocumento: string;
};

export interface IAlert {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
