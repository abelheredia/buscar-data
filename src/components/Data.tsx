import { IResult } from '../entities';
import { Typography } from 'antd';

const { Text } = Typography;

export const Data: React.FC<{ result: IResult }> = ({ result }) => {
  const Item: React.FC<{ label: string; text: string }> = ({ label, text }) => {
    return (
      <div className="flex items-center gap-2">
        <Text strong>{label}</Text>
        <Text>{text}</Text>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <>
        {result.nombre_completo && <Item label="Nombre Completo:" text={result.nombre_completo || ''} />}
        {result.nombres && <Item label="Nombres:" text={result.nombres || ''} />}
        {result.apellido_paterno && <Item label="Apellido Paterno:" text={result.apellido_paterno || ''} />}
        {result.apellido_materno && <Item label="Apellido Materno:" text={result.apellido_materno || ''} />}
        {result.numero && <Item label="Número de Documento:" text={result.numero || ''} />}
        {result.codigo_verificacion && <Item label="Código de Verificación:" text={result.codigo_verificacion || ''} />}
        {result.fecha_nacimiento && <Item label="Fecha de Nacimiento:" text={result.fecha_nacimiento || ''} />}
        {result.sexo && <Item label="Sexo:" text={result.sexo || ''} />}
        {result.direccion && <Item label="Dirección:" text={result.direccion || ''} />}
        {result.estado && <Item label="Estado:" text={result.estado || ''} />}
        {result.razonSocial && <Item label="Razón Social:" text={result.razonSocial} />}
      </>
    </div>
  );
};
