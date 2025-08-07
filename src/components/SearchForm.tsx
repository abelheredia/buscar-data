import { Button, Card, Input, Select, Typography } from 'antd';
import { useSearch } from '../hooks';
import { documentTypes } from '../constants';
import { Controller } from 'react-hook-form';
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
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
      extra={<Button color="default" variant="solid" onClick={clean} icon={<ClearOutlined />} />}
      style={{ width: '85%' }}
    >
      <div className="flex justify-between gap-2">
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
              <Input placeholder="Número" {...field} {...(errors && errors.numeroDocumento ? { status: 'error' } : {})} />
              <Text style={{ fontSize: '10px' }} type="danger">
                {errors.numeroDocumento?.message}
              </Text>
            </div>
          )}
        />
        <Button color="default" variant="solid" loading={loading} onClick={searchForm.handleSubmit(search)} icon={<SearchOutlined />} />
      </div>
    </Card>
  );
};
