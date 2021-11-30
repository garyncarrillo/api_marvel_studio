//1 import los hooks que vamos a necesitar
import React, { useState, useEffect } from 'react';
import './App.css';

import axios from "axios";

function App() {
  // 2 cree un estado para recibir la respuesta del endpoint de marvel
  const [personajes, setPersonaje] = useState([]);

  // 3 usar el Hook useEffect DEL ciclo de vida de la vista (load)
  useEffect (() => {
    //5 construi la base de la url y los parametros que me dice la documentacion
    var baseUrl = "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey="
    var result = "acee3ebcf5e11d64f4b19f6143e5b812";
    var hash="&hash=46dc15bd07661ab1f50e6127d7668994";

    // 4 Verificar la documentacion axios y veriticar el verbo del endpoint (GET)
    axios.get(baseUrl+result+hash)
    .then(function(response){
      //6 verifique la respuesta ok a la peticion de la API DE MARVEL
      console.log("Todo ok ", response.data.data.results);
      //actualizo mi manejador de esta de acuerdo a la respuesta de API
      setPersonaje(response.data.data.results);
    })
    .catch(function(error){
      //7 verifique la captura de los errores en caso que falle
      console.log("error ", error);
    })
  }, []);

  return (
    <div className="App">
      <h1>Marvel</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {
          personajes.map((personaje) => (
            <div
              className="col mt-5"
              key={personaje.id}
            >
              <div
               className="card align-items-center"
               style={{ width:"18rem", height: "18rem" }}
              >
                <img
                 src={`${personaje.thumbnail.path}.${personaje.thumbnail.extension}`}
                 className="card-img-top"
                 style={{ width:"80%", height: "80%" }}
                />
                <div
                  className="card-body"
                >
                  <h4>{personaje.name}</h4>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
