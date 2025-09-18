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

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const calculateAge = (birthDateString: string) => {
    const today = new Date();
    const [year, month, day] = birthDateString.split('-').map(Number);
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="flex flex-col gap-2">
      <>
        {result.nombres && <Item label="Nombres:" text={result.nombres || ''} />}
        {result.apellido_paterno && <Item label="Apellido Paterno:" text={result.apellido_paterno || ''} />}
        {result.apellido_materno && <Item label="Apellido Materno:" text={result.apellido_materno || ''} />}
        {result.numero && <Item label="Número de Documento:" text={result.numero || ''} />}
        {result.codigo_verificacion && <Item label="Código de Verificación:" text={result.codigo_verificacion || ''} />}
        {result.fecha_nacimiento && <Item label="Fecha de Nacimiento:" text={formatDate(result.fecha_nacimiento) || ''} />}
        {result.fecha_nacimiento && <Item label="Edad:" text={calculateAge(result.fecha_nacimiento).toString()} />}
        {result.sexo && <Item label="Sexo:" text={result.sexo || ''} />}
        {result.direccion && <Item label="Dirección:" text={result.direccion || ''} />}
        {result.estado && <Item label="Estado:" text={result.estado || ''} />}
        {result.razonSocial && <Item label="Razón Social:" text={result.razonSocial} />}
      </>
    </div>
  );
};
