import fs from 'fs'
import axios from 'axios';


export default class Busquedas
{

     historial =[]
     path='./db/database.json';

     constructor()
     {

         this.LeerArchivo();
     }

     get paramsBox()
     {
         return
         { 
            const params =
            [{
               'access_token':process.env.MAPBOX_KEY,
               'limit':5,
               'language':'es'
             }]
         }
         
     }
   
     getHistorial()
     {

      return this.historial.map(lugar=>
         {

            let palabras =  lugar.split(' ');
            palabras  = palabras.map(p=>p[0].toUpperCase()+ p.substring(1));

            return palabras.join(' ');
         });

     }

     

     async BuscaCiudad(ciudad='')
     {

      try{
           const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ciudad}.json`,
            params: {               
               'access_token':'pk.eyJ1Ijoicm9iZXJ0b2ZhMTIzIiwiYSI6ImNsNzVubXZqbjF0bGwzcG12MnhkMWRiZTEifQ.ciOa0RDHC-ssdVoBGNk4VA',
               'limit':5,
               'language':'es'
               
                   }
                             
         });
            
       const resp = await instance.get('');
       return resp.data.features.map(lugar=>
         ({
            id: lugar.id,
            nombre: lugar.place_name,
            lng: lugar.center[0],
            lat: lugar.center[1]

          }));

       
      }
      catch(ex)
      {
         console.log (ex)

      }

     }

      GuardarHistorial(lugar='')
     {

      if(this.historial.includes(lugar.toLocaleUpperCase()))
         return;

      this.historial.unshift(lugar);

      this.GuardarArhivo();

     }

     GuardarArhivo()
     {
      const payload=
      {
         historial:this.historial

      };

         fs.writeFileSync(this.path,JSON.stringify(payload));

     }

     LeerArchivo()
     {
       if(!fs.existsSync(this.path)) return;


       const info = fs.readFileSync(this.path,{encoding:'utf-8'});
       const data= JSON.parse(info);
       this.historial=data.historial;

     }




}