const http = require('node:http'); // Importamos el módulo http de Node.js para crear un servidor HTTP

const desiredPort = process.env.PORT ?? 3000;

const dittoJson = require('./pokemon/ditto.json'); // Importamos el archivo data.json que contiene información sobre Pokémon

const processRequest = (req, res) => {
    // Lógica de procesamiento de solicitudes
    const { method, url } = req;
    switch (method) {
        case 'GET':
            switch (url) {
                case '/pokemon/ditto':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8');
                    return res.end(JSON.stringify(dittoJson));
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    return res.end('<h1>Error 404 - Ruta no encontrada</h1>');
            }
        case 'POST':
            switch (url) {
                case '/pokemon': {
                    let body = '';
                    // Escuchar los datos entrantes en la solicitud
                    //chunk: Sigunifica "fragmento" y representa un fragmento de datos que se recibe en la solicitud. En Node.js, los datos de una solicitud HTTP se reciben en forma de fragmentos (chunks) a medida que llegan al servidor. Cada fragmento es un trozo de datos que puede ser procesado de manera incremental.
                    req.on('data', (chunk) => {
                        body += chunk.toString();
                    });

                    // Cuando se complete la recepción de datos
                    req.on('end', () => {
                        try {
                            const newPokemon = JSON.parse(body);
                            // Aquí puedes realizar acciones con el nuevo Pokémon, como guardarlo en una base de datos
                            //res.statusCode = 201; // Código de estado para "Creado"
                            //res.setHeader('Content-Type', 'application/json; charset=utf-8');
                            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
                            return res.end(JSON.stringify({ message: 'Nuevo Pokémon creado', data: newPokemon }));
                        } catch (error) {
                            res.statusCode = 400; // Código de estado para "Solicitud incorrecta"
                            res.setHeader('Content-Type', 'application/json; charset=utf-8');
                            return res.end(JSON.stringify({ error: 'Datos inválidos' }));
                        }
                    });
                    break;
                }
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    return res.end('Error 404 - Ruta no encontrada');
            }
        //default:
        //    res.statusCode = 404;
        //    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        //    return res.end('Error 404 - Ruta no encontrada');
    }
};

const server = http.createServer(processRequest);

// Escuchar el servidor en el puerto deseado
server.listen(desiredPort, () => {
    console.log(`Server running on port http://localhost:${ desiredPort }`);
});