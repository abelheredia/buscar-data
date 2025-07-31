import { useForm } from 'react-hook-form';
import { ISearchPayload } from '../entities';
import { useState } from 'react';
import { useHistoryStore, useResultStore } from '../stores';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const useSearch = () => {
  const [loading, setLoading] = useState(false);

  const { setResult, clearResult } = useResultStore();
  const { addToHistory } = useHistoryStore();

  const schema = yup.object().shape({
    tipoDocumento: yup.string().required('Tipo de Documento es requerido'),
    numeroDocumento: yup.string().required('Número de Documento es requerido').matches(/^\d+$/, 'Número de documento debe ser numérico')
  });

  const searchForm = useForm<ISearchPayload>({
    mode: 'all',
    defaultValues: {
      tipoDocumento: 'dni',
      numeroDocumento: ''
    },
    resolver: yupResolver(schema)
  });

  const search = () => {
    setLoading(true);

    const { tipoDocumento, numeroDocumento } = searchForm.getValues();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tipoDocumento === 'ruc' ? { ruc: numeroDocumento } : { dni: numeroDocumento })
    };

    const url = process.env.REACT_APP_API_URL;

    fetch(`${url}/${tipoDocumento}`, requestOptions).then((response) => {
      response.json().then((data) => {
        setResult(data.data);
        addToHistory(data.data);
        setLoading(false);
      });
    });
  };

  const clean = () => {
    clearResult();
    searchForm.reset();
  };

  return {
    searchForm,
    loading,
    search,
    clean
  };
};
