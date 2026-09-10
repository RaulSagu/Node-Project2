//Importamos el modulo express
const express = require('express');
const dittoJson = require('./pokemon/ditto.json'); // Importamos el archivo data.json que contiene información sobre Pokémon

//Obtenemos el puerto deseado desde las variables de entorno o usamos un valor por defecto
const desiredPort = process.env.PORT ?? 3000;

//Creamos la aplicación express
const app = express();
//Deshabilitamos el encabezado X-Powered-By para mayor seguridad
app.disable('x-powered-by');

//Todo lo que esta comentado abajo en express se puede hacer con la siguiente linea de codigo
app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes JSON

// app.use((req, res, next) => {
//    //console.log(`${req.method} ${req.url}`);
//     //console.log('Mi primer middleware');
//     //podemos agregar cualquier cantidad de peticiones
//     //trackear la request de una base de datos
//     //Revisar si el usuario tiene permisos para acceder a la ruta, tiene cookie, token, etc
//     //podemos agregar cualquier cantidad de peticiones 
//    if (req.method !== 'POST') return next(); // Pasar al siguiente middleware o ruta
//    if (req.headers['content-type'] !== 'application/json') return next(); // Pasar al siguiente middleware o ruta
//     //Aqui solo llegan peticiones POST con encabezado Content-Type: application/json
//     let body = '';
//      //Escuchar el evento 'data' para recibir los fragmentos de datos entrantes en la solicitud
//     req.on('data', (chunk) => {
//         body += chunk.toString();
//     });

//     req.on('end', () => {
//         // Parseamos el cuerpo de la solicitud
//         const data = JSON.parse(body);
//         // Agregamos un timestamp a los datos
//         data.timestamp = Date.now();
//         //Mutamos la request y metemos la información en req.body para que los siguientes middlewares puedan acceder a ella
//         req.body = data;
//         next(); // Pasar al siguiente middleware o ruta
//     });
// });

//Hacemos la funcion para obtener la solicitudes
//app.get('/', (req, res) => {
    //res.status(200).send('<h1>Bienvenido a la API de Pokémon</h1>');
//    res.send('<h1>Bienvenido a la API de Pokémon</h1>');
//});

//Hacemos la funcion para obtener la solicitudes
app.get('/pokemon/ditto', (req, res) => {
    res.json(dittoJson);
});

app.post('/pokemon', (req, res) => {
    //const newPokemon = req.body;
    // Aquí puedes realizar acciones con el nuevo Pokémon, como guardarlo en una base de datos
    //res.status(201).json({ message: 'Nuevo Pokémon creado', data: newPokemon });
    //Aqui deberia guardar en Base de datos, pero por ahora solo devolvemos el objeto recibido
    res.status(201).json(req.body);
});

app.use((req, res) => {
    res.status(404).send('<h1>Error 404 - Ruta no encontrada</h1>');
});

//Iniciamos el servidor en el puerto deseado

app.listen(desiredPort, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${desiredPort}`);
});