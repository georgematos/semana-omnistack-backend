const { Router } = require('express'); // Importa o módulo Router - específico do Express
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros

// Query Params: request.query (filtros, ordenação, paginação, etc.)
// Route Params: request.params (identificar um recurso de alteração ou remoção)
// Body:

routes.get('/devs', DevController.index);
routes.get('/search', SearchController.index);

routes.post('/devs', DevController.store);
routes.put('/devs', DevController.update);

routes.delete('/devs/:id', DevController.destroy);

module.exports = routes;
