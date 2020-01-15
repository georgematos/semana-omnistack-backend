const axios = require('axios');
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray');

// index, show, store, update, destroy

module.exports = {
    async store(request, response) { // async: algo nessa função pode demorar pra responder pois depende de um serviço externo

        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`http://api.github.com/users/${github_username}`); // await: o acesso a API externa do github, por isso o uso de async

            const { name = login, avatar_url, bio } = apiResponse.data; // se name não existir ele usa login

            const techsArray = ParseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [latitude, longitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        }

        return response.json(dev);
    },

    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async update(request, response) {
        const { github_username, name, techs, latitude, longitude } = request.body;
        let dev = await Dev.findOne({ github_username });
        if (dev) {
            dev.name = name;
            dev.techs = ParseStringAsArray(techs);
            dev.location.coordinates.latitude = latitude;
            dev.location.coordinates.longitude = longitude;

            const devUpdated = await Dev.updateOne(dev);
            return response.json(devUpdated);
        } else {
            return response.json({errorMessage: "Usuário não existe"});
        }

    },

    async destroy(request, response) {
        const github_username = request.params.id;
        const dev = await Dev.findOne({ github_username });

        if (dev) {
            const removedDev = await Dev.remove(dev);
            return response.json(removedDev);
        } else {
            return response.json({errorMessage: "Usuário não existe"});
        };

    }
};
