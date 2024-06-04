import { useState } from 'react';
import './App.css';

function App() {
  
  const [loading, setLoading] = useState(false);
 
  const search = () => {
    setLoading(true);
    const tipo_doc = (document.querySelector('select[name="tipo_doc"]') as HTMLSelectElement).value;
    const documento = (document.querySelector('input[name="documento"]') as HTMLInputElement).value;
    console.log(tipo_doc, documento);
  }
  
  return (
    <div className="app">
      <div className="form">
      {
        loading ? 
        <>
        <img src="loading.gif" alt="logo" />
        cargando...
        </>
        :
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
      }
      </div>
    </div>
  );
}

export default App;
