import { Button, Card, Input, Select, Typography } from 'antd';
import { useSearch } from '../hooks';
import { documentTypes } from '../constants';
import { Controller } from 'react-hook-form';
const { Text } = Typography;

export const SearchForm = () => {
  const { searchForm, loading, search, clean } = useSearch();

  const {
    formState: { errors }
  } = searchForm;

  return (
    <Card
      title="Buscar Persona"
      variant="borderless"
      type="inner"
      extra={
        <Button color="default" variant="solid" onClick={clean}>
          Limpiar
        </Button>
      }
      style={{ width: '35rem' }}
    >
      <div className="grid grid-cols-4 gap-5">
        <div className="grid grid-cols-2 col-span-3 gap-5">
          <Controller
            name="tipoDocumento"
            control={searchForm.control}
            render={({ field }) => <Select options={documentTypes} placeholder="Tipo de Documento" {...field} />}
          />
          <Controller
            name="numeroDocumento"
            control={searchForm.control}
            render={({ field }) => (
              <div>
                <Input placeholder="Número de Documento" {...field} {...(errors && errors.numeroDocumento ? { status: 'error' } : {})} />
                <Text style={{ fontSize: '10px' }} type="danger">
                  {errors.numeroDocumento?.message}
                </Text>
              </div>
            )}
          />
        </div>
        <Button color="default" variant="solid" loading={loading} onClick={searchForm.handleSubmit(search)}>
          Buscar
        </Button>
      </div>
    </Card>
  );
};
