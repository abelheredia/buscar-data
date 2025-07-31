import { type StateCreator, create } from 'zustand';
import { IResult } from '../entities';
import { nanoid } from 'nanoid';

interface ResultState {
  result: IResult;
  setResult: (result: IResult) => void;
  clearResult: () => void;
}

const storeApi: StateCreator<ResultState> = (set) => ({
  result: {
    key: '',
    busqueda: '',
    numero: '',
    apellido_materno: '',
    apellido_paterno: '',
    codigo_verificacion: '',
    fecha_nacimiento: '',
    nombre_completo: '',
    nombres: '',
    sexo: '',
    condicion: '',
    direccion: '',
    estado: '',
    razonSocial: '',
    ubigeo: []
  },
  setResult: (result) => {
    result.key = nanoid();
    result.busqueda = `${result.numero} - ${result.nombre_completo ? result.nombre_completo : result.razonSocial}`;
    set({ result });
  },
  clearResult: () =>
    set({
      result: {
        key: '',
        busqueda: '',
        numero: '',
        apellido_materno: '',
        apellido_paterno: '',
        codigo_verificacion: '',
        fecha_nacimiento: '',
        nombre_completo: '',
        nombres: '',
        sexo: '',
        condicion: '',
        direccion: '',
        estado: '',
        razonSocial: '',
        ubigeo: []
      }
    })
});

export const useResultStore = create<ResultState>()(storeApi);
