import React, {useEffect,useState} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';


const Boton =styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }

`;

const Formulario = () => {

    // state del listado de cripto
    const [listacripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);


    const MONEDAS = [
        {codigo: 'USD', nombre:'Dolar de Estados Unidos'},
         {codigo: 'MXN', nombre:'Peso Mexicano'},
          {codigo: 'EUR', nombre:'Euro'},
           {codigo: 'GBP', nombre:'Libra Estarlina'},
           {codigo: 'COD', nombre:'Peso Colombiano'},
           {codigo: 'UYU', nombre:'Peso Uruguayo'}
    ];

    // utilizando useMoneda
    const [moneda, SelectMonedas] =useMoneda('Elige tu moneda: ', '' ,MONEDAS);

    // utilizando useCriptomonedas
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

    // EJECUTAR LLAMADO A LA API
    useEffect( () => {
            const consultarAPI= async () => {
                const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

                const resultado = await axios.get(url);
                guardarCriptomonedas(resultado.data.Data);
            }
            consultarAPI();
    }, []);

     // consultar la api para obtener la cotizacion
      //    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      // cuanddo el usuario hace submit
      const cotizarMoneda = e => {
        e.preventDefault();

        // validar si ambos campos se completaron
        if(moneda === '' || criptomoneda === ''){
                 guardarError(true);
                 return;
        }

        // caso contrario pasar datos al componente principal
        guardarError(false);
       
      }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? 'Hay un error' : null}
            <SelectMonedas />

            < SelectCripto />

        <Boton type='submit'
                value="Calcular"
        />
        </form>
     );
}
 
export default Formulario;