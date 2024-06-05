import { useState } from 'react';
import './App.css';

function App() {
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [tipo_doc, setTipoDoc] = useState('dni');
 
  const search = () => {
    setLoading(true);
    const tipo_doc = (document.querySelector('select[name="tipo_doc"]') as HTMLSelectElement).value;
    setTipoDoc(tipo_doc);
    const documento = (document.querySelector('input[name="documento"]') as HTMLInputElement).value;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tipo_doc === 'ruc' ? { ruc : documento} : { dni : documento })
    };

    fetch(`https://backend.globalredsalud.com/api/cliente/${tipo_doc}`, requestOptions)
    .then( response => {
      response.json().then(data => {
        setData(data.data);
        setLoading(false);
      });
    });
  }

  const clean = () => {
    setData(null);
  }



  return (
    <div className="app">
      <div className="form">
      {
        loading ? 
        <>
          cargando...
        </>
        : !data ?
        <>
          <h4>Buscar Data</h4>
          <div className="doc">
            <select name='tipo_doc'>
              <option value="dni">DNI</option>
              <option value="ruc">RUC</option>
            </select>
            <input type="number" name='documento' />
          </div>
          <button onClick={search} >Buscar</button>
        </>
        :
        <>
          <div className="data">
            {
              tipo_doc === 'dni' ?
              <>
                <div>
                  <span>Documento: </span>
                  <span>{ data.numero }</span>
                </div>
                <div>
                  <span>Nombres: </span>
                  <span>{ data.nombres }</span>
                </div>
                <div>
                  <span>Apellido Paterno: </span>
                  <span>{ data.apellido_paterno }</span>
                </div>
                <div>
                  <span>Apellido Materno: </span>
                  <span>{ data.apellido_materno }</span>
                </div>
                <div>
                  <span>Fecha de Nacimiento: </span>
                  <span>{ data.fecha_nacimiento }</span>
                </div>
                <div>
                  <span>Sexo: </span>
                  <span>{ data.sexo }</span>
                </div>
              </>
              :
              <>
                <div>
                  <span>Documento: </span>
                  <span>{ data.numero }</span>
                </div>
                <div>
                  <span>Razón social: </span>
                  <span>{ data.razonSocial }</span>
                </div>

              </>
            }
          </div>
          <button onClick={clean} > Limpiar </button>
        </> 
      }
      </div>
    </div>
  );
}

export default App;
