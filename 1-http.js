const http = require('node:http'); // Importamos el módulo http de Node.js para crear un servidor HTTP
const fs = require('node:fs'); // Importamos el módulo fs de Node.js para trabajar con el sistema de archivos
//const { findAvailablePort } = require('./utils');

//console.log(process.env.PORT);

const desiredPort = process.env.PORT ?? 3000;

//Creamos un servidor HTTP utilizando el módulo http de Node.js. El servidor escucha las solicitudes entrantes y responde con un mensaje de texto simple.
//llamando el metodo createServer del módulo http, que recibe un callback, que toma una función de devolución de llamada (callback) que se ejecuta cada vez que se recibe una solicitud HTTP. La función de devolución de llamada recibe dos parámetros: req (la solicitud entrante) y res (la respuesta que se enviará al cliente).
//Callback: Son funciones que se pasan como argumentos a otras funciones y se ejecutan después de que se completa una operación asincrónica. En este caso, la función de devolución de llamada se ejecuta cada vez que se recibe una solicitud HTTP en el servidor.
//const server = http.createServer((req, res) => {
    //console.log(`Request received: ${req.method} ${req.url}`);
    //res.writeHead(200, { 'Content-Type': 'text/plain' });
    //res.end('Hello, World!\n');
    
    //console.log('Request received: ', req.url);
    //res.end('Hola Mundo desde Node.js');
//});

//Si separamos los procesos de escucha y de respuesta, podemos tener un control más granular sobre el comportamiento del servidor. Por ejemplo, podemos agregar lógica adicional para manejar diferentes rutas o métodos HTTP antes de enviar la respuesta al cliente. Esto nos permite crear aplicaciones web más complejas y personalizadas según nuestras necesidades.
//Es lo mismo que hicimos arriba pero por procesos separados
//Procesamos la respuesta a la solicitud HTTP entrante. En este caso, simplemente registramos la URL de la solicitud en la consola y enviamos una respuesta de texto simple al cliente.
const processRequest = (req, res) => {
    //console.log('Request received: ', req.url);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if (req.url === '/') {
        //res.statusCode = 200;
        res.end('<h1>Hola Bienvenido a la página de inicio</h1>');
        //res.writeHead(200, { 'Content-Type': 'application/json' });
        //res.end(JSON.stringify({ message: 'Hola Mundo desde Node.js' }));
    } else if (req.url === '/imagen-bonita.png') {
        fs.readFile('./img/1.599.png', (err, data) => {
            //Data 
            if (err) {
                res.statusCode = 500;
                res.end('Error al leer la imagen');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'image/png');
                res.end(data);
            }
        });
    } else if (req.url === '/about') {
        //res.statusCode = 200;
        res.end('<h1>Hola Bienvenido a la página about</h1>');    
    } else {
       res.statusCode = 404;
       res.end('<h1>Error 404 Ruta no encontrada</h1>');
    }
    //res.end('Hola Mundo desde Node.js');
}
const server = http.createServer(processRequest);

//Escuchar el el servidor en el puerto deseado. El método listen del objeto server inicia el servidor y lo hace escuchar en el puerto especificado. Cuando el servidor está listo para aceptar conexiones, se ejecuta la función de devolución de llamada proporcionada, que imprime un mensaje en la consola indicando que el servidor está en funcionamiento y en qué puerto está escuchando.
server.listen(desiredPort, () => {
    console.log(`Server running on port http://localhost:${ desiredPort }`);
});