import { useForm } from 'react-hook-form';
import { ISearchPayload } from '../entities';
import { useState } from 'react';
import { useHistoryStore, useResultStore } from '../stores';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAlert } from './useAlert';

export const useSearch = () => {
  const [loading, setLoading] = useState(false);

  const { setResult, clearResult } = useResultStore();

  const { addToHistory } = useHistoryStore();

  const { alert, showAlert, displayAlert } = useAlert();

  const schema = yup.object().shape({
    tipoDocumento: yup.string().required('Tipo de Documento es requerido'),
    numeroDocumento: yup
      .string()
      .required('Número de Documento es requerido')
      .matches(/^\d+$/, 'Número de documento debe ser numérico')
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
      body: JSON.stringify(
        tipoDocumento === 'ruc'
          ? { ruc: numeroDocumento }
          : { dni: numeroDocumento }
      )
    };

    const url = process.env.REACT_APP_API_URL;

    const searchUrl = process.env.REACT_APP_API_URL_SEARCH;

    try {
      fetch(`${url}/${tipoDocumento}`, requestOptions).then((response) => {
        response.json().then((data) => {
          if (!data.data) {
            displayAlert(data.msg, 'error');
            setLoading(false);
            return;
          }
          setResult(data.data);
          addToHistory(data.data);
          if (tipoDocumento === 'dni') {
            const requestOptionsSearch = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                numero: data.data.numero,
                apellido_paterno: data.data.apellido_paterno,
                apellido_materno: data.data.apellido_materno,
                nombres: data.data.nombres,
                codigo_verificacion: data.data.codigo_verificacion,
                fecha_nacimiento: data.data.fecha_nacimiento,
                sexo: data.data.sexo
              })
            };
            fetch(`${searchUrl}/search`, requestOptionsSearch).then(
              (response) => {
                response.json().then((searchData) => {
                  if (searchData.error) {
                    displayAlert(searchData.error, 'error');
                  }
                });
              }
            );
          }
          setLoading(false);
        });
      });
    } catch (error) {
      displayAlert(String(error), 'error');
      setLoading(false);
    }
  };

  const clean = () => {
    clearResult();
    searchForm.reset();
  };

  return {
    searchForm,
    loading,
    search,
    clean,
    alert,
    showAlert
  };
};
