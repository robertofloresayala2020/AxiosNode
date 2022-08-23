/*const inquirer = require('inquirer');*/
import inquirer from 'inquirer';
import readlines  from 'readline'
import colors from 'colors';



let options=
            [
            {
                type:'list',
                name:'opcion',
                message:'¿Qué desea hacer?',    
                choices:[                    
                            {
                                value:1,
                                name:'1.Buscar ciudad'
                            },
                            {
                                value:2,
                                name:'2.Historial'
                            },
                            {
                                value:0,
                                name:'0.Salir'

                            },
                            
                        ]
            }
            ];    


    let questions=[{
                    type:'input',
                    name:'enter',
                    message:`Presione ${'enter'.green} para continuar`        
                    },                        

                   ];    

        
    let preguntas=[{        
                    type:'input'  ,
                    name:'desc'  ,
                    message:'',
                    validate(value)
                    {
                      if(value.length==0)
                            {return 'Por favor ingrese un valor'}
                        return true;
                    
                    }
                    }];

export default class  inquirerMenu
{   
    constructor(params)
    {

    }
             
    async  CreaMenu()
    {
      
        console.clear();
        console.log('======================'.green);
        console.log('Seleccione una opción'.white);
        console.log('======================'.green);
        //Tiene el nombre del arreglo y lo desestructura
        const {opcion} = await inquirer.prompt(options);

        return opcion;
    }

    async Pausa ()
    {
                        
        //Tiene el nombre del arreglo y lo desestructura
        const {question} = await inquirer.prompt(questions);
        return question;
    }
        

    async leerInput(message)
    {

        const {desc} = await inquirer.prompt(preguntas);
        return desc;
    }
    
    async ListadoLugares(lugares=[])
    {
         const opciones= lugares.map((lugar,i)=>
            {                
                return{value: lugar.id,
                       name:`${i} :  ${lugar.nombre}`
                      }
            }
        );
      
        const opcioneslugar=[{
                type:'list',
                name:'id',
                message:'Seleccione lugar:',
                choices: opciones

        }]

        const {id} = await inquirer.prompt(opcioneslugar);
        
        return id;

      


    }

    async MostrarTareasCheckList(tareas=[])
    {
         const choices= tareas.map((tarea,i)=>
            {                
                return{value: tarea.id,
                       name:`${i} :  ${tarea.desc}`,
                       checked:tarea.completadoEn?true:false

                      }
            }
        );
        
        const checklist=[{
                type:'checkbox',
                name:'ids',
                message:'Seleccione',
                choices

        }]

        const {ids} = await inquirer.prompt(checklist);
        
        return ids;

      


    }

    async confirmar(message)
    {

        const question=
        [
            { type:'confirm',
              name:'ok',
              message}
        ];

        const {ok} = await inquirer.prompt(question);
        return ok;

    }
    

}