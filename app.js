
import inquirerMenu from './helpers/inquirerMenu.js';
import Busquedas  from './models/busquedas.js';
import 'dotenv/config' 


/*console.log(process.env); variable de entorno*/
const main = async()=>
{

    
    let objMenu = new inquirerMenu();    
    let objbusquedas = new  Busquedas();
    let opcion;

    do
    {
         opcion = await objMenu.CreaMenu();         
         switch (opcion)
            {
                case 1:                 
                   const filtro= await objMenu.leerInput('Ciudad:');                                           
                   const listalugares = await objbusquedas.BuscaCiudad(filtro);
                   const idlugar= await objMenu.ListadoLugares(listalugares);                    
                   const lugarserl=listalugares.find(l=>l.id===idlugar);
                   
                    objbusquedas.GuardarHistorial(lugarserl.nombre);
                   
                   console.log('\n Información de la ciudad' );                   
                   console.log('\n Ciudad:', lugarserl.nombre);
                   console.log('\n Lat:',lugarserl.lat);
                   console.log('\n Lng:',lugarserl.lng);                  
                    break;
                case 2:

                        objbusquedas.getHistorial().forEach((lugar,i)=>
                        {
                            console.log(`${i} ${lugar}`);

                        }


                        );


                    break;

            }
            if(opcion!==0) await objMenu.Pausa();
    }while(opcion!==0)


}

main();