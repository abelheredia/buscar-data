export interface IResult {
  key: React.Key;
  busqueda: string;
  numero: string;
  apellido_materno?: string;
  apellido_paterno?: string;
  codigo_verificacion?: string;
  fecha_nacimiento?: string;
  nombre_completo?: string;
  nombres?: string;
  sexo?: string;
  condicion?: string;
  direccion?: string;
  estado?: string;
  razonSocial?: string;
  ubigeo?: string[];
}
