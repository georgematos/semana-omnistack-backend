const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        // Buscar todos os devs num raio de 10km e por tecnologias
        const { latitude, longitude, techs } = request.query;

        const techArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [latitude, longitude]
                    },
                    $maxDistance: 10000
                }
            }
        });

        return response.json({ devs });
    }
}
